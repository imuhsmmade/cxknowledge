/* صفحات: نموذج «وُصول»، ومنهجيات تصميم الرحلة، والمكتبة (كتب وبودكاست) */
(function(){
"use strict";
const MD = window.CXK_MODEL, AP = window.CXK_APPROACHES, SH = window.CXK_SHELF;
const $ = (s,el=document)=>el.querySelector(s), $$=(s,el=document)=>[...el.querySelectorAll(s)];
const esc = s => String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const nz = s => String(s||'').toLowerCase().replace(/[ً-ْـ]/g,'').replace(/[أإآ]/g,'ا').replace(/ة/g,'ه').replace(/ى/g,'ي');
const T = {
 ar:{ novel:"ما الذي يضيفه النموذج", layers:"الطبقات الثلاث والأبعاد الثمانية", dims:"الأبعاد الثمانية ومستوياتها", dim:"البُعد", layer:"الطبقة", weight:"الوزن", crit:"حرج", q:"سؤال التقييم", levels:"مستويات الدرجة من 0 إلى 4",
   scoring:"كيف تُحسب النتيجة", score:"درجة الرحلة", conf:"مؤشر الثقة", cap:"سقف الانكسار", evidence:"مستويات الدليل", factor:"المعامل", bands:"مستويات النتيجة",
   example:"مثال محلول", sc:"الدرجة", ev:"الدليل", contrib:"الإسهام", total:"المجموع",
   stations:"المحطات الخمس لتصميم الرحلة", station:n=>`المحطة ${n}`, steps:"الخطوات", outs:"المخرجات", useTools:"أدوات الموقع", fits:"منهجيات تناسب هذه المحطة",
   cta:"قيّم رحلتك بنموذج «وُصول»", ctaD:"أداة «قيّم رحلتك» تطبق النموذج: أدخل الرحلة، واختر مستوى الدليل لكل بُعد، واضغط «قيّم الرحلة».", openAssess:"افتح أداة التقييم", openMap:"ارسم الرحلة أولاً",
   apIntro:"لا توجد منهجية واحدة تصلح لكل رحلة. هذه أبرز المنهجيات المعتمدة عالمياً، مع ما تصلح له وحدودها، وموقعها من محطات نموذج «وُصول» الخمس.",
   compare:"مقارنة سريعة", ap:"المنهجية", bestFor:"الأنسب حين", inSt:"محطات «وُصول»", when:"متى تستخدمها", plus:"مزاياها", minus:"حدودها", by:"الأصل", open:"المصدر",
   maps:"أنواع خرائط الرحلة", research:"أساليب البحث مع المستفيدين", goal:"يصلح لـ",
   libK:"المكتبة", libT:"مكتبة تجربة العميل", libP:"كتب وبرامج صوتية مختارة في تجربة العميل وتصميم الخدمة والحكومة الرقمية، تحققنا من وجود كل منها ورابطه، ومعها وصف موجز لما تقدمه ولمن تصلح.",
   books:"الكتب", pods:"البودكاست", all:"الكل", lvl:{beg:"مبتدئ",mid:"متوسط",adv:"متقدم"}, lang:{ar:"بالعربية",en:"بالإنجليزية"}, anyLang:"كل اللغات", anyLvl:"كل المستويات",
   tags:{strategy:"الاستراتيجية",design:"التصميم",research:"البحث",measure:"القياس",service:"الخدمة",gov:"الحكومة",ai:"الذكاء الاصطناعي",leadership:"القيادة"},
   search:"ابحث في المكتبة", none:"لا نتائج تطابق التصفية.", host:"التقديم", since:"منذ", listen:"استمع", details:"تفاصيل الكتاب", arEd:"طبعة عربية", count:(b,p)=>`${b} كتاباً · ${p} برنامجاً صوتياً` },
 en:{ novel:"What the model adds", layers:"Three layers, eight dimensions", dims:"The eight dimensions and their levels", dim:"Dimension", layer:"Layer", weight:"Weight", crit:"Critical", q:"Assessment question", levels:"Score levels 0 to 4",
   scoring:"How the result is calculated", score:"Journey score", conf:"Confidence", cap:"Breakpoint cap", evidence:"Evidence levels", factor:"Factor", bands:"Result levels",
   example:"Worked example", sc:"Score", ev:"Evidence", contrib:"Contribution", total:"Total",
   stations:"The five stations of journey design", station:n=>`Station ${n}`, steps:"Steps", outs:"Outputs", useTools:"Tools on this site", fits:"Methodologies that fit this station",
   cta:"Assess your journey with Wusool", ctaD:"The \"Assess your journey\" tool applies the model: enter the journey, choose an evidence level per dimension, and press \"Assess the journey\".", openAssess:"Open the assessment tool", openMap:"Map the journey first",
   apIntro:"No single methodology fits every journey. These are the leading approaches used worldwide, what each is good for, its limits, and where it sits among Wusool's five stations.",
   compare:"Quick comparison", ap:"Methodology", bestFor:"Best when", inSt:"Wusool stations", when:"When to use it", plus:"Strengths", minus:"Limits", by:"Origin", open:"Source",
   maps:"Types of journey maps", research:"Research methods with customers", goal:"Good for",
   libK:"LIBRARY", libT:"The customer experience library", libP:"Selected books and podcasts on customer experience, service design and digital government. We verified each one and its link, with a short note on what it offers and who it suits.",
   books:"Books", pods:"Podcasts", all:"All", lvl:{beg:"Beginner",mid:"Intermediate",adv:"Advanced"}, lang:{ar:"Arabic",en:"English"}, anyLang:"All languages", anyLvl:"All levels",
   tags:{strategy:"Strategy",design:"Design",research:"Research",measure:"Measurement",service:"Service",gov:"Government",ai:"AI",leadership:"Leadership"},
   search:"Search the library", none:"Nothing matches these filters.", host:"Host", since:"Since", listen:"Listen", details:"Book details", arEd:"Arabic edition", count:(b,p)=>`${b} books · ${p} podcasts` }
};
const L2=(o,k,en)=>en?(o[k+'_en']||o[k]):o[k];

/* ---------- نموذج «وُصول» ---------- */
function model(host, X){
  if(!MD){ host.innerHTML=''; return; }
  const en=X.LANG==='en', t=T[X.LANG], li=en?1:0;
  const dimById=id=>MD.dims.find(d=>d.id===id);
  const W=MD.dims.reduce((a,d)=>a+d.w,0);
  const ex=MD.example.rows.map(([id,v,e])=>{ const d=dimById(id), f=MD.evidence.find(x=>x.id===e); return {d,v,f,c:d.w*v/4}; });
  const exTot=ex.reduce((a,x)=>a+x.c,0), exConf=ex.reduce((a,x)=>a+x.d.w*x.f.w,0)/W*100;
  const apFor=i=>(AP?AP.items:[]).filter(a=>a.st.includes(i));
  host.innerHTML=`
  <section class="mdl-hero"><p class="mdl-tag">${esc(L2(MD,'tag',en))}</p><p class="csum">${esc(L2(MD,'intro',en))}</p></section>
  <section class="blk"><div class="sh"><h2>${t.novel}</h2></div><div class="mdl-novel">${MD.novel.map((n,i)=>`<article><span class="num">${String(i+1).padStart(2,'0')}</span><h3>${esc(n[li])}</h3><p>${esc(n[2+li])}</p></article>`).join('')}</div></section>
  <section class="blk"><div class="sh"><h2>${t.layers}</h2></div>
   <div class="mdl-layers">${MD.layers.map(l=>`<div class="mdl-layer ${l.id}"><div class="lh"><b>${esc(L2(l,'n',en))}</b><p>${esc(L2(l,'q',en))}</p></div><div class="lds">${MD.dims.filter(d=>d.layer===l.id).map(d=>`<a href="#d-${d.id}" class="ld${d.crit?' crit':''}"><span>${esc(L2(d,'n',en))}</span><b class="num">${d.w}</b></a>`).join('')}</div></div>`).join('')}</div>
   <p class="note">${en?'Numbers are weights out of 100. Outlined dimensions are critical: if one collapses, the breakpoint cap applies.':'الأرقام أوزان من 100. والأبعاد المحاطة بإطار حرجة: إذا انهار أحدها طُبّق سقف الانكسار.'}</p></section>
  <section class="blk"><div class="sh"><h2>${t.dims}</h2></div><div class="mdl-dims">${MD.dims.map((d,i)=>`<article class="mdl-dim" id="d-${d.id}"><div class="dh"><span class="num">${i+1}</span><div><span class="stg">${esc(L2(MD.layers.find(l=>l.id===d.layer),'n',en))}${d.crit?` · <b class="critb">${t.crit}</b>`:''}</span><h3>${esc(L2(d,'n',en))}</h3></div><span class="srcl num">${t.weight} ${d.w}</span></div><p>${esc(L2(d,'q',en))}</p>
     <details><summary>${t.levels}</summary><ol class="lvls" start="0">${(en?d.lv_en:d.lv).map((x,k)=>`<li><b class="num">${k}</b><span>${esc(x)}</span></li>`).join('')}</ol><p class="srcl"><b>${en?'Typical fix':'المعالجة النموذجية'}:</b> ${esc(L2(d,'rec',en))}</p></details></article>`).join('')}</div></section>
  <section class="blk"><div class="sh"><h2>${t.scoring}</h2></div>
   <div class="mdl-calc"><div><small>${t.score}</small><code>${esc(L2(MD.formula,'s',en))}</code></div><div><small>${t.conf}</small><code>${esc(L2(MD.formula,'c',en))}</code></div><div><small>${t.cap}</small><code>${esc(L2(MD.formula,'k',en))}</code></div></div>
   <div class="two" style="margin-top:14px"><div class="panel"><h3>${t.evidence}</h3><ul class="evl">${MD.evidence.map(e=>`<li><b class="num">${e.w}</b><div><b>${esc(L2(e,'n',en))}</b><p>${esc(L2(e,'d',en))}</p></div></li>`).join('')}</ul></div>
    <div class="panel"><h3>${t.bands}</h3><div class="bandbar">${MD.bands.map((b,i)=>{ const lo=i?MD.bands[i-1][0]:0, hi=Math.min(100,b[0]-1); return `<div style="flex:${hi-lo+1}"><b>${esc(b[1+li])}</b><span class="num" dir="ltr">${lo}–${hi}</span></div>`; }).join('')}</div></div></div></section>
  <section class="blk"><div class="sh"><h2>${t.example}: ${esc(L2(MD.example,'t',en).split(':').slice(1).join(':').trim()||L2(MD.example,'t',en))}</h2></div>
   <div class="tablewrap"><table class="gtab"><thead><tr><th>${t.dim}</th><th>${t.weight}</th><th>${t.sc}</th><th>${t.contrib}</th><th>${t.ev}</th></tr></thead><tbody>${ex.map(x=>`<tr><td>${esc(L2(x.d,'n',en))}${x.d.crit?` <b class="critb">${t.crit}</b>`:''}</td><td class="num">${x.d.w}</td><td class="num">${x.v}/4</td><td class="num">${+x.c.toFixed(2)}</td><td>${esc(L2(x.f,'n',en))} <span class="num">(${x.f.w})</span></td></tr>`).join('')}<tr class="tot"><td>${t.total}</td><td class="num">${W}</td><td></td><td class="num"><b>${Math.round(exTot)}%</b></td><td><b class="num">${Math.round(exConf)}%</b> ${t.conf}</td></tr></tbody></table></div>
   <p class="csum" style="margin-top:12px">${esc(L2(MD.example,'note',en))}</p></section>
  <section class="blk"><div class="sh"><h2>${t.stations}</h2></div><ol class="mdl-st">${MD.stations.map((s,i)=>`<li><div class="sn"><span class="num">${i+1}</span><small>${t.station(i+1)}</small></div><div><h3>${esc(L2(s,'n',en))}</h3><p>${esc(L2(s,'d',en))}</p>
     <div class="sgrid"><div><h4>${t.steps}</h4><ul>${(en?s.steps_en:s.steps).map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div><div><h4>${t.outs}</h4><div class="outs">${(en?s.out_en:s.out).map(o=>`<span>${esc(o)}</span>`).join('')}</div>
     <h4>${t.useTools}</h4><div class="outs">${s.tools.map(p=>{ const id=p.split('/')[1], C=window.CXK_Catalog(X.LANG), it=C.items[id]; return it?`<a href="${X.href(p)}">${esc(it[0])}</a>`:''; }).join('')}</div>
     ${apFor(i).length?`<h4>${t.fits}</h4><div class="outs">${apFor(i).map(a=>`<a href="${X.href('learn/approaches/'+a.id)}">${esc(L2(a,'n',en))}</a>`).join('')}</div>`:''}</div></div></div></li>`).join('')}</ol></section>
  <section class="cta-band"><div><h2>${t.cta}</h2><p>${t.ctaD}</p></div><div class="row-btns"><a class="btn pri" href="${X.href('tools/assess')}">${t.openAssess}</a><a class="btn" href="${X.href('tools/tool')}">${t.openMap}</a></div></section>`;
}

/* ---------- منهجيات تصميم الرحلة ---------- */
function approaches(host, X, arg){
  if(!AP){ host.innerHTML=''; return; }
  const en=X.LANG==='en', t=T[X.LANG], li=en?1:0;
  const stN=i=>MD?L2(MD.stations[i],'n',en):String(i+1);
  host.innerHTML=`<p class="csum" style="margin-top:18px">${t.apIntro}</p>
   <section class="blk"><div class="sh"><h2>${t.compare}</h2></div><div class="tablewrap"><table class="gtab"><thead><tr><th>${t.ap}</th><th>${t.bestFor}</th><th>${t.inSt}</th></tr></thead><tbody>${AP.items.map(a=>`<tr><td><a href="#ap-${a.id}"><b>${esc(L2(a,'n',en))}</b></a></td><td>${esc(L2(a,'when',en))}</td><td>${a.st.map(i=>`<span class="stchip">${esc(stN(i))}</span>`).join(' ')}</td></tr>`).join('')}</tbody></table></div></section>
   <section class="blk"><div class="aps">${AP.items.map(a=>`<article class="ap" id="ap-${a.id}"><div class="aph"><h3>${esc(L2(a,'n',en))}</h3><span class="srcl" dir="auto">${esc(L2(a,'by',en))}</span></div><p>${esc(L2(a,'d',en))}</p>
     <ol class="apsteps">${(en?a.steps_en:a.steps).map(x=>`<li>${esc(x)}</li>`).join('')}</ol>
     <dl><div><dt>${t.when}</dt><dd>${esc(L2(a,'when',en))}</dd></div><div><dt>${t.plus}</dt><dd>${esc(L2(a,'plus',en))}</dd></div><div class="w"><dt>${t.minus}</dt><dd>${esc(L2(a,'minus',en))}</dd></div></dl>
     <div class="apf"><span>${t.inSt}: ${a.st.map(i=>`<span class="stchip">${esc(stN(i))}</span>`).join(' ')}</span><a class="srcl" href="${esc(a.u)}" target="_blank" rel="noopener">${t.open} ${X.I.ext}</a></div></article>`).join('')}</div></section>
   <section class="blk"><div class="sh"><h2>${t.maps}</h2></div><div class="mapt">${AP.maps.map(m=>`<div><b>${esc(m[li])}</b><span class="srcl" dir="ltr">${esc(m[1])}</span><p>${esc(m[2+li])}</p></div>`).join('')}</div></section>
   <section class="blk"><div class="sh"><h2>${t.research}</h2></div><div class="tablewrap"><table class="gtab"><thead><tr><th>${en?'Method':'الأسلوب'}</th><th>${t.goal}</th></tr></thead><tbody>${AP.research.map(r=>`<tr><td><b>${esc(r[li])}</b>${en?'':` <span class="srcl" dir="ltr">${esc(r[1])}</span>`}</td><td>${esc(r[2+li])}</td></tr>`).join('')}</tbody></table></div></section>
   ${MD?`<section class="cta-band"><div><h2>${esc(en?MD.name_en:MD.name)}</h2><p>${esc(L2(MD,'tag',en))}</p></div><div class="row-btns"><a class="btn pri" href="${X.href('learn/model')}">${en?'Read the model':'اقرأ النموذج'}</a></div></section>`:''}`;
  if(arg){ const el=$('#ap-'+arg,host); if(el) setTimeout(()=>{ el.scrollIntoView({block:'start'}); el.classList.add('hit'); setTimeout(()=>el.classList.remove('hit'),2400); },60); }
}

/* ---------- المكتبة ---------- */
function libraryPage(main, X, tab){
  const en=X.LANG==='en', t=T[X.LANG];
  if(!SH){ main.innerHTML=''; return; }
  tab = tab==='podcasts'?'podcasts':'books';
  let tag='', lvl='', lng='', q='';
  main.innerHTML=`<div class="wrap"><header class="pagehead"><span class="kicker">${t.libK}</span><h1>${t.libT}</h1><p>${t.libP}</p><p class="srcl">${t.count(SH.books.length,SH.podcasts.length)}</p></header>
   <nav class="subtabs"><a href="${X.href('library/books')}" ${tab==='books'?'aria-current="page"':''}>${t.books} <span class="n">${SH.books.length}</span></a><a href="${X.href('library/podcasts')}" ${tab==='podcasts'?'aria-current="page"':''}>${t.pods} <span class="n">${SH.podcasts.length}</span></a></nav>
   <div class="filters"><div class="chips" id="lt"><button class="chip" type="button" data-k="" aria-pressed="true">${t.all}</button>${Object.entries(t.tags).map(([k,v])=>`<button class="chip" type="button" data-k="${k}" aria-pressed="false">${v}</button>`).join('')}</div>
    <div class="lsel"><select class="sel" id="ll" aria-label="${t.anyLvl}"><option value="">${t.anyLvl}</option>${Object.entries(t.lvl).map(([k,v])=>`<option value="${k}">${v}</option>`).join('')}</select><select class="sel" id="lg" aria-label="${t.anyLang}"><option value="">${t.anyLang}</option><option value="ar">${t.lang.ar}</option><option value="en">${t.lang.en}</option></select>
    <label class="field"><span class="sr">${t.search}</span>${X.I.search}<input id="lq" type="search" placeholder="${t.search}" autocomplete="off"></label></div></div>
   <div id="lb"></div></div>`;
  const list = tab==='books'?SH.books:SH.podcasts;
  function render(){ const n=nz(q.trim());
    const l=list.filter(x=>(!tag||(x.tags||[]).includes(tag))&&(!lvl||x.lvl===lvl)&&(!lng||x.lang===lng)&&(!n||nz([x.t,x.t_ar,x.a,x.h,x.d,x.d_en].join(' ')).includes(n)))
      .sort((a,b)=>(a.lang==='ar'?-1:0)-(b.lang==='ar'?-1:0) || (b.y||b.since||0)-(a.y||a.since||0));
    const meta=x=>`<div class="lmeta"><span class="lv ${x.lvl}">${t.lvl[x.lvl]||''}</span>${(x.tags||[]).map(k=>`<span>${t.tags[k]||k}</span>`).join('')}</div>`;
    $('#lb',main).innerHTML = l.length ? (tab==='books'
      ? `<div class="books">${l.map(b=>`<article class="book"><div class="cv${b.lang==='ar'?' ar':''}" aria-hidden="true"><span dir="auto">${esc(b.t_ar&&!en?b.t_ar:b.t)}</span></div><div><h3 dir="auto">${esc(b.lang==='ar'||(b.t_ar&&!en)?(b.t_ar||b.t):b.t)}</h3>${b.t_ar&&b.lang!=='ar'?`<span class="srcl" dir="auto">${en?esc(t.arEd+': '+b.t_ar):esc(b.t)} </span>`:''}<span class="srcl" dir="auto">${esc(b.a||'')}${b.y?' · '+b.y:''}</span><p>${esc(en?b.d_en:b.d)}</p>${meta(b)}${b.u?`<a class="srcl" href="${esc(b.u)}" target="_blank" rel="noopener">${t.details} ${X.I.ext}</a>`:''}</div></article>`).join('')}</div>`
      : `<div class="pods">${l.map(p=>`<article class="podc"><div class="pi" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg></div><div><h3 dir="auto">${esc(p.t)}</h3><span class="srcl" dir="auto">${t.host}: ${esc(p.h)}${p.by?' · '+esc(p.by):''}${p.since?` · ${t.since} ${p.since}`:''}</span><p>${esc(en?p.d_en:p.d)}</p>${meta(p)}<a class="btn sm" href="${esc(p.u)}" target="_blank" rel="noopener">${t.listen} ${X.I.ext}</a></div></article>`).join('')}</div>`)
      : `<p class="empty">${t.none}</p>`;
  }
  $('#lt',main).onclick=e=>{ const b=e.target.closest('[data-k]'); if(!b) return; tag=b.dataset.k; $$('#lt .chip',main).forEach(x=>x.setAttribute('aria-pressed',x===b)); render(); };
  $('#ll',main).onchange=e=>{ lvl=e.target.value; render(); };
  $('#lg',main).onchange=e=>{ lng=e.target.value; render(); };
  $('#lq',main).oninput=e=>{ q=e.target.value; render(); };
  render();
}

window.CXK_REFPAGES = Object.assign(window.CXK_REFPAGES||{}, { model, approaches });
window.CXK_LibraryPage = libraryPage;
})();
