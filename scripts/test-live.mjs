import assert from 'node:assert';
import { parseFeed, country, cats, decode } from './fetch-live.mjs';
const rss = `<?xml version="1.0"?><rss><channel><item><title>Saudi Arabia tops index - Arab News</title><link>https://news.google.com/rss/articles/abc</link><pubDate>Mon, 26 Oct 2026 10:00:00 GMT</pubDate><source url="https://arabnews.com">Arab News</source></item>
<item><title><![CDATA[هيئة الحكومة الرقمية تعلن نتائج مؤشر نضج التجربة الرقمية &amp; أبشر الأول]]></title><link>https://x.sa/1</link><pubDate>Mon, 26 Oct 2026 09:00:00 +0300</pubDate></item></channel></rss>`;
const atom = `<feed><entry><title>GOV.UK app adds AI chat</title><link href="https://gds.blog.gov.uk/x"/><updated>2026-10-20T10:00:00Z</updated></entry></feed>`;
const a = parseFeed(rss); assert.equal(a.length, 2); assert.equal(a[0].source, 'Arab News'); assert.ok(a[1].title.includes('&'));
assert.equal(parseFeed(atom)[0].link, 'https://gds.blog.gov.uk/x');
assert.equal(country('Saudi Arabia tops index'), 'SA');
assert.equal(country('هيئة الحكومة الرقمية في الرياض'), 'SA');
assert.equal(country('Dubai launches customer happiness centres'), 'AE');
assert.equal(country('Michael Jordan buys stake'), 'WW');
assert.equal(country('GOV.UK app adds AI chat'), 'GB');
assert.equal(country('Estonia proactive services'), 'EE');
assert.equal(country('وزارة الداخلية الكويتية تطلق خدمة'), 'KW');
assert.deepEqual(cats('Gartner survey: AI agents in contact centers'), ['ai','index','cc']);
assert.ok(cats('مؤشر رضا المستفيدين عن الخدمات الحكومية').includes('index'));
assert.equal(decode('A &#8211; B &amp; C'), 'A – B & C');
console.log('tests ok');
