'use strict';
(function(){
  const toggle=document.querySelector('.menu-toggle'); const menu=document.getElementById('mobile-nav');
  if(toggle&&menu){toggle.addEventListener('click',()=>{const expanded=toggle.getAttribute('aria-expanded')==='true';toggle.setAttribute('aria-expanded',String(!expanded));menu.hidden=expanded;});}
})();
