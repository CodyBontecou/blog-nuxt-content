import{_ as k}from"./6oGS9mn8.js";import L from"./CFSommmR.js";import{c as v,U as S}from"./CROL2T6z.js";import{d as b,z as g,c as h,A as N,w as $,e as C,n as j,B as n,t as d,h as q,C as T,q as U,D as y,i as p,f as l}from"./D_gZVMNy.js";import{_ as V}from"./DLkoWpGV.js";import{u as w}from"./CvOQAgd3.js";import{q as A}from"./CmHYXi5W.js";import"./BSP49m6f.js";import"./CCxyJjXF.js";import"./C-v3KzvZ.js";import"./Dnd51l0P.js";import"./Cum3CzNa.js";const z=b({__name:"Separator",props:{orientation:{},decorative:{type:Boolean},asChild:{type:Boolean},as:{},class:{},label:{}},setup(e){const t=e,s=g(()=>{const{class:u,...o}=t;return o});return(u,o)=>(h(),N(n(S),T(s.value,{class:n(v)("shrink-0 bg-border relative",t.orientation==="vertical"?"w-px h-full":"h-px w-full",t.class)}),{default:$(()=>[t.label?(h(),C("span",{key:0,class:j(n(v)("text-xs text-muted-foreground bg-background absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center",t.orientation==="vertical"?"w-[1px] px-1 py-2":"h-[1px] py-1 px-2"))},d(t.label),3)):q("",!0)]),_:1},16,["class"]))}}),M=e=>new Date(e).toLocaleDateString("en-US",{month:"long",day:"numeric",year:"numeric"});function P(e){for(let t=e.length-1;t>0;t--){const s=Math.floor(Math.random()*(t+1));[e[t],e[s]]=[e[s],e[t]]}return e}const R={class:"max-w-3xl mx-auto py-8 px-4"},E={class:""},O={class:"text-4xl font-normal mb-4"},Y={class:"text-gray-600 text-lg mb-10"},st=b({__name:"[...slug]",async setup(e){let t,s;const{path:u}=U(),{data:o}=([t,s]=y(()=>w(`post-${u}`,()=>A(u).findOne())),t=await t,s(),t),D=o.value.topics,{data:x}=([t,s]=y(()=>w("allArticles",()=>A().find())),t=await t,s(),t),r=g(()=>x.value.filter(m=>m.title!==o.value.title&&m.topics.some(a=>D.includes(a))).slice(0,5)),B=g(()=>{if(r.value.length===5)return r;const a=5-r.value.length,_=x.value.filter(c=>!r.value.map(i=>i.title).includes(c.title)),f=P(_).slice(0,a).sort((c,i)=>new Date(i.date)-new Date(c.date));return r.value.concat(f)});return(m,a)=>{const _=k,f=L,c=z,i=V;return h(),C("div",R,[p(_),l("main",null,[l("article",E,[l("h1",O,d(n(o).title),1),l("div",Y,d(n(M)(n(o).date))+" · "+d(n(o).readingTime)+" minute read ",1),p(f,{value:n(o)},null,8,["value"])]),p(c,{class:"my-20"}),l("div",null,[a[0]||(a[0]=l("h2",null,"You might also enjoy",-1)),p(i,{articles:n(B)},null,8,["articles"])])])])}}});export{st as default};
