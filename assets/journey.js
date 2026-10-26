/* أداة رسم رحلة العميل — تحفظ في متصفح الزائر، وتصدّر صورة PNG أو ملف JSON */
(function(){
"use strict";
const LANES = [['goal','هدف المستفيد'],['act','ما يفعله المستفيد'],['tp','نقاط التواصل والقنوات'],['sys','الأنظمة والجهات خلف الواجهة'],['emo','المشاعر'],['pain','نقاط الألم'],['opp','الفرص'],['kpi','المؤشرات']];
const EMO = [[2,'سعيد جداً'],[1,'راضٍ'],[0,'محايد'],[-1,'منزعج'],[-2,'محبط جداً']];
const KEY = 'cxk-journey-v1', COLW = 220, LANEW = 150;
const esc = s => String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const clone = o => JSON.parse(JSON.stringify(o));
const blankStage = i => ({n:`المرحلة ${i}`,goal:'',act:'',tp:'',sys:'',emo:0,pain:'',opp:'',kpi:''});

function load(){ try{ const s=localStorage.getItem(KEY); if(s){ const j=JSON.parse(s); if(j&&Array.isArray(j.stages)) return j; } }catch(e){} return clone(window.CXK_JOURNEY.samples.permit); }
function save(st){ try{ localStorage.setItem(KEY, JSON.stringify(st)); }catch(e){} }

window.CXK_JourneyTool = function(host){
  let st = load();
  host.innerHTML = `
    <div class="jt-bar">
      <label class="sr" for="jtSample">ابدأ من نموذج</label>
      <select class="sel" id="jtSample"><option value="">ابدأ من نموذج…</option><option value="permit">إصدار رخصة بناء</option><option value="report">تقديم بلاغ</option><option value="blank">رحلة فارغة</option></select>
      <button class="btn sm" type="button" id="jtAdd">+ مرحلة</button>
      <span class="grow"></span>
      <button class="btn sm" type="button" id="jtPng">تصدير صورة</button>
      <button class="btn sm" type="button" id="jtJson">حفظ ملف</button>
      <label class="btn sm" for="jtFile" style="cursor:pointer">فتح ملف</label><input type="file" id="jtFile" accept="application/json,.json" hidden>
      <button class="btn sm" type="button" id="jtPrint">طباعة</button>
    </div>
    <div class="jt-meta">
      <label>اسم الرحلة<input id="jtName" type="text" autocomplete="off"></label>
      <label>المستفيد (الشخصية الافتراضية)<input id="jtPersona" type="text" autocomplete="off"></label>
    </div>
    <div class="jt-scroll"><div class="jt" id="jtGrid"></div></div>
    <p class="jt-note">تُحفظ الرحلة تلقائياً في متصفحك فقط. احفظ ملفاً لنقلها إلى جهاز آخر أو مشاركتها مع فريقك.</p>`;
  const grid = host.querySelector('#jtGrid'), nameI = host.querySelector('#jtName'), perI = host.querySelector('#jtPersona');

  function curve(){
    const n=st.stages.length, W=n*COLW, H=110, y=v=>H/2 - v*(H/2-16)/2, x=i=>W-(i*COLW+COLW/2); /* RTL: stage 1 sits on the right */
    const pts=st.stages.map((s,i)=>[x(i),y(+s.emo||0)]);
    let d=''; pts.forEach((p,i)=>{ if(!i){d=`M${p[0]} ${p[1]}`;return;} const q=pts[i-1], mx=(q[0]+p[0])/2; d+=` C${mx} ${q[1]} ${mx} ${p[1]} ${p[0]} ${p[1]}`; });
    let g=`<line x1="0" x2="${W}" y1="${H/2}" y2="${H/2}" stroke="var(--line-2)" stroke-dasharray="4 4"/>`;
    g+=`<path d="${d}" fill="none" stroke="var(--accent)" stroke-width="2.5"/>`;
    pts.forEach((p,i)=>{ const v=+st.stages[i].emo||0; g+=`<circle cx="${p[0]}" cy="${p[1]}" r="7" fill="${v<0?'var(--down)':v>0?'var(--up)':'var(--muted)'}" stroke="var(--surface)" stroke-width="2"/>`; });
    return `<svg viewBox="0 0 ${W} ${H}" preserveAspectRatio="none" style="direction:ltr" aria-hidden="true">${g}</svg>`;
  }
  function render(){
    nameI.value = st.name||''; perI.value = st.persona||'';
    const n=st.stages.length;
    grid.style.gridTemplateColumns = `${LANEW}px repeat(${n}, ${COLW}px)`;
    let h = `<div class="lane">المراحل</div>`;
    st.stages.forEach((s,i)=>{ h+=`<div class="cell shead"><input data-i="${i}" data-k="n" value="${esc(s.n)}" aria-label="اسم المرحلة ${i+1}">
      <button type="button" data-act="prev" data-i="${i}" aria-label="نقل المرحلة إلى اليمين" ${i===0?'disabled':''}>›</button>
      <button type="button" data-act="next" data-i="${i}" aria-label="نقل المرحلة إلى اليسار" ${i===n-1?'disabled':''}>‹</button>
      <button type="button" data-act="del" data-i="${i}" aria-label="حذف المرحلة" ${n<=1?'disabled':''}>×</button></div>`; });
    LANES.forEach(([k,l])=>{
      h += `<div class="lane">${l}</div>`;
      if(k==='emo'){
        h += `<div class="cell" style="grid-column:2 / span ${n};padding:0;width:auto"><div style="position:relative;height:110px">${curve()}</div>
          <div style="display:grid;grid-template-columns:repeat(${n},${COLW}px)">${st.stages.map((s,i)=>`<div class="emo"><select data-i="${i}" data-k="emo" aria-label="المشاعر في ${esc(s.n)}">${EMO.map(([v,t])=>`<option value="${v}" ${(+s.emo||0)===v?'selected':''}>${t}</option>`).join('')}</select></div>`).join('')}</div></div>`;
      } else {
        st.stages.forEach((s,i)=>{ h+=`<div class="cell ${k}"><textarea data-i="${i}" data-k="${k}" aria-label="${l} — ${esc(s.n)}" placeholder="…">${esc(s[k])}</textarea></div>`; });
      }
    });
    grid.innerHTML = h;
  }
  const commit = () => save(st);
  grid.addEventListener('input',e=>{ const t=e.target; if(t.dataset.i==null) return; st.stages[+t.dataset.i][t.dataset.k] = t.dataset.k==='emo' ? +t.value : t.value; commit();
    if(t.dataset.k==='emo'){ const box=grid.querySelector('svg').parentNode; box.innerHTML=curve(); } });
  grid.addEventListener('change',e=>{ if(e.target.dataset.k==='emo') grid.dispatchEvent(new Event('input')); });
  grid.addEventListener('click',e=>{ const b=e.target.closest('button[data-act]'); if(!b) return; const i=+b.dataset.i, a=b.dataset.act, S=st.stages;
    if(a==='del' && S.length>1) S.splice(i,1);
    if(a==='prev' && i>0) [S[i-1],S[i]]=[S[i],S[i-1]];
    if(a==='next' && i<S.length-1) [S[i+1],S[i]]=[S[i],S[i+1]];
    commit(); render(); });
  nameI.addEventListener('input',()=>{ st.name=nameI.value; commit(); });
  perI.addEventListener('input',()=>{ st.persona=perI.value; commit(); });
  host.querySelector('#jtAdd').addEventListener('click',()=>{ st.stages.push(blankStage(st.stages.length+1)); commit(); render(); host.querySelector('.jt-scroll').scrollLeft = -1e6; });
  host.querySelector('#jtSample').addEventListener('change',e=>{ const v=e.target.value; if(!v) return; st=clone(window.CXK_JOURNEY.samples[v]); commit(); render(); e.target.value=''; window.CXK.toast('تم تحميل النموذج'); });
  host.querySelector('#jtJson').addEventListener('click',()=>{ const blob=new Blob([JSON.stringify(st,null,2)],{type:'application/json'}); const a=document.createElement('a'); a.href=URL.createObjectURL(blob); a.download=(st.name||'journey').replace(/[\\/:*?"<>|]/g,'')+'.json'; document.body.appendChild(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(a.href),2000); });
  host.querySelector('#jtFile').addEventListener('change',e=>{ const f=e.target.files[0]; if(!f) return; const r=new FileReader(); r.onload=()=>{ try{ const j=JSON.parse(r.result); if(!Array.isArray(j.stages)||!j.stages.length) throw 0; st=j; commit(); render(); window.CXK.toast('تم فتح الرحلة'); }catch(_){ window.CXK.toast('الملف ليس رحلة صالحة من هذه الأداة'); } }; r.readAsText(f); e.target.value=''; });
  host.querySelector('#jtPrint').addEventListener('click',()=>window.print());
  host.querySelector('#jtPng').addEventListener('click',async ()=>{
    const btn=host.querySelector('#jtPng'); btn.disabled=true; btn.textContent='جارٍ التصدير…';
    try{
      if(!window.html2canvas){ await new Promise((ok,no)=>{ const s=document.createElement('script'); s.src='assets/vendor/html2canvas.min.js'; s.onload=ok; s.onerror=no; document.head.appendChild(s); }); }
      const wrap=document.createElement('div'); const bg=getComputedStyle(document.body).backgroundColor;
      wrap.style.cssText=`position:fixed;top:0;left:-99999px;padding:28px;background:${bg};direction:rtl;width:${LANEW+st.stages.length*COLW+60}px`;
      wrap.innerHTML=`<div style="font:800 26px 'Thmanyah Serif Display','Thmanyah Sans','IBM Plex Sans Arabic',sans-serif;margin-bottom:4px">${esc(st.name||'رحلة العميل')}</div><div style="font:15px 'Thmanyah Sans','IBM Plex Sans Arabic',sans-serif;opacity:.7;margin-bottom:18px">${esc(st.persona||'')}</div>`;
      const g=grid.cloneNode(true); g.querySelectorAll('textarea').forEach((t,i)=>{ const d=document.createElement('div'); d.textContent=grid.querySelectorAll('textarea')[i].value; d.style.cssText='font:14px/1.6 "Thmanyah Sans","IBM Plex Sans Arabic",sans-serif;padding:6px 8px;white-space:pre-wrap;min-height:60px'; t.replaceWith(d); });
      g.querySelectorAll('.shead input').forEach((t,i)=>{ const d=document.createElement('div'); d.textContent=st.stages[i].n; d.style.cssText='font:700 15px "Thmanyah Serif Display","Thmanyah Sans","IBM Plex Sans Arabic",sans-serif;padding:6px 8px'; t.replaceWith(d); });
      g.querySelectorAll('.shead button').forEach(b=>b.remove());
      g.querySelectorAll('select').forEach((s,i)=>{ const d=document.createElement('div'); d.textContent=(EMO.find(x=>x[0]===(+st.stages[i].emo||0))||[0,''])[1]; d.style.cssText='font:13px "Thmanyah Sans","IBM Plex Sans Arabic",sans-serif'; s.replaceWith(d); });
      g.style.border='1px solid var(--line)'; wrap.appendChild(g);
      wrap.insertAdjacentHTML('beforeend',`<div style="font:12px 'IBM Plex Mono',monospace;opacity:.55;margin-top:12px;direction:ltr;text-align:left">CX Knowledge · Journey Map</div>`);
      document.body.appendChild(wrap);
      const cv=await window.html2canvas(wrap,{backgroundColor:bg,scale:2,useCORS:true});
      wrap.remove();
      const a=document.createElement('a'); a.href=cv.toDataURL('image/png'); a.download=(st.name||'journey').replace(/[\\/:*?"<>|]/g,'')+'.png'; document.body.appendChild(a); a.click(); a.remove();
      window.CXK.toast('تم تصدير الصورة');
    }catch(e){ window.CXK.toast('تعذّر تصدير الصورة؛ جرّب الطباعة'); }
    btn.disabled=false; btn.textContent='تصدير صورة';
  });
  render();
};
})();
