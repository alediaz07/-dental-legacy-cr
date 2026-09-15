(() => {
  'use strict';
  function init() {
    const cards=[...document.querySelectorAll('.reel')];
    if(!cards.length) return;
    const reduced=matchMedia('(prefers-reduced-motion:reduce)'),ratios=new Map();
    let chosen=null;
    const states=cards.map(card=>{
      const video=card.querySelector('video'),play=card.querySelector('.reel-play'),sound=card.querySelector('.reel-sound');
      const state={card,video,play,sound,userPaused:false};ratios.set(card,0);
      function sync(){play.setAttribute('aria-label',`${video.paused?'Reproducir':'Pausar'}: ${card.querySelector('h3').textContent}`);play.querySelector('.play-icon').textContent=video.paused?'▶':'Ⅱ';sound.firstChild.textContent=video.muted?'Activar sonido ':'Silenciar ';sound.setAttribute('aria-pressed',String(!video.muted));card.classList.toggle('is-playing',!video.paused);}
      video.addEventListener('play',sync);video.addEventListener('pause',sync);video.addEventListener('volumechange',sync);
      video.addEventListener('ended',()=>{state.userPaused=true;sync();});
      video.addEventListener('error',()=>{card.querySelector('.video-error').hidden=false;card.classList.add('has-error');});
      play.addEventListener('click',()=>{if(video.paused){state.userPaused=false;chosen=state;start(state,true);}else{state.userPaused=true;video.pause();}});
      sound.addEventListener('click',()=>{video.muted=!video.muted;if(!video.muted){state.userPaused=false;chosen=state;start(state,true);}sync();});
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
    const nearby=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting&&!navigator.connection?.saveData&&!reduced.matches){const s=states.find(s=>s.card===e.target);load(s);nearby.unobserve(e.target);}}),{rootMargin:'250px 0px'});
    const visibility=new IntersectionObserver(entries=>{entries.forEach(e=>ratios.set(e.target,e.intersectionRatio));choose();},{threshold:[0,.2,.35,.55,.8,1]});
    cards.forEach(c=>{nearby.observe(c);visibility.observe(c);});
    document.addEventListener('visibilitychange',()=>{if(document.hidden)states.forEach(s=>s.video.pause());else choose();});
    reduced.addEventListener('change',()=>{if(reduced.matches)states.forEach(s=>s.video.pause());else choose();});
    addEventListener('pagehide',()=>states.forEach(s=>s.video.pause()));
  }
  window.DentalReels={init};
})();
