/* أدوات تجربة العميل: محلل الملاحظات، فاحص الرسائل، مصفوفة الأولويات، منشئ الاستبيان، وصفحات أنماط الانكسار والمبادئ */
(function(){
"use strict";
const K = window.CXK_KIT;
const $ = (s,el=document)=>el.querySelector(s), $$=(s,el=document)=>[...el.querySelectorAll(s)];
const esc = s => String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const nAr = s => String(s).toLowerCase().replace(/[ً-ْـ]/g,'').replace(/[أإآ]/g,'ا').replace(/ة/g,'ه').replace(/ى/g,'ي');
const isAr = s => /[؀-ۿ]/.test(s);
const reEsc = s => s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
function has(text, kw){ const t=nAr(text), k=nAr(kw); if(isAr(k)) return t.includes(k); return new RegExp('\\b'+reEsc(k)+'\\b','i').test(t); }
function countHits(text, list){ let n=0; list.forEach(k=>{ if(has(text,k)) n++; }); return n; }
function download(name, text, type){ const b=new Blob(['﻿'+text],{type:type||'text/csv;charset=utf-8'}); const a=document.createElement('a'); a.href=URL.createObjectURL(b); a.download=name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(a.href),2000); }
const csvCell = v => '"'+String(v==null?'':v).replace(/"/g,'""')+'"';
const pat = id => K.patterns.find(p=>p.id===id);

const T = {
ar:{
 vocIntro:"الصق ملاحظات العملاء أو الشكاوى أو تعليقات التقييم، ملاحظة في كل سطر، أو ارفع ملف CSV أو TXT. تصنّف الأداة كل ملاحظة بحسب موضوعها ونبرتها، وتربط الموضوعات بأنماط الانكسار ومعالجتها.",
 privacy:"يعمل التحليل داخل متصفحك، ولا تُرسل النصوص إلى أي خادم.",
 analyse:"حلّل", sample:"حمّل مثالاً", upload:"ارفع ملفاً", exportCsv:"نزّل النتائج CSV", clear:"امسح",
 comments:"ملاحظة", neg:"سلبية", pos:"إيجابية", neu:"محايدة", effort:"إشارات جهد", effortT:"ملاحظات تذكر تكرار البيانات أو التحويل بين الجهات أو تغيير القناة",
 themes:"الموضوعات", themesSub:"عدد الملاحظات لكل موضوع، والجزء الداكن نسبة السلبية منها. اضغط موضوعاً لعرض أمثلته.",
 quotes:"أمثلة من الملاحظات", noQuotes:"اختر موضوعاً لعرض أمثلته.", untagged:"دون موضوع واضح",
 actions:"ما الذي تبدأ به", actionsSub:"أكثر ثلاثة موضوعات سلبية، ونمط الانكسار المرتبط بكل منها ومعالجته.",
 pattern:"نمط الانكسار", fix:"المعالجة", openPattern:"افتح النمط",
 noData:"الصق ملاحظات في المربع ثم اضغط «حلّل».", approx:"التصنيف بالكلمات الدالة تقريبي. راجع الأمثلة قبل اتخاذ القرار.",
 placeholder:"ملاحظة في كل سطر…",
 msgIntro:"الصق رسالة ترسلها للعميل (رسالة نصية، بريد، إشعار، خطاب قرار). تفحص الأداة وضوحها في ثماني نقاط وتقترح ما تغيّره.",
 msgLoad:"جرّب مثالاً:", score:"درجة الوضوح", chars:"حرفاً", words:"كلمة", sents:"جملة", sms:"رسالة نصية",
 checks:{outcome:"تقول ما حدث", next:"تقول ما المطلوب من العميل", time:"تذكر مدة أو موعداً", ref:"فيها رقم مرجعي", help:"فيها رابط أو قناة للمتابعة", jargon:"خالية من العبارات الرسمية المعقدة", sent:"جملها قصيرة (20 كلمة أو أقل)", active:"تقول من يفعل ماذا", blame:"لا تلوم العميل"},
 tips:{outcome:"ابدأ بالنتيجة: «استلمنا طلبك» أو «قبلنا طلبك» أو «لم نقبل طلبك لأن…».", next:"اذكر الخطوة التالية بفعل واضح: «أرفق…»، «ادخل الرابط…»، «لا تحتاج أن تفعل شيئاً».", time:"اذكر متى: «خلال 3 أيام عمل» أو «قبل 15 نوفمبر».", ref:"أضف رقم الطلب ليستخدمه العميل عند المتابعة.", help:"أضف رابط التتبع أو رقم التواصل.", jargon:"استبدل العبارات المظللة بكلمات يومية.", sent:"قسّم الجمل الطويلة. جملة واحدة لكل معلومة.", active:"استبدل «تم استلام طلبكم» بـ«استلمنا طلبك». الفاعل يوضح المسؤول.", blame:"صف ما ينقص دون لوم: «ينقص الطلب صورة الهوية» بدل «لم تقم بإرفاق…»."},
 found:"عبارات للمراجعة", noneFound:"لا شيء",
 builder:"منشئ الرسالة الواضحة", builderSub:"املأ الحقول وتُكتب الرسالة بترتيب واضح: ما حدث، ثم ما يعنيه، ثم المطلوب وموعده، ثم كيف تتابع.",
 fWhat:"ما الذي حدث؟", fWhatPh:"قبلنا طلب تجديد الرخصة", fMean:"ماذا يعني للعميل؟ (اختياري)", fMeanPh:"تصلك الرخصة الجديدة بالبريد", fDo:"ما المطلوب منه؟", fDoPh:"لا تحتاج أن تفعل شيئاً", fWhen:"متى؟", fWhenPh:"خلال 5 أيام عمل", fRef:"الرقم المرجعي", fLink:"رابط أو رقم المتابعة", fLinkPh:"example.gov/track",
 refWord:"رقم الطلب", follow:"للمتابعة:", checkThis:"افحص هذه الرسالة", copyMsg:"انسخ الرسالة",
 prioIntro:"اكتب نقاط الألم أو فرص التحسين، وقيّم كل واحدة من 1 إلى 5 في تكرارها وأثرها على العميل وجهد معالجتها. ترتّب الأداة الأولويات وترسم المصفوفة.",
 pName:"نقطة الألم", pFreq:"التكرار", pImp:"الأثر على العميل", pEff:"جهد المعالجة", pScore:"الأولوية", add:"+ أضف صفاً", importJ:"استورد من رحلتك", importedN:n=>`استوردتُ ${n} نقاط من رحلتك المحفوظة`, noJourney:"لا توجد نقاط ألم في رحلتك المحفوظة. ارسم رحلة أولاً في أداة «ارسم الرحلة».", del:"احذف",
 quad:{quick:"مكسب سريع",major:"مشروع كبير",minor:"تحسين صغير",later:"أجّله"},
 quadD:{quick:"أثر عالٍ بجهد قليل: ابدأ به الآن.",major:"أثر عالٍ بجهد كبير: خطّط له ورصد له موارد.",minor:"أثر قليل بجهد قليل: نفّذه عند توفر وقت.",later:"أثر قليل بجهد كبير: أجّله أو أعد صياغته."},
 axisX:"جهد المعالجة ←", axisY:"القيمة (التكرار × الأثر)", ranked:"الترتيب المقترح", prioNote:"الأولوية = (التكرار × الأثر) ÷ الجهد. تُحفظ القائمة في متصفحك.",
 sampleRows:[["طلب النواقص على دفعات",4,5,2],["عدم معرفة حالة الطلب",5,4,2],["رسالة الرفض غير واضحة",3,4,1],["تكرار إدخال بيانات موجودة",4,3,4],["قلة المواعيد المتاحة",3,3,4],["التحويل بين الإدارات",2,5,5]],
 survIntro:"اختر اللحظة التي تقيسها والمؤشر، وتكتب الأداة أسئلة الاستبيان ومقاييسها ومتى ترسله.",
 moment:"اللحظة التي تقيسها", metric:"المؤشر الرئيسي", drivers:"أسئلة الأسباب (اختر حتى 3)", openQ:"أضف سؤالاً مفتوحاً", recommended:"موصى به",
 questions:"الأسئلة", when:"متى ترسله", length:"الزمن المتوقع للإجابة", sec:n=>`نحو ${n} ثانية`, copyAll:"انسخ الأسئلة", csv:"نزّل CSV",
 warnNps:"صافي نقاط الترويج (NPS) يقيس احتمال التوصية، وهو أنسب للخدمات التي يختار العميل مزوّدها. في الخدمات الحكومية التي لا بديل لها، جهد العميل (CES) أو رضاه (CSAT) أدق.",
 warnLong:"الاستبيان طويل. كل سؤال إضافي يخفض نسبة الاستجابة؛ أبقِه أقل من خمسة أسئلة.",
 scale:"المقياس", yesno:"نعم / جزئياً / لا", text:"نص حر",
 q:{csat:m=>`بشكل عام، ما مدى رضاك عن ${m}؟`, ces:()=>"كم كان سهلاً إنجاز ما احتجت إليه اليوم؟", nps:()=>"ما مدى احتمال أن توصي بهذه الخدمة لصديق أو زميل؟", resolve:()=>"هل حُلّ طلبك بالكامل؟", driver:d=>`ما تقييمك لـ: ${d}؟`, open:()=>"ما أهم شيء نغيّره لتصبح تجربتك أفضل؟"},
 scales:{csat:"1 غير راضٍ إطلاقاً — 5 راضٍ جداً", ces:"1 صعب جداً — 7 سهل جداً", nps:"0 غير محتمل إطلاقاً — 10 محتمل جداً", driver:"1 ضعيف جداً — 5 ممتاز"},
 mPhrase:{digital:"الخدمة التي أنجزتها اليوم",call:"مكالمتك معنا اليوم",visit:"زيارتك اليوم",closed:"طريقة معالجة طلبك",annual:"تعاملك معنا خلال العام"},
 timing:{digital:"اعرضه في صفحة التأكيد بعد إكمال الخدمة مباشرة.",call:"أرسله برسالة نصية خلال ساعة من انتهاء المكالمة، أو في نهاية المكالمة آلياً.",visit:"أرسله برسالة نصية خلال ساعتين من الزيارة، أو اعرضه على شاشة عند المخرج.",closed:"أرسله بعد تأكيد الحل مع العميل، خلال 24 ساعة من الإغلاق.",annual:"مرة في السنة لعينة ممثلة من العملاء، واحسب حجم العينة من حاسبة «حجم العينة»."},
 patIntro:"أنماط متكررة يتعثر فيها العملاء والمستفيدون في أغلب الخدمات. لكل نمط علامته، وكيف تقيسه، وكيف تعالجه، ومثال من الممارسة الدولية حين يتوفر.",
 allStages:"كل المراحل", symptom:"كيف يظهر", measure:"كيف تقيسه", treat:"كيف تعالجه", example:"من الممارسة", searchPat:"ابحث في الأنماط", noPat:"لا يوجد نمط يطابق البحث.", stageStrip:"أين تقع الأنماط في الرحلة",
 prIntro:"عشرة مبادئ تشترك فيها الحكومات والشركات التي تتصدر مؤشرات التجربة. استخدمها لمراجعة أي خدمة، ومع كل مبدأ سؤال تطرحه على فريقك.", askTeam:"اسأل فريقك",
 copied:"نُسخ"
},
en:{
 vocIntro:"Paste customer comments, complaints or review text, one per line, or upload a CSV or TXT file. The tool tags each comment by theme and tone, and links themes to breakpoint patterns and their fixes.",
 privacy:"The analysis runs in your browser; no text is sent to any server.",
 analyse:"Analyse", sample:"Load an example", upload:"Upload a file", exportCsv:"Download results CSV", clear:"Clear",
 comments:"comments", neg:"negative", pos:"positive", neu:"neutral", effort:"effort signals", effortT:"Comments mentioning repeated data, being passed between teams or switching channel",
 themes:"Themes", themesSub:"Comments per theme; the dark part is the negative share. Click a theme to see examples.",
 quotes:"Example comments", noQuotes:"Pick a theme to see its examples.", untagged:"No clear theme",
 actions:"Where to start", actionsSub:"The three most negative themes, with the linked breakpoint pattern and its fix.",
 pattern:"Breakpoint pattern", fix:"Fix", openPattern:"Open pattern",
 noData:"Paste comments in the box, then press \"Analyse\".", approx:"Keyword tagging is approximate. Check the examples before deciding.",
 placeholder:"One comment per line…",
 msgIntro:"Paste a message you send customers (text, email, notification, decision letter). The tool checks its clarity on eight points and suggests what to change.",
 msgLoad:"Try an example:", score:"Clarity score", chars:"characters", words:"words", sents:"sentences", sms:"SMS segments",
 checks:{outcome:"Says what happened", next:"Says what the customer should do", time:"Gives a time or date", ref:"Has a reference number", help:"Has a link or a way to follow up", jargon:"Free of bureaucratic phrases", sent:"Short sentences (20 words or fewer)", active:"Says who does what", blame:"Doesn't blame the customer"},
 tips:{outcome:"Lead with the outcome: \"We've received your request\", \"We've approved…\", \"We couldn't approve… because…\".", next:"Give the next step with a clear verb: \"Upload…\", \"Open the link…\", \"You don't need to do anything\".", time:"Say when: \"within 3 working days\" or \"by 15 November\".", ref:"Add the request number so the customer can quote it.", help:"Add the tracking link or a contact number.", jargon:"Replace the highlighted phrases with everyday words.", sent:"Split long sentences: one piece of information per sentence.", active:"Write \"We've received your request\" instead of \"Your request has been received\" so it's clear who's responsible.", blame:"Describe what's missing without blame: \"The application needs a copy of your ID\" instead of \"You failed to attach…\"."},
 found:"Phrases to review", noneFound:"none",
 builder:"Clear message builder", builderSub:"Fill in the fields and the message is written in a clear order: what happened, what it means, what to do and by when, how to follow up.",
 fWhat:"What happened?", fWhatPh:"We've approved your licence renewal", fMean:"What does it mean for the customer? (optional)", fMeanPh:"Your new licence will arrive by post", fDo:"What should they do?", fDoPh:"You don't need to do anything", fWhen:"By when?", fWhenPh:"within 5 working days", fRef:"Reference number", fLink:"Tracking link or contact", fLinkPh:"example.gov/track",
 refWord:"Request number", follow:"Track it here:", checkThis:"Check this message", copyMsg:"Copy message",
 prioIntro:"List pain points or improvement ideas and rate each from 1 to 5 for how often it happens, its impact on customers and the effort to fix it. The tool ranks them and draws the matrix.",
 pName:"Pain point", pFreq:"Frequency", pImp:"Customer impact", pEff:"Effort to fix", pScore:"Priority", add:"+ Add row", importJ:"Import from your journey", importedN:n=>`Imported ${n} pain points from your saved journey`, noJourney:"Your saved journey has no pain points. Map a journey first in the \"Map a journey\" tool.", del:"Delete",
 quad:{quick:"Quick win",major:"Major project",minor:"Small fix",later:"Park it"},
 quadD:{quick:"High impact, low effort: start now.",major:"High impact, high effort: plan and resource it.",minor:"Low impact, low effort: do it when there's time.",later:"Low impact, high effort: park it or rethink it."},
 axisX:"Effort to fix →", axisY:"Value (frequency × impact)", ranked:"Suggested order", prioNote:"Priority = (frequency × impact) ÷ effort. The list is saved in your browser.",
 sampleRows:[["Missing items requested one at a time",4,5,2],["Customers can't see request status",5,4,2],["Unclear rejection letter",3,4,1],["Re-entering data we already hold",4,3,4],["Too few appointments",3,3,4],["Passed between departments",2,5,5]],
 survIntro:"Choose the moment you're measuring and the metric, and the tool writes the survey questions, their scales and when to send it.",
 moment:"Moment you're measuring", metric:"Main metric", drivers:"Driver questions (pick up to 3)", openQ:"Add an open question", recommended:"recommended",
 questions:"Questions", when:"When to send it", length:"Expected time to answer", sec:n=>`about ${n} seconds`, copyAll:"Copy questions", csv:"Download CSV",
 warnNps:"NPS measures likelihood to recommend and suits services where customers choose their provider. For government services with no alternative, customer effort (CES) or satisfaction (CSAT) is more accurate.",
 warnLong:"This survey is long. Every extra question lowers the response rate; keep it under five.",
 scale:"Scale", yesno:"Yes / Partly / No", text:"Free text",
 q:{csat:m=>`Overall, how satisfied are you with ${m}?`, ces:()=>"How easy was it to get what you needed today?", nps:()=>"How likely are you to recommend this service to a friend or colleague?", resolve:()=>"Was your request fully resolved?", driver:d=>`How would you rate: ${d}?`, open:()=>"What one thing should we change to make your experience better?"},
 scales:{csat:"1 very dissatisfied — 5 very satisfied", ces:"1 very difficult — 7 very easy", nps:"0 not at all likely — 10 extremely likely", driver:"1 very poor — 5 excellent"},
 mPhrase:{digital:"the service you completed today",call:"your call with us today",visit:"your visit today",closed:"how your request was handled",annual:"your dealings with us this year"},
 timing:{digital:"Show it on the confirmation page right after the service is completed.",call:"Send it by text within an hour of the call, or play it automatically at the end of the call.",visit:"Send it by text within two hours of the visit, or show it on a screen at the exit.",closed:"Send it after the customer confirms the fix, within 24 hours of closure.",annual:"Once a year to a representative sample; work out the sample size with the sample size calculator."},
 patIntro:"Recurring patterns where customers get stuck in most services. Each one has its symptom, how to measure it, how to fix it, and an international example where there is one.",
 allStages:"All stages", symptom:"How it shows up", measure:"How to measure it", treat:"How to fix it", example:"In practice", searchPat:"Search patterns", noPat:"No pattern matches.", stageStrip:"Where the patterns sit in the journey",
 prIntro:"Ten principles shared by the governments and companies at the top of experience indices. Use them to review any service; each comes with a question to put to your team.", askTeam:"Ask your team",
 copied:"Copied"
}};

/* ---------- محلل ملاحظات العملاء ---------- */
function voc(host, X){
  const t=T[X.LANG], en=X.LANG==='en', TH=K.voc.themes;
  const negThemes = new Set(TH.filter(x=>x.k!=='praise'&&x.k!=='staff').map(x=>x.k));
  let rows=[], sel=null;
  host.innerHTML=`<p class="csum" style="margin-top:18px">${t.vocIntro}</p>
   <div class="voc">
    <div class="vin"><label class="sr" for="vocIn">${t.placeholder}</label><textarea id="vocIn" class="ta" rows="10" placeholder="${t.placeholder}" dir="auto"></textarea>
     <div class="row-btns"><button class="btn sm pri" type="button" id="vocGo">${t.analyse}</button><button class="btn sm" type="button" id="vocSample">${t.sample}</button><label class="btn sm" for="vocFile" style="cursor:pointer">${t.upload}</label><input type="file" id="vocFile" accept=".csv,.txt,text/plain,text/csv" hidden><button class="btn sm" type="button" id="vocCsv">${t.exportCsv}</button><button class="btn sm ghost" type="button" id="vocClear">${t.clear}</button></div>
     <p class="note">${t.privacy} ${t.approx}</p></div>
    <div id="vocOut"></div></div>`;
  const ta=$('#vocIn',host);
  function tag(line){
    const th=TH.filter(x=>[...x.ar,...x.en].some(k=>has(line,k))).map(x=>x.k);
    const p=countHits(line,K.voc.pos), n=countHits(line,K.voc.neg);
    let s=p-n; if(th.some(k=>negThemes.has(k))) s-=1; if(th.includes('praise')&&n===0) s=Math.max(s,1);
    return {text:line, th, tone: s>0?1:s<0?-1:0};
  }
  function run(){
    rows = ta.value.split(/\r?\n/).map(s=>s.trim()).filter(s=>s.length>2).map(tag); const c={}; rows.forEach(r=>r.th.forEach(k=>c[k]=(c[k]||0)+1)); sel=Object.keys(c).sort((a,b)=>c[b]-c[a])[0]||null; render();
  }
  function render(){
    const out=$('#vocOut',host);
    if(!rows.length){ out.innerHTML=`<p class="empty">${t.noData}</p>`; return; }
    const N=rows.length, ng=rows.filter(r=>r.tone<0).length, ps=rows.filter(r=>r.tone>0).length, ef=rows.filter(r=>r.th.some(k=>k==='repeat'||k==='transfer')||/قناة|الفرع|branch|online|in person|حضور/i.test(r.text)&&r.th.length).length;
    const stats=TH.map(x=>{ const l=rows.filter(r=>r.th.includes(x.k)); return {x, n:l.length, neg:l.filter(r=>r.tone<0).length}; }).filter(s=>s.n).sort((a,b)=>b.n-a.n);
    const none=rows.filter(r=>!r.th.length).length, mx=stats.length?stats[0].n:1;
    const top=stats.filter(s=>s.x.p && s.neg).sort((a,b)=>b.neg-a.neg).slice(0,3);
    out.innerHTML=`<div class="kpis4"><div><b>${N}</b><span>${t.comments}</span></div><div><b class="dn">${Math.round(ng/N*100)}%</b><span>${t.neg}</span></div><div><b class="up">${Math.round(ps/N*100)}%</b><span>${t.pos}</span></div><div title="${esc(t.effortT)}"><b>${ef}</b><span>${t.effort}</span></div></div>
     <div class="vgrid"><section class="panel"><h3>${t.themes}</h3><p class="sub">${t.themesSub}</p>
      <div class="tbars">${stats.map(s=>`<button type="button" class="tb${sel===s.x.k?' on':''}" data-k="${s.x.k}"><span class="nm">${esc(en?s.x.n_en:s.x.n)}</span><span class="tr2"><i style="width:${(s.n/mx*100).toFixed(0)}%"><em style="width:${s.n?(s.neg/s.n*100).toFixed(0):0}%"></em></i></span><span class="v num">${s.n}</span></button>`).join('')}${none?`<button type="button" class="tb${sel==='_'?' on':''}" data-k="_"><span class="nm">${t.untagged}</span><span class="tr2"><i style="width:${(none/mx*100).toFixed(0)}%"></i></span><span class="v num">${none}</span></button>`:''}</div></section>
      <section class="panel"><h3>${t.quotes}</h3><div class="quotes" id="vq">${quotes()}</div></section></div>
     ${top.length?`<section class="blk" style="padding-top:22px"><div class="sh"><h2>${t.actions}</h2><p>${t.actionsSub}</p></div><div class="acts3">${top.map(s=>{ const p=pat(s.x.p); return `<article class="act"><span class="kicker">${esc(en?s.x.n_en:s.x.n)} · ${s.neg} ${t.neg}</span><h4>${esc(en?p.n_en:p.n)}</h4><p><b>${t.fix}:</b> ${esc(en?p.fix_en:p.fix)}</p><a class="srcl" href="${X.href('learn/patterns/'+p.id)}">${t.openPattern}</a></article>`; }).join('')}</div></section>`:''}`;
    $$('.tb',out).forEach(b=>b.onclick=()=>{ sel=b.dataset.k; $$('.tb',out).forEach(x=>x.classList.toggle('on',x===b)); $('#vq',out).innerHTML=quotes(); });
  }
  function quotes(){
    if(!sel) return `<p class="srcl">${t.noQuotes}</p>`;
    const l=rows.filter(r=>sel==='_'?!r.th.length:r.th.includes(sel)).slice(0,12);
    return l.map(r=>`<blockquote class="q ${r.tone<0?'n':r.tone>0?'p':''}" dir="auto">${esc(r.text)}</blockquote>`).join('');
  }
  $('#vocGo',host).onclick=run;
  $('#vocSample',host).onclick=()=>{ ta.value=K.voc.sample[en?'en':'ar'].join('\n'); run(); };
  $('#vocClear',host).onclick=()=>{ ta.value=''; rows=[]; render(); };
  $('#vocFile',host).onchange=e=>{ const f=e.target.files[0]; if(!f) return; const r=new FileReader(); r.onload=()=>{ const lines=String(r.result).split(/\r?\n/).map(l=>{ if(/\.csv$/i.test(f.name)){ const m=l.match(/^"((?:[^"]|"")*)"|^([^,;\t]*)/); return m?(m[1]!=null?m[1].replace(/""/g,'"'):m[2]):l; } return l; }); ta.value=lines.join('\n'); run(); }; r.readAsText(f); e.target.value=''; };
  $('#vocCsv',host).onclick=()=>{ if(!rows.length) return; const name=k=>{ const x=TH.find(z=>z.k===k); return x?(en?x.n_en:x.n):k; };
    download('cx-comments.csv', [en?'comment,tone,themes':'الملاحظة,النبرة,الموضوعات', ...rows.map(r=>[csvCell(r.text), csvCell(r.tone<0?t.neg:r.tone>0?t.pos:t.neu), csvCell(r.th.map(name).join(' | '))].join(','))].join('\n')); };
  ta.value=K.voc.sample[en?'en':'ar'].join('\n'); run();
}

/* ---------- فاحص وضوح الرسالة ---------- */
const JARGON = ["نحيطكم علما","نحيطكم علماً","نفيدكم","نود افادتكم","نود إفادتكم","استنادا","استناداً","بموجب","وعليه","المذكور أعلاه","المذكور اعلاه","الحاقا","إلحاقاً","الحاقاً","حسب الأنظمة والتعليمات","الأنظمة والتعليمات","المعمول بها","استكمال اللازم","الإجراءات المتبعة","الاجراءات المتبعة","الجهة المختصة","المكرم","يرجى التكرم","التكرم","حيث أن","حيث إن","لذا نأمل","نأمل منكم","هذا وتجدر الإشارة","سعادة",
 "please be advised","aforementioned","pursuant to","hereby","herewith","kindly","in accordance with","the relevant department","necessary procedures","applicable regulations","we wish to inform","be informed","in due course","at your earliest convenience"];
const BLAME = ["لم تقم","لم تقوموا","عدم التزامك","عدم التزامكم","عدم قيامك","مخالفتك","مخالفتكم","تقصيرك","بسبب عدم","you failed","failure to","you did not","you didn't","your failure","you neglected"];
function msgCheck(txt){
  const s=txt.trim(), sents=s.split(/[.!؟?\n؛]+/).map(x=>x.trim()).filter(x=>x.split(/\s+/).length>1), words=s.split(/\s+/).filter(Boolean);
  const avg=sents.length?words.length/sents.length:words.length;
  const ar=isAr(s);
  const dedupe=l=>{ const seen=new Set(), out=[]; l.slice().sort((a,b)=>b.length-a.length).forEach(j=>{ const k=nAr(j).replace(/[ًٌٍ]/g,''); if([...seen].some(x=>x.includes(k))) return; seen.add(k); out.push(j); }); return out; };
  const found=dedupe(JARGON.filter(j=>has(s,j))), blame=dedupe(BLAME.filter(j=>has(s,j)));
  const tamCount=(nAr(s).match(/(^|\s)تم(\s|$)|(^|\s)وتم(\s|$)|سيتم/g)||[]).length, passive=(s.match(/\b(has been|have been|will be|is being|are being|was|were)\s+\w+ed\b/gi)||[]).length;
  const c={
   outcome: /استلم|قبل|وافق|الموافقه|رفض|اعتمد|صدر|اصدر|جاهز|اكتمل|انتهي|الغي|الغاء|تجدد|جدد|received|approved|rejected|issued|ready|cancel|complet|declin|accept|renewed|couldn.t approve/i.test(nAr(s)),
   next: /يرجي|الرجاء|يمكنك|تستطيع|اضغط|ادخل|تابع|ارسل|ارفق|احضر|لا تحتاج|ما عليك|please|you can|click|tap|reply|visit|track|upload|bring|open|you don.t need/i.test(nAr(s)),
   time: /\d+\s*(يوم|ايام|ساع|دقيق|اسبوع|اسابيع|شهر|day|days|hour|hours|minute|minutes|week|weeks|month|working)|\d{1,2}[\/\-]\d{1,2}|(قبل|بحلول|حتي|خلال)\s+\S+|by\s+\d|within\s+\S+/i.test(nAr(s)),
   ref: /\d{5,}|رقم الطلب|رقم المرجع|المرجع|reference|ref\.?\s*\d|request number|case number/i.test(s),
   help: /https?:\/\/|www\.|[a-z0-9-]+\.(gov|com|sa|net|org|ae|qa|bh|kw|om)[\/\w-]*|رابط|\b(9200|800)\d+|\+\d{6,}|اتصل|تواصل|contact|call us|link/i.test(s),
   jargon: found.length===0,
   sent: avg<=20,
   active: ar ? tamCount<=1 : passive<=1,
   blame: blame.length===0
  };
  const W={outcome:15,next:15,time:15,ref:10,help:10,jargon:15,sent:10,active:10};
  let score=Object.entries(W).reduce((a,[k,w])=>a+(c[k]?w:0),0); if(!c.blame) score=Math.max(0,score-10);
  const segLen = ar ? 70 : 160;
  return {c, score, found:[...found,...blame], words:words.length, sents:sents.length||1, chars:s.length, sms:Math.max(1,Math.ceil(s.length/segLen))};
}
function msg(host, X){
  const t=T[X.LANG], en=X.LANG==='en';
  host.innerHTML=`<p class="csum" style="margin-top:18px">${t.msgIntro}</p>
   <div class="msgx"><div class="vin"><label class="sr" for="msgIn">${t.msgIntro}</label><textarea id="msgIn" class="ta" rows="8" dir="auto"></textarea>
     <div class="row-btns"><span class="srcl">${t.msgLoad}</span>${K.messages.map(m=>`<button class="btn sm" type="button" data-m="${m.k}">${esc(en?m.n_en:m.n)}</button>`).join('')}</div>
     <div class="mprev" id="mprev" dir="auto"></div></div>
    <aside class="mres" id="mres"></aside></div>
   <section class="blk" style="padding-top:26px"><div class="sh"><h2>${t.builder}</h2><p>${t.builderSub}</p></div>
    <div class="bld"><div class="bf">
      <label>${t.fWhat}<input id="bWhat" type="text" placeholder="${esc(t.fWhatPh)}"></label>
      <label>${t.fMean}<input id="bMean" type="text" placeholder="${esc(t.fMeanPh)}"></label>
      <label>${t.fDo}<input id="bDo" type="text" placeholder="${esc(t.fDoPh)}"></label>
      <label>${t.fWhen}<input id="bWhen" type="text" placeholder="${esc(t.fWhenPh)}"></label>
      <label>${t.fRef}<input id="bRef" type="text" inputmode="numeric" placeholder="482193"></label>
      <label>${t.fLink}<input id="bLink" type="text" placeholder="${esc(t.fLinkPh)}" dir="ltr"></label></div>
     <div class="bo"><div class="bout" id="bOut" dir="auto"></div><div class="row-btns"><button class="btn sm pri" type="button" id="bCheck">${t.checkThis}</button><button class="btn sm" type="button" id="bCopy">${t.copyMsg}</button></div></div></div></section>`;
  const ta=$('#msgIn',host);
  function run(){
    const r=msgCheck(ta.value), keys=['outcome','next','time','ref','help','jargon','sent','active','blame'];
    let html=esc(ta.value); r.found.forEach(f=>{ html=html.replace(new RegExp(reEsc(esc(f)),'gi'),m=>`<mark>${m}</mark>`); });
    $('#mprev',host).innerHTML=ta.value.trim()?html:'';
    const R=48, C=2*Math.PI*R, col=r.score>=75?'var(--up)':r.score>=50?'var(--fg-2)':'var(--accent)';
    $('#mres',host).innerHTML=`<div class="ring"><svg viewBox="0 0 120 120" aria-hidden="true" style="direction:ltr"><circle cx="60" cy="60" r="${R}" fill="none" stroke="var(--surface-3)" stroke-width="10"/><circle cx="60" cy="60" r="${R}" fill="none" stroke="${col}" stroke-width="10" stroke-linecap="round" stroke-dasharray="${(C*r.score/100).toFixed(1)} ${C.toFixed(1)}" transform="rotate(-90 60 60)"/><text x="60" y="68" text-anchor="middle" font-size="28" font-weight="700" fill="var(--fg)">${r.score}</text></svg><div><b>${t.score}</b><span class="srcl num">${r.chars} ${t.chars} · ${r.words} ${t.words} · ${r.sents} ${t.sents} · ${r.sms} ${t.sms}</span></div></div>
      <ul class="chk-list">${keys.map(k=>`<li class="${r.c[k]?'ok':'no'}"><span class="ic" aria-hidden="true">${r.c[k]?'✓':'✕'}</span><div><b>${t.checks[k]}</b>${r.c[k]?'':`<p>${t.tips[k]}</p>`}</div></li>`).join('')}</ul>
      <p class="srcl">${t.found}: ${r.found.length?r.found.map(f=>`<mark>${esc(f)}</mark>`).join(' '):t.noneFound}</p>`;
  }
  ta.addEventListener('input',run);
  $$('[data-m]',host).forEach(b=>b.onclick=()=>{ const m=K.messages.find(x=>x.k===b.dataset.m); ta.value=en?m.en:m.ar; run(); });
  const ids=['bWhat','bMean','bDo','bWhen','bRef','bLink'];
  function build(){ const v=Object.fromEntries(ids.map(i=>[i,$('#'+i,host).value.trim()])); const p=[];
    const dot=s=>s&&!/[.!؟?]$/.test(s)?s+'.':s;
    if(v.bWhat) p.push(dot(v.bWhat+(v.bRef?(en?` (${t.refWord} ${v.bRef})`:` (${t.refWord} ${v.bRef})`):'')));
    if(v.bMean) p.push(dot(v.bMean));
    if(v.bDo) p.push(dot(v.bDo+(v.bWhen?' '+v.bWhen:'')));
    else if(v.bWhen) p.push(dot(v.bWhen));
    if(v.bLink) p.push(t.follow+' '+v.bLink);
    return p.join(' '); }
  const upd=()=>{ $('#bOut',host).textContent=build()||'—'; };
  ids.forEach(i=>$('#'+i,host).addEventListener('input',upd));
  // قيم مثال
  const ex=en?{bWhat:"We've approved your licence renewal",bMean:"Your new licence will arrive by post",bDo:"You don't need to do anything",bWhen:"",bRef:"482193",bLink:"example.gov/track"}:{bWhat:"قبلنا طلب تجديد الرخصة",bMean:"تصلك الرخصة الجديدة بالبريد خلال 5 أيام عمل",bDo:"لا تحتاج أن تفعل شيئاً",bWhen:"",bRef:"482193",bLink:"example.gov/track"};
  ids.forEach(i=>$('#'+i,host).value=ex[i]); upd();
  $('#bCheck',host).onclick=()=>{ ta.value=build(); run(); ta.scrollIntoView({behavior:'smooth',block:'center'}); };
  $('#bCopy',host).onclick=()=>X.copy(build());
  ta.value=en?K.messages[0].en:K.messages[0].ar; run();
}

/* ---------- مصفوفة الأولويات ---------- */
const PKEY='cxk-prio-v1';
function prio(host, X){
  const t=T[X.LANG];
  let rows=null; try{ rows=JSON.parse(localStorage.getItem(PKEY)||'null'); }catch(e){}
  if(!Array.isArray(rows)||!rows.length) rows=t.sampleRows.map(r=>({n:r[0],f:r[1],i:r[2],e:r[3]}));
  const save=()=>{ try{ localStorage.setItem(PKEY,JSON.stringify(rows)); }catch(e){} };
  const val=r=>(+r.f||0)*(+r.i||0), sc=r=>val(r)/Math.max(1,+r.e||1);
  const quad=r=>{ const hv=val(r)>=10, le=(+r.e||0)<=3; return hv&&le?'quick':hv?'major':le?'minor':'later'; };
  host.innerHTML=`<p class="csum" style="margin-top:18px">${t.prioIntro}</p>
   <div class="row-btns"><button class="btn sm" type="button" id="pAdd">${t.add}</button><button class="btn sm" type="button" id="pImp">${t.importJ}</button><button class="btn sm" type="button" id="pCsv">${t.csv}</button></div>
   <div class="tablewrap"><table class="ptab"><thead><tr><th>#</th><th>${t.pName}</th><th>${t.pFreq}</th><th>${t.pImp}</th><th>${t.pEff}</th><th>${t.pScore}</th><th></th></tr></thead><tbody id="pBody"></tbody></table></div>
   <div class="pgrid"><figure class="pmat" id="pMat"></figure><section><h3 class="h3">${t.ranked}</h3><ol class="prank" id="pRank"></ol><p class="note">${t.prioNote}</p></section></div>`;
  const opt=v=>[1,2,3,4,5].map(n=>`<option value="${n}" ${+v===n?'selected':''}>${n}</option>`).join('');
  function table(){ $('#pBody',host).innerHTML=rows.map((r,i)=>`<tr><td class="num">${i+1}</td><td><input type="text" data-i="${i}" data-k="n" value="${esc(r.n)}" aria-label="${t.pName} ${i+1}"></td>${['f','i','e'].map(k=>`<td><select data-i="${i}" data-k="${k}" aria-label="${k}">${opt(r[k])}</select></td>`).join('')}<td class="num"><b>${sc(r).toFixed(1)}</b></td><td><button type="button" class="x" data-del="${i}" aria-label="${t.del}">×</button></td></tr>`).join(''); }
  function chart(){
    const W=420,H=320,P=44, x=e=>P+(e-1)/4*(W-P-16), y=v=>H-P-(v-1)/24*(H-P-16);
    let g=`<rect x="${P}" y="16" width="${x(3)-P}" height="${y(10)-16}" fill="var(--accent-soft)"/>`;
    g+=`<line x1="${x(3)}" x2="${x(3)}" y1="16" y2="${H-P}" stroke="var(--line-3)" stroke-dasharray="4 4"/><line x1="${P}" x2="${W-16}" y1="${y(10)}" y2="${y(10)}" stroke="var(--line-3)" stroke-dasharray="4 4"/>`;
    g+=`<line x1="${P}" x2="${W-16}" y1="${H-P}" y2="${H-P}" stroke="var(--line-2)"/><line x1="${P}" x2="${P}" y1="16" y2="${H-P}" stroke="var(--line-2)"/>`;
    [1,2,3,4,5].forEach(e=>g+=`<text x="${x(e)}" y="${H-P+16}" text-anchor="middle" font-size="11" fill="var(--muted)">${e}</text>`);
    [1,5,10,15,20,25].forEach(v=>g+=`<text x="${P-8}" y="${y(v)+4}" text-anchor="end" font-size="11" fill="var(--muted)">${v}</text>`);
    g+=`<text x="${(P+W-16)/2}" y="${H-8}" text-anchor="middle" font-size="12" fill="var(--fg-2)">${esc(t.axisX)}</text><text transform="translate(12 ${(H-P+16)/2}) rotate(-90)" text-anchor="middle" font-size="12" fill="var(--fg-2)">${esc(t.axisY)}</text>`;
    const ql=[['quick',x(1.08),30,'start'],['major',x(4.92),30,'end'],['minor',x(1.08),H-P-8,'start'],['later',x(4.92),H-P-8,'end']];
    ql.forEach(([k,xx,yy,a])=>g+=`<text x="${xx}" y="${yy}" text-anchor="${a}" font-size="11.5" font-weight="700" fill="${k==='quick'?'var(--accent)':'var(--muted)'}">${esc(t.quad[k])}</text>`);
    const seen={}; rows.forEach((r,i)=>{ const key=r.e+'-'+val(r); const o=(seen[key]=(seen[key]||0)+1)-1; const cx=x(+r.e)+o*13, cy=y(Math.max(1,val(r)));
      g+=`<circle cx="${cx}" cy="${cy}" r="11" fill="${quad(r)==='quick'?'var(--accent)':'var(--fg-2)'}"/><text x="${cx}" y="${cy+4}" text-anchor="middle" font-size="11" font-weight="700" fill="var(--bg)">${i+1}</text>`; });
    $('#pMat',host).innerHTML=`<svg viewBox="0 0 ${W} ${H}" style="direction:ltr" role="img" aria-label="${esc(t.axisY)}">${g}</svg>`;
    const order=rows.map((r,i)=>({r,i})).sort((a,b)=>sc(b.r)-sc(a.r));
    $('#pRank',host).innerHTML=order.map(({r,i})=>`<li><span class="no num">${i+1}</span><div><b>${esc(r.n||'—')}</b><span class="qchip ${quad(r)}">${t.quad[quad(r)]}</span><p>${t.quadD[quad(r)]}</p></div><span class="num sc">${sc(r).toFixed(1)}</span></li>`).join('');
  }
  const all=()=>{ table(); chart(); };
  host.addEventListener('input',e=>{ const el=e.target; if(el.dataset.i==null) return; const r=rows[+el.dataset.i]; r[el.dataset.k]= el.dataset.k==='n'?el.value:+el.value; save(); if(el.dataset.k!=='n'){ $$('#pBody tr',host)[+el.dataset.i].querySelector('b').textContent=sc(r).toFixed(1); } chart(); });
  host.addEventListener('change',e=>{ if(e.target.tagName==='SELECT') host.dispatchEvent(new Event('input')); });
  $('#pBody',host).addEventListener('click',e=>{ const b=e.target.closest('[data-del]'); if(!b) return; rows.splice(+b.dataset.del,1); save(); all(); });
  $('#pAdd',host).onclick=()=>{ rows.push({n:'',f:3,i:3,e:3}); save(); all(); const ins=$$('#pBody input',host); ins[ins.length-1].focus(); };
  $('#pImp',host).onclick=()=>{ let j=null; try{ j=JSON.parse(localStorage.getItem('cxk-journey-v2')||'null'); }catch(e){}
    const pains=(j&&j.stages||[]).filter(s=>(s.pain||'').trim()).map(s=>{ const fr=window.CXK_Friction?window.CXK_Friction(s).total:50; return {n:(s.n?s.n+': ':'')+s.pain.trim().split(/\n/)[0].slice(0,90), f:3, i:Math.max(1,Math.min(5,Math.round(fr/20))), e:3}; });
    if(!pains.length){ X.toast(t.noJourney); return; } rows=pains; save(); all(); X.toast(t.importedN(pains.length)); };
  $('#pCsv',host).onclick=()=>download('cx-priorities.csv',[[t.pName,t.pFreq,t.pImp,t.pEff,t.pScore,''].map(csvCell).join(','),...rows.map(r=>[r.n,r.f,r.i,r.e,sc(r).toFixed(2),t.quad[quad(r)]].map(csvCell).join(','))].join('\n'));
  all();
}

/* ---------- منشئ الاستبيان ---------- */
function survey(host, X){
  const t=T[X.LANG], en=X.LANG==='en', SV=K.survey, li=en?1:0;
  const REC={digital:'ces',call:'csat',visit:'csat',closed:'ces',annual:'nps'};
  let m='digital', met='ces', drv=['clarity','speed'], open=true;
  host.innerHTML=`<p class="csum" style="margin-top:18px">${t.survIntro}</p><div class="surv"><div class="sopts">
    <fieldset><legend>${t.moment}</legend><div class="chips" id="sM">${Object.entries(SV.moments).map(([k,v])=>`<button type="button" class="chip" data-k="${k}">${esc(v[li])}</button>`).join('')}</div></fieldset>
    <fieldset><legend>${t.metric}</legend><div class="chips" id="sMet"></div></fieldset>
    <fieldset><legend>${t.drivers}</legend><div class="chks" id="sD">${Object.entries(SV.drivers).map(([k,v])=>`<label class="chk"><input type="checkbox" value="${k}"> ${esc(v[li])}</label>`).join('')}</div></fieldset>
    <label class="chk"><input type="checkbox" id="sOpen" checked> ${t.openQ}</label></div>
    <div class="sout" id="sOut"></div></div>`;
  function qs(){ const q=[];
    if(met==='csat') q.push([t.q.csat(t.mPhrase[m]), t.scales.csat]);
    if(met==='ces') q.push([t.q.ces(), t.scales.ces]);
    if(met==='nps') q.push([t.q.nps(), t.scales.nps]);
    if(m==='call'||m==='closed') q.push([t.q.resolve(), t.yesno]);
    drv.forEach(d=>q.push([t.q.driver(SV.drivers[d][li]), t.scales.driver]));
    if(open) q.push([t.q.open(), t.text]);
    return q; }
  function render(){
    $$('#sM .chip',host).forEach(b=>b.setAttribute('aria-pressed',b.dataset.k===m));
    $('#sMet',host).innerHTML=Object.entries(SV.metrics).map(([k,v])=>`<button type="button" class="chip" data-k="${k}" aria-pressed="${k===met}">${esc(v[li])}${REC[m]===k?` <small>· ${t.recommended}</small>`:''}</button>`).join('');
    $$('#sD input',host).forEach(c=>{ c.checked=drv.includes(c.value); c.disabled=!c.checked&&drv.length>=3; });
    const q=qs(), secs=q.reduce((a,x)=>a+(x[1]===t.text?30:12),0);
    const warn=[]; if(met==='nps'&&m!=='annual') warn.push(t.warnNps); else if(met==='nps') warn.push(t.warnNps); if(q.length>5) warn.push(t.warnLong);
    $('#sOut',host).innerHTML=`<h3 class="h3">${t.questions}</h3><ol class="sq">${q.map(x=>`<li><b>${esc(x[0])}</b><span>${t.scale}: ${esc(x[1])}</span></li>`).join('')}</ol>
      <div class="smeta"><div><span class="kicker">${t.when}</span><p>${t.timing[m]}</p></div><div><span class="kicker">${t.length}</span><p>${t.sec(secs)}</p></div></div>
      ${warn.map(w=>`<p class="warn">${w}</p>`).join('')}
      <div class="row-btns"><button class="btn sm pri" type="button" id="sCopy">${t.copyAll}</button><button class="btn sm" type="button" id="sCsv">${t.csv}</button></div>`;
    $('#sCopy',host).onclick=()=>X.copy(q.map((x,i)=>`${i+1}. ${x[0]}\n   ${t.scale}: ${x[1]}`).join('\n'));
    $('#sCsv',host).onclick=()=>download('cx-survey.csv',[['#',t.questions,t.scale].map(csvCell).join(','),...q.map((x,i)=>[i+1,x[0],x[1]].map(csvCell).join(','))].join('\n'));
  }
  $('#sM',host).onclick=e=>{ const b=e.target.closest('[data-k]'); if(!b) return; m=b.dataset.k; met=REC[m]; render(); };
  $('#sMet',host).onclick=e=>{ const b=e.target.closest('[data-k]'); if(!b) return; met=b.dataset.k; render(); };
  $('#sD',host).onchange=e=>{ const v=e.target.value; drv=e.target.checked?[...drv,v].slice(0,3):drv.filter(x=>x!==v); render(); };
  $('#sOpen',host).onchange=e=>{ open=e.target.checked; render(); };
  render();
}

/* ---------- أنماط الانكسار ---------- */
function patterns(host, X, arg){
  const t=T[X.LANG], en=X.LANG==='en', li=en?1:0; let st='all', q='';
  const cnt=k=>K.patterns.filter(p=>p.st===k).length;
  host.innerHTML=`<p class="csum" style="margin-top:18px">${t.patIntro}</p>
   <div class="jstrip" aria-label="${t.stageStrip}">${Object.entries(K.stages).map(([k,v])=>`<button type="button" data-k="${k}"><b>${esc(v[li])}</b><span class="num">${cnt(k)}</span></button>`).join('')}</div>
   <div class="filters"><div class="chips" id="pst"><button type="button" class="chip" data-k="all" aria-pressed="true">${t.allStages}</button>${Object.entries(K.stages).map(([k,v])=>`<button type="button" class="chip" data-k="${k}" aria-pressed="false">${esc(v[li])}</button>`).join('')}</div>
   <label class="field"><span class="sr">${t.searchPat}</span>${X.I.search}<input id="pq" type="search" placeholder="${t.searchPat}" autocomplete="off"></label></div>
   <div class="pats" id="pl"></div>`;
  const nz=s=>nAr(s);
  function render(){ const n=nz(q.trim()); const l=K.patterns.filter(p=>(st==='all'||p.st===st)&&(!n||nz([p.n,p.n_en,p.sym,p.sym_en,p.fix,p.fix_en].join(' ')).includes(n)));
    $$('#pst .chip',host).forEach(b=>b.setAttribute('aria-pressed',b.dataset.k===st)); $$('.jstrip button',host).forEach(b=>b.classList.toggle('on',b.dataset.k===st));
    $('#pl',host).innerHTML=l.map(p=>`<article class="pat" id="p-${p.id}"><div class="ph"><span class="stg">${esc(K.stages[p.st][li])}</span><h3>${esc(en?p.n_en:p.n)}</h3></div>
      <dl><div><dt>${t.symptom}</dt><dd>${esc(en?p.sym_en:p.sym)}</dd></div><div><dt>${t.measure}</dt><dd>${esc(en?p.sig_en:p.sig)}</dd></div><div class="fx"><dt>${t.treat}</dt><dd>${esc(en?p.fix_en:p.fix)}</dd></div>${(en?p.ex_en:p.ex)?`<div><dt>${t.example}</dt><dd>${esc(en?p.ex_en:p.ex)}</dd></div>`:''}</dl></article>`).join('')||`<p class="empty">${t.noPat}</p>`; }
  $('#pst',host).onclick=e=>{ const b=e.target.closest('[data-k]'); if(b){ st=b.dataset.k; render(); } };
  $('.jstrip',host).onclick=e=>{ const b=e.target.closest('[data-k]'); if(b){ st=st===b.dataset.k?'all':b.dataset.k; render(); } };
  $('#pq',host).oninput=e=>{ q=e.target.value; render(); };
  render();
  if(arg){ const el=$('#p-'+arg,host); if(el){ setTimeout(()=>{ el.scrollIntoView({block:'start'}); el.classList.add('hit'); setTimeout(()=>el.classList.remove('hit'),2400); },60); } }
}

/* ---------- المبادئ ---------- */
function principles(host, X){
  const t=T[X.LANG], en=X.LANG==='en';
  host.innerHTML=`<p class="csum" style="margin-top:18px">${t.prIntro}</p><div class="prins">${K.principles.map(p=>`<article class="prin"><h3>${esc(en?p.n_en:p.n)}</h3><p>${esc(en?p.d_en:p.d)}</p><div class="ask"><span class="kicker">${t.askTeam}</span><p>${esc(en?p.q_en:p.q)}</p></div></article>`).join('')}</div>`;
}

window.CXK_TOOLS = { voc, msg, prio, survey, patterns, principles };
window.CXK_PatternOfDay = function(lang){ const d=Math.floor(Date.now()/864e5); return K.patterns[d%K.patterns.length]; };
})();
