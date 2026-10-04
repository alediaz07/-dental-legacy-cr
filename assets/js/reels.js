(() => {
  'use strict';
  function initScrollCarousel(cards,reduced){
    if(!window.gsap||!window.ScrollTrigger||reduced.matches)return;
    const stage=document.querySelector('.reels-stage');
    if(!stage||stage.classList.contains('is-carousel'))return;
    const {gsap,ScrollTrigger}=window;
    stage.classList.add('is-carousel');
    stage.closest('.editorial-reels').classList.add('has-reel-carousel');
    const offset=()=>innerWidth*(innerWidth<=600?.88:.62);
    gsap.set(cards,{xPercent:-50,yPercent:-50,x:index=>index*offset(),autoAlpha:0,scale:.94});
    const carousel=gsap.timeline({defaults:{ease:'none'},scrollTrigger:{
      trigger:stage,start:()=>`top top+=${innerWidth<=600?76:100}`,end:()=>`+=${innerHeight*2}`,scrub:true,invalidateOnRefresh:true
    }});
    carousel.to(cards[0],{autoAlpha:1,scale:1,duration:.18,ease:'power2.out'},0)
      .to(cards[0],{x:()=>-offset(),duration:1},0)
      .to(cards[1],{x:0,duration:1},0)
      .to(cards[1],{autoAlpha:1,scale:1,duration:.18,ease:'power2.out'},.55)
      .to(cards[1],{x:()=>-offset(),duration:1},1)
      .to(cards[2],{x:0,duration:1},1)
      .to(cards[2],{autoAlpha:1,scale:1,duration:.18,ease:'power2.out'},1.55);
    ScrollTrigger.refresh();
  }
  function init() {
    const cards=[...document.querySelectorAll('.reel')];
    if(!cards.length) return;
    const reduced=matchMedia('(prefers-reduced-motion:reduce)'),ratios=new Map();
    initScrollCarousel(cards,reduced);
    let chosen=null;
    const states=cards.map(card=>{
      const video=card.querySelector('video'),play=card.querySelector('.reel-play'),sound=card.querySelector('.reel-sound');
      const state={card,video,play,sound,userPaused:false};ratios.set(card,0);
      function sync(){const labels=window.DentalLanguage?.reelControls?.()||{play:'Reproducir',pause:'Pausar',soundOn:'Activar sonido',soundOff:'Silenciar'};play.setAttribute('aria-label',`${video.paused?labels.play:labels.pause}: ${card.querySelector('h3').textContent}`);play.classList.toggle('is-playing',!video.paused);sound.setAttribute('aria-label',video.muted?labels.soundOn:labels.soundOff);sound.setAttribute('aria-pressed',String(!video.muted));card.classList.toggle('is-playing',!video.paused);}
      state.sync=sync;
      video.addEventListener('play',sync);video.addEventListener('pause',sync);video.addEventListener('volumechange',sync);
      video.addEventListener('ended',()=>{state.userPaused=true;sync();});
      video.addEventListener('error',()=>{card.querySelector('.video-error').hidden=false;card.classList.add('has-error');});
      play.addEventListener('click',()=>{if(video.paused){state.userPaused=false;chosen=state;start(state,true);}else{state.userPaused=true;video.pause();}});
      sound.addEventListener('click',()=>{video.muted=!video.muted;sync();});
      video.controls=false;sync();return state;
    });
    document.documentElement.classList.add('js-reels');
    function load(s){if(s.video.getAttribute('src'))return;s.video.preload='metadata';s.video.src=s.video.dataset.src;s.video.load();}
    function start(s,explicit=false){
      states.forEach(other=>{if(other!==s){other.video.pause();other.video.muted=true;}});
      if(document.hidden||(!explicit&&(reduced.matches||navigator.connection?.saveData||s.userPaused)))return;
      load(s);s.video.play().catch(()=>{});
    }
    function choose(){
      const visible=states.filter(s=>(ratios.get(s.card)||0)>.35);
      states.forEach(s=>{if(!visible.includes(s))s.video.pause();});
      if(chosen&&visible.includes(chosen)&&!chosen.userPaused){start(chosen);return;}
      const next=visible.filter(s=>!s.userPaused).sort((a,b)=>((ratios.get(b.card)||0)+(b.card.classList.contains('reel-featured')?.1:0))-((ratios.get(a.card)||0)+(a.card.classList.contains('reel-featured')?.1:0)))[0];
      chosen=next||null;if(next)start(next);
    }
    const nearby=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){const s=states.find(s=>s.card===e.target);load(s);nearby.unobserve(e.target);}}),{rootMargin:'250px 0px'});
    const visibility=new IntersectionObserver(entries=>{entries.forEach(e=>ratios.set(e.target,e.intersectionRatio));choose();},{threshold:[0,.2,.35,.55,.8,1]});
    cards.forEach(c=>{nearby.observe(c);visibility.observe(c);});
    document.addEventListener('visibilitychange',()=>{if(document.hidden)states.forEach(s=>s.video.pause());else choose();});
    reduced.addEventListener('change',()=>{if(reduced.matches)states.forEach(s=>s.video.pause());else choose();});
    addEventListener('pagehide',()=>states.forEach(s=>s.video.pause()));
    document.addEventListener('dental-language-change',()=>states.forEach(s=>s.sync()));
  }
  window.DentalReels={init};
})();
