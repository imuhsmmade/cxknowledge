// يختبر قراءة استجابة GDELT بمحاكاة fetch
import assert from 'node:assert';
const sample = { articles: [
  { url: 'https://example.ae/a', title: 'Dubai airport cuts queue times with biometric gates', seendate: '20261026T081500Z', domain: 'example.ae', language: 'English', sourcecountry: 'United Arab Emirates' },
  { url: 'https://exemple.fr/b', title: "L'expérience client dans les services publics", seendate: '20261026T070000Z', domain: 'exemple.fr', language: 'French', sourcecountry: 'France' } ] };
globalThis.fetch = async () => ({ ok: true, text: async () => JSON.stringify(sample) });
const { runFeedForTest } = await import('./fetch-live.mjs');
const r = await runFeedForTest({ id: 'gdelt-x', name: 'GDELT', type: 'gdelt', url: 'x' });
assert.equal(r.ok, true); assert.equal(r.items.length, 2);
assert.equal(r.items[0].c, 'AE'); assert.equal(r.items[0].oc, 'AE'); assert.equal(r.items[1].l, 'fr'); assert.equal(r.items[1].oc, 'FR');
assert.equal(r.items[0].d, '2026-10-26T08:15:00.000Z');
console.log('gdelt ok');
