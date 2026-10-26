// البث المباشر — يجلب عناوين تجربة العميل من الخلاصات في data/feeds.json ويكتب data/live.json
// يعمل في GitHub Actions كل 30 دقيقة: node scripts/fetch-live.mjs
// لا يحتاج حزماً خارجية (Node 20+).
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA = path.join(ROOT, 'data');
const KEEP_DAYS = 14, MAX_ITEMS = 2500, TIMEOUT = 15000, CONC = 6;

const ctx = { window: {} }; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(DATA, 'countries.js'), 'utf8'), ctx);
const COUNTRIES = ctx.window.CXK_COUNTRIES;
const { feeds } = JSON.parse(fs.readFileSync(path.join(DATA, 'feeds.json'), 'utf8'));
const prev = (() => { try { return JSON.parse(fs.readFileSync(path.join(DATA, 'live.json'), 'utf8')); } catch { return { items: [] }; } })();

/* ---------- XML helpers ---------- */
const ENT = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ' };
export function decode(s = '') {
  return s.replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, '$1')
    .replace(/&(#x[0-9a-f]+|#\d+|[a-z]+);/gi, (m, e) => e[0] === '#'
      ? String.fromCodePoint(e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10))
      : (ENT[e.toLowerCase()] ?? m))
    .replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}
const tag = (x, t) => { const m = x.match(new RegExp(`<${t}(?:\\s[^>]*)?>([\\s\\S]*?)</${t}>`, 'i')); return m ? m[1] : ''; };
const attr = (x, t, a) => { const m = x.match(new RegExp(`<${t}\\b[^>]*\\b${a}=["']([^"']+)["']`, 'i')); return m ? m[1] : ''; };
export function parseFeed(xml) {
  const out = [];
  const blocks = xml.match(/<item\b[\s\S]*?<\/item>/gi) || xml.match(/<entry\b[\s\S]*?<\/entry>/gi) || [];
  for (const b of blocks) {
    const title = decode(tag(b, 'title'));
    let link = decode(tag(b, 'link')) || attr(b, 'link', 'href');
    const date = decode(tag(b, 'pubDate') || tag(b, 'published') || tag(b, 'updated') || tag(b, 'dc:date'));
    const source = decode(tag(b, 'source'));
    if (title && link) out.push({ title, link, date, source });
  }
  return out;
}

