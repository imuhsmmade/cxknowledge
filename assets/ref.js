/* صفحات المرجع: الموسوعة، والمؤشرات، والنماذج، والمعايير، والكتب، ومسار التعلم، والبحث في الموقع */
(function(){
"use strict";
const R = window.CXK_REF, K = window.CXK_KIT, J = window.CXK_JOURNEY;
const $ = (s,el=document)=>el.querySelector(s), $$=(s,el=document)=>[...el.querySelectorAll(s)];
const esc = s => String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const nz = s => String(s||'').toLowerCase().replace(/[ً-ْـ]/g,'').replace(/[أإآ]/g,'ا').replace(/ة/g,'ه').replace(/ى/g,'ي');
const LEARN_IDS = ['method','encyclopedia','metrics','frameworks','patterns','principles','standards','library','books','path','kit'];

const T = {
 ar:{ searchEnc:"ابحث في الموسوعة", noRes:"لا نتائج تطابق البحث.", why:"لماذا يهم", how:"كيف تطبّقه", measure:"كيف تقيسه", mistakes:"أخطاء شائعة", related:"اقرأ واستخدم أيضاً", sources:"المصادر", prev:"السابق", next:"التالي", back:"كل مقالات الموسوعة", copyLink:"انسخ رابط المقال", articles:n=>`${n} مقالاً`,
   allGroups:"الكل", formula:"المعادلة", scale:"المقياس", useWhen:"متى تستخدمه", pitfall:"انتبه", searchMet:"ابحث في المؤشرات", by:"المصدر", howUse:"كيف تستخدمه", open:"افتح المرجع", searchBooks:"ابحث في الكتب",
   pathIntro:"أربع مراحل تنقلك من فهم الأساسيات إلى قيادة تجربة العميل في جهة كاملة. كل خطوة رابط إلى مقال أو أداة في الموقع.", step:n=>`المرحلة ${n}`,
   types:{art:"مقال",tool:"أداة",learn:"معرفة",pattern:"نمط انكسار",metric:"مؤشر",fw:"نموذج",std:"معيار",term:"مصطلح",book:"كتاب",country:"دولة",ini:"مبادرة",news:"قراءة",journey:"رحلة",principle:"مبدأ"},
   sTitle:"ابحث في الموقع", sPh:"ابحث عن مصطلح أو أداة أو مؤشر أو دولة…", sHint:"اكتب كلمتين على الأقل. اضغط Esc للإغلاق.", sNone:"لا نتائج. جرّب كلمة أخرى أو اكتبها بالإنجليزية.", sCount:n=>`${n} نتيجة`,
   sSuggest:"جرّب:", sugg:["جهد العميل","NPS","مخطط الخدمة","الشكاوى","ISO 10002","إستونيا","اللغة الواضحة"] },
 en:{ searchEnc:"Search the encyclopedia", noRes:"No results match your search.", why:"Why it matters", how:"How to apply it", measure:"How to measure it", mistakes:"Common mistakes", related:"Read and use next", sources:"Sources", prev:"Previous", next:"Next", back:"All encyclopedia articles", copyLink:"Copy article link", articles:n=>`${n} articles`,
   allGroups:"All", formula:"Formula", scale:"Scale", useWhen:"When to use it", pitfall:"Watch out", searchMet:"Search metrics", by:"Origin", howUse:"How to use it", open:"Open reference", searchBooks:"Search books",
   pathIntro:"Four stages that take you from the basics to leading customer experience across an organisation. Each step links to an article or tool on the site.", step:n=>`Stage ${n}`,
   types:{art:"Article",tool:"Tool",learn:"Knowledge",pattern:"Breakpoint pattern",metric:"Metric",fw:"Model",std:"Standard",term:"Term",book:"Book",country:"Country",ini:"Initiative",news:"Pick",journey:"Journey",principle:"Principle"},
   sTitle:"Search the site", sPh:"Search for a term, tool, metric or country…", sHint:"Type at least two letters. Press Esc to close.", sNone:"No results. Try another word.", sCount:n=>`${n} results`,
   sSuggest:"Try:", sugg:["customer effort","NPS","service blueprint","complaints","ISO 10002","Estonia","plain language"] }
};
const art = id => R.articles.find(a=>a.id===id);

/* روابط «ذو صلة» */
function relLinks(rel, X){
  const C=window.CXK_Catalog(X.LANG), en=X.LANG==='en', out=[];
  (rel.arts||[]).forEach(id=>{ const a=art(id); if(a) out.push([X.href('learn/encyclopedia/'+id), en?a.t_en:a.t, 'art']); });
  (rel.tools||[]).forEach(id=>{ const it=C.items[id]; if(it) out.push([X.href((LEARN_IDS.includes(id)?'learn/':'tools/')+id), it[0], LEARN_IDS.includes(id)?'learn':'tool']); });
  (rel.learn||[]).forEach(id=>{ const it=C.items[id]; if(it) out.push([X.href('learn/'+id), it[0], 'learn']); });
  (rel.patterns||[]).forEach(id=>{ const p=K.patterns.find(x=>x.id===id); if(p) out.push([X.href('learn/patterns/'+id), en?p.n_en:p.n, 'pattern']); });
  (rel.metrics||[]).forEach(id=>{ const m=R.metrics.find(x=>x.id===id); if(m) out.push([X.href('learn/metrics/'+id), (en?m.n_en:m.n)+(m.a?` (${m.a})`:''), 'metric']); });
  (rel.frameworks||[]).forEach(id=>{ const f=R.frameworks.find(x=>x.id===id); if(f) out.push([X.href('learn/frameworks/'+id), en?f.n_en:f.n, 'fw']); });
  (rel.standards||[]).forEach(id=>{ const s=R.standards.find(x=>x.id===id); if(s) out.push([X.href('learn/standards/'+id), s.n, 'std']); });
  return out;
}

/* ---------- الموسوعة ---------- */
function encyclopedia(host, X, arg){
  const t=T[X.LANG], en=X.LANG==='en', li=en?1:0;
  if(arg && art(arg)) return article(host,X,arg);
  let q='';
  host.innerHTML=`<div class="filters" style="margin-top:18px"><span class="srcl">${t.articles(R.articles.length)}</span>${`<label class="field"><span class="sr">${t.searchEnc}</span>${X.I.search}<input id="eq" type="search" placeholder="${t.searchEnc}" autocomplete="off"></label>`}</div><div id="el"></div>`;
  function render(){ const n=nz(q.trim());
    const html=Object.entries(R.cats).map(([k,c])=>{ const l=R.articles.filter(a=>a.c===k&&(!n||nz([a.t,a.t_en,a.s,a.s_en].join(' ')).includes(n)));
      if(!l.length) return ''; return `<section class="ecat"><div class="eh"><h2>${esc(c[li])}</h2><p>${esc(c[2+li])}</p></div><div class="ecards">${l.map(a=>`<a class="ecard" href="${X.href('learn/encyclopedia/'+a.id)}"><b>${esc(en?a.t_en:a.t)}</b><span>${esc(en?a.s_en:a.s)}</span></a>`).join('')}</div></section>`; }).join('');
    $('#el',host).innerHTML=html||`<p class="empty">${t.noRes}</p>`; }
  $('#eq',host).oninput=e=>{ q=e.target.value; render(); }; render();
}
function article(host, X, id){
  const t=T[X.LANG], en=X.LANG==='en', li=en?1:0, a=art(id), cat=R.cats[a.c];
  const sib=R.articles.filter(x=>x.c===a.c), i=sib.indexOf(a), pv=sib[i-1], nx=sib[i+1];
  const rel=relLinks(a.rel||{},X);
  host.innerHTML=`<article class="art">
    <div class="art-head"><a class="crumb" href="${X.href('learn/encyclopedia')}">${t.back}</a><span class="stg">${esc(cat[li])}</span><h2>${esc(en?a.t_en:a.t)}</h2><p class="lead">${esc(en?a.s_en:a.s)}</p></div>
    <div class="art-body">
      <section><h3>${t.why}</h3><p>${esc(en?a.why_en:a.why)}</p></section>
      <section><h3>${t.how}</h3><ol class="steps2">${(en?a.how_en:a.how).map(x=>`<li>${esc(x)}</li>`).join('')}</ol></section>
      <section class="two-c"><div><h3>${t.measure}</h3><p>${esc(en?a.m_en:a.m)}</p></div><div class="warnbox"><h3>${t.mistakes}</h3><ul>${(en?a.x_en:a.x).map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div></section>
      ${rel.length?`<section><h3>${t.related}</h3><div class="rels">${rel.map(([h,n,ty])=>`<a href="${h}"><small>${t.types[ty]}</small>${esc(n)}</a>`).join('')}</div></section>`:''}
      ${a.src&&a.src.length?`<section><h3>${t.sources}</h3><ul class="srcs">${a.src.map(([n,u])=>`<li><a href="${esc(u)}" target="_blank" rel="noopener" dir="ltr">${esc(n)} ${X.I.ext}</a></li>`).join('')}</ul></section>`:''}
    </div>
    <nav class="pn">${pv?`<a href="${X.href('learn/encyclopedia/'+pv.id)}"><small>${t.prev}</small>${esc(en?pv.t_en:pv.t)}</a>`:'<span></span>'}<button class="btn sm" type="button" id="artCopy">${t.copyLink}</button>${nx?`<a class="nx" href="${X.href('learn/encyclopedia/'+nx.id)}"><small>${t.next}</small>${esc(en?nx.t_en:nx.t)}</a>`:'<span></span>'}</nav>
  </article>`;
  $('#artCopy',host).onclick=()=>X.copy(location.origin+location.pathname+X.href('learn/encyclopedia/'+id));
  document.title=(en?a.t_en:a.t)+' | CX Knowledge';
}

/* ---------- المؤشرات ---------- */
function metrics(host, X, arg){
  const t=T[X.LANG], en=X.LANG==='en', li=en?1:0; let g='all', q='';
  host.innerHTML=`<div class="filters" style="margin-top:18px"><div class="chips" id="mg"><button class="chip" type="button" data-k="all" aria-pressed="true">${t.allGroups}</button>${Object.entries(R.metricGroups).map(([k,v])=>`<button class="chip" type="button" data-k="${k}" aria-pressed="false">${esc(v[li])}</button>`).join('')}</div><label class="field"><span class="sr">${t.searchMet}</span>${X.I.search}<input id="mq" type="search" placeholder="${t.searchMet}" autocomplete="off"></label></div><div class="mets" id="ml"></div>`;
  function render(){ const n=nz(q.trim()); $$('#mg .chip',host).forEach(b=>b.setAttribute('aria-pressed',b.dataset.k===g));
    const l=R.metrics.filter(m=>(g==='all'||m.g===g)&&(!n||nz([m.n,m.n_en,m.a,m.d,m.d_en].join(' ')).includes(n)));
    $('#ml',host).innerHTML=l.map(m=>`<article class="met" id="m-${m.id}"><div class="mh"><span class="stg">${esc(R.metricGroups[m.g][li])}</span><h3>${esc(en?m.n_en:m.n)}${m.a?` <span class="ab" dir="ltr">${esc(m.a)}</span>`:''}</h3></div><p>${esc(en?m.d_en:m.d)}</p>
      <div class="fml"><small>${t.formula}</small><code>${esc(en?m.f_en:m.f)}</code><small>${t.scale}: <span dir="${/[\u0600-\u06FF]/.test(en?m.sc_en:m.sc)?'rtl':'ltr'}">${esc(en?m.sc_en:m.sc)}</span></small></div>
      <dl><div><dt>${t.useWhen}</dt><dd>${esc(en?m.u_en:m.u)}</dd></div><div class="w"><dt>${t.pitfall}</dt><dd>${esc(en?m.x_en:m.x)}</dd></div></dl></article>`).join('')||`<p class="empty">${t.noRes}</p>`; }
  $('#mg',host).onclick=e=>{ const b=e.target.closest('[data-k]'); if(b){ g=b.dataset.k; render(); } };
  $('#mq',host).oninput=e=>{ q=e.target.value; render(); }; render(); focusCard(host,'m-'+arg);
}
function focusCard(host,id){ if(!id||/undefined$/.test(id)) return; const el=$('#'+id,host); if(el){ setTimeout(()=>{ el.scrollIntoView({block:'start'}); el.classList.add('hit'); setTimeout(()=>el.classList.remove('hit'),2400); },60); } }

/* ---------- النماذج ---------- */
function frameworks(host, X, arg){
  const t=T[X.LANG], en=X.LANG==='en';
  host.innerHTML=`<div class="fws">${R.frameworks.map(f=>`<article class="fw" id="f-${f.id}"><h3>${esc(en?f.n_en:f.n)}</h3><span class="srcl" dir="auto">${esc(en?f.by_en:f.by)}</span><p>${esc(en?f.d_en:f.d)}</p><div class="ask"><span class="kicker">${t.howUse}</span><p>${esc(en?f.use_en:f.use)}</p></div></article>`).join('')}</div>`;
  focusCard(host,'f-'+arg);
}

/* ---------- المعايير ---------- */
function standards(host, X, arg){
  const t=T[X.LANG], en=X.LANG==='en', li=en?1:0;
  host.innerHTML=Object.entries(R.standardKinds).map(([k,v])=>`<section class="tgroup"><h2>${esc(v[li])}</h2><div class="stds">${R.standards.filter(s=>s.k===k).map(s=>`<article class="std" id="s-${s.id}"><b dir="ltr">${esc(s.n)}</b><h3>${esc(en?s.t_en:s.t)}</h3><p>${esc(en?s.d_en:s.d)}</p><a class="srcl" href="${esc(s.u)}" target="_blank" rel="noopener">${t.open} ${X.I.ext}</a></article>`).join('')}</div></section>`).join('');
  focusCard(host,'s-'+arg);
}

/* ---------- الكتب ---------- */
function books(host, X){
  const t=T[X.LANG], en=X.LANG==='en';
  host.innerHTML=`<div class="books">${R.books.slice().sort((a,b)=>b.y-a.y).map(b=>`<article class="book"><div class="cv" aria-hidden="true"><span dir="ltr">${esc(b.t)}</span></div><div><h3 dir="ltr">${esc(b.t)}</h3><span class="srcl" dir="ltr">${esc(b.a)} · ${b.y}</span><p>${esc(en?b.d_en:b.d)}</p></div></article>`).join('')}</div>`;
}

/* ---------- مسار التعلم ---------- */
function titleFor(path, X){
  const C=window.CXK_Catalog(X.LANG), en=X.LANG==='en', p=path.split('/');
  if(p[1]==='encyclopedia'&&p[2]){ const a=art(p[2]); return [a?(en?a.t_en:a.t):p[2], T[X.LANG].types.art]; }
  const it=C.items[p[1]]; return [it?it[0]:p[1], T[X.LANG].types[p[0]==='tools'?'tool':'learn']];
}
function pathPage(host, X){
  const t=T[X.LANG], en=X.LANG==='en';
  host.innerHTML=`<p class="csum" style="margin-top:18px">${t.pathIntro}</p><ol class="lpath">${R.path.map((s,i)=>`<li><div class="lh"><span class="kicker">${t.step(i+1)}</span><h3>${esc(en?s.n_en:s.n)}</h3><p>${esc(en?s.d_en:s.d)}</p></div><ul>${s.items.map(([p])=>{ const [n,ty]=titleFor(p,X); return `<li><a href="${X.href(p)}"><small>${ty}</small>${esc(n)}</a></li>`; }).join('')}</ul></li>`).join('')}</ol>`;
}

/* ---------- البحث في الموقع ---------- */
let IDX=null, IDXLANG=null;
function buildIndex(X){
  const en=X.LANG==='en', C=window.CXK_Catalog(X.LANG), out=[], add=(ty,title,sub,href,extra,ab)=>out.push({ty,title,sub:sub||'',href,ab:ab?nz(ab):'',k:nz([title,sub,extra||''].join(' '))});
  Object.entries(C.items).forEach(([id,it])=>add(LEARN_IDS.includes(id)?'learn':'tool', it[0], it[1], X.href((LEARN_IDS.includes(id)?'learn/':'tools/')+id), it[2]));
  R.articles.forEach(a=>add('art', en?a.t_en:a.t, en?a.s_en:a.s, X.href('learn/encyclopedia/'+a.id), (en?a.t:a.t_en)+' '+(en?a.why_en:a.why)));
  R.metrics.forEach(m=>add('metric', (en?m.n_en:m.n)+(m.a?` (${m.a})`:''), en?m.d_en:m.d, X.href('learn/metrics/'+m.id), (en?m.n:m.n_en), m.a));
  R.frameworks.forEach(f=>add('fw', en?f.n_en:f.n, en?f.d_en:f.d, X.href('learn/frameworks/'+f.id), (en?f.n:f.n_en)+' '+f.by_en));
  R.standards.forEach(s=>add('std', s.n+' — '+(en?s.t_en:s.t), en?s.d_en:s.d, X.href('learn/standards/'+s.id), en?s.t:s.t_en));
  K.patterns.forEach(p=>add('pattern', en?p.n_en:p.n, en?p.sym_en:p.sym, X.href('learn/patterns/'+p.id), en?p.n:p.n_en));
  K.principles.forEach(p=>add('principle', en?p.n_en:p.n, en?p.d_en:p.d, X.href('learn/principles'), en?p.n:p.n_en));
  J.glossary.concat(R.glossary||[]).forEach(g=>add('term', en?g[1]:g[0], en?g[3]:g[2], X.href('learn/kit'), en?g[0]:g[1]));
  R.books.forEach(b=>add('book', b.t, b.a+' · '+b.y, X.href('learn/books'), b.d));
  (J.library||[]).forEach(x=>add('journey', en?(x.t_en||x.t):x.t, X.cname(x.c), X.href('learn/library'), x.t_en));
  const CO=window.CXK_COUNTRIES||{}; Object.entries(CO).forEach(([c,d])=>{ if(d[2]==null) return; add('country', en?d[1]:d[0], '', X.href('country/'+c.toLowerCase()), en?d[0]:d[1]); });
  const P=window.CXK_PROFILES||{}; Object.entries(P).forEach(([c,p])=>(p.initiatives||[]).forEach(i=>add('ini', X.L(i,'t'), X.cname(c), X.href('country/'+c.toLowerCase()), (i.t_en||'')+' '+(i.d||''))));
  ((window.CXK_NEWS||{}).items||[]).forEach(n=>add('news', X.L(n,'title'), n.source, X.href('item/'+n.id), (n.title_en||'')+' '+(n.summary||'')));
  return out;
}
function search(q, X){
  if(!IDX||IDXLANG!==X.LANG){ IDX=buildIndex(X); IDXLANG=X.LANG; }
  const n=nz(q.trim()); if(n.length<2) return [];
  const words=n.split(/\s+/).filter(Boolean);
  return IDX.map(r=>{ const tn=nz(r.title); let s=({tool:6,art:8,metric:7,learn:5,fw:4,std:4,pattern:4,principle:3,term:-4}[r.ty]||0); if(r.ab&&r.ab===n) s+=150; if(tn===n) s+=100; if(tn.startsWith(n)) s+=40; if(tn.includes(n)) s+=25; if(words.every(w=>r.k.includes(w))) s+=10; else return null; return {...r,s}; }).filter(Boolean).sort((a,b)=>b.s-a.s).slice(0,40);
}
window.CXK_OpenSearch = function(){
  const X=window.CXK, t=T[X.LANG];
  let m=$('#srch'); if(m) m.remove();
  m=document.createElement('div'); m.id='srch'; m.className='srch'; m.setAttribute('role','dialog'); m.setAttribute('aria-modal','true'); m.setAttribute('aria-label',t.sTitle); m.dir=X.LANG==='en'?'ltr':'rtl';
  m.innerHTML=`<div class="sbox"><div class="sin">${X.I.search}<input id="sQ" type="search" placeholder="${t.sPh}" autocomplete="off" aria-label="${t.sTitle}"><button type="button" class="x" id="sX" aria-label="Esc">Esc</button></div><div class="sres" id="sR"><p class="srcl">${t.sHint}</p><p class="sugg">${t.sSuggest} ${t.sugg.map(s=>`<button type="button" data-s="${esc(s)}">${esc(s)}</button>`).join('')}</p></div></div>`;
  document.body.appendChild(m); document.body.classList.add('noscroll');
  const inp=$('#sQ',m), res=$('#sR',m); let sel=0, cur=[];
  const close=()=>{ m.remove(); document.body.classList.remove('noscroll'); };
  function render(){ const q=inp.value; cur=search(q,X); sel=0;
    if(nz(q.trim()).length<2){ res.innerHTML=`<p class="srcl">${t.sHint}</p><p class="sugg">${t.sSuggest} ${t.sugg.map(s=>`<button type="button" data-s="${esc(s)}">${esc(s)}</button>`).join('')}</p>`; return; }
    res.innerHTML=cur.length?`<p class="srcl">${t.sCount(cur.length)}</p>`+cur.map((r,i)=>`<a href="${r.href}" class="sr-i${i===0?' on':''}" data-i="${i}"><small>${t.types[r.ty]}</small><b>${esc(r.title)}</b>${r.sub?`<span>${esc(r.sub).slice(0,140)}</span>`:''}</a>`).join(''):`<p class="empty">${t.sNone}</p>`; }
  inp.addEventListener('input',render);
  inp.addEventListener('keydown',e=>{ const items=$$('.sr-i',res); if(e.key==='ArrowDown'||e.key==='ArrowUp'){ e.preventDefault(); if(!items.length) return; sel=(sel+(e.key==='ArrowDown'?1:-1)+items.length)%items.length; items.forEach((x,i)=>x.classList.toggle('on',i===sel)); items[sel].scrollIntoView({block:'nearest'}); } else if(e.key==='Enter'&&items[sel]){ e.preventDefault(); location.hash=items[sel].getAttribute('href'); close(); } });
  m.addEventListener('click',e=>{ if(e.target===m||e.target.id==='sX') close(); const b=e.target.closest('[data-s]'); if(b){ inp.value=b.dataset.s; render(); inp.focus(); } if(e.target.closest('.sr-i')) close(); });
  m.addEventListener('keydown',e=>{ if(e.key==='Escape') close(); });
  setTimeout(()=>inp.focus(),20);
};
window.CXK_Search = search;
window.CXK_REFPAGES = { encyclopedia, metrics, frameworks, standards, books, path:pathPage };
})();
