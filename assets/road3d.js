/* طريق الرحلة — مشهد ثلاثي الأبعاد خفيف على Canvas دون مكتبات: أرض منخفضة التفاصيل، وطريق متعرّج، وخمس محطات مضيئة، وكاميرا تسير مع التمرير. */
(function(){
"use strict";
const hash=(x,y)=>{ let h=Math.sin(x*127.1+y*311.7)*43758.5453; return h-Math.floor(h); };
const smooth=t=>t*t*(3-2*t);
function noise(x,y){ const xi=Math.floor(x), yi=Math.floor(y), xf=x-xi, yf=y-yi; const a=hash(xi,yi), b=hash(xi+1,yi), c=hash(xi,yi+1), d=hash(xi+1,yi+1); const u=smooth(xf), v=smooth(yf); return a+(b-a)*u+(c-a)*v+(a-b-c+d)*u*v; }
function catmull(pts, n){ const out=[]; const P=i=>pts[Math.max(0,Math.min(pts.length-1,i))]; for(let i=0;i<pts.length-1;i++){ const p0=P(i-1),p1=P(i),p2=P(i+1),p3=P(i+2); const steps=i===pts.length-2?n+1:n; for(let s=0;s<steps;s++){ const t=s/n, t2=t*t, t3=t2*t; out.push([0,1,2].map(k=>0.5*((2*p1[k])+(-p0[k]+p2[k])*t+(2*p0[k]-5*p1[k]+4*p2[k]-p3[k])*t2+(-p0[k]+3*p1[k]-3*p2[k]+p3[k])*t3))); } } return out; }
const mixc=(a,b,t)=>[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t,a[2]+(b[2]-a[2])*t];
const css=c=>`rgb(${c[0]|0},${c[1]|0},${c[2]|0})`;
const hex=h=>[parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)];

const PAL={
 dark:{ sky0:[7,10,18], sky1:[16,22,38], fog:[11,15,26], ground:[20,26,42], groundHi:[44,54,84], road:[28,32,46], roadHi:[64,70,92], line:[236,238,246], edge:[255,107,61], star:[255,255,255] },
 light:{ sky0:[246,244,238], sky1:[224,228,238], fog:[236,236,232], ground:[214,216,210], groundHi:[246,246,242], road:[120,124,136], roadHi:[160,164,176], line:[255,255,255], edge:[230,83,31], star:[120,124,136] }
};

function Road(host, opts){
  const o=Object.assign({stations:[], onStation:null, dark:true, reduced:false}, opts||{});
  const cv=document.createElement('canvas'); cv.className='road-cv'; host.appendChild(cv);
  const lab=document.createElement('div'); lab.className='road-labels'; host.appendChild(lab);
  const ctx=cv.getContext('2d',{alpha:false});
  let W=0,H=0,DPR=1, pal=o.dark?PAL.dark:PAL.light, raf=0, dead=false;
  let progress=0, shown=0, mx=0,my=0, tmx=0,tmy=0, t0=performance.now();

  /* المسار */
  const ctrl=[[0,0,-30],[0,0,0],[7,0,45],[-9,0,95],[5,0,150],[-4,0,205],[2,0,260],[0,0,310],[0,0,360]];
  const curve=catmull(ctrl,24); const N=curve.length;
  const at=u=>curve[Math.max(0,Math.min(N-1,Math.round(u*(N-1))))];
  const tang=u=>{ const a=at(Math.max(0,u-0.004)), b=at(Math.min(1,u+0.004)); const dx=b[0]-a[0], dz=b[2]-a[2], l=Math.hypot(dx,dz)||1; return [dx/l,0,dz/l]; };
  const SU=[0.12,0.31,0.50,0.69,0.88]; // مواضع المحطات
  const stations=o.stations.map((s,i)=>({...s,u:SU[i],pos:at(SU[i]),col:hex(s.hue||'#FF6B3D')}));

  /* حواف الطريق: عمودي على المماس عند كل عيّنة حتى تتطابق أضلاع المقاطع المتجاورة */
  const EDGE=curve.map((c,i)=>{ const a=curve[Math.max(0,i-1)], b=curve[Math.min(N-1,i+1)]; const dx=b[0]-a[0], dz=b[2]-a[2], l=Math.hypot(dx,dz)||1; const nx=-dz/l*3.2, nz=dx/l*3.2; return [[c[0]-nx,0.08,c[2]-nz],[c[0]+nx,0.08,c[2]+nz]]; });
  /* الأرض */
  const roadHalf=3.2, cell=6, XR=66, Z0=-40, Z1=380;
  const roadX=z=>{ // الإزاحة الأفقية للطريق عند عمق z (تقريب بالبحث)
    let best=0,bd=1e9; for(let i=0;i<N;i+=4){ const d=Math.abs(curve[i][2]-z); if(d<bd){bd=d;best=i;} } return curve[best][0]; };
  const terrain=[]; // صفوف من الرؤوس
  for(let z=Z0; z<=Z1; z+=cell){ const row=[]; const rx=roadX(z); for(let x=-XR; x<=XR; x+=cell){ const dist=Math.max(0,Math.abs(x-rx)-roadHalf-2.5); const h=(noise(x*0.07+3,z*0.07)*7+noise(x*0.21,z*0.19)*2.2)*Math.min(1,dist/14); row.push([x,h*0.9,z]); } terrain.push(row); }
  const rows=terrain.length, cols=terrain[0].length;
  /* النجوم/الجسيمات */
  const stars=[]; for(let i=0;i<160;i++) stars.push([(Math.random()*2-1)*140, 6+Math.random()*40, Math.random()*420-40, Math.random()]);

  /* الكاميرا */
  let cam={p:[0,5,-20], t:[0,1,10]};
  let basis=null;
  function setCam(p,t){ cam.p=p; cam.t=t; const f=[t[0]-p[0],t[1]-p[1],t[2]-p[2]]; const fl=Math.hypot(...f); f[0]/=fl;f[1]/=fl;f[2]/=fl; const r=[f[2],0,-f[0]]; const rl=Math.hypot(...r)||1; r[0]/=rl;r[2]/=rl; const up=[f[1]*r[2]-f[2]*r[1], f[2]*r[0]-f[0]*r[2], f[0]*r[1]-f[1]*r[0]]; basis={f,r,up}; }
  const FOC=()=>H*0.95;
  function proj(v){ const dx=v[0]-cam.p[0], dy=v[1]-cam.p[1], dz=v[2]-cam.p[2]; const z=dx*basis.f[0]+dy*basis.f[1]+dz*basis.f[2]; if(z<0.6) return null; const x=dx*basis.r[0]+dy*basis.r[1]+dz*basis.r[2]; const y=dx*basis.up[0]+dy*basis.up[1]+dz*basis.up[2]; const f=FOC()/z; return [W/2+x*f, H*0.56-y*f, z]; }
  const fogT=z=>Math.min(1,Math.max(0,(z-30)/150));

  function resize(){ const r=host.getBoundingClientRect(); W=Math.max(320,Math.round(r.width)); H=Math.max(300,Math.round(r.height)); DPR=Math.min(window.devicePixelRatio||1, W>900?2:1.5); cv.width=W*DPR; cv.height=H*DPR; cv.style.width=W+'px'; cv.style.height=H+'px'; ctx.setTransform(DPR,0,0,DPR,0,0); }
  resize(); const ro=new ResizeObserver(resize); ro.observe(host);

  function frame(now){
    if(dead) return; raf=requestAnimationFrame(frame);
    const dt=Math.min(0.05,(now-t0)/1000); t0=now;
    shown+= (progress-shown)*Math.min(1,dt*4.5); mx+=(tmx-mx)*dt*5; my+=(tmy-my)*dt*5;
    const cu=0.005+shown*0.755, tu=Math.min(1,cu+0.085); const cp=at(cu), tp=at(tu), tg=tang(cu);
    const side=[-tg[2],0,tg[0]]; const bob=o.reduced?0:Math.sin(now/1900)*0.12;
    setCam([cp[0]+side[0]*mx*2.2, 4.6+my*1.2+bob, cp[2]+side[2]*mx*2.2],[tp[0],1.4,tp[2]]);
    draw(now);
  }
  function draw(now){
    /* السماء */
    const g=ctx.createLinearGradient(0,0,0,H); g.addColorStop(0,css(pal.sky0)); g.addColorStop(0.58,css(pal.sky1)); g.addColorStop(1,css(pal.fog)); ctx.fillStyle=g; ctx.fillRect(0,0,W,H);
    /* وهج الأفق */
    const hz=ctx.createRadialGradient(W*0.5,H*0.52,10,W*0.5,H*0.52,W*0.55); hz.addColorStop(0,o.dark?'rgba(255,107,61,.16)':'rgba(230,83,31,.10)'); hz.addColorStop(1,'rgba(0,0,0,0)'); ctx.fillStyle=hz; ctx.fillRect(0,0,W,H);
    /* النجوم */
    ctx.fillStyle=css(pal.star);
    for(const s of stars){ const p=proj(s); if(!p) continue; const a=(1-fogT(p[2]))*(0.25+0.5*s[3])*(o.dark?1:0.5); if(a<0.03) continue; ctx.globalAlpha=a; const r=0.6+1.6*s[3]*(1-p[2]/400); ctx.beginPath(); ctx.arc(p[0],p[1],r,0,6.283); ctx.fill(); }
    ctx.globalAlpha=1;
    /* الأرض: مثلثات مرتبة من البعيد إلى القريب */
    const light=[0.35,0.8,-0.45]; const tris=[];
    const P=new Array(rows); for(let i=0;i<rows;i++){ const z=terrain[i][0][2]; if(z<cam.p[2]-12 || z>cam.p[2]+190) { P[i]=null; continue; } P[i]=terrain[i].map(proj); }
    for(let i=0;i<rows-1;i++){ if(!P[i]||!P[i+1]) continue; for(let j=0;j<cols-1;j++){ const a=P[i][j],b=P[i][j+1],c=P[i+1][j],d=P[i+1][j+1]; if(!a||!b||!c||!d) continue;
      const va=terrain[i][j], vb=terrain[i][j+1], vc=terrain[i+1][j], vd=terrain[i+1][j+1];
      const n1=norm(va,vb,vc), n2=norm(vb,vd,vc); const z1=(a[2]+b[2]+c[2])/3, z2=(b[2]+d[2]+c[2])/3;
      tris.push([z1,a,b,c,n1],[z2,b,d,c,n2]); } }
    tris.sort((x,y)=>y[0]-x[0]);
    for(const t of tris){ const sh=Math.max(0,t[4][0]*light[0]+t[4][1]*light[1]+t[4][2]*light[2]); let col=mixc(pal.ground,pal.groundHi,sh*0.75); col=mixc(col,pal.fog,fogT(t[0])); const cs=css(col); ctx.fillStyle=cs; ctx.strokeStyle=cs; ctx.lineWidth=0.7; ctx.beginPath(); ctx.moveTo(t[1][0],t[1][1]); ctx.lineTo(t[2][0],t[2][1]); ctx.lineTo(t[3][0],t[3][1]); ctx.closePath(); ctx.fill(); ctx.stroke(); }
    /* الطريق */
    const segs=[]; for(let i=0;i<N-1;i++){ const c0=curve[i], c1=curve[i+1]; if(c0[2]<cam.p[2]-10||c0[2]>cam.p[2]+200) continue; const q=[proj(EDGE[i][0]),proj(EDGE[i][1]),proj(EDGE[i+1][1]),proj(EDGE[i+1][0])]; if(q.some(p=>!p)) continue; segs.push([q[0][2],q,i,c0,c1]); }
    segs.sort((a,b)=>b[0]-a[0]);
    for(const s of segs){ const q=s[1], f=fogT(s[0]); const col=mixc(mixc(pal.road,pal.roadHi,0.25),pal.fog,f); ctx.fillStyle=css(col); ctx.strokeStyle=css(col); ctx.lineWidth=0.8; ctx.beginPath(); ctx.moveTo(q[0][0],q[0][1]); ctx.lineTo(q[1][0],q[1][1]); ctx.lineTo(q[2][0],q[2][1]); ctx.lineTo(q[3][0],q[3][1]); ctx.closePath(); ctx.fill(); ctx.stroke();
      /* الحواف */
      ctx.globalAlpha=(1-f)*0.9; ctx.strokeStyle=css(pal.edge); ctx.lineWidth=Math.max(0.6,2.2*(1-f)); ctx.beginPath(); ctx.moveTo(q[0][0],q[0][1]); ctx.lineTo(q[3][0],q[3][1]); ctx.moveTo(q[1][0],q[1][1]); ctx.lineTo(q[2][0],q[2][1]); ctx.stroke();
      /* الخط الأوسط المتقطع */
      if(s[2]%2===0){ const c0=s[3],c1=s[4]; const a=proj([c0[0],0.1,c0[2]]), b=proj([(c0[0]+c1[0])/2,0.1,(c0[2]+c1[2])/2]); if(a&&b){ ctx.strokeStyle=css(pal.line); ctx.lineWidth=Math.max(0.5,1.6*(1-f)); ctx.globalAlpha=(1-f)*0.7; ctx.beginPath(); ctx.moveTo(a[0],a[1]); ctx.lineTo(b[0],b[1]); ctx.stroke(); } }
      ctx.globalAlpha=1; }
    /* المحطات */
    const idx=Math.round(shown*4); stations.forEach(s=>{ if(s.el) s.el.style.opacity='0'; }); const sts=stations.map(s=>({s,p:proj(s.pos),top:proj([s.pos[0],8.5,s.pos[2]])})).filter(x=>x.p&&x.top).sort((a,b)=>b.p[2]-a.p[2]);
    for(const {s,p,top} of sts){ const f=fogT(p[2]); const near=1-Math.min(1,Math.abs(shown-(s.u-0.12)/0.76)*2.2); const pulse=o.reduced?0:0.5+0.5*Math.sin(now/700+s.n);
      /* حلقة أرضية */
      const rr=proj([s.pos[0]+4.2,0.12,s.pos[2]]); const rx=rr?Math.abs(rr[0]-p[0]):8, ry=rx*0.32; const col=`rgba(${s.col[0]},${s.col[1]},${s.col[2]},`;
      ctx.lineWidth=Math.max(1,3*(1-f)); ctx.strokeStyle=col+(0.55*(1-f))+')'; ctx.beginPath(); ctx.ellipse(p[0],p[1],rx,ry,0,0,6.283); ctx.stroke();
      ctx.strokeStyle=col+(0.25*(1-f))+')'; ctx.beginPath(); ctx.ellipse(p[0],p[1],rx*(1.25+0.15*pulse),ry*(1.25+0.15*pulse),0,0,6.283); ctx.stroke();
      /* العمود الضوئي */
      const w=Math.max(2,(rx*0.22)); const gg=ctx.createLinearGradient(0,top[1],0,p[1]); gg.addColorStop(0,col+'0)'); gg.addColorStop(0.5,col+(0.55*(1-f))+')'); gg.addColorStop(1,col+(0.9*(1-f))+')'); ctx.fillStyle=gg; ctx.fillRect(p[0]-w/2,top[1],w,p[1]-top[1]);
      const glow=ctx.createRadialGradient(p[0],p[1],1,p[0],p[1],rx*1.6); glow.addColorStop(0,col+(0.35*(1-f)+0.25*near)+')'); glow.addColorStop(1,col+'0)'); ctx.fillStyle=glow; ctx.fillRect(p[0]-rx*1.6,p[1]-ry*1.6,rx*3.2,ry*3.2);
      /* الملصق */
      const el=s.el; if(el){ const d=(s.n-1)-idx; const vis=d===0?1:(d===1&&W>640)?0.55:0; const sc=d===0?1:0.7; el.style.transform=`translate(-50%,-100%) translate(${p[0].toFixed(1)}px,${(top[1]+8).toFixed(1)}px) scale(${sc.toFixed(3)})`; el.style.opacity=vis.toFixed(2); el.style.pointerEvents=vis?'auto':'none'; el.style.zIndex=String(1000-Math.round(p[2])); el.classList.toggle('near',d===0); }
    }
  }
  function norm(a,b,c){ const ux=b[0]-a[0],uy=b[1]-a[1],uz=b[2]-a[2], vx=c[0]-a[0],vy=c[1]-a[1],vz=c[2]-a[2]; let nx=uy*vz-uz*vy, ny=uz*vx-ux*vz, nz=ux*vy-uy*vx; if(ny<0){nx=-nx;ny=-ny;nz=-nz;} const l=Math.hypot(nx,ny,nz)||1; return [nx/l,ny/l,nz/l]; }

  /* الملصقات */
  stations.forEach(s=>{ const el=document.createElement('button'); el.type='button'; el.className='road-st'; el.style.setProperty('--c',s.hue||'#FF6B3D'); el.innerHTML=`<span class="rs-n">${s.n}</span><span class="rs-t">${s.label}</span><span class="rs-q">${s.q||''}</span>`; el.addEventListener('click',()=>o.onStation&&o.onStation(s)); lab.appendChild(el); s.el=el; });

  host.addEventListener('pointermove',e=>{ const r=host.getBoundingClientRect(); tmx=((e.clientX-r.left)/r.width-0.5); tmy=-((e.clientY-r.top)/r.height-0.5); });
  host.addEventListener('pointerleave',()=>{ tmx=0; tmy=0; });
  if(o.reduced){ shown=progress; }
  raf=requestAnimationFrame(frame);
  return {
    setProgress(u){ progress=Math.max(0,Math.min(1,u)); if(o.reduced) shown=progress; },
    setTheme(dark){ pal=dark?PAL.dark:PAL.light; },
    stationU(i){ return (SU[i]-0.12)/0.76; },
    destroy(){ dead=true; cancelAnimationFrame(raf); ro.disconnect(); host.innerHTML=''; }
  };
}
window.CXK_Road=Road;
})();
