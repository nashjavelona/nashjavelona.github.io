'use strict';
// DEMO ONLY: this intentionally stores *fictional* sample data in the current browser.
// It is NOT a production CRM, a secure database, or an external automation integration.
(function(){
  const KEY='glowflow_demo_leads_v1', EVENTS='glowflow_demo_events_v1';
  function read(key){try{const v=JSON.parse(localStorage.getItem(key)||'[]');return Array.isArray(v)?v:[]}catch{return []}}
  function write(key,value){localStorage.setItem(key,JSON.stringify(value))}
  function makeId(){return 'DEMO-'+Date.now().toString(36).toUpperCase()+'-'+Math.random().toString(36).slice(2,6).toUpperCase()}
  function rank(interest,timing){return timing==='As soon as possible'?'High':(interest==='Not sure yet'||timing==='Just researching'?'Low':'Normal')}
  function log(type,message,id){const events=read(EVENTS);events.unshift({type,message,id,date:new Date().toISOString()});write(EVENTS,events.slice(0,150))}
  function saveLead(lead){const leads=read(KEY);const saved={...lead,id:makeId(),date:new Date().toISOString(),priority:rank(lead.interest,lead.timing),stage:'New'};leads.unshift(saved);write(KEY,leads);log('created','Demo lead created',saved.id);sessionStorage.setItem('glowflow_last_id',saved.id);return saved}
  function stage(id,stage){const valid=['New','Contacted','Booked','Closed'];if(!valid.includes(stage))return false;const leads=read(KEY);const lead=leads.find(x=>x.id===id);if(!lead)return false;lead.stage=stage;write(KEY,leads);log('stage',`Demo lead stage changed to ${stage}`,id);return true}
  function reset(){localStorage.removeItem(KEY);localStorage.removeItem(EVENTS);sessionStorage.removeItem('glowflow_last_id')}
  window.GlowFlowDemo={leads:()=>read(KEY),events:()=>read(EVENTS),saveLead,stage,reset};
})();