/* ---------- classification ---------- */
const AR = /[؀-ۿ]/;
const norm = s => s.toLowerCase().replace(/[أإآ]/g, 'ا').replace(/ة/g, 'ه').replace(/ى/g, 'ي').replace(/[ً-ْـ]/g, '');
const AMBIG = new Set(['JO', 'TD', 'GE', 'TR', 'NE', 'GN', 'CG', 'CD', 'DM', 'DO']); // English names that are also common words or places
const HINTS = [
  ['SA', /\bsaudi\b|\briyadh\b|\bjeddah\b|\bneom\b|السعودي|الرياض|جده|جدة|المملكه العربيه|نيوم|مكه المكرمه|المدينه المنوره|الدمام/],
  ['AE', /\buae\b|emirat|\bdubai\b|abu dhabi|sharjah|الامارات|اماراتي|دبي|ابوظبي|ابو ظبي|الشارقه/],
  ['QA', /\bqatar|\bdoha\b|قطر|الدوحه/], ['BH', /bahrain|البحرين|المنامه/], ['KW', /kuwait|الكويت/],
  ['OM', /\boman\b|\bomani|muscat|سلطنه عمان|العماني|مسقط/], ['EG', /\begypt|\bcairo\b|مصر|المصري|القاهره/],
  ['JO', /\bjordanian|\bamman\b|الاردن|الاردني/], ['MA', /morocc|المغرب|المغربي/],
  ['GB', /\buk\b|u\.k\.|\bbritain|\bbritish|\bengland|\blondon\b|gov\.uk|\bnhs\b|\bhmrc\b|بريطاني|المملكه المتحده|لندن/],
  ['US', /\bu\.s\.|\bus federal|\bamerican\b|\bunited states|\bfederal agenc|\birs\b|\bva\b|\bwashington\b|الولايات المتحده|الامريكي|امريكا/],
  ['TR', /türkiye|turkiye|\bturkish\b|تركيا|التركي/], ['GE', /\btbilisi\b/], ['TD', /\bn'djamena\b/],
  ['IN', /\bindia\b|\bindian\b|الهند/], ['SG', /singapore|سنغافوره/], ['EE', /estonia|استونيا/], ['AU', /australia|استراليا/],
  ['CA', /canad|كندا/], ['NZ', /new zealand|نيوزيلندا/], ['DK', /denmark|danish|الدنمارك/], ['KR', /south korea|\bkorean\b|كوريا الجنوبيه/]
];
const NAMES = Object.entries(COUNTRIES).flatMap(([c, d]) => {
  const out = [];
  if (d[0] && d[0].length > 2) out.push([c, norm(d[0])]);
  if (d[1] && !AMBIG.has(c) && d[1].length > 3) out.push([c, d[1].toLowerCase()]);
  return out;
});
export function country(title, dc) {
  const t = norm(title);
  for (const [c, re] of HINTS) if (re.test(t)) return c;
  for (const [c, n] of NAMES) {
    if (AR.test(n) ? t.includes(n) : new RegExp(`\\b${n.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\b`).test(t)) return c;
  }
  return dc || 'WW';
}
const CATS = {
  ai: /\bai\b|artificial intelligence|genai|agentic|\bagents?\b|chatbot|\bllm|copilot|machine learning|ذكاء اصطناعي|الذكاء الاصطناعي|روبوت|وكلاء|الوكلاء|محادثه اليه/,
  gov: /government|public service|public sector|citizen|federal|ministr|municipal|\bagenc|\bgov\b|حكوم|المستفيد|وزاره|وزير|امانه|بلدي|هيئه|الخدمات العامه|القطاع العام/,
  index: /\bindex\b|survey|ranking|\breport\b|\bstudy\b|research|benchmark|\bpoll\b|مؤشر|استطلاع|تقرير|دراسه|تصنيف|ترتيب|قياس|احصاء/,
  cc: /contact cent|call cent|customer service|customer support|helpdesk|مركز اتصال|مراكز الاتصال|مركز الاتصال|خدمه العملاء|الدعم الفني|العنايه بالعملاء/,
  award: /\baward|\bwinner|\bwins\b|جائز|جوائز|تكريم|يفوز|تفوز|فوز/,
  digital: /digital|\bapp\b|platform|online|portal|mobile|رقمي|منصه|تطبيق|الكتروني|بوابه/
};
export const cats = title => { const t = norm(title); return Object.keys(CATS).filter(k => CATS[k].test(t)); };
const TONE_NEG = /outage|complain|\bfine[sd]?\b|penalt|breach|lawsuit|\bsued\b|delay|backlog|strike|crash|\bfail|scam|fraud|frustrat|worst|declin|\bdrops?\b|\bfalls?\b|layoff|criticis|angry|\bpoor\b|outrage|شكو|شكاو|غرام|عطل|اعطال|تاخ|تراجع|انخفاض|احتيال|اختراق|انقطاع|ازدحام|سوء|ضعف|مخالف|استياء|غضب|معانا/;
const TONE_POS = /award|\bwins?\b|winner|launch|improv|record high|\btops?\b|rank(s|ed)? first|\bbest\b|\brises?\b|growth|faster|easier|upgrade|expand|milestone|جائز|يفوز|تفوز|اطلاق|تطلق|يطلق|تحسين|تحسن|الاول|ارتفاع|نمو|يرتفع|ترتفع|تتصدر|يتصدر|افضل|توسع|تطوير|يحقق|تحقق|انجاز/;
export const tone = title => { const t = norm(title), n = TONE_NEG.test(t), p = TONE_POS.test(t); return n && !p ? -1 : p && !n ? 1 : 0; };
const LANGS = { english:'en', arabic:'ar', french:'fr', spanish:'es', german:'de', portuguese:'pt', italian:'it', turkish:'tr', russian:'ru', chinese:'zh', japanese:'ja', korean:'ko', indonesian:'id', malay:'ms', dutch:'nl', polish:'pl', hindi:'hi', urdu:'ur', persian:'fa', hebrew:'he', swedish:'sv', vietnamese:'vi', thai:'th' };
const CNAMES = Object.fromEntries(Object.entries(COUNTRIES).map(([c, d]) => [String(d[1]).toLowerCase(), c]));
Object.assign(CNAMES, { 'united states': 'US', 'united kingdom': 'GB', 'south korea': 'KR', 'russia': 'RU', 'turkey': 'TR', 'vietnam': 'VN', 'iran': 'IR', 'syria': 'SY', 'czech republic': 'CZ', 'taiwan': 'TW', 'hong kong': 'HK' });
const outletCountry = n => n ? (CNAMES[String(n).toLowerCase()] || (String(n).length === 2 ? String(n).toUpperCase() : '')) : '';
const RELEVANT = /customer|citizen|service design|experience|\bcx\b|satisf|contact cent|call cent|journey|user research|usability|public service|تجربه|رضا|خدم|مستفيد|متعامل/;
const SPAM = /رقم (خدمه|هاتف|واتس)|واتساب|خدمه عملاء [^ ]+ (رقم|الموحد)|customer (service|care) (number|phone)|phone number|toll.?free|horoscope|casino|betting|كوبون|خصم \d+/;
const hash = s => { let h = 5381; for (const ch of s) h = ((h << 5) + h + ch.codePointAt(0)) >>> 0; return h.toString(36); };
const key = t => norm(t).replace(/[^\p{L}\p{N}]+/gu, ' ').trim().split(' ').slice(0, 9).join(' ');

/* ---------- fetch ---------- */
async function get(url) {
  const ac = new AbortController(); const tm = setTimeout(() => ac.abort(), TIMEOUT);
  try {
    const r = await fetch(url, { signal: ac.signal, headers: { 'User-Agent': 'Mozilla/5.0 (compatible; CXKnowledgeBot/1.0; +https://github.com/imuhsmmade/cxknowledge)', 'Accept': 'application/rss+xml, application/atom+xml, application/xml, text/xml;q=0.9, */*;q=0.5' } });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    return await r.text();
  } finally { clearTimeout(tm); }
}
const sleep = ms => new Promise(r => setTimeout(r, ms));
function makeItem(f, title, link, src, date, lang, oc) {
  const nt = norm(title);
  if (!title || !link || SPAM.test(nt)) return null;
  const d = new Date(date); if (isNaN(d)) return null;
  const l = lang || (AR.test(title) ? 'ar' : 'en');
  if ((f.filter || f.type === 'gnews') && (l === 'ar' || l === 'en') && !RELEVANT.test(nt)) return null;
  const it = { id: hash(key(title)), t: title, u: link, s: src || f.name, d: d.toISOString(), l, c: country(title, f.dc), k: cats(title), tn: tone(title), f: f.id };
  if (oc) it.oc = oc;
  return it;
}
export async function runFeedForTest(f) { return runFeed(f); }
async function runFeed(f) {
  try {
    const items = [];
    if (f.type === 'gdelt') {
      let j, lastErr;
      for (const wait of [0, 15000, 30000, 45000]) {   // GDELT يحدّ الطلبات المتقاربة؛ نعيد المحاولة بتباعد متزايد
        if (wait) await sleep(wait);
        const ac = new AbortController(); const tm = setTimeout(() => ac.abort(), 40000);
        try {
          const r = await fetch(f.url, { headers: { 'User-Agent': 'CXKnowledgeBot/1.0 (+https://github.com/imuhsmmade/cxknowledge)' }, signal: ac.signal });
          if (!r.ok) { lastErr = new Error('HTTP ' + r.status); continue; }
          const txt = await r.text(); try { j = JSON.parse(txt); break; } catch { lastErr = new Error('non-JSON (rate limited?)'); }
        } catch (e) { lastErr = e; } finally { clearTimeout(tm); }
      }
      if (!j) throw lastErr || new Error('GDELT unavailable');
      for (const a of (j.articles || [])) {
        const sd = String(a.seendate || '').replace(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})(\d{2})Z$/, '$1-$2-$3T$4:$5:$6Z');
        const it = makeItem(f, (a.title || '').trim(), a.url, a.domain, sd, LANGS[String(a.language || '').toLowerCase()] || String(a.language || 'xx').slice(0, 2).toLowerCase(), outletCountry(a.sourcecountry));
        if (it) items.push(it);
      }
    } else if (f.type === 'newscatcher') {
      const keyEnv = process.env.NEWSCATCHER_API_KEY;
      if (!keyEnv) return { id: f.id, name: f.name, ok: false, n: 0, err: 'no API key (optional)', items: [] };
      const r = await fetch(f.url, { method: 'POST', headers: { 'x-api-token': keyEnv, 'Content-Type': 'application/json' }, body: JSON.stringify({ q: f.q, lang: f.lang, page_size: 100, sort_by: 'date' }) });
      if (!r.ok) throw new Error('HTTP ' + r.status);
      const j = await r.json();
      for (const a of (j.articles || [])) {
        const it = makeItem(f, (a.title || '').trim(), a.link, a.name_source || a.domain_url, a.published_date, a.language, outletCountry(a.country));
        if (it) items.push(it);
      }
    } else {
      const xml = await get(f.url);
      for (const x of parseFeed(xml)) {
        let title = x.title; const src = x.source || f.name;
        if (f.type === 'gnews' && x.source && title.endsWith(' - ' + x.source)) title = title.slice(0, -(x.source.length + 3)).trim();
        const it = makeItem(f, title, x.link, src, x.date, null, f.type === 'gnews' ? '' : '');
        if (it) items.push(it);
      }
    }
    return { id: f.id, name: f.name, type: f.type, ok: true, n: items.length, items };
  } catch (e) { return { id: f.id, name: f.name, type: f.type, ok: false, n: 0, err: String(e.message || e).slice(0, 120), items: [] }; }
}

