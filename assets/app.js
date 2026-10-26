/* CX Knowledge — المرصد: ثنائي اللغة، ليلي ونهاري، بث مباشر وخريطة وأطلس وتحليلات ومؤشرات ومبادرات ومصادر */
(function(){
"use strict";
const C = window.CXK_COUNTRIES || {}, P = window.CXK_PROFILES || {}, N = window.CXK_NEWS || {items:[]}, IX = window.CXK_INDICES || [], SRC = window.CXK_SOURCES || [], I18N = window.CXK_I18N;
const $ = (s,el=document)=>el.querySelector(s), $$=(s,el=document)=>[...el.querySelectorAll(s)];
const main = $('#main');
const esc = s => String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let LANG = 'ar', S = I18N.ar;
const L = (o,f) => (LANG==='en' && o && o[f+'_en']!=null && o[f+'_en']!=='') ? o[f+'_en'] : (o?o[f]:'');
const dirOf = v => /[؀-ۿ]/.test(v) ? 'rtl' : 'ltr';
const toDate = s => new Date(s.length===7 ? s+'-15T12:00:00' : s.length===10 ? s+'T12:00:00' : s);
const fmtD = () => new Intl.DateTimeFormat(LANG==='en'?'en-GB':'ar-SA-u-nu-latn-ca-gregory',{day:'numeric',month:'long',year:'numeric'});
const fmtM = () => new Intl.DateTimeFormat(LANG==='en'?'en-GB':'ar-SA-u-nu-latn-ca-gregory',{month:'long',year:'numeric'});
const dLabel = s => s.length===7 ? fmtM().format(toDate(s)) : fmtD().format(toDate(s));
const items = N.items.slice().sort((a,b)=>toDate(b.date)-toDate(a.date));
const cname = c => !c||c==='WW' ? S.world : (C[c] ? C[c][LANG==='en'?1:0] : c);
const flag = (c,cls='') => c && c!=='WW' && C[c] ? `<img class="flag ${cls}" src="https://flagcdn.com/${c.toLowerCase()}.svg" alt="" loading="lazy" width="24" height="17" onerror="this.style.visibility='hidden'">` : `<svg class="flag ${cls}" viewBox="0 0 24 17" aria-hidden="true"><rect width="24" height="17" rx="2" fill="var(--surface-3)"/><circle cx="12" cy="8.5" r="5.5" fill="none" stroke="var(--muted)" stroke-width="1.1"/><path d="M6.5 8.5h11M12 3c-2.6 3-2.6 8 0 11M12 3c2.6 3 2.6 8 0 11" fill="none" stroke="var(--muted)" stroke-width=".9"/></svg>`;
const SITE = location.origin + location.pathname;
const deepCodes = Object.keys(P);
const allInits = deepCodes.flatMap(c=>(P[c].initiatives||[]).map(i=>({...i,c})));
const norm = s => String(s).toLowerCase().replace(/[أإآ]/g,'ا').replace(/ة/g,'ه').replace(/ى/g,'ي').replace(/[ً-ْ]/g,'');
let LIVE = {updated:null, stats:{}, items:[]};
let LENS = ''; try{ LENS = localStorage.getItem('cxk-lens')||''; }catch(e){}
let THEMEPREF = 'auto'; try{ THEMEPREF = localStorage.getItem('cxk-theme2')||'auto'; }catch(e){}
const href = p => '#/' + (LANG==='en' ? 'en/' : '') + String(p||'').replace(/^\/+/,'');

const I = {
  x:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M17.8 3h3.1l-6.8 7.7L22 21h-6.3l-4.9-6.4L5.2 21H2.1l7.3-8.3L1.8 3h6.4l4.4 5.9L17.8 3Zm-1.1 16.2h1.7L7.4 4.7H5.5l11.2 14.5Z"/></svg>',
  wa:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.3-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.5 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.5-.3Z"/></svg>',
  li:'<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.8v1.6h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1V21h-4v-4.9c0-1.17-.02-2.68-1.63-2.68-1.64 0-1.89 1.28-1.89 2.6V21h-3.88V9.75Z"/></svg>',
  cp:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v1"/></svg>',
  ext:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/></svg>',
  search:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
  img:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-5-5L5 21"/></svg>',
  sun:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>',
  moon:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round" aria-hidden="true"><path d="M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5Z"/></svg>',
  auto:'<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><circle cx="12" cy="12" r="8"/><path d="M12 4a8 8 0 0 1 0 16Z" fill="currentColor"/></svg>'
};

/* ---------- helpers ---------- */
const toast = msg => { const t=$('#toast'); t.textContent=msg; t.classList.add('on'); clearTimeout(toast.h); toast.h=setTimeout(()=>t.classList.remove('on'),2300); };
async function copy(text){
  try{ await navigator.clipboard.writeText(text); toast(S.copied); }
  catch(_){ const ta=document.createElement('textarea'); ta.value=text; ta.style.position='fixed'; ta.style.opacity='0'; document.body.appendChild(ta); ta.select(); let ok=false; try{ok=document.execCommand('copy');}catch(e){} ta.remove(); toast(ok?S.copied:S.copyFail); }
}
const shareLinks = (text,url) => ({ x:`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, wa:`https://wa.me/?text=${encodeURIComponent(text+' '+url)}`, li:`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}` });
const minsAgo = iso => Math.max(0,Math.round((Date.now()-Date.parse(iso))/60000));
function rel(iso){ const m=minsAgo(iso); if(m<1) return S.now; if(m<60) return m+' '+S.min; const h=Math.round(m/60); if(h<24) return h+' '+S.hr; return Math.round(h/24)+' '+S.day; }
const agoLong = iso => S.agoFn(minsAgo(iso));
const BINS=[0.25,0.5,0.75,0.9];
const binOf = v => { let i=0; while(i<BINS.length && v>=BINS[i]) i++; return i; };
function mix(t){ const cs=getComputedStyle(document.documentElement), h=x=>[1,3,5].map(i=>parseInt(x.trim().slice(i,i+2),16)); const a=h(cs.getPropertyValue('--ramp-lo')), b=h(cs.getPropertyValue('--ramp-hi')); return `rgb(${a.map((x,i)=>Math.round(x+(b[i]-x)*t)).join(',')})`; }
const egdiColor = v => mix([.06,.2,.38,.58,.82][binOf(v)]);
function spark(t){
  if(!t||t.length<2) return '';
  const w=200,h=40,p=4,mn=Math.min(...t),mx=Math.max(...t),r=(mx-mn)||1;
  const pts=t.map((v,i)=>[p+i*(w-2*p)/(t.length-1),h-p-(v-mn)/r*(h-2*p-6)]);
  const d=pts.map((q,i)=>(i?'L':'M')+q[0].toFixed(1)+' '+q[1].toFixed(1)).join(' '), l=pts[pts.length-1];
  return `<svg viewBox="0 0 ${w} ${h}" preserveAspectRatio="none" style="direction:ltr" aria-hidden="true"><path d="${d}" fill="none" stroke="var(--fg-2)" stroke-width="1.6" vector-effect="non-scaling-stroke"/><circle cx="${l[0]}" cy="${l[1]}" r="3.2" fill="var(--accent)"/></svg>`;
}
const filterField = (id,ph) => `<label class="field"><span class="sr">${ph}</span>${I.search}<input id="${id}" type="search" placeholder="${ph}" autocomplete="off"></label>`;
const lensed = arr => LENS ? arr.filter(x=>x.c===LENS) : arr;
const recent = (days=7) => { const cut=Date.now()-days*864e5; return LIVE.items.filter(x=>Date.parse(x.d)>=cut); };
function heatDays(){ const s=new Set(recent(7).map(x=>x.c).filter(c=>c&&c!=='WW')); return s.size>=8?7:30; }
function heat(days){ days=days||heatDays(); const m={}; recent(days).forEach(x=>{ if(x.c&&x.c!=='WW') m[x.c]=(m[x.c]||0)+1; }); return m; }
const wTitle = x => (LANG==='en' && x.t_en) ? x.t_en : x.t;
const wLang = x => (LANG==='en' && x.t_en) ? 'en' : x.l;

/* ---------- cards ---------- */
function wireItem(x){
  const fresh = Date.now()-Date.parse(x.d) < 3*36e5, t=wTitle(x), l=wLang(x);
  const lt = (l==='ar' || (l==='en' && LANG==='en')) ? '' : String(l||'').toUpperCase();
  return `<a class="wi${fresh?' new':''}" href="${esc(x.u)}" target="_blank" rel="noopener" data-c="${esc(x.c)}" data-id="${esc(x.id)}">
    <span class="tm">${rel(x.d)}</span>
    <span><span class="tt" dir="${dirOf(t)}">${esc(t)}</span>
      <span class="mt"><span class="src">${esc(x.s)}</span>${x.c&&x.c!=='WW'?`<span class="ctry">${flag(x.c,'sm')}${esc(cname(x.c))}</span>`:''}${x.f==='editorial'?`<span class="tag ed">${S.editorial}</span>`:''}${lt?`<span class="tag en">${esc(lt)}</span>`:''}${(x.k||[]).filter(k=>k!=='digital').slice(0,2).map(k=>`<span class="tag">${S.cats[k]}</span>`).join('')}</span></span></a>`;
}
function newsCard(i){
  const url = SITE+href('item/'+i.id), title=L(i,'title'), text = title+(i.stat?` — ${L(i.stat,'v')} ${L(i.stat,'l')}`:'')+' | CX Knowledge', Lk=shareLinks(text,url);
  return `<article class="card" id="n-${esc(i.id)}">
    <div class="meta"><span class="type ${i.type}">${S.types[i.type]||''}</span>
      ${i.c && i.c!=='WW' ? `<a class="ctry" href="${href('country/'+i.c.toLowerCase())}">${flag(i.c,'sm')}${esc(cname(i.c))}</a>` : `<span class="ctry">${flag('WW','sm')}${S.world}</span>`}
      <time datetime="${i.date}">${dLabel(i.date)}</time></div>
    <h3>${esc(title)}</h3>
    ${i.stat?`<div class="stat"><b dir="${dirOf(L(i.stat,'v'))}">${esc(L(i.stat,'v'))}</b><span>${esc(L(i.stat,'l'))}</span></div>`:''}
    <p class="sum">${esc(L(i,'summary'))}</p>
    <div class="cfoot"><span class="s"><a class="open" href="${esc(i.url)}" target="_blank" rel="noopener">${esc(i.source)} ${I.ext}</a>${i.lang==='en'&&LANG==='ar'?`<span class="tr">${S.translated}</span>`:''}</span>
      <span class="acts"><a class="ic" href="${Lk.x}" target="_blank" rel="noopener" aria-label="X">${I.x}</a><a class="ic" href="${Lk.wa}" target="_blank" rel="noopener" aria-label="WhatsApp">${I.wa}</a><button class="ic" type="button" data-copy="${esc(text+'\n'+url)}" aria-label="${S.copyLink}">${I.cp}</button></span></div>
  </article>`;
}
function ixCard(x){
  const up = x.change>0, good = x.invert ? !up : up, cu = LANG==='en' ? (x.changeUnit_en||x.changeUnit) : x.changeUnit;
  const c = x.change==null ? '' : `<span class="chg ${good?'up':'down'}">${up?'▲ +':'▼ '}${x.change}${cu==='%'?'%':' '+(cu||'')}</span>`;
  const v = x.fmt==='0.0000' ? x.value.toFixed(4) : x.value;
  return `<a class="ix" href="${esc(x.url)}" target="_blank" rel="noopener">
    <div class="scope">${flag(x.c,'sm')}${esc(cname(x.c))} · ${esc(L(x,'publisher'))}</div>
    <h3>${esc(L(x,'name'))}</h3>
    <div>${x.trend?spark(x.trend):''}<div class="row"><span class="val">${v}${x.unit?`<small>${esc(x.unit)}</small>`:''}</span>${c}</div></div>
    <p class="note">${esc(L(x,'note'))}</p>
    <div class="ft"><span>${S.KIND[x.kind]||''}</span><span>${esc(L(x,'period'))}</span></div></a>`;
}
function iniCard(i, showCountry=true){
  return `<article class="ini">
    <div class="who">${showCountry?`${flag(i.c,'sm')}<a href="${href('country/'+i.c.toLowerCase())}">${esc(cname(i.c))}</a> · `:''}<span class="theme">${esc(S.THEME[i.theme]||'')}</span><span class="y num" dir="ltr">${esc(i.y||'')}</span></div>
    <h3>${esc(L(i,'t'))}</h3><p>${esc(L(i,'d'))}</p>
    ${i.impact?`<div class="impact"><small>${S.impact}</small>${esc(L(i,'impact'))}</div>`:''}
    <a class="open" href="${esc(i.u)}" target="_blank" rel="noopener">${S.source} ${I.ext}</a></article>`;
}

/* ---------- map ---------- */
let worldP=null;
function rewind(f){ if(!f.geometry) return f; const g=f.geometry; const fix=poly=>d3.geoArea({type:'Polygon',coordinates:poly})>2*Math.PI?poly.map(r=>r.slice().reverse()):poly;
  if(g.type==='Polygon') g.coordinates=fix(g.coordinates); else if(g.type==='MultiPolygon') g.coordinates=g.coordinates.map(fix); return f; }
function loadWorld(){ if(!worldP) worldP=fetch('data/world.json').then(r=>r.json()).then(t=>{ const w=topojson.feature(t,t.objects.countries); w.features.forEach(rewind); return w; }); return worldP; }
function drawMap(box, opts={}){
  const mode = opts.mode||'live';
  if(!box.dataset.drawn) box.innerHTML = `<div class="srcl" style="padding:16px">${S.loadingMap}</div>`;
  return loadWorld().then(w=>{
    const W=960,H=470, proj=d3.geoEqualEarth().fitExtent([[4,4],[W-4,H-4]],{type:'Sphere'}), path=d3.geoPath(proj);
    const hd = heatDays(), hm = heat(hd), mx = Math.max(1,...Object.values(hm));
    let s=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${mode==='live'?S.mapLive:S.mapEgdi}"><path class="sph" d="${path({type:'Sphere'})}"/><path class="grat" d="${path(d3.geoGraticule10())}"/>`;
    const cents={};
    w.features.forEach(f=>{ const a2=f.properties&&f.properties.a2; if(!a2) return; const d=C[a2]; const pd=path(f); if(!pd) return;
      let fill='var(--map-none)';
      if(mode==='live'){ const n=hm[a2]||0; fill = n ? mix(.22+.6*Math.sqrt(n/mx)) : (d&&d[2]!=null? mix(.03):'var(--map-none)'); }
      else if(d&&d[2]!=null) fill=egdiColor(d[2]);
      const dim = (opts.region && opts.region!=='all' && (!d||d[4]!==opts.region)) || (LENS && a2!==LENS && mode==='live');
      s+=`<path class="c${LENS===a2?' hl':''}" data-c="${a2}" d="${pd}" fill="${fill}"${dim?' opacity=".22"':''}/>`;
      if((mode==='live'&&hm[a2])||(mode==='egdi'&&P[a2])){ const p=proj(d3.geoCentroid(f)); if(p) cents[a2]=p; } });
    if(mode==='live'){
      Object.entries(hm).sort((a,b)=>a[1]-b[1]).forEach(([c,n])=>{ const p=cents[c]; if(!p) return; const r=(2.6+5*Math.sqrt(n/mx)).toFixed(1);
        s+=`<circle class="halo" cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="${r}" style="animation-delay:${(Math.random()*2).toFixed(2)}s"/><circle class="pin" cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="${r}"/>`; });
    } else Object.values(cents).forEach(p=>{ s+=`<circle class="dpin" cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="3.4"/>`; });
    s+='</svg>';
    const lab=['< 0.25','0.25–0.5','0.5–0.75','0.75–0.9','≥ 0.9'];
    const legend = mode==='live'
      ? `<div class="legend"><span class="pk"><i></i>${S.mapLegendLive(hd)}</span><span>${S.mapClick}</span></div>`
      : `<div class="legend"><span>EGDI 2024</span>${[0.1,0.3,0.6,0.8,0.95].map((v,i)=>`<span class="sw" dir="ltr"><i style="background:${egdiColor(v)}"></i>${lab[i]}</span>`).join('')}<span class="pk"><i class="w"></i>${S.deepProfile}</span></div>`;
    box.innerHTML = s + legend; box.dataset.drawn='1'; box.dataset.mode=mode; box.dataset.region=opts.region||'';
    const tip=$('#tip'), svg=$('svg',box);
    svg.addEventListener('mousemove',e=>{ const p=e.target.closest('path.c'); if(!p){tip.hidden=true;return;} const c=p.dataset.c, d=C[c]; if(!d){tip.hidden=true;return;}
      const n=hm[c]||0;
      tip.innerHTML=`<b>${esc(cname(c))}</b><span class="r">${d[2]!=null?`EGDI <span class="num">${d[2].toFixed(4)}</span> · ${S.rank} <span class="num">${d[3]}</span>`:S.outOfIndex}</span>${n?`<span class="hot">${S.headlinesIn(n,hd)}</span>`:''}${P[c]?`<span class="r">${S.deepAvail}</span>`:''}`;
      tip.hidden=false; const r=tip.getBoundingClientRect(); let x=e.clientX+14, y=e.clientY+14; if(x+r.width>innerWidth-8) x=e.clientX-r.width-14; if(y+r.height>innerHeight-8) y=e.clientY-r.height-14; tip.style.left=x+'px'; tip.style.top=y+'px'; });
    svg.addEventListener('mouseleave',()=>tip.hidden=true);
    svg.addEventListener('click',e=>{ const p=e.target.closest('path.c'); if(p&&C[p.dataset.c]){ tip.hidden=true; location.hash=href('country/'+p.dataset.c.toLowerCase()); }});
  }).catch(()=>{ box.innerHTML=`<p class="empty">${S.mapFail}</p>`; });
}
function linkWireToMap(wire, box){
  wire.addEventListener('mouseover',e=>{ const a=e.target.closest('.wi'); $$('path.c.hl',box).forEach(p=>{ if(p.dataset.c!==LENS) p.classList.remove('hl'); }); if(a&&a.dataset.c&&a.dataset.c!=='WW'){ const p=$(`path.c[data-c="${a.dataset.c}"]`,box); if(p) p.classList.add('hl'); } });
}

/* ---------- wire filters / tone ---------- */
const WT = ['all','ar','en','other','gov','ai','index','cc'];
const wfilter = (k,x) => k==='all' || (k==='ar'&&x.l==='ar') || (k==='en'&&x.l==='en') || (k==='other'&&x.l!=='ar'&&x.l!=='en') || (x.k||[]).includes(k);
function tonePanel(){
  const r=lensed(recent(3)), n=r.filter(x=>x.tn===-1).length, p=r.filter(x=>x.tn===1).length, z=r.length-n-p, tot=Math.max(1,r.length);
  const idx = r.length ? Math.round(50 + 50*(p-n)/tot) : null;
  const days=[...Array(7)].map((_,i)=>{ const end=Date.now()-i*864e5, st=end-864e5; const d=lensed(LIVE.items).filter(x=>{const t=Date.parse(x.d); return t>=st&&t<end;}); return {n:d.filter(x=>x.tn===-1).length,p:d.filter(x=>x.tn===1).length,z:d.filter(x=>!x.tn).length,lb:new Date(end).toLocaleDateString(LANG==='en'?'en-GB':'ar-SA-u-nu-latn',{weekday:'short'})}; }).reverse();
  const dm=Math.max(1,...days.map(d=>d.n+d.p+d.z));
  return `<div class="panel tone"><h3>${S.toneTitle}</h3><p class="sub">${S.toneSub}</p>
    <div class="tbig"><b>${idx==null?'—':idx}</b><span class="sub">${S.toneIndex} · 0–100</span></div>
    <div class="tbar" aria-hidden="true"><i class="n" style="width:${n/tot*100}%"></i><i class="z" style="width:${z/tot*100}%"></i><i class="p" style="width:${p/tot*100}%"></i></div>
    <div class="tleg"><span><i style="background:var(--down)"></i>${S.toneNeg} ${n}</span><span><i style="background:var(--line-3)"></i>${S.toneNeu} ${z}</span><span><i style="background:var(--up)"></i>${S.tonePos} ${p}</span></div>
    <p class="sub">${S.toneDays}</p>
    <div class="tdays" aria-hidden="true">${days.map(d=>`<div><i style="height:${d.n/dm*100}%;background:var(--down)"></i><i style="height:${d.z/dm*100}%;background:var(--line-3)"></i><i style="height:${d.p/dm*100}%;background:var(--up)"></i></div>`).join('')}</div>
    <div class="tdl">${days.map(d=>`<span>${d.lb}</span>`).join('')}</div></div>`;
}
function topicsPanel(){
  const r=lensed(recent(7)), cnt={}; r.forEach(x=>(x.k||[]).forEach(k=>cnt[k]=(cnt[k]||0)+1));
  const arr=Object.entries(cnt).sort((a,b)=>b[1]-a[1]), mx=arr.length?arr[0][1]:1;
  return `<div class="panel"><h3>${S.topicsTitle}</h3><p class="sub">${S.topicsSub}</p><div class="rank">${arr.length?arr.map(([k,n],i)=>`<a><span class="i">${i+1}</span><span></span><span class="nm">${S.cats[k]}</span><span class="bar-in"><i style="width:${(n/mx*100).toFixed(0)}%"></i></span><span class="num">${n}</span></a>`).join(''):`<p class="srcl">${S.hotEmpty}</p>`}</div></div>`;
}

/* ---------- modal ---------- */
function openItem(id){
  const x=LIVE.items.find(i=>i.id===id); if(!x) return;
  const t=wTitle(x), url=x.u, text=t+' — '+x.s, Lk=shareLinks(text,url);
  const rel2=LIVE.items.filter(i=>i.id!==x.id&&((x.c!=='WW'&&i.c===x.c)||(x.c==='WW'&&(i.k||[]).some(k=>(x.k||[]).includes(k)&&k!=='digital')))).slice(0,5);
  const tn = x.tn===-1?`<span class="tonepill n">${S.toneNeg}</span>`:x.tn===1?`<span class="tonepill p">${S.tonePos}</span>`:`<span class="tonepill z">${S.toneNeu}</span>`;
  const m=document.createElement('div'); m.className='modal'; m.setAttribute('role','dialog'); m.setAttribute('aria-modal','true'); m.dir=LANG==='en'?'ltr':'rtl';
  m.innerHTML=`<div class="box"><div class="mh"><span class="kicker live">${esc(x.s)} · ${rel(x.d)}</span><button class="iconbtn x" type="button" data-close aria-label="${S.close}">✕</button></div>
    <h3 dir="${dirOf(t)}">${esc(t)}</h3>
    <div class="mmeta">${x.c&&x.c!=='WW'?`<a class="ctry" href="${href('country/'+x.c.toLowerCase())}" data-close>${flag(x.c,'sm')}${esc(cname(x.c))}</a>`:`<span>${S.world}</span>`}<span>${S.tone}: ${tn}</span>${(x.k||[]).map(k=>`<span class="tag">${S.cats[k]}</span>`).join('')}<span class="num">${new Date(x.d).toLocaleString(LANG==='en'?'en-GB':'ar-SA-u-nu-latn',{timeZone:'Asia/Riyadh',dateStyle:'medium',timeStyle:'short'})}</span></div>
    <div class="acts3"><a class="btn pri sm" href="${esc(url)}" target="_blank" rel="noopener">${S.openSource} ${I.ext}</a><a class="btn sm" href="${Lk.x}" target="_blank" rel="noopener">${I.x} X</a><a class="btn sm" href="${Lk.wa}" target="_blank" rel="noopener">${I.wa}</a><button class="btn sm" type="button" data-copy="${esc(text+'\n'+url)}">${I.cp} ${S.copyLink}</button><button class="btn sm" type="button" id="mimg">${I.img} ${S.exportImg}</button></div>
    ${rel2.length?`<div><p class="kicker" style="margin-bottom:6px">${S.modalRelated}</p><div class="rel">${rel2.map(wireItem).join('')}</div></div>`:''}</div>`;
  document.body.appendChild(m); const prev=document.activeElement; $('[data-close]',m).focus();
  const close=()=>{ m.remove(); document.removeEventListener('keydown',kd); if(prev&&prev.focus) prev.focus(); };
  const kd=e=>{ if(e.key==='Escape') close(); };
  document.addEventListener('keydown',kd);
  m.addEventListener('click',e=>{ const w=e.target.closest('.rel .wi'); if(w){ e.preventDefault(); e.stopPropagation(); close(); openItem(w.dataset.id); return; } if(e.target===m||e.target.closest('[data-close]')) close(); });
  $('#mimg',m).addEventListener('click',()=>shareCard(x));
}
async function loadH2C(){ if(window.html2canvas) return; await new Promise((ok,no)=>{ const s=document.createElement('script'); s.src='assets/vendor/html2canvas.min.js'; s.onload=ok; s.onerror=no; document.head.appendChild(s); }); }
async function shareCard(x){
  try{
    await loadH2C(); const t=wTitle(x), cs=getComputedStyle(document.documentElement), v=k=>cs.getPropertyValue(k).trim();
    const d=document.createElement('div');
    d.style.cssText=`position:fixed;left:-9999px;top:0;width:1080px;height:1080px;padding:80px;box-sizing:border-box;background:${v('--bg')};color:${v('--fg')};display:flex;flex-direction:column;justify-content:space-between;direction:${dirOf(t)};font-family:${v('--f-display')}`;
    d.innerHTML=`<div style="font:600 26px ${v('--f-mono')};letter-spacing:.14em;color:${v('--accent')}">● CX KNOWLEDGE · ${esc(cname(x.c))}</div><div style="font-size:62px;line-height:1.4;font-weight:700">${esc(t)}</div><div style="display:flex;justify-content:space-between;font-size:28px;color:${v('--muted')}"><span>${esc(x.s)}</span><span>${new Date(x.d).toLocaleDateString(LANG==='en'?'en-GB':'ar-SA-u-nu-latn')}</span></div>`;
    document.body.appendChild(d); const cv=await window.html2canvas(d,{backgroundColor:null,scale:1}); d.remove();
    const a=document.createElement('a'); a.href=cv.toDataURL('image/png'); a.download='cx-knowledge-'+x.id+'.png'; document.body.appendChild(a); a.click(); a.remove();
  }catch(e){ toast(S.copyFail); }
}

/* ---------- pages ---------- */
function pageNews(){
  const d1 = lensed(recent(1)), st = LIVE.stats||{};
  const ranked = Object.entries(C).filter(([,d])=>d[3]).sort((a,b)=>a[1][3]-b[1][3]);
  const gulf = ranked.filter(([,d])=>d[4]==='gulf');
  const hd = heatDays(), hm = heat(hd), hot = Object.entries(hm).sort((a,b)=>b[1]-a[1]).slice(0,10), hmx = hot.length?hot[0][1]:1;
  const outlets = st.outlets_14d || new Set(LIVE.items.map(x=>x.s)).size;
  const langs = st.languages || new Set(LIVE.items.map(x=>x.l)).size;
  let tab='all', shown=40;
  const ov = (LENS ? items.filter(i=>i.c===LENS) : items).slice(0,8);
  main.innerHTML = `<div class="wrap">
    <div class="obs-head">
      <div><span class="kicker live">${S.obsKicker} · ${LIVE.updated?S.lastFetch+' '+agoLong(LIVE.updated):'—'}</span>
        <h1>${LENS?esc(cname(LENS))+' · ':''}${S.obsTitle}</h1>
        <p>${S.obsLede(SRC.length)}</p>
        <nav class="subtabs"><a href="${href('news')}" aria-current="page">${S.wireTitle}</a><a href="${href('analysis')}">${S.nav.analysis}</a><a href="${href('live')}">${S.allWire}</a><a href="${href('sources')}">${S.nav.sources}</a></nav></div>
      <div class="counters">
        <div><b>${d1.length}</b><span>${S.cnt24}</span></div>
        <div><b>${outlets}</b><span>${S.cntOutlets}</span></div>
        <div><b>${Object.keys(hm).length}</b><span>${S.cntCountries}</span></div>
        <div><b>${langs}</b><span>${S.cntLangs}</span></div>
      </div>
    </div>
    <div class="dash">
      <div class="pane"><div class="phd"><h2>${S.mapTitle}</h2><span class="grow"></span><div class="seg" id="mseg"><button type="button" data-m="live" aria-pressed="true">${S.mapLive}</button><button type="button" data-m="egdi" aria-pressed="false">${S.mapEgdi}</button></div></div><div class="mapbox" id="liveMap"></div></div>
      <div class="pane"><div class="phd"><h2>${S.wireTitle}</h2><span class="grow"></span><a class="srcl" href="${href('live')}">${S.allWire}</a></div>
        <div class="wtabs" id="wtabs">${WT.map(k=>`<button type="button" data-k="${k}" aria-pressed="${k==='all'}">${S.wtabs[k]}</button>`).join('')}</div>
        <div class="wire" id="wire"></div></div>
    </div>
  </div>
  <section class="blk wrap"><div class="two">${tonePanel()}${topicsPanel()}</div></section>
  <section class="blk wrap"><div class="sh"><h2>${S.overview}</h2><p>${S.overviewSub}</p><a class="more" href="${href('analysis')}">${S.allAnalysis}</a></div>
    <div class="ovw">${ov.map((i,n)=>`<a class="ov" href="${href('item/'+i.id)}"><span class="i">${String(n+1).padStart(2,'0')}</span><span><h3>${esc(L(i,'title'))}</h3><span class="mt"><span>${esc(i.source)}</span>${i.c&&i.c!=='WW'?`<span class="ctry">${flag(i.c,'sm')}${esc(cname(i.c))}</span>`:`<span>${S.world}</span>`}<span class="num">${dLabel(i.date)}</span></span></span></a>`).join('')||`<p class="empty">${S.noAn}</p>`}</div></section>
  <section class="blk wrap"><div class="two">
    <div class="panel"><h3>${S.hotTitle}</h3><p class="sub">${S.hotSub(hd)}</p>
      <div class="rank">${hot.length?hot.map(([c,n],i)=>`<a href="${href('country/'+c.toLowerCase())}"><span class="i">${i+1}</span>${flag(c,'sm')}<span class="nm">${esc(cname(c))}</span><span class="bar-in hot"><i style="width:${(n/hmx*100).toFixed(0)}%"></i></span><span class="num">${n}</span></a>`).join(''):`<p class="srcl">${S.hotEmpty}</p>`}</div></div>
    <div class="panel"><h3>${S.gccTitle}</h3><p class="sub">${S.gccSub}</p>
      <div class="rank">${gulf.map(([c,d])=>`<a href="${href('country/'+c.toLowerCase())}" class="${c==='SA'?'me':''}"><span class="i">${d[3]}</span>${flag(c,'sm')}<span class="nm">${esc(cname(c))}</span><span class="bar-in"><i style="width:${(d[2]*100).toFixed(1)}%"></i></span><span class="num">${d[2].toFixed(4)}</span></a>`).join('')}</div></div>
  </div></section>
`;
  const box=$('#liveMap'); let mode='live'; drawMap(box,{mode});
  $('#mseg').addEventListener('click',e=>{ const b=e.target.closest('[data-m]'); if(!b) return; mode=b.dataset.m; $$('#mseg button').forEach(x=>x.setAttribute('aria-pressed',x===b)); box.dataset.drawn=''; drawMap(box,{mode}); });
  const renderWire=()=>{ const l=lensed(LIVE.items).filter(x=>wfilter(tab,x)); $('#wire').innerHTML = (l.slice(0,shown).map(wireItem).join('')||`<p class="wnote">${S.noWire}</p>`) + (l.length>shown?`<div class="wmore"><button class="btn sm" type="button" id="wmore">${S.showMore(l.length-shown)}</button></div>`:'') + `<p class="wnote">${S.wireNote}</p>`; };
  renderWire(); window._liveRefresh=()=>{ if($('#wire')) renderWire(); };
  $('#wtabs').addEventListener('click',e=>{ const b=e.target.closest('[data-k]'); if(!b) return; tab=b.dataset.k; shown=40; $$('#wtabs button').forEach(x=>x.setAttribute('aria-pressed',x===b)); renderWire(); });
  $('#wire').addEventListener('click',e=>{ if(e.target.id==='wmore'){ shown+=40; renderWire(); } });
  linkWireToMap($('#wire'), box);
}

function pageHome(){
  const CT=window.CXK_Catalog?window.CXK_Catalog(LANG):null, icon=window.CXK_Icon||(()=>''), K=window.CXK_KIT||{patterns:[],principles:[]};
  const pod=window.CXK_PatternOfDay?window.CXK_PatternOfDay(LANG):null, en=LANG==='en', li=en?1:0;
  const needs=['tool','voc','msg','prio','survey','sim','calc','maturity'];
  const ov=(LENS?items.filter(i=>i.c===LENS):items).slice(0,5), wl=lensed(LIVE.items).slice(0,6);
  const inits=['EE','SG','AE','KR','DK','SA'].map(c=>P[c]&&P[c].initiatives&&P[c].initiatives[0]?{...P[c].initiatives[0],c}:null).filter(Boolean).slice(0,3);
  const outlets=(LIVE.stats||{}).outlets_14d||new Set(LIVE.items.map(x=>x.s)).size;
  main.innerHTML = `<div class="wrap">
    <section class="hero">
      <div class="hcopy"><span class="kicker">${S.homeK}</span><h1>${S.homeT}</h1><p>${S.homeP}</p>
        <div class="acts2"><a class="btn pri" href="${href('tools/tool')}">${S.homeCta1}</a><a class="btn" href="${href('tools')}">${S.homeCta2}</a></div>
        <dl class="hstats"><div><dt>${S.hs1}</dt><dd>8</dd></div><div><dt>${S.hs2}</dt><dd>${K.patterns.length}</dd></div><div><dt>${S.hs3}</dt><dd>193</dd></div><div><dt>${S.hs4}</dt><dd>${outlets||'—'}</dd></div></dl></div>
      <figure class="hfig"><figcaption><b>${S.miniT}</b><span>${S.miniCap}</span></figcaption>${window.CXK_LabMini?window.CXK_LabMini(LANG):''}<a class="srcl" href="${href('tools/tool')}">${S.miniTry}</a></figure>
    </section>
  </div>
  <section class="blk wrap"><div class="sh"><h2>${S.needT}</h2><p>${S.needSub}</p><a class="more" href="${href('tools')}">${S.allTools}</a></div>
    <div class="needs">${CT?needs.map(id=>{ const it=CT.items[id]; return `<a class="need" href="${href('tools/'+id)}"><span class="ti">${icon(it[3])}</span><b>${esc(it[2])}</b><span>${esc(it[0])}</span></a>`; }).join(''):''}</div></section>
  <section class="blk wrap"><div class="pod-row">
    ${pod?`<article class="pod"><span class="kicker">${S.podT}</span><span class="stg">${esc((K.stages[pod.st]||[])[li]||'')}</span><h2>${esc(en?pod.n_en:pod.n)}</h2><p>${esc(en?pod.sym_en:pod.sym)}</p><div class="pfix"><b>${S.podFix}</b><p>${esc(en?pod.fix_en:pod.fix)}</p></div><a class="srcl" href="${href('learn/patterns/'+pod.id)}">${S.podMore}</a></article>`:''}
    <div class="lrn"><h2>${S.learnT}</h2><p class="sub">${S.learnSub}</p>${CT?['method','patterns','principles','library','kit'].map(id=>{ const it=CT.items[id]; return `<a href="${href('learn/'+id)}"><span class="ti">${icon(it[3])}</span><span><b>${esc(it[0])}</b><span>${esc(it[1])}</span></span></a>`; }).join(''):''}</div>
  </div></section>
  <section class="blk wrap"><div class="sh"><h2>${S.worldT}</h2><p>${S.worldSub}</p><a class="more" href="${href('atlas')}">${S.allCountries2}</a></div>
    <div class="inits">${inits.map(i=>iniCard(i)).join('')}</div>
    <div class="board" style="margin-top:14px">${IX.slice(0,4).map(ixCard).join('')}</div>
    <p class="morelinks"><a href="${href('initiatives')}">${S.allInits}</a><a href="${href('indices')}">${S.allIndices}</a></p></section>
  <section class="blk wrap"><div class="sh"><h2>${S.newsT}</h2><p>${S.newsSub(outlets)}</p><a class="more" href="${href('news')}">${S.allNews}</a></div>
    <div class="two"><div class="panel"><h3>${S.nav.analysis}</h3><div class="ovw one">${ov.map((i,n)=>`<a class="ov" href="${href('item/'+i.id)}"><span class="i">${String(n+1).padStart(2,'0')}</span><span><h3>${esc(L(i,'title'))}</h3><span class="mt"><span>${esc(i.source)}</span>${i.c&&i.c!=='WW'?`<span class="ctry">${flag(i.c,'sm')}${esc(cname(i.c))}</span>`:`<span>${S.world}</span>`}<span class="num">${dLabel(i.date)}</span></span></span></a>`).join('')}</div></div>
      <div class="panel"><h3>${S.wireTitle}</h3><div class="wire" style="max-height:none">${wl.map(wireItem).join('')||`<p class="wnote">${S.noWire}</p>`}</div></div></div></section>`;
  window._liveRefresh=null;
}

function pageLive(){
  let tab='all', fc=LENS||'all', q='', shown=60;
  const cs=[...new Set(LIVE.items.map(x=>x.c))].filter(Boolean).sort((a,b)=>cname(a).localeCompare(cname(b),LANG));
  main.innerHTML = `<div class="wrap"><header class="pagehead"><span class="kicker live">${S.liveK}</span><h1>${S.liveTitle}</h1><p>${S.liveLede(LIVE.updated?agoLong(LIVE.updated):'—')}</p></header>
    <div class="filters"><div class="chips" id="lt">${WT.map(k=>`<button class="chip" type="button" data-k="${k}" aria-pressed="${k==='all'}">${S.wtabs[k]}</button>`).join('')}</div>
      <select class="sel" id="lc" aria-label="${S.thCountry}"><option value="all">${S.allCountries}</option>${cs.map(c=>`<option value="${c}" ${c===fc?'selected':''}>${esc(cname(c))}</option>`).join('')}</select>${filterField('lq',S.searchWire)}</div>
    <div class="listbox wire" id="lw" style="max-height:none"></div></div>`;
  const render=()=>{ const n=norm(q.trim()); const l=LIVE.items.filter(x=>wfilter(tab,x)&&(fc==='all'||x.c===fc)&&(!n||norm(wTitle(x)+' '+x.s+' '+cname(x.c)).includes(n)));
    $('#lw').innerHTML=(l.slice(0,shown).map(wireItem).join('')||`<p class="empty" style="margin:16px">${S.noMatch}</p>`)+(l.length>shown?`<div class="wmore"><button class="btn sm" type="button" id="lmore">${S.showMore(l.length-shown)}</button></div>`:''); };
  $('#lt').addEventListener('click',e=>{const b=e.target.closest('[data-k]'); if(!b) return; tab=b.dataset.k; shown=60; $$('#lt .chip').forEach(x=>x.setAttribute('aria-pressed',x===b)); render();});
  $('#lc').addEventListener('change',e=>{fc=e.target.value; shown=60; render();});
  $('#lq').addEventListener('input',e=>{q=e.target.value; shown=60; render();});
  $('#lw').addEventListener('click',e=>{ if(e.target.id==='lmore'){ shown+=60; render(); } });
  render(); window._liveRefresh=()=>{ if($('#lw')) render(); };
}

function pageAtlas(){
  let region='all', sort='rank', q='';
  const hm=heat();
  const counts={all:0}; Object.values(C).forEach(d=>{ if(d[2]==null) return; counts.all++; counts[d[4]]=(counts[d[4]]||0)+1; });
  main.innerHTML = `<div class="wrap">
    <header class="pagehead"><span class="kicker">${S.atlasK}</span><h1>${S.atlasTitle}</h1><p>${S.atlasLede}</p></header>
    <div class="regions chips" id="regs">${[['all',S.allRegions],...Object.entries(S.REG)].map(([k,l])=>`<button class="chip" type="button" data-k="${k}" aria-pressed="${k==='all'}">${k!=='all'?`<span class="dot" style="--c:var(--${k})"></span>`:''}${l} <span class="n">${counts[k]||0}</span></button>`).join('')}</div>
    <div class="frame mapbox" id="atlasMap"></div>
    <div class="filters" style="margin-top:16px"><div class="chips" id="sorts"><button class="chip" data-s="rank" aria-pressed="true" type="button">${S.sortRank}</button><button class="chip" data-s="name" aria-pressed="false" type="button">${S.sortName}</button><button class="chip" data-s="deep" aria-pressed="false" type="button">${S.sortDeep}</button><button class="chip" data-s="hot" aria-pressed="false" type="button">${S.sortHot}</button></div>${filterField('qC',S.searchCountry)}</div>
    <div class="tablewrap"><table class="ct"><thead><tr><th>#</th><th>${S.thCountry}</th><th>${S.thRegion}</th><th class="num">EGDI 2024</th><th></th><th>${S.thNews}</th><th>${S.thProfile}</th></tr></thead><tbody id="ctb"></tbody></table></div>
  </div>`;
  const rows=()=>{ let r=Object.entries(C).filter(([,d])=>d[2]!=null&&(region==='all'||d[4]===region));
    if(q){const n=norm(q); r=r.filter(([c,d])=>norm(d[0]).includes(n)||norm(d[1]).includes(n));}
    r.sort(sort==='name'?(a,b)=>cname(a[0]).localeCompare(cname(b[0]),LANG):sort==='deep'?(a,b)=>(!!P[b[0]]-!!P[a[0]])||a[1][3]-b[1][3]:sort==='hot'?(a,b)=>(hm[b[0]]||0)-(hm[a[0]]||0)||a[1][3]-b[1][3]:(a,b)=>a[1][3]-b[1][3]);
    $('#ctb').innerHTML = r.map(([c,d])=>`<tr data-c="${c}"><td class="num">${d[3]}</td><td><span class="nm">${flag(c,'sm')}<span>${esc(cname(c))} <span class="en">${esc(LANG==='en'?d[0]:d[1])}</span></span></span></td><td><span class="dot" style="--c:var(--${d[4]})"></span> ${S.REG[d[4]]||''}</td><td class="num">${d[2].toFixed(4)}</td><td><div class="bar-in"><i style="width:${(d[2]*100).toFixed(1)}%"></i></div></td><td class="num">${hm[c]?`<span class="badge hot">${hm[c]}</span>`:''}</td><td>${P[c]?`<span class="badge">${S.deepProfile}</span>`:''}</td></tr>`).join('') || `<tr><td colspan="7" class="empty">${S.noCountry}</td></tr>`;
  };
  rows(); drawMap($('#atlasMap'),{mode:'egdi'});
  $('#regs').addEventListener('click',e=>{const b=e.target.closest('[data-k]'); if(!b) return; region=b.dataset.k; $$('#regs .chip').forEach(x=>x.setAttribute('aria-pressed',x===b)); rows(); drawMap($('#atlasMap'),{mode:'egdi',region});});
  $('#sorts').addEventListener('click',e=>{const b=e.target.closest('[data-s]'); if(!b) return; sort=b.dataset.s; $$('#sorts .chip').forEach(x=>x.setAttribute('aria-pressed',x===b)); rows();});
  $('#qC').addEventListener('input',e=>{q=e.target.value; rows();});
  $('#ctb').addEventListener('click',e=>{const tr=e.target.closest('tr[data-c]'); if(tr) location.hash=href('country/'+tr.dataset.c.toLowerCase());});
}

function pageCountry(code){
  const c=code.toUpperCase(), d=C[c];
  if(!d){ main.innerHTML=`<div class="wrap"><header class="pagehead"><h1>${S.notFound}</h1><p><a href="${href('atlas')}">${S.backAtlas}</a></p></header></div>`; return; }
  const p=P[c], news=items.filter(i=>i.c===c), wire=LIVE.items.filter(x=>x.c===c&&x.f!=='editorial').slice(0,30);
  const reg = Object.values(C).filter(x=>x[4]===d[4]&&x[2]!=null), regAvg = reg.reduce((a,x)=>a+x[2],0)/(reg.length||1);
  const all = Object.values(C).filter(x=>x[2]!=null), wAvg = all.reduce((a,x)=>a+x[2],0)/all.length;
  const regRank = d[2]!=null ? reg.filter(x=>x[2]>d[2]).length+1 : null;
  const ranked = Object.entries(C).filter(([,x])=>x[3]).sort((a,b)=>a[1][3]-b[1][3]); const idx = ranked.findIndex(([k])=>k===c);
  const near = idx>=0 ? ranked.slice(Math.max(0,idx-3),idx+4).filter(([k])=>k!==c) : [];
  const deepNear = deepCodes.filter(k=>k!==c && C[k][4]===d[4]).slice(0,8);
  const pos = v => `${(v*100).toFixed(2)}%`, R=S.REG[d[4]]||'';
  main.innerHTML = `<div class="wrap">
  <div class="chero">
    <div>
      <div class="crumbs"><a href="${href('atlas')}">${S.nav.atlas}</a><span>›</span><span>${R}</span></div>
      <div class="ctitle" style="margin-top:10px">${flag(c,'lg')}<div><h1>${esc(cname(c))}</h1><div class="en">${esc(LANG==='en'?d[0]:d[1])}</div></div></div>
      ${p?`<p class="csum">${esc(L(p,'summary'))}</p>`:`<div class="pending" style="margin-top:16px"><b>${S.pendingT}</b><span>${S.pendingP}</span></div>`}
      ${p&&p.bodies&&p.bodies.length?`<div class="bodies" style="margin-top:16px">${p.bodies.map(b=>`<a href="${esc(b.u)}" target="_blank" rel="noopener">${esc(L(b,'n'))} ${I.ext.replace('<svg','<svg width="13" height="13"')}</a>`).join('')}</div>`:''}
    </div>
    <aside class="egcard">
      <div class="k"><span>${S.egdiCard}</span><span>${S.un}</span></div>
      ${d[2]!=null?`<div class="v">${d[2].toFixed(4)}</div>
      <div class="k"><span>${S.worldRank}</span><span class="rk" dir="ltr">${d[3]} / 193</span></div>
      <div class="k"><span>${S.rankIn(R)}</span><span class="rk" dir="ltr">${regRank} / ${reg.length}</span></div>
      <div><div class="scale"><span class="ln"></span><span class="mk" style="left:${pos(wAvg)}"></span><span class="mk" style="left:${pos(regAvg)};background:var(--fg)"></span><span class="me" style="left:${pos(d[2])}"></span></div><div class="scale-lbl"><span>0</span><span>1</span></div></div>
      <div class="cmp"><div><span>${S.avgOf(R)}</span><span>${regAvg.toFixed(4)}</span></div><div><span>${S.worldAvg}</span><span>${wAvg.toFixed(4)}</span></div></div>`
      :`<p class="srcl">${S.notInIndex}</p>`}
      <a class="srcl" href="https://publicadministration.un.org/egovkb/en-us/data-center" target="_blank" rel="noopener">${S.egdiSrc}</a>
    </aside>
  </div>
  ${p&&p.metrics&&p.metrics.length?`<section class="blk" style="padding-top:28px"><div class="sh"><h2>${S.keyFigures}</h2></div><div class="mgrid">${p.metrics.map(m=>`<div class="mc"><b dir="${dirOf(L(m,'v'))}">${esc(L(m,'v'))}</b><span>${esc(L(m,'l'))}</span><small>${esc(m.d)} · <a href="${esc(m.u)}" target="_blank" rel="noopener">${esc(m.s)}</a></small></div>`).join('')}</div></section>`:''}
  ${p&&p.initiatives&&p.initiatives.length?`<section class="blk"><div class="sh"><h2>${S.initTitle}</h2></div><div class="inits">${p.initiatives.map(i=>iniCard({...i,c},false)).join('')}</div></section>`:''}
  ${news.length?`<section class="blk"><div class="sh"><h2>${S.anTitle}</h2></div><div class="feed">${news.map(newsCard).join('')}</div></section>`:''}
  <section class="blk"><div class="sh"><h2>${S.fromWire}</h2><p>${S.fromWireSub(esc(cname(c)))}</p></div>${wire.length?`<div class="listbox">${wire.map(wireItem).join('')}</div>`:`<p class="empty">${S.noWireC(esc(cname(c)))}</p>`}</section>
  ${near.length?`<section class="blk"><div class="sh"><h2>${S.nearRank}</h2></div><div class="near">${near.map(([k,x])=>`<a href="${href('country/'+k.toLowerCase())}">${flag(k,'sm')}${esc(cname(k))}<span class="num">#${x[3]}</span></a>`).join('')}</div></section>`:''}
  ${deepNear.length?`<section class="blk"><div class="sh"><h2>${S.deepIn(R)}</h2></div><div class="near">${deepNear.map(k=>`<a href="${href('country/'+k.toLowerCase())}">${flag(k,'sm')}${esc(cname(k))}</a>`).join('')}</div></section>`:''}
  </div>`;
  document.title = `${cname(c)} | CX Knowledge`;
}

function pageAnalysis(focus){
  let fReg='all', fType='all', fC=focus?'all':(LENS||'all'), fQ='';
  const cs=[...new Set(items.map(i=>i.c))].sort((a,b)=>cname(a).localeCompare(cname(b),LANG));
  main.innerHTML = `<div class="wrap">
    <header class="pagehead"><span class="kicker">${S.anK}</span><h1>${S.anTitle}</h1><p>${S.anLede}</p></header>
    <div class="filters"><div class="chips" id="fr"></div><div class="chips" id="ft"></div>
      <select class="sel" id="fc" aria-label="${S.thCountry}"><option value="all">${S.allCountries}</option>${cs.map(c=>`<option value="${c}" ${c===fC?'selected':''}>${esc(cname(c))}</option>`).join('')}</select>
      ${filterField('fq',S.searchAn)}</div>
    <div class="feed" id="fl"></div></div>`;
  const chipRow=(el,map,key,cur)=>{ const cnt={all:items.length}; items.forEach(i=>cnt[i[key]]=(cnt[i[key]]||0)+1);
    el.innerHTML=[['all',S.all],...Object.entries(map)].filter(([k])=>cnt[k]).map(([k,l])=>`<button class="chip" type="button" data-k="${k}" aria-pressed="${k===cur}">${l} <span class="n">${cnt[k]}</span></button>`).join(''); };
  const render=()=>{ chipRow($('#fr'),S.regions,'region',fReg); chipRow($('#ft'),S.types,'type',fType);
    const q=norm(fQ.trim()); const list=items.filter(i=>(fReg==='all'||i.region===fReg)&&(fType==='all'||i.type===fType)&&(fC==='all'||i.c===fC)&&(!q||norm(L(i,'title')+' '+L(i,'summary')+' '+i.source+' '+cname(i.c)).includes(q)));
    $('#fl').innerHTML = list.length?list.map(newsCard).join(''):`<p class="empty">${S.noAn}</p>`; };
  $('#fr').addEventListener('click',e=>{const b=e.target.closest('[data-k]'); if(b){fReg=b.dataset.k; render();}});
  $('#ft').addEventListener('click',e=>{const b=e.target.closest('[data-k]'); if(b){fType=b.dataset.k; render();}});
  $('#fc').addEventListener('change',e=>{fC=e.target.value; render();});
  $('#fq').addEventListener('input',e=>{fQ=e.target.value; render();});
  render();
  if(focus){ const el=document.getElementById('n-'+focus); if(el){ setTimeout(()=>{ el.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'}); el.classList.add('hit'); setTimeout(()=>el.classList.remove('hit'),2600); },60); } }
}

function pageIndices(){
  main.innerHTML = `<div class="wrap"><header class="pagehead"><span class="kicker">${S.ixK}</span><h1>${S.ixTitle}</h1><p>${S.ixLede}</p></header>
  ${Object.entries(S.KIND).map(([k,l])=>{ const xs=IX.filter(x=>x.kind===k); return xs.length?`<section class="blk" style="padding-top:26px"><div class="sh"><h2>${l}</h2></div><div class="board">${xs.map(ixCard).join('')}</div></section>`:''; }).join('')}</div>`;
}

function pageInitiatives(){
  let th='all', q='';
  const cnt={all:allInits.length}; allInits.forEach(i=>cnt[i.theme]=(cnt[i.theme]||0)+1);
  main.innerHTML = `<div class="wrap"><header class="pagehead"><span class="kicker">${S.inK}</span><h1>${S.inTitle}</h1><p>${S.inLede(deepCodes.length)}</p></header>
    <div class="filters"><div class="chips" id="th">${[['all',S.all],...Object.entries(S.THEME)].filter(([k])=>cnt[k]).map(([k,l])=>`<button class="chip" type="button" data-k="${k}" aria-pressed="${k==='all'}">${l} <span class="n">${cnt[k]}</span></button>`).join('')}</div>${filterField('iq',S.searchIn)}</div>
    <div class="inits" id="il"></div></div>`;
  const render=()=>{ const n=norm(q.trim()); const l=allInits.filter(i=>(th==='all'||i.theme===th)&&(!n||norm(L(i,'t')+' '+L(i,'d')+' '+L(i,'impact')+' '+cname(i.c)).includes(n)));
    $('#il').innerHTML=l.length?l.map(i=>iniCard(i)).join(''):`<p class="empty">${S.noIn}</p>`; };
  $('#th').addEventListener('click',e=>{const b=e.target.closest('[data-k]'); if(!b) return; th=b.dataset.k; $$('#th .chip').forEach(x=>x.setAttribute('aria-pressed',x===b)); render();});
  $('#iq').addEventListener('input',e=>{q=e.target.value; render();});
  render();
}

function pageSources(){
  let tier='all', q='';
  const cnt={}; SRC.forEach(s=>cnt[s.t]=(cnt[s.t]||0)+1);
  const st=LIVE.stats||{}, wk=recent(7), outlets={}; wk.forEach(x=>outlets[x.s]=(outlets[x.s]||0)+1);
  const topOut=Object.entries(outlets).sort((a,b)=>b[1]-a[1]).slice(0,30);
  main.innerHTML = `<div class="wrap"><header class="pagehead"><span class="kicker">${S.srcK}</span><h1>${S.srcTitle}</h1><p>${S.srcLede(SRC.length)}</p></header>
    <div class="tiers">
      <div><b>${st.outlets_14d||new Set(LIVE.items.map(x=>x.s)).size}</b><span>${S.srcSeen}</span></div>
      <div><b>${st.outlet_countries||'—'}</b><span>${S.srcCountries}</span></div>
      <div><b>${st.languages||new Set(LIVE.items.map(x=>x.l)).size}</b><span>${S.srcLangs}</span></div>
      <div><b id="nFeeds">${st.feeds_total||'—'}</b><span>${S.srcFeeds}</span></div>
    </div>
    <section class="blk" style="padding-top:8px"><div class="sh"><h2>${S.aggTitle}</h2></div>
      <div class="inits"><article class="ini"><h3>GDELT Project</h3><p>${S.aggGd}</p><a class="open" href="https://www.gdeltproject.org" target="_blank" rel="noopener">gdeltproject.org ${I.ext}</a></article>
      <article class="ini"><h3>Google News</h3><p id="gnTxt">${S.aggGn('—')}</p><a class="open" href="https://news.google.com" target="_blank" rel="noopener">news.google.com ${I.ext}</a></article>
      <article class="ini"><h3>NewsCatcher</h3><p>${S.aggNc}</p><a class="open" href="https://www.newscatcherapi.com" target="_blank" rel="noopener">newscatcherapi.com ${I.ext}</a></article></div></section>
    <section class="blk"><div class="sh"><h2>${S.registry}</h2></div>
    <div class="filters"><div class="chips" id="tr">${[['all',S.all],...Object.entries(S.TIER)].map(([k,l])=>`<button class="chip" type="button" data-k="${k}" aria-pressed="${k==='all'}">${l} <span class="n">${k==='all'?SRC.length:cnt[k]||0}</span></button>`).join('')}</div>${filterField('sq',S.searchSrc)}</div>
    <div class="srcgrid" id="sg"></div></section>
    <section class="blk"><div class="sh"><h2>${S.activeOutlets}</h2><p>${S.activeOutletsSub}</p></div>
      ${topOut.length?`<div class="rank" style="max-width:760px">${topOut.map(([s,n],i)=>`<a><span class="i">${i+1}</span><span></span><span class="nm">${esc(s)}</span><span class="bar-in hot"><i style="width:${(n/topOut[0][1]*100).toFixed(0)}%"></i></span><span class="num">${n}</span></a>`).join('')}</div>`:`<p class="empty">${S.afterFirst}</p>`}</section>
    <section class="blk"><div class="sh"><h2>${S.feedStatus}</h2><p>${S.feedStatusSub}</p></div><div class="fstat" id="fs"><p class="srcl">…</p></div></section></div>`;
  const render=()=>{ const n=norm(q.trim()); $('#sg').innerHTML=SRC.filter(s=>(tier==='all'||String(s.t)===tier)&&(!n||norm(s.n+' '+(s.k||'')).includes(n))).map(s=>`<a class="so" href="${esc(s.u)}" target="_blank" rel="noopener">${flag(s.c,'sm')}<span><b>${esc(s.n)}</b><small>${esc(s.k||cname(s.c))}</small></span>${s.feed?'<span class="lv">LIVE</span>':'<span></span>'}</a>`).join('')||`<p class="empty">${S.noSrc}</p>`; };
  render();
  $('#tr').addEventListener('click',e=>{const b=e.target.closest('[data-k]'); if(!b) return; tier=b.dataset.k; $$('#tr .chip').forEach(x=>x.setAttribute('aria-pressed',x===b)); render();});
  $('#sq').addEventListener('input',e=>{q=e.target.value; render();});
  fetch('data/feeds.json').then(r=>r.ok?r.json():null).then(j=>{ if(!j) return; const gn=j.feeds.filter(f=>f.type==='gnews').length; $('#gnTxt').textContent=S.aggGn(gn); if(!st.feeds_total) $('#nFeeds').textContent=j.feeds.length; }).catch(()=>{});
  fetch('data/feeds-status.json?v='+Math.floor(Date.now()/3e5)).then(r=>r.ok?r.json():null).then(j=>{ $('#fs').innerHTML = j&&j.feeds ? j.feeds.map(f=>`<div><span>${esc(f.name)}</span><span class="${f.ok?'ok':'no'} num">${f.ok?f.n+' '+S.headlines:(/optional|API key/.test(f.err||'')?S.optional:S.stopped)}</span></div>`).join('') : `<p class="srcl">${S.afterFirst}</p>`; }).catch(()=>{ $('#fs').innerHTML=`<p class="srcl">${S.afterFirst}</p>`; });
}

function pageAbout(){
  const ar = `<h2>ما هذا الموقع</h2><p>منصة عربية مستقلة لتجربة العميل والمستفيد. تجمع أدوات عملية تعمل في المتصفح، ومعرفة لتصميم الرحلات وتحسينها، ومتابعة لما تفعله الدول وما يُنشر عن تجربة العميل.</p>
    <h2>الأدوات</h2><p>تعمل كل الأدوات داخل متصفحك، ولا تُرسل بياناتك أو نصوصك إلى أي خادم. مؤشر التعثر في أداة رسم الرحلة نموذج تقديري يجمع الزمن والتحويلات بين الجهات وتكرار البيانات وتغيير القناة والمشاعر، وهدفه توجيه النقاش لا إصدار حكم نهائي. وتصنيف ملاحظات العملاء وفحص الرسائل يعتمدان على كلمات دالة، فراجع النتائج قبل اتخاذ القرار. الأمثلة كلها عامة ولا تخص جهة بعينها.</p>
    <h2>الأخبار</h2><ul><li><b>آخر الأخبار:</b> عناوين تُجمع آلياً كل 30 دقيقة من GDELT ونسخ Google News والمصادر المسجلة، وتُصنف آلياً بالدولة والموضوع والاتجاه. تظهر بلغتها الأصلية مع رابط مصدرها.</li><li><b>قراءات مختارة:</b> مواد يختارها فريق التحرير، ويقرأ مصدرها الأصلي، ويلخصها بالعربية والإنجليزية بأرقامها كما وردت.</li></ul>
    <h2>قواعد النقل</h2><ul><li>لا ننشر رقماً لم يرد في المصدر نفسه، ولكل مادة رابط مصدرها وتاريخ نشره.</li><li>العناوين ملك مواقعها، ونعرض العنوان والرابط فقط.</li><li>التصنيف الآلي قد يخطئ، فارجع دائماً إلى المصدر.</li></ul>
    <h2>الخريطة</h2><p>«حضور الدول في الأخبار» يلوّن الدول بعدد العناوين عنها. و«مؤشر الحكومة الإلكترونية» يلوّنها بدرجتها في مؤشر الأمم المتحدة لتطوير الحكومة الإلكترونية (EGDI) 2024.</p>`;
  const en = `<h2>What this site is</h2><p>An independent platform for customer and citizen experience. It brings together practical tools that run in your browser, knowledge for designing and improving journeys, and a view of what countries are doing and what's being published about customer experience.</p>
    <h2>Tools</h2><p>Every tool runs in your browser; your data and text are never sent to a server. The friction index in the journey tool is an estimate combining time, handoffs, repeated data, channel switches and emotion, meant to guide discussion rather than deliver a verdict. Comment tagging and message checks are keyword-based, so review results before acting on them. All examples are generic.</p>
    <h2>News</h2><ul><li><b>Latest news:</b> headlines gathered every 30 minutes from GDELT, Google News editions and registered sources, tagged automatically by country, topic and direction. They appear in their original language with a link to the source.</li><li><b>Editor's picks:</b> items our editors select, read at the original source and summarise in Arabic and English with the figures as published.</li></ul>
    <h2>Rules</h2><ul><li>We never publish a number that isn't in the source itself; every item links to its source and date.</li><li>Headlines belong to their publishers; we show only the headline and link.</li><li>Automatic tagging can be wrong; always check the source.</li></ul>
    <h2>The map</h2><p>"Countries in the news" shades countries by headlines about them. "E-government index" shades them by their 2024 UN E-Government Development Index (EGDI) score.</p>`;
  main.innerHTML = `<div class="wrap"><header class="pagehead"><span class="kicker">${S.aboutK}</span><h1>${S.aboutTitle}</h1></header><div class="prose">${LANG==='en'?en:ar}</div></div>`;
}

/* ---------- chrome ---------- */
function renderChrome(){
  document.documentElement.lang = LANG; document.documentElement.dir = LANG==='en'?'ltr':'rtl';
  $('.skip').textContent=S.skip;
  $('#brandT').textContent=S.brand; $('#brandS').textContent=S.brandSub;
  $('#nav').innerHTML = ['home','tools','learn','atlas','indices','initiatives','news'].map(k=>`<a href="${href(k==='home'?'':k)}" data-r="${k}">${k==='news'?'<span class="ld" aria-hidden="true"></span>':''}${S.nav[k]}</a>`).join('');
  $('#lensSel').innerHTML = `<option value="">${S.lensAll}</option>` + Object.entries(C).filter(([,d])=>d[3]).sort((a,b)=>cname(a[0]).localeCompare(cname(b[0]),LANG)).map(([c])=>`<option value="${c}" ${c===LENS?'selected':''}>${esc(cname(c))}</option>`).join('');
  $('#lensSel').setAttribute('aria-label',S.lens);
  $('#langBtn').innerHTML = `<span class="tx">${S.langSwitch}</span><span aria-hidden="true" class="ab">${LANG==='en'?'ع':'EN'}</span>`; $('#langBtn').setAttribute('aria-label',S.langLabel+': '+S.langSwitch);
  $('#themeBtn').innerHTML = I[THEMEPREF==='light'?'sun':THEMEPREF==='dark'?'moon':'auto'] + `<span class="tx">${S.theme[THEMEPREF]}</span>`; $('#themeBtn').setAttribute('aria-label',S.themeLabel+': '+S.theme[THEMEPREF]);
  $('#shareBtn').setAttribute('aria-label',S.shareSite); $('#menuBtn').setAttribute('aria-label',S.menu);
  $('#bnav').innerHTML = [['','home','<path d="M3 11 12 4l9 7v9H3z"/><circle cx="12" cy="14" r="2.5"/>'],['tools','tools','<path d="M14.5 6.5a4 4 0 0 0-5.3 5.2L4 17v3h3l5.3-5.2a4 4 0 0 0 5.2-5.3l-2.4 2.4-2.6-.6-.6-2.6z"/>'],['learn','learn','<path d="M4 4h7a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H4z"/><path d="M20 4h-4a2 2 0 0 0-2 2"/><path d="M20 4v14h-6"/>'],['news','news','<circle cx="12" cy="12" r="2.5"/><path d="M7.5 7.5a6.5 6.5 0 0 0 0 9M16.5 7.5a6.5 6.5 0 0 1 0 9M4.6 4.6a10.5 10.5 0 0 0 0 14.8M19.4 4.6a10.5 10.5 0 0 1 0 14.8"/>']].map(([p,k,svg])=>`<a href="${href(p)}" data-r="${k}"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${svg}</svg>${S.navShort[k]}</a>`).join('') + `<button type="button" id="bmore"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" aria-hidden="true"><circle cx="5" cy="12" r="1.3"/><circle cx="12" cy="12" r="1.3"/><circle cx="19" cy="12" r="1.3"/></svg>${S.navShort.more}</button>`;
  $('#bmore').addEventListener('click',()=>{ const o=$('#nav').classList.toggle('open'); $('#menuBtn').setAttribute('aria-expanded',o); });
  $('#footP').textContent=S.footP;
  $('#footLinks').innerHTML=['tools','learn','atlas','indices','initiatives','news','analysis','sources','about'].map(k=>`<a href="${href(k)}">${S.nav[k]}</a>`).join('');
  renderTicker(); footMeta(); statusBar();
}
function applyTheme(){
  const r=document.documentElement; if(THEMEPREF==='auto') r.removeAttribute('data-theme'); else r.setAttribute('data-theme',THEMEPREF);
  const dark = THEMEPREF==='dark' || (THEMEPREF==='auto' && !matchMedia('(prefers-color-scheme: light)').matches);
  const mt=$('meta[name="theme-color"]'); if(mt) mt.setAttribute('content', dark?'#000000':'#FAFAF7');
}
function renderTicker(){
  const l = lensed(LIVE.items).slice(0,20);
  $('.ticker .tg').textContent=S.live;
  if(!l.length){ $('#tickTrack').innerHTML=''; return; }
  const tk = l.map(x=>{ const t=wTitle(x); return `<a href="${esc(x.u)}" target="_blank" rel="noopener" data-id="${esc(x.id)}" dir="${dirOf(t)}">${flag(x.c,'sm')}<span>${esc(t)}</span><span class="s">${esc(x.s)}</span></a>`; }).join('');
  $('#tickTrack').innerHTML = tk+tk;
}
function nextFetch(){ const d=new Date(), m=d.getUTCMinutes(), s=d.getUTCSeconds(); let best=null; for(const t of [7,37]){ let diff=(t-m)*60-s; if(diff<=0) diff+=3600; if(best==null||diff<best) best=diff; } return best; }
function statusBar(){
  const nf=nextFetch(), mm=String(Math.floor(nf/60)).padStart(2,'0'), ss=String(nf%60).padStart(2,'0');
  const rt=new Date().toLocaleTimeString('en-GB',{timeZone:'Asia/Riyadh',hour12:false}), ut=new Date().toLocaleTimeString('en-GB',{timeZone:'UTC',hour12:false});
  $('#status').innerHTML = `<span class="lv">${S.live}</span><span class="hide-s">${S.lastFetch}: <b>${LIVE.updated?agoLong(LIVE.updated):'—'}</b></span><span>${S.nextFetch}: <b dir="ltr">${mm}:${ss}</b></span><span class="sp"></span>${LENS?`<span class="lensChip">${S.lensOn}: ${esc(cname(LENS))}<button type="button" id="clearLens" aria-label="${S.clearLens}">✕</button></span>`:''}<span class="hide-s">${S.utc} <b dir="ltr">${ut}</b></span><span>${S.riyadh} <b dir="ltr">${rt}</b></span>`;
  const cl=$('#clearLens'); if(cl) cl.onclick=()=>setLens('');
}
function footMeta(){ $('#fmeta').innerHTML = `${S.footFetch}: ${LIVE.updated?agoLong(LIVE.updated):'—'}<br>${S.footAn}: ${N.updated?fmtD().format(new Date(N.updated)):'—'}<br>${S.footCounts(items.length,LIVE.items.length,SRC.length)}`; }
function setLens(c){ LENS=c||''; try{ localStorage.setItem('cxk-lens',LENS); }catch(e){} $('#lensSel').value=LENS; renderTicker(); statusBar(); route(true); }

/* ---------- router ---------- */
function route(keepScroll){
  let parts = location.hash.replace(/^#\/?/,'').split('/').filter(Boolean);
  const lang = parts[0]==='en' ? 'en' : 'ar'; if(parts[0]==='en') parts=parts.slice(1);
  if(lang!==LANG || !route.inited){ LANG=lang; S=I18N[LANG]; route.inited=true; try{ localStorage.setItem('cxk-lang',LANG); }catch(e){} renderChrome(); }
  const [a,b,c3] = parts;
  window._liveRefresh=null;
  document.title = LANG==='en' ? 'CX Knowledge | Customer Experience' : 'CX Knowledge | معرفة تجربة العميل';
  const navKey = a==='country'?'atlas':(a==='item'||a==='analysis'||a==='live'||a==='sources')?'news':(a==='lab'||a==='journey')?'tools':(a||'home');
  $$('#nav a, #bnav a').forEach(x=>{ if(x.dataset.r===navKey) x.setAttribute('aria-current','page'); else x.removeAttribute('aria-current'); });
  $('#nav').classList.remove('open'); $('#menuBtn').setAttribute('aria-expanded','false'); $('#tip').hidden=true;
  main.classList.remove('fade'); void main.offsetWidth; main.classList.add('fade');
  if(!a) pageHome();
  else if(a==='news') pageNews();
  else if(a==='live') pageLive();
  else if(a==='atlas') pageAtlas();
  else if(a==='country' && b) pageCountry(b);
  else if(a==='analysis') pageAnalysis();
  else if(a==='item' && b) pageAnalysis(b);
  else if(a==='indices') pageIndices();
  else if(a==='initiatives') pageInitiatives();
  else if(a==='sources') pageSources();
  else if(a==='tools'||a==='learn') { if(window.CXK_Lab) window.CXK_Lab(main,{group:a,tab:b,arg:c3}); }
  else if(a==='lab'||a==='journey') { const LG=['method','library','kit','patterns','principles']; if(window.CXK_Lab) window.CXK_Lab(main,{group:LG.includes(b)?'learn':'tools',tab:b||'tool',arg:c3}); }
  else if(a==='about') pageAbout();
  else if(a.length===2 && C[a.toUpperCase()]) pageCountry(a);
  else pageHome();
  if(a!=='item' && !keepScroll) window.scrollTo(0,0);
}
window.addEventListener('hashchange',()=>route());

/* ---------- live data ---------- */
async function loadLive(first){
  try{
    const r = await fetch('data/live.json?v='+Math.floor(Date.now()/12e4)); if(!r.ok) throw 0;
    const j = await r.json(); const changed = j.updated !== LIVE.updated;
    LIVE = j; LIVE.items = (j.items||[]).sort((a,b)=>Date.parse(b.d)-Date.parse(a.d));
    if(changed && !first){ renderTicker(); footMeta(); if(window._liveRefresh) window._liveRefresh(); toast(S.newHeadlines); }
  }catch(_){}
}

/* ---------- global events ---------- */
document.addEventListener('click',e=>{
  const b=e.target.closest('[data-copy]'); if(b){ copy(b.dataset.copy); return; }
  const w=e.target.closest('a.wi, .ticker a[data-id]'); if(w && w.dataset.id && !e.metaKey && !e.ctrlKey && !e.shiftKey && !w.closest('.modal')){ e.preventDefault(); openItem(w.dataset.id); }
});
$('#menuBtn').addEventListener('click',()=>{ const o=$('#nav').classList.toggle('open'); $('#menuBtn').setAttribute('aria-expanded',o); });
$('#langBtn').addEventListener('click',()=>{ const h=location.hash.replace(/^#\/?/,'').split('/').filter(Boolean); if(h[0]==='en') h.shift(); else h.unshift('en'); location.hash='#/'+h.join('/'); });
$('#themeBtn').addEventListener('click',()=>{ THEMEPREF = THEMEPREF==='auto'?'light':THEMEPREF==='light'?'dark':'auto'; try{ localStorage.setItem('cxk-theme2',THEMEPREF); }catch(e){} applyTheme(); renderChrome(); $$('.mapbox').forEach(box=>{ box.dataset.drawn=''; drawMap(box,{mode:box.dataset.mode||'live',region:box.dataset.region||''}); }); });
$('#lensSel').addEventListener('change',e=>setLens(e.target.value));
let pop=null;
$('#shareBtn').addEventListener('click',e=>{
  e.stopPropagation(); if(pop){pop.remove();pop=null;return;}
  const url=SITE+location.hash, text=S.shareText, Lk=shareLinks(text,url);
  pop=document.createElement('div'); pop.className='pop'; pop.dir=LANG==='en'?'ltr':'rtl';
  pop.innerHTML=`<a href="${Lk.x}" target="_blank" rel="noopener">${I.x} X</a><a href="${Lk.wa}" target="_blank" rel="noopener">${I.wa} WhatsApp</a><a href="${Lk.li}" target="_blank" rel="noopener">${I.li} LinkedIn</a><button type="button" data-copy="${esc(text+'\n'+url)}">${I.cp} ${S.copyLink}</button>`;
  document.body.appendChild(pop); const r=e.currentTarget.getBoundingClientRect();
  pop.style.top=(r.bottom+scrollY+8)+'px'; pop.style.left=Math.max(12,Math.min(r.left+scrollX, innerWidth-230))+'px';
});
document.addEventListener('click',e=>{ if(pop && !pop.contains(e.target) && !e.target.closest('#shareBtn')){ pop.remove(); pop=null; } });
matchMedia('(prefers-color-scheme: light)').addEventListener('change',()=>{ if(THEMEPREF==='auto'){ applyTheme(); $$('.mapbox').forEach(box=>{ box.dataset.drawn=''; drawMap(box,{mode:box.dataset.mode||'live',region:box.dataset.region||''}); }); } });

window.CXK = {esc, flag, toast, copy, I, href:p=>href(p), cname:c=>cname(c), L:(o,f)=>L(o,f), get LANG(){return LANG;}, get S(){return S;}};
applyTheme();
if(!location.hash){ let pref=''; try{ pref=localStorage.getItem('cxk-lang')||''; }catch(e){} if(pref==='en') history.replaceState(null,'','#/en/'); }
setInterval(statusBar,1000);
loadLive(true).then(()=>route());
setInterval(()=>loadLive(false), 5*60*1000);
setInterval(footMeta, 60000);
})();
