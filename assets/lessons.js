/* صفحة الدروس العملية: قائمة الدروس حسب المسار، وصفحة الدرس بخطواته ومثاله المحلول وحاسبته التطبيقية */
(function(){
"use strict";
const D = window.CXK_LESSONS || {tracks:[],items:[],levels:{}};
const $ = (s,el=document)=>el.querySelector(s), $$=(s,el=document)=>[...el.querySelectorAll(s)];
const esc = s => String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const T = {
 ar:{ intro:"دروس قصيرة تطبّقها على بياناتك مباشرة. في كل درس: الهدف، وما تحتاجه، والخطوات، ومثال محلول بالأرقام، والأخطاء الشائعة، وتمرين بحله، وحاسبة تجرّب عليها أرقامك.",
   all:"كل الدروس", min:n=>`${n} دقيقة`, lessons:n=>`${n} ${n>2&&n<11?'دروس':'درساً'}`, goal:"ما ستتعلمه", need:"ما تحتاجه", steps:"الخطوات", example:"مثال محلول", result:"النتيجة وما تعنيه",
   mist:"أخطاء شائعة", drill:"تمرين", showA:"اعرض الحل", calc:"جرّب بأرقامك", links:"اقرأ أيضاً", prev:"الدرس السابق", next:"الدرس التالي", back:"كل الدروس",
   kind:{metric:"مؤشر",article:"مقال",tool:"أداة",learn:"مرجع"}, start:"ابدأ الدرس", notFound:"الدرس غير موجود" },
 en:{ intro:"Short lessons you apply to your own data straight away. Each has the goal, what you need, the steps, a worked example with numbers, common mistakes, an exercise with its answer, and a calculator for your own figures.",
   all:"All lessons", min:n=>`${n} min`, lessons:n=>`${n} lesson${n===1?'':'s'}`, goal:"What you'll learn", need:"What you need", steps:"Steps", example:"Worked example", result:"Result and what it means",
   mist:"Common mistakes", drill:"Exercise", showA:"Show the answer", calc:"Try your own numbers", links:"Read next", prev:"Previous lesson", next:"Next lesson", back:"All lessons",
   kind:{metric:"Metric",article:"Article",tool:"Tool",learn:"Reference"}, start:"Start the lesson", notFound:"Lesson not found" }
};
const L = (o,k,en)=> en ? (o[k+'_en']!=null ? o[k+'_en'] : o[k]) : o[k];
const isNum = c => /^[\s\d.,%+\-–−±→~≈]+$/.test(String(c));
const cell = c => isNum(c) ? `<span dir="ltr">${esc(c)}</span>` : esc(c);
const mathLine = (line, en) => { if(en) return esc(line); const m=String(line).match(/^([^0-9(√±]*?)([0-9(√±].*)$/); if(!m || !/[×÷+−√²=≈]/.test(m[2])) return esc(line); return `${esc(m[1])}<bdi dir="ltr">${esc(m[2])}</bdi>`; };
const num = (v,d=1)=> Number.isFinite(v) ? (Math.round(v*Math.pow(10,d))/Math.pow(10,d)).toLocaleString('en-US') : '—';

/* ---------- الحاسبات ---------- */
const CALC = {
 nps:{ f:[["p","المروّجون (9–10)","Promoters (9–10)",168],["n","المحايدون (7–8)","Passives (7–8)",132],["d","المنتقدون (0–6)","Detractors (0–6)",100]],
   run:v=>{ const t=v.p+v.n+v.d; if(!t) return []; const P=v.p/t, Dd=v.d/t, s=(P-Dd)*100, moe=1.96*Math.sqrt((P+Dd-(P-Dd)**2)/t)*100;
     return [["صافي نقاط الترويج","NPS",(s>0?'+':'')+num(s)],["هامش الخطأ (95%)","Margin of error (95%)","±"+num(moe)],["عدد الردود","Responses",num(t,0)]]; } },
 csat:{ f:[["a","الدرجة 5","Score 5",540],["b","الدرجة 4","Score 4",300],["c","الدرجة 3","Score 3",180],["d","الدرجة 2","Score 2",96],["e","الدرجة 1","Score 1",84]],
   run:v=>{ const t=v.a+v.b+v.c+v.d+v.e; if(!t) return []; return [["نسبة الراضين (4–5)","Satisfied (4–5)",num((v.a+v.b)/t*100)+'%'],["المتوسط من 5","Average out of 5",num((5*v.a+4*v.b+3*v.c+2*v.d+v.e)/t,2)],["غير الراضين (1–2)","Dissatisfied (1–2)",num((v.d+v.e)/t*100)+'%']]; } },
 ces:{ f:[["s7","7","7",95],["s6","6","6",120],["s5","5","5",85],["s4","4","4",60],["s3","3","3",55],["s2","2","2",45],["s1","1","1",40]],
   run:v=>{ const t=v.s7+v.s6+v.s5+v.s4+v.s3+v.s2+v.s1; if(!t) return []; const e=(v.s7+v.s6+v.s5)/t*100, h=(v.s3+v.s2+v.s1)/t*100;
     return [["نسبة السهولة","Ease share",num(e)+'%'],["نسبة الصعوبة","Difficulty share",num(h)+'%'],["صافي السهولة","Net ease",num(e-h)],["المتوسط من 7","Average out of 7",num((7*v.s7+6*v.s6+5*v.s5+4*v.s4+3*v.s3+2*v.s2+v.s1)/t,2)]]; } },
 fcr:{ f:[["c","إجمالي التواصل","Total contacts",10900],["i","عدد المشكلات","Issues",8200],["o","مشكلات بتواصل واحد","Issues with one contact",6150],["k","تكلفة التواصل الواحد","Cost per contact",18]],
   run:v=>{ if(!v.i||!v.c) return []; const r=Math.max(0,v.c-v.i); return [["الحل من أول تواصل","FCR",num(v.o/v.i*100)+'%'],["التواصل المتكرر","Repeat contacts",num(r,0)],["نسبته من الإجمالي","Share of total",num(r/v.c*100)+'%'],["التكلفة الشهرية","Monthly cost",num(r*v.k,0)]]; } },
 times:{ f:[["sla","المدة المعلنة","Published time",5]], area:["المدد مفصولة بفواصل","Durations, separated by commas","1, 1, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 5, 5, 6, 7, 9, 12, 15, 21"],
   run:(v,txt)=>{ const a=String(txt).split(/[\s,،؛;]+/).map(Number).filter(x=>Number.isFinite(x)&&x>=0).sort((x,y)=>x-y); const n=a.length; if(!n) return [];
     const mean=a.reduce((s,x)=>s+x,0)/n, med=n%2?a[(n-1)/2]:(a[n/2-1]+a[n/2])/2, p90=a[Math.ceil(.9*n)-1], ok=a.filter(x=>x<=v.sla).length/n*100;
     return [["المتوسط","Mean",num(mean)],["الوسيط","Median",num(med)],["المئين التسعون","90th percentile",num(p90)],["الالتزام بالمدة","SLA compliance",num(ok)+'%'],["عدد الطلبات","Requests",n]]; } },
 sample:{ f:[["N","حجم المجتمع","Population",2000],["m","هامش الخطأ %","Margin of error %",5],["z","الثقة % (90 أو 95 أو 99)","Confidence % (90, 95 or 99)",95],["r","نسبة الاستجابة %","Response rate %",15]],
   run:v=>{ const z={90:1.645,95:1.96,99:2.576}[v.z]||1.96, e=v.m/100; if(!e) return []; const n0=z*z*.25/(e*e), n=v.N?n0/(1+(n0-1)/v.N):n0, inv=v.r?Math.ceil(n)/(v.r/100):NaN;
     const out=[["العينة الأساسية","Base sample",num(n0)],["العينة بعد التصحيح","Corrected sample",num(Math.ceil(n),0)],["الدعوات المطلوبة","Invitations needed",num(Math.ceil(inv),0)]];
     if(v.N && inv>v.N) out.push(["تنبيه","Note",["الدعوات أكثر من المجتمع: وسّع الفترة أو اقبل هامشاً أكبر","Invitations exceed the population: extend the period or accept a wider margin"]]); return out; } },
 sus:{ f:[1,2,3,4,5,6,7,8,9,10].map((i,k)=>["q"+i,"العبارة "+i,"Statement "+i,[4,2,4,1,5,2,4,2,4,2][k]]),
   run:v=>{ let s=0; for(let i=1;i<=10;i++){ const x=Math.min(5,Math.max(1,v['q'+i]||1)); s+= i%2 ? x-1 : 5-x; } const sc=s*2.5;
     return [["مقياس سهولة الاستخدام","SUS score",num(sc)],["مقارنة بالمتوسط العالمي (68)","Versus the global average (68)",sc>=68?["أعلى من المتوسط","Above average"]:["أقل من المتوسط","Below average"]]]; } },
 themes:{ f:[], area:["موضوع: عدد التعليقات السلبية (سطر لكل موضوع)","Theme: negative comments (one per line)","التأخير: 4\nغياب الإشعار: 3\nتكرار طلب البيانات: 2\nالرسوم: 1"],
   run:(v,txt)=>{ const rows=String(txt).split(/\n+/).map(l=>{ const m=l.match(/^(.+?)[:：\-–]\s*(\d+(?:\.\d+)?)\s*$/); return m?[m[1].trim(),+m[2]]:null; }).filter(Boolean); const t=rows.reduce((s,r)=>s+r[1],0); if(!t) return [];
     return rows.sort((a,b)=>b[1]-a[1]).map(r=>[r[0],r[0],num(r[1]/t*100)+'%']); } },
 prio:{ rows:true }
};
function calcBox(id, en){
  const c=CALC[id]; if(!c) return '';
  if(c.rows) return `<div class="lcalc" data-calc="prio"><div class="lprio"><div class="lph"><span>${en?'Pain point':'موضع التعثر'}</span><span>${en?'Freq.':'التكرار'}</span><span>${en?'Severity':'الشدة'}</span><span>${en?'Effort':'الجهد'}</span><span>${en?'Score':'الأولوية'}</span></div><div class="lpr"></div></div><button type="button" class="btn ghost sm" data-add>${en?'Add a row':'أضف صفاً'}</button></div>`;
  return `<div class="lcalc" data-calc="${id}"><div class="lfields">${c.f.map(f=>`<label><span>${esc(en?f[2]:f[1])}</span><input type="number" inputmode="decimal" data-k="${f[0]}" value="${f[3]}" dir="ltr"></label>`).join('')}</div>
    ${c.area?`<label class="larea"><span>${esc(en?c.area[1]:c.area[0])}</span><textarea rows="${id==='themes'?5:2}" data-area dir="${id==='themes'&&!en?'rtl':'auto'}">${esc(id==='themes'&&en?"Delay: 4\nNo notification: 3\nRepeated data requests: 2\nFees: 1":c.area[2])}</textarea></label>`:''}
    <dl class="lout"></dl></div>`;
}
function wireCalc(host, en){
  $$('.lcalc',host).forEach(box=>{
    const id=box.dataset.calc, c=CALC[id];
    if(c.rows){ const body=$('.lpr',box);
      const seed=en?[["Unknown timeframe",5,3,1],["No notification",5,4,2],["Undisclosed fee",2,5,1],["Re-entering data",4,3,2]]:[["المدة غير معروفة",5,3,1],["لا إشعار بعد التقديم",5,4,2],["رسم غير معلن",2,5,1],["إعادة إدخال البيانات",4,3,2]];
      const row=r=>`<div class="lprow"><input type="text" value="${esc(r[0])}" aria-label="${en?'Pain point':'موضع التعثر'}">${[1,2,3].map(i=>`<input type="number" min="1" max="5" value="${r[i]}" dir="ltr" aria-label="${['',en?'Frequency':'التكرار',en?'Severity':'الشدة',en?'Effort':'الجهد'][i]}">`).join('')}<output></output></div>`;
      body.innerHTML=seed.map(row).join('');
      const upd=()=>{ $$('.lprow',body).forEach(r=>{ const [f,s,e]=$$('input[type=number]',r).map(x=>Math.min(5,Math.max(1,+x.value||1))); const sc=f*s/e; r.dataset.sc=sc; $('output',r).textContent=num(sc); });
        const rs=$$('.lprow',body); const max=Math.max(...rs.map(r=>+r.dataset.sc)); rs.forEach(r=>r.classList.toggle('top',+r.dataset.sc===max)); };
      body.oninput=upd; $('[data-add]',box).onclick=()=>{ body.insertAdjacentHTML('beforeend',row(['',3,3,3])); upd(); }; upd(); return; }
    const out=$('.lout',box);
    const upd=()=>{ const v={}; $$('input[data-k]',box).forEach(i=>v[i.dataset.k]=+i.value||0); const ta=$('[data-area]',box);
      const r=c.run(v, ta?ta.value:''); out.innerHTML=r.map(x=>`<div><dt>${esc(en?x[1]:x[0])}</dt><dd dir="${Array.isArray(x[2])?'auto':'ltr'}">${esc(Array.isArray(x[2])?(en?x[2][1]:x[2][0]):x[2])}</dd></div>`).join('')||'<div><dd>—</dd></div>'; };
    box.oninput=upd; upd();
  });
}

/* ---------- الروابط ---------- */
function linkFor(l, X, en){
  const [k,id]=l, R=window.CXK_REF||{}, A=(R.articles||[]), M=(R.metrics||[]), C=(typeof window.CXK_Catalog==='function'?window.CXK_Catalog(X.LANG):null)||{items:{}};
  if(k==='metric'){ const m=M.find(x=>x.id===id); return m?[X.href('learn/metrics/'+id),(en?m.n_en:m.n)+(m.a?` (${m.a})`:'')]:null; }
  if(k==='article'){ const a=A.find(x=>x.id===id); return a?[X.href('learn/encyclopedia/'+id),en?a.t_en:a.t]:null; }
  if(k==='tool'){ const it=C.items&&C.items[id]; return it?[X.href('tools/'+id),it[0]]:[X.href('tools/'+id),id]; }
  if(k==='learn'){ const it=C.items&&C.items[id]; return it?[X.href('learn/'+id),it[0]]:[X.href('learn/'+id),id]; }
  return null;
}

/* ---------- الصفحات ---------- */
function lessons(host, X, arg){
  const en=X.LANG==='en', t=T[X.LANG], lv=D.levels||{};
  const lvl=n=>(lv[n]||['',''])[en?1:0];
  if(!arg){
    host.innerHTML=`<p class="lintro">${t.intro}</p>
      ${D.tracks.map(tr=>{ const its=D.items.filter(x=>x.tr===tr.id); return `<section class="ltrack" id="tr-${tr.id}"><header><h2>${esc(en?tr.en:tr.ar)}</h2><p>${esc(en?tr.d_en:tr.d)}</p><span class="lcount">${t.lessons(its.length)}</span></header>
        <ol class="lgrid">${its.map((x,i)=>`<li><a class="lcard" href="${X.href('learn/lessons/'+x.id)}"><span class="lno">${String(D.items.indexOf(x)+1).padStart(2,'0')}</span><b>${esc(L(x,'t',en))}</b><span class="lsum">${esc(L(x,'sum',en))}</span><span class="lmeta"><span>${lvl(x.lvl)}</span><span>${t.min(x.min)}</span>${x.calc?`<span class="lhas">${en?'Calculator':'حاسبة'}</span>`:''}</span></a></li>`).join('')}</ol></section>`; }).join('')}`;
    return;
  }
  const i=D.items.findIndex(x=>x.id===arg), x=D.items[i];
  if(!x){ host.innerHTML=`<p class="empty">${t.notFound}. <a href="${X.href('learn/lessons')}">${t.back}</a></p>`; return; }
  const tr=D.tracks.find(y=>y.id===x.tr)||{}, ex=x.ex||{}, prev=D.items[i-1], next=D.items[i+1];
  const head=en?(ex.head_en||ex.head):ex.head, rows=en?(ex.rows_en||ex.rows):ex.rows;
  const links=(x.links||[]).map(l=>[l[0],linkFor(l,X,en)]).filter(z=>z[1]);
  host.innerHTML=`<article class="lesson">
    <a class="crumb" href="${X.href('learn/lessons')}">${t.back}</a>
    <header class="lhead"><span class="kicker">${esc(en?tr.en:tr.ar)} · ${lvl(x.lvl)} · ${t.min(x.min)}</span><h2>${esc(L(x,'t',en))}</h2><p class="lede">${esc(L(x,'sum',en))}</p></header>
    <div class="lbody">
      <div class="lmain">
        <section class="lsec"><h3>${t.goal}</h3><p>${esc(L(x,'goal',en))}</p>
          <h4>${t.need}</h4><ul class="lneed">${(en?x.need_en:x.need).map(n=>`<li>${esc(n)}</li>`).join('')}</ul></section>
        <section class="lsec"><h3>${t.steps}</h3><ol class="lsteps">${x.steps.map(s=>`<li><b>${esc(en?s[2]:s[0])}</b><p>${esc(en?s[3]:s[1])}</p></li>`).join('')}</ol></section>
        <section class="lsec lex"><h3>${t.example}</h3><p class="lext">${esc(L(ex,'t',en))}</p>
          ${head?`<div class="tscroll"><table class="ltab${head.length>5?' wide':''}"><thead><tr>${head.map(h=>`<th>${esc(h)}</th>`).join('')}</tr></thead><tbody>${rows.map(r=>`<tr>${r.map(c=>`<td>${cell(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`:''}
          ${(ex.calc||[]).length?`<ol class="lcalcs">${ex.calc.map(c=>`<li>${mathLine(en?c[1]:c[0],en)}</li>`).join('')}</ol>`:''}
          <div class="lres"><small>${t.result}</small><p>${esc(L(ex,'res',en))}</p></div></section>
        <section class="lsec"><h3>${t.mist}</h3><ul class="lmist">${x.mist.map(m=>`<li>${esc(en?m[1]:m[0])}</li>`).join('')}</ul></section>
        <section class="lsec ldrill"><h3>${t.drill}</h3><p>${esc(L(x.drill,'q',en))}</p><details><summary>${t.showA}</summary><p>${esc(L(x.drill,'a',en))}</p></details></section>
      </div>
      <aside class="lside">
        ${x.calc?`<section class="lsec lcalcw"><h3>${t.calc}</h3>${calcBox(x.calc,en)}</section>`:''}
        ${links.length?`<section class="lsec"><h3>${t.links}</h3><ul class="llinks">${links.map(([k,l])=>`<li><a href="${l[0]}"><small>${t.kind[k]}</small><span>${esc(l[1])}</span></a></li>`).join('')}</ul></section>`:''}
      </aside>
    </div>
    <nav class="lpn">${prev?`<a href="${X.href('learn/lessons/'+prev.id)}"><small>${t.prev}</small><span>${esc(L(prev,'t',en))}</span></a>`:'<span></span>'}${next?`<a class="nx" href="${X.href('learn/lessons/'+next.id)}"><small>${t.next}</small><span>${esc(L(next,'t',en))}</span></a>`:''}</nav>
  </article>`;
  wireCalc(host,en);
  window.scrollTo(0,0);
}
window.CXK_REFPAGES = Object.assign(window.CXK_REFPAGES||{}, { lessons });
})();
