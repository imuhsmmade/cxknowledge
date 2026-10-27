/* قيّم رحلتك: إدخال الرحلة (مراحل، أو ملف PDF/نص، أو رحلة مرسومة) ← اختيار منهجية ← تقييم أولي آلي يؤكده المستخدم ← تقرير */
(function(){
"use strict";
const M = window.CXK_METHODS;
const $ = (s,el=document)=>el.querySelector(s), $$=(s,el=document)=>[...el.querySelectorAll(s)];
const esc = s => String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const nz = s => String(s||'').toLowerCase().replace(/[ً-ْـ]/g,'').replace(/[أإآ]/g,'ا').replace(/ة/g,'ه').replace(/ى/g,'ي');
const isAr = s => /[؀-ۿ]/.test(s);
const reEsc = s => s.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');
const KEY='cxk-assess-v1', CKEY='cxk-assess-custom-v1';
const NEG = ["لا","لم","لن","دون","بدون","غير","ليس","ليست","عدم","ما","no","not","without","never","none","lack","missing"];

const T = {
ar:{ s1:"الرحلة", s2:"المنهجية", s3:"التقييم", s4:"التقرير",
  intro:"قيّم أي رحلة عميل مقابل منهجية معتمدة. أدخل الرحلة مرحلةً مرحلة، أو ارفع وصفها في ملف PDF أو نص، أو استورد الرحلة التي رسمتها. تقترح الأداة درجة أولية لكل معيار مع الأدلة من النص، ثم تؤكد أنت الدرجة وتحصل على تقرير بالفجوات والتوصيات.",
  privacy:"يُقرأ الملف ويُحلل داخل متصفحك، ولا يُرفع إلى أي خادم.",
  tabs:{stages:"اكتب المراحل",file:"ارفع ملفاً",paste:"الصق نصاً",journey:"استورد رحلتك المرسومة"},
  jname:"اسم الرحلة", stage:"المرحلة", stageName:"اسم المرحلة", stageDesc:"ماذا يحدث فيها؟ (ما يفعله العميل، والقنوات، والمستندات، والمدة، والتحويلات، والإشعارات)", add:"+ أضف مرحلة", del:"احذف", sample:"حمّل مثالاً", clear:"ابدأ من جديد",
  fileHint:"ارفع ملف PDF أو TXT يصف الرحلة (دراسة الوضع الحالي، أو دليل الخدمة، أو خريطة رحلة مصدّرة).", pick:"اختر ملفاً", reading:"جارٍ قراءة الملف…", readOk:(p,n)=>`قُرئ الملف: ${p} صفحة، ${n} كلمة. راجع النص أدناه وعدّله إن لزم.`, readFail:"تعذّرت قراءة الملف. جرّب ملفاً آخر أو الصق النص.", scanned:"لم يُستخرج نص من الملف؛ ربما يكون صوراً ممسوحة. الصق النص يدوياً.",
  rtlWarn:"إذا ظهر النص العربي المستخرج مقلوب الترتيب، فانسخه من الملف الأصلي والصقه في «الصق نصاً».",
  pasteHint:"الصق وصف الرحلة. كل فقرة أو سطر يُعامل كجزء من الرحلة.",
  noJourney:"لا توجد رحلة محفوظة في أداة «ارسم الرحلة» على هذا المتصفح.", imported:n=>`استوردتُ ${n} مراحل من رحلتك المرسومة.`, openTool:"افتح «ارسم الرحلة»",
  method:"اختر منهجية التقييم", custom:"منهجيتك الخاصة", customD:"ارفع منهجيتك في ملف CSV بالأعمدة: المعيار، الوزن، السؤال، كلمات إيجابية، كلمات سلبية، التوصية. أو نزّل القالب وعبّئه.", upload:"ارفع منهجيتك", template:"نزّل القالب", customOk:n=>`حُمّلت منهجيتك: ${n} معايير.`, customBad:"الملف لا يطابق القالب. تأكد من الأعمدة.", srcLink:"مصدر المنهجية",
  crit:"المعيار", weight:"الوزن", auto:"اقتراح الأداة", noEv:"لا دليل في النص: قيّمه بنفسك", evidence:"الأدلة من النص", yourScore:"درجتك", note:"ملاحظة", notePh:"دليل أو تعليق (اختياري)", confirmed:"أكدتَ", of:"من",
  overall:"النتيجة الكلية", band:"المستوى", gaps:"أولويات التحسين", strengths:"نقاط القوة", rec:"التوصية", learnMore:"اقرأ المزيد", byCrit:"النتيجة لكل معيار",
  confirmedN:(a,b)=>`أكدتَ ${a} من ${b} معايير`, approx:"الدرجات المقترحة تقديرية من كلمات دالة في النص، وقد تخطئ في فهم السياق. راجع كل معيار وأكد درجته قبل اعتماد التقرير.",
  print:"اطبع أو احفظ PDF", csv:"نزّل CSV", copy:"انسخ الملخص", acceptAll:"اعتمد كل الاقتراحات", resetScores:"أعد الاقتراحات",
  reportT:"تقرير تقييم الرحلة", method2:"المنهجية", date:"التاريخ", empty:"أدخل الرحلة أولاً في الخطوة 1.",
  stats:{stages:"مراحل",handoffs:"تحويلات",docs:"مستندات",visits:"زيارات",days:"يوماً مذكورة"}
},
en:{ s1:"The journey", s2:"Methodology", s3:"Assessment", s4:"Report",
  intro:"Assess any customer journey against an established methodology. Enter the journey stage by stage, upload a PDF or text describing it, or import the journey you mapped. The tool suggests a first score per criterion with evidence from the text; you confirm each score and get a report of gaps and recommendations.",
  privacy:"Files are read and analysed in your browser and never uploaded.",
  tabs:{stages:"Write the stages",file:"Upload a file",paste:"Paste text",journey:"Import your mapped journey"},
  jname:"Journey name", stage:"Stage", stageName:"Stage name", stageDesc:"What happens here? (customer actions, channels, documents, time, handoffs, notifications)", add:"+ Add stage", del:"Delete", sample:"Load an example", clear:"Start over",
  fileHint:"Upload a PDF or TXT describing the journey (a current-state study, a service guide or an exported journey map).", pick:"Choose a file", reading:"Reading the file…", readOk:(p,n)=>`File read: ${p} pages, ${n} words. Review the text below and edit if needed.`, readFail:"Couldn't read the file. Try another file or paste the text.", scanned:"No text was extracted; the file may be scanned images. Paste the text instead.",
  rtlWarn:"If extracted Arabic text appears in reverse order, copy it from the original file and use \"Paste text\".",
  pasteHint:"Paste the journey description. Each paragraph or line is treated as part of the journey.",
  noJourney:"There's no saved journey from the \"Map a journey\" tool in this browser.", imported:n=>`Imported ${n} stages from your mapped journey.`, openTool:"Open \"Map a journey\"",
  method:"Choose the assessment methodology", custom:"Your own methodology", customD:"Upload your methodology as a CSV with columns: criterion, weight, question, positive keywords, negative keywords, recommendation. Or download the template and fill it in.", upload:"Upload your methodology", template:"Download template", customOk:n=>`Your methodology is loaded: ${n} criteria.`, customBad:"The file doesn't match the template. Check the columns.", srcLink:"Methodology source",
  crit:"Criterion", weight:"Weight", auto:"Tool suggests", noEv:"No evidence in the text: score it yourself", evidence:"Evidence from the text", yourScore:"Your score", note:"Note", notePh:"Evidence or comment (optional)", confirmed:"Confirmed", of:"of",
  overall:"Overall score", band:"Level", gaps:"Improvement priorities", strengths:"Strengths", rec:"Recommendation", learnMore:"Read more", byCrit:"Score by criterion",
  confirmedN:(a,b)=>`${a} of ${b} criteria confirmed`, approx:"Suggested scores are estimates from keywords in the text and can misread context. Review each criterion and confirm its score before relying on the report.",
  print:"Print or save PDF", csv:"Download CSV", copy:"Copy summary", acceptAll:"Accept all suggestions", resetScores:"Reset suggestions",
  reportT:"Journey assessment report", method2:"Methodology", date:"Date", empty:"Enter the journey first in step 1.",
  stats:{stages:"stages",handoffs:"handoffs",docs:"documents",visits:"visits",days:"days mentioned"}
}};

function load(){ try{ return JSON.parse(localStorage.getItem(KEY)||'null'); }catch(e){ return null; } }
function save(st){ try{ localStorage.setItem(KEY,JSON.stringify(st)); }catch(e){} }
function loadCustom(){ try{ return JSON.parse(localStorage.getItem(CKEY)||'null'); }catch(e){ return null; } }
function methods(){ const c=loadCustom(); return c?M.list.concat([c]):M.list; }
function download(name, text, type){ const b=new Blob(['﻿'+text],{type:type||'text/csv;charset=utf-8'}); const a=document.createElement('a'); a.href=URL.createObjectURL(b); a.download=name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(a.href),2000); }
const csvCell = v => '"'+String(v==null?'':v).replace(/"/g,'""')+'"';
function parseCSV(text){ const rows=[]; let row=[], cur='', q=false; for(let i=0;i<text.length;i++){ const ch=text[i];
  if(q){ if(ch==='"'){ if(text[i+1]==='"'){ cur+='"'; i++; } else q=false; } else cur+=ch; }
  else if(ch==='"') q=true; else if(ch===','||ch===';'||ch==='\t'){ row.push(cur); cur=''; } else if(ch==='\n'||ch==='\r'){ if(ch==='\r'&&text[i+1]==='\n') i++; row.push(cur); rows.push(row); row=[]; cur=''; } else cur+=ch; }
  if(cur||row.length){ row.push(cur); rows.push(row); } return rows.filter(r=>r.some(c=>c.trim())); }


/* إعادة بناء أسطر PDF: تجميع العناصر بحسب السطر، وترتيبها من اليمين لليسار في الأسطر العربية */
function pdfLines(items){
  const rows=[];
  items.forEach(it=>{ if(!it.str||!it.str.trim()) return; const y=it.transform[5], x=it.transform[4], h=Math.abs(it.transform[3])||10;
    let r=rows.find(r=>Math.abs(r.y-y)<h*0.5); if(!r){ r={y,items:[]}; rows.push(r); } r.items.push({x,w:it.width||0,s:it.str}); });
  rows.sort((a,b)=>b.y-a.y);
  return rows.map(r=>{ const txt=r.items.map(i=>i.s).join(''), ar=(txt.match(/[\u0600-\u06FF]/g)||[]).length, lat=(txt.match(/[A-Za-z]/g)||[]).length;
    const rtl=ar>lat; r.items.sort((a,b)=>rtl?(b.x-a.x):(a.x-b.x)); return r.items.map(i=>i.s).join(' '); });
}
/* إصلاحات شائعة لنص عربي مستخرج من PDF */
function fixArabic(t){
  t=t.normalize('NFKC').replace(/[\u064B-\u0652\u0670\u0640]/g,'').replace(/[\u0000-\u0009\u000B-\u001F\u200B-\u200F\u202A-\u202E\u2066-\u2069\u00A0]/g,' ').replace(/[ \t]+/g,' ');
  t=t.replace(/(^|\s)ال(?=\s|$|[.،,؛])/g,'$1لا').replace(/(^|\s)وال(?=\s|$)/g,'$1ولا').replace(/(^|\s)فال(?=\s|$)/g,'$1فلا');
  t=t.replace(/اإل/g,'الإ').replace(/األ/g,'الأ').replace(/اآل/g,'الآ');
  t=t.replace(/(^|\s)([\u0600-\u06FF])\s+(?=[\u0600-\u06FF]{2,})/g,'$1$2');
  return t;
}

/* ---------- التحليل ---------- */
function corpus(st){
  if(st.src==='stages'||st.src==='journey') return (st.stages||[]).map(s=>[s[0],s[1]]);
  const txt=String(st.text||'').trim(); if(!txt) return [];
  return txt.split(/\n{1,}/).map(p=>p.trim()).filter(p=>p.length>2).map(p=>['',p]);
}
function sentences(parts){ const out=[]; parts.forEach(([n,d],pi)=>{ String(d||'').split(/(?<=[.!؟?؛;])\s+|\n+/).map(x=>x.trim()).filter(x=>x.length>3).forEach(x=>out.push({stage:n,text:x,pi})); if(n&&!d) out.push({stage:n,text:n,pi}); }); return out; }
function findKw(sent, kw){ const t=nz(sent), k=nz(kw); if(isAr(k)){ const i=t.indexOf(k); return i; } const m=new RegExp('(^|[^a-z])'+reEsc(k)+'([^a-z]|$)','i').exec(t); return m?m.index+m[1].length:-1; }
function negated(sent, idx){ const before=nz(sent).slice(0,idx).split(/\s+/).filter(Boolean).slice(-5); return before.some(w=>NEG.includes(w)||NEG.includes(w.replace(/^[وف]/,''))); }
function hitsFor(sents, key, lang){ const sg=M.signals[key]; if(!sg) return []; const kws=[...(sg.ar||[]),...(sg.en||[])], out=[];
  sents.forEach(s=>{ for(const k of kws){ const i=findKw(s.text,k); if(i>=0){ out.push({s, k, neg:negated(s.text,i)}); break; } } }); return out; }
function stats(st, sents){
  const all=sents.map(s=>s.text).join(' '), n=nz(all);
  const days=[...all.matchAll(/(\d+)\s*(يوم|أيام|ايام|يوماً|days?|working days|أسبوع|أسابيع|اسابيع|weeks?|شهر|أشهر|اشهر|months?)/gi)].reduce((a,m)=>{ const v=+m[1], u=nz(m[2]); return a+(/اسبوع|اسابيع|week/.test(u)?v*7:/شهر|اشهر|month/.test(u)?v*30:v); },0);
  const cnt=key=>hitsFor(sents,key).filter(h=>!h.neg).length;
  const r={stages:(st.src==='stages'||st.src==='journey')?(st.stages||[]).length:0, handoffs:cnt('handoff'), docs:cnt('docs'), visits:cnt('visit'), days};
  if(st.src==='journey'&&st.nums){ r.handoffs=Math.max(r.handoffs,st.nums.h); r.switches=st.nums.ch; r.emoMin=st.nums.emoMin; r.days=Math.max(r.days,Math.round(st.nums.t/24)); }
  return r;
}
function suggest(crit, sents, S){
  let pos=0, neg=0; const ev=[];
  (crit.pos||[]).forEach(k=>hitsFor(sents,k).forEach(h=>{ if(h.neg){ neg+=1; ev.push({...h,p:-1}); } else { pos+=1; ev.push({...h,p:1}); } }));
  (crit.neg||[]).forEach(k=>hitsFor(sents,k).forEach(h=>{ if(h.neg){ pos+=1; ev.push({...h,p:1}); } else { neg+=1; ev.push({...h,p:-1}); } }));
  (crit.kw_pos||[]).forEach(k=>sents.forEach(s=>{ const i=findKw(s.text,k); if(i>=0){ const ng=negated(s.text,i); if(ng){neg++;} else pos++; ev.push({s,k,p:ng?-1:1}); } }));
  (crit.kw_neg||[]).forEach(k=>sents.forEach(s=>{ const i=findKw(s.text,k); if(i>=0){ const ng=negated(s.text,i); if(ng){pos++;} else neg++; ev.push({s,k,p:ng?1:-1}); } }));
  let adj=0;
  if(crit.struct==='steps' && S.stages) adj += S.stages>8?-1:S.stages<=4?0.5:0;
  if(crit.struct==='handoffs') adj += S.handoffs>=3?-1:S.handoffs===0&&sents.length>3?0.5:0;
  if(crit.struct==='time' && S.days) adj += S.days>30?-1:S.days>10?-0.5:0.25;
  if(crit.struct==='switches' && S.switches!=null) adj += S.switches>=2?-1:S.switches===0?0.5:0;
  if(crit.struct==='emotion' && S.emoMin!=null) adj += S.emoMin<=-2?-1:S.emoMin>=0?0.5:0;
  if(!pos && !neg && !adj) return {v:null, ev:[]};
  const v=Math.max(0,Math.min(4,Math.round(1.5+0.6*Math.min(pos,3)-0.75*Math.min(neg,3)+adj)));
  const seen=new Set(), uniq=ev.filter(e=>{ const k=e.s.text; if(seen.has(k)) return false; seen.add(k); return true; });
  return {v, ev:uniq.sort((a,b)=>a.p-b.p).slice(0,4)};
}
function hl(text, kw){ const i=findKw(text,kw); if(i<0) return esc(text); /* موضع تقريبي بعد التطبيع؛ نبحث عن الكلمة الأصلية */ const re=new RegExp(reEsc(kw),'i'); const m=re.exec(text); return m?esc(text.slice(0,m.index))+'<mark>'+esc(m[0])+'</mark>'+esc(text.slice(m.index+m[0].length)):esc(text); }

/* ---------- الواجهة ---------- */
function assess(host, X){
  const t=T[X.LANG], en=X.LANG==='en', li=en?2:1;
  let st=load() || {src:'stages', name:'', stages:[], text:'', method:'jdm', scores:{}};
  if(!st.stages.length && !st.text){ const smp=M.sample[en?'en':'ar']; st.name=smp.name; st.stages=smp.stages.map(x=>x.slice()); }
  const persist=()=>save(st);
  host.innerHTML=`<p class="csum" style="margin-top:18px">${t.intro}</p><p class="note">${t.privacy}</p>
   <ol class="asteps">
    <li class="ast"><div class="ah"><span class="no">1</span><h2>${t.s1}</h2></div>
      <div class="jtabs atabs" role="tablist">${Object.entries(t.tabs).map(([k,v])=>`<button type="button" role="tab" data-src="${k}">${v}</button>`).join('')}</div>
      <div id="aIn"></div></li>
    <li class="ast"><div class="ah"><span class="no">2</span><h2>${t.s2}</h2></div><div id="aMeth"></div></li>
    <li class="ast"><div class="ah"><span class="no">3</span><h2>${t.s3}</h2></div><p class="note">${t.approx}</p><div id="aStats" class="astats"></div><div id="aCrit" class="acrit"></div></li>
    <li class="ast" id="asReport"><div class="ah"><span class="no">4</span><h2>${t.s4}</h2></div><div id="aRep"></div></li>
   </ol>`;

  /* الخطوة 1 */
  function input(){
    $$('.atabs button',host).forEach(b=>b.setAttribute('aria-selected',b.dataset.src===st.src));
    const box=$('#aIn',host);
    if(st.src==='stages'){
      box.innerHTML=`<label class="afield">${t.jname}<input id="aName" type="text" value="${esc(st.name)}"></label>
        <div class="astages">${st.stages.map((s,i)=>`<div class="arow"><span class="num">${i+1}</span><div class="ain"><input type="text" data-i="${i}" data-k="0" value="${esc(s[0])}" placeholder="${t.stageName}" aria-label="${t.stageName} ${i+1}"><textarea data-i="${i}" data-k="1" rows="2" placeholder="${t.stageDesc}" aria-label="${t.stageDesc}">${esc(s[1])}</textarea></div><button type="button" class="x" data-del="${i}" aria-label="${t.del}">×</button></div>`).join('')}</div>
        <div class="row-btns"><button class="btn sm" type="button" id="aAdd">${t.add}</button><button class="btn sm" type="button" id="aSample">${t.sample}</button><button class="btn sm ghost" type="button" id="aClear">${t.clear}</button></div>`;
      $('#aName',box).oninput=e=>{ st.name=e.target.value; persist(); };
      box.querySelector('.astages').oninput=e=>{ const el=e.target; if(el.dataset.i==null) return; st.stages[+el.dataset.i][+el.dataset.k]=el.value; persist(); analyse(); };
      box.querySelector('.astages').onclick=e=>{ const b=e.target.closest('[data-del]'); if(!b) return; st.stages.splice(+b.dataset.del,1); persist(); input(); analyse(); };
      $('#aAdd',box).onclick=()=>{ st.stages.push(['','']); persist(); input(); const ins=$$('.astages input',box); ins[ins.length-1].focus(); };
      $('#aSample',box).onclick=()=>{ const smp=M.sample[en?'en':'ar']; st.name=smp.name; st.stages=smp.stages.map(x=>x.slice()); st.scores={}; persist(); input(); analyse(); };
      $('#aClear',box).onclick=()=>{ st.name=''; st.stages=[['','']]; st.text=''; st.scores={}; persist(); input(); analyse(); };
    } else if(st.src==='file'||st.src==='paste'){
      box.innerHTML=`${st.src==='file'?`<p class="note">${t.fileHint}</p><div class="row-btns"><label class="btn sm pri" for="aFile" style="cursor:pointer">${t.pick}</label><input id="aFile" type="file" accept=".pdf,.txt,application/pdf,text/plain" hidden><span class="srcl" id="aFileMsg">${st.fileName?esc(st.fileName):''}</span></div><p class="note">${t.rtlWarn}</p>`:`<p class="note">${t.pasteHint}</p>`}
        <label class="afield">${t.jname}<input id="aName" type="text" value="${esc(st.name)}"></label>
        <textarea id="aText" class="ta" rows="12" dir="auto">${esc(st.text)}</textarea>`;
      $('#aName',box).oninput=e=>{ st.name=e.target.value; persist(); };
      $('#aText',box).oninput=e=>{ st.text=e.target.value; persist(); analyse(); };
      const f=$('#aFile',box); if(f) f.onchange=e=>readFile(e.target.files[0]);
    } else {
      let j=null; try{ j=JSON.parse(localStorage.getItem('cxk-journey-v2')||'null'); }catch(e){}
      if(!j||!Array.isArray(j.stages)||!j.stages.length){ box.innerHTML=`<p class="empty">${t.noJourney} <a href="${X.href('tools/tool')}">${t.openTool}</a></p>`; return; }
      st.name=j.name||''; st.stages=j.stages.map(s=>[s.n||'', [s.goal,s.act,s.tp,s.sys,s.pain,s.opp,s.kpi].filter(Boolean).join('. ')]);
      st.nums={h:j.stages.reduce((a,s)=>a+(+s.h||0),0), ch:j.stages.reduce((a,s)=>a+(+s.ch?1:0),0), t:j.stages.reduce((a,s)=>a+(+s.t||0),0), emoMin:Math.min(...j.stages.map(s=>+s.emo||0))};
      persist();
      box.innerHTML=`<p class="okmsg">${t.imported(st.stages.length)} <b>${esc(st.name)}</b></p><ol class="ilist">${st.stages.map(s=>`<li><b>${esc(s[0])}</b> <span>${esc(s[1]).slice(0,160)}</span></li>`).join('')}</ol>`;
    }
  }
  async function readFile(file){
    if(!file) return; const msg=$('#aFileMsg',host); msg.textContent=t.reading; st.fileName=file.name;
    try{
      let text='', pages=1;
      if(/\.pdf$/i.test(file.name)||file.type==='application/pdf'){
        if(!window.pdfjsLib){ await new Promise((ok,no)=>{ const s=document.createElement('script'); s.src='assets/vendor/pdf.min.js'; s.onload=ok; s.onerror=no; document.head.appendChild(s); }); }
        window.pdfjsLib.GlobalWorkerOptions.workerSrc='assets/vendor/pdf.worker.min.js';
        const pdf=await window.pdfjsLib.getDocument({data:await file.arrayBuffer()}).promise; pages=pdf.numPages; const out=[];
        for(let p=1;p<=pdf.numPages;p++){ const c=await (await pdf.getPage(p)).getTextContent(); out.push(...pdfLines(c.items)); out.push(''); }
        text=fixArabic(out.join('\n')).replace(/[ \t]+/g,' ').replace(/\n{3,}/g,'\n\n').trim();
      } else { text=await file.text(); }
      if(!text.trim()){ msg.textContent=t.scanned; return; }
      st.text=text; if(!st.name) st.name=file.name.replace(/\.[^.]+$/,''); st.scores={}; persist(); input();
      $('#aFileMsg',host).textContent=t.readOk(pages, text.split(/\s+/).length); analyse();
    }catch(e){ msg.textContent=t.readFail; }
  }
  $('.atabs',host).onclick=e=>{ const b=e.target.closest('[data-src]'); if(!b) return; st.src=b.dataset.src; if(st.src!=='journey') delete st.nums; persist(); input(); analyse(); };

  /* الخطوة 2 */
  function meth(){
    const box=$('#aMeth',host), list=methods();
    box.innerHTML=`<div class="mcards">${list.map(m=>`<label class="mcard${m.id===st.method?' on':''}"><input type="radio" name="am" value="${m.id}" ${m.id===st.method?'checked':''}><b>${esc(en?m.n_en:m.n)}</b><span>${esc(en?m.d_en:m.d)}</span><small>${m.crit.length} ${en?'criteria':'معايير'}${m.src?` · <a href="${esc(m.src)}" target="_blank" rel="noopener">${t.srcLink}</a>`:''}</small></label>`).join('')}
      <div class="mcard up"><b>${t.custom}</b><span>${t.customD}</span><div class="row-btns"><label class="btn sm" for="aCsv" style="cursor:pointer">${t.upload}</label><input id="aCsv" type="file" accept=".csv,.json,text/csv,application/json" hidden><button class="btn sm ghost" type="button" id="aTpl">${t.template}</button></div><small id="aCMsg"></small></div></div>`;
    box.querySelector('.mcards').onchange=e=>{ if(e.target.name==='am'){ st.method=e.target.value; st.scores={}; persist(); meth(); analyse(); } };
    $('#aTpl',box).onclick=()=>download('cx-methodology-template.csv',[['criterion','weight','question','positive_keywords','negative_keywords','recommendation'].map(csvCell).join(','),['الوضوح قبل البدء','10','هل يعرف العميل المتطلبات والمدة قبل البدء؟','المتطلبات|المدة|الرسوم','مستند ناقص|غير واضح','أضف صفحة «قبل أن تبدأ».'].map(csvCell).join(','),['مالك واحد للحالة','10','هل للحالة مالك واحد حتى الحل؟','مسؤول الحالة|مالك','تحويل|إحالة','عيّن مالكاً واحداً للحالة.'].map(csvCell).join(',')].join('\n'));
    $('#aCsv',box).onchange=async e=>{ const f=e.target.files[0]; if(!f) return; const txt=await f.text(); let m=null;
      try{ if(/\.json$/i.test(f.name)){ m=JSON.parse(txt); } else { const rows=parseCSV(txt.replace(/^﻿/,'')); const head=rows[0].map(h=>nz(h)); const body=/criterion|المعيار/.test(head.join(' '))?rows.slice(1):rows;
          m={ id:'custom', n:'منهجيتك الخاصة', n_en:'Your methodology', d:f.name, d_en:f.name, crit: body.filter(r=>r[0]&&r[0].trim()).map((r,i)=>({ id:'c'+i, n:r[0].trim(), n_en:r[0].trim(), w:+r[1]||10, q:r[2]||'', q_en:r[2]||'', kw_pos:(r[3]||'').split(/[|،,]/).map(s=>s.trim()).filter(Boolean), kw_neg:(r[4]||'').split(/[|،,]/).map(s=>s.trim()).filter(Boolean), rec:r[5]||'', rec_en:r[5]||'' })) }; }
        if(!m||!Array.isArray(m.crit)||!m.crit.length) throw 0; m.id='custom';
        try{ localStorage.setItem(CKEY,JSON.stringify(m)); }catch(_){}
        st.method='custom'; st.scores={}; persist(); meth(); analyse(); $('#aCMsg',host).textContent=t.customOk(m.crit.length);
      }catch(_){ $('#aCMsg',box).textContent=t.customBad; } e.target.value=''; };
  }

  /* الخطوة 3 و4 */
  let cur=null;
  function analyse(){
    const m=methods().find(x=>x.id===st.method)||M.list[0], sents=sentences(corpus(st)), S=stats(st,sents);
    if(!sents.length){ $('#aCrit',host).innerHTML=`<p class="empty">${t.empty}</p>`; $('#aStats',host).innerHTML=''; $('#aRep',host).innerHTML=''; return; }
    $('#aStats',host).innerHTML=Object.entries(t.stats).filter(([k])=>S[k]).map(([k,l])=>`<div><b class="num">${S[k]}</b><span>${l}</span></div>`).join('');
    cur={m, items:m.crit.map(c=>{ const sg=suggest(c,sents,S), sc=st.scores[c.id]||{}; return {c, sg, v: sc.v!=null?sc.v:(sg.v!=null?sg.v:null), ok:!!sc.ok, note:sc.note||''}; })};
    const m2=m; $('#aCrit',host).innerHTML=cur.items.map((it,i)=>{ const c=it.c, m=m2; return `<article class="acr${it.ok?' ok':''}" data-id="${c.id}"><div class="acr-h"><div>${m.stages&&c.st!=null?`<span class="stg">${esc(m.stages[c.st][en?1:0])}${m.gtypes&&c.gt?` · ${esc(m.gtypes[c.gt][en?1:0])}`:''}</span>`:''}<h3>${esc(en?(c.n_en||c.n):c.n)}</h3><p>${esc(en?(c.q_en||c.q):c.q)}</p></div><span class="srcl num">${t.weight} ${c.w}</span></div>
      <div class="acr-s"><span class="sug">${t.auto}: ${it.sg.v==null?`<em>${t.noEv}</em>`:`<b>${it.sg.v}/4</b> · ${esc(M.scale[it.sg.v][li])}`}</span>
       <div class="scale" role="radiogroup" aria-label="${t.yourScore}">${M.scale.map(([v,ar,enl])=>`<label class="${it.v!=null&&+v===it.v?'on':''}"><input type="radio" name="s-${c.id}" value="${v}" ${it.v!=null&&+v===it.v?'checked':''}><b>${v}</b><span>${en?enl:ar}</span></label>`).join('')}</div></div>
      ${it.sg.ev.length?`<details class="ev"><summary>${t.evidence} (${it.sg.ev.length})</summary><ul>${it.sg.ev.map(e=>`<li class="${e.p<0?'n':'p'}" dir="auto">${e.s.stage?`<b>${esc(e.s.stage)}:</b> `:''}${hl(e.s.text,e.k)}</li>`).join('')}</ul></details>`:''}
      <input class="anote" type="text" data-note="${c.id}" value="${esc(it.note)}" placeholder="${t.notePh}" aria-label="${t.note}"></article>`; }).join('')
      +`<div class="row-btns"><button class="btn sm" type="button" id="aAcc">${t.acceptAll}</button><button class="btn sm ghost" type="button" id="aRst">${t.resetScores}</button></div>`;
    $('#aAcc',host).onclick=()=>{ cur.items.forEach(it=>{ const v=it.v!=null?it.v:1; st.scores[it.c.id]={...(st.scores[it.c.id]||{}), v, ok:true}; }); persist(); analyse(); };
    $('#aRst',host).onclick=()=>{ st.scores={}; persist(); analyse(); };
    report();
  }
  $('#aCrit',host).addEventListener('change',e=>{ const r=e.target; if(r.type!=='radio') return; const id=r.name.slice(2); st.scores[id]={...(st.scores[id]||{}), v:+r.value, ok:true}; persist(); analyse(); });
  $('#aCrit',host).addEventListener('input',e=>{ const id=e.target.dataset.note; if(!id) return; st.scores[id]={...(st.scores[id]||{}), note:e.target.value}; persist(); });

  function report(){
    if(!cur) return; const items=cur.items, m=cur.m, W=items.reduce((a,x)=>a+(+x.c.w||1),0);
    const val=x=>x.v==null?0:x.v, pct=Math.round(items.reduce((a,x)=>a+(+x.c.w||1)*val(x)/4,0)/W*100);
    const band=M.bands.find(b=>pct<b[0]), conf=items.filter(x=>x.ok).length;
    const gaps=items.slice().sort((a,b)=>(val(a)-val(b))||((+b.c.w)-(+a.c.w))).slice(0,3), strong=items.filter(x=>val(x)>=3).sort((a,b)=>val(b)-val(a)).slice(0,3);
    const R=46, C=2*Math.PI*R, col=pct>=80?'var(--up)':pct>=60?'var(--fg-2)':'var(--accent)';
    $('#aRep',host).innerHTML=`<div class="arep" id="arep">
      <div class="arep-h"><div><span class="kicker">${t.reportT}</span><h3>${esc(st.name||'—')}</h3><p class="srcl">${t.method2}: ${esc(en?m.n_en:m.n)} · ${t.date}: <span dir="ltr">${new Date().toISOString().slice(0,10)}</span> · ${t.confirmedN(conf,items.length)}</p></div>
       <div class="ring"><svg viewBox="0 0 110 110" aria-hidden="true" style="direction:ltr"><circle cx="55" cy="55" r="${R}" fill="none" stroke="var(--surface-3)" stroke-width="10"/><circle cx="55" cy="55" r="${R}" fill="none" stroke="${col}" stroke-width="10" stroke-linecap="round" stroke-dasharray="${(C*pct/100).toFixed(1)} ${C.toFixed(1)}" transform="rotate(-90 55 55)"/><text x="55" y="62" text-anchor="middle" font-size="24" font-weight="700" fill="var(--fg)">${pct}%</text></svg><div><b>${esc(band[en?2:1])}</b><span class="srcl">${t.overall}</span></div></div></div>
      <div class="abars"><h4>${t.byCrit}</h4>${items.map(x=>`<div class="abr${x.ok?'':' un'}"><span class="nm">${esc(en?(x.c.n_en||x.c.n):x.c.n)}</span><span class="tr2"><i style="width:${val(x)/4*100}%"></i></span><span class="v num">${x.v==null?'—':x.v+'/4'}</span></div>`).join('')}</div>
      <div class="agrid"><section><h4>${t.gaps}</h4><ol class="agaps">${gaps.map(x=>`<li><b>${esc(en?(x.c.n_en||x.c.n):x.c.n)}</b> <span class="num">${x.v==null?'—':x.v+'/4'}</span><p>${esc(en?(x.c.rec_en||x.c.rec):x.c.rec)}</p>${x.note?`<p class="srcl">${esc(x.note)}</p>`:''}${x.c.link?`<a class="srcl" href="${X.href(x.c.link)}">${t.learnMore}</a>`:''}</li>`).join('')}</ol></section>
       <section><h4>${t.strengths}</h4>${strong.length?`<ul class="astr">${strong.map(x=>`<li><b>${esc(en?(x.c.n_en||x.c.n):x.c.n)}</b> <span class="num">${x.v}/4</span></li>`).join('')}</ul>`:'<p class="srcl">—</p>'}</section></div>
      ${m.gapReg?(()=>{ const imp=v=>v==null?['—','—']:v<=0?['مرتفع جداً','Very high']:v===1?['مرتفع','High']:v===2?['متوسط','Medium']:null; const rows=items.filter(x=>x.v==null||x.v<=2).sort((a,b)=>val(a)-val(b));
        return rows.length?`<section><h4>${en?'Gap register':'سجل الفجوات'}</h4><div class="tablewrap"><table class="gtab"><thead><tr><th>#</th><th>${en?'Gap':'الفجوة'}</th><th>${en?'Journey stage':'مرحلة الرحلة'}</th><th>${en?'Gap type':'نوع الفجوة'}</th><th>${en?'Importance':'الأهمية'}</th><th>${en?'Recommendation':'التوصية'}</th></tr></thead><tbody>${rows.map((x,i)=>{ const I=imp(x.v)||['—','—']; return `<tr><td class="num">${i+1}</td><td><b>${esc(en?(x.c.n_en||x.c.n):x.c.n)}</b>${x.note?`<br><span class="srcl">${esc(x.note)}</span>`:''}</td><td>${m.stages&&x.c.st!=null?esc(m.stages[x.c.st][en?1:0]):'—'}</td><td>${m.gtypes&&x.c.gt?esc(m.gtypes[x.c.gt][en?1:0]):'—'}</td><td><span class="imp i${x.v==null?'n':x.v}">${I[en?1:0]}</span></td><td>${esc(en?(x.c.rec_en||x.c.rec):x.c.rec)}</td></tr>`; }).join('')}</tbody></table></div><p class="note">${en?'Importance here follows the criterion score (0 very high, 1 high, 2 medium). In the full methodology, importance is set by how often the gap occurs among customers and by workshop voting.':'الأهمية هنا مبنية على درجة المعيار (0 مرتفع جداً، 1 مرتفع، 2 متوسط). وفي المنهجية الكاملة تُحدد الأهمية بنسبة تكرار الفجوة بين العملاء وبالتصويت في الورش التشاركية.'}</p></section>`:''; })():''}
      <p class="note">${t.approx}</p></div>
      <div class="row-btns noprint"><button class="btn sm pri" type="button" id="aPrint">${t.print}</button><button class="btn sm" type="button" id="aCsvOut">${t.csv}</button><button class="btn sm" type="button" id="aCopy">${t.copy}</button></div>`;
    $('#aPrint',host).onclick=()=>{ document.body.classList.add('print-assess'); window.print(); setTimeout(()=>document.body.classList.remove('print-assess'),500); };
    $('#aCsvOut',host).onclick=()=>download('journey-assessment.csv',[[t.crit,(en?'Stage':'المرحلة'),(en?'Gap type':'نوع الفجوة'),t.weight,t.auto,t.yourScore,t.rec,t.note].map(csvCell).join(','),...items.map(x=>[en?(x.c.n_en||x.c.n):x.c.n, m.stages&&x.c.st!=null?m.stages[x.c.st][en?1:0]:'', m.gtypes&&x.c.gt?m.gtypes[x.c.gt][en?1:0]:'', x.c.w, x.sg.v==null?'':x.sg.v, x.v==null?'':x.v, en?(x.c.rec_en||x.c.rec):x.c.rec, x.note].map(csvCell).join(',')),[t.overall,'','','','',pct+'%',band[en?2:1],''].map(csvCell).join(',')].join('\n'));
    $('#aCopy',host).onclick=()=>X.copy(`${t.reportT}: ${st.name}\n${t.method2}: ${en?m.n_en:m.n}\n${t.overall}: ${pct}% (${band[en?2:1]})\n\n${t.gaps}:\n`+gaps.map((x,i)=>`${i+1}. ${en?(x.c.n_en||x.c.n):x.c.n} (${x.v==null?'—':x.v}/4): ${en?(x.c.rec_en||x.c.rec):x.c.rec}`).join('\n'));
  }
  input(); meth(); analyse();
}
window.CXK_TOOLS = Object.assign(window.CXK_TOOLS||{}, { assess });
})();
