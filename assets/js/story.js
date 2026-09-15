/* Dental Legacy — one shared stage, native scroll, GSAP 3.13.0. */
(() => {
  'use strict';
  const crops = {
    crown: { x:642, y:398, w:230, h:240 },
    screw: { x:724, y:648, w:66, h:204 },
    abutment: { x:672, y:870, w:174, h:222 },
    body: { x:674, y:1100, w:164, h:450 }
  };
  let media, timeline, trigger;
  const chapterPositions = { beyond:.24, precision:.47, functionality:.72, natural:.94 };
  function init() {
    document.querySelectorAll('[data-crop]').forEach(el => {
      const c = crops[el.dataset.crop], img = el.querySelector('img');
      el.style.aspectRatio = `${c.w}/${c.h}`;
      Object.assign(img.style, {width:`${2360/c.w*100}%`,left:`${-c.x/c.w*100}%`,top:`${-c.y/c.h*100}%`});
    });
    if (!window.gsap || !window.ScrollTrigger) return;
    const { gsap, ScrollTrigger } = window;
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ignoreMobileResize:true});
    media = gsap.matchMedia();
    media.add({small:'(max-width:600px)',large:'(min-width:601px)',reduced:'(prefers-reduced-motion:reduce)'}, ctx => {
      if (ctx.conditions.reduced) { document.documentElement.classList.remove('enhanced'); return; }
      const small = ctx.conditions.small;
      document.documentElement.classList.add('enhanced');
      const stage = document.querySelector('.journey'), object = document.querySelector('.brand-object');
      const scenes = [...document.querySelectorAll('.scene')];
      const baseScale = () => small ? Math.min(innerHeight*.00059,.56) : Math.min(innerHeight/875,1.05);
      gsap.set(object,{xPercent:-50,yPercent:-50,x:0,y:0,left:small?'78%':'73%',top:small?'60%':'49%',scale:1,rotation:-7,opacity:small?.38:1});
      gsap.set('.implant-world',{xPercent:-50,yPercent:-50,x:0,y:0,scale:baseScale(),left:small?'54%':'69%',top:small?'66%':'55%',autoAlpha:0});
      gsap.set('.implant-piece',{xPercent:-50,x:0,y:0});
      gsap.set('.implant-screw',{autoAlpha:0});
      gsap.set('.part-label,.technical-axis',{autoAlpha:0});
      gsap.set('.anatomy',{autoAlpha:0,clipPath:'inset(100% 0 0 0)'});
      gsap.set('.function-word',{opacity:.15,y:12});
      const show = (selector, at, duration=.07) => timeline.fromTo(selector,{autoAlpha:0,y:small?15:30},{autoAlpha:1,y:0,duration},at);
      const hide = (selector, at, duration=.06) => timeline.to(selector,{autoAlpha:0,y:small?-12:-25,duration},at);
      timeline = gsap.timeline({defaults:{ease:'power2.inOut'},scrollTrigger:{
        id:'dental-journey',trigger:stage,start:'top top',end:'bottom bottom',scrub:small?.55:.9,invalidateOnRefresh:true,
        onUpdate(self){
          const chapter = self.progress<.16?0:self.progress<.36?1:self.progress<.61?2:self.progress<.83?3:4;
          document.getElementById('chapter-current').textContent=String(chapter+1).padStart(2,'0');
          scenes.forEach((scene,i)=>{scene.inert=i!==chapter;});
        }
      }});
      trigger = timeline.scrollTrigger;
      timeline.set('.implant-world',{scale:baseScale},0);
      // The first scene holds before the camera begins its continuous move.
      timeline.to({}, {duration:.09},0);
      hide('.scene-hero',.09,.08);
      timeline.to(object,{left:small?'39%':'28%',top:small?'32%':'49%',scale:small?1.04:1.18,rotation:5,opacity:small?.72:.8,duration:.17},.08);
      timeline.to('.object-ground',{left:small?'39%':'28%',top:small?'47%':'87%',opacity:.5,duration:.17},.08);
      show('.scene-beyond',.16);hide('.scene-beyond',.30,.07);
      timeline.to(object,{left:small?'55%':'68%',top:small?'67%':'50%',scale:small?1.07:1.18,opacity:.10,rotation:-7,duration:.16},.29);
      timeline.to('.object-ground',{left:small?'55%':'68%',top:small?'86%':'88%',opacity:.22,duration:.16},.29);
      timeline.to('.implant-world',{autoAlpha:1,duration:.08},.35);
      show('.scene-precision',.36,.065);
      timeline.to('.technical-axis',{autoAlpha:.6,duration:.08},.4);
      timeline.to('.implant-crown',{y:-55,duration:.13},.4);
      timeline.to('.implant-screw',{autoAlpha:1,y:-10,duration:.10},.44);
      timeline.to('.implant-abutment',{y:110,duration:.13},.43);
      timeline.to('.implant-body',{y:200,duration:.13},.45);
      timeline.to('.label-crown',{autoAlpha:1,duration:.035},.46);
      timeline.to('.label-abutment',{autoAlpha:1,duration:.035},.51);
      timeline.to('.label-body',{autoAlpha:1,duration:.035},.55);
      hide('.scene-precision',.59,.055);
      timeline.to('.part-label,.technical-axis',{autoAlpha:0,duration:.055},.59);
      timeline.to('.implant-world',{left:small?'63%':'71%',top:small?'65%':'57%',scale:()=>baseScale()*(small?1.2:1.06),duration:.12},.61);
      show('.scene-function',.63,.065);
      timeline.to('.implant-piece',{y:0,duration:.12},.61);
      timeline.to('.implant-screw',{autoAlpha:0,duration:.07},.65);
      timeline.to('.anatomy',{autoAlpha:1,clipPath:'inset(0% 0 0 0)',duration:.15},.65);
      timeline.to('.implant-piece',{autoAlpha:0,duration:.065},.71);
      timeline.to('.function-word',{opacity:1,y:0,stagger:.035,duration:.055},.65);
      timeline.to(object,{opacity:.08,rotation:4,duration:.15},.63);
      hide('.scene-function',.80,.065);
      timeline.to('.anatomy',{autoAlpha:0,clipPath:'inset(0 0 100% 0)',duration:.12},.79);
      timeline.to('.implant-world',{left:small?'49%':'29%',top:small?'25%':'32%',scale:()=>baseScale()*(small?1.5:1.7),duration:.15},.81);
      timeline.to('.implant-crown',{autoAlpha:1,y:285,duration:.10},.84);
      timeline.to(object,{left:small?'47%':'27%',top:small?'29%':'48%',scale:small?.8:1.15,rotation:-9,opacity:.17,duration:.16},.81);
      show('.scene-natural',.85,.08);
      timeline.to('.object-ground',{left:small?'47%':'29%',top:small?'45%':'78%',opacity:.5,duration:.15},.83);
      timeline.to({}, {duration:.07},.93);
      // Animate children during the intro; master scene transforms stay scroll-owned.
      if (scrollY < 50) {
        gsap.from('.hero-eyebrow',{opacity:0,y:12,duration:.8,delay:.12});
        gsap.from('.scene-hero .line>span,.scene-hero .line>em',{yPercent:115,opacity:0,duration:1.2,stagger:.12,delay:.35,ease:'power3.out'});
        gsap.from('.hero-description,.hero-actions',{opacity:0,y:15,duration:.9,stagger:.1,delay:1.05});
        gsap.from('.brand-light',{opacity:0,duration:1.5,delay:.2});
      }
      ScrollTrigger.refresh();
      return () => {scenes.forEach(s=>{s.inert=false;});document.documentElement.classList.remove('enhanced');timeline=null;trigger=null;};
    });
    document.fonts?.ready.then(()=>ScrollTrigger.refresh());
    window.addEventListener('pageshow',()=>ScrollTrigger.refresh());
  }
  function goTo(chapter) {
    if (!trigger || !chapterPositions[chapter]) return false;
    window.scrollTo({top:trigger.start+(trigger.end-trigger.start)*chapterPositions[chapter],behavior:'smooth'});
    return true;
  }
  window.DentalStory={init,goTo,destroy(){media?.revert();}};
})();
