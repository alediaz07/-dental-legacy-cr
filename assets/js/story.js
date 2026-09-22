/* Dental Legacy — one shared stage, native scroll, GSAP 3.13.0. */
(() => {
  'use strict';
  let media, timeline, trigger;
  let videoFrame = null;
  let videoElement = null;
  let videoReady = false;
  let videoProgress = 0;
  let videoListenersAttached = false;
  let videoPrimeInFlight = false;
  let videoPrimed = false;
  let videoPrimeListenersAttached = false;
  let viewportListenersAttached = false;
  const chapterPositions = { beyond:.24, precision:.47, functionality:.72, natural:.94 };
  function canSeekVideo() {
    return videoElement && videoElement.readyState >= 2 && Number.isFinite(videoElement.duration) && videoElement.duration > 0;
  }
  function syncVideo() {
    if (!videoReady || !canSeekVideo() || videoElement.seeking || videoPrimeInFlight) return;
    const targetTime = videoProgress * Math.max(0, videoElement.duration - .08);
    if (Math.abs(videoElement.currentTime - targetTime) <= .035) return;
    try { videoElement.currentTime = targetTime; }
    catch { videoReady = false; }
  }
  function scheduleVideoSync(progress = videoProgress) {
    videoProgress = Math.max(0, Math.min(1, progress));
    if (!videoReady || !videoElement || videoElement.seeking || videoPrimeInFlight || videoFrame !== null) return;
    videoFrame = requestAnimationFrame(() => { videoFrame = null; syncVideo(); });
  }
  function updateVideoReadiness() {
    const ready = Boolean(canSeekVideo());
    if (!ready) { videoReady = false; return; }
    if (!videoReady) {
      videoReady = true;
      window.ScrollTrigger?.refresh();
      trigger?.update();
      scheduleVideoSync();
    }
  }
  function prepareVideo(video) {
    if (!video) return;
    videoElement = video;
    video.muted = true;
    video.playsInline = true;
    if (videoListenersAttached) return;
    videoListenersAttached = true;
    ['loadedmetadata', 'loadeddata', 'canplay', 'canplaythrough', 'durationchange', 'progress'].forEach((eventName) => {
      video.addEventListener(eventName, updateVideoReadiness);
    });
    video.addEventListener('seeked', () => { updateVideoReadiness(); scheduleVideoSync(); });
    video.addEventListener('error', () => { videoReady = false; });
    armVideoPriming();
    updateVideoReadiness();
  }
  function removeVideoPrimeListeners() {
    document.removeEventListener('touchstart', primeVideo, {passive:true});
    document.removeEventListener('pointerdown', primeVideo, {passive:true});
    videoPrimeListenersAttached = false;
  }
  function primeVideo() {
    if (!videoElement || videoPrimed || videoPrimeInFlight) return;
    videoElement.muted = true;
    videoElement.playsInline = true;
    videoPrimeInFlight = true;
    let playPromise;
    try { playPromise = videoElement.play(); }
    catch { videoPrimeInFlight = false; return; }
    if (!playPromise || typeof playPromise.then !== 'function') {
      videoElement.pause();
      videoPrimeInFlight = false;
      return;
    }
    playPromise.then(() => {
      videoElement.pause();
      videoPrimed = true;
      videoPrimeInFlight = false;
      removeVideoPrimeListeners();
      updateVideoReadiness();
      scheduleVideoSync();
    }).catch(() => { videoPrimeInFlight = false; });
  }
  function armVideoPriming() {
    if (videoPrimeListenersAttached || videoPrimed) return;
    videoPrimeListenersAttached = true;
    document.addEventListener('touchstart', primeVideo, {passive:true});
    document.addEventListener('pointerdown', primeVideo, {passive:true});
  }
  function refreshStoryViewport() {
    window.ScrollTrigger?.refresh();
    trigger?.update();
    updateVideoReadiness();
    scheduleVideoSync();
  }
  function handleOrientationChange() { requestAnimationFrame(refreshStoryViewport); }
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
      prepareVideo(video);
      const scenes = [...document.querySelectorAll('.scene')];
      const baseScale = () => small
        ? Math.min(.76,innerHeight/(innerWidth*.78*(16/9))*.70)
        : Math.min(innerHeight/875,1.05);
      gsap.set(object,{xPercent:-50,yPercent:-50,x:0,y:0,left:small?'78%':'73%',top:small?'60%':'54%',scale:1,rotation:-7,opacity:small?.38:1});
      gsap.set('.implant-video-world',{xPercent:-50,yPercent:-50,left:small?'74%':'69%',top:small?'64%':'54%',autoAlpha:0});
      gsap.set('.function-word',{opacity:.15,y:12});
      const show = (selector, at, duration=.07) => timeline.fromTo(selector,{autoAlpha:0,y:small?15:30},{autoAlpha:1,y:0,duration},at);
      const hide = (selector, at, duration=.06) => timeline.to(selector,{autoAlpha:0,y:small?-12:-25,duration},at);
      timeline = gsap.timeline({defaults:{ease:'power2.inOut'},scrollTrigger:{
        id:'dental-journey',trigger:stage,start:'top top',end:'bottom bottom',scrub:small?.55:.9,invalidateOnRefresh:true,
        onUpdate(self){
          const chapter = self.progress<.16?0:self.progress<.36?1:self.progress<.61?2:self.progress<.83?3:4;
          scenes.forEach((scene,i)=>{scene.inert=i!==chapter;});
          const localProgress = gsap.utils.clamp(0,1,(self.progress-.35)/(.92-.35));
          scheduleVideoSync(localProgress);
        }
      }});
      trigger = timeline.scrollTrigger;
      timeline.set('.implant-video-world',{scale:()=>baseScale()*(small?.88:1)},0);
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
      timeline.to('.implant-video-world',{left:small?'71%':'69%',top:small?'64%':'54%',scale:()=>baseScale()*(small?.97:1),duration:.12},.61);
      show('.scene-function',.63,.065);
      timeline.to('.function-word',{opacity:1,y:0,stagger:.035,duration:.055},.65);
      timeline.to(object,{rotation:4,duration:.15},.63);
      hide('.scene-function',.72,.05);
      timeline.to('.implant-video-world',{left:small?'70%':'69%',top:small?'60%':'54%',scale:()=>baseScale()*(small?.97:1),duration:.15},.81);
      timeline.to(object,{left:small?'47%':'27%',top:small?'29%':'48%',scale:small?.8:1.15,rotation:-9,duration:.16},.81);
      show('.scene-natural',.72,.06);
      timeline.to('.implant-video-world',{autoAlpha:0,duration:small?.025:.08,ease:'power2.inOut'},small?.975:.92);
      timeline.to('.scene-natural',{autoAlpha:0,duration:small?.015:.06,ease:'power2.inOut'},small?.985:.94);
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
    if (!viewportListenersAttached) {
      window.addEventListener('pageshow', refreshStoryViewport);
      window.addEventListener('orientationchange', handleOrientationChange, {passive:true});
      viewportListenersAttached = true;
    }
  }
  function goTo(chapter) {
    if (!trigger || !chapterPositions[chapter]) return false;
    window.scrollTo({top:trigger.start+(trigger.end-trigger.start)*chapterPositions[chapter],behavior:'smooth'});
    return true;
  }
  window.DentalStory={init,goTo,destroy(){media?.revert();}};
})();
