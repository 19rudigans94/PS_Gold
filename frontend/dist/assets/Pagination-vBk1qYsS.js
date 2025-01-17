import{r as E}from"./react-vendor-CUI16jnX.js";import{g as D,a as G,q as Q,c as _,j as v,s as w,m as U,ao as X,d as I,e as V,u as q,H as Y,_ as B,f as T,b as N,h as H}from"./index-Bm_OlzcE.js";import{F as Z,L as h}from"./LastPage-D_eWOsAG.js";function aa(a){return G("MuiPagination",a)}D("MuiPagination",["root","ul","outlined","text"]);function ta(a={}){const{boundaryCount:t=1,componentName:s="usePagination",count:o=1,defaultPage:b=1,disabled:x=!1,hideNextButton:f=!1,hidePrevButton:c=!1,onChange:d,page:y,showFirstButton:R=!1,showLastButton:O=!1,siblingCount:P=1,...$}=a,[r,l]=Q({controlled:y,default:b,name:s,state:"page"}),C=(e,i)=>{y||l(i),d&&d(e,i)},S=(e,i)=>{const m=i-e+1;return Array.from({length:m},(F,j)=>e+j)},p=S(1,Math.min(t,o)),M=S(Math.max(o-t+1,t+1),o),g=Math.max(Math.min(r-P,o-t-P*2-1),t+2),u=Math.min(Math.max(r+P,t+P*2+2),o-t-1),L=[...R?["first"]:[],...c?[]:["previous"],...p,...g>t+2?["start-ellipsis"]:t+1<o-t?[t+1]:[],...S(g,u),...u<o-t-1?["end-ellipsis"]:o-t>t?[o-t]:[],...M,...f?[]:["next"],...O?["last"]:[]],k=e=>{switch(e){case"first":return 1;case"previous":return r-1;case"next":return r+1;case"last":return o;default:return null}};return{items:L.map(e=>typeof e=="number"?{onClick:i=>{C(i,e)},type:"page",page:e,selected:e===r,disabled:x,"aria-current":e===r?"page":void 0}:{onClick:i=>{C(i,k(e))},type:e,page:k(e),selected:!1,disabled:x||!e.includes("ellipsis")&&(e==="next"||e==="last"?r>=o:r<=1)}),...$}}function sa(a){return G("MuiPaginationItem",a)}const n=D("MuiPaginationItem",["root","page","sizeSmall","sizeLarge","text","textPrimary","textSecondary","outlined","outlinedPrimary","outlinedSecondary","rounded","ellipsis","firstLast","previousNext","focusVisible","disabled","selected","icon","colorPrimary","colorSecondary"]),ea=_(v.jsx("path",{d:"M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"}),"NavigateBefore"),oa=_(v.jsx("path",{d:"M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"}),"NavigateNext"),J=(a,t)=>{const{ownerState:s}=a;return[t.root,t[s.variant],t[`size${N(s.size)}`],s.variant==="text"&&t[`text${N(s.color)}`],s.variant==="outlined"&&t[`outlined${N(s.color)}`],s.shape==="rounded"&&t.rounded,s.type==="page"&&t.page,(s.type==="start-ellipsis"||s.type==="end-ellipsis")&&t.ellipsis,(s.type==="previous"||s.type==="next")&&t.previousNext,(s.type==="first"||s.type==="last")&&t.firstLast]},ia=a=>{const{classes:t,color:s,disabled:o,selected:b,size:x,shape:f,type:c,variant:d}=a,y={root:["root",`size${N(x)}`,d,f,s!=="standard"&&`color${N(s)}`,s!=="standard"&&`${d}${N(s)}`,o&&"disabled",b&&"selected",{page:"page",first:"firstLast",last:"firstLast","start-ellipsis":"ellipsis","end-ellipsis":"ellipsis",previous:"previousNext",next:"previousNext"}[c]],icon:["icon"]};return H(y,sa,t)},na=w("div",{name:"MuiPaginationItem",slot:"Root",overridesResolver:J})(U(({theme:a})=>({...a.typography.body2,borderRadius:32/2,textAlign:"center",boxSizing:"border-box",minWidth:32,padding:"0 6px",margin:"0 3px",color:(a.vars||a).palette.text.primary,height:"auto",[`&.${n.disabled}`]:{opacity:(a.vars||a).palette.action.disabledOpacity},variants:[{props:{size:"small"},style:{minWidth:26,borderRadius:26/2,margin:"0 1px",padding:"0 4px"}},{props:{size:"large"},style:{minWidth:40,borderRadius:40/2,padding:"0 10px",fontSize:a.typography.pxToRem(15)}}]}))),ra=w(X,{name:"MuiPaginationItem",slot:"Root",overridesResolver:J})(U(({theme:a})=>({...a.typography.body2,borderRadius:32/2,textAlign:"center",boxSizing:"border-box",minWidth:32,height:32,padding:"0 6px",margin:"0 3px",color:(a.vars||a).palette.text.primary,[`&.${n.focusVisible}`]:{backgroundColor:(a.vars||a).palette.action.focus},[`&.${n.disabled}`]:{opacity:(a.vars||a).palette.action.disabledOpacity},transition:a.transitions.create(["color","background-color"],{duration:a.transitions.duration.short}),"&:hover":{backgroundColor:(a.vars||a).palette.action.hover,"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${n.selected}`]:{backgroundColor:(a.vars||a).palette.action.selected,"&:hover":{backgroundColor:a.vars?`rgba(${a.vars.palette.action.selectedChannel} / calc(${a.vars.palette.action.selectedOpacity} + ${a.vars.palette.action.hoverOpacity}))`:I(a.palette.action.selected,a.palette.action.selectedOpacity+a.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:(a.vars||a).palette.action.selected}},[`&.${n.focusVisible}`]:{backgroundColor:a.vars?`rgba(${a.vars.palette.action.selectedChannel} / calc(${a.vars.palette.action.selectedOpacity} + ${a.vars.palette.action.focusOpacity}))`:I(a.palette.action.selected,a.palette.action.selectedOpacity+a.palette.action.focusOpacity)},[`&.${n.disabled}`]:{opacity:1,color:(a.vars||a).palette.action.disabled,backgroundColor:(a.vars||a).palette.action.selected}},variants:[{props:{size:"small"},style:{minWidth:26,height:26,borderRadius:26/2,margin:"0 1px",padding:"0 4px"}},{props:{size:"large"},style:{minWidth:40,height:40,borderRadius:40/2,padding:"0 10px",fontSize:a.typography.pxToRem(15)}},{props:{shape:"rounded"},style:{borderRadius:(a.vars||a).shape.borderRadius}},{props:{variant:"outlined"},style:{border:a.vars?`1px solid rgba(${a.vars.palette.common.onBackgroundChannel} / 0.23)`:`1px solid ${a.palette.mode==="light"?"rgba(0, 0, 0, 0.23)":"rgba(255, 255, 255, 0.23)"}`,[`&.${n.selected}`]:{[`&.${n.disabled}`]:{borderColor:(a.vars||a).palette.action.disabledBackground,color:(a.vars||a).palette.action.disabled}}}},{props:{variant:"text"},style:{[`&.${n.selected}`]:{[`&.${n.disabled}`]:{color:(a.vars||a).palette.action.disabled}}}},...Object.entries(a.palette).filter(V(["dark","contrastText"])).map(([t])=>({props:{variant:"text",color:t},style:{[`&.${n.selected}`]:{color:(a.vars||a).palette[t].contrastText,backgroundColor:(a.vars||a).palette[t].main,"&:hover":{backgroundColor:(a.vars||a).palette[t].dark,"@media (hover: none)":{backgroundColor:(a.vars||a).palette[t].main}},[`&.${n.focusVisible}`]:{backgroundColor:(a.vars||a).palette[t].dark},[`&.${n.disabled}`]:{color:(a.vars||a).palette.action.disabled}}}})),...Object.entries(a.palette).filter(V(["light"])).map(([t])=>({props:{variant:"outlined",color:t},style:{[`&.${n.selected}`]:{color:(a.vars||a).palette[t].main,border:`1px solid ${a.vars?`rgba(${a.vars.palette[t].mainChannel} / 0.5)`:I(a.palette[t].main,.5)}`,backgroundColor:a.vars?`rgba(${a.vars.palette[t].mainChannel} / ${a.vars.palette.action.activatedOpacity})`:I(a.palette[t].main,a.palette.action.activatedOpacity),"&:hover":{backgroundColor:a.vars?`rgba(${a.vars.palette[t].mainChannel} / calc(${a.vars.palette.action.activatedOpacity} + ${a.vars.palette.action.focusOpacity}))`:I(a.palette[t].main,a.palette.action.activatedOpacity+a.palette.action.focusOpacity),"@media (hover: none)":{backgroundColor:"transparent"}},[`&.${n.focusVisible}`]:{backgroundColor:a.vars?`rgba(${a.vars.palette[t].mainChannel} / calc(${a.vars.palette.action.activatedOpacity} + ${a.vars.palette.action.focusOpacity}))`:I(a.palette[t].main,a.palette.action.activatedOpacity+a.palette.action.focusOpacity)}}}}))]}))),la=w("div",{name:"MuiPaginationItem",slot:"Icon",overridesResolver:(a,t)=>t.icon})(U(({theme:a})=>({fontSize:a.typography.pxToRem(20),margin:"0 -8px",variants:[{props:{size:"small"},style:{fontSize:a.typography.pxToRem(18)}},{props:{size:"large"},style:{fontSize:a.typography.pxToRem(22)}}]}))),pa=E.forwardRef(function(t,s){const o=q({props:t,name:"MuiPaginationItem"}),{className:b,color:x="standard",component:f,components:c={},disabled:d=!1,page:y,selected:R=!1,shape:O="circular",size:P="medium",slots:$={},slotProps:r={},type:l="page",variant:C="text",...S}=o,p={...o,color:x,disabled:d,selected:R,shape:O,size:P,type:l,variant:C},M=Y(),g=ia(p),u={slots:{previous:$.previous??c.previous,next:$.next??c.next,first:$.first??c.first,last:$.last??c.last},slotProps:r},[L,k]=B("previous",{elementType:ea,externalForwardedProps:u,ownerState:p}),[z,e]=B("next",{elementType:oa,externalForwardedProps:u,ownerState:p}),[i,m]=B("first",{elementType:Z,externalForwardedProps:u,ownerState:p}),[F,j]=B("last",{elementType:h,externalForwardedProps:u,ownerState:p}),W=M?{previous:"next",next:"previous",first:"last",last:"first"}[l]:l,A={previous:L,next:z,first:i,last:F}[W],K={previous:k,next:e,first:m,last:j}[W];return l==="start-ellipsis"||l==="end-ellipsis"?v.jsx(na,{ref:s,ownerState:p,className:T(g.root,b),children:"…"}):v.jsxs(ra,{ref:s,ownerState:p,component:f,disabled:d,className:T(g.root,b),...S,children:[l==="page"&&y,A?v.jsx(la,{...K,className:g.icon,as:A}):null]})}),ca=a=>{const{classes:t,variant:s}=a;return H({root:["root",s],ul:["ul"]},aa,t)},da=w("nav",{name:"MuiPagination",slot:"Root",overridesResolver:(a,t)=>{const{ownerState:s}=a;return[t.root,t[s.variant]]}})({}),ua=w("ul",{name:"MuiPagination",slot:"Ul",overridesResolver:(a,t)=>t.ul})({display:"flex",flexWrap:"wrap",alignItems:"center",padding:0,margin:0,listStyle:"none"});function ga(a,t,s){return a==="page"?`${s?"":"Go to "}page ${t}`:`Go to ${a} page`}const fa=E.forwardRef(function(t,s){const o=q({props:t,name:"MuiPagination"}),{boundaryCount:b=1,className:x,color:f="standard",count:c=1,defaultPage:d=1,disabled:y=!1,getItemAriaLabel:R=ga,hideNextButton:O=!1,hidePrevButton:P=!1,onChange:$,page:r,renderItem:l=i=>v.jsx(pa,{...i}),shape:C="circular",showFirstButton:S=!1,showLastButton:p=!1,siblingCount:M=1,size:g="medium",variant:u="text",...L}=o,{items:k}=ta({...o,componentName:"Pagination"}),z={...o,boundaryCount:b,color:f,count:c,defaultPage:d,disabled:y,getItemAriaLabel:R,hideNextButton:O,hidePrevButton:P,renderItem:l,shape:C,showFirstButton:S,showLastButton:p,siblingCount:M,size:g,variant:u},e=ca(z);return v.jsx(da,{"aria-label":"pagination navigation",className:T(e.root,x),ownerState:z,ref:s,...L,children:v.jsx(ua,{className:e.ul,ownerState:z,children:k.map((i,m)=>v.jsx("li",{children:l({...i,color:f,"aria-label":R(i.type,i.page,i.selected),shape:C,size:g,variant:u})},m))})})});export{fa as P};
