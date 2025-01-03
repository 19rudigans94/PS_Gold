import{c as he,r as g,j as t,k as V,u as ue,b as _,d as me,B,m as oe,n as ie,o as xe,p as ne,q as fe}from"./index-DwH2koU-.js";import{C as ge}from"./credit-card-Bwhw9tC_.js";import{C as le}from"./Container-_yIFp-Is.js";import{S as be}from"./shopping-bag-BY0tM-oc.js";import{g as Y,c as ee,s as q,d as ve,r as de,u as ye,e as pe,f as M,h as H,i as te,m as K,j as re,k as Z,l as ce,n as je,o as Ce,T as f,P as Q,B as T,a as O,b as ke}from"./TextField-DxDDlAFJ.js";import{G as j}from"./Grid-DxnEAkBs.js";import{I as we}from"./IconButton-DsQYPE88.js";import{T as Se}from"./trash-2-BKVHqOXb.js";import{g as Pe}from"./dividerClasses-CIrFr87N.js";/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const Re=he("Banknote",[["rect",{width:"20",height:"12",x:"2",y:"6",rx:"2",key:"9lu3g6"}],["circle",{cx:"12",cy:"12",r:"2",key:"1c9p78"}],["path",{d:"M6 12h.01M18 12h.01",key:"113zkx"}]]);function Ie(e){return Y("PrivateSwitchBase",e)}ee("PrivateSwitchBase",["root","checked","disabled","input","edgeStart","edgeEnd"]);const $e=e=>{const{classes:r,checked:a,disabled:n,edge:m}=e,p={root:["root",a&&"checked",n&&"disabled",m&&`edge${M(m)}`],input:["input"]};return H(p,Ie,r)},Be=q(ve)({padding:9,borderRadius:"50%",variants:[{props:{edge:"start",size:"small"},style:{marginLeft:-3}},{props:({edge:e,ownerState:r})=>e==="start"&&r.size!=="small",style:{marginLeft:-12}},{props:{edge:"end",size:"small"},style:{marginRight:-3}},{props:({edge:e,ownerState:r})=>e==="end"&&r.size!=="small",style:{marginRight:-12}}]}),ze=q("input",{shouldForwardProp:de})({cursor:"inherit",position:"absolute",opacity:0,width:"100%",height:"100%",top:0,left:0,margin:0,padding:0,zIndex:1}),Ne=g.forwardRef(function(r,a){const{autoFocus:n,checked:m,checkedIcon:p,className:x,defaultChecked:i,disabled:o,disableFocusRipple:v=!1,edge:b=!1,icon:C,id:R,inputProps:N,inputRef:y,name:k,onBlur:w,onChange:I,onFocus:E,readOnly:U,required:D=!1,tabIndex:$,type:S,value:F,...W}=r,[P,L]=ye({controlled:m,default:!!i,name:"SwitchBase",state:"checked"}),s=pe(),c=z=>{E&&E(z),s&&s.onFocus&&s.onFocus(z)},h=z=>{w&&w(z),s&&s.onBlur&&s.onBlur(z)},d=z=>{if(z.nativeEvent.defaultPrevented)return;const ae=z.target.checked;L(ae),I&&I(z,ae)};let l=o;s&&typeof l>"u"&&(l=s.disabled);const u=S==="checkbox"||S==="radio",A={...r,checked:P,disabled:l,disableFocusRipple:v,edge:b},se=$e(A);return t.jsxs(Be,{component:"span",className:V(se.root,x),centerRipple:!0,focusRipple:!v,disabled:l,tabIndex:null,role:void 0,onFocus:c,onBlur:h,ownerState:A,ref:a,...W,children:[t.jsx(ze,{autoFocus:n,checked:m,defaultChecked:i,className:se.input,disabled:l,id:u?R:void 0,name:k,onChange:d,readOnly:U,ref:y,required:D,ownerState:A,tabIndex:$,type:S,...S==="checkbox"&&F===void 0?{}:{value:F},...N}),P?p:C]})}),De=te(t.jsx("path",{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}),"CheckBoxOutlineBlank"),Fe=te(t.jsx("path",{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckBox"),Le=te(t.jsx("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"}),"IndeterminateCheckBox");function Me(e){return Y("MuiCheckbox",e)}const G=ee("MuiCheckbox",["root","checked","disabled","indeterminate","colorPrimary","colorSecondary","sizeSmall","sizeMedium"]),qe=e=>{const{classes:r,indeterminate:a,color:n,size:m}=e,p={root:["root",a&&"indeterminate",`color${M(n)}`,`size${M(m)}`]},x=H(p,Me,r);return{...r,...x}},Ae=q(Ne,{shouldForwardProp:e=>de(e)||e==="classes",name:"MuiCheckbox",slot:"Root",overridesResolver:(e,r)=>{const{ownerState:a}=e;return[r.root,a.indeterminate&&r.indeterminate,r[`size${M(a.size)}`],a.color!=="default"&&r[`color${M(a.color)}`]]}})(K(({theme:e})=>({color:(e.vars||e).palette.text.secondary,variants:[{props:{color:"default",disableRipple:!1},style:{"&:hover":{backgroundColor:e.vars?`rgba(${e.vars.palette.action.activeChannel} / ${e.vars.palette.action.hoverOpacity})`:Z(e.palette.action.active,e.palette.action.hoverOpacity)}}},...Object.entries(e.palette).filter(ce()).map(([r])=>({props:{color:r,disableRipple:!1},style:{"&:hover":{backgroundColor:e.vars?`rgba(${e.vars.palette[r].mainChannel} / ${e.vars.palette.action.hoverOpacity})`:Z(e.palette[r].main,e.palette.action.hoverOpacity)}}})),...Object.entries(e.palette).filter(ce()).map(([r])=>({props:{color:r},style:{[`&.${G.checked}, &.${G.indeterminate}`]:{color:(e.vars||e).palette[r].main},[`&.${G.disabled}`]:{color:(e.vars||e).palette.action.disabled}}})),{props:{disableRipple:!1},style:{"&:hover":{"@media (hover: none)":{backgroundColor:"transparent"}}}}]}))),Te=t.jsx(Fe,{}),Ee=t.jsx(De,{}),Ue=t.jsx(Le,{}),We=g.forwardRef(function(r,a){const n=re({props:r,name:"MuiCheckbox"}),{checkedIcon:m=Te,color:p="primary",icon:x=Ee,indeterminate:i=!1,indeterminateIcon:o=Ue,inputProps:v,size:b="medium",disableRipple:C=!1,className:R,...N}=n,y=i?o:x,k=i?o:m,w={...n,disableRipple:C,color:p,indeterminate:i,size:b},I=qe(w);return t.jsx(Ae,{type:"checkbox",inputProps:{"data-indeterminate":i,...v},icon:g.cloneElement(y,{fontSize:y.props.fontSize??b}),checkedIcon:g.cloneElement(k,{fontSize:k.props.fontSize??b}),ownerState:w,ref:a,className:V(I.root,R),disableRipple:C,...N,classes:I})}),Oe=e=>{const{absolute:r,children:a,classes:n,flexItem:m,light:p,orientation:x,textAlign:i,variant:o}=e;return H({root:["root",r&&"absolute",o,p&&"light",x==="vertical"&&"vertical",m&&"flexItem",a&&"withChildren",a&&x==="vertical"&&"withChildrenVertical",i==="right"&&x!=="vertical"&&"textAlignRight",i==="left"&&x!=="vertical"&&"textAlignLeft"],wrapper:["wrapper",x==="vertical"&&"wrapperVertical"]},Pe,n)},Xe=q("div",{name:"MuiDivider",slot:"Root",overridesResolver:(e,r)=>{const{ownerState:a}=e;return[r.root,a.absolute&&r.absolute,r[a.variant],a.light&&r.light,a.orientation==="vertical"&&r.vertical,a.flexItem&&r.flexItem,a.children&&r.withChildren,a.children&&a.orientation==="vertical"&&r.withChildrenVertical,a.textAlign==="right"&&a.orientation!=="vertical"&&r.textAlignRight,a.textAlign==="left"&&a.orientation!=="vertical"&&r.textAlignLeft]}})(K(({theme:e})=>({margin:0,flexShrink:0,borderWidth:0,borderStyle:"solid",borderColor:(e.vars||e).palette.divider,borderBottomWidth:"thin",variants:[{props:{absolute:!0},style:{position:"absolute",bottom:0,left:0,width:"100%"}},{props:{light:!0},style:{borderColor:e.vars?`rgba(${e.vars.palette.dividerChannel} / 0.08)`:Z(e.palette.divider,.08)}},{props:{variant:"inset"},style:{marginLeft:72}},{props:{variant:"middle",orientation:"horizontal"},style:{marginLeft:e.spacing(2),marginRight:e.spacing(2)}},{props:{variant:"middle",orientation:"vertical"},style:{marginTop:e.spacing(1),marginBottom:e.spacing(1)}},{props:{orientation:"vertical"},style:{height:"100%",borderBottomWidth:0,borderRightWidth:"thin"}},{props:{flexItem:!0},style:{alignSelf:"stretch",height:"auto"}},{props:({ownerState:r})=>!!r.children,style:{display:"flex",textAlign:"center",border:0,borderTopStyle:"solid",borderLeftStyle:"solid","&::before, &::after":{content:'""',alignSelf:"center"}}},{props:({ownerState:r})=>r.children&&r.orientation!=="vertical",style:{"&::before, &::after":{width:"100%",borderTop:`thin solid ${(e.vars||e).palette.divider}`,borderTopStyle:"inherit"}}},{props:({ownerState:r})=>r.orientation==="vertical"&&r.children,style:{flexDirection:"column","&::before, &::after":{height:"100%",borderLeft:`thin solid ${(e.vars||e).palette.divider}`,borderLeftStyle:"inherit"}}},{props:({ownerState:r})=>r.textAlign==="right"&&r.orientation!=="vertical",style:{"&::before":{width:"90%"},"&::after":{width:"10%"}}},{props:({ownerState:r})=>r.textAlign==="left"&&r.orientation!=="vertical",style:{"&::before":{width:"10%"},"&::after":{width:"90%"}}}]}))),Ve=q("span",{name:"MuiDivider",slot:"Wrapper",overridesResolver:(e,r)=>{const{ownerState:a}=e;return[r.wrapper,a.orientation==="vertical"&&r.wrapperVertical]}})(K(({theme:e})=>({display:"inline-block",paddingLeft:`calc(${e.spacing(1)} * 1.2)`,paddingRight:`calc(${e.spacing(1)} * 1.2)`,whiteSpace:"nowrap",variants:[{props:{orientation:"vertical"},style:{paddingTop:`calc(${e.spacing(1)} * 1.2)`,paddingBottom:`calc(${e.spacing(1)} * 1.2)`}}]}))),J=g.forwardRef(function(r,a){const n=re({props:r,name:"MuiDivider"}),{absolute:m=!1,children:p,className:x,orientation:i="horizontal",component:o=p||i==="vertical"?"div":"hr",flexItem:v=!1,light:b=!1,role:C=o!=="hr"?"separator":void 0,textAlign:R="center",variant:N="fullWidth",...y}=n,k={...n,absolute:m,component:o,flexItem:v,light:b,orientation:i,role:C,textAlign:R,variant:N},w=Oe(k);return t.jsx(Xe,{as:o,className:V(w.root,x),role:C,ref:a,ownerState:k,"aria-orientation":C==="separator"&&(o!=="hr"||i==="vertical")?i:void 0,...y,children:p?t.jsx(Ve,{className:w.wrapper,ownerState:k,children:p}):null})});J&&(J.muiSkipListHighlight=!0);function Ke(e){return Y("MuiFormControlLabel",e)}const X=ee("MuiFormControlLabel",["root","labelPlacementStart","labelPlacementTop","labelPlacementBottom","disabled","label","error","required","asterisk"]),He=e=>{const{classes:r,disabled:a,labelPlacement:n,error:m,required:p}=e,x={root:["root",a&&"disabled",`labelPlacement${M(n)}`,m&&"error",p&&"required"],label:["label",a&&"disabled"],asterisk:["asterisk",m&&"error"]};return H(x,Ke,r)},_e=q("label",{name:"MuiFormControlLabel",slot:"Root",overridesResolver:(e,r)=>{const{ownerState:a}=e;return[{[`& .${X.label}`]:r.label},r.root,r[`labelPlacement${M(a.labelPlacement)}`]]}})(K(({theme:e})=>({display:"inline-flex",alignItems:"center",cursor:"pointer",verticalAlign:"middle",WebkitTapHighlightColor:"transparent",marginLeft:-11,marginRight:16,[`&.${X.disabled}`]:{cursor:"default"},[`& .${X.label}`]:{[`&.${X.disabled}`]:{color:(e.vars||e).palette.text.disabled}},variants:[{props:{labelPlacement:"start"},style:{flexDirection:"row-reverse",marginRight:-11}},{props:{labelPlacement:"top"},style:{flexDirection:"column-reverse"}},{props:{labelPlacement:"bottom"},style:{flexDirection:"column"}},{props:({labelPlacement:r})=>r==="start"||r==="top"||r==="bottom",style:{marginLeft:16}}]}))),Qe=q("span",{name:"MuiFormControlLabel",slot:"Asterisk",overridesResolver:(e,r)=>r.asterisk})(K(({theme:e})=>({[`&.${X.error}`]:{color:(e.vars||e).palette.error.main}}))),Ge=g.forwardRef(function(r,a){const n=re({props:r,name:"MuiFormControlLabel"}),{checked:m,className:p,componentsProps:x={},control:i,disabled:o,disableTypography:v,inputRef:b,label:C,labelPlacement:R="end",name:N,onChange:y,required:k,slots:w={},slotProps:I={},value:E,...U}=n,D=pe(),$=o??i.props.disabled??(D==null?void 0:D.disabled),S=k??i.props.required,F={disabled:$,required:S};["checked","name","onChange","value","inputRef"].forEach(l=>{typeof i.props[l]>"u"&&typeof n[l]<"u"&&(F[l]=n[l])});const W=je({props:n,muiFormControl:D,states:["error"]}),P={...n,disabled:$,labelPlacement:R,required:S,error:W.error},L=He(P),s={slots:w,slotProps:{...x,...I}},[c,h]=Ce("typography",{elementType:f,externalForwardedProps:s,ownerState:P});let d=C;return d!=null&&d.type!==f&&!v&&(d=t.jsx(c,{component:"span",...h,className:V(L.label,h==null?void 0:h.className),children:d})),t.jsxs(_e,{className:V(L.root,p),ownerState:P,ref:a,...U,children:[g.cloneElement(i,F),S?t.jsxs("div",{children:[d,t.jsxs(Qe,{ownerState:P,"aria-hidden":!0,className:L.asterisk,children:[" ","*"]})]}):d]})});function Ze({selectedMethod:e,onSelect:r,total:a}){return t.jsxs("div",{className:"space-y-4",children:[t.jsx("h3",{className:"text-lg font-semibold",children:"Способ оплаты"}),t.jsxs("div",{className:"space-y-3",children:[t.jsxs("div",{className:`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${e==="cash"?"border-blue-500 bg-blue-50":"border-gray-200 hover:border-blue-200"}`,onClick:()=>r("cash"),children:[t.jsx(Re,{className:"h-6 w-6 text-gray-500 mr-3"}),t.jsxs("div",{className:"flex-grow",children:[t.jsx("h4",{className:"font-medium",children:"Наличными при получении"}),t.jsx("p",{className:"text-sm text-gray-500",children:"Оплата курьеру при доставке"})]}),t.jsx("input",{type:"radio",checked:e==="cash",onChange:()=>r("cash"),className:"h-4 w-4 text-blue-600"})]}),t.jsxs("div",{className:`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${e==="kaspi"?"border-blue-500 bg-blue-50":"border-gray-200 hover:border-blue-200"}`,onClick:()=>r("kaspi"),children:[t.jsx(ge,{className:"h-6 w-6 text-gray-500 mr-3"}),t.jsxs("div",{className:"flex-grow",children:[t.jsx("h4",{className:"font-medium",children:"Kaspi.kz"}),t.jsx("p",{className:"text-sm text-gray-500",children:"Быстрая оплата через Kaspi QR"}),t.jsxs("p",{className:"text-xs text-gray-500 mt-1",children:["Сумма к оплате: ",a," ₽"]})]}),t.jsx("input",{type:"radio",checked:e==="kaspi",onChange:()=>r("kaspi"),className:"h-4 w-4 text-blue-600"})]})]}),e==="kaspi"&&t.jsxs("div",{className:"mt-4 p-4 bg-yellow-50 rounded-lg space-y-2",children:[t.jsx("p",{className:"text-sm text-yellow-800",children:"После подтверждения заказа вы будете перенаправлены на страницу оплаты Kaspi.kz"}),t.jsxs("ul",{className:"text-sm text-yellow-800 list-disc list-inside",children:[t.jsx("li",{children:"Отсканируйте QR-код в приложении Kaspi.kz"}),t.jsx("li",{children:"Подтвердите оплату в приложении"}),t.jsx("li",{children:"Дождитесь подтверждения платежа"})]})]})]})}const Je=async e=>new Promise((r,a)=>{if(!e.total||e.total<=0){a(new Error("Некорректная сумма заказа"));return}setTimeout(()=>{r({paymentUrl:"https://kaspi.kz/pay/example",paymentId:"KASPI-"+Math.random().toString(36).substr(2,9),amount:e.total,currency:"KZT",description:`Заказ #${Math.floor(Math.random()*1e6)}`,timestamp:new Date().toISOString()})},1e3)});function lt(){const e=ue(),{items:r}=_(s=>s.cart),{user:a,isAuthenticated:n}=_(s=>s.auth),{loading:m,error:p,success:x}=_(s=>s.orders),{deliverySettings:i}=me();if(g.useEffect(()=>{n||(B.error("Для доступа к корзине необходимо авторизоваться"),window.location.href="/login")},[n]),!n)return null;const[o,v]=g.useState({name:"",phone:"",email:"",address:""}),[b,C]=g.useState(!0),[R,N]=g.useState("cash"),[y,k]=g.useState(0);g.useState(i.defaultShippingMethod);const w=()=>i.enableFreeShipping&&y>=i.freeDeliveryAmount?0:i.deliveryPrice||300;g.useEffect(()=>{const s=r.reduce((c,h)=>c+S(h),0);k(s)},[r]);const I=w(),E=y+I;g.useEffect(()=>{a&&b&&v({name:a.name||"",phone:a.phone||"",email:a.email||"",address:a.address||""})},[a,b]),g.useEffect(()=>{x&&(B.success("Заказ успешно оформлен!"),e(oe()),e(ie())),p&&(B.error(p),e(ie()))},[x,p,e]);const U=s=>{e(xe(s))},D=(s,c)=>{const h=r.find(l=>l._id===s);if(!h)return;const d=h.type==="console"?1:5;if(c<1){B.warning("Количество не может быть меньше 1");return}if(c>d){B.warning(`Максимальное количество ${h.type==="console"?"консоли":"игры"}: ${d}`),e(ne({_id:s,quantity:d}));return}e(ne({_id:s,quantity:c}))},$=s=>typeof s=="number"?s.toLocaleString():"0",S=s=>{const c=s.price||0,h=s.quantity||1,d=s.type==="console"&&s.rentalDays||1;return c*h*d},F=()=>{var d,l,u,A;const s=[];r.length===0&&s.push("Корзина пуста"),(d=o.name)!=null&&d.trim()||s.push("Укажите имя получателя"),(l=o.phone)!=null&&l.trim()||s.push("Укажите номер телефона"),(u=o.email)!=null&&u.trim()||s.push("Укажите email"),(A=o.address)!=null&&A.trim()||s.push("Укажите адрес доставки");const c=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;o.email&&!c.test(o.email)&&s.push("Укажите корректный email");const h=/^\+7\d{10}$/;return o.phone&&!h.test(o.phone)&&s.push("Номер телефона должен быть в формате +7XXXXXXXXXX"),s},W=async s=>{var h,d;s.preventDefault();const c=F();if(c.length>0){c.forEach(l=>B.error(l));return}try{const l={items:r.map(u=>({_id:u._id,type:u.type,title:u.title,quantity:u.quantity||1,price:u.type==="console"?u.price*(u.rentalDays||1):u.price,...u.type==="console"&&{rentalDays:u.rentalDays||1}})),total:calculateTotal(),delivery:{name:o.name.trim(),phone:o.phone.trim(),email:o.email.trim(),address:o.address.trim()},paymentMethod:R,status:"pending"};if(R==="kaspi"){B.info("Перенаправление на страницу оплаты Kaspi...");const{paymentUrl:u}=await Je(l);if(!u)throw new Error("Не удалось получить ссылку на оплату");window.location.href=u}else{B.info("Оформление заказа...");const u=await e(fe(l)).unwrap();if(u&&u._id)B.success("Заказ успешно оформлен!"),e(oe());else throw new Error("Не удалось создать заказ")}}catch(l){console.error("Ошибка при оформлении заказа:",l),B.error(((d=(h=l.response)==null?void 0:h.data)==null?void 0:d.message)||l.message||"Произошла ошибка при оформлении заказа")}},P=s=>{const{name:c,value:h}=s.target;v(d=>({...d,[c]:h}))},L=()=>{C(!b),!b&&a&&v({name:a.name||"",phone:a.phone||"",email:a.email||"",address:a.address||""})};return r.length===0?t.jsxs(le,{maxWidth:"lg",sx:{py:8,textAlign:"center"},children:[t.jsx(be,{size:64,style:{margin:"0 auto",color:"#9e9e9e"}}),t.jsx(f,{variant:"h4",sx:{mt:2,mb:1},children:"Корзина пуста"}),t.jsx(f,{color:"text.secondary",children:"Добавьте игры или консоли в корзину"})]}):t.jsxs(le,{maxWidth:"lg",sx:{py:8},children:[t.jsx(f,{variant:"h4",gutterBottom:!0,children:"Корзина"}),t.jsxs(j,{container:!0,spacing:4,children:[t.jsxs(j,{item:!0,xs:12,lg:7,children:[t.jsxs(Q,{elevation:3,sx:{p:3,mb:3},children:[r.map(s=>t.jsx(T,{sx:{py:2,"&:not(:last-child)":{borderBottom:1,borderColor:"divider"}},children:t.jsxs(j,{container:!0,spacing:2,alignItems:"center",children:[t.jsx(j,{item:!0,xs:3,children:t.jsx(T,{component:"img",src:s.imageUrl?s.imageUrl.includes("uploads/")?`http://localhost:3000/api/${s.imageUrl}`:`http://localhost:3000/api/uploads/${s.imageUrl}`:"/placeholder-image.png",alt:s.title,onError:c=>{c.target.onerror=null,c.target.src="/placeholder-image.png"},sx:{width:"100%",height:"auto",aspectRatio:"1",objectFit:"cover",borderRadius:1}})}),t.jsxs(j,{item:!0,xs:6,children:[t.jsx(f,{variant:"subtitle1",fontWeight:"medium",children:s.title}),s.type==="console"&&t.jsxs(f,{variant:"body2",color:"text.secondary",children:["Аренда на ",s.rentalDays||1," ",s.rentalDays===1?"день":"дней"]}),t.jsxs(f,{variant:"body2",color:"primary",sx:{mt:1},children:[$(s.price)," ₸",s.type==="console"?"/день":""]}),t.jsxs(f,{variant:"body2",color:"text.secondary",children:["Итого: ",$(S(s))," ₸"]}),t.jsxs(T,{sx:{mt:1,display:"flex",alignItems:"center"},children:[t.jsx(O,{type:"number",size:"small",value:s.quantity||1,onChange:c=>D(s._id,parseInt(c.target.value)),inputProps:{min:1},sx:{width:80}}),t.jsx(we,{color:"error",onClick:()=>U(s._id),sx:{ml:1},children:t.jsx(Se,{size:20})})]})]}),t.jsx(j,{item:!0,xs:3,children:t.jsxs(f,{variant:"subtitle1",align:"right",fontWeight:"medium",children:[$(S(s))," ₸"]})})]})},`${s.type}-${s._id}`)),t.jsx(J,{sx:{my:2}}),t.jsxs(T,{sx:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[t.jsx(f,{variant:"h6",children:"Итого:"}),t.jsxs(f,{variant:"h6",children:[$(y)," ₸"]})]}),t.jsxs(T,{sx:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[t.jsx(f,{variant:"h6",children:"Доставка:"}),t.jsx(f,{variant:"h6",children:I===0?t.jsx("span",{className:"text-green-600",children:"Бесплатно"}):`${I} ₸`})]}),i.enableFreeShipping&&y<i.freeDeliveryAmount&&t.jsxs(f,{variant:"body2",color:"text.secondary",children:["Добавьте товаров еще на ",i.freeDeliveryAmount-y," ₸ для бесплатной доставки"]}),t.jsxs(T,{sx:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[t.jsx(f,{variant:"h6",children:"Общая стоимость:"}),t.jsxs(f,{variant:"h6",children:[$(E)," ₸"]})]})]}),t.jsxs(Q,{elevation:3,sx:{p:3},children:[t.jsx(f,{variant:"h6",gutterBottom:!0,children:"Способ оплаты"}),t.jsx(Ze,{selectedMethod:R,onSelect:N})]})]}),t.jsx(j,{item:!0,xs:12,lg:5,children:t.jsxs(Q,{elevation:3,sx:{p:3},children:[t.jsx(f,{variant:"h6",gutterBottom:!0,children:"Данные доставки"}),a&&t.jsx(Ge,{control:t.jsx(We,{checked:b,onChange:L}),label:"Использовать данные из профиля",sx:{mb:2}}),t.jsx("form",{onSubmit:W,children:t.jsxs(j,{container:!0,spacing:2,children:[t.jsx(j,{item:!0,xs:12,children:t.jsx(O,{fullWidth:!0,label:"ФИО",name:"name",value:o.name,onChange:P,required:!0})}),t.jsx(j,{item:!0,xs:12,children:t.jsx(O,{fullWidth:!0,label:"Телефон",name:"phone",value:o.phone,onChange:P,required:!0})}),t.jsx(j,{item:!0,xs:12,children:t.jsx(O,{fullWidth:!0,label:"Email",name:"email",type:"email",value:o.email,onChange:P,required:!0})}),t.jsx(j,{item:!0,xs:12,children:t.jsx(O,{fullWidth:!0,label:"Адрес доставки",name:"address",value:o.address,onChange:P,required:!0,multiline:!0,rows:2})}),t.jsx(j,{item:!0,xs:12,children:t.jsx(ke,{type:"submit",variant:"contained",fullWidth:!0,size:"large",disabled:m||r.length===0,children:m?"Оформление...":"Оформить заказ"})})]})})]})})]})]})}export{lt as default};
