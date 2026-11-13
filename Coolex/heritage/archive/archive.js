'use strict';
(() => {
  const $=(selector,root=document)=>root.querySelector(selector);
  const $$=(selector,root=document)=>[...root.querySelectorAll(selector)];
  const data=JSON.parse($('#archive-exhibit-data').textContent);
  if(parent!==window)parent.postMessage({type:'coolex-archive-page',id:data.id},'*');
  let noteTimer;
  function note(message){
    $('#archive-note')?.remove();const element=document.createElement('div');element.id='archive-note';element.setAttribute('role','status');element.textContent=message;document.body.append(element);clearTimeout(noteTimer);noteTimer=setTimeout(()=>element.remove(),6000);
  }
  // Preserve the original image rollovers without evaluating legacy inline handlers.
  $$('[data-archive-hover]').forEach(link=>{
    const swaps=JSON.parse(link.dataset.archiveHover);
    link.addEventListener('mouseenter',()=>swaps.forEach(({name,src})=>{const image=document.getElementsByName(name)[0];if(image){image.dataset.originalSrc=image.src;image.src=src}}));
    link.addEventListener('mouseleave',()=>swaps.forEach(({name})=>{const image=document.getElementsByName(name)[0];if(image?.dataset.originalSrc)image.src=image.dataset.originalSrc}));
  });
  const location=$('#myreel');let locationIndex=0;
  function showLocation(index){
    if(!data.locationSlides.length)return;
    locationIndex=(index+data.locationSlides.length)%data.locationSlides.length;
    let image=$('img',location);if(!image){image=document.createElement('img');location.append(image)}
    image.src=data.locationSlides[locationIndex];image.alt=`Earlier Coolex location photo ${locationIndex+1} of ${data.locationSlides.length}`;image.width=650;image.height=449;
  }
  if(location){location.classList.add('archive-location');showLocation(0)}
  $$('[data-archive-direction]').forEach(link=>{link.setAttribute('role','button');link.setAttribute('aria-label',Number(link.dataset.archiveDirection)<0?'Previous location photo':'Next location photo');link.addEventListener('keydown',event=>{if(event.key===' '){event.preventDefault();link.click()}});link.addEventListener('click',event=>{event.preventDefault();showLocation(locationIndex+Number(link.dataset.archiveDirection))})});
  const factory=$('#number_slideshow');
  if(factory){
    const slides=$$('ul:not(.number_slideshow_nav)>li',factory);const buttons=$$('.number_slideshow_nav a',factory);
    function show(index){slides.forEach((slide,i)=>{slide.hidden=i!==index;slide.style.display=i===index?'block':'none'});buttons.forEach((button,i)=>{button.setAttribute('aria-current',i===index?'true':'false');button.parentElement.classList.toggle('archive-selected',i===index)})}
    buttons.forEach((button,index)=>{button.setAttribute('aria-label',`Factory photo ${index+1}`);button.addEventListener('click',event=>{event.preventDefault();show(index)})});show(0);
  }
  let lastFocus;
  function viewImage(src){
    let dialog=$('#archive-image-viewer');if(!dialog){dialog=document.createElement('dialog');dialog.id='archive-image-viewer';dialog.setAttribute('aria-label','Original archive photograph');document.body.append(dialog);dialog.addEventListener('close',()=>lastFocus?.focus())}
    dialog.replaceChildren();const close=document.createElement('button');close.type='button';close.textContent='Close image ×';close.addEventListener('click',()=>dialog.close());const image=document.createElement('img');image.src=src;image.alt='Original photograph preserved from the earlier Coolex website';dialog.append(close,image);lastFocus=document.activeElement;dialog.showModal();
  }
  document.addEventListener('click',event=>{
    const image=event.target.closest('[data-archive-image]');if(image){event.preventDefault();viewImage(image.getAttribute('href'));return}
    const source=event.target.closest('[data-source-url]');if(source){event.preventDefault();note('This link belongs to the original website and was not included in this preserved archive. Use “Original source” above to explore the live site.');return}
    const factoryImage=event.target.closest('#number_slideshow img,#myreel img');if(factoryImage){viewImage(factoryImage.src)}
  });
  $$('form').forEach(form=>form.addEventListener('submit',event=>event.preventDefault()));
})();
