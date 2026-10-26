// يملأ data/live.json أول مرة من المواد المحررة حتى يعمل الجلب الآلي
import fs from 'node:fs'; import vm from 'node:vm'; import { cats, tone } from './fetch-live.mjs';
const ctx = { window: {} }; vm.createContext(ctx); vm.runInContext(fs.readFileSync('data/news.js', 'utf8'), ctx);
const items = ctx.window.CXK_NEWS.items.map(i => ({ id: 'ed-' + i.id, t: i.title, t_en: i.title_en, u: i.url, s: i.source, d: new Date(i.date.length === 7 ? i.date + '-15T09:00:00+03:00' : i.date + 'T09:00:00+03:00').toISOString(), l: 'ar', c: i.c, k: cats(i.title + ' ' + i.summary), tn: tone(i.title_en + ' ' + i.title), f: 'editorial' }));
fs.writeFileSync('data/live.json', JSON.stringify({ updated: new Date().toISOString(), stats: { feeds_ok: 0, feeds_total: 0, items_24h: 0, outlets_7d: new Set(items.map(x => x.s)).size, countries_7d: new Set(items.map(x => x.c).filter(c => c !== 'WW')).size }, items }));
console.log('seeded', items.length);
