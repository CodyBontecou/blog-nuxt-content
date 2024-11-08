import{_ as te}from"./DNU7blNg.js";import ne from"./DTUZx_OO.js";import{d as C,c as v,e as x,y as S,n as E,z as p,A as $,B as I,C as j,w,D as K,$ as se,r as z,E as P,G as oe,H as re,I as ae,J as le,K as Y,L as ce,M as ie,i as h,g as U,f as m,N as ue,p as Q,o as de,t as V,h as X,U as fe,O as G,S as ee}from"./CcwpQA2V.js";import{_ as me,f as pe}from"./C-ccqn4v.js";import{g as ge}from"./Cpj98o6Y.js";import{_ as _e}from"./Biagnvti.js";import{u as H}from"./DzBKOqAe.js";import{q as W}from"./B-AJgku8.js";import"./BeGV00VU.js";import"./DlAUqK2U.js";import"./XK0O5P81.js";import"./C-v3KzvZ.js";import"./Dnd51l0P.js";import"./CBLJ80Lb.js";const ve=C({__name:"Card",props:{class:{}},setup(t){const e=t;return(n,l)=>(v(),x("div",{class:E(p($)("rounded-lg border bg-card text-card-foreground shadow-sm",e.class))},[S(n.$slots,"default")],2))}}),he=C({__name:"CardContent",props:{class:{}},setup(t){const e=t;return(n,l)=>(v(),x("div",{class:E(p($)("p-6 pt-0",e.class))},[S(n.$slots,"default")],2))}}),be=C({__name:"CardDescription",props:{class:{}},setup(t){const e=t;return(n,l)=>(v(),x("p",{class:E(p($)("text-sm text-muted-foreground",e.class))},[S(n.$slots,"default")],2))}}),ye=C({__name:"CardFooter",props:{class:{}},setup(t){const e=t;return(n,l)=>(v(),x("div",{class:E(p($)("flex items-center p-6 pt-0",e.class))},[S(n.$slots,"default")],2))}}),we=C({__name:"CardHeader",props:{class:{}},setup(t){const e=t;return(n,l)=>(v(),x("div",{class:E(p($)("flex flex-col gap-y-1.5 p-6",e.class))},[S(n.$slots,"default")],2))}}),Ce=C({__name:"CardTitle",props:{class:{}},setup(t){const e=t;return(n,l)=>(v(),x("h3",{class:E(p($)("text-2xl font-semibold leading-none tracking-tight",e.class))},[S(n.$slots,"default")],2))}}),$e=C({__name:"Label",props:{for:{},asChild:{type:Boolean},as:{},class:{}},setup(t){const e=t,n=I(()=>{const{class:l,...r}=e;return r});return(l,r)=>(v(),j(p(se),K(n.value,{class:p($)("text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",e.class)}),{default:w(()=>[S(l.$slots,"default")]),_:3},16,["class"]))}});typeof WorkerGlobalScope<"u"&&globalThis instanceof WorkerGlobalScope;const xe=t=>typeof t<"u";function Ae(t){return JSON.parse(JSON.stringify(t))}function Ee(t,e,n,l={}){var r,u,c;const{clone:g=!1,passive:_=!1,eventName:s,deep:o=!1,defaultValue:a,shouldEmit:d}=l,f=re(),i=n||(f==null?void 0:f.emit)||((r=f==null?void 0:f.$emit)==null?void 0:r.bind(f))||((c=(u=f==null?void 0:f.proxy)==null?void 0:u.$emit)==null?void 0:c.bind(f==null?void 0:f.proxy));let b=s;b=b||`update:${e.toString()}`;const A=y=>g?typeof g=="function"?g(y):Ae(y):y,R=()=>xe(t[e])?A(t[e]):a,N=y=>{d?d(y)&&i(b,y):i(b,y)};if(_){const y=R(),k=z(y);let T=!1;return P(()=>t[e],O=>{T||(T=!0,k.value=A(O),oe(()=>T=!1))}),P(k,O=>{!T&&(O!==t[e]||o)&&N(O)},{deep:o}),k}else return I({get(){return R()},set(y){N(y)}})}const Ne=C({__name:"Input",props:{defaultValue:{},modelValue:{},class:{}},emits:["update:modelValue"],setup(t,{emit:e}){const n=t,r=Ee(n,"modelValue",e,{passive:!0,defaultValue:n.defaultValue});return(u,c)=>ae((v(),x("input",{"onUpdate:modelValue":c[0]||(c[0]=g=>Y(r)?r.value=g:null),class:E(p($)("flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",n.class))},null,2)),[[le,p(r)]])}});var J={exports:{}},q={exports:{}},M=1e3,D=M*60,B=D*60,L=B*24,Se=L*365.25,ke=function(t,e){e=e||{};var n=typeof t;if(n==="string"&&t.length>0)return Te(t);if(n==="number"&&isNaN(t)===!1)return e.long?je(t):Ve(t);throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(t))};function Te(t){if(t=String(t),!(t.length>100)){var e=/^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(t);if(e){var n=parseFloat(e[1]),l=(e[2]||"ms").toLowerCase();switch(l){case"years":case"year":case"yrs":case"yr":case"y":return n*Se;case"days":case"day":case"d":return n*L;case"hours":case"hour":case"hrs":case"hr":case"h":return n*B;case"minutes":case"minute":case"mins":case"min":case"m":return n*D;case"seconds":case"second":case"secs":case"sec":case"s":return n*M;case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return n;default:return}}}}function Ve(t){return t>=L?Math.round(t/L)+"d":t>=B?Math.round(t/B)+"h":t>=D?Math.round(t/D)+"m":t>=M?Math.round(t/M)+"s":t+"ms"}function je(t){return F(t,L,"day")||F(t,B,"hour")||F(t,D,"minute")||F(t,M,"second")||t+" ms"}function F(t,e,n){if(!(t<e))return t<e*1.5?Math.floor(t/e)+" "+n:Math.ceil(t/e)+" "+n+"s"}(function(t,e){e=t.exports=r.debug=r.default=r,e.coerce=_,e.disable=c,e.enable=u,e.enabled=g,e.humanize=ke,e.names=[],e.skips=[],e.formatters={};var n;function l(s){var o=0,a;for(a in s)o=(o<<5)-o+s.charCodeAt(a),o|=0;return e.colors[Math.abs(o)%e.colors.length]}function r(s){function o(){if(o.enabled){var a=o,d=+new Date,f=d-(n||d);a.diff=f,a.prev=n,a.curr=d,n=d;for(var i=new Array(arguments.length),b=0;b<i.length;b++)i[b]=arguments[b];i[0]=e.coerce(i[0]),typeof i[0]!="string"&&i.unshift("%O");var A=0;i[0]=i[0].replace(/%([a-zA-Z%])/g,function(N,y){if(N==="%%")return N;A++;var k=e.formatters[y];if(typeof k=="function"){var T=i[A];N=k.call(a,T),i.splice(A,1),A--}return N}),e.formatArgs.call(a,i);var R=o.log||e.log||console.log.bind(console);R.apply(a,i)}}return o.namespace=s,o.enabled=e.enabled(s),o.useColors=e.useColors(),o.color=l(s),typeof e.init=="function"&&e.init(o),o}function u(s){e.save(s),e.names=[],e.skips=[];for(var o=(typeof s=="string"?s:"").split(/[\s,]+/),a=o.length,d=0;d<a;d++)o[d]&&(s=o[d].replace(/\*/g,".*?"),s[0]==="-"?e.skips.push(new RegExp("^"+s.substr(1)+"$")):e.names.push(new RegExp("^"+s+"$")))}function c(){e.enable("")}function g(s){var o,a;for(o=0,a=e.skips.length;o<a;o++)if(e.skips[o].test(s))return!1;for(o=0,a=e.names.length;o<a;o++)if(e.names[o].test(s))return!0;return!1}function _(s){return s instanceof Error?s.stack||s.message:s}})(q,q.exports);var Ie=q.exports;(function(t,e){var n={};e=t.exports=Ie,e.log=u,e.formatArgs=r,e.save=c,e.load=g,e.useColors=l,e.storage=typeof chrome<"u"&&typeof chrome.storage<"u"?chrome.storage.local:_(),e.colors=["lightseagreen","forestgreen","goldenrod","dodgerblue","darkorchid","crimson"];function l(){return typeof window<"u"&&window.process&&window.process.type==="renderer"?!0:typeof document<"u"&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||typeof window<"u"&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/)}e.formatters.j=function(s){try{return JSON.stringify(s)}catch(o){return"[UnexpectedJSONParseError]: "+o.message}};function r(s){var o=this.useColors;if(s[0]=(o?"%c":"")+this.namespace+(o?" %c":" ")+s[0]+(o?"%c ":" ")+"+"+e.humanize(this.diff),!!o){var a="color: "+this.color;s.splice(1,0,a,"color: inherit");var d=0,f=0;s[0].replace(/%[a-zA-Z%]/g,function(i){i!=="%%"&&(d++,i==="%c"&&(f=d))}),s.splice(f,0,a)}}function u(){return typeof console=="object"&&console.log&&Function.prototype.apply.call(console.log,console,arguments)}function c(s){try{s==null?e.storage.removeItem("debug"):e.storage.debug=s}catch{}}function g(){var s;try{s=e.storage.debug}catch{}return!s&&typeof process<"u"&&"env"in process&&(s=n.DEBUG),s}e.enable(g());function _(){try{return window.localStorage}catch{}}})(J,J.exports);var Me=J.exports,Z=Me("jsonp"),De=Re,Be=0;function Le(){}function Re(t,e,n){typeof e=="function"&&(n=e,e={}),e||(e={});var l=e.prefix||"__jp",r=e.name||l+Be++,u=e.param||"callback",c=e.timeout!=null?e.timeout:6e4,g=encodeURIComponent,_=document.getElementsByTagName("script")[0]||document.head,s,o;c&&(o=setTimeout(function(){a(),n&&n(new Error("Timeout"))},c));function a(){s.parentNode&&s.parentNode.removeChild(s),window[r]=Le,o&&clearTimeout(o)}function d(){window[r]&&a()}return window[r]=function(f){Z("jsonp got",f),a(),n&&n(null,f)},t+=(~t.indexOf("?")?"&":"?")+u+"="+g(r),t=t.replace("?&","?"),Z('jsonp req "%s"',t),s=document.createElement("script"),s.src=t,_.parentNode.insertBefore(s,_),d}const Oe=ge(De);function Ue(t){const r="https://gmail.us10.list-manage.com/subscribe/post?u=cd437705ede047b78169e4337&amp;id=c7dcc86f21&amp;f_id=00b0bbe3f0",u=encodeURIComponent(t);let c=r.replace(/\/post/g,"/post-json");const g=`&EMAIL=${u}`;return c=`${c}${g}`,new Promise((_,s)=>Oe(c,{param:"c",timeout:3500},(o,a)=>{o&&(console.log("Request failed",o),s(o)),a&&(console.log("Request success",a),_(a))}))}const Fe={class:"flex flex-col gap-2"},Pe={class:"flex flex-col space-y-1.5"},Je=C({__name:"Newsletter",setup(t){const{toast:e}=ce(),{t:n}=ie(),l=z(""),r=async()=>{await Ue(l.value),l.value="",e({title:n("newsletter.successTitle"),description:n("newsletter.successDescription")})};return(u,c)=>{const g=Ce,_=be,s=we,o=$e,a=Ne,d=me,f=he,i=ye,b=ve;return v(),j(b,null,{default:w(()=>[h(s,null,{default:w(()=>[h(g,null,{default:w(()=>c[1]||(c[1]=[U("Newsletter")])),_:1}),h(_,null,{default:w(()=>c[2]||(c[2]=[U(" Subscribe to get my latest content. No spam. ")])),_:1})]),_:1}),h(f,null,{default:w(()=>[m("form",{onSubmit:ue(r,["prevent"])},[m("div",Fe,[m("div",Pe,[h(o,{for:"emailInput"},{default:w(()=>c[3]||(c[3]=[U("Email")])),_:1}),h(a,{name:"emailInput",modelValue:p(l),"onUpdate:modelValue":c[0]||(c[0]=A=>Y(l)?l.value=A:null),type:"email",placeholder:"Your email"},null,8,["modelValue"])]),h(d,{class:"self-end",type:"submit"},{default:w(()=>c[4]||(c[4]=[U("Submit")])),_:1})])],32)]),_:1}),h(i,{class:"flex justify-end px-6 pb-6"})]),_:1})}}}),qe=C({__name:"Comments",setup(t){const e=z(),n=Q();P(n,(r,u)=>{l(r.path)}),de(()=>{l(n.path)});function l(r){const u=document.createElement("script");u.setAttribute("src","https://utteranc.es/client.js"),u.setAttribute("repo","codybontecou/blog-nuxt-content"),u.setAttribute("issue-term",r),u.setAttribute("label","Comments"),u.setAttribute("theme","github-light"),u.setAttribute("crossorigin","anonymous"),u.setAttribute("async","true"),e.value.innerHTML="",e.value.appendChild(u)}return(r,u)=>(v(),x("section",{ref_key:"comments",ref:e},null,512))}}),ze=C({__name:"Separator",props:{orientation:{},decorative:{type:Boolean},asChild:{type:Boolean},as:{},class:{},label:{}},setup(t){const e=t,n=I(()=>{const{class:l,...r}=e;return r});return(l,r)=>(v(),j(p(fe),K(n.value,{class:p($)("shrink-0 bg-border relative",e.orientation==="vertical"?"w-px h-full":"h-px w-full",e.class)}),{default:w(()=>[e.label?(v(),x("span",{key:0,class:E(p($)("text-xs text-muted-foreground bg-background absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center",e.orientation==="vertical"?"w-[1px] px-1 py-2":"h-[1px] py-1 px-2"))},V(e.label),3)):X("",!0)]),_:1},16,["class"]))}});function Ge(t){for(let e=t.length-1;e>0;e--){const n=Math.floor(Math.random()*(e+1));[t[e],t[n]]=[t[n],t[e]]}return t}const He={class:"flex flex-col justify-center"},We={class:"prose"},Ze={class:"text-4xl font-normal mb-4"},Ke={class:"text-gray-600 text-lg mb-10"},Ye={class:"mb-6"},Qe=C({__name:"BlogPost",async setup(t){let e,n;const{path:l}=Q(),{data:r}=([e,n]=G(()=>H(`post-${l}`,()=>W(l).findOne())),e=await e,n(),e),u=r.value.topics,{data:c}=([e,n]=G(()=>H("allArticles",()=>W("/").sort({date:-1}).where({draft:{$ne:!0},ignore:{$ne:!0}}).find())),e=await e,n(),e),g=I(()=>c.value.filter(s=>{if(s.title===r.value.title)return!1;const o=s.topics||[],a=u||[];return o.length>0&&a.length>0&&o.some(d=>a.includes(d))}).slice(0,5)),_=I(()=>{if(g.value.length===5)return g.value;const o=5-g.value.length,a=c.value.filter(f=>!g.value.map(i=>i.title).includes(f.title)),d=Ge(a).slice(0,o).sort((f,i)=>new Date(i.date)-new Date(f.date));return g.value.concat(d)});return(s,o)=>{const a=ne,d=Je,f=qe,i=ze,b=_e;return v(),j(ee,null,{default:w(()=>[m("main",He,[m("article",We,[m("h1",Ze,V(p(r).title),1),m("div",Ke,V(p(pe)(p(r).date))+" · "+V(p(r).readingTime)+" "+V(s.$t("latest.minuteRead")),1),h(a,{value:p(r)},null,8,["value"])]),h(d,{class:"mt-10"}),h(f,{class:"mt-10"}),h(i,{class:"my-20"}),m("div",null,[m("h2",Ye,V(s.$t("slug.alsoEnjoy")),1),p(_)&&p(_).length?(v(),j(b,{key:0,articles:p(_)},null,8,["articles"])):X("",!0)])])]),fallback:w(()=>o[0]||(o[0]=[m("div",{class:"animate-pulse"},[m("div",{class:"h-8 bg-gray-200 rounded w-3/4 mb-4"}),m("div",{class:"h-4 bg-gray-200 rounded w-1/4 mb-10"}),m("div",{class:"space-y-4"},[m("div",{class:"h-4 bg-gray-200 rounded"}),m("div",{class:"h-4 bg-gray-200 rounded"}),m("div",{class:"h-4 bg-gray-200 rounded w-5/6"})])],-1)])),_:1})}}}),Xe={class:"max-w-3xl mx-0 md:mx-auto py-8 px-4"},pt=C({__name:"[...slug]",setup(t){return(e,n)=>{const l=te;return v(),x("div",Xe,[h(l),(v(),j(ee,null,{default:w(()=>[h(p(Qe))]),fallback:w(()=>n[0]||(n[0]=[m("div",{class:"animate-pulse"},[m("div",{class:"h-8 bg-gray-200 rounded w-3/4 mb-4"}),m("div",{class:"h-4 bg-gray-200 rounded w-1/4 mb-10"}),m("div",{class:"space-y-4"},[m("div",{class:"h-4 bg-gray-200 rounded"}),m("div",{class:"h-4 bg-gray-200 rounded"}),m("div",{class:"h-4 bg-gray-200 rounded w-5/6"})])],-1)])),_:1}))])}}});export{pt as default};
