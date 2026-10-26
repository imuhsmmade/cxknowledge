/* CX Knowledge — التطبيق الرئيسي (توجيه بالروابط، الخريطة، الصفحات) */
(function(){
"use strict";
const C = window.CXK_COUNTRIES || {}, P = window.CXK_PROFILES || {}, N = window.CXK_NEWS || {items:[]}, IX = window.CXK_INDICES || [], J = window.CXK_JOURNEY || {};
const $ = (s,el=document)=>el.querySelector(s), $$=(s,el=document)=>[...el.querySelectorAll(s)];
const main = $('#main');
const esc = s => String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const REG = {gulf:'الخليج', arab:'الدول العربية', europe:'أوروبا', asia:'آسيا', americas:'الأمريكتان', africa:'أفريقيا', oceania:'أوقيانوسيا'};
const RNAME = {sa:'السعودية', gulf:'الخليج والعرب', global:'عالمي'};
const TYP = {news:'خبر', study:'دراسة', index:'مؤشر', event:'فعالية'};
const THEME = {id:'الهوية الرقمية', onestop:'منصة موحّدة', proactive:'خدمات استباقية', measure:'القياس وصوت المستفيد', simplify:'تبسيط الإجراءات', ai:'الذكاء الاصطناعي', design:'معايير التصميم'};
const KIND = {gov:'الحكومة الرقمية', national:'الرضا الوطني', business:'قطاع الأعمال'};
const fmtD = new Intl.DateTimeFormat('ar-SA-u-nu-latn-ca-gregory',{day:'numeric',month:'long',year:'numeric'});
const fmtM = new Intl.DateTimeFormat('ar-SA-u-nu-latn-ca-gregory',{month:'long',year:'numeric'});
const toDate = s => new Date(s.length===7 ? s+'-15T12:00:00' : s+'T12:00:00');
const dLabel = s => s.length===7 ? fmtM.format(toDate(s)) : fmtD.format(toDate(s));
const dirOf = v => /[؀-ۿ]/.test(v) ? 'rtl' : 'ltr';
const items = N.items.slice().sort((a,b)=>toDate(b.date)-toDate(a.date));
const cname = c => c==='WW' ? 'عالمي' : (C[c] ? C[c][0] : c);
const flag = (c,cls='') => c && c!=='WW' ? `<img class="flag ${cls}" src="https://flagcdn.com/${c.toLowerCase()}.svg" alt="" loading="lazy" width="28" height="20" onerror="this.style.visibility='hidden'">` : `<svg class="flag ${cls}" viewBox="0 0 28 20" aria-hidden="true"><rect width="28" height="20" rx="3" fill="var(--surface-2)"/><circle cx="14" cy="10" r="6.5" fill="none" stroke="var(--teal)" stroke-width="1.3"/><path d="M7.5 10h13M14 3.5c-3 3.5-3 9.5 0 13M14 3.5c3 3.5 3 9.5 0 13" fill="none" stroke="var(--teal)" stroke-width="1"/></svg>`;
const SITE = location.origin + location.pathname;
const deepCodes = Object.keys(P);
const allInits = deepCodes.flatMap(c=>(P[c].initiatives||[]).map(i=>({...i,c})));

/* ---------- icons ---------- */
const I = {
  x:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.8 3h3.1l-6.8 7.7L22 21h-6.3l-4.9-6.4L5.2 21H2.1l7.3-8.3L1.8 3h6.4l4.4 5.9L17.8 3Zm-1.1 16.2h1.7L7.4 4.7H5.5l11.2 14.5Z"/></svg>',
  wa:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.5-.3Z"/></svg>',
  li:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.8v1.6h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-4.9c0-1.17-.02-2.68-1.63-2.68-1.64 0-1.89 1.28-1.89 2.6V21h-3.88V9.75Z"/></svg>',
  cp:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/></svg>',
  ext:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>',
  search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  dl:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v12m0 0-4-4m4 4 4-4M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2"/></svg>'
};

/* ---------- helpers ---------- */
const toast = msg => { const t=$('#toast'); t.textContent=msg; t.classList.add('on'); clearTimeout(toast.h); toast.h=setTimeout(()=>t.classList.remove('on'),2300); };
async function copy(text){
  try{ await navigator.clipboard.writeText(text); toast('نُسخ النص والرابط'); }
  catch(_){ const ta=document.createElement('textarea'); ta.value=text; ta.style.position='fixed'; ta.style.opacity='0'; document.body.appendChild(ta); ta.select(); let ok=false; try{ok=document.execCommand('copy');}catch(e){} ta.remove(); toast(ok?'نُسخ النص والرابط':'تعذّر النسخ'); }
}
function shareLinks(text,url){ return {
  x:`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
  wa:`https://wa.me/?text=${encodeURIComponent(text+' '+url)}`,
  li:`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` }; }
function ago(){
  const t=new Date(N.updated||Date.now()), m=Math.max(0,Math.round((Date.now()-t)/60000)); let s;
  if(m<1)s='الآن'; else if(m<60)s=m<=2?'منذ دقيقة':m<=10?`منذ ${m} دقائق`:`منذ ${m} دقيقة`;
  else{const h=Math.round(m/60); if(h<24)s=h===1?'منذ ساعة':h===2?'منذ ساعتين':h<=10?`منذ ${h} ساعات`:`منذ ${h} ساعة`; else{const d=Math.round(h/24); s=d===1?'منذ يوم':d===2?'منذ يومين':d<=10?`منذ ${d} أيام`:`منذ ${d} يوماً`;}}
  $('#ago').textContent='محدّث '+s;
  $('#fmeta').innerHTML=`آخر تحديث للمحتوى: ${fmtD.format(t)}<br>${items.length} مادة · ${deepCodes.length} ملفاً معمقاً · ${Object.values(C).filter(x=>x[2]!=null).length} دولة في المؤشر`;
}
ago(); setInterval(ago,60000);
function norm(s){ return String(s).toLowerCase().replace(/[أإآ]/g,'ا').replace(/ة/g,'ه').replace(/ى/g,'ي').replace(/[ً-ْ]/g,''); }
const BINS=[0.25,0.5,0.75,0.9]; /* UN classes (low/middle/high/very high) with very-high split at 0.9 */
function binOf(v){ let i=0; while(i<BINS.length && v>=BINS[i]) i++; return i; }
function egdiColor(v){
  const cs=getComputedStyle(document.documentElement), lo=cs.getPropertyValue('--ramp-lo').trim(), hi=cs.getPropertyValue('--ramp-hi').trim();
  const h=x=>[1,3,5].map(i=>parseInt(x.slice(i,i+2),16)); const a=h(lo), b=h(hi); const t=[.12,.32,.55,.78,1][binOf(v)];
  return `rgb(${a.map((x,i)=>Math.round(x+(b[i]-x)*t)).join(',')})`;
}
function spark(t){
  if(!t||t.length<2) return '';
  const w=200,h=42,p=4,mn=Math.min(...t),mx=Math.max(...t),r=(mx-mn)||1;
  const pts=t.map((v,i)=>[p+i*(w-2*p)/(t.length-1),h-p-(v-mn)/r*(h-2*p-6)]);
  const d=pts.map((q,i)=>(i?'L':'M')+q[0].toFixed(1)+' '+q[1].toFixed(1)).join(' '), l=pts[pts.length-1];
  return `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" style="direction:ltr" aria-hidden="true"><path d="${d} L${l[0]} ${h} L${p} ${h}Z" fill="var(--accent-soft)"/><path d="${d}" fill="none" stroke="var(--accent)" stroke-width="2" vector-effect="non-scaling-stroke"/><circle cx="${l[0]}" cy="${l[1]}" r="3.5" fill="var(--accent)"/></svg>`;
}
const filterField = (id,ph) => `<label class="field"><span class="sr">${ph}</span>${I.search}<input id="${id}" type="search" placeholder="${ph}" autocomplete="off"></label>`;

/* ---------- cards ---------- */
function newsCard(i){
  const url = SITE+'#/item/'+i.id, text = i.title+(i.stat?` — ${i.stat.v} ${i.stat.l}`:'')+' | CX Knowledge', L=shareLinks(text,url);
  return `<article class="card" id="n-${esc(i.id)}">
    <div class="meta"><span class="type ${i.type}">${TYP[i.type]||''}</span>
      ${i.c && i.c!=='WW' ? `<a class="ctry" href="#/country/${i.c.toLowerCase()}">${flag(i.c,'sm')}${esc(cname(i.c))}</a>` : `<span class="ctry">${flag('WW','sm')}عالمي</span>`}
      <time datetime="${i.date}">${dLabel(i.date)}</time></div>
    <h3>${esc(i.title)}</h3>
    ${i.stat?`<div class="stat"><b dir="${dirOf(i.stat.v)}">${esc(i.stat.v)}</b><span>${esc(i.stat.l)}</span></div>`:''}
    <p class="sum">${esc(i.summary)}</p>
    <div class="cfoot"><span class="s"><a class="open" href="${esc(i.url)}" target="_blank" rel="noopener">${esc(i.source)} ${I.ext}</a>${i.lang==='en'?'<span class="tr">مترجم</span>':''}</span>
      <span class="acts"><a class="ic" href="${L.x}" target="_blank" rel="noopener" aria-label="شارك على X">${I.x}</a><a class="ic" href="${L.wa}" target="_blank" rel="noopener" aria-label="شارك على واتساب">${I.wa}</a><button class="ic" type="button" data-copy="${esc(text+'\n'+url)}" aria-label="انسخ الرابط">${I.cp}</button></span></div>
  </article>`;
}
function ixCard(x){
  const up = x.change>0, good = x.invert ? !up : up;
  const c = x.change==null ? '' : `<span class="chg ${good?'up':'down'}">${up?'▲ +':'▼ '}${x.change}${x.changeUnit==='%'?'%':' '+(x.changeUnit||'')}</span>`;
  const v = x.fmt==='0.0000' ? x.value.toFixed(4) : x.value;
  return `<a class="ix" href="${esc(x.url)}" target="_blank" rel="noopener">
    <div class="scope">${flag(x.c,'sm')}${esc(cname(x.c))} · ${esc(x.publisher)}</div>
    <h3>${esc(x.name)}</h3>
    <div>${x.trend?spark(x.trend):''}<div class="row"><span class="val">${v}${x.unit?`<small>${esc(x.unit)}</small>`:''}</span>${c}</div></div>
    <p class="note">${esc(x.note)}</p>
    <div class="ft"><span>${KIND[x.kind]||''}</span><span>${esc(x.period)}</span></div></a>`;
}
function iniCard(i, showCountry=true){
  return `<article class="ini">
    <div class="who">${showCountry?`${flag(i.c,'sm')}<a href="#/country/${i.c.toLowerCase()}">${esc(cname(i.c))}</a> · `:''}<span class="theme">${esc(THEME[i.theme]||'')}</span><span class="y num">${esc(i.y||'')}</span></div>
    <h3>${esc(i.t)}</h3><p>${esc(i.d)}</p>
    ${i.impact?`<div class="impact"><small>الأثر</small>${esc(i.impact)}</div>`:''}
    <a class="open" href="${esc(i.u)}" target="_blank" rel="noopener">المصدر ${I.ext}</a></article>`;
}

/* ---------- world map ---------- */
let WORLD=null, worldP=null;
function rewind(f){ /* ensure spherical winding: a country can never cover more than a hemisphere */
  if(!f.geometry) return f; const g=f.geometry;
  const fix=poly=>{ const t={type:'Polygon',coordinates:poly}; return d3.geoArea(t)>2*Math.PI ? poly.map(r=>r.slice().reverse()) : poly; };
  if(g.type==='Polygon') g.coordinates=fix(g.coordinates); else if(g.type==='MultiPolygon') g.coordinates=g.coordinates.map(fix);
  return f; }
function loadWorld(){ if(!worldP) worldP=fetch('data/world.json').then(r=>r.json()).then(t=>{WORLD=topojson.feature(t,t.objects.countries); WORLD.features.forEach(rewind); return WORLD;}); return worldP; }
function drawMap(box, opts={}){
  box.innerHTML = '<div class="src">جارٍ تحميل الخريطة…</div>';
  return loadWorld().then(w=>{
    const W=960,H=470, proj=d3.geoEqualEarth().fitExtent([[6,6],[W-6,H-6]],{type:'Sphere'}), path=d3.geoPath(proj);
    const grat=d3.geoGraticule10();
    let s=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="خريطة العالم ملونة بحسب مؤشر تطوير الحكومة الإلكترونية 2024"><path class="sph" d="${path({type:'Sphere'})}"/><path class="grat" d="${path(grat)}"/>`;
    w.features.forEach(f=>{ const a2=f.properties&&f.properties.a2; if(!a2) return; const d=C[a2]; const v=d&&d[2];
      const dim = opts.region && opts.region!=='all' && (!d||d[4]!==opts.region);
      const pd=path(f); if(!pd) return; s+=`<path class="c" data-c="${a2}" d="${pd}" fill="${v!=null?egdiColor(v):'var(--map-none)'}"${dim?' opacity=".18"':''}/>`; });
    deepCodes.forEach(c=>{ const f=w.features.find(x=>x.properties.a2===c); if(!f) return; const p=proj(d3.geoCentroid(f)); if(p) s+=`<circle class="pin" cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="3.6"/>`; });
    s+='</svg>';
    const lab=['< 0.25','0.25–0.5','0.5–0.75','0.75–0.9','≥ 0.9'];
    box.innerHTML = s + `<div class="legend"><span>EGDI 2024</span>${[0.1,0.3,0.6,0.8,0.95].map((v,i)=>`<span class="sw" dir="ltr"><i style="background:${egdiColor(v)}"></i>${lab[i]}</span>`).join('')}<span class="pinkey"><i></i>ملف معمّق</span></div>`;
    const tip=$('#tip');
    const svg=$('svg',box);
    svg.addEventListener('mousemove',e=>{ const p=e.target.closest('path.c'); if(!p){tip.hidden=true;return;} const c=p.dataset.c, d=C[c]; if(!d){tip.hidden=true;return;}
      tip.innerHTML=`<b>${esc(d[0])}</b><span class="r">${d[2]!=null?`EGDI <span class="num">${d[2].toFixed(4)}</span> · الترتيب <span class="num">${d[3]}</span> من 193`:'خارج قائمة المؤشر'}</span>${P[c]?'<span class="deep">● ملف معمّق متاح</span>':''}`;
      tip.hidden=false; const r=tip.getBoundingClientRect(); let x=e.clientX+14, y=e.clientY+14; if(x+r.width>innerWidth-8) x=e.clientX-r.width-14; if(y+r.height>innerHeight-8) y=e.clientY-r.height-14; tip.style.left=x+'px'; tip.style.top=y+'px'; });
    svg.addEventListener('mouseleave',()=>tip.hidden=true);
    svg.addEventListener('click',e=>{ const p=e.target.closest('path.c'); if(p&&C[p.dataset.c]){ tip.hidden=true; location.hash='#/country/'+p.dataset.c.toLowerCase(); }});
  }).catch(()=>{ box.innerHTML='<p class="empty">تعذّر تحميل الخريطة. حدّث الصفحة.</p>'; });
}

/* ---------- pages ---------- */
function pageHome(){
  const ranked = Object.entries(C).filter(([,d])=>d[3]).sort((a,b)=>a[1][3]-b[1][3]);
  const gulf = ranked.filter(([,d])=>d[4]==='gulf');
  const stats=[[Object.values(C).filter(x=>x[2]!=null).length,'دولة على الخريطة'],[deepCodes.length,'ملفاً معمقاً'],[items.length,'مادة منشورة'],[IX.length,'مؤشراً'],[allInits.length,'مبادرة موثقة']];
  const tk = items.slice(0,16).map(i=>`<a href="#/item/${i.id}">${flag(i.c,'sm')}${esc(i.title)}<span class="d">${dLabel(i.date)}</span></a>`).join('');
  const pick = ['SA','AE','EE','SG','KR','NZ','FR','GB','DK','OM','KW','BR'].map(c=>(P[c]&&P[c].initiatives[0])?{...P[c].initiatives[0],c}:null).filter(Boolean).slice(0,6);
  const rankRow = ([c,d],me) => `<a href="#/country/${c.toLowerCase()}" class="${c==='SA'?'me':''}"><span class="i">${d[3]}</span>${flag(c,'sm')}<span class="nm">${esc(d[0])}</span><span class="bar-in"><i style="width:${(d[2]*100).toFixed(1)}%"></i></span><span class="num">${d[2].toFixed(4)}</span></a>`;
  main.innerHTML = `
  <section class="hero"><div class="wrap">
    <div>
      <div class="eyebrow">CX KNOWLEDGE · GLOBAL ATLAS</div>
      <h1>تجربة العميل في <em>العالم</em>، بالعربية.</h1>
      <p class="lede">أخبار ودراسات ومؤشرات ومبادرات من 193 دولة، مع أدوات لتصميم رحلة العميل. اختر دولة من الخريطة أو ابحث عنها.</p>
      <div class="field find">${I.search}<input id="findC" type="search" list="clist" placeholder="ابحث عن دولة: السعودية، إستونيا، سنغافورة…" autocomplete="off"><datalist id="clist">${ranked.map(([c,d])=>`<option value="${esc(d[0])}">`).join('')}</datalist></div>
      <div class="stats">${stats.map(([v,l])=>`<div><b>${v}</b><span>${l}</span></div>`).join('')}</div>
    </div>
    <div class="mapbox" id="heroMap"></div>
  </div></section>
  <div class="ticker" aria-label="آخر العناوين"><span class="tg">آخر العناوين</span><div class="rail"><div class="track">${tk}${tk}</div></div></div>

  <section class="blk wrap"><div class="sh"><h2>أحدث المستجدات</h2><a class="more" href="#/news">كل المستجدات ←</a></div>
    <div class="feed">${items.slice(0,6).map(newsCard).join('')}</div></section>

  <section class="blk wrap"><div class="sh"><h2>المؤشرات</h2><p>أحدث قراءة لمؤشرات الرضا وتجربة الحكومة الرقمية حول العالم.</p><a class="more" href="#/indices">كل المؤشرات ←</a></div>
    <div class="board">${IX.slice(0,8).map(ixCard).join('')}</div></section>

  <section class="blk wrap"><div class="sh"><h2>الترتيب العالمي والخليجي</h2><p>مؤشر الأمم المتحدة لتطوير الحكومة الإلكترونية 2024. اضغط أي دولة لفتح ملفها.</p><a class="more" href="#/atlas">الأطلس الكامل ←</a></div>
    <div class="leaders">
      <div class="panel"><h3>أعلى 10 دول عالمياً</h3><div class="rank">${ranked.slice(0,10).map(rankRow).join('')}</div></div>
      <div class="panel"><h3>دول مجلس التعاون</h3><p class="sub">الترتيب العالمي لكل دولة من 193.</p><div class="rank">${gulf.map(rankRow).join('')}</div></div>
    </div></section>

  <section class="blk wrap"><div class="sh"><h2>مبادرات ذات أثر</h2><p>ما فعلته الحكومات لتحسين تجربة المستفيد، وما تحقق بالأرقام.</p><a class="more" href="#/initiatives">كل المبادرات ←</a></div>
    <div class="inits">${pick.map(i=>iniCard(i)).join('')}</div></section>

  <section class="cta"><div class="wrap">
    <div><div class="eyebrow">JOURNEY DESIGN</div><h2>صمّم رحلة عميلك بالمنهجية والأداة</h2>
      <p>منهجية من ثماني خطوات من دراسة الوضع الراهن حتى المؤشرات، وأداة تفاعلية لرسم الرحلة بمراحلها ومشاعرها ونقاط الألم والفرص، ومكتبة رحلات حكومية عالمية وقوالب جاهزة.</p>
      <div class="acts2"><a class="btn pri" href="#/journey/tool">افتح أداة رسم الرحلة</a><a class="btn" href="#/journey">المنهجية</a></div></div>
    <div class="mini" aria-hidden="true">${miniJourney()}</div>
  </div></section>`;
  drawMap($('#heroMap'));
  const f=$('#findC'); f.addEventListener('change',()=>{ const q=norm(f.value.trim()); const hit=ranked.find(([c,d])=>norm(d[0])===q||norm(d[1])===q)||Object.entries(C).find(([c,d])=>norm(d[0]).includes(q)||norm(d[1]).includes(q)); if(hit) location.hash='#/country/'+hit[0].toLowerCase(); });
  f.addEventListener('keydown',e=>{ if(e.key==='Enter') f.dispatchEvent(new Event('change')); });
}
function miniJourney(){
  const st=['اكتشاف','تقديم','متابعة','إنجاز','تقييم'], em=[0,-1,-2,1,2], W=520,H=200, x=i=>40+i*(W-80)/4, y=v=>110-v*32;
  let g=`<rect x="0" y="0" width="${W}" height="${H}" fill="none"/>`;
  st.forEach((s,i)=>{ g+=`<rect x="${x(i)-44}" y="12" width="88" height="30" rx="8" fill="var(--surface-2)"/><text x="${x(i)}" y="32" text-anchor="middle" font-size="13" font-weight="600" fill="var(--fg)" font-family="IBM Plex Sans Arabic,sans-serif">${s}</text>`; });
  g+=`<line x1="20" x2="${W-20}" y1="110" y2="110" stroke="var(--line-2)" stroke-dasharray="4 4"/>`;
  const d=em.map((v,i)=>(i?'L':'M')+x(i)+' '+y(v)).join(' ');
  g+=`<path d="${d}" fill="none" stroke="var(--accent)" stroke-width="2.5"/>`;
  em.forEach((v,i)=>{ g+=`<circle cx="${x(i)}" cy="${y(v)}" r="6" fill="${v<0?'var(--down)':v>0?'var(--up)':'var(--muted)'}"/>`; });
  g+=`<rect x="${x(2)-60}" y="${y(-2)+14}" width="120" height="26" rx="7" fill="color-mix(in srgb, var(--down) 15%, transparent)"/><text x="${x(2)}" y="${y(-2)+32}" text-anchor="middle" font-size="12" fill="var(--fg)" font-family="IBM Plex Sans Arabic,sans-serif">لا يعرف حالة طلبه</text>`;
  return `<svg viewBox="0 0 ${W} ${H}" style="direction:ltr">${g}</svg>`;
}

function pageAtlas(){
  let region='all', sort='rank', q='';
  const counts={all:0}; Object.values(C).forEach(d=>{ if(d[2]==null) return; counts.all++; counts[d[4]]=(counts[d[4]]||0)+1; });
  main.innerHTML = `<div class="wrap">
    <header class="pagehead"><div class="eyebrow">ATLAS</div><h1>أطلس الدول</h1><p>كل دولة ملونة بدرجتها في مؤشر الأمم المتحدة لتطوير الحكومة الإلكترونية 2024. الدول ذات النقطة الذهبية لها ملف معمّق بالجهات والمؤشرات والمبادرات والأخبار.</p></header>
    <div class="regions chips" id="regs">${[['all','كل الدول'],...Object.entries(REG)].map(([k,l])=>`<button class="chip" type="button" data-k="${k}" aria-pressed="${k==='all'}">${k!=='all'?`<span class="dot" style="--c:var(--${k})"></span>`:''}${l} <span class="n">${counts[k]||0}</span></button>`).join('')}</div>
    <div class="atlas-map mapbox" id="atlasMap"></div>
    <div class="filters" style="margin-top:18px"><div class="chips" id="sorts"><button class="chip" data-s="rank" aria-pressed="true" type="button">الترتيب</button><button class="chip" data-s="name" aria-pressed="false" type="button">الاسم</button><button class="chip" data-s="deep" aria-pressed="false" type="button">الملفات المعمقة أولاً</button></div>${filterField('qC','ابحث عن دولة')}</div>
    <div class="tablewrap"><table class="ct"><thead><tr><th>#</th><th>الدولة</th><th>الإقليم</th><th class="num">EGDI 2024</th><th></th><th>الملف</th></tr></thead><tbody id="ctb"></tbody></table></div>
  </div>`;
  const rows=()=>{ let r=Object.entries(C).filter(([,d])=>d[2]!=null&&(region==='all'||d[4]===region));
    if(q){const n=norm(q); r=r.filter(([c,d])=>norm(d[0]).includes(n)||norm(d[1]).includes(n));}
    r.sort(sort==='name'?(a,b)=>a[1][0].localeCompare(b[1][0],'ar'):sort==='deep'?(a,b)=>(!!P[b[0]]-!!P[a[0]])||a[1][3]-b[1][3]:(a,b)=>a[1][3]-b[1][3]);
    $('#ctb').innerHTML = r.map(([c,d])=>`<tr data-c="${c}"><td class="num">${d[3]}</td><td><span class="nm">${flag(c,'sm')}<span>${esc(d[0])} <span class="en">${esc(d[1])}</span></span></span></td><td><span class="dot" style="--c:var(--${d[4]})"></span> ${REG[d[4]]||''}</td><td class="num">${d[2].toFixed(4)}</td><td><div class="bar-in"><i style="width:${(d[2]*100).toFixed(1)}%"></i></div></td><td>${P[c]?'<span class="badge">ملف معمّق</span>':''}</td></tr>`).join('') || '<tr><td colspan="6" class="empty">لا توجد دولة بهذا الاسم.</td></tr>';
  };
  rows(); drawMap($('#atlasMap'));
  $('#regs').addEventListener('click',e=>{const b=e.target.closest('[data-k]'); if(!b) return; region=b.dataset.k; $$('#regs .chip').forEach(x=>x.setAttribute('aria-pressed',x===b)); rows(); drawMap($('#atlasMap'),{region});});
  $('#sorts').addEventListener('click',e=>{const b=e.target.closest('[data-s]'); if(!b) return; sort=b.dataset.s; $$('#sorts .chip').forEach(x=>x.setAttribute('aria-pressed',x===b)); rows();});
  $('#qC').addEventListener('input',e=>{q=e.target.value; rows();});
  $('#ctb').addEventListener('click',e=>{const tr=e.target.closest('tr[data-c]'); if(tr) location.hash='#/country/'+tr.dataset.c.toLowerCase();});
}

function pageCountry(code){
  const c=code.toUpperCase(), d=C[c];
  if(!d){ main.innerHTML=`<div class="wrap"><header class="pagehead"><h1>الدولة غير موجودة</h1><p><a href="#/atlas">العودة إلى الأطلس</a></p></header></div>`; return; }
  const p=P[c], news=items.filter(i=>i.c===c);
  const reg = Object.values(C).filter(x=>x[4]===d[4]&&x[2]!=null), regAvg = reg.reduce((a,x)=>a+x[2],0)/(reg.length||1);
  const all = Object.values(C).filter(x=>x[2]!=null), wAvg = all.reduce((a,x)=>a+x[2],0)/all.length;
  const regRank = d[2]!=null ? reg.filter(x=>x[2]>d[2]).length+1 : null;
  const ranked = Object.entries(C).filter(([,x])=>x[3]).sort((a,b)=>a[1][3]-b[1][3]); const idx = ranked.findIndex(([k])=>k===c);
  const near = idx>=0 ? ranked.slice(Math.max(0,idx-3),idx+4).filter(([k])=>k!==c) : [];
  const deepNear = deepCodes.filter(k=>k!==c && C[k][4]===d[4]).slice(0,6);
  const pos = v => `${(v*100).toFixed(2)}%`;
  main.innerHTML = `<div class="wrap">
  <div class="chero">
    <div>
      <div class="crumbs"><a href="#/atlas">الأطلس</a><span>›</span><span>${REG[d[4]]||''}</span></div>
      <div class="ctitle" style="margin-top:10px">${flag(c,'lg')}<div><h1>${esc(d[0])}</h1><div class="en">${esc(d[1])}</div></div></div>
      ${p?`<p class="csum">${esc(p.summary)}</p>`:`<div class="pending" style="margin-top:16px"><b>الملف المعمّق قيد الإعداد</b><span>تظهر هنا بيانات الدولة في مؤشر الأمم المتحدة، وأي أخبار نرصدها عنها. تتوسع الملفات المعمقة مع كل تحديث.</span></div>`}
      ${p&&p.bodies&&p.bodies.length?`<div class="bodies" style="margin-top:16px">${p.bodies.map(b=>`<a href="${esc(b.u)}" target="_blank" rel="noopener">${esc(b.n)} ${I.ext.replace('<svg','<svg width="13" height="13"')}</a>`).join('')}</div>`:''}
    </div>
    <aside class="egcard">
      <div class="k"><span>مؤشر تطوير الحكومة الإلكترونية 2024</span><span>الأمم المتحدة</span></div>
      ${d[2]!=null?`<div class="v">${d[2].toFixed(4)}</div>
      <div class="k"><span>الترتيب العالمي</span><span class="rk" dir="ltr">${d[3]} / 193</span></div>
      <div class="k"><span>الترتيب في ${REG[d[4]]}</span><span class="rk" dir="ltr">${regRank} / ${reg.length}</span></div>
      <div><div class="scale"><span class="ln"></span><span class="mk" style="left:${pos(wAvg)}" title="المتوسط العالمي"></span><span class="mk" style="left:${pos(regAvg)};background:var(--accent)" title="متوسط الإقليم"></span><span class="me" style="left:${pos(d[2])}"></span></div><div class="scale-lbl"><span>0</span><span>1</span></div></div>
      <div class="cmp"><div><span>متوسط ${REG[d[4]]}</span><span>${regAvg.toFixed(4)}</span></div><div><span>المتوسط العالمي</span><span>${wAvg.toFixed(4)}</span></div></div>`
      :'<p class="src">هذه المنطقة غير مدرجة في قائمة الأمم المتحدة للمؤشر.</p>'}
      <a class="src" href="https://publicadministration.un.org/egovkb/en-us/data-center" target="_blank" rel="noopener">المصدر: UN E-Government Survey 2024</a>
    </aside>
  </div>
  ${p&&p.metrics&&p.metrics.length?`<section class="blk" style="padding-top:28px"><div class="sh"><h2>أرقام رئيسية</h2></div><div class="mgrid">${p.metrics.map(m=>`<div class="mc"><b dir="${dirOf(m.v)}">${esc(m.v)}</b><span>${esc(m.l)}</span><small>${esc(m.d)} · <a href="${esc(m.u)}" target="_blank" rel="noopener">${esc(m.s)}</a></small></div>`).join('')}</div></section>`:''}
  ${p&&p.initiatives&&p.initiatives.length?`<section class="blk"><div class="sh"><h2>مبادرات ذات أثر</h2></div><div class="inits">${p.initiatives.map(i=>iniCard({...i,c},false)).join('')}</div></section>`:''}
  <section class="blk"><div class="sh"><h2>المستجدات</h2>${news.length?'':''}</div>${news.length?`<div class="feed">${news.map(newsCard).join('')}</div>`:`<p class="empty">لا توجد مستجدات مرصودة عن ${esc(d[0])} حتى الآن.</p>`}</section>
  ${near.length?`<section class="blk"><div class="sh"><h2>دول قريبة في الترتيب</h2></div><div class="near">${near.map(([k,x])=>`<a href="#/country/${k.toLowerCase()}">${flag(k,'sm')}${esc(x[0])}<span class="num">#${x[3]}</span></a>`).join('')}</div></section>`:''}
  ${deepNear.length?`<section class="blk"><div class="sh"><h2>ملفات معمقة في ${REG[d[4]]}</h2></div><div class="near">${deepNear.map(k=>`<a href="#/country/${k.toLowerCase()}">${flag(k,'sm')}${esc(C[k][0])}</a>`).join('')}</div></section>`:''}
  </div>`;
  document.title = `${d[0]} | CX Knowledge`;
}

function pageNews(focus){
  let fReg='all', fType='all', fC='all', fQ='';
  const cs=[...new Set(items.map(i=>i.c))].sort((a,b)=>cname(a).localeCompare(cname(b),'ar'));
  main.innerHTML = `<div class="wrap">
    <header class="pagehead"><div class="eyebrow">NEWSROOM</div><h1>المستجدات</h1><p>أخبار ودراسات ونتائج مؤشرات وفعاليات تجربة العميل، الأحدث أولاً، مع رابط المصدر الأصلي لكل مادة. المواد الإنجليزية مترجمة ومختصرة.</p></header>
    <div class="filters"><div class="chips" id="fr"></div><div class="chips" id="ft"></div>
      <select class="sel" id="fc" aria-label="الدولة"><option value="all">كل الدول</option>${cs.map(c=>`<option value="${c}">${esc(cname(c))}</option>`).join('')}</select>
      ${filterField('fq','ابحث في المستجدات')}</div>
    <div class="feed" id="fl"></div></div>`;
  const chipRow=(el,map,key,cur)=>{ const cnt={all:items.length}; items.forEach(i=>cnt[i[key]]=(cnt[i[key]]||0)+1);
    el.innerHTML=[['all','الكل'],...Object.entries(map)].filter(([k])=>cnt[k]).map(([k,l])=>`<button class="chip" type="button" data-k="${k}" aria-pressed="${k===cur}">${l} <span class="n">${cnt[k]}</span></button>`).join(''); };
  const render=()=>{ chipRow($('#fr'),RNAME,'region',fReg); chipRow($('#ft'),TYP,'type',fType);
    const q=norm(fQ.trim()); const list=items.filter(i=>(fReg==='all'||i.region===fReg)&&(fType==='all'||i.type===fType)&&(fC==='all'||i.c===fC)&&(!q||norm(i.title+' '+i.summary+' '+i.source+' '+(i.topic||'')+' '+cname(i.c)).includes(q)));
    $('#fl').innerHTML = list.length?list.map(newsCard).join(''):'<p class="empty">لا توجد مواد تطابق هذا البحث.</p>'; };
  $('#fr').addEventListener('click',e=>{const b=e.target.closest('[data-k]'); if(b){fReg=b.dataset.k; render();}});
  $('#ft').addEventListener('click',e=>{const b=e.target.closest('[data-k]'); if(b){fType=b.dataset.k; render();}});
  $('#fc').addEventListener('change',e=>{fC=e.target.value; render();});
  $('#fq').addEventListener('input',e=>{fQ=e.target.value; render();});
  render();
  if(focus){ const el=document.getElementById('n-'+focus); if(el){ setTimeout(()=>{ el.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'}); el.classList.add('hit'); setTimeout(()=>el.classList.remove('hit'),2600); },60); } }
}

function pageIndices(){
  main.innerHTML = `<div class="wrap"><header class="pagehead"><div class="eyebrow">INDICES</div><h1>المؤشرات</h1><p>أحدث قراءة لكل مؤشر مع اتجاه التغير ومصدره. اضغط البطاقة لفتح المصدر.</p></header>
  ${Object.entries(KIND).map(([k,l])=>{ const xs=IX.filter(x=>x.kind===k); return xs.length?`<section class="blk" style="padding-top:28px"><div class="sh"><h2>${l}</h2></div><div class="board">${xs.map(ixCard).join('')}</div></section>`:''; }).join('')}</div>`;
}

function pageInitiatives(){
  let th='all', q='';
  const cnt={all:allInits.length}; allInits.forEach(i=>cnt[i.theme]=(cnt[i.theme]||0)+1);
  main.innerHTML = `<div class="wrap"><header class="pagehead"><div class="eyebrow">INITIATIVES</div><h1>المبادرات ذات الأثر</h1><p>مبادرات حكومية لتحسين تجربة المستفيد من ${deepCodes.length} دولة، مصنفة بحسب نوعها، مع الأثر المعلن ومصدره.</p></header>
    <div class="filters"><div class="chips" id="th">${[['all','الكل'],...Object.entries(THEME)].filter(([k])=>cnt[k]).map(([k,l])=>`<button class="chip" type="button" data-k="${k}" aria-pressed="${k==='all'}">${l} <span class="n">${cnt[k]}</span></button>`).join('')}</div>${filterField('iq','ابحث في المبادرات')}</div>
    <div class="inits" id="il"></div></div>`;
  const render=()=>{ const n=norm(q.trim()); const l=allInits.filter(i=>(th==='all'||i.theme===th)&&(!n||norm(i.t+' '+i.d+' '+(i.impact||'')+' '+cname(i.c)).includes(n)));
    $('#il').innerHTML=l.length?l.map(i=>iniCard(i)).join(''):'<p class="empty">لا توجد مبادرات تطابق البحث.</p>'; };
  $('#th').addEventListener('click',e=>{const b=e.target.closest('[data-k]'); if(!b) return; th=b.dataset.k; $$('#th .chip').forEach(x=>x.setAttribute('aria-pressed',x===b)); render();});
  $('#iq').addEventListener('input',e=>{q=e.target.value; render();});
  render();
}

function pageJourney(sub){
  sub = sub||'method';
  const tabs=[['method','المنهجية'],['tool','أداة رسم الرحلة'],['library','مكتبة الرحلات'],['kit','القوالب والمصطلحات']];
  main.innerHTML = `<div class="wrap"><header class="pagehead"><div class="eyebrow">JOURNEY DESIGN</div><h1>تصميم رحلة العميل</h1><p>من دراسة الوضع الراهن إلى مؤشرات الأداء: منهجية عملية، وأداة لرسم الرحلة، ونماذج من حكومات العالم، وقوالب جاهزة.</p></header>
    <nav class="jtabs" aria-label="أقسام تصميم الرحلة">${tabs.map(([k,l])=>`<a href="#/journey/${k}" ${k===sub?'aria-current="page"':''}>${l}</a>`).join('')}</nav><div id="jbody"></div></div>`;
  const b=$('#jbody');
  if(sub==='method'){
    b.innerHTML = `<div class="steps">${J.method.map((s,i)=>`<div class="step"><div class="no">${i+1}</div><div><h3>${esc(s.t)}</h3><p>${esc(s.d)}</p><div class="outs">${s.out.map(o=>`<span>${esc(o)}</span>`).join('')}</div><p class="tp">${esc(s.tip)}</p></div></div>`).join('')}</div>
    <section class="blk" style="padding-top:20px"><div class="sh"><h2>مؤشرات قياس الرحلة</h2><p>اجمع بين مؤشر لرضا المستفيد ومؤشر للجهد ومؤشر للزمن ومؤشر للحل.</p></div><div class="kpis">${J.kpis.map(k=>`<div class="kpi"><b>${esc(k.n)}</b><code>${esc(k.e)}</code><p>${esc(k.d)}</p></div>`).join('')}</div></section>`;
  } else if(sub==='tool'){
    window.CXK_JourneyTool && window.CXK_JourneyTool(b);
  } else if(sub==='library'){
    b.innerHTML = `<section class="blk" style="padding-top:26px"><div class="inits">${J.library.map(x=>`<article class="ini"><div class="who">${flag(x.c,'sm')}<a href="#/country/${x.c.toLowerCase()}">${esc(cname(x.c))}</a> · <span class="theme">${esc(x.theme)}</span><span class="y num">${esc(x.y)}</span></div><h3>${esc(x.t)}</h3><p>${esc(x.d)}</p><a class="open" href="${esc(x.u)}" target="_blank" rel="noopener">${esc(x.o)} ${I.ext}</a></article>`).join('')}</div></section>`;
  } else {
    b.innerHTML = `<section class="blk" style="padding-top:26px"><div class="sh"><h2>قوالب جاهزة</h2><p>ملفات CSV تفتح في Excel وGoogle Sheets.</p></div><div class="tpls">${J.templates.map(t=>`<div class="tpl"><b>${esc(t.t)}</b><p>${esc(t.d)}</p><a class="btn sm" href="templates/${t.f}" download>${I.dl} تنزيل</a></div>`).join('')}</div></section>
    <section class="blk"><div class="sh"><h2>المصطلحات</h2>${filterField('gq','ابحث عن مصطلح')}</div><div class="tablewrap"><table class="gloss"><thead><tr><th>المصطلح</th><th>بالإنجليزية</th><th>التعريف</th></tr></thead><tbody id="gl"></tbody></table></div></section>`;
    const r=q=>{const n=norm(q); $('#gl').innerHTML=J.glossary.filter(g=>!n||norm(g.join(' ')).includes(n)).map(g=>`<tr><td>${esc(g[0])}</td><td>${esc(g[1])}</td><td>${esc(g[2])}</td></tr>`).join('')||'<tr><td colspan="3" class="empty">لا يوجد مصطلح مطابق.</td></tr>';};
    r(''); $('#gq').addEventListener('input',e=>r(e.target.value));
  }
}

function pageAbout(){
  const srcs=[...new Set(items.map(i=>i.source))];
  main.innerHTML = `<div class="wrap"><header class="pagehead"><div class="eyebrow">METHOD</div><h1>المنهجية والمصادر</h1></header>
  <div class="prose">
    <h2>ماذا نرصد</h2><p>أخبار تجربة العميل، والدراسات المنشورة، ونتائج المؤشرات الوطنية والدولية لرضا العملاء وتجربة المستفيد في الحكومة والقطاع الخاص، والمبادرات الحكومية ذات الأثر المعلن.</p>
    <h2>كيف ننقل</h2><ul><li>نقرأ المصدر الأصلي ونكتب ملخصاً بالعربية بأرقامه كما وردت.</li><li>المواد الإنجليزية تحمل وسم «مترجم»، ولكل مادة رابط مصدرها وتاريخ نشره.</li><li>لا ننشر رقماً لم يرد في المصدر نفسه.</li></ul>
    <h2>طبقة الخريطة</h2><p>تُلوَّن الدول بدرجتها في مؤشر تطوير الحكومة الإلكترونية (EGDI) الصادر عن الأمم المتحدة في مسح 2024، ويغطي 193 دولة. الملفات المعمقة تضيف الجهات المسؤولة وأرقاماً رئيسية ومبادرات من مصادر رسمية وإعلامية.</p>
    <h2>التحديث</h2><p>يُحدَّث المحتوى آلياً مرتين يومياً: بحث في المصادر الموثوقة، والتحقق من الأرقام والتواريخ، ثم النشر.</p>
    <h2>المصادر الحالية</h2><p>${srcs.map(esc).join(' · ')}</p>
  </div></div>`;
}

/* ---------- router ---------- */
function route(){
  const h = location.hash.replace(/^#\/?/,''), [a,b] = h.split('/');
  document.title = 'CX Knowledge | معرفة تجربة العميل';
  $$('#nav a').forEach(x=>{ if(x.dataset.r===(a==='country'?'atlas':a==='item'?'news':a)) x.setAttribute('aria-current','page'); else x.removeAttribute('aria-current'); });
  $('#nav').classList.remove('open'); $('#menuBtn').setAttribute('aria-expanded','false'); $('#tip').hidden=true;
  main.classList.remove('fade'); void main.offsetWidth; main.classList.add('fade');
  if(!a) pageHome();
  else if(a==='atlas') pageAtlas();
  else if(a==='country' && b) pageCountry(b);
  else if(a==='news') pageNews();
  else if(a==='item' && b) pageNews(b);
  else if(a==='indices') pageIndices();
  else if(a==='initiatives') pageInitiatives();
  else if(a==='journey') pageJourney(b);
  else if(a==='about') pageAbout();
  else if(a.length===2 && C[a.toUpperCase()]) pageCountry(a);
  else pageHome();
  if(a!=='item') window.scrollTo(0,0);
}
window.addEventListener('hashchange',route);

/* ---------- global events ---------- */
document.addEventListener('click',e=>{ const b=e.target.closest('[data-copy]'); if(b){ copy(b.dataset.copy); } });
$('#menuBtn').addEventListener('click',()=>{ const o=$('#nav').classList.toggle('open'); $('#menuBtn').setAttribute('aria-expanded',o); });
$('#themeBtn').addEventListener('click',()=>{
  const r=document.documentElement, cur=r.getAttribute('data-theme') || (matchMedia('(prefers-color-scheme: light)').matches?'light':'dark'), nx=cur==='dark'?'light':'dark';
  r.setAttribute('data-theme',nx); try{localStorage.setItem('cxk-theme',nx);}catch(e){}
  $$('.mapbox').forEach(box=>{ $$('path.c',box).forEach(p=>{ const d=C[p.dataset.c]; if(d&&d[2]!=null) p.setAttribute('fill',egdiColor(d[2])); }); $$('.legend .sw i',box).forEach((el,i)=>el.style.background=egdiColor([0.1,0.3,0.6,0.8,0.95][i])); });
});
let pop=null;
$('#shareBtn').addEventListener('click',e=>{
  e.stopPropagation(); if(pop){pop.remove();pop=null;return;}
  const url=SITE+location.hash, text='CX Knowledge: أخبار ودراسات ومؤشرات ومبادرات تجربة العميل من 193 دولة بالعربية', L=shareLinks(text,url);
  pop=document.createElement('div'); pop.className='pop'; pop.dir='rtl';
  pop.innerHTML=`<a href="${L.x}" target="_blank" rel="noopener">${I.x} X</a><a href="${L.wa}" target="_blank" rel="noopener">${I.wa} واتساب</a><a href="${L.li}" target="_blank" rel="noopener">${I.li} لينكدإن</a><button type="button" data-copy="${esc(text+'\n'+url)}">${I.cp} نسخ الرابط</button>`;
  document.body.appendChild(pop); const r=e.currentTarget.getBoundingClientRect();
  pop.style.top=(r.bottom+scrollY+8)+'px'; pop.style.left=Math.max(12,Math.min(r.left+scrollX, innerWidth-230))+'px';
});
document.addEventListener('click',e=>{ if(pop && !pop.contains(e.target) && !e.target.closest('#shareBtn')){ pop.remove(); pop=null; } });

window.CXK = {esc, flag, toast, copy, I};
route();
})();
