'use strict';
(() => {
  const canvas = document.getElementById('world');
  const ctx = canvas.getContext('2d');
  const motion = document.getElementById('motion');
  const media = matchMedia('(prefers-reduced-motion: reduce)');
  if (!ctx) { motion.hidden = true; return; }
  let width = 1, height = 1, phase = .7, previous = 0, frame = 0, visible = true;
  let paused = media.matches, view = 'orbit';
  const TAU = Math.PI * 2;
  const stars = Array.from({length:95}, (_, i) => ({x:((i * 7919) % 1000)/1000,y:((i * 3571) % 1000)/1000,r:i % 7 === 0 ? 1.2 : .55}));
  const project = (x,y,z,angle,tilt,cx,cy,radius) => {
    const xx = x*Math.cos(angle)+z*Math.sin(angle);
    const zz = -x*Math.sin(angle)+z*Math.cos(angle);
    const yy = y*Math.cos(tilt)-zz*Math.sin(tilt);
    const depth = y*Math.sin(tilt)+zz*Math.cos(tilt);
    return [cx+xx*radius,cy+yy*radius,depth];
  };
  function draw() {
    ctx.clearRect(0,0,width,height);
    const cx=width*.51, cy=height*.44, r=Math.min(width*.335,height*.295)*(view==='surface'?1.12:1);
    stars.forEach((star,i) => {ctx.fillStyle=`rgba(213,201,154,${.11+(i%4)*.07})`;ctx.beginPath();ctx.arc(star.x*width,70+star.y*(height-180),star.r,0,TAU);ctx.fill();});
    const glow=ctx.createRadialGradient(cx,cy,0,cx,cy,r*1.65);
    glow.addColorStop(0,'#8d6b3226');glow.addColorStop(.55,'#a7814020');glow.addColorStop(1,'#8d6b3200');ctx.fillStyle=glow;ctx.fillRect(0,0,width,height);
    const tilt=view==='surface'?.98:view==='signals'?.38:.28;
    const angle=phase*.11;
    const sphere=ctx.createRadialGradient(cx-r*.3,cy-r*.45,r*.05,cx,cy,r);
    sphere.addColorStop(0,'#4f452b');sphere.addColorStop(.52,'#2e301e');sphere.addColorStop(1,'#10160f');
    ctx.fillStyle=sphere;ctx.beginPath();ctx.arc(cx,cy,r*.97,0,TAU);ctx.fill();
    // Fixed authored contour field; the animation rotates it rather than simulating life.
    for(let lat=-42;lat<=42;lat+=2){
      const phi=lat/44*Math.PI/2;
      let old=null;
      for(let j=0;j<=144;j++){
        const t=j/144*TAU;
        const wave=.022*Math.sin(t*5+phi*8)+.015*Math.cos(t*9-phi*5)+.012*Math.sin(t*13+phi*11);
        const rr=1+wave;
        const p=project(Math.cos(phi)*Math.cos(t)*rr,Math.sin(phi)*rr,Math.cos(phi)*Math.sin(t)*rr,angle,tilt,cx,cy,r);
        if(old){
          const alpha=p[2]>0?.28+.5*p[2]:.055;
          const green=view==='surface';
          ctx.strokeStyle=green?`rgba(185,197,143,${alpha})`:`rgba(222,182,113,${alpha})`;
          ctx.lineWidth=p[2]>.6?1.05:.65;
          ctx.beginPath();ctx.moveTo(old[0],old[1]);ctx.lineTo(p[0],p[1]);ctx.stroke();
        }old=p;
      }
    }
    // Three independent orbit paths create the visual language of alternate timelines.
    for(let orbit=0;orbit<3;orbit++){
      const tiltOrbit=[.28,1.15,-.68][orbit];
      const rot=[.35,-.5,.82][orbit];
      let old=null;
      for(let j=0;j<=150;j++){
        const t=j/150*TAU;
        const p=project(Math.cos(t)*1.34,Math.sin(t)*.95,0,rot,tiltOrbit,cx,cy,r);
        const x=cx+(p[0]-cx)*Math.cos(rot)-(p[1]-cy)*Math.sin(rot);
        const y=cy+(p[0]-cx)*Math.sin(rot)+(p[1]-cy)*Math.cos(rot);
        if(old){ctx.strokeStyle=`rgba(184,177,132,${p[2]>0?.29:.12})`;ctx.lineWidth=.7;ctx.beginPath();ctx.moveTo(...old);ctx.lineTo(x,y);ctx.stroke();}old=[x,y];
      }
      const t=phase*.15+orbit*2.1;
      const p=project(Math.cos(t)*1.34,Math.sin(t)*.95,0,rot,tiltOrbit,cx,cy,r);
      const x=cx+(p[0]-cx)*Math.cos(rot)-(p[1]-cy)*Math.sin(rot),y=cy+(p[0]-cx)*Math.sin(rot)+(p[1]-cy)*Math.cos(rot);
      ctx.fillStyle=orbit===1?'#c3ceb0':'#edd1a0';ctx.shadowColor='#e6c080';ctx.shadowBlur=12;ctx.beginPath();ctx.arc(x,y,orbit===1?2.5:2,0,TAU);ctx.fill();ctx.shadowBlur=0;
    }
    const count=view==='signals'?36:11;
    for(let k=0;k<count;k++){
      const phi=Math.sin(k*4.12)*1.2,t=k*2.4;
      const p=project(Math.cos(phi)*Math.cos(t)*1.012,Math.sin(phi)*1.012,Math.cos(phi)*Math.sin(t)*1.012,angle,tilt,cx,cy,r);
      if(p[2]>0){ctx.fillStyle=`rgba(243,214,155,${.4+.55*p[2]})`;ctx.shadowBlur=9;ctx.shadowColor='#edc887';ctx.beginPath();ctx.arc(p[0],p[1],view==='signals'?2:1.2,0,TAU);ctx.fill();ctx.shadowBlur=0;}
    }
  }
  function tick(now){frame=0;if(paused||!visible||document.hidden)return;if(!previous||now-previous>=32){phase+=previous?Math.min((now-previous)/1000,.1):0;previous=now;draw();}frame=requestAnimationFrame(tick);}
  function sync(){cancelAnimationFrame(frame);previous=0;motion.textContent=paused?'▷':'Ⅱ';motion.setAttribute('aria-pressed',String(paused));motion.setAttribute('aria-label',paused?'Play artwork animation':'Pause artwork animation');draw();if(!paused&&visible&&!document.hidden)frame=requestAnimationFrame(tick);}
  function resize(){const rect=canvas.getBoundingClientRect();width=rect.width;height=rect.height;const dpr=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(width*dpr);canvas.height=Math.round(height*dpr);ctx.setTransform(dpr,0,0,dpr,0,0);draw();}
  new ResizeObserver(resize).observe(canvas);
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();},{threshold:0}).observe(canvas);
  motion.addEventListener('click',()=>{paused=!paused;sync();});
  media.addEventListener('change',event=>{paused=event.matches;sync();});
  document.addEventListener('visibilitychange',sync);
  const labels={orbit:['01 / ORBITAL PERSPECTIVE','Every point of view\nopens another world.'],surface:['02 / SURFACE PERSPECTIVE','A world of contours.\nA thousand possible paths.'],signals:['03 / SIGNAL PERSPECTIVE','A connection begins\nwith a single signal.']};
  document.querySelectorAll('[data-view]').forEach(button=>button.addEventListener('click',()=>{view=button.dataset.view;document.querySelectorAll('[data-view]').forEach(other=>other.setAttribute('aria-pressed',String(other===button)));document.getElementById('world-coordinate').textContent=labels[view][0];document.getElementById('world-caption').textContent=labels[view][1];draw();}));
  resize();sync();
})();
