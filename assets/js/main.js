(() => {
  'use strict';
  const menu=document.querySelector('#mobile-menu'),toggle=document.querySelector('.menu-toggle'),close=document.querySelector('.menu-close');
  let previousFocus;
  function closeMenu(){if(!menu.open)return;menu.close();}
  toggle.addEventListener('click',()=>{previousFocus=document.activeElement;menu.showModal();document.body.classList.add('menu-open');toggle.setAttribute('aria-expanded','true');close.focus();});
  close.addEventListener('click',closeMenu);
  menu.addEventListener('close',()=>{document.body.classList.remove('menu-open');toggle.setAttribute('aria-expanded','false');previousFocus?.focus({preventScroll:true});});
  menu.addEventListener('click',e=>{if(e.target===menu)closeMenu();});
  menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeMenu));
  window.DentalStory?.init();
  window.DentalReels?.init();
  document.querySelectorAll('[data-story-link]').forEach(link=>link.addEventListener('click',e=>{
    if(window.DentalStory?.goTo(link.dataset.storyLink)) {e.preventDefault();history.pushState(null,'',link.getAttribute('href'));}
  }));
  if(location.hash==='#filosofia')requestAnimationFrame(()=>window.DentalStory?.goTo('beyond'));
  const header=document.querySelector('.site-header'),bar=document.querySelector('.reading-progress i');
  let queued=false;
  function update(){queued=false;const range=document.documentElement.scrollHeight-innerHeight;bar.style.transform=`scaleX(${range>0?Math.min(1,scrollY/range):0})`;header.classList.toggle('scrolled',scrollY>36);}
  addEventListener('scroll',()=>{if(!queued){queued=true;requestAnimationFrame(update);}},{passive:true});
  addEventListener('resize',update);update();
  const booking=document.querySelector('.mobile-booking'),contactBottom=document.querySelector('#contacto .contact-bottom');
  const staticBooking=contactBottom?.querySelector('.button');
  if(booking&&contactBottom)new IntersectionObserver(entries=>{
    const reached=entries[0].isIntersecting;
    if(reached&&booking.parentElement!==contactBottom){
      contactBottom.append(booking);
      booking.classList.add('is-static');
      staticBooking?.setAttribute('hidden','');
    }else if(!reached&&booking.parentElement===contactBottom){
      document.body.append(booking);
      booking.classList.remove('is-static');
      staticBooking?.removeAttribute('hidden');
    }
  },{threshold:.1}).observe(contactBottom);
  // Native details keep the service index usable without JavaScript.
  document.querySelectorAll('.service-item').forEach(item=>item.addEventListener('toggle',()=>{if(item.open)document.querySelectorAll('.service-item').forEach(other=>{if(other!==item)other.open=false;});}));
})();
