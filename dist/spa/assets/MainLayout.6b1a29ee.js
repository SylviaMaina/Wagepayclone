import{Q as y,a as x,_ as h,b as Q,c as w,d as q}from"./QFooter.ca90c0e2.js";import{Y as k,q as I,s as L,z as S,o as r,c as C,$ as c,w as a,a as e,b as f,a0 as P,a1 as T,a2 as d,a3 as s,a4 as n,P as i,t as p,a5 as m,a6 as V,a7 as B,p as H,e as N,r as M}from"./index.cde20d85.js";import{Q as R}from"./rtl.61fc98d8.js";import{Q as U}from"./QToolbar.70a792cf.js";import{_ as v}from"./plugin-vue_export-helper.21dcd24c.js";import{Q as A,a as _}from"./QTabs.d6390e2c.js";import"./uid.937d8ee7.js";const E=t=>(H("data-v-6ca75016"),t=t(),N(),t),F={class:"flex items-center"},$=E(()=>f("img",{src:h,alt:"profile",class:"profile-pic"},null,-1)),z={class:"text-grey-9 text-subtitle2 q-pl-lg"},D={__name:"Top-nav",setup(t){const o=k(),l=I(null),u=L();S(async()=>{try{await o.fetchUserProfile(),l.value=o.currentUser}catch(g){console.error("Error",g)}});const b=()=>{o.logout(),u.push("/login")};return(g,O)=>(r(),C("div",null,[l.value?(r(),c(x,{key:0,class:"bg-grey-1 q-pa-sm"},{default:a(()=>[e(U,{class:"flex justify-between"},{default:a(()=>[f("div",F,[e(P,null,{default:a(()=>[$,e(y,{breakpoint:200},{default:a(()=>[e(T,null,{default:a(()=>[e(R,null,{default:a(()=>[d((r(),c(s,{clickable:""},{default:a(()=>[e(n,{avatar:""},{default:a(()=>[e(i,{color:"primary",name:"edit"})]),_:1}),e(n,{class:"text-primary"},{default:a(()=>[p("Edit Profile")]),_:1})]),_:1})),[[m]]),d((r(),c(s,{clickable:""},{default:a(()=>[e(n,{avatar:""},{default:a(()=>[e(i,{color:"red",name:"power"})]),_:1}),e(n,{class:"text-red",onClick:b},{default:a(()=>[p("Logout")]),_:1})]),_:1})),[[m]]),d((r(),c(s,{clickable:""},{default:a(()=>[e(n,{avatar:""},{default:a(()=>[e(i,{color:"green",name:"lock"})]),_:1}),e(n,{class:"text-green"},{default:a(()=>[p("Change Pin")]),_:1})]),_:1})),[[m]])]),_:1})]),_:1})]),_:1})]),_:1}),f("h6",z," Hello, "+V(l.value.email),1)]),e(i,{name:"notifications_none",size:"30px",color:"black"})]),_:1})]),_:1})):B("",!0)]))}};var j=v(D,[["__scopeId","data-v-6ca75016"]]);const Y={};function G(t,o){return r(),c(Q,{class:"bg-grey-2",elevated:""},{default:a(()=>[e(A,{modelValue:t.tab,"onUpdate:modelValue":o[0]||(o[0]=l=>t.tab=l),class:"bg-transparent"},{default:a(()=>[e(s,{to:"/home",class:"q-ma-none q-pa-none"},{default:a(()=>[e(_,{name:"Home",icon:"home",label:"Home",class:"text-grey-8 bg-transparent"})]),_:1}),e(s,{to:"/advance",class:"q-ma-none q-pa-none"},{default:a(()=>[e(_,{name:"Advance",icon:"search",label:"Advance",class:"text-grey-8 bg-transparent"})]),_:1}),e(s,{to:"/savings",class:"q-ma-none q-pa-none"},{default:a(()=>[e(_,{name:"Saving",icon:"savings",label:"Saving",class:"text-grey-8 bg-transparent"})]),_:1}),e(s,{to:"/bills",class:"q-ma-none q-pa-none"},{default:a(()=>[e(_,{name:"Bills",icon:"wallet",label:"Bills",class:"text-grey-8 bg-transparent"})]),_:1}),e(s,{to:"/rewards",class:"q-ma-none q-pa-none"},{default:a(()=>[e(_,{name:"Rewards",icon:"event",label:"Rewards",class:"text-grey-8 bg-transparent"})]),_:1})]),_:1},8,["modelValue"])]),_:1})}var J=v(Y,[["render",G]]);const K={__name:"MainLayout",setup(t){return(o,l)=>{const u=M("router-view");return r(),c(w,{view:"lHh Lpr lFf"},{default:a(()=>[e(q,null,{default:a(()=>[e(j),e(u),e(J)]),_:1})]),_:1})}}};var oe=v(K,[["__scopeId","data-v-90bd464e"]]);export{oe as default};
