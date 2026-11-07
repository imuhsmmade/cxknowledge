/* CX Knowledge v7 — الموقع رحلة من خمس مراحل: الرئيسية (الطريق)، وصفحات المراحل، والورشة، والمكتبة، والعالم */
(function(){
"use strict";
const $=(s,el=document)=>el.querySelector(s), $$=(s,el=document)=>[...el.querySelectorAll(s)];
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const ST=window.CXK_STAGES, KIT=window.CXK_KIT||{patterns:[],principles:[]}, MX=window.CXK_METRICX||{metrics:[]}, REF=window.CXK_REF||{articles:[]}, LS=window.CXK_LESSONS||{items:[]}, CS=window.CXK_CASES||{items:[]};
const SH=window.CXK_SHELF||{books:[],podcasts:[]}, SC=window.CXK_SHELF_CONTENT||{books:{},podcasts:{}};
const P=window.CXK_PROFILES||{}, CO=window.CXK_COUNTRIES||{}, NEWS=(window.CXK_NEWS||{items:[]}).items.slice().sort((a,b)=>(b.date||'').localeCompare(a.date||'')), IX=window.CXK_INDICES||[];
const X=()=>window.CXK;
const isDark=()=>document.documentElement.getAttribute('data-theme')!=='light';
const reduced=()=>matchMedia('(prefers-reduced-motion: reduce)').matches;
const T={
 ar:{ heroK:"معرفة تجربة العميل", heroT:"تجربة العميل في خمس مراحل", heroP:"يبحث العميل عن الخدمة، ويقدّم، وينتظر، ويحصل عليها، ثم يقرر هل يعود ويثق. هذا الموقع مبني على هذه الرحلة: مرّر لتسير على الطريق، وادخل أي محطة.",
   start:"سِر على الطريق", study:"ادرس رحلتك", stages:"المراحل الخمس", stage:n=>`المرحلة ${n}`, enter:"ادخل المرحلة", skip:"تخطَّ المشهد",
   wsK:"الورشة", wsT:"صمّم رحلة عميلك وادرسها", wsP:"ارسم الرحلة مرحلة مرحلة، أو ارفع ملف PDF، ثم ادرسها على المراحل الخمس ولكل شريحة من عملائك.", wsStudy:"دراسة الرحلة بالشرائح", wsStudyD:"المراحل الخمس ثابتة، وشرائح العملاء تختارها أنت، والنتيجة لكل مرحلة ولكل شريحة.", wsDesign:"ارسم الرحلة", wsDesignD:"رحلة عميلك مرحلة مرحلة، مع مؤشر التعثر ونقاط الانكسار.", wsTools:"أدوات أخرى",
   libK:"المكتبة", libT:"كتب وبودكاست ومقالات ودروس، كلها داخل الموقع", libP:"كل كتاب له صفحة تشرح فكرته وما تتعلمه منه وكيف تطبقه. وكل بودكاست له صفحة تقول ماذا يقدّم ولمن.", books:"الكتب", pods:"البودكاست", allBooks:"كل الكتب", allPods:"كل البودكاست",
   wK:"العالم", wT:"كيف تغيّرت تجربة العميل في كل دولة", wP:"أدر الكرة واضغط على أي دولة لترى خط تحوّلها: مبادراتها وأرقامها وأخبارها عبر السنين.", wOpen:"افتح العالم", pulse:"النبض", pulseD:"آخر ما نُشر", ixT:"المؤشرات", allNews:"كل الأخبار", allIx:"كل المؤشرات",
   moments:"ما يقوله العميل في هذه المرحلة", good:"كيف تبدو حين تنجح", pain:"أين يتعثر العميل", sig:"كيف تكتشفه", measure:"كيف تقيسها", how:"كيف تحسّنها", principles:"المبادئ", lessons:"الدروس العملية", who:"من فعلها", read:"اقرأ عنها", dims:"أبعاد نموذج «وُصول» لهذه المرحلة",
   assessStage:"ادرس هذه المرحلة في رحلتك", prev:"المرحلة السابقة", next:"المرحلة التالية", min:n=>`${n} دقيقة`, metricQ:"ماذا يجيب", calc:"حاسبة",
   lvl:{beg:"مبتدئ",mid:"متوسط",adv:"متقدم"}, lang:{ar:"عربي",en:"إنجليزي"}, filterAll:"الكل", by:"تأليف", host:"يقدّمه", since:"منذ", year:"سنة النشر",
   idea:"الفكرة في سطر", learn:"ماذا ستتعلم", concepts:"أهم المفاهيم", apply:"كيف تطبقه في عملك", forWho:"لمن هذا الكتاب", related:"اقرأ معه", rel2:"يخدم هذه المراحل", covers:"ماذا يقدّم", themes:"موضوعات تتكرر فيه", take:"ماذا تأخذ منه", listen:"استمع إليه إذا كنت", backLib:"المكتبة", noContent:"المحتوى قيد الإعداد",
   more:"المزيد في المكتبة", libTiles:{lessons:["الدروس العملية","14 درساً بأمثلة محلولة وحاسبات"],encyclopedia:["الموسوعة","29 مقالاً في أساسيات تجربة العميل وتصميمها وقياسها"],metrics:["دليل المؤشرات","32 مقياساً بطريقة الحساب ومثال محلول"],patterns:["أنماط التعثر","16 نمطاً يتكرر في الخدمات وكيف تكتشفه"],cases:["دراسات الحالة","15 تجربة من جهات حقيقية بنتائجها"],frameworks:["النماذج والأطر","12 إطاراً مرجعياً"],standards:["المعايير","11 معياراً دولياً"],glossary:["المعجم","115 مصطلحاً بالعربية والإنجليزية"],model:["نموذج «وُصول»","منهجية الموقع لتقييم الرحلات"]},
   gT:"خط التحوّل", gAll:"خط التحوّل العالمي", gAllD:"كل المبادرات الموثقة من 30 دولة على خط زمني واحد", gCountries:"دولة موثقة", drag:"اسحب لتدوير الكرة", rank:"الترتيب", egdi:"مؤشر الحكومة الإلكترونية", noProfile:"لا ملف تفصيلياً لهذه الدولة بعد؛ تظهر درجتها في مؤشر الأمم المتحدة.", bodies:"الجهات", line:"خط التحوّل", kinds:{ini:"مبادرة",metric:"رقم",news:"خبر",case:"تجربة"}, nearby:"دول قريبة", backWorld:"العالم", items:n=>`${n} محطة`, nowY:"الآن", region:{gulf:"الخليج",arab:"العالم العربي",europe:"أوروبا",asia:"آسيا",americas:"الأمريكتان",africa:"أفريقيا",oceania:"أوقيانوسيا"},
   srcs:"مصادر الأخبار", about:"عن الموقع" },
 en:{ heroK:"CX KNOWLEDGE", heroT:"Customer experience in five stages", heroP:"The customer looks for a service, applies, waits, receives it, then decides whether to return and trust. This site is built on that journey: scroll to travel the road, and enter any station.",
   start:"Travel the road", study:"Study your journey", stages:"The five stages", stage:n=>`Stage ${n}`, enter:"Enter the stage", skip:"Skip the scene",
   wsK:"Workshop", wsT:"Design and study your customer's journey", wsP:"Map the journey stage by stage, or upload a PDF, then study it across the five stages and for each of your customer segments.", wsStudy:"Journey study by segment", wsStudyD:"Five fixed stages, segments you choose, a result per stage and per segment.", wsDesign:"Map the journey", wsDesignD:"Your customer's journey stage by stage, with a friction index and breakpoints.", wsTools:"More tools",
   libK:"Library", libT:"Books, podcasts, articles and lessons, all inside the site", libP:"Every book has a page explaining its idea, what you learn and how to apply it. Every podcast has a page saying what it offers and for whom.", books:"Books", pods:"Podcasts", allBooks:"All books", allPods:"All podcasts",
   wK:"World", wT:"How customer experience changed in every country", wP:"Spin the globe and tap any country to see its transformation line: initiatives, numbers and news across the years.", wOpen:"Open the world", pulse:"Pulse", pulseD:"Latest published", ixT:"Indices", allNews:"All news", allIx:"All indices",
   moments:"What the customer says at this stage", good:"What it looks like when it works", pain:"Where customers get stuck", sig:"How to detect it", measure:"How to measure it", how:"How to improve it", principles:"Principles", lessons:"Practical lessons", who:"Who did it", read:"Read about it", dims:"Wusool model dimensions for this stage",
   assessStage:"Study this stage in your journey", prev:"Previous stage", next:"Next stage", min:n=>`${n} min`, metricQ:"What it answers", calc:"Calculator",
   lvl:{beg:"Beginner",mid:"Intermediate",adv:"Advanced"}, lang:{ar:"Arabic",en:"English"}, filterAll:"All", by:"By", host:"Hosted by", since:"Since", year:"Published",
   idea:"The idea in one line", learn:"What you'll learn", concepts:"Key concepts", apply:"How to apply it at work", forWho:"Who it's for", related:"Read alongside", rel2:"Serves these stages", covers:"What it offers", themes:"Recurring themes", take:"What you take from it", listen:"Listen if you are", backLib:"Library", noContent:"Content in preparation",
   more:"More in the library", libTiles:{lessons:["Practical lessons","14 lessons with worked examples and calculators"],encyclopedia:["Encyclopedia","29 articles on CX fundamentals, design and measurement"],metrics:["Metrics guide","32 measures with method and worked example"],patterns:["Friction patterns","16 recurring service patterns and how to spot them"],cases:["Case studies","15 real organisations and their results"],frameworks:["Frameworks","12 reference frameworks"],standards:["Standards","11 international standards"],glossary:["Glossary","115 terms in Arabic and English"],model:["The Wusool model","The site's methodology for assessing journeys"]},
   gT:"Transformation line", gAll:"Global transformation line", gAllD:"Every documented initiative from 30 countries on one timeline", gCountries:"documented countries", drag:"Drag to spin the globe", rank:"Rank", egdi:"E-government index", noProfile:"No detailed profile for this country yet; its UN index score is shown.", bodies:"Bodies", line:"Transformation line", kinds:{ini:"Initiative",metric:"Figure",news:"News",case:"Case"}, nearby:"Nearby countries", backWorld:"World", items:n=>`${n} milestones`, nowY:"Now", region:{gulf:"Gulf",arab:"Arab world",europe:"Europe",asia:"Asia",americas:"Americas",africa:"Africa",oceania:"Oceania"},
   srcs:"News sources", about:"About" }
};
const t=()=>T[X().LANG], en=()=>X().LANG==='en';
const L=(o,k)=>en()&&o[k+'_en']!=null?o[k+'_en']:o[k];
const pair=(p)=>p[en()?1:0];
const stageHref=s=>X().href('stage/'+s.id);
const bookId=i=>'b'+i, podId=i=>'p'+i;

/* ---------- عناصر مشتركة ---------- */
function stageStrip(cur){
  return `<ol class="sstrip">${ST.list.map(s=>`<li style="--c:${s.hue}"${s.id===cur?' class="on"':''}><a href="${stageHref(s)}"${s.id===cur?' aria-current="page"':''}><span class="sn">${s.n}</span><span class="st">${esc(L(s,'t'))}</span></a></li>`).join('')}</ol>`;
}
function bookCover(b,i,small){
  const hue=(i*47)%360, title=en()||!b.t_ar?b.t:b.t_ar;
  return `<a class="kbook${small?' sm':''}" href="${X().href('library/book/'+bookId(i))}" style="--h:${hue}"><span class="spine"></span><span class="cover"><span class="bt">${esc(title)}</span><span class="ba">${esc(b.a||'')}</span><span class="by">${b.y||''}</span></span></a>`;
}
function podTile(p,i){
  return `<a class="kpod" href="${X().href('library/podcast/'+podId(i))}" style="--h:${(i*61+20)%360}"><span class="pd"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg></span><b>${esc(p.t)}</b><span>${esc(p.h||p.by||'')}</span></a>`;
}
function lessonCard(x){
  const lv=(LS.levels||{})[x.lvl]||['',''];
  return `<a class="lcard" href="${X().href('learn/lessons/'+x.id)}"><b>${esc(L(x,'t'))}</b><span class="lsum">${esc(L(x,'sum'))}</span><span class="lmeta"><span>${lv[en()?1:0]}</span><span>${t().min(x.min)}</span>${x.calc?`<span class="lhas">${t().calc}</span>`:''}</span></a>`;
}
function newsRow(i){ const x=X(); return `<li><a href="${x.href('item/'+i.id)}">${x.flag(i.c,'sm')}<span class="nt">${esc(L(i,'title'))}</span><span class="nm"><span>${esc(i.source)}</span><time dir="ltr">${esc(i.date)}</time></span></a></li>`; }
function ixMini(ix){ const x=X(); const v=ix.fmt==='0.0000'?ix.value.toFixed(4):ix.value; return `<a class="ixm" href="${x.href('indices')}"><span class="ixv num">${v}${ix.unit?`<small>${esc(ix.unit)}</small>`:''}</span><b>${esc(L(ix,'name'))}</b><span>${x.flag(ix.c,'sm')}${esc(x.cname(ix.c))} · ${esc(L(ix,'period'))}</span></a>`; }

/* ---------- الرئيسية ---------- */
let road=null, onScroll=null;
function leave(){ if(road){ road.destroy(); road=null; } if(onScroll){ removeEventListener('scroll',onScroll); onScroll=null; } document.body.classList.remove('home7'); }
function home(main){
  const x=X(), s=t(), dark=isDark(), rm=reduced();
  const counts={books:SH.books.length,pods:SH.podcasts.length,arts:REF.articles.length,lessons:LS.items.length,metrics:MX.metrics.length,countries:Object.keys(P).length};
  document.body.classList.add('home7');
  main.innerHTML=`
  <section class="jhero${rm?' static':''}" id="jhero">
    <div class="jsticky">
      <div class="jroad" id="jroad" aria-hidden="true"></div>
      <div class="jover wrap">
        <div class="jintro" id="jintro"><span class="kicker">${s.heroK}</span><h1>${s.heroT}</h1><p>${s.heroP}</p>
          <div class="jbtns"><button type="button" class="btn pri" id="jgo">${s.start}</button><a class="btn" href="${x.href('workshop/study')}">${s.study}</a></div></div>
        <ol class="jprog" id="jprog" aria-label="${s.stages}">${ST.list.map(st=>`<li style="--c:${st.hue}"><a href="${stageHref(st)}"><b>${st.n}</b><span>${esc(L(st,'t'))}</span></a></li>`).join('')}</ol>
        <a class="jskip" href="#stages">${s.skip} ↓</a>
      </div>
    </div>
  </section>
  <section class="wrap jstages" id="stages">
    <div class="sh"><h2>${s.stages}</h2><p>${esc(pair([ST.intro.ar,ST.intro.en]))}</p></div>
    <ol class="scards">${ST.list.map(st=>`<li><a class="scard" href="${stageHref(st)}" style="--c:${st.hue}"><span class="scn">${st.n}</span><b>${esc(L(st,'t'))}</b><span class="scq">${esc(L(st,'q'))}</span><span class="scm">${st.patterns.length} ${en()?'patterns':'أنماط'} · ${st.metrics.length} ${en()?'metrics':'مؤشرات'} · ${st.lessons.length} ${en()?'lessons':'دروس'}</span><span class="scgo">${s.enter}</span></a></li>`).join('')}</ol>
  </section>
  <section class="wrap jws"><div class="jwsg">
    <div class="jwsi"><span class="kicker">${s.wsK}</span><h2>${s.wsT}</h2><p>${s.wsP}</p></div>
    <a class="jbig" href="${x.href('workshop/study')}"><span class="jbn">01</span><b>${s.wsStudy}</b><span>${s.wsStudyD}</span></a>
    <a class="jbig alt" href="${x.href('tools/tool')}"><span class="jbn">02</span><b>${s.wsDesign}</b><span>${s.wsDesignD}</span></a>
  </div></section>
  <section class="wrap jlib"><div class="sh"><div><span class="kicker">${s.libK}</span><h2>${s.libT}</h2><p>${s.libP}</p></div><a class="more" href="${x.href('library')}">${s.more}</a></div>
    <div class="shelf tilt" id="jshelf">${SH.books.slice(0,10).map((b,i)=>bookCover(b,i,true)).join('')}</div>
    <div class="jcounts"><span><b class="num">${counts.books}</b>${s.books}</span><span><b class="num">${counts.pods}</b>${s.pods}</span><span><b class="num">${counts.arts}</b>${en()?'articles':'مقالاً'}</span><span><b class="num">${counts.lessons}</b>${en()?'lessons':'درساً'}</span><span><b class="num">${counts.metrics}</b>${en()?'metrics':'مؤشراً'}</span></div>
  </section>
  <section class="wrap jworld"><div class="jwg">
    <div class="jglobe" id="jglobe"></div>
    <div class="jwi"><span class="kicker">${s.wK}</span><h2>${s.wT}</h2><p>${s.wP}</p><a class="btn pri" href="${x.href('world')}">${s.wOpen}</a>
      <div class="jpulse"><div class="sh"><h3>${s.pulse}</h3><a class="more" href="${x.href('news')}">${s.allNews}</a></div><ul class="nlist">${NEWS.slice(0,4).map(newsRow).join('')}</ul></div>
    </div>
  </div></section>`;
  /* المشهد */
  const host=$('#jroad',main), hero=$('#jhero',main);
  try{ road=window.CXK_Road(host,{dark, reduced:rm, stations:ST.list.map(st=>({id:st.id,n:st.n,hue:st.hue,label:L(st,'t'),q:L(st,'q')})), onStation:st=>{ location.hash=stageHref(ST.list.find(z=>z.id===st.id)); }}); }catch(e){ host.innerHTML=''; hero.classList.add('static'); }
  const prog=$('#jprog',main), intro=$('#jintro',main);
  const upd=()=>{ if(!road) return; const r=hero.getBoundingClientRect(), total=hero.offsetHeight-innerHeight; const p=total>0?Math.max(0,Math.min(1,-r.top/total)):0; road.setProgress(p); const idx=Math.round(p*4); $$('li',prog).forEach((li,i)=>li.classList.toggle('on',i===idx)); intro.classList.toggle('away',p>0.06); host.classList.toggle('intro-on',p<=0.06); };
  onScroll=()=>requestAnimationFrame(upd); addEventListener('scroll',onScroll,{passive:true}); upd();
  $('#jgo',main).onclick=()=>{ const total=hero.offsetHeight-innerHeight; scrollTo({top:hero.offsetTop+total*0.02+1,behavior:'smooth'}); setTimeout(()=>scrollTo({top:hero.offsetTop+total*0.235,behavior:'smooth'}),500); };
  tiltShelf($('#jshelf',main));
  miniGlobe($('#jglobe',main));
}

/* ---------- صفحة المرحلة ---------- */
function stage(main,id){
  const x=X(), s=t(), i=ST.list.findIndex(z=>z.id===id), st=ST.list[i]; if(!st) return false;
  const prev=ST.list[i-1], next=ST.list[i+1];
  const pats=st.patterns.map(p=>KIT.patterns.find(z=>z.id===p)).filter(Boolean);
  const mets=st.metrics.map(m=>MX.metrics.find(z=>z.id===m)).filter(Boolean);
  const rm=id=>(REF.metrics||[]).find(z=>z.id===id)||{};
  const arts=st.articles.map(a=>REF.articles.find(z=>z.id===a)).filter(Boolean);
  const les=st.lessons.map(l=>LS.items.find(z=>z.id===l)).filter(Boolean);
  const cases=st.cases.map(c=>CS.items.find(z=>z.id===c)).filter(Boolean);
  const prin=st.principles.map(k=>KIT.principles[k]).filter(Boolean);
  const MD=window.CXK_MODEL, dims=MD?st.dims.map(d=>MD.dims.find(z=>z.id===d)).filter(Boolean):[];
  main.innerHTML=`<div class="wrap stpage" style="--c:${st.hue}">
    ${stageStrip(st.id)}
    <header class="sthead"><span class="stnum" aria-hidden="true">${st.n}</span><div><span class="kicker">${s.stage(st.n)} · ${esc(L(st,'long'))}</span><h1>${esc(L(st,'t'))}</h1><p class="stq">${esc(L(st,'q'))}</p><p class="std">${esc(L(st,'d'))}</p></div></header>
    <section class="stsec two">
      <div><h2>${s.moments}</h2><ul class="moments">${st.moments.map(m=>`<li>«${esc(pair(m))}»</li>`).join('')}</ul></div>
      <div><h2>${s.good}</h2><ul class="goodl">${st.good.map(g=>`<li>${esc(pair(g))}</li>`).join('')}</ul></div>
    </section>
    <section class="stsec"><div class="sh"><h2>${s.pain}</h2><a class="more" href="${x.href('learn/patterns')}">${en()?'All patterns':'كل الأنماط'}</a></div>
      <div class="pats">${pats.map(p=>`<a class="kpat" href="${x.href('learn/patterns/'+p.id)}"><b>${esc(L(p,'n'))}</b><p>${esc(L(p,'sym'))}</p><small><em>${s.sig}:</em> ${esc(L(p,'sig'))}</small></a>`).join('')}</div></section>
    <section class="stsec"><div class="sh"><h2>${s.measure}</h2><a class="more" href="${x.href('learn/metrics')}">${en()?'Metrics guide':'دليل المؤشرات'}</a></div>
      <div class="mets">${mets.map(m=>{ const r=rm(m.id); return `<a class="kmet" href="${x.href('learn/metrics/'+m.id)}"><span class="mab">${esc(r.a||m.id.toUpperCase())}</span><b>${esc(en()?(r.n_en||m.id):(r.n||m.id))}</b><span>${esc(L(m,'q'))}</span></a>`; }).join('')}</div></section>
    <section class="stsec two">
      <div><h2>${s.principles}</h2><ul class="kprin">${prin.map(p=>`<li><b>${esc(L(p,'n'))}</b><span>${esc(L(p,'d'))}</span></li>`).join('')}</ul>
        ${dims.length?`<h3 class="dimh">${s.dims}</h3><ul class="dims">${dims.map(d=>`<li><a href="${x.href('learn/model')}"><b>${esc(L(d,'n'))}</b><span>${esc(L(d,'q')||L(d,'d')||'')}</span></a></li>`).join('')}</ul>`:''}</div>
      <div><div class="sh"><h2>${s.lessons}</h2><a class="more" href="${x.href('learn/lessons')}">${en()?'All lessons':'كل الدروس'}</a></div><div class="lgrid one">${les.map(lessonCard).join('')}</div></div>
    </section>
    ${cases.length?`<section class="stsec"><div class="sh"><h2>${s.who}</h2><a class="more" href="${x.href('learn/cases')}">${en()?'All cases':'كل التجارب'}</a></div><div class="cases">${cases.map(c=>window.CXK_CaseCard(c,x)).join('')}</div></section>`:''}
    <section class="stsec"><h2>${s.read}</h2><ul class="sarts">${arts.map(a=>`<li><a href="${x.href('learn/encyclopedia/'+a.id)}"><b>${esc(L(a,'t'))}</b><span>${esc(L(a,'s'))}</span></a></li>`).join('')}</ul></section>
    <section class="stcta"><a class="btn pri" href="${x.href('workshop/study')}">${s.assessStage}</a></section>
    <nav class="snext">${prev?`<a href="${stageHref(prev)}"><small>${s.prev}</small><span>${prev.n}. ${esc(L(prev,'t'))}</span></a>`:'<span></span>'}${next?`<a class="nx" href="${stageHref(next)}"><small>${s.next}</small><span>${next.n}. ${esc(L(next,'t'))}</span></a>`:`<a class="nx" href="${x.href('workshop/study')}"><small>${s.next}</small><span>${s.study}</span></a>`}</nav>
  </div>`;
  document.title=L(st,'t')+' | CX Knowledge';
  return true;
}

/* ---------- الورشة ---------- */
function workshop(main){
  const x=X(), s=t(), C=window.CXK_Catalog?window.CXK_Catalog(x.LANG):{items:{},tools:[]}, icon=window.CXK_Icon||(()=>'');
  const toolIds=['voc','survey','msg','prio','calc','maturity','sim'];
  main.innerHTML=`<div class="wrap">
    <header class="pagehead"><span class="kicker">${s.wsK}</span><h1>${s.wsT}</h1><p>${s.wsP}</p></header>
    <div class="jwsg solo"><a class="jbig" href="${x.href('workshop/study')}"><span class="jbn">01</span><b>${s.wsStudy}</b><span>${s.wsStudyD}</span></a><a class="jbig alt" href="${x.href('tools/tool')}"><span class="jbn">02</span><b>${s.wsDesign}</b><span>${s.wsDesignD}</span></a></div>
    <section class="stsec"><div class="sh"><h2>${s.wsTools}</h2></div><div class="tcards three">${toolIds.map(k=>{ const it=C.items[k]; return it?`<a class="tcard" href="${x.href('tools/'+k)}"><span class="ti">${icon(it[3])}</span><span><b>${esc(it[0])}</b><span>${esc(it[1])}</span></span></a>`:''; }).join('')}</div></section>
    <section class="stsec"><div class="sh"><h2>${en()?'Methodologies':'المنهجيات'}</h2></div><div class="tcards three">${['model','approaches','method','principles'].map(k=>{ const it=C.items[k]; return it?`<a class="tcard" href="${x.href('learn/'+k)}"><span class="ti">${icon(it[3])}</span><span><b>${esc(it[0])}</b><span>${esc(it[1])}</span></span></a>`:''; }).join('')}</div></section>
  </div>`;
}

/* ---------- المكتبة ---------- */
function library(main, sub, arg){
  const x=X(), s=t();
  if(sub==='book') return bookPage(main, arg);
  if(sub==='podcast') return podPage(main, arg);
  const tags=[...new Set(SH.books.flatMap(b=>b.tags||[]))];
  main.innerHTML=`<div class="wrap lib7">
    <header class="pagehead"><span class="kicker">${s.libK}</span><h1>${s.libT}</h1><p>${s.libP}</p></header>
    <section class="stsec"><div class="sh"><h2>${s.books} <small class="num">${SH.books.length}</small></h2>
      <div class="chips" id="bfilter"><button type="button" class="chip on" data-f="all">${s.filterAll}</button>${['beg','mid','adv'].map(l=>`<button type="button" class="chip" data-f="lvl:${l}">${s.lvl[l]}</button>`).join('')}<button type="button" class="chip" data-f="lang:ar">${s.lang.ar}</button></div></div>
      <div class="shelf big tilt" id="shelf">${SH.books.map((b,i)=>`<span class="bslot" data-lvl="${b.lvl||''}" data-lang="${b.lang||''}" data-tags="${(b.tags||[]).join(' ')}">${bookCover(b,i,false)}</span>`).join('')}</div></section>
    <section class="stsec"><div class="sh"><h2>${s.pods} <small class="num">${SH.podcasts.length}</small></h2></div><div class="kpods">${SH.podcasts.map(podTile).join('')}</div></section>
    <section class="stsec"><div class="sh"><h2>${en()?'Read and learn':'اقرأ وتعلّم'}</h2></div>
      <div class="ltiles">${Object.entries(s.libTiles).map(([k,v])=>`<a class="ltile" href="${x.href('learn/'+k)}"><b>${v[0]}</b><span>${v[1]}</span></a>`).join('')}</div></section>
  </div>`;
  const shelf=$('#shelf',main); tiltShelf(shelf);
  $('#bfilter',main).onclick=e=>{ const b=e.target.closest('[data-f]'); if(!b) return; $$('.chip',e.currentTarget).forEach(c=>c.classList.toggle('on',c===b)); const f=b.dataset.f; $$('.bslot',shelf).forEach(sl=>{ let ok=true; if(f.startsWith('lvl:')) ok=sl.dataset.lvl===f.slice(4); else if(f.startsWith('lang:')) ok=sl.dataset.lang===f.slice(5); sl.hidden=!ok; }); };
}
function tiltShelf(el){ if(!el||reduced()) return; el.addEventListener('pointermove',e=>{ const b=e.target.closest('.kbook'); $$('.kbook',el).forEach(k=>{ if(k!==b) k.style.transform=''; }); if(!b) return; const r=b.getBoundingClientRect(); const px=(e.clientX-r.left)/r.width-0.5, py=(e.clientY-r.top)/r.height-0.5; b.style.transform=`rotateY(${(-22+px*18).toFixed(1)}deg) rotateX(${(-py*10).toFixed(1)}deg) translateZ(14px)`; }); el.addEventListener('pointerleave',()=>$$('.kbook',el).forEach(k=>k.style.transform='')); }
function bookPage(main,id){
  const x=X(), s=t(), i=+String(id).replace(/^b/,''), b=SH.books[i]; if(!b) return false;
  const c=(SC.books||{})[bookId(i)]||null, title=en()||!b.t_ar?b.t:b.t_ar, hue=(i*47)%360;
  const stages=(c&&c.stages||[]).map(k=>ST.list.find(z=>z.id===k)).filter(Boolean);
  const rel=(c&&c.rel||[]).map(r=>{ const [k,id]=r; if(k==='article'){ const a=REF.articles.find(z=>z.id===id); return a?[x.href('learn/encyclopedia/'+id),L(a,'t')]:null; } if(k==='lesson'){ const l=LS.items.find(z=>z.id===id); return l?[x.href('learn/lessons/'+id),L(l,'t')]:null; } if(k==='book'){ const j=+id.replace(/^b/,''), bb=SH.books[j]; return bb?[x.href('library/book/'+id),en()||!bb.t_ar?bb.t:bb.t_ar]:null; } if(k==='tool') return [x.href('tools/'+id),id]; return null; }).filter(Boolean);
  const li=k=>(c&&c[k]||[]).map(v=>`<li>${esc(pair(v))}</li>`).join('');
  main.innerHTML=`<article class="wrap bookp" style="--h:${hue}">
    <a class="crumb" href="${x.href('library')}">${s.backLib}</a>
    <header class="bhead"><div class="kbook lg" style="--h:${hue}"><span class="spine"></span><span class="cover"><span class="bt">${esc(title)}</span><span class="ba">${esc(b.a||'')}</span><span class="by">${b.y||''}</span></span></div>
      <div><span class="kicker">${s.books} · ${s.lvl[b.lvl]||''} · ${s.lang[b.lang]||''}</span><h1>${esc(title)}</h1>${b.t_ar&&!en()?`<p class="bten" dir="ltr">${esc(b.t)}</p>`:''}<p class="bmeta">${s.by} ${esc(b.a||'')}${b.y?` · ${s.year} ${b.y}`:''}</p>
        ${c?`<p class="idea">${esc(pair(c.idea))}</p>`:`<p class="idea">${esc(L(b,'d'))}</p>`}
        ${stages.length?`<p class="bstg">${s.rel2}: ${stages.map(st=>`<a href="${stageHref(st)}" style="--c:${st.hue}"><i>${st.n}</i>${esc(L(st,'t'))}</a>`).join('')}</p>`:''}</div></header>
    ${c?`<div class="bbody"><div class="bmain">
      <section><h2>${s.learn}</h2><ul class="goodl">${li('learn')}</ul></section>
      <section><h2>${s.concepts}</h2><dl class="concepts">${(c.concepts||[]).map(k=>`<div><dt>${esc(pair(k[0]))}</dt><dd>${esc(pair(k[1]))}</dd></div>`).join('')}</dl></section>
      <section><h2>${s.apply}</h2><ol class="lsteps">${(c.apply||[]).map(a=>`<li><b>${esc(pair(a[0]))}</b><p>${esc(pair(a[1]))}</p></li>`).join('')}</ol></section>
      </div><aside class="bside"><section class="lsec"><h3>${s.forWho}</h3><ul class="lneed">${li('who')}</ul></section>${rel.length?`<section class="lsec"><h3>${s.related}</h3><ul class="llinks">${rel.map(r=>`<li><a href="${r[0]}"><span>${esc(r[1])}</span></a></li>`).join('')}</ul></section>`:''}</aside></div>`:`<p class="empty">${s.noContent}</p>`}
    <section class="stsec"><div class="sh"><h2>${s.more}</h2><a class="more" href="${x.href('library')}">${s.allBooks}</a></div><div class="shelf tilt">${SH.books.map((bb,j)=>[bb,j]).filter(([bb,j])=>j!==i&&(bb.tags||[]).some(tg=>(b.tags||[]).includes(tg))).slice(0,6).map(([bb,j])=>bookCover(bb,j,true)).join('')}</div></section>
  </article>`;
  document.title=title+' | CX Knowledge'; tiltShelf($('.shelf',main)); return true;
}
function podPage(main,id){
  const x=X(), s=t(), i=+String(id).replace(/^p/,''), p=SH.podcasts[i]; if(!p) return false;
  const c=(SC.podcasts||{})[podId(i)]||null, hue=(i*61+20)%360;
  const stages=(c&&c.stages||[]).map(k=>ST.list.find(z=>z.id===k)).filter(Boolean);
  const li=k=>(c&&c[k]||[]).map(v=>`<li>${esc(pair(v))}</li>`).join('');
  main.innerHTML=`<article class="wrap bookp podp" style="--h:${hue}">
    <a class="crumb" href="${x.href('library')}">${s.backLib}</a>
    <header class="bhead"><div class="kpod lg" style="--h:${hue}"><span class="pd"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" aria-hidden="true"><rect x="9" y="3" width="6" height="11" rx="3"/><path d="M5 11a7 7 0 0 0 14 0M12 18v3"/></svg></span></div>
      <div><span class="kicker">${s.pods} · ${s.lvl[p.lvl]||''} · ${s.lang[p.lang]||''}</span><h1>${esc(p.t)}</h1><p class="bmeta">${s.host} ${esc(p.h||'')}${p.by&&p.by!==p.h?` · ${esc(p.by)}`:''}${p.since?` · ${s.since} ${p.since}`:''}</p>
        <p class="idea">${c?esc(pair(c.idea)):esc(L(p,'d'))}</p>
        ${stages.length?`<p class="bstg">${s.rel2}: ${stages.map(st=>`<a href="${stageHref(st)}" style="--c:${st.hue}"><i>${st.n}</i>${esc(L(st,'t'))}</a>`).join('')}</p>`:''}</div></header>
    ${c?`<div class="bbody"><div class="bmain">
      <section><h2>${s.covers}</h2><p class="lede2">${esc(pair(c.covers))}</p></section>
      <section><h2>${s.themes}</h2><dl class="concepts">${(c.themes||[]).map(k=>`<div><dt>${esc(pair(k[0]))}</dt><dd>${esc(pair(k[1]))}</dd></div>`).join('')}</dl></section>
      <section><h2>${s.take}</h2><ul class="goodl">${li('take')}</ul></section>
      </div><aside class="bside"><section class="lsec"><h3>${s.listen}</h3><ul class="lneed">${li('who')}</ul></section></aside></div>`:`<p class="empty">${s.noContent}</p>`}
    <section class="stsec"><div class="sh"><h2>${s.pods}</h2><a class="more" href="${x.href('library')}">${s.allPods}</a></div><div class="kpods">${SH.podcasts.map((pp,j)=>[pp,j]).filter(([,j])=>j!==i).slice(0,4).map(([pp,j])=>podTile(pp,j)).join('')}</div></section>
  </article>`;
  document.title=p.t+' | CX Knowledge'; return true;
}

/* ---------- العالم ---------- */
let worldP=null;
function loadWorld(){ if(!worldP) worldP=fetch('data/world.json').then(r=>r.json()).then(tp=>{ const w=topojson.feature(tp,tp.objects.countries); w.features.forEach(f=>{ const g=f.geometry; if(!g) return; const fix=poly=>d3.geoArea({type:'Polygon',coordinates:poly})>2*Math.PI?poly.map(r=>r.slice().reverse()):poly; if(g.type==='Polygon') g.coordinates=fix(g.coordinates); else if(g.type==='MultiPolygon') g.coordinates=g.coordinates.map(fix); }); return w; }); return worldP; }
function yearOf(v){ const m=String(v||'').match(/(19|20)\d{2}/); return m?+m[0]:null; }
function startYear(y){ return yearOf(String(y||'').split(/[–\-]/)[0]); }
function timelineFor(code){
  const x=X(), p=P[code]||{}, out=[];
  (p.initiatives||[]).forEach(i=>{ const y=startYear(i.y); out.push({k:'ini',y:y||0,ys:i.y||'',t:L(i,'t'),d:L(i,'d'),impact:L(i,'impact'),theme:i.theme}); });
  (p.metrics||[]).forEach(m=>{ const y=yearOf(m.d); out.push({k:'metric',y:y||0,ys:m.d||'',t:L(m,'l'),v:m.v,d:m.s||''}); });
  CS.items.filter(c=>c.c===code).forEach(c=>out.push({k:'case',y:startYear(c.y)||0,ys:c.y||'',t:L(c,'t'),d:L(c,'ctx'),href:x.href('learn/cases/'+c.id)}));
  NEWS.filter(n=>n.c===code).slice(0,12).forEach(n=>out.push({k:'news',y:yearOf(n.date)||0,ys:n.date,t:L(n,'title'),d:n.stat?`${L(n.stat,'v')} ${L(n.stat,'l')}`:'',href:x.href('item/'+n.id)}));
  return out.sort((a,b)=>(a.y-b.y)||String(a.ys).localeCompare(String(b.ys)));
}
function tlItem(it){ const s=t(), x=X(); const inner=`<span class="tlk">${s.kinds[it.k]}</span><b>${esc(it.t)}</b>${it.v?`<span class="tlv num" dir="ltr">${esc(it.v)}</span>`:''}${it.d?`<p>${esc(it.d)}</p>`:''}${it.impact?`<p class="tli">${esc(it.impact)}</p>`:''}`; return `<li class="tl tk-${it.k}"><time dir="ltr">${esc(it.ys||'')}</time>${it.href?`<a href="${it.href}">${inner}</a>`:`<div>${inner}</div>`}</li>`; }
function world(main, sub, arg){
  const x=X(), s=t();
  if(sub==='timeline') return globalTimeline(main);
  if(sub && sub.length===2 && CO[sub.toUpperCase()]) return countryPage(main, sub.toUpperCase());
  const codes=Object.keys(P);
  main.innerHTML=`<div class="wrap w7">
    <header class="pagehead"><span class="kicker">${s.wK}</span><h1>${s.wT}</h1><p>${s.wP}</p></header>
    <div class="wgl"><div class="globe" id="globe" role="img" aria-label="${s.wT}"><div class="gtip" id="gtip" hidden></div><span class="ghint">${s.drag}</span></div>
      <div class="wside"><div class="sh"><h3>${s.gT}</h3><span class="srcl">${codes.length} ${s.gCountries}</span></div><ul class="clist">${codes.sort((a,b)=>(CO[a][3]||999)-(CO[b][3]||999)).map(c=>`<li><a href="${x.href('world/'+c.toLowerCase())}">${x.flag(c,'sm')}<b>${esc(x.cname(c))}</b><span class="num">${CO[c][3]?'#'+CO[c][3]:''}</span></a></li>`).join('')}</ul>
        <a class="btn" href="${x.href('world/timeline')}">${s.gAll}</a></div></div>
    <div class="wgrid2">
      <section class="wpanel"><div class="sh"><h2>${s.pulse}</h2><a class="more" href="${x.href('news')}">${s.allNews}</a></div><ul class="nlist">${NEWS.slice(0,6).map(newsRow).join('')}</ul><p class="note"><a href="${x.href('sources')}">${s.srcs}</a></p></section>
      <section class="wpanel"><div class="sh"><h2>${s.ixT}</h2><a class="more" href="${x.href('indices')}">${s.allIx}</a></div><div class="ixms">${IX.slice(0,4).map(ixMini).join('')}</div></section>
    </div>
  </div>`;
  bigGlobe($('#globe',main));
}
function globalTimeline(main){
  const x=X(), s=t(); const all=[];
  Object.keys(P).forEach(c=>(P[c].initiatives||[]).forEach(i=>all.push({c,y:startYear(i.y)||0,ys:i.y||'',t:L(i,'t'),impact:L(i,'impact'),theme:i.theme})));
  all.sort((a,b)=>a.y-b.y);
  const years=[...new Set(all.map(a=>a.y))];
  main.innerHTML=`<div class="wrap w7"><a class="crumb" href="${x.href('world')}">${s.backWorld}</a><header class="pagehead"><span class="kicker">${s.wK}</span><h1>${s.gAll}</h1><p>${s.gAllD}</p></header>
    <ol class="gtl">${years.map(y=>`<li><h2 class="num">${y||'—'}</h2><ul>${all.filter(a=>a.y===y).map(a=>`<li><a href="${x.href('world/'+a.c.toLowerCase())}">${x.flag(a.c,'sm')}<span class="gc">${esc(x.cname(a.c))}</span><b>${esc(a.t)}</b>${a.impact?`<span>${esc(a.impact)}</span>`:''}</a></li>`).join('')}</ul></li>`).join('')}</ol></div>`;
  return true;
}
function countryPage(main, c){
  const x=X(), s=t(), d=CO[c], p=P[c], tl=timelineFor(c);
  const near=p?Object.keys(P).filter(k=>k!==c&&CO[k]&&CO[k][4]===d[4]).slice(0,6):[];
  main.innerHTML=`<div class="wrap w7 cp">
    <a class="crumb" href="${x.href('world')}">${s.backWorld}</a>
    <header class="chead"><div class="cflag">${x.flag(c,'lg')}</div><div><span class="kicker">${s.region[d[4]]||''}</span><h1>${esc(x.cname(c))}</h1>
      <p class="cnums">${d[2]!=null?`<span><b class="num">${d[2].toFixed(4)}</b>${s.egdi}</span><span><b class="num">#${d[3]}</b>${s.rank} · 193</span>`:''}<span><b class="num">${tl.length}</b>${s.line}</span></p>
      <p class="std">${p?esc(L(p,'summary')):s.noProfile}</p></div></header>
    ${tl.length?`<section class="stsec"><div class="sh"><h2>${s.line}</h2><span class="srcl">${s.items(tl.length)}</span></div><ol class="tline">${tl.map(tlItem).join('')}<li class="tl now"><time>${s.nowY}</time><div></div></li></ol></section>`:''}
    ${p&&p.bodies&&p.bodies.length?`<section class="stsec"><h2>${s.bodies}</h2><ul class="bodies">${p.bodies.map(b=>`<li>${esc(L(b,'n'))}</li>`).join('')}</ul></section>`:''}
    ${near.length?`<section class="stsec"><h2>${s.nearby}</h2><ul class="clist row">${near.map(k=>`<li><a href="${x.href('world/'+k.toLowerCase())}">${x.flag(k,'sm')}<b>${esc(x.cname(k))}</b></a></li>`).join('')}</ul></section>`:''}
  </div>`;
  document.title=x.cname(c)+' | CX Knowledge'; return true;
}
/* الكرة */
function globeBase(host, opts){
  const o=Object.assign({size:0,interactive:true,auto:true},opts||{});
  const cv=document.createElement('canvas'); host.prepend(cv); const ctx=cv.getContext('2d');
  let W=0,H=0,DPR=1, feats=null, rot=[-45,-18], vel=0.09, dragging=false, last=null, hover=null, raf=0, dead=false, idle=0;
  const proj=d3.geoOrthographic().clipAngle(90), path=d3.geoPath(proj,ctx), grat=d3.geoGraticule10();
  const codes=new Set(Object.keys(P));
  function resize(){ const r=host.getBoundingClientRect(); W=Math.round(r.width); H=Math.round(r.height||r.width); DPR=Math.min(2,devicePixelRatio||1); cv.width=W*DPR; cv.height=H*DPR; cv.style.width=W+'px'; cv.style.height=H+'px'; const R=Math.min(W,H)/2-6; proj.translate([W/2,H/2]).scale(R); }
  resize(); const ro=new ResizeObserver(resize); ro.observe(host);
  const col=()=>{ const cs=getComputedStyle(document.documentElement); return {ocean:cs.getPropertyValue('--g-ocean').trim()||'#0f1a2e', land:cs.getPropertyValue('--g-land').trim()||'#2a3450', hi:cs.getPropertyValue('--accent').trim()||'#ff6b3d', line:cs.getPropertyValue('--g-line').trim()||'rgba(255,255,255,.08)', hov:cs.getPropertyValue('--fg').trim()||'#fff'}; };
  function draw(){ if(dead) return; raf=requestAnimationFrame(draw); if(!feats) return; if(!dragging&&o.auto){ idle++; if(idle>90) rot[0]+=vel; } proj.rotate(rot);
    const c=col(); ctx.setTransform(DPR,0,0,DPR,0,0); ctx.clearRect(0,0,W,H);
    ctx.beginPath(); path({type:'Sphere'}); ctx.fillStyle=c.ocean; ctx.fill();
    ctx.beginPath(); path(grat); ctx.strokeStyle=c.line; ctx.lineWidth=0.6; ctx.stroke();
    for(const f of feats){ const a2=f.properties&&f.properties.a2; ctx.beginPath(); path(f); ctx.fillStyle=a2===hover?c.hov:codes.has(a2)?c.hi:c.land; ctx.globalAlpha=codes.has(a2)||a2===hover?0.95:0.75; ctx.fill(); ctx.globalAlpha=1; }
    ctx.beginPath(); path({type:'Sphere'}); ctx.strokeStyle=c.line; ctx.lineWidth=1.2; ctx.stroke();
    const g=ctx.createRadialGradient(W*0.38,H*0.36,W*0.05,W/2,H/2,Math.min(W,H)/2); g.addColorStop(0,'rgba(255,255,255,.10)'); g.addColorStop(0.7,'rgba(255,255,255,0)'); g.addColorStop(1,'rgba(0,0,0,.35)'); ctx.beginPath(); path({type:'Sphere'}); ctx.fillStyle=g; ctx.fill(); }
  loadWorld().then(w=>{ feats=w.features; }).catch(()=>{});
  raf=requestAnimationFrame(draw);
  if(o.interactive){
    const tip=$('.gtip',host);
    const findAt=(cx,cy)=>{ const ll=proj.invert([cx,cy]); if(!ll||!feats) return null; for(const f of feats){ if(f.properties&&f.properties.a2&&d3.geoContains(f,ll)) return f.properties.a2; } return null; };
    host.addEventListener('pointerdown',e=>{ dragging=true; last=[e.clientX,e.clientY]; host.setPointerCapture(e.pointerId); host.classList.add('drag'); });
    host.addEventListener('pointermove',e=>{ idle=0; if(dragging&&last){ const k=75/proj.scale(); rot[0]+=(e.clientX-last[0])*k; rot[1]=Math.max(-70,Math.min(70,rot[1]-(e.clientY-last[1])*k)); last=[e.clientX,e.clientY]; return; }
      const r=host.getBoundingClientRect(); const a2=findAt(e.clientX-r.left,e.clientY-r.top); hover=a2; host.style.cursor=a2?'pointer':'grab'; if(tip){ if(a2&&CO[a2]){ const x=X(); tip.innerHTML=`<b>${esc(x.cname(a2))}</b>${CO[a2][3]?`<span class="num">#${CO[a2][3]}</span>`:''}${codes.has(a2)?`<span>${t().gT} →</span>`:''}`; tip.hidden=false; tip.style.left=(e.clientX-r.left+14)+'px'; tip.style.top=(e.clientY-r.top+14)+'px'; } else tip.hidden=true; } });
    const end=e=>{ if(!dragging) return; dragging=false; host.classList.remove('drag'); const moved=last&&Math.hypot(e.clientX-last[0],e.clientY-last[1])>4; if(!moved){ const r=host.getBoundingClientRect(); const a2=findAt(e.clientX-r.left,e.clientY-r.top); if(a2&&CO[a2]) location.hash=X().href('world/'+a2.toLowerCase()); } };
    host.addEventListener('pointerup',end); host.addEventListener('pointercancel',()=>{dragging=false;host.classList.remove('drag');}); host.addEventListener('pointerleave',()=>{ hover=null; if(tip) tip.hidden=true; });
  }
  return { destroy(){ dead=true; cancelAnimationFrame(raf); ro.disconnect(); } };
}
let globeInst=null;
function bigGlobe(host){ if(globeInst) globeInst.destroy(); globeInst=globeBase(host,{interactive:true,auto:true}); }
function miniGlobe(host){ if(globeInst) globeInst.destroy(); globeInst=globeBase(host,{interactive:false,auto:!reduced()}); host.addEventListener('click',()=>location.hash=X().href('world')); }
function leaveAll(){ leave(); if(globeInst){ globeInst.destroy(); globeInst=null; } }

window.CXK_V7={ home, stage, workshop, library, world, leave:leaveAll, stageStrip, stageHref:id=>{ const s=ST.list.find(z=>z.id===id); return s?stageHref(s):'#/'; } };
})();
