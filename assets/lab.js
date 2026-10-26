/* مختبر رحلة العميل — ارسم واكشف نقاط الانكسار، عِش الرحلة، الحاسبات، تقييم النضج، المنهجية، المكتبة، القوالب */
(function(){
"use strict";
const J = window.CXK_JOURNEY, LAB = window.CXK_LAB;
const $ = (s,el=document)=>el.querySelector(s), $$=(s,el=document)=>[...el.querySelectorAll(s)];
const esc = s => String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const KEY='cxk-journey-v2', MKEY='cxk-maturity-v1', COLW=220, LANEW=170;
const T = {
ar:{ tabsNote:"", samples:{bank:"بنك: فتح حساب رقمي",flight:"طيران: إلغاء وإعادة حجز",telecom:"اتصالات: نقل رقم",health:"صحة: موعد ومراجعة",ecommerce:"تجارة إلكترونية: إرجاع",passport:"حكومي عام: تجديد جواز",blank:"رحلة فارغة"},
  start:"ابدأ من نموذج…", addStage:"+ مرحلة", exportPng:"تصدير صورة", saveFile:"حفظ ملف", openFile:"فتح ملف", print:"طباعة", shareLink:"رابط للمشاركة", linkCopied:"نُسخ رابط الرحلة",
  name:"اسم الرحلة", persona:"المستفيد (الشخصية الافتراضية)", stages:"المراحل", moveR:"نقل للأمام", moveL:"نقل للخلف", del:"حذف المرحلة", newStage:n=>`المرحلة ${n}`,
  lanes:{goal:"هدف المستفيد",act:"ما يفعله المستفيد",tp:"نقاط التواصل والقنوات",sys:"الأنظمة والجهات خلف الواجهة",t:"المدة (بالساعات، مع الانتظار)",h:"عدد التسليمات بين الجهات",r:"مرات تكرار البيانات",ch:"تغيير القناة",emo:"المشاعر",pain:"نقاط الألم",opp:"الفرص",kpi:"المؤشرات"},
  chYes:"نعم، ينتقل لقناة أخرى", emo:[[2,"سعيد جداً"],[1,"راضٍ"],[0,"محايد"],[-1,"منزعج"],[-2,"محبط جداً"]],
  note:"تُحفظ الرحلة تلقائياً في متصفحك فقط. «رابط للمشاركة» يضع الرحلة كاملة داخل الرابط دون رفعها لأي خادم.",
  anTitle:"كاشف نقاط الانكسار", anSub:"يحسب المختبر مؤشر الاحتكاك لكل مرحلة من الزمن والتسليمات وتكرار البيانات وتغيير القناة والمشاعر، ويحدد المراحل التي ينكسر فيها مسار المستفيد.",
  index:"مؤشر الاحتكاك", total:"الزمن الكلي", handoffs:"التسليمات", repeats:"تكرار البيانات", switches:"تغيير القناة", bpCount:"نقاط الانكسار",
  bands:[[30,"رحلة سلسة"],[50,"رحلة مقبولة"],[70,"رحلة متعثرة"],[101,"رحلة منكسرة"]],
  perStage:"الاحتكاك في كل مرحلة", noBp:"لا توجد نقاط انكسار واضحة. راجع المراحل الأعلى احتكاكاً لتحسينها أكثر.",
  why:{h:n=>`ينتقل الطلب بين ${n} ${n>1?'جهات':'جهة'}`,r:n=>`يكرر المستفيد بياناته ${n} ${n>1?'مرات':'مرة'}`,ch:()=>"ينتقل المستفيد إلى قناة أخرى",t:v=>`يستغرق ${v}`,emo:()=>"انخفاض حاد في مشاعر المستفيد"},
  fix:{h:"عيّن مالكاً واحداً للحالة، وانقل سجلها كاملاً مع الطلب.",r:"طبّق مبدأ «مرة واحدة فقط»: اجلب البيانات المتاحة آلياً واملأ النماذج مسبقاً.",ch:"أكمل الرحلة في القناة نفسها، أو انقل السياق معها إن لزم التحويل.",t:"أظهر الحالة والزمن المتوقع، وأرسل إشعاراً استباقياً عند كل تغيير.",emo:"صمّم لحظة الحقيقة: رسالة واضحة وخيار حل فوري في هذه المرحلة."},
  fixT:"المعالجة المقترحة", hrs:v=>v<1?`${Math.round(v*60)} دقيقة`:v<48?`${+v.toFixed(1)} ساعة`:`${+(v/24).toFixed(1)} يوم`,
  simStep:n=>`الخطوة ${n}`, simTime:"الوقت المستهلك", simMood:"شعورك", simTrail:"مسارك", simEnd:"انتهت الرحلة", simBps:"نقاط الانكسار التي مررت بها", simIdeal:"كيف كان ينبغي أن تُصمَّم؟", simAgain:"أعد التجربة", simNoBp:"لم تمر بنقطة انكسار مسجلة.",
  calc:{nps:"صافي نقاط الترويج (NPS)",npsD:"أدخل عدد المروّجين (9–10) والمحايدين (7–8) والمنتقدين (0–6).",pro:"المروّجون",pas:"المحايدون",det:"المنتقدون",
    csat:"رضا العميل (CSAT)",csatD:"نسبة من أجابوا 4 أو 5 على مقياس من 5.",sat:"الراضون (4–5)",tot:"إجمالي الإجابات",
    ces:"جهد العميل (CES)",cesD:"عدد الإجابات لكل درجة على مقياس من 1 (صعب جداً) إلى 7 (سهل جداً).",cesOut:(m,e)=>`متوسط من 7 · ${e}% وجدوها سهلة (5–7)`,
    ss:"حجم العينة المطلوب",ssD:"عدد الاستجابات اللازمة لاستبيان رضا بهامش خطأ ومستوى ثقة محددين.",pop:"حجم المجتمع",conf:"مستوى الثقة",moe:"هامش الخطأ %",ssOut:"استجابة مطلوبة",
    roi:"قيمة الاحتفاظ بالعملاء",roiD:"الإيراد السنوي الذي يحفظه خفض نسبة التسرب.",cust:"عدد العملاء",arpu:"الإيراد السنوي لكل عميل",churn:"نسبة التسرب الحالية %",red:"الخفض المستهدف (نقاط)",roiOut:"إيراد سنوي محفوظ",
    rc:"وفورات تكرار التواصل",rcD:"التكلفة التي توفرها معالجة أسباب التواصل المتكرر.",cont:"التواصلات شهرياً",rep:"نسبة التكرار %",cost:"تكلفة التواصل الواحد",cut:"الخفض المستهدف %",rcOut:"وفورات سنوية",
    npsOut:(p,pa,d)=>`مروّجون ${p}% · محايدون ${pa}% · منتقدون ${d}%`},
  matIntro:"أجب عن 12 عبارة بصدق عن جهتك. تُحفظ الإجابات في متصفحك فقط.", matLevel:"المستوى", matRecs:"أولويات التحسين", matDone:n=>`أجبت عن ${n} من 12`,
  intro:[["ارسم واكشف","ارسم رحلة واحصل على مؤشر الاحتكاك ونقاط الانكسار والمعالجة.","tool"],["عِش الرحلة","كن العميل في سيناريو حقيقي واتخذ قراراتك ثم شاهد أين انكسرت.","sim"],["قِس وقيّم","حاسبات المؤشرات وحجم العينة والعائد، وتقييم نضج جهتك.","calc"]],
  templates:"قوالب جاهزة", templatesD:"ملفات CSV تفتح في Excel وGoogle Sheets.", download:"تنزيل", glossary:"المصطلحات", term:"المصطلح", termEn:"بالإنجليزية", def:"التعريف", searchTerm:"ابحث عن مصطلح", noTerm:"لا يوجد مصطلح مطابق.",
  kpiTitle:"مؤشرات قياس الرحلة", kpiSub:"اجمع بين مؤشر لرضا المستفيد ومؤشر للجهد ومؤشر للزمن ومؤشر للحل.", loaded:"تم تحميل النموذج", opened:"تم فتح الرحلة", badFile:"الملف ليس رحلة صالحة من هذه الأداة", exported:"تم تصدير الصورة", exportFail:"تعذّر تصدير الصورة؛ جرّب الطباعة", exporting:"جارٍ التصدير…", journey:"رحلة العميل" },
en:{ samples:{bank:"Banking: digital account",flight:"Airline: cancellation & rebooking",telecom:"Telecom: number porting",health:"Health: appointment & visit",ecommerce:"E-commerce: return",passport:"Generic government: passport renewal",blank:"Blank journey"},
  start:"Start from an example…", addStage:"+ Stage", exportPng:"Export image", saveFile:"Save file", openFile:"Open file", print:"Print", shareLink:"Share link", linkCopied:"Journey link copied",
  name:"Journey name", persona:"Customer (persona)", stages:"Stages", moveR:"Move earlier", moveL:"Move later", del:"Delete stage", newStage:n=>`Stage ${n}`,
  lanes:{goal:"Customer goal",act:"What the customer does",tp:"Touchpoints & channels",sys:"Backstage systems & teams",t:"Duration (hours, incl. waiting)",h:"Handoffs between teams",r:"Times data is repeated",ch:"Channel switch",emo:"Emotion",pain:"Pain points",opp:"Opportunities",kpi:"KPIs"},
  chYes:"Yes, moves to another channel", emo:[[2,"Delighted"],[1,"Satisfied"],[0,"Neutral"],[-1,"Annoyed"],[-2,"Frustrated"]],
  note:"Your journey is saved automatically in this browser only. \"Share link\" puts the whole journey inside the link without uploading it anywhere.",
  anTitle:"Breakpoint detector", anSub:"The lab calculates a friction index for each stage from time, handoffs, repeated data, channel switches and emotion, and flags the stages where the customer's path breaks.",
  index:"Friction index", total:"Total time", handoffs:"Handoffs", repeats:"Repeated data", switches:"Channel switches", bpCount:"Breakpoints",
  bands:[[30,"Smooth journey"],[50,"Acceptable journey"],[70,"Struggling journey"],[101,"Broken journey"]],
  perStage:"Friction per stage", noBp:"No clear breakpoints. Review the highest-friction stages to improve further.",
  why:{h:n=>`The request moves between ${n} team${n>1?'s':''}`,r:n=>`The customer repeats data ${n} time${n>1?'s':''}`,ch:()=>"The customer has to switch channel",t:v=>`Takes ${v}`,emo:()=>"Sharp drop in customer emotion"},
  fix:{h:"Assign one case owner and move the full case record with the request.",r:"Apply once-only: pull data you already hold and pre-fill forms.",ch:"Finish the journey in the same channel, or carry the context across.",t:"Show status and expected time, and notify proactively at each change.",emo:"Design the moment of truth: a clear message and an instant fix option at this stage."},
  fixT:"Suggested fix", hrs:v=>v<1?`${Math.round(v*60)} min`:v<48?`${+v.toFixed(1)} h`:`${+(v/24).toFixed(1)} days`,
  simStep:n=>`STEP ${n}`, simTime:"Time spent", simMood:"Your mood", simTrail:"Your path", simEnd:"Journey over", simBps:"Breakpoints you hit", simIdeal:"How should it have been designed?", simAgain:"Play again", simNoBp:"You didn't hit a recorded breakpoint.",
  calc:{nps:"Net Promoter Score (NPS)",npsD:"Enter the number of promoters (9–10), passives (7–8) and detractors (0–6).",pro:"Promoters",pas:"Passives",det:"Detractors",
    csat:"Customer satisfaction (CSAT)",csatD:"Share who answered 4 or 5 on a 5-point scale.",sat:"Satisfied (4–5)",tot:"Total responses",
    ces:"Customer effort (CES)",cesD:"Responses per score on a scale from 1 (very hard) to 7 (very easy).",cesOut:(m,e)=>`average out of 7 · ${e}% found it easy (5–7)`,
    ss:"Required sample size",ssD:"Responses needed for a satisfaction survey at a given margin of error and confidence.",pop:"Population",conf:"Confidence",moe:"Margin of error %",ssOut:"responses needed",
    roi:"Value of retention",roiD:"Annual revenue protected by lowering churn.",cust:"Customers",arpu:"Annual revenue per customer",churn:"Current churn %",red:"Target reduction (points)",roiOut:"annual revenue protected",
    rc:"Repeat-contact savings",rcD:"Cost saved by fixing the causes of repeat contact.",cont:"Contacts per month",rep:"Repeat rate %",cost:"Cost per contact",cut:"Target reduction %",rcOut:"annual savings",
    npsOut:(p,pa,d)=>`Promoters ${p}% · Passives ${pa}% · Detractors ${d}%`},
  matIntro:"Answer 12 statements honestly about your organisation. Answers stay in your browser.", matLevel:"Level", matRecs:"Improvement priorities", matDone:n=>`${n} of 12 answered`,
  intro:[["Map & detect","Map a journey and get its friction index, breakpoints and fixes.","tool"],["Live the journey","Be the customer in a real scenario, make choices, then see where it broke.","sim"],["Measure & assess","Metric, sample size and ROI calculators, plus a maturity check.","calc"]],
  templates:"Ready templates", templatesD:"CSV files that open in Excel and Google Sheets.", download:"Download", glossary:"Glossary", term:"Term (Arabic)", termEn:"English", def:"Definition", searchTerm:"Search terms", noTerm:"No matching term.",
  kpiTitle:"Journey KPIs", kpiSub:"Combine a satisfaction metric, an effort metric, a time metric and a resolution metric.", loaded:"Example loaded", opened:"Journey opened", badFile:"That file isn't a journey from this tool", exported:"Image exported", exportFail:"Couldn't export the image; try printing", exporting:"Exporting…", journey:"Customer journey" }
};

const TEXT_LANES=['goal','act','tp','sys'], AFTER_LANES=['pain','opp','kpi'];
function sampleState(k,lang){ const s=J.samples[k], src=s[lang]||s.ar, nums=s.ar.nums||[]; return { name:src.name, persona:src.persona||'', stages:src.stages.map((x,i)=>{ const n=nums[i]||[0,0,0,0,0]; return {n:x.n||'',goal:x.goal||'',act:x.act||'',tp:x.tp||'',sys:x.sys||'',pain:x.pain||'',opp:x.opp||'',kpi:x.kpi||'',t:n[0],h:n[1],r:n[2],ch:n[3],emo:n[4]}; }) }; }
function b64e(o){ const bytes=new TextEncoder().encode(JSON.stringify(o)); let s=''; bytes.forEach(b=>s+=String.fromCharCode(b)); return btoa(s).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,''); }
function b64d(s){ s=s.replace(/-/g,'+').replace(/_/g,'/'); while(s.length%4) s+='='; const bin=atob(s); return JSON.parse(new TextDecoder().decode(Uint8Array.from(bin,c=>c.charCodeAt(0)))); }
function friction(s){ const t=Math.max(0,+s.t||0), h=Math.max(0,+s.h||0), r=Math.max(0,+s.r||0), ch=+s.ch?1:0, e=+s.emo||0;
  const parts={t:Math.min(35,35*Math.log10(1+t)/Math.log10(241)), h:Math.min(25,h*12), r:Math.min(20,r*10), ch:ch*10, emo:e<0?Math.min(10,-e*5):0};
  const total=Math.round(Math.min(100,Object.values(parts).reduce((a,b)=>a+b,0)));
  return {total, parts, bp: total>=50 || e<=-2}; }
function gauge(v){ const a=Math.PI*(1-v/100), x=75+60*Math.cos(a), y=78-60*Math.sin(a);
  return `<svg class="gauge" viewBox="0 0 150 86" aria-hidden="true" style="direction:ltr"><path d="M15 78a60 60 0 0 1 120 0" fill="none" stroke="var(--surface-3)" stroke-width="12" stroke-linecap="round"/><path d="M15 78a60 60 0 0 1 ${(x-15).toFixed(1)} ${(y-78).toFixed(1)}" fill="none" stroke="${v>=50?'var(--accent)':'var(--fg-2)'}" stroke-width="12" stroke-linecap="round"/><text x="75" y="74" text-anchor="middle" font-size="26" font-weight="600" fill="var(--fg)">${v}</text></svg>`; }

/* ---------- tool ---------- */
function tool(host, X, arg){
  const t=T[X.LANG];
  let st=null;
  if(arg){ try{ st=b64d(arg); if(!Array.isArray(st.stages)) st=null; }catch(e){ st=null; } }
  if(!st){ try{ const s=localStorage.getItem(KEY); if(s){ const j=JSON.parse(s); if(j&&Array.isArray(j.stages)) st=j; } }catch(e){} }
  if(!st) st=sampleState('bank',X.LANG);
  const save=()=>{ try{ localStorage.setItem(KEY,JSON.stringify(st)); }catch(e){} };
  host.innerHTML = `
    <div class="jt-bar">
      <label class="sr" for="jtSample">${t.start}</label>
      <select class="sel" id="jtSample"><option value="">${t.start}</option>${Object.entries(t.samples).map(([k,l])=>`<option value="${k}">${esc(l)}</option>`).join('')}</select>
      <button class="btn sm" type="button" id="jtAdd">${t.addStage}</button><span class="grow"></span>
      <button class="btn sm" type="button" id="jtLink">${t.shareLink}</button>
      <button class="btn sm" type="button" id="jtPng">${t.exportPng}</button>
      <button class="btn sm" type="button" id="jtJson">${t.saveFile}</button>
      <label class="btn sm" for="jtFile" style="cursor:pointer">${t.openFile}</label><input type="file" id="jtFile" accept="application/json,.json" hidden>
      <button class="btn sm" type="button" id="jtPrint">${t.print}</button>
    </div>
    <div class="jt-meta"><label>${t.name}<input id="jtName" type="text" autocomplete="off"></label><label>${t.persona}<input id="jtPersona" type="text" autocomplete="off"></label></div>
    <div class="jt-scroll"><div class="jt" id="jtGrid"></div></div>
    <p class="jt-note">${t.note}</p>
    <section class="fric" id="jtAn"></section>`;
  const grid=$('#jtGrid',host), nameI=$('#jtName',host), perI=$('#jtPersona',host);
  const rtl = X.LANG!=='en';
  function curve(){ const n=st.stages.length, W=n*COLW, H=110, y=v=>H/2 - v*(H/2-16)/2, x=i=>rtl? W-(i*COLW+COLW/2) : i*COLW+COLW/2;
    const pts=st.stages.map((s,i)=>[x(i),y(+s.emo||0)]); let d=''; pts.forEach((p,i)=>{ if(!i){d=`M${p[0]} ${p[1]}`;return;} const q=pts[i-1], mx=(q[0]+p[0])/2; d+=` C${mx} ${q[1]} ${mx} ${p[1]} ${p[0]} ${p[1]}`; });
    let g=`<line x1="0" x2="${W}" y1="${H/2}" y2="${H/2}" stroke="var(--line-3)" stroke-dasharray="4 4"/><path d="${d}" fill="none" stroke="var(--fg-2)" stroke-width="2.5"/>`;
    pts.forEach((p,i)=>{ const v=+st.stages[i].emo||0, f=friction(st.stages[i]); g+=`<circle cx="${p[0]}" cy="${p[1]}" r="${f.bp?9:7}" fill="${v<0?'var(--down)':v>0?'var(--up)':'var(--muted)'}" stroke="${f.bp?'var(--accent)':'var(--surface)'}" stroke-width="${f.bp?3:2}"/>`; });
    return `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" style="direction:ltr;position:absolute;inset:0;width:100%;height:100%" aria-hidden="true">${g}</svg>`; }
  function render(){
    nameI.value=st.name||''; perI.value=st.persona||''; const n=st.stages.length;
    grid.style.gridTemplateColumns=`clamp(104px,28vw,${LANEW}px) repeat(${n}, ${COLW}px)`;
    let h=`<div class="lane">${t.stages}</div>`;
    st.stages.forEach((s,i)=>{ h+=`<div class="cell shead"><input data-i="${i}" data-k="n" value="${esc(s.n)}" aria-label="${t.stages} ${i+1}"><button type="button" data-act="prev" data-i="${i}" aria-label="${t.moveR}" ${i===0?'disabled':''}>${rtl?'›':'‹'}</button><button type="button" data-act="next" data-i="${i}" aria-label="${t.moveL}" ${i===n-1?'disabled':''}>${rtl?'‹':'›'}</button><button type="button" data-act="del" data-i="${i}" aria-label="${t.del}" ${n<=1?'disabled':''}>×</button></div>`; });
    TEXT_LANES.forEach(k=>{ h+=`<div class="lane">${t.lanes[k]}</div>`; st.stages.forEach((s,i)=>{ h+=`<div class="cell"><textarea data-i="${i}" data-k="${k}" aria-label="${t.lanes[k]} — ${esc(s.n)}">${esc(s[k])}</textarea></div>`; }); });
    ['t','h','r'].forEach(k=>{ h+=`<div class="lane num">${t.lanes[k]}</div>`; st.stages.forEach((s,i)=>{ h+=`<div class="cell"><input class="n" type="number" min="0" step="${k==='t'?'0.1':'1'}" data-i="${i}" data-k="${k}" value="${esc(s[k]??0)}" aria-label="${t.lanes[k]} — ${esc(s.n)}"></div>`; }); });
    h+=`<div class="lane num">${t.lanes.ch}</div>`; st.stages.forEach((s,i)=>{ h+=`<div class="cell"><label class="chk"><input type="checkbox" data-i="${i}" data-k="ch" ${+s.ch?'checked':''}> ${t.chYes}</label></div>`; });
    h+=`<div class="lane">${t.lanes.emo}</div><div class="cell" style="grid-column:2 / span ${n};padding:0;width:auto"><div style="position:relative;height:110px" id="jtCurve">${curve()}</div><div style="display:grid;grid-template-columns:repeat(${n},${COLW}px)">${st.stages.map((s,i)=>`<div class="emo"><select data-i="${i}" data-k="emo" aria-label="${t.lanes.emo} — ${esc(s.n)}">${t.emo.map(([v,l])=>`<option value="${v}" ${(+s.emo||0)===v?'selected':''}>${l}</option>`).join('')}</select></div>`).join('')}</div></div>`;
    AFTER_LANES.forEach(k=>{ h+=`<div class="lane">${t.lanes[k]}</div>`; st.stages.forEach((s,i)=>{ h+=`<div class="cell ${k}"><textarea data-i="${i}" data-k="${k}" aria-label="${t.lanes[k]} — ${esc(s.n)}">${esc(s[k])}</textarea></div>`; }); });
    grid.innerHTML=h; analyse();
  }
  function analyse(){
    const F=st.stages.map(friction), mean=F.reduce((a,f)=>a+f.total,0)/(F.length||1), mx=Math.max(0,...F.map(f=>f.total)), idx=Math.round(mean*.6+mx*.4);
    const band=t.bands.find(([lim])=>idx<lim)[1];
    const tot=st.stages.reduce((a,s)=>a+(+s.t||0),0), H=st.stages.reduce((a,s)=>a+(+s.h||0),0), R=st.stages.reduce((a,s)=>a+(+s.r||0),0), CH=st.stages.reduce((a,s)=>a+(+s.ch?1:0),0), B=F.filter(f=>f.bp).length;
    const bps=st.stages.map((s,i)=>({s,f:F[i],i})).filter(x=>x.f.bp).sort((a,b)=>b.f.total-a.f.total);
    $('#jtAn',host).innerHTML = `<div class="sh" style="margin-bottom:0"><h2>${t.anTitle}</h2><p>${t.anSub}</p></div>
      <div class="fhead">${gauge(idx)}<div style="display:grid;gap:10px"><div class="kicker">${t.index}</div><h3 style="font-size:24px">${band}</h3>
        <div class="fsum"><div><b>${t.hrs(tot)}</b><span>${t.total}</span></div><div><b>${H}</b><span>${t.handoffs}</span></div><div><b>${R}</b><span>${t.repeats}</span></div><div><b>${CH}</b><span>${t.switches}</span></div><div><b style="color:var(--accent)">${B}</b><span>${t.bpCount}</span></div></div></div></div>
      <div class="fbars"><h3 style="font:700 16px var(--f-body)">${t.perStage}</h3>${st.stages.map((s,i)=>`<div class="fb${F[i].bp?' bp':''}"><span class="nm">${esc(s.n)}</span><span class="tr2"><i style="width:${F[i].total}%"></i></span><span class="v">${F[i].total}</span></div>`).join('')}</div>
      <div class="bps">${bps.length?bps.map(({s,f})=>{ const why=[], fix=[]; if(+s.h){why.push(t.why.h(+s.h)); fix.push(t.fix.h);} if(+s.r){why.push(t.why.r(+s.r)); fix.push(t.fix.r);} if(+s.ch){why.push(t.why.ch()); fix.push(t.fix.ch);} if((+s.t||0)>=24){why.push(t.why.t(t.hrs(+s.t))); fix.push(t.fix.t);} if((+s.emo||0)<=-2){why.push(t.why.emo()); fix.push(t.fix.emo);}
        return `<article class="bpc"><h4>${esc(s.n)} <small>${t.index} ${f.total}</small></h4>${why.length?`<ul>${why.map(w=>`<li>${esc(w)}</li>`).join('')}</ul>`:''}${s.pain?`<p class="fix">${esc(s.pain)}</p>`:''}<p class="fix"><b>${t.fixT}:</b> ${esc([...new Set(fix)].join(' '))}${s.opp?' '+esc(s.opp):''}</p></article>`; }).join(''):`<p class="okmsg">${t.noBp}</p>`}</div>`;
  }
  grid.addEventListener('input',e=>{ const el=e.target; if(el.dataset.i==null) return; const s=st.stages[+el.dataset.i], k=el.dataset.k;
    s[k] = k==='ch' ? (el.checked?1:0) : (['t','h','r','emo'].includes(k) ? (+el.value||0) : el.value); save();
    if(['t','h','r','ch','emo'].includes(k)){ $('#jtCurve',host).innerHTML=curve(); analyse(); } });
  grid.addEventListener('click',e=>{ const b=e.target.closest('button[data-act]'); if(!b) return; const i=+b.dataset.i, a=b.dataset.act, S=st.stages;
    if(a==='del'&&S.length>1) S.splice(i,1); if(a==='prev'&&i>0) [S[i-1],S[i]]=[S[i],S[i-1]]; if(a==='next'&&i<S.length-1) [S[i+1],S[i]]=[S[i],S[i+1]]; save(); render(); });
  nameI.addEventListener('input',()=>{ st.name=nameI.value; save(); });
  perI.addEventListener('input',()=>{ st.persona=perI.value; save(); });
  $('#jtAdd',host).addEventListener('click',()=>{ st.stages.push({n:t.newStage(st.stages.length+1),goal:'',act:'',tp:'',sys:'',pain:'',opp:'',kpi:'',t:0,h:0,r:0,ch:0,emo:0}); save(); render(); });
  $('#jtSample',host).addEventListener('change',e=>{ const v=e.target.value; if(!v) return; st=sampleState(v,X.LANG); save(); render(); e.target.value=''; X.toast(t.loaded); });
  $('#jtLink',host).addEventListener('click',()=>{ const url=location.origin+location.pathname+X.href('lab/tool/'+b64e(st)); X.copy(url); });
  $('#jtJson',host).addEventListener('click',()=>{ const blob=new Blob([JSON.stringify(st,null,2)],{type:'application/json'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=(st.name||'journey').replace(/[\\/:*?"<>|]/g,'')+'.json'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(a.href),2000); });
  $('#jtFile',host).addEventListener('change',e=>{ const f=e.target.files[0]; if(!f) return; const r=new FileReader(); r.onload=()=>{ try{ const j=JSON.parse(r.result); if(!Array.isArray(j.stages)||!j.stages.length) throw 0; st=j; save(); render(); X.toast(t.opened); }catch(_){ X.toast(t.badFile); } }; r.readAsText(f); e.target.value=''; });
  $('#jtPrint',host).addEventListener('click',()=>window.print());
  $('#jtPng',host).addEventListener('click',async ()=>{
    const btn=$('#jtPng',host); btn.disabled=true; const old=btn.textContent; btn.textContent=t.exporting;
    try{
      if(!window.html2canvas){ await new Promise((ok,no)=>{ const s=document.createElement('script'); s.src='assets/vendor/html2canvas.min.js'; s.onload=ok; s.onerror=no; document.head.appendChild(s); }); }
      const cs=getComputedStyle(document.documentElement), bg=cs.getPropertyValue('--bg').trim(), fg=cs.getPropertyValue('--fg').trim();
      const wrap=document.createElement('div'); wrap.style.cssText=`position:fixed;top:0;left:-99999px;padding:28px;background:${bg};color:${fg};direction:${rtl?'rtl':'ltr'};width:${LANEW+st.stages.length*COLW+60}px`;
      wrap.innerHTML=`<div style="font:700 26px ${cs.getPropertyValue('--f-display')};margin-bottom:4px">${esc(st.name||t.journey)}</div><div style="font:15px ${cs.getPropertyValue('--f-body')};opacity:.7;margin-bottom:18px">${esc(st.persona||'')}</div>`;
      const g=grid.cloneNode(true), srcT=grid.querySelectorAll('textarea');
      g.querySelectorAll('textarea').forEach((x,i)=>{ const d=document.createElement('div'); d.textContent=srcT[i].value; d.style.cssText='font-size:14px;line-height:1.6;padding:6px 8px;white-space:pre-wrap;min-height:60px'; x.replaceWith(d); });
      g.querySelectorAll('input').forEach(x=>{ const d=document.createElement('div'); d.textContent= x.type==='checkbox' ? (x.checked?'✓':'—') : x.value; d.style.cssText='font-size:14px;padding:6px 8px;font-weight:'+(x.closest('.shead')?'700':'500'); (x.closest('label')||x).replaceWith(d); });
      g.querySelectorAll('.shead button').forEach(b=>b.remove());
      g.querySelectorAll('select').forEach((s,i)=>{ const d=document.createElement('div'); d.textContent=(t.emo.find(e=>e[0]===(+st.stages[i].emo||0))||[0,''])[1]; d.style.cssText='font-size:13px'; s.replaceWith(d); });
      wrap.appendChild(g); wrap.appendChild($('#jtAn',host).cloneNode(true));
      document.body.appendChild(wrap); const cv=await window.html2canvas(wrap,{backgroundColor:bg,scale:2}); wrap.remove();
      const a=document.createElement('a'); a.href=cv.toDataURL('image/png'); a.download=(st.name||'journey').replace(/[\\/:*?"<>|]/g,'')+'.png'; document.body.appendChild(a); a.click(); a.remove(); X.toast(t.exported);
    }catch(e){ X.toast(t.exportFail); }
    btn.disabled=false; btn.textContent=old;
  });
  render();
}

/* ---------- simulator ---------- */
function sim(host, X){
  const t=T[X.LANG], S=LAB.sim, L=(o,f)=>X.LANG==='en'&&o[f+'_en']?o[f+'_en']:o[f];
  let node=S.start, mins=0, mood=0, trail=[], bps=[];
  const pct=()=>Math.max(0,Math.min(100,(mood+6)/8*100));
  function draw(){
    const nd=S.nodes[node];
    if(nd.end){
      host.innerHTML=`<div class="sim"><div class="scene"><span class="sstep">${t.simEnd}</span><p class="t">${esc(L(nd,'t'))}</p>
        <div><h3 style="font:700 18px var(--f-body);margin-bottom:8px">${t.simBps}</h3>${bps.length?`<div class="bps">${bps.map(b=>`<article class="bpc"><h4>${esc(b)}</h4></article>`).join('')}</div>`:`<p class="okmsg">${t.simNoBp}</p>`}</div>
        <div><h3 style="font:700 18px var(--f-body);margin-bottom:8px">${t.simIdeal}</h3><div class="mres" style="position:static"><div class="recs">${S.ideal.map(x=>`<div>${esc(X.LANG==='en'?x[1]:x[0])}</div>`).join('')}</div></div></div>
        <div><button class="btn pri" type="button" id="again">${t.simAgain}</button></div></div>${hud()}</div>`;
      $('#again',host).onclick=()=>{ node=S.start; mins=0; mood=0; trail=[]; bps=[]; draw(); };
      return;
    }
    host.innerHTML=`<div class="sim"><div class="scene"><span class="sstep">${t.simStep(trail.length+1)}</span><p class="t">${esc(L(nd,'t'))}</p>
      <div class="choices">${nd.c.map((c,i)=>`<button class="choice" type="button" data-i="${i}"><span>${esc(L(c,'l'))}</span><small>+${T[X.LANG].hrs(c.m/60)}</small></button>`).join('')}</div></div>${hud()}</div>`;
    $$('.choice',host).forEach(b=>b.onclick=()=>{ const c=nd.c[+b.dataset.i]; mins+=c.m; mood+=c.e; trail.push({t:L(c,'l'),bp:c.bp?L(c,'bp'):''}); if(c.bp){ const bp=L(c,'bp'); if(!bps.includes(bp)) bps.push(bp); } node=c.to; draw(); });
  }
  function hud(){ return `<aside class="hud"><div class="row2"><div><b>${T[X.LANG].hrs(mins/60)}</b><br><span>${t.simTime}</span></div><div style="text-align:end"><b style="color:${bps.length?'var(--accent)':'var(--fg)'}">${bps.length}</b><br><span>${t.bpCount}</span></div></div>
    <div><span>${t.simMood}</span><div class="emo-m" style="margin-top:10px"><i style="left:${pct()}%"></i></div></div>
    <div><span>${t.simTrail}</span><div class="trail" style="margin-top:8px">${trail.map(x=>`<div class="${x.bp?'bp':''}">${esc(x.t)}${x.bp?` — ${esc(x.bp)}`:''}</div>`).join('')||'<div>—</div>'}</div></div></aside>`; }
  host.innerHTML=''; const intro=document.createElement('p'); intro.className='csum'; intro.style.marginTop='18px'; intro.textContent=L(S,'intro');
  const box=document.createElement('div'); host.appendChild(intro); host.appendChild(box); host=box; draw();
}

/* ---------- calculators ---------- */
function calc(host, X){
  const c=T[X.LANG].calc, fmt=n=>isFinite(n)?Math.round(n).toLocaleString('en-US'):'—';
  const box=(id,title,d,inputs,outId)=>`<div class="calc" id="${id}"><h3>${title}</h3><p class="d">${d}</p><div class="ins">${inputs.map(([k,l,v,extra])=>extra?`<label>${l}${extra}</label>`:`<label>${l}<input type="number" min="0" step="any" data-k="${k}" value="${v}"></label>`).join('')}</div><div class="out" id="${outId}"></div></div>`;
  host.innerHTML=`<div class="calcs">
    ${box('cNps',c.nps,c.npsD,[['p',c.pro,120],['pa',c.pas,60],['d',c.det,40]],'oNps')}
    ${box('cCsat',c.csat,c.csatD,[['s',c.sat,410],['t',c.tot,500]],'oCsat')}
    ${box('cCes',c.ces,c.cesD,[1,2,3,4,5,6,7].map(i=>['s'+i,String(i),[5,8,14,30,60,90,45][i-1]]),'oCes')}
    ${box('cSs',c.ss,c.ssD,[['N',c.pop,50000],['z',c.conf,0,`<select data-k="z"><option value="1.645">90%</option><option value="1.96" selected>95%</option><option value="2.576">99%</option></select>`],['e',c.moe,5]],'oSs')}
    ${box('cRoi',c.roi,c.roiD,[['n',c.cust,20000],['a',c.arpu,1200],['ch',c.churn,15],['r',c.red,2]],'oRoi')}
    ${box('cRc',c.rc,c.rcD,[['m',c.cont,30000],['p',c.rep,22],['k',c.cost,18],['cut',c.cut,30]],'oRc')}
  </div>`;
  const v=(id,k)=>{ const el=$(`#${id} [data-k="${k}"]`,host); return el?+el.value||0:0; };
  function run(){
    const p=v('cNps','p'),pa=v('cNps','pa'),d=v('cNps','d'),T1=p+pa+d||1;
    $('#oNps',host).innerHTML=`<b>${Math.round((p-d)/T1*100)}</b><span>${c.npsOut(Math.round(p/T1*100),Math.round(pa/T1*100),Math.round(d/T1*100))}</span>`;
    const s=v('cCsat','s'),t=v('cCsat','t'); $('#oCsat',host).innerHTML=`<b>${t?Math.round(s/t*100):'—'}%</b>`;
    let n=0,sum=0,easy=0; for(let i=1;i<=7;i++){ const x=v('cCes','s'+i); n+=x; sum+=x*i; if(i>=5) easy+=x; } $('#oCes',host).innerHTML=`<b>${n?(sum/n).toFixed(2):'—'}</b><span>${n?c.cesOut((sum/n).toFixed(2),Math.round(easy/n*100)):''}</span>`;
    const N=v('cSs','N'), z=v('cSs','z')||1.96, e=(v('cSs','e')||5)/100, n0=z*z*.25/(e*e), nn=N?n0/(1+(n0-1)/N):n0; $('#oSs',host).innerHTML=`<b>${fmt(Math.ceil(nn))}</b><span>${c.ssOut}</span>`;
    $('#oRoi',host).innerHTML=`<b>${fmt(v('cRoi','n')*v('cRoi','a')*v('cRoi','r')/100)}</b><span>${c.roiOut}</span>`;
    $('#oRc',host).innerHTML=`<b>${fmt(v('cRc','m')*v('cRc','p')/100*v('cRc','cut')/100*v('cRc','k')*12)}</b><span>${c.rcOut}</span>`;
  }
  host.addEventListener('input',run); host.addEventListener('change',run); run();
}

/* ---------- maturity ---------- */
function maturity(host, X){
  const t=T[X.LANG], M=LAB.maturity, en=X.LANG==='en';
  let ans={}; try{ ans=JSON.parse(localStorage.getItem(MKEY)||'{}'); }catch(e){}
  host.innerHTML=`<p class="csum" style="margin-top:18px">${t.matIntro}</p><div class="mat"><div style="display:grid;gap:12px">${M.dims.map(d=>`<section class="mq"><h3>${esc(en?d.n_en:d.n)}</h3>${d.q.map((q,qi)=>{ const id=d.k+qi; return `<div class="q"><p>${esc(en?q[1]:q[0])}</p><div class="opts" role="radiogroup">${(en?M.scale_en:M.scale).map((s,si)=>`<label><input type="radio" name="${id}" value="${si+1}" ${ans[id]==si+1?'checked':''}><span>${s}</span></label>`).join('')}</div></div>`; }).join('')}</section>`).join('')}</div><aside class="mres" id="mres"></aside></div>`;
  function res(){
    const sc=M.dims.map(d=>{ const v=d.q.map((_,qi)=>ans[d.k+qi]).filter(Boolean); return v.length?v.reduce((a,b)=>a+b,0)/v.length:0; });
    const done=Object.keys(ans).length, valid=sc.filter(x=>x>0), avg=valid.length?valid.reduce((a,b)=>a+b,0)/valid.length:0;
    const lv=avg? M.levels[Math.min(4,Math.floor((avg-1)/0.8+1e-9))] : null;
    const R=110, cx=150, cy=130, n=M.dims.length, pt=(i,v)=>{ const a=-Math.PI/2+i*2*Math.PI/n; return [cx+R*v/5*Math.cos(a), cy+R*v/5*Math.sin(a)]; };
    let g=''; [1,2,3,4,5].forEach(k=>{ g+=`<polygon points="${M.dims.map((_,i)=>pt(i,k).join(',')).join(' ')}" fill="none" stroke="var(--line-2)"/>`; });
    M.dims.forEach((d,i)=>{ const [x,y]=pt(i,5.9); g+=`<line x1="${cx}" y1="${cy}" x2="${pt(i,5)[0]}" y2="${pt(i,5)[1]}" stroke="var(--line-2)"/><text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="middle" font-size="11" fill="var(--muted)">${esc((en?d.n_en:d.n).split(' ')[0])}</text>`; });
    if(valid.length) g+=`<polygon points="${sc.map((v,i)=>pt(i,v||0).join(',')).join(' ')}" fill="var(--accent-soft)" stroke="var(--accent)" stroke-width="2"/>`;
    const low=M.dims.map((d,i)=>({d,v:sc[i]})).filter(x=>x.v>0).sort((a,b)=>a.v-b.v).slice(0,2);
    $('#mres',host).innerHTML=`<svg viewBox="0 -8 300 286" aria-hidden="true">${g}</svg><div class="lvl"><b>${lv?esc(en?lv[1]:lv[0]):'—'}</b><span>${avg?avg.toFixed(1)+' / 5':''}</span></div><p class="srcl">${t.matDone(done)}</p>${low.length?`<div><p class="kicker" style="margin-bottom:6px">${t.matRecs}</p><div class="recs">${low.map(x=>`<div><b>${esc(en?x.d.n_en:x.d.n)}:</b> ${esc(en?x.d.rec[1]:x.d.rec[0])}</div>`).join('')}</div></div>`:''}`;
  }
  host.addEventListener('change',e=>{ if(e.target.type==='radio'){ ans[e.target.name]=+e.target.value; try{ localStorage.setItem(MKEY,JSON.stringify(ans)); }catch(_){} res(); } });
  res();
}

/* ---------- method, library, kit ---------- */
function method(host,X){ const t=T[X.LANG], L=X.L;
  host.innerHTML=`<div class="steps">${J.method.map((s,i)=>`<div class="step"><div class="no">${i+1}</div><div><h3>${esc(L(s,'t'))}</h3><p>${esc(L(s,'d'))}</p><div class="outs">${(X.LANG==='en'?s.out_en:s.out).map(o=>`<span>${esc(o)}</span>`).join('')}</div><p class="tp">${esc(L(s,'tip'))}</p></div></div>`).join('')}</div>
  <section class="blk" style="padding-top:20px"><div class="sh"><h2>${t.kpiTitle}</h2><p>${t.kpiSub}</p></div><div class="kpis">${J.kpis.map(k=>`<div class="kpi"><b>${esc(L(k,'n'))}</b><code>${esc(k.e)}</code><p>${esc(L(k,'d'))}</p></div>`).join('')}</div></section>`; }
function library(host,X){ const L=X.L;
  host.innerHTML=`<section class="blk" style="padding-top:24px"><div class="inits">${J.library.map(x=>`<article class="ini"><div class="who">${X.flag(x.c,'sm')}<a href="${X.href('country/'+x.c.toLowerCase())}">${esc(X.cname(x.c))}</a> · <span class="theme">${esc(L(x,'theme'))}</span><span class="y num">${esc(x.y)}</span></div><h3>${esc(L(x,'t'))}</h3><p>${esc(L(x,'d'))}</p><a class="open" href="${esc(x.u)}" target="_blank" rel="noopener">${esc(x.o)} ${X.I.ext}</a></article>`).join('')}</div></section>`; }
function kit(host,X){ const t=T[X.LANG], L=X.L, en=X.LANG==='en';
  host.innerHTML=`<section class="blk" style="padding-top:24px"><div class="sh"><h2>${t.templates}</h2><p>${t.templatesD}</p></div><div class="tpls">${J.templates.map(x=>`<div class="tpl"><b>${esc(L(x,'t'))}</b><p>${esc(L(x,'d'))}</p><a class="btn sm" href="templates/${x.f}.${en?'en':'ar'}.csv" download>${t.download}</a></div>`).join('')}</div></section>
  <section class="blk"><div class="sh"><h2>${t.glossary}</h2><label class="field"><span class="sr">${t.searchTerm}</span>${X.I.search}<input id="gq" type="search" placeholder="${t.searchTerm}" autocomplete="off"></label></div><div class="tablewrap"><table class="gloss"><thead><tr><th>${t.term}</th><th>${t.termEn}</th><th>${t.def}</th></tr></thead><tbody id="gl"></tbody></table></div></section>`;
  const norm=s=>String(s).toLowerCase().replace(/[أإآ]/g,'ا').replace(/ة/g,'ه').replace(/ى/g,'ي');
  const r=q=>{ const n=norm(q); $('#gl',host).innerHTML=J.glossary.filter(g=>!n||norm(g.join(' ')).includes(n)).map(g=>`<tr><td>${esc(g[0])}</td><td>${esc(g[1])}</td><td>${esc(en?g[3]:g[2])}</td></tr>`).join('')||`<tr><td colspan="3" class="empty">${t.noTerm}</td></tr>`; };
  r(''); $('#gq',host).addEventListener('input',e=>r(e.target.value)); }

/* ---------- entry ---------- */
window.CXK_Lab = function(main,{tab,arg}){
  const X=window.CXK, S=X.S, t=T[X.LANG];
  tab = tab||'tool'; if(tab==='journey') tab='tool';
  const tabs=Object.entries(S.labTabs);
  main.innerHTML=`<div class="wrap"><header class="pagehead"><span class="kicker">${S.labK}</span><h1>${S.labTitle}</h1><p>${S.labLede}</p></header>
    <div class="lab-intro">${t.intro.map(([a,b,k])=>`<a href="${X.href('lab/'+k)}"><b>${a}</b><span>${b}</span></a>`).join('')}</div>
    <nav class="jtabs" aria-label="${S.labTitle}">${tabs.map(([k,l])=>`<a href="${X.href('lab/'+k)}" ${k===tab?'aria-current="page"':''}>${l}</a>`).join('')}</nav><div id="labBody"></div></div>`;
  const b=$('#labBody');
  ({tool:()=>tool(b,X,arg),sim:()=>sim(b,X),calc:()=>calc(b,X),maturity:()=>maturity(b,X),method:()=>method(b,X),library:()=>library(b,X),kit:()=>kit(b,X)}[tab]||(()=>tool(b,X,arg)))();
};
window.CXK_LabMini = function(lang){
  const s=sampleState('flight',lang), F=s.stages.map(friction), W=520, rowH=30;
  let g=''; s.stages.forEach((st,i)=>{ const y=16+i*rowH, w=F[i].total/100*(W-200);
    g+=`<text x="${lang==='en'?10:W-10}" y="${y+14}" text-anchor="${lang==='en'?'start':'end'}" font-size="12.5" fill="var(--fg)" font-family="Thmanyah Sans,IBM Plex Sans Arabic,IBM Plex Sans,sans-serif">${esc(st.n)}</text>
    <rect x="${lang==='en'?170:W-170-w}" y="${y+3}" width="${w}" height="14" rx="3" fill="${F[i].bp?'var(--accent)':'var(--fg-2)'}"/><text x="${lang==='en'?176+w:W-176-w}" y="${y+15}" text-anchor="${lang==='en'?'start':'end'}" font-size="11.5" fill="var(--muted)" font-family="IBM Plex Mono,monospace">${F[i].total}</text>`; });
  return `<svg viewBox="0 0 ${W} ${16+s.stages.length*rowH+10}" style="direction:ltr">${g}</svg>`;
};
})();
