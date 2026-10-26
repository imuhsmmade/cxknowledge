// البث المباشر — يجلب عناوين تجربة العميل من الخلاصات في data/feeds.json ويكتب data/live.json
// يعمل في GitHub Actions كل 30 دقيقة: node scripts/fetch-live.mjs
// لا يحتاج حزماً خارجية (Node 20+).
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const DATA = path.join(ROOT, 'data');
const KEEP_DAYS = 14, MAX_ITEMS = 600, TIMEOUT = 15000, CONC = 6;

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
async function runFeed(f) {
  try {
    const xml = await get(f.url); const raw = parseFeed(xml); const items = [];
    for (const it of raw) {
      let title = it.title, src = it.source || f.name;
      if (f.type === 'gnews' && it.source && title.endsWith(' - ' + it.source)) title = title.slice(0, -(it.source.length + 3)).trim();
      const nt = norm(title);
      if (SPAM.test(nt)) continue;
      if ((f.filter || f.type === 'gnews') && !RELEVANT.test(nt)) continue;
      const d = new Date(it.date); if (isNaN(d)) continue;
      items.push({ id: hash(key(title)), t: title, u: it.link, s: src, d: d.toISOString(), l: AR.test(title) ? 'ar' : 'en', c: country(title, f.dc), k: cats(title), f: f.id });
    }
    return { id: f.id, name: f.name, ok: true, n: items.length, items };
  } catch (e) { return { id: f.id, name: f.name, ok: false, n: 0, err: String(e.message || e).slice(0, 120), items: [] }; }
}

async function main() {
  const results = []; let i = 0;
  await Promise.all(Array.from({ length: CONC }, async () => { while (i < feeds.length) { const f = feeds[i++]; results.push(await runFeed(f)); } }));
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
      countries_7d: new Set(items.filter(x => Date.parse(x.d) >= week && x.c !== 'WW').map(x => x.c)).size
    },
    items
  };
  fs.writeFileSync(path.join(DATA, 'live.json'), JSON.stringify(out));
  fs.writeFileSync(path.join(DATA, 'feeds-status.json'), JSON.stringify({ updated: out.updated, feeds: results.map(({ items, ...r }) => r).sort((a, b) => a.id.localeCompare(b.id)) }, null, 1));
  console.log(`live: ${items.length} items · ${out.stats.items_24h} in 24h · ${out.stats.outlets_7d} outlets · feeds ok ${out.stats.feeds_ok}/${feeds.length}`);
  for (const r of results.filter(r => !r.ok)) console.log(`  ✗ ${r.id}: ${r.err}`);
}
if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) main();
