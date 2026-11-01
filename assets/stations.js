/* دورة العمل: المحطات الأربع (افهم، صمّم، قِس، حسّن) ومحطة العالم، وصفحة كل محطة */
(function(){
"use strict";
const $ = (s,el=document)=>el.querySelector(s);
const esc = s => String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

const ST = [
 { id:"understand", n:1, t:"افهم العميل", t_en:"Understand the customer", s:"افهم", s_en:"Understand",
   q:"ماذا يحتاج عميلك، وأين يتعثر اليوم؟", q_en:"What does your customer need, and where do they get stuck today?",
   d:"قبل أي تصميم: اسمع العميل بالاستبيان والملاحظات والمقابلات واختبارات الاستخدام، واعرف أنماط التعثر المتكررة في الخدمات.",
   d_en:"Before any design: listen to customers through surveys, feedback, interviews and usability tests, and learn the recurring patterns where services break.",
   tracks:["listen"], tools:["voc","survey"], refs:["patterns","encyclopedia"],
   arts:["what-is-cx","research-methods","personas","jtbd","voc-program","complaints","moments-of-truth","emotion-peak-end"] },
 { id:"design", n:2, t:"صمّم الرحلة", t_en:"Design the journey", s:"صمّم", s_en:"Design",
   q:"كيف تبدو الرحلة اليوم، وكيف يجب أن تكون؟", q_en:"What does the journey look like today, and what should it become?",
   d:"ارسم الرحلة الحالية بالأدلة، واكشف ما وراءها بمخطط الخدمة، وقيّمها بنموذج «وُصول»، ثم صمّم الرحلة المستهدفة.",
   d_en:"Map the current journey with evidence, see what sits behind it with a service blueprint, assess it with the Wusool model, then design the target journey.",
   tracks:["design"], tools:["tool","assess","sim","msg"], refs:["model","approaches","method","principles"],
   arts:["customer-journey","journey-mapping","service-blueprint","service-design","cx-vs-ux","plain-language","accessibility","omnichannel","self-service","proactive-life-events"] },
 { id:"measure", n:3, t:"قِس التجربة", t_en:"Measure the experience", s:"قِس", s_en:"Measure",
   q:"كيف تعرف أن الرحلة تحسّنت فعلاً؟", q_en:"How do you know the journey has really improved?",
   d:"احسب المؤشرات من بياناتك، واعرف متى يكون التغير حقيقياً، وابنِ شجرة مؤشرات يملك كل فرع منها فريق محدد.",
   d_en:"Calculate metrics from your data, know when a change is real, and build a metric tree where each branch has an owner.",
   tracks:["measure"], tools:["calc","maturity"], refs:["metrics","frameworks","standards"],
   arts:["customer-effort","metrics-system"] },
 { id:"improve", n:4, t:"حسّن ونفّذ", t_en:"Improve and deliver", s:"حسّن", s_en:"Improve",
   q:"بماذا تبدأ، وكيف تقنع الإدارة؟", q_en:"Where do you start, and how do you win leadership support?",
   d:"رتّب الأولويات بالأرقام، وعالج الإخفاق، وأغلق الحلقة مع العميل، وتعلّم من تجارب جهات حققت نتائج موثقة.",
   d_en:"Rank priorities with numbers, recover from failure, close the loop with customers, and learn from organisations with documented results.",
   tracks:["improve"], tools:["prio"], refs:["cases","library","path","kit"],
   arts:["service-recovery","closing-the-loop","cx-roi","cx-strategy","governance","employee-experience","ai-in-cx","contact-centre","gov-cx"] }
];
const WORLD = { id:"world", t:"العالم", t_en:"The world", s:"العالم", s_en:"World",
  q:"ماذا تفعل الدول والجهات في تجربة العميل؟", q_en:"What are countries and organisations doing in customer experience?",
  d:"الدول ومؤشراتها، والمبادرات بنتائجها، والمؤشرات الدولية، والأخبار المحدثة، ومكتبة الكتب والبودكاست.",
  d_en:"Countries and their scores, initiatives and their results, international indices, up-to-date news, and a library of books and podcasts." };
const T = {
 ar:{ lessons:"الدروس العملية", tools:"الأدوات", refs:"المراجع", arts:"مقالات من الموسوعة", cases:"تجارب من الواقع", all:"الكل", allLessons:"كل الدروس", allTools:"كل الأدوات", allArts:"الموسوعة كاملة", allCases:"كل التجارب",
   min:n=>`${n} دقيقة`, next:"المحطة التالية", prev:"المحطة السابقة", station:n=>`المحطة ${n}`, cycle:"دورة العمل", world:"العالم",
   wl:{countries:["الدول","193 دولة بدرجاتها في مؤشر الأمم المتحدة للحكومة الإلكترونية، وملفات تفصيلية"],initiatives:["المبادرات","ما فعلته الحكومات لتحسين تجربة المستفيد، ونتائجه بالأرقام"],indices:["المؤشرات الدولية","أحدث قراءة لمؤشرات الرضا والحكومة الرقمية وطريقة حساب كل منها"],news:["الأخبار","عناوين تجربة العميل من مئات المصادر، تُحدَّث كل 15 دقيقة تقريباً"],analysis:["التحليلات","أخبار ودراسات يقرؤها فريق التحرير من مصدرها ويلخصها بأرقامها"],library:["المكتبة","كتب وبرامج صوتية مختارة في تجربة العميل والخدمة"],sources:["المصادر","المصادر التي نجمع منها الأخبار وكيف نصنفها"]} },
 en:{ lessons:"Practical lessons", tools:"Tools", refs:"References", arts:"Encyclopedia articles", cases:"From practice", all:"All", allLessons:"All lessons", allTools:"All tools", allArts:"Full encyclopedia", allCases:"All cases",
   min:n=>`${n} min`, next:"Next station", prev:"Previous station", station:n=>`Station ${n}`, cycle:"The work cycle", world:"World",
   wl:{countries:["Countries","193 countries with their UN e-government scores, plus detailed profiles"],initiatives:["Initiatives","What governments did to improve the service experience, with results"],indices:["International indices","The latest reading of satisfaction and digital-government indices, and how each is calculated"],news:["News","Customer experience headlines from hundreds of sources, refreshed about every 15 minutes"],analysis:["Analysis","News and studies our editors read at source and summarise with their numbers"],library:["Library","Selected books and podcasts on customer experience and service"],sources:["Sources","Where the news comes from and how it's classified"]} }
};
const trackStation = {listen:"understand", design:"design", measure:"measure", improve:"improve"};
const WORLD_ROUTES = ['world','countries','atlas','country','initiatives','indices','news','live','analysis','item','sources','library'];

function stationOf(a,b,c){
  if(!a) return '';
  if(ST.some(s=>s.id===a)) return a;
  if(WORLD_ROUTES.includes(a)) return 'world';
  if(a==='tools'||a==='lab'||a==='journey'){ const s=ST.find(x=>x.tools.includes(b||'tool')); return s?s.id:'design'; }
  if(a==='learn'){
    if(b==='lessons'){ const L=(window.CXK_LESSONS||{items:[]}).items.find(x=>x.id===c); return L?trackStation[L.tr]:''; }
    if(b==='encyclopedia' && c){ const s=ST.find(x=>x.arts.includes(c)); return s?s.id:''; }
    if(b==='books') return 'world';
    const s=ST.find(x=>x.refs.includes(b)); return s?s.id:'';
  }
  return '';
}
function counts(s){
  const LS=(window.CXK_LESSONS||{items:[]}).items.filter(x=>s.tracks.includes(x.tr));
  return { lessons:LS.length, tools:s.tools.length, arts:s.arts.length, mins:LS.reduce((n,x)=>n+x.min,0) };
}
function rail(X, cur){
  const en=X.LANG==='en';
  return `<ol class="srail" aria-label="${T[X.LANG].cycle}">${ST.map(s=>`<li${s.id===cur?' class="on"':''}><a href="${X.href(s.id)}"${s.id===cur?' aria-current="page"':''}><span class="sn">${s.n}</span><span class="st">${esc(en?s.s_en:s.s)}</span></a></li>`).join('')}<li class="w${cur==='world'?' on':''}"><a href="${X.href('world')}"${cur==='world'?' aria-current="page"':''}><span class="sn"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c-3 3.5-3 14.5 0 18M12 3c3 3.5 3 14.5 0 18"/></svg></span><span class="st">${T[X.LANG].world}</span></a></li></ol>`;
}
function lessonCard(x, X){
  const en=X.LANG==='en', t=T[X.LANG], lv=(window.CXK_LESSONS.levels||{})[x.lvl]||['',''];
  return `<a class="lcard" href="${X.href('learn/lessons/'+x.id)}"><b>${esc(en?x.t_en:x.t)}</b><span class="lsum">${esc(en?x.sum_en:x.sum)}</span><span class="lmeta"><span>${lv[en?1:0]}</span><span>${t.min(x.min)}</span>${x.calc?`<span class="lhas">${en?'Calculator':'حاسبة'}</span>`:''}</span></a>`;
}
function stationPage(main, X, id){
  const en=X.LANG==='en', t=T[X.LANG], C=window.CXK_Catalog?window.CXK_Catalog(X.LANG):{items:{}}, icon=window.CXK_Icon||(()=>'');
  if(id==='world') return worldPage(main, X);
  const i=ST.findIndex(s=>s.id===id), s=ST[i]; if(!s) return false;
  const LS=(window.CXK_LESSONS||{items:[]}).items.filter(x=>s.tracks.includes(x.tr));
  const A=((window.CXK_REF||{}).articles||[]), arts=s.arts.map(a=>A.find(x=>x.id===a)).filter(Boolean);
  const CS=window.CXK_Cases, cc=window.CXK_CaseCard;
  const cases = (id==='improve' && CS && cc) ? CS.items.slice(0,6) : [];
  const next=ST[i+1], prev=ST[i-1];
  const card=k=>{ const it=C.items[k]; if(!it) return ''; const isL=['model','approaches','method','principles','patterns','encyclopedia','metrics','frameworks','standards','cases','library','path','kit','lessons'].includes(k); return `<a class="tcard" href="${X.href((isL?'learn/':'tools/')+k)}"><span class="ti">${icon(it[3])}</span><span><b>${esc(it[0])}</b><span>${esc(it[1])}</span></span></a>`; };
  main.innerHTML=`<div class="wrap">
    ${rail(X,id)}
    <header class="shead"><span class="kicker">${t.station(s.n)}</span><h1>${esc(en?s.t_en:s.t)}</h1><p class="sq">${esc(en?s.q_en:s.q)}</p><p>${esc(en?s.d_en:s.d)}</p></header>
    ${LS.length?`<section class="ssec"><div class="sh"><h2>${t.lessons}</h2><a class="more" href="${X.href('learn/lessons')}">${t.allLessons}</a></div><div class="lgrid">${LS.map(x=>lessonCard(x,X)).join('')}</div></section>`:''}
    <section class="ssec"><div class="sh"><h2>${t.tools}</h2><a class="more" href="${X.href('tools')}">${t.allTools}</a></div><div class="tcards">${s.tools.map(card).join('')}</div></section>
    <section class="ssec"><div class="sh"><h2>${t.refs}</h2></div><div class="tcards">${s.refs.map(card).join('')}</div></section>
    ${arts.length?`<section class="ssec"><div class="sh"><h2>${t.arts}</h2><a class="more" href="${X.href('learn/encyclopedia')}">${t.allArts}</a></div><ul class="sarts">${arts.map(a=>`<li><a href="${X.href('learn/encyclopedia/'+a.id)}"><b>${esc(en?a.t_en:a.t)}</b><span>${esc(en?a.s_en:a.s)}</span></a></li>`).join('')}</ul></section>`:''}
    ${cases.length?`<section class="ssec"><div class="sh"><h2>${t.cases}</h2><a class="more" href="${X.href('learn/cases')}">${t.allCases}</a></div><div class="cases">${cases.map(c=>cc(c,X)).join('')}</div></section>`:''}
    <nav class="snext">${prev?`<a href="${X.href(prev.id)}"><small>${t.prev}</small><span>${prev.n}. ${esc(en?prev.t_en:prev.t)}</span></a>`:'<span></span>'}${next?`<a class="nx" href="${X.href(next.id)}"><small>${t.next}</small><span>${next.n}. ${esc(en?next.t_en:next.t)}</span></a>`:`<a class="nx" href="${X.href('world')}"><small>${t.next}</small><span>${t.world}</span></a>`}</nav>
  </div>`;
  document.title=(en?s.t_en:s.t)+' | CX Knowledge';
  return true;
}
function worldPage(main, X){
  const en=X.LANG==='en', t=T[X.LANG], P=window.CXK_PROFILES||{}, IX=window.CXK_INDICES||[], N=(window.CXK_NEWS||{items:[]}).items;
  const inits=Object.values(P).reduce((n,p)=>n+((p.initiatives||[]).length),0);
  const nums={countries:'193',initiatives:String(inits),indices:String(IX.length),news:en?'15 min':'15 د',analysis:String(N.length),library:String((((window.CXK_SHELF||{}).books)||[]).length),sources:String((window.CXK_SOURCES||[]).length)};
  const route={countries:'countries',initiatives:'initiatives',indices:'indices',news:'news',analysis:'analysis',library:'library',sources:'sources'};
  main.innerHTML=`<div class="wrap">
    ${rail(X,'world')}
    <header class="shead"><span class="kicker">${t.world}</span><h1>${esc(en?WORLD.t_en:WORLD.t)}</h1><p class="sq">${esc(en?WORLD.q_en:WORLD.q)}</p><p>${esc(en?WORLD.d_en:WORLD.d)}</p></header>
    <div class="wgrid">${Object.keys(route).map(k=>`<a class="wcard" href="${X.href(route[k])}"><span class="wn">${nums[k]}</span><b>${t.wl[k][0]}</b><span>${t.wl[k][1]}</span></a>`).join('')}</div>
  </div>`;
  document.title=(en?WORLD.t_en:WORLD.t)+' | CX Knowledge';
  return true;
}
window.CXK_STATIONS = { list:ST, world:WORLD, stationOf, counts, rail, page:stationPage, lessonCard };
})();
