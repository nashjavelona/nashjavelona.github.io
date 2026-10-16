'use strict';
(function(){
  const form=document.getElementById('consultation-form');if(!form)return;
  let step=1;
  const next=document.getElementById('next-btn'),back=document.getElementById('back-btn'),submit=document.getElementById('submit-btn');
  const values=['interest','timing'];
  function show(n){step=n;document.querySelectorAll('.quiz-step').forEach(s=>{const isCurrent=Number(s.dataset.step)===n;s.hidden=!isCurrent;s.classList.toggle('active',isCurrent)});document.getElementById('step-label').textContent=`STEP ${n} OF 3`;document.getElementById('progress-percent').textContent=`${Math.round(n/3*100)}% COMPLETE`;document.getElementById('progress-bar').style.width=(n/3*100)+'%';next.hidden=n===3;submit.hidden=n!==3;back.hidden=n===1;document.getElementById(`error-${n}`).textContent=''}
  function valid(n){const error=document.getElementById(`error-${n}`);error.textContent='';if(n===1||n===2){if(!form.querySelector(`input[name="${values[n-1]}"]:checked`)){error.textContent='Please select an option before continuing.';return false}if(n===2&&!form.elements.contact_preference.value){error.textContent='Please select a contact preference.';return false}}if(n===3){const name=form.elements.first_name.value.trim(),email=form.elements.email.value.trim(),phone=form.elements.phone.value.trim();if(!/^[a-zA-Z][a-zA-Z '.-]{1,44}$/.test(name)){error.textContent='Enter a sample first name (at least 2 letters).';return false}if(!/^[A-Z0-9._%+-]+@example\.(com|org|net)$/i.test(email)){error.textContent='For privacy, only example.com, example.org, or example.net email addresses are allowed.';return false}if(phone && !/^[\d\s+()\-]{5,25}$/.test(phone)){error.textContent='Enter a valid fictional phone number, or leave it empty.';return false}if(!document.getElementById('consent').checked){error.textContent='Please acknowledge that this is a fictional demonstration.';return false}}return true}
  next.addEventListener('click',()=>{if(valid(step))show(step+1)});back.addEventListener('click',()=>show(step-1));
  document.getElementById('sample-fill').addEventListener('click',()=>{form.elements.first_name.value='Alex';form.elements.email.value='alex@example.com';form.elements.phone.value='+1 555 0100';document.getElementById('consent').checked=true;document.getElementById('error-3').textContent=''});
  form.addEventListener('submit',event=>{event.preventDefault();if(!valid(3))return;const payload={first_name:form.elements.first_name.value.trim(),email:form.elements.email.value.trim().toLowerCase(),phone:form.elements.phone.value.trim(),interest:form.elements.interest.value,timing:form.elements.timing.value,contact_preference:form.elements.contact_preference.value,source:'Liora portfolio quiz'};
    // GitHub Pages uses the *local demo* store. A real n8n integration needs a separately hosted backend.
    const existing=document.querySelector('script[data-demo-store]');
    const doSave=()=>{submit.disabled=true;const data=window.GlowFlowDemo.saveLead(payload);location.href='thank-you.html?id='+encodeURIComponent(data.id)};
    if(window.GlowFlowDemo){doSave();return}if(existing)return;
    const script=document.createElement('script');script.src='assets/demo-store.js';script.dataset.demoStore='true';script.onload=doSave;script.onerror=()=>{document.getElementById('error-3').textContent='Could not load the demo storage module.'};document.body.appendChild(script);
  });
  show(1);
})();
