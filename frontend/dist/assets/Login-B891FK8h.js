import{c as C,j as t,g as $,a as D,s as L,r as R,b as h,m as F,d as I,e as S,u as O,f as M,h as V,B,I as H,i as N,C as E,T as z,l as T,k as A,P as G}from"./index-wzwGaSs2.js";import{r as u,L as g,u as U,d as W}from"./react-vendor-CUI16jnX.js";import{A as q}from"./Alert-BSMHJqqF.js";import{T as P}from"./TextField-NdKXI3fy.js";import{I as J}from"./InputAdornment-DA38MTFG.js";import{S as K,V as Q,a as X,F as Y}from"./VisibilityOff-Bjymhlzi.js";import{G as v}from"./Grid-BWmcepYI.js";import{u as Z,b as _}from"./redux-vendor-D3UFojRl.js";const ee=C(t.jsx("path",{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}),"CheckBoxOutlineBlank"),te=C(t.jsx("path",{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckBox"),oe=C(t.jsx("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"}),"IndeterminateCheckBox");function ae(e){return D("MuiCheckbox",e)}const j=$("MuiCheckbox",["root","checked","disabled","indeterminate","colorPrimary","colorSecondary","sizeSmall","sizeMedium"]),se=e=>{const{classes:o,indeterminate:a,color:s,size:i}=e,n={root:["root",a&&"indeterminate",`color${h(s)}`,`size${h(i)}`]},l=V(n,ae,o);return{...o,...l}},re=L(K,{shouldForwardProp:e=>R(e)||e==="classes",name:"MuiCheckbox",slot:"Root",overridesResolver:(e,o)=>{const{ownerState:a}=e;return[o.root,a.indeterminate&&o.indeterminate,o[`size${h(a.size)}`],a.color!=="default"&&o[`color${h(a.color)}`]]}})(F(({theme:e})=>({color:(e.vars||e).palette.text.secondary,variants:[{props:{color:"default",disableRipple:!1},style:{"&:hover":{backgroundColor:e.vars?`rgba(${e.vars.palette.action.activeChannel} / ${e.vars.palette.action.hoverOpacity})`:I(e.palette.action.active,e.palette.action.hoverOpacity)}}},...Object.entries(e.palette).filter(S()).map(([o])=>({props:{color:o,disableRipple:!1},style:{"&:hover":{backgroundColor:e.vars?`rgba(${e.vars.palette[o].mainChannel} / ${e.vars.palette.action.hoverOpacity})`:I(e.palette[o].main,e.palette.action.hoverOpacity)}}})),...Object.entries(e.palette).filter(S()).map(([o])=>({props:{color:o},style:{[`&.${j.checked}, &.${j.indeterminate}`]:{color:(e.vars||e).palette[o].main},[`&.${j.disabled}`]:{color:(e.vars||e).palette.action.disabled}}})),{props:{disableRipple:!1},style:{"&:hover":{"@media (hover: none)":{backgroundColor:"transparent"}}}}]}))),ne=t.jsx(te,{}),ie=t.jsx(ee,{}),ce=t.jsx(oe,{}),le=u.forwardRef(function(o,a){const s=O({props:o,name:"MuiCheckbox"}),{checkedIcon:i=ne,color:n="primary",icon:l=ie,indeterminate:d=!1,indeterminateIcon:b=ce,inputProps:m,size:r="medium",disableRipple:p=!1,className:c,...f}=s,x=d?b:l,y=d?b:i,k={...s,disableRipple:p,color:n,indeterminate:d,size:r},w=se(k);return t.jsx(re,{type:"checkbox",inputProps:{"data-indeterminate":d,...m},icon:u.cloneElement(x,{fontSize:x.props.fontSize??r}),checkedIcon:u.cloneElement(y,{fontSize:y.props.fontSize??r}),ownerState:k,ref:a,className:M(w.root,c),disableRipple:p,...f,classes:w})}),de=({formData:e,isLoading:o,error:a,onChange:s,onSubmit:i})=>{const[n,l]=u.useState(!1),d=()=>{l(!n)};return t.jsxs(B,{component:"form",onSubmit:i,sx:{mt:3,width:"100%"},children:[a&&t.jsx(q,{severity:"error",sx:{mb:2},children:a}),t.jsx(P,{margin:"normal",required:!0,fullWidth:!0,id:"email",label:"Email",name:"email",autoComplete:"email",autoFocus:!0,value:e.email,onChange:s,disabled:o}),t.jsx(P,{margin:"normal",required:!0,fullWidth:!0,name:"password",label:"Пароль",type:n?"text":"password",id:"password",autoComplete:"current-password",value:e.password,onChange:s,disabled:o,InputProps:{endAdornment:t.jsx(J,{position:"end",children:t.jsx(H,{"aria-label":"toggle password visibility",onClick:d,edge:"end",children:n?t.jsx(Q,{}):t.jsx(X,{})})})}}),t.jsx(Y,{control:t.jsx(le,{name:"remember",checked:e.remember,onChange:s,color:"primary",disabled:o}),label:"Запомнить меня"}),t.jsx(N,{type:"submit",fullWidth:!0,variant:"contained",sx:{mt:3,mb:2},disabled:o,children:o?t.jsx(E,{size:24,color:"inherit"}):"Войти"}),t.jsxs(v,{container:!0,children:[t.jsx(v,{item:!0,xs:!0,children:t.jsx(g,{to:"/forgot-password",children:t.jsx(z,{variant:"body2",color:"primary",sx:{textDecoration:"none","&:hover":{textDecoration:"underline"}},children:"Забыли пароль?"})})}),t.jsx(v,{item:!0,children:t.jsx(g,{to:"/register",children:t.jsx(z,{variant:"body2",color:"primary",sx:{textDecoration:"none","&:hover":{textDecoration:"underline"}},children:"Нет аккаунта? Зарегистрируйтесь"})})})]})]})},me=()=>t.jsxs("div",{children:[t.jsx("img",{className:"mx-auto h-12 w-auto",src:"/game-controller.svg",alt:"GameGold Logo"}),t.jsx("h2",{className:"mt-6 text-center text-3xl font-extrabold text-gray-900",children:"Войти в аккаунт"}),t.jsxs("p",{className:"mt-2 text-center text-sm text-gray-600",children:["Или"," ",t.jsx(g,{to:"/register",className:"font-medium text-blue-600 hover:text-blue-500",children:"зарегистрируйтесь"}),", если у вас еще нет аккаунта"]})]}),pe=()=>{const e=Z(),o=U(),a=W(),{isLoading:s,error:i}=_(m=>m.auth),[n,l]=u.useState({email:"",password:"",remember:!1});return{formData:n,isLoading:s,error:i,handleChange:m=>{const{name:r,value:p,type:c,checked:f}=m.target;l(x=>({...x,[r]:c==="checkbox"?f:p}))},handleSubmit:async m=>{m.preventDefault();try{const r=await e(T(n)).unwrap();if(r.success&&r.data?.user){const{user:p}=r.data,c=a.state?.from?.pathname;p.role==="admin"&&(!c||c==="/")?o("/admin/dashboard",{replace:!0}):c?o(c,{replace:!0}):o("/",{replace:!0})}}catch(r){console.error("Login error:",r)}}}},Ce=()=>{const{formData:e,isLoading:o,error:a,handleChange:s,handleSubmit:i}=pe();return t.jsx(A,{component:"main",maxWidth:"xs",children:t.jsx(B,{sx:{minHeight:"calc(100vh - 64px)",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",py:4},children:t.jsxs(G,{elevation:3,sx:{p:4,width:"100%",display:"flex",flexDirection:"column",alignItems:"center"},children:[t.jsx(me,{}),t.jsx(de,{formData:e,isLoading:o,error:a,onChange:s,onSubmit:i})]})})})};export{Ce as default};
