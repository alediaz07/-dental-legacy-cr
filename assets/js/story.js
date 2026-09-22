/* Dental Legacy — one shared stage, native scroll, GSAP 3.13.0. */
(() => {
  'use strict';
  let media, timeline, trigger;
  let videoFrame = null;
  const chapterPositions = { beyond:.24, precision:.47, functionality:.72, natural:.94 };
  function init() {
    if (!window.gsap || !window.ScrollTrigger) return;
    const { gsap, ScrollTrigger } = window;
    gsap.registerPlugin(ScrollTrigger);
    ScrollTrigger.config({ignoreMobileResize:true});
    media = gsap.matchMedia();
    media.add({small:'(max-width:600px)',large:'(min-width:601px)',reduced:'(prefers-reduced-motion:reduce)'}, ctx => {
      if (ctx.conditions.reduced) { document.documentElement.classList.remove('enhanced'); return; }
      const small = ctx.conditions.small;
      document.documentElement.classList.add('enhanced');
      const stage = document.querySelector('.journey'), journeyStage = document.querySelector('.journey-stage'), stageLight = document.querySelector('.stage-light'), object = document.querySelector('.brand-object');
      const video = document.getElementById('implant-story-video');
      const scenes = [...document.querySelectorAll('.scene')];
      const baseScale = () => small ? Math.min(innerHeight*.00059,.56) : Math.min(innerHeight/875,1.05);
      gsap.set(object,{xPercent:-50,yPercent:-50,x:0,y:0,left:small?'78%':'73%',top:small?'60%':'54%',scale:1,rotation:-7,opacity:small?.38:1});
      gsap.set('.implant-video-world',{xPercent:-50,yPercent:-50,left:small?'55%':'69%',top:small?'64%':'54%',autoAlpha:0});
      gsap.set('.function-word',{opacity:.15,y:12});
      const show = (selector, at, duration=.07) => timeline.fromTo(selector,{autoAlpha:0,y:small?15:30},{autoAlpha:1,y:0,duration},at);
      const hide = (selector, at, duration=.06) => timeline.to(selector,{autoAlpha:0,y:small?-12:-25,duration},at);
      timeline = gsap.timeline({defaults:{ease:'power2.inOut'},scrollTrigger:{
        id:'dental-journey',trigger:stage,start:'top top',end:'bottom bottom',scrub:small?.55:.9,invalidateOnRefresh:true,
        onUpdate(self){
          const chapter = self.progress<.16?0:self.progress<.36?1:self.progress<.61?2:self.progress<.83?3:4;
          scenes.forEach((scene,i)=>{scene.inert=i!==chapter;});
          if (video && Number.isFinite(video.duration) && video.duration > 0) {
            const localProgress = gsap.utils.clamp(0,1,(self.progress-.35)/(.92-.35));
            const targetTime = localProgress * Math.max(0,video.duration-.08);
            if (Math.abs(video.currentTime-targetTime) > .01) {
              if (videoFrame !== null) cancelAnimationFrame(videoFrame);
              videoFrame = requestAnimationFrame(() => { video.currentTime = targetTime; videoFrame = null; });
            }
          }
        }
      }});
      trigger = timeline.scrollTrigger;
      if (video) {
        const refreshVideo = () => trigger?.update();
        video.addEventListener('loadedmetadata', refreshVideo, {once:true});
        video.addEventListener('durationchange', refreshVideo, {once:true});
      }
      timeline.set('.implant-video-world',{scale:baseScale},0);
      // The first scene holds before the camera begins its continuous move.
      timeline.to({}, {duration:.09},0);
      hide('.scene-hero',.09,.08);
      timeline.to(object,{left:small?'39%':'28%',top:small?'32%':'52%',scale:1,rotation:5,opacity:small?.72:.8,duration:.17},.08);
      timeline.to('.object-ground',{left:small?'39%':'28%',top:small?'47%':'87%',opacity:.5,duration:.17},.08);
      show('.scene-beyond',.16);hide('.scene-beyond',.30,.07);
      timeline.to(object,{left:small?'55%':'68%',top:small?'67%':'50%',scale:1,rotation:-7,duration:.16},.29);
      timeline.to('.object-ground',{left:small?'55%':'68%',top:small?'86%':'88%',duration:.16},.29);
      timeline.to(object,{autoAlpha:0,duration:.14,ease:'power2.inOut'},.30);
      timeline.to('.object-ground',{opacity:0,duration:.10,ease:'power2.inOut'},.30);
      timeline.to(stageLight,{autoAlpha:0,duration:.18,ease:'power2.inOut'},.31);
      timeline.to(journeyStage,{backgroundColor:'var(--implant-scene-bg)',duration:.20,ease:'power2.inOut'},.31);
      timeline.to('.implant-video-world',{autoAlpha:1,duration:.10},.35);
      show('.scene-precision',.36,.065);
      hide('.scene-precision',.59,.055);
      timeline.to('.implant-video-world',{left:small?'59%':'69%',top:small?'63%':'54%',scale:()=>baseScale()*(small?1.08:1),duration:.12},.61);
      show('.scene-function',.63,.065);
      timeline.to('.function-word',{opacity:1,y:0,stagger:.035,duration:.055},.65);
      timeline.to(object,{rotation:4,duration:.15},.63);
      hide('.scene-function',.72,.05);
      timeline.to('.implant-video-world',{left:small?'58%':'69%',top:small?'61%':'54%',scale:()=>baseScale()*(small?1.08:1),duration:.15},.81);
      timeline.to(object,{left:small?'47%':'27%',top:small?'29%':'48%',scale:small?.8:1.15,rotation:-9,duration:.16},.81);
      show('.scene-natural',.72,.06);
      timeline.to('.implant-video-world',{autoAlpha:0,duration:.08,ease:'power2.inOut'},.92);
      timeline.to('.scene-natural',{autoAlpha:0,duration:.06,ease:'power2.inOut'},.94);
      timeline.to(journeyStage,{backgroundColor:'var(--paper)',duration:.16,ease:'power2.inOut'},.84);
      // Animate children during the intro; master scene transforms stay scroll-owned.
      if (scrollY < 50) {
        gsap.from('.hero-eyebrow',{opacity:0,y:12,duration:.8,delay:.12});
        gsap.from('.scene-hero .line>span,.scene-hero .line>em',{yPercent:115,opacity:0,duration:1.2,stagger:.12,delay:.35,ease:'power3.out'});
        gsap.from('.hero-description,.hero-actions',{opacity:0,y:15,duration:.9,stagger:.1,delay:1.05});
        gsap.from('.brand-light',{opacity:0,duration:1.5,delay:1.35});
      }
      ScrollTrigger.refresh();
      return () => {if (videoFrame !== null) cancelAnimationFrame(videoFrame);videoFrame=null;scenes.forEach(s=>{s.inert=false;});document.documentElement.classList.remove('enhanced');timeline=null;trigger=null;};
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
