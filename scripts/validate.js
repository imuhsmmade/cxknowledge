// فحص بيانات CX Knowledge قبل النشر: node scripts/validate.js
const fs = require('fs'), vm = require('vm'), path = require('path');
const root = path.join(__dirname, '..');
const ctx = { window: {} }; vm.createContext(ctx);
for (const f of ['countries', 'profiles', 'news', 'indices', 'library']) {
  vm.runInContext(fs.readFileSync(path.join(root, 'data', f + '.js'), 'utf8'), ctx, { filename: f + '.js' });
}
const W = ctx.window, errs = [];
const C = W.CXK_COUNTRIES, P = W.CXK_PROFILES, N = W.CXK_NEWS, IX = W.CXK_INDICES;
const date = /^\d{4}-\d{2}(-\d{2})?$/, url = /^https:\/\//;
if (!N || !Array.isArray(N.items)) errs.push('news.items missing');
if (isNaN(Date.parse(N.updated))) errs.push('news.updated is not a date');
const ids = new Set();
N.items.forEach((i, k) => {
  const at = `news[${k}] ${i.id}`;
  if (!i.id || !/^[a-z0-9-]+$/.test(i.id)) errs.push(at + ': bad id');
  if (ids.has(i.id)) errs.push(at + ': duplicate id'); ids.add(i.id);
  if (!['news', 'study', 'index', 'event'].includes(i.type)) errs.push(at + ': bad type');
  if (!['sa', 'gulf', 'global'].includes(i.region)) errs.push(at + ': bad region');
  if (i.c !== 'WW' && !C[i.c]) errs.push(at + ': unknown country ' + i.c);
  if (!date.test(i.date)) errs.push(at + ': bad date');
  if (!i.title || !i.summary || !i.source) errs.push(at + ': missing text');
  if (!url.test(i.url)) errs.push(at + ': bad url');
  if (!['ar', 'en'].includes(i.lang)) errs.push(at + ': bad lang');
});
if (N.items.length > 120) errs.push('news has more than 120 items; trim the oldest');
Object.entries(P).forEach(([c, p]) => {
  if (!C[c]) errs.push('profile for unknown country ' + c);
  (p.metrics || []).forEach(m => { if (!url.test(m.u)) errs.push(`profile ${c} metric url`); });
  (p.initiatives || []).forEach(i => { if (!url.test(i.u)) errs.push(`profile ${c} initiative url`); });
});
IX.forEach(x => { if (typeof x.value !== 'number' || !url.test(x.url)) errs.push('index ' + x.id); });
if (errs.length) { console.error('FAILED\n' + errs.join('\n')); process.exit(1); }
console.log(`OK · ${N.items.length} news · ${Object.keys(P).length} profiles · ${IX.length} indices`);
