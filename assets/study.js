/* دراسة الرحلة بالشرائح: بطاقة الرحلة وشرائح العملاء، ثم المراحل الخمس، ثم عبء كل شريحة، ثم النتيجة لكل مرحلة ولكل شريحة مع سجل الفجوات */
(function(){
"use strict";
const $=(s,el=document)=>el.querySelector(s), $$=(s,el=document)=>[...el.querySelectorAll(s)];
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const KEY='cxk-study-v1';
const ST=window.CXK_STAGES.list;
const SEGS=[["individual","فرد","Individual"],["business","منشأة","Business"],["elderly","كبار السن","Older people"],["visitor","زائر أو غير ناطق بالعربية","Visitor / non-Arabic speaker"],["disability","ذوو إعاقة","People with disabilities"],["lowdigital","قليل الخبرة الرقمية","Low digital skills"],["inperson","يفضّل الحضور","Prefers in-person"]];
const CH=[["app","تطبيق","App"],["web","موقع","Website"],["phone","هاتف","Phone"],["visit","حضور","In person"],["agent","واسطة أو مكتب خدمات","Intermediary"]];
const BUR=[["lang","لغة","Language",1],["digital","تقنية","Digital",1],["mobility","تنقّل","Travel",1],["docs","وثائق","Documents",0.75],["time","وقت","Time",0.5],["cost","تكلفة","Cost",0.75],["support","يحتاج مساعدة شخص","Needs a helper",1]];
const T={
 ar:{ title:"دراسة الرحلة بالشرائح", intro:"ادرس رحلة خدمة واحدة على المراحل الخمس، ولكل شريحة من عملائك. كل شيء يُحسب في متصفحك ولا يغادره.",
   s1:"بطاقة الرحلة", name:"اسم الخدمة أو الرحلة", namePh:"مثال: استرداد مبلغ طلب ملغى", org:"نوع الجهة", orgs:{gov:"حكومية",private:"خاصة",nonprofit:"غير ربحية"}, segs:"شرائح العملاء التي ستدرسها", segsH:"اختر من شريحة إلى أربع. الشريحة هي من يختلف طريقه أو عبؤه في الرحلة.", custom:"شريحة أخرى…", add:"أضف",
   s2:"المراحل الخمس", s2h:"صف ما يفعله العميل في كل مرحلة وأين يتعثر. أو ارفع ملفاً تصف فيه الرحلة.", tabs:{stages:"بالمراحل",text:"من ملف أو نص"}, act:"ماذا يفعل العميل هنا؟", pain:"أين يتعثر؟", ch:"القنوات", days:"المدة بالأيام", docs:"عدد المستندات", sample:"مثال جاهز", clear:"امسح", pick:"اختر ملف PDF أو نصاً", pasteH:"الصق وصف الرحلة. الأفضل أن تذكر كل مرحلة في فقرة.", reading:"جارٍ القراءة…", readOk:(p,w)=>`قُرئت ${p} صفحة، ${w} كلمة.`, readFail:"تعذّرت قراءة الملف.",
   s3:"عبء كل شريحة", s3h:"في كل مرحلة، ما الذي يثقل على هذه الشريحة أكثر من غيرها؟ اختر ما ينطبق.", noSegs:"اختر شريحة واحدة على الأقل في بطاقة الرحلة لتظهر هذه الخطوة.", note:"ملاحظة",
   go:"ادرس الرحلة", s4:"النتيجة", method:"المنهجية", overall:"الرحلة كاملة", all:"كل العملاء", seg:"الشريحة", stageSc:"درجة المرحلة", gaps:"سجل الفجوات", gap:"الفجوة", type:"النوع", imp:"الأهمية", imps:["مرتفعة جداً","مرتفعة","متوسطة","منخفضة"], rec:"التوصية", crit:"المعايير والدرجات", critH:"الدرجة المقترحة من النص. عدّلها إن كنت تعرف الواقع أفضل.", noEv:"لا دليل في النص", conf:"عدّل الدرجات", print:"اطبع", csv:"CSV", copy:"انسخ الملخص", copied:"نُسخ", empty:"اكتب وصف المراحل أو ارفع ملفاً أولاً.",
   bands:[[40,"تحتاج إعادة تصميم"],[60,"أساسية"],[80,"جيدة"],[101,"متميزة"]], burdenNote:n=>`${n} عبء إضافي`, matrixH:"كيف تختلف الرحلة بين الشرائح", worst:"أضعف مرحلة", strongest:"أقوى مرحلة", stageTip:"الدرجة من 4 لمعيار المرحلة في المنهجية، مطروحاً منها عبء الشريحة." },
 en:{ title:"Journey study by segment", intro:"Study one service journey across the five stages, and for each of your customer segments. Everything is calculated in your browser and never leaves it.",
   s1:"Journey card", name:"Service or journey name", namePh:"Example: refund for a cancelled order", org:"Organisation type", orgs:{gov:"Government",private:"Private",nonprofit:"Non-profit"}, segs:"Customer segments to study", segsH:"Pick one to four. A segment is a group whose path or burden differs in the journey.", custom:"Another segment…", add:"Add",
   s2:"The five stages", s2h:"Describe what the customer does at each stage and where they get stuck. Or upload a file describing the journey.", tabs:{stages:"By stage",text:"From a file or text"}, act:"What does the customer do here?", pain:"Where do they get stuck?", ch:"Channels", days:"Days", docs:"Documents", sample:"Load a sample", clear:"Clear", pick:"Choose a PDF or text file", pasteH:"Paste the journey description, ideally one paragraph per stage.", reading:"Reading…", readOk:(p,w)=>`Read ${p} pages, ${w} words.`, readFail:"Couldn't read the file.",
   s3:"Each segment's burden", s3h:"At each stage, what weighs on this segment more than others? Tick what applies.", noSegs:"Pick at least one segment in the journey card to see this step.", note:"Note",
   go:"Study the journey", s4:"Result", method:"Methodology", overall:"Whole journey", all:"All customers", seg:"Segment", stageSc:"Stage score", gaps:"Gap register", gap:"Gap", type:"Type", imp:"Importance", imps:["Very high","High","Medium","Low"], rec:"Recommendation", crit:"Criteria and scores", critH:"Scores suggested from the text. Adjust them if you know the reality better.", noEv:"No evidence in the text", conf:"Adjust scores", print:"Print", csv:"CSV", copy:"Copy summary", copied:"Copied", empty:"Describe the stages or upload a file first.",
   bands:[[40,"Needs redesign"],[60,"Basic"],[80,"Good"],[101,"Excellent"]], burdenNote:n=>`${n} extra burden${n===1?'':'s'}`, matrixH:"How the journey differs between segments", worst:"Weakest stage", strongest:"Strongest stage", stageTip:"Score out of 4 for the stage's criterion in the methodology, minus the segment's burden." }
};
const SAMPLE={
 ar:{name:"استرداد مبلغ طلب ملغى من متجر إلكتروني",org:"private",stages:{
  discover:{act:"يبحث العميل في تطبيق المتجر عن طريقة الاسترداد. المعلومات موزعة على أكثر من صفحة.",pain:"لا تُذكر المدة المتوقعة ولا رسوم الإرجاع ولا شروط الأهلية.",ch:["app"],days:1,docs:0},
  apply:{act:"يعبئ نموذجاً من 20 حقلاً، ويعيد إدخال رقم الطلب وبيانات الدفع الموجودة في حسابه، ويرفق صورة الفاتورة وصورة المنتج.",pain:"إعادة إدخال بيانات موجودة، ولا يصل إيصال بالاستلام.",ch:["app","web"],days:1,docs:2},
  follow:{act:"يُحال الطلب من خدمة العملاء إلى المستودعات ثم إلى المالية. يتصل العميل بمركز الاتصال ليسأل عن حالة الطلب.",pain:"لا يصل إشعار، ويُطلب إثبات شحن بعد 10 أيام ثم صورة أخرى بعد أسبوع.",ch:["phone"],days:17,docs:2},
  receive:{act:"تصل رسالة بالموافقة بصياغة قانونية طويلة، ويُخصم رسم إعادة تخزين لم يُذكر سابقاً.",pain:"الرسالة غير مفهومة، ورسم غير معلن، ويُطلب زيارة نقطة الاستلام شخصياً لتسليم المنتج.",ch:["visit"],days:5,docs:0},
  trust:{act:"يصل استبيان بعد شهر من الاسترداد.",pain:"لا يوجد مؤشر معلن لمدة الاسترداد، ولا أحد يتابع من اشتكى.",ch:["app"],days:30,docs:0}}},
 en:{name:"Refund for a cancelled online order",org:"private",stages:{
  discover:{act:"The customer searches the store's app for how to get a refund. Information is spread over several pages.",pain:"No expected time, return fee or eligibility is stated.",ch:["app"],days:1,docs:0},
  apply:{act:"They fill a 20-field form, re-entering the order number and payment details already in their account, and attach a photo of the invoice and of the product.",pain:"Re-entering existing data, and no receipt arrives.",ch:["app","web"],days:1,docs:2},
  follow:{act:"The request is transferred from customer service to the warehouse team, then to finance. The customer calls the contact centre to ask about status.",pain:"No notification; extra proof of shipping is requested after 10 days, then another photo a week later.",ch:["phone"],days:17,docs:2},
  receive:{act:"An approval message arrives in long legal wording, and a restocking fee that wasn't mentioned before is deducted.",pain:"Unclear message, an undisclosed fee, and an in-person visit to a pick-up point to hand over the product.",ch:["visit"],days:5,docs:0},
  trust:{act:"A survey arrives a month after the refund.",pain:"No published refund-time metric, and nobody follows up with those who complained.",ch:["app"],days:30,docs:0}}}
};
const blank=()=>({name:'',org:'gov',segs:[],src:'stages',text:'',stages:Object.fromEntries(ST.map(s=>[s.id,{act:'',pain:'',ch:[],days:'',docs:''}])),burden:{},notes:{},scores:{}});
function load(){ try{ const j=JSON.parse(localStorage.getItem(KEY)||'null'); if(j&&j.stages) return Object.assign(blank(),j); }catch(e){} return null; }
function save(st){ try{ localStorage.setItem(KEY,JSON.stringify(st)); }catch(e){} }

function study(main, X){
  const lib=window.CXK_AssessLib, M=lib.M, en=X.LANG==='en', t=T[X.LANG], li=en?1:0, LB=en?2:1;
  const method=M.list.find(m=>m.id==='jdm')||M.list[0];
  let st=load()||blank(); let cur=null;
  const persist=()=>save(st);
  const pair=(a,b)=>en?b:a;
  const segLabel=s=>{ const p=SEGS.find(x=>x[0]===s.id); return s.label||(p?p[en?2:1]:s.id); };
  main.innerHTML=`<div class="wrap study">
    <header class="pagehead tight"><span class="kicker">${en?'Workshop':'الورشة'}</span><h1>${t.title}</h1><p>${t.intro}</p></header>
    <ol class="asteps">
      <li class="ast"><div class="ah"><span class="no">1</span><h2>${t.s1}</h2></div><div id="sCard"></div></li>
      <li class="ast"><div class="ah"><span class="no">2</span><h2>${t.s2}</h2></div><p class="note">${t.s2h}</p><div class="jtabs atabs" role="tablist">${Object.entries(t.tabs).map(([k,v])=>`<button type="button" role="tab" data-src="${k}">${v}</button>`).join('')}</div><div id="sStages"></div></li>
      <li class="ast"><div class="ah"><span class="no">3</span><h2>${t.s3}</h2></div><p class="note">${t.s3h}</p><div id="sBurden"></div>
        <div class="gobar"><button class="btn pri" type="button" id="sGo">${t.go}</button></div></li>
      <li class="ast res" id="sRes" hidden><div class="ah"><span class="no">4</span><h2>${t.s4}</h2></div><div id="sRep"></div></li>
    </ol></div>`;

  /* 1 */
  function card(){
    const box=$('#sCard',main);
    box.innerHTML=`<div class="sgrid2">
      <label class="afield">${t.name}<input id="sName" type="text" value="${esc(st.name)}" placeholder="${t.namePh}"></label>
      <div class="afield"><span>${t.org}</span><div class="chips">${Object.entries(t.orgs).map(([k,v])=>`<button type="button" class="chip${st.org===k?' on':''}" data-org="${k}">${v}</button>`).join('')}</div></div></div>
      <div class="afield"><span>${t.segs}</span><p class="note">${t.segsH}</p>
        <div class="chips" id="sSegs">${SEGS.map(s=>`<button type="button" class="chip${st.segs.some(x=>x.id===s[0])?' on':''}" data-seg="${s[0]}">${s[en?2:1]}</button>`).join('')}${st.segs.filter(s=>s.custom).map(s=>`<button type="button" class="chip on" data-seg="${esc(s.id)}">${esc(s.label)} ×</button>`).join('')}</div>
        <div class="row-btns"><input id="sCustom" type="text" placeholder="${t.custom}" class="cin"><button type="button" class="btn sm" id="sAddSeg">${t.add}</button></div></div>`;
    $('#sName',box).oninput=e=>{ st.name=e.target.value; persist(); };
    box.onclick=e=>{ const o=e.target.closest('[data-org]'); if(o){ st.org=o.dataset.org; persist(); card(); return; }
      const g=e.target.closest('[data-seg]'); if(g){ const id=g.dataset.seg, i=st.segs.findIndex(x=>x.id===id); if(i>=0) st.segs.splice(i,1); else if(st.segs.length<4){ const p=SEGS.find(x=>x[0]===id); st.segs.push(p?{id}:{id,label:id,custom:true}); } persist(); card(); burden(); return; }
      if(e.target.id==='sAddSeg'){ const v=$('#sCustom',box).value.trim(); if(!v||st.segs.length>=4) return; st.segs.push({id:'c_'+Date.now(),label:v,custom:true}); persist(); card(); burden(); } };
  }
  /* 2 */
  function stages(){
    $$('.atabs button',main).forEach(b=>b.setAttribute('aria-selected',b.dataset.src===st.src));
    const box=$('#sStages',main);
    if(st.src==='stages'){
      box.innerHTML=`<div class="s5">${ST.map(s=>{ const d=st.stages[s.id]; return `<section class="s5c" style="--c:${s.hue}"><h3><span class="sn">${s.n}</span>${esc(en?s.t_en:s.t)}</h3><p class="sq">${esc(en?s.q_en:s.q)}</p>
        <label>${t.act}<textarea rows="3" data-s="${s.id}" data-k="act">${esc(d.act)}</textarea></label>
        <label>${t.pain}<textarea rows="2" data-s="${s.id}" data-k="pain">${esc(d.pain)}</textarea></label>
        <div class="s5r"><span>${t.ch}</span><div class="chips sm">${CH.map(c=>`<button type="button" class="chip${(d.ch||[]).includes(c[0])?' on':''}" data-s="${s.id}" data-ch="${c[0]}">${c[en?2:1]}</button>`).join('')}</div></div>
        <div class="s5n"><label>${t.days}<input type="number" min="0" dir="ltr" data-s="${s.id}" data-k="days" value="${esc(d.days)}"></label><label>${t.docs}<input type="number" min="0" dir="ltr" data-s="${s.id}" data-k="docs" value="${esc(d.docs)}"></label></div></section>`; }).join('')}</div>
        <div class="row-btns"><button class="btn sm" type="button" id="sSample">${t.sample}</button><button class="btn sm ghost" type="button" id="sClear">${t.clear}</button></div>`;
      box.oninput=e=>{ const el=e.target; if(el.dataset.k){ st.stages[el.dataset.s][el.dataset.k]=el.value; persist(); } };
      box.onclick=e=>{ const c=e.target.closest('[data-ch]'); if(c){ const a=st.stages[c.dataset.s].ch||[]; const i=a.indexOf(c.dataset.ch); if(i>=0) a.splice(i,1); else a.push(c.dataset.ch); st.stages[c.dataset.s].ch=a; c.classList.toggle('on'); persist(); return; }
        if(e.target.id==='sSample'){ const smp=SAMPLE[en?'en':'ar']; st.name=smp.name; st.org=smp.org; st.stages=JSON.parse(JSON.stringify(smp.stages)); st.scores={}; persist(); card(); stages(); return; }
        if(e.target.id==='sClear'){ const b=blank(); st.stages=b.stages; st.name=''; st.scores={}; persist(); card(); stages(); } };
    } else {
      box.innerHTML=`<div class="row-btns"><label class="btn sm pri" for="sFile" style="cursor:pointer">${t.pick}</label><input id="sFile" type="file" accept=".pdf,.txt,application/pdf,text/plain" hidden><span class="srcl" id="sFileMsg"></span></div><p class="note">${t.pasteH}</p><textarea id="sText" class="ta" rows="12" dir="auto">${esc(st.text)}</textarea>`;
      $('#sText',box).oninput=e=>{ st.text=e.target.value; persist(); };
      $('#sFile',box).onchange=async e=>{ const f=e.target.files[0]; if(!f) return; const msg=$('#sFileMsg',box); msg.textContent=t.reading;
        try{ let text='',pages=1; if(/\.pdf$/i.test(f.name)||f.type==='application/pdf'){ if(!window.pdfjsLib){ await new Promise((ok,no)=>{ const s=document.createElement('script'); s.src='assets/vendor/pdf.min.js'; s.onload=ok; s.onerror=no; document.head.appendChild(s); }); } window.pdfjsLib.GlobalWorkerOptions.workerSrc='assets/vendor/pdf.worker.min.js'; const pdf=await window.pdfjsLib.getDocument({data:await f.arrayBuffer()}).promise; pages=pdf.numPages; const out=[]; for(let p=1;p<=pdf.numPages;p++){ const c=await (await pdf.getPage(p)).getTextContent(); out.push(...lib.pdfLines(c.items)); out.push(''); } text=lib.fixArabic(out.join('\n')).replace(/[ \t]+/g,' ').replace(/\n{3,}/g,'\n\n').trim(); } else text=await f.text();
          st.text=text; if(!st.name) st.name=f.name.replace(/\.[^.]+$/,''); persist(); $('#sText',box).value=text; msg.textContent=t.readOk(pages,text.split(/\s+/).length); }catch(_){ msg.textContent=t.readFail; } };
    }
  }
  $('.atabs',main).onclick=e=>{ const b=e.target.closest('[data-src]'); if(!b) return; st.src=b.dataset.src; persist(); stages(); };
  /* 3 */
  function burden(){
    const box=$('#sBurden',main);
    if(!st.segs.length){ box.innerHTML=`<p class="empty">${t.noSegs}</p>`; return; }
    box.innerHTML=`<div class="tscroll"><table class="btab"><thead><tr><th>${t.seg}</th>${ST.map(s=>`<th style="--c:${s.hue}"><span class="sn">${s.n}</span>${esc(en?s.t_en:s.t)}</th>`).join('')}</tr></thead><tbody>${st.segs.map(sg=>`<tr><th>${esc(segLabel(sg))}</th>${ST.map(s=>{ const on=((st.burden[sg.id]||{})[s.id])||[]; return `<td><div class="chips xs">${BUR.map(b=>`<button type="button" class="chip${on.includes(b[0])?' on':''}" data-sg="${esc(sg.id)}" data-st="${s.id}" data-b="${b[0]}">${b[en?2:1]}</button>`).join('')}</div></td>`; }).join('')}</tr>`).join('')}</tbody></table></div>`;
    box.onclick=e=>{ const b=e.target.closest('[data-b]'); if(!b) return; const o=st.burden[b.dataset.sg]=st.burden[b.dataset.sg]||{}; const a=o[b.dataset.st]=o[b.dataset.st]||[]; const i=a.indexOf(b.dataset.b); if(i>=0) a.splice(i,1); else a.push(b.dataset.b); b.classList.toggle('on'); persist(); };
  }
  /* 4 */
  function corpus(){
    if(st.src==='text'){ return String(st.text||'').split(/\n+/).map(p=>p.trim()).filter(p=>p.length>2).map(p=>['',p]); }
    return ST.map(s=>{ const d=st.stages[s.id]; const chs=(d.ch||[]).map(c=>(CH.find(x=>x[0]===c)||[])[en?2:1]).filter(Boolean); const bits=[d.act,d.pain]; if(chs.length) bits.push((en?'Channels: ':'القنوات: ')+chs.join(en?', ':'، ')); if(d.days) bits.push(en?`${d.days} days`:`${d.days} يوم`); if(d.docs) bits.push(en?`${d.docs} documents`:`${d.docs} مستندات`); return [en?s.t_en:s.t, bits.filter(Boolean).join('. ')]; }).filter(x=>x[1]);
  }
  function structAdj(s){ if(st.src!=='stages') return 0; const d=st.stages[s.id]; let a=0; const days=+d.days||0, docs=+d.docs||0, ch=d.ch||[];
    if((s.id==='follow'||s.id==='receive')&&days>10) a-=1; else if(days>30) a-=0.5;
    if(s.id==='apply'&&docs>=3) a-=1; else if(docs>=5) a-=0.5;
    if(ch.includes('agent')) a-=1; if(ch.length&&ch.every(c=>c==='visit')) a-=0.5; if(ch.includes('app')||ch.includes('web')) a+=0.25; return a; }
  function analyse(){
    const parts=corpus(); const sents=lib.sentences(parts); if(!sents.length){ cur=null; return false; }
    const S=lib.stats({src:'stages',stages:parts},sents);
    cur={items:method.crit.map(c=>{ const sg=lib.suggest(c,sents,S); let v=sg.v; const stg=ST.find(s=>s.crit===c.id); if(stg){ const adj=structAdj(stg); if(v==null&&adj) v=Math.max(0,Math.min(4,Math.round(2+adj))); else if(v!=null) v=Math.max(0,Math.min(4,Math.round(v+adj))); } const ov=st.scores[c.id]; return {c, sg, auto:v, v: ov!=null?ov:v}; })};
    return true;
  }
  const val=x=>x.v==null?1:x.v;
  function burdenPen(sgId, stId){ const a=((st.burden[sgId]||{})[stId])||[]; return a.reduce((n,k)=>n+((BUR.find(b=>b[0]===k)||[0,0,0,0])[3]),0); }
  function overall(items, pen){ const W=items.reduce((a,x)=>a+(+x.c.w||1),0); return Math.round(items.reduce((a,x)=>{ const stg=ST.find(s=>s.crit===x.c.id); const v=Math.max(0,val(x)-(stg&&pen?pen(stg.id):0)); return a+(+x.c.w||1)*v/4; },0)/W*100); }
  const band=p=>t.bands.find(b=>p<b[0])[1];
  function report(){
    const box=$('#sRep',main), res=$('#sRes',main); res.hidden=false;
    if(!cur){ box.innerHTML=`<p class="empty">${t.empty}</p>`; return; }
    const items=cur.items, stageOf=s=>items.find(x=>x.c.id===s.crit);
    const base=overall(items), rows=[{id:'',label:t.all,pen:()=>0}].concat(st.segs.map(sg=>({id:sg.id,label:segLabel(sg),pen:stId=>burdenPen(sg.id,stId)})));
    const stScore=(s,pen)=>Math.max(0,val(stageOf(s))-pen(s.id));
    const col=p=>p>=80?'var(--up)':p>=60?'var(--fg-2)':'var(--accent)';
    const sorted=ST.map(s=>[s,stScore(s,()=>0)]).sort((a,b)=>a[1]-b[1]);
    const gaps=items.filter(x=>val(x)<=2).sort((a,b)=>(val(a)-val(b))||(b.c.w-a.c.w));
    box.innerHTML=`<div class="arep srep" id="srep">
      <div class="arep-h"><div><span class="kicker">${t.s4}</span><h3>${esc(st.name||'—')}</h3><p class="srcl">${t.method}: ${esc(en?method.n_en:method.n)} · <span dir="ltr">${new Date().toISOString().slice(0,10)}</span>${st.segs.length?` · ${st.segs.length} ${t.seg}`:''}</p></div>
        <div class="ring"><svg viewBox="0 0 110 110" aria-hidden="true" style="direction:ltr"><circle cx="55" cy="55" r="46" fill="none" stroke="var(--surface-3)" stroke-width="10"/><circle cx="55" cy="55" r="46" fill="none" stroke="${col(base)}" stroke-width="10" stroke-linecap="round" stroke-dasharray="${(289*base/100).toFixed(1)} 289" transform="rotate(-90 55 55)"/><text x="55" y="62" text-anchor="middle" font-size="24" font-weight="700" fill="var(--fg)">${base}%</text></svg><div><b>${band(base)}</b><span class="srcl">${t.overall}</span></div></div></div>
      <ol class="s5res">${ST.map(s=>{ const v=stScore(s,()=>0), p=Math.round(v/4*100), it=stageOf(s); return `<li style="--c:${s.hue}"><span class="sn">${s.n}</span><b>${esc(en?s.t_en:s.t)}</b><span class="bar"><i style="width:${p}%"></i></span><span class="num">${v}/4</span>${it&&it.v==null?`<small>${t.noEv}</small>`:''}</li>`; }).join('')}</ol>
      <p class="srcl">${t.worst}: <b>${esc(en?sorted[0][0].t_en:sorted[0][0].t)}</b> · ${t.strongest}: <b>${esc(en?sorted[4][0].t_en:sorted[4][0].t)}</b></p>
      ${st.segs.length?`<h4>${t.matrixH}</h4><div class="tscroll"><table class="mtab"><thead><tr><th>${t.seg}</th>${ST.map(s=>`<th style="--c:${s.hue}"><span class="sn">${s.n}</span></th>`).join('')}<th>${t.overall}</th></tr></thead><tbody>${rows.map(r=>{ const o=overall(items,r.pen); return `<tr><th>${esc(r.label)}</th>${ST.map(s=>{ const v=stScore(s,r.pen), pen=r.pen(s.id); return `<td class="v${v<=1?' lo':v>=3?' hi':''}"><b>${v}</b>${pen?`<small>−${pen}</small>`:''}</td>`; }).join('')}<td class="o"><b style="color:${col(o)}">${o}%</b><small>${band(o)}</small></td></tr>`; }).join('')}</tbody></table></div><p class="note">${t.stageTip}</p>`:''}
      <h4>${t.gaps}</h4>${gaps.length?`<div class="tscroll"><table class="gtab"><thead><tr><th>${t.gap}</th><th>${t.type}</th><th>${t.imp}</th><th>${t.rec}</th></tr></thead><tbody>${gaps.map(x=>`<tr><td><b>${esc(en?(x.c.gn_en||x.c.n_en||x.c.n):(x.c.gn||x.c.n))}</b></td><td>${esc(method.gtypes&&x.c.gt?method.gtypes[x.c.gt][li]:'')}</td><td>${t.imps[Math.min(3,val(x))]}</td><td>${esc(en?(x.c.rec_en||x.c.rec):x.c.rec)}</td></tr>`).join('')}</tbody></table></div>`:`<p class="okmsg">${en?'No criterion scored 2 or less.':'لا معيار بدرجة 2 أو أقل.'}</p>`}
      <details class="sconf"><summary>${t.conf}</summary><p class="note">${t.critH}</p><div class="acrit">${items.map(x=>`<article class="acr" data-id="${x.c.id}"><div class="acr-h"><div>${method.stages&&x.c.st!=null?`<span class="stg">${esc(method.stages[x.c.st][li])}</span>`:''}<h3>${esc(en?(x.c.n_en||x.c.n):x.c.n)}</h3><p>${esc(en?(x.c.q_en||x.c.q):x.c.q)}</p></div><span class="srcl num">${x.c.w}</span></div>
        <div class="acr-s"><span class="sug">${x.auto==null?`<em>${t.noEv}</em>`:`<b>${x.auto}/4</b>`}</span><div class="scale" role="radiogroup">${M.scale.map(([v,ar,enl])=>`<label class="${x.v!=null&&+v===x.v?'on':''}"><input type="radio" name="q-${x.c.id}" value="${v}" ${x.v!=null&&+v===x.v?'checked':''}><b>${v}</b><span>${en?enl:ar}</span></label>`).join('')}</div></div>
        ${x.sg.ev.length?`<details class="ev"><summary>${en?'Evidence':'الأدلة'} (${x.sg.ev.length})</summary><ul>${x.sg.ev.map(e=>`<li class="${e.p<0?'n':'p'}" dir="auto">${e.s.stage?`<b>${esc(e.s.stage)}:</b> `:''}${lib.hl(e.s.text,e.k)}</li>`).join('')}</ul></details>`:''}</article>`).join('')}</div></details>
      <div class="row-btns"><button class="btn sm" type="button" id="sPrint">${t.print}</button><button class="btn sm" type="button" id="sCsv">${t.csv}</button><button class="btn sm" type="button" id="sCopy">${t.copy}</button></div>
    </div>`;
    $('.acrit',box).onchange=e=>{ const r=e.target; if(r.type!=='radio') return; st.scores[r.name.slice(2)]=+r.value; persist(); analyse(); report(); $('.sconf',box).open=true; };
    $('#sPrint',box).onclick=()=>{ document.body.classList.add('print-assess'); setTimeout(()=>{ print(); document.body.classList.remove('print-assess'); },50); };
    $('#sCsv',box).onclick=()=>{ const C=lib.csvCell; const lines=[[t.seg,...ST.map(s=>en?s.t_en:s.t),t.overall].map(C).join(',')]; rows.forEach(r=>lines.push([r.label,...ST.map(s=>stScore(s,r.pen)),overall(items,r.pen)+'%'].map(C).join(','))); lines.push(''); lines.push([t.gap,t.type,t.imp,t.rec].map(C).join(',')); gaps.forEach(x=>lines.push([en?(x.c.gn_en||x.c.n):(x.c.gn||x.c.n),method.gtypes&&x.c.gt?method.gtypes[x.c.gt][li]:'',t.imps[Math.min(3,val(x))],en?(x.c.rec_en||x.c.rec):x.c.rec].map(C).join(','))); lib.download('journey-study.csv',lines.join('\n')); };
    $('#sCopy',box).onclick=()=>{ const txt=[`${st.name} — ${base}% (${band(base)})`,...ST.map(s=>`${s.n}. ${en?s.t_en:s.t}: ${stScore(s,()=>0)}/4`),...(st.segs.length?[t.matrixH+':',...rows.slice(1).map(r=>`${r.label}: ${overall(items,r.pen)}%`)]:[]),t.gaps+':',...gaps.slice(0,5).map(x=>'- '+(en?(x.c.gn_en||x.c.n):(x.c.gn||x.c.n)))].join('\n'); X.copy(txt); };
  }
  $('#sGo',main).onclick=()=>{ if(!analyse()){ $('#sRes',main).hidden=false; $('#sRep',main).innerHTML=`<p class="empty">${t.empty}</p>`; return; } report(); $('#sRes',main).scrollIntoView({behavior:'smooth',block:'start'}); };
  card(); stages(); burden();
}
window.CXK_Study=study;
})();
