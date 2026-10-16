'use strict';
(function(){
  const load=()=>{const id=new URLSearchParams(location.search).get('id')||sessionStorage.getItem('glowflow_last_id');const lead=window.GlowFlowDemo.leads().find(l=>l.id===id);document.getElementById('summary-id').textContent=lead?.id||'No demo request selected';document.getElementById('summary-interest').textContent=lead?.interest||'—';if(!lead){document.getElementById('thanks-description').textContent='No request was found in this browser. Use the consultation quiz to create a fictional demo request.';}};
  const script=document.createElement('script');script.src='assets/demo-store.js';script.onload=load;document.body.appendChild(script);
})();
