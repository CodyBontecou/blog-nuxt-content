import{f as k,_ as b}from"./C-ccqn4v.js";import{_ as C}from"./BeGV00VU.js";import{_ as B}from"./Biagnvti.js";import{d as D,M as L,O as M,e as f,f as t,t as n,i as c,w as d,z as o,g as _,h as v,F as N,P as T,c as u,C as A}from"./CcwpQA2V.js";import{u as P}from"./DzBKOqAe.js";import{q as V}from"./B-AJgku8.js";import"./CBLJ80Lb.js";const F=(e,s,a)=>`${k(e)} · ${s} ${a("latest.minuteRead")}`,q=e=>{if(!(e!=null&&e.children))return"";const s=e.children.find(g=>{var i,m;return g.tag==="p"&&((m=(i=g.children)==null?void 0:i[0])==null?void 0:m.value)});if(!s)return"";const a=s.children[0].value;return a.length<=120?a:a.slice(0,120).trim()+"..."},R=e=>!e||!e.length?null:e.find(s=>!s.ignore)||null,S=e=>{const s=e==null?void 0:e.flatMap(a=>a.topics||[]).filter(Boolean).map(a=>a.toLowerCase());return[...new Set(s)].sort()},W={class:"h-full mx-auto max-w-7xl pt-16 px-4 sm:px-6 lg:px-8"},z={class:"lg:pt-0 lg:grid lg:grid-cols-2 lg:gap-x-12"},E={class:"max-w-lg mx-auto mb-16 lg:mb-0 lg:mx-0"},I={class:"mb-4"},O={class:"mb-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl"},j={class:"text-lg italic leading-8 text-gray-600"},G={class:"mb-8 flex items-center gap-x-2.5 w-full"},H={key:0,class:"mb-16 w-full"},J={class:"text-gray-600 mb-6"},K={class:"text-xl font-medium mb-2"},Q={class:"text-gray-600 mb-4"},U={class:"text-gray-600"},X={key:1,class:"mb-16 w-full"},Y={class:"text-lg text-gray-600"},Z={class:"mt-6 flex flex-wrap gap-2"},tt={class:"max-w-lg mx-auto lg:mt-0"},et={class:"mb-6 text-lg text-gray-600"},ct=D({__name:"index",async setup(e){let s,a;const{t:g}=L(),{data:i}=([s,a]=M(()=>P("articles",()=>V("/").sort({date:-1}).where({draft:{$ne:!0},ignore:{$ne:!0}}).find())),s=await s,a(),s),m=S(i.value),r=R(i.value),y=F(r.date,r.readingTime,g);return(l,x)=>{const w=b,h=C,$=B;return u(),f("div",W,[t("div",z,[t("div",E,[t("div",I,[t("h1",O,n(l.$t("landing.hero")),1),t("p",j,n(l.$t("landing.description")),1)]),t("div",G,[c(h,{to:"/"},{default:d(()=>[c(w,null,{default:d(()=>[_(n(l.$t("landing.cta")),1)]),_:1})]),_:1}),t("a",{href:"#key-features",onClick:x[0]||(x[0]=()=>{})},[c(w,{variant:"outline"},{default:d(()=>[_(n(l.$t("landing.learnMore")),1)]),_:1})])]),o(r)?(u(),f("section",H,[t("h2",J,n(l.$t("latest.latest")),1),t("article",null,[t("h3",K,[c(h,{to:o(r)._path,class:"hover:opacity-75"},{default:d(()=>[_(n(o(r).title),1)]),_:1},8,["to"])]),t("div",Q,n(o(y)),1),t("p",U,[_(n(o(q)(o(r).body))+" ",1),c(h,{to:o(r)._path,class:"text-gray-900 hover:opacity-75"},{default:d(()=>[_(n(l.$t("latest.keepReading")),1)]),_:1},8,["to"])])])])):v("",!0),o(m).length?(u(),f("section",X,[t("h2",Y,n(l.$t("topics.topics")),1),t("div",Z,[(u(!0),f(N,null,T(o(m),p=>(u(),A(h,{key:p,to:`/topics/${p}`,class:"underline hover:opacity-75 break-keep whitespace-nowrap"},{default:d(()=>[_(n(p),1)]),_:2},1032,["to"]))),128))])])):v("",!0)]),t("div",tt,[t("h2",et,n(l.$t("writing.writing")),1),c($,{articles:o(i)},null,8,["articles"])])])])}}});export{ct as default};