async function main() {
  const results = []; const normal = feeds.filter(f => f.type !== 'gdelt'), slow = feeds.filter(f => f.type === 'gdelt'); let i = 0;
  const gd = (async () => { for (const f of slow) { results.push(await runFeed(f)); await sleep(10000); } })();
  await Promise.all(Array.from({ length: CONC }, async () => { while (i < normal.length) { const f = normal[i++]; results.push(await runFeed(f)); await sleep(300); } }));
  await gd;
  const now = Date.now(), cutoff = now - KEEP_DAYS * 864e5;
  const byId = new Map(), byKey = new Set();
  for (const it of [...results.flatMap(r => r.items), ...(prev.items || [])]
    .filter(x => Date.parse(x.d) >= cutoff && Date.parse(x.d) <= now + 36e5)
    .sort((a, b) => Date.parse(b.d) - Date.parse(a.d))) {
    const k = key(it.t);
    if (byId.has(it.id) || byKey.has(k)) continue;
    byId.set(it.id, it); byKey.add(k);
  }
  const items = [...byId.values()].slice(0, MAX_ITEMS);
  const day = now - 864e5, week = now - 7 * 864e5;
  const out = {
    updated: new Date(now).toISOString(),
    stats: {
      feeds_ok: results.filter(r => r.ok).length, feeds_total: feeds.length,
      items_24h: items.filter(x => Date.parse(x.d) >= day).length,
      outlets_7d: new Set(items.filter(x => Date.parse(x.d) >= week).map(x => x.s)).size,
      countries_7d: new Set(items.filter(x => Date.parse(x.d) >= week && x.c !== 'WW').map(x => x.c)).size,
      outlets_14d: new Set(items.map(x => x.s)).size,
      outlet_countries: new Set(items.map(x => x.oc).filter(Boolean)).size,
      languages: new Set(items.map(x => x.l)).size
    },
    items
  };
  fs.writeFileSync(path.join(DATA, 'live.json'), JSON.stringify(out));
  fs.writeFileSync(path.join(DATA, 'feeds-status.json'), JSON.stringify({ updated: out.updated, feeds: results.map(({ items, ...r }) => r).sort((a, b) => a.id.localeCompare(b.id)) }, null, 1));
  console.log(`live: ${items.length} items · ${out.stats.items_24h} in 24h · ${out.stats.outlets_7d} outlets · feeds ok ${out.stats.feeds_ok}/${feeds.length}`);
  for (const r of results.filter(r => !r.ok)) console.log(`  ✗ ${r.id}: ${r.err}`);
}
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) main();
