import{_ as D}from"./fhRtCVsJ.js";import L from"./2FGL2woA.js";import{c as v,U as N,f as $}from"./DATRXFj0.js";import{d as b,z as g,c as h,A as j,w as q,e as C,n as S,B as a,t as d,h as T,C as V,q as z,D as y,i as m,f as l}from"./ClMUmYpS.js";import{_ as M}from"./3eL0Wbyh.js";import{u as w}from"./Dx-sAVqQ.js";import{q as A}from"./Cw2BIrNV.js";import"./DIHmBCfV.js";import"./D7bds1Gv.js";import"./C-v3KzvZ.js";import"./Dnd51l0P.js";import"./iJx3KY67.js";const P=b({__name:"Separator",props:{orientation:{},decorative:{type:Boolean},asChild:{type:Boolean},as:{},class:{},label:{}},setup(e){const t=e,s=g(()=>{const{class:p,...o}=t;return o});return(p,o)=>(h(),j(a(N),V(s.value,{class:a(v)("shrink-0 bg-border relative",t.orientation==="vertical"?"w-px h-full":"h-px w-full",t.class)}),{default:q(()=>[t.label?(h(),C("span",{key:0,class:S(a(v)("text-xs text-muted-foreground bg-background absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center",t.orientation==="vertical"?"w-[1px] px-1 py-2":"h-[1px] py-1 px-2"))},d(t.label),3)):T("",!0)]),_:1},16,["class"]))}});function R(e){for(let t=e.length-1;t>0;t--){const s=Math.floor(Math.random()*(t+1));[e[t],e[s]]=[e[s],e[t]]}return e}const U={class:"max-w-3xl mx-auto py-8 px-4"},E={class:""},O={class:"text-4xl font-normal mb-4"},Y={class:"text-gray-600 text-lg mb-10"},st=b({__name:"[...slug]",async setup(e){let t,s;const{path:p}=z(),{data:o}=([t,s]=y(()=>w(`post-${p}`,()=>A(p).findOne())),t=await t,s(),t),B=o.value.topics,{data:x}=([t,s]=y(()=>w("allArticles",()=>A().find())),t=await t,s(),t),r=g(()=>x.value.filter(u=>u.title!==o.value.title&&u.topics.some(n=>B.includes(n))).slice(0,5)),k=g(()=>{if(r.value.length===5)return r;const n=5-r.value.length,_=x.value.filter(c=>!r.value.map(i=>i.title).includes(c.title)),f=R(_).slice(0,n).sort((c,i)=>new Date(i.date)-new Date(c.date));return r.value.concat(f)});return(u,n)=>{const _=D,f=L,c=P,i=M;return h(),C("div",U,[m(_),l("main",null,[l("article",E,[l("h1",O,d(a(o).title),1),l("div",Y,d(a($)(a(o).date))+" · "+d(a(o).readingTime)+" minute read ",1),m(f,{value:a(o)},null,8,["value"])]),m(c,{class:"my-20"}),l("div",null,[n[0]||(n[0]=l("h2",null,"You might also enjoy",-1)),m(i,{articles:a(k)},null,8,["articles"])])])])}}});export{st as default};
