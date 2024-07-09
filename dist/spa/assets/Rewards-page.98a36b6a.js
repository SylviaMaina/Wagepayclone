import{Q as l}from"./QItemLabel.45906cc2.js";import{f as y,m as x,h as v,ak as w,o as p,c as q,a as e,w as t,a1 as d,F as Q,aJ as i,a3 as o,a4 as r,t as s,b4 as n,P as u,p as B,e as S,b as m}from"./index.cde20d85.js";import{Q as c}from"./QCardActions.4f2104f5.js";import{_ as C}from"./plugin-vue_export-helper.21dcd24c.js";const I=["top","middle","bottom"];var _=y({name:"QBadge",props:{color:String,textColor:String,floating:Boolean,transparent:Boolean,multiLine:Boolean,outline:Boolean,rounded:Boolean,label:[Number,String],align:{type:String,validator:a=>I.includes(a)}},setup(a,{slots:f}){const b=x(()=>a.align!==void 0?{verticalAlign:a.align}:null),h=x(()=>{const g=a.outline===!0&&a.color||a.textColor;return`q-badge flex inline items-center no-wrap q-badge--${a.multiLine===!0?"multi":"single"}-line`+(a.outline===!0?" q-badge--outline":a.color!==void 0?` bg-${a.color}`:"")+(g!==void 0?` text-${g}`:"")+(a.floating===!0?" q-badge--floating":"")+(a.rounded===!0?" q-badge--rounded":"")+(a.transparent===!0?" q-badge--transparent":"")});return()=>v("div",{class:h.value,style:b.value,role:"status","aria-label":a.label},w(f.default,a.label!==void 0?[a.label]:[]))}});const R={},j=a=>(B("data-v-65b4b510"),a=a(),S(),a),k=j(()=>m("div",{class:"text-center bg-transparent flex column justify-evenly q-my-lg",style:{height:"5rem"}},[m("h6",{class:"text-subtitle1 text-weight-light bg-transparent"}," Total Rewards "),m("h6",{class:"text-h4 text-weigh-thin text-primary"},"Kes 12,000")],-1));function z(a,f){return p(),q(Q,null,[k,e(d,{class:"my-card bg-white",style:{height:"10rem",position:"relative",border:"1px solid green"}},{default:t(()=>[e(i,null,{default:t(()=>[e(o,null,{default:t(()=>[e(r,null,{default:t(()=>[e(l,{class:"text-h6 text-grey-8"},{default:t(()=>[s("Credit Rewards")]),_:1}),e(l,{class:"text-h6"},{default:t(()=>[s("200")]),_:1})]),_:1}),e(r,{side:"",middle:""},{default:t(()=>[e(_,{outline:"",color:"green",label:"10%",class:"q-pa-sm"})]),_:1})]),_:1})]),_:1}),e(n,{class:"pro"}),e(c,{class:"justify-center"},{default:t(()=>[e(l,{class:"text-subtitle1 text-grey-8"},{default:t(()=>[e(u,{name:"save",size:"20px",class:"q-mr-sm"}),s("Withdraw to wallet")]),_:1})]),_:1})]),_:1}),e(d,{class:"my-card bg-white",style:{height:"10rem",position:"relative",border:"1px solid rgba(231, 199, 37, 1)"}},{default:t(()=>[e(i,null,{default:t(()=>[e(o,null,{default:t(()=>[e(r,null,{default:t(()=>[e(l,{class:"text-h6 text-grey-8"},{default:t(()=>[s("Bills Rewards")]),_:1}),e(l,{class:"text-h6"},{default:t(()=>[s("1000")]),_:1})]),_:1}),e(r,{side:"",middle:""},{default:t(()=>[e(_,{outline:"",color:"green",label:"10%",class:"q-pa-sm"})]),_:1})]),_:1})]),_:1}),e(n,{class:"pro"}),e(c,{class:"justify-center"},{default:t(()=>[e(l,{class:"text-subtitle1 text-grey-8"},{default:t(()=>[e(u,{name:"save",size:"20px",class:"q-mr-sm"}),s("Withdraw to wallet")]),_:1})]),_:1})]),_:1}),e(d,{class:"my-card bg-white",style:{height:"10rem",position:"relative",border:"1px solid black"}},{default:t(()=>[e(i,null,{default:t(()=>[e(o,null,{default:t(()=>[e(r,null,{default:t(()=>[e(l,{class:"text-h6 text-grey-8"},{default:t(()=>[s("Employer Rewards")]),_:1}),e(l,{class:"text-h6"},{default:t(()=>[s("1000")]),_:1})]),_:1}),e(r,{side:"",middle:""},{default:t(()=>[e(_,{outline:"",color:"green",label:"10%",class:"q-pa-sm"})]),_:1})]),_:1})]),_:1}),e(n,{class:"pro"}),e(c,{class:"justify-center"},{default:t(()=>[e(l,{class:"text-subtitle1 text-grey-8"},{default:t(()=>[e(u,{name:"save",size:"20px",class:"q-mr-sm"}),s("Withdraw to wallet")]),_:1})]),_:1})]),_:1}),e(d,{class:"my-card bg-white",style:{height:"10rem",position:"relative",border:"1px solid black"}},{default:t(()=>[e(i,null,{default:t(()=>[e(o,null,{default:t(()=>[e(r,null,{default:t(()=>[e(l,{class:"text-h6 text-grey-8"},{default:t(()=>[s("Interest Rewards")]),_:1}),e(l,{class:"text-h6"},{default:t(()=>[s("200")]),_:1})]),_:1}),e(r,{side:"",middle:""},{default:t(()=>[e(_,{outline:"",color:"green",label:"10%",class:"q-pa-sm"})]),_:1})]),_:1})]),_:1}),e(n,{class:"pro"}),e(c,{class:"justify-center"},{default:t(()=>[e(l,{class:"text-subtitle1 text-grey-8"},{default:t(()=>[e(u,{name:"save",size:"20px",class:"q-mr-sm"}),s("Withdraw to wallet")]),_:1})]),_:1})]),_:1})],64)}var P=C(R,[["render",z],["__scopeId","data-v-65b4b510"]]);export{P as default};
