import{c as d,u as g,a as y,R as j,b as m,d as f,j as e,L as t,l as N}from"./index-DwH2koU-.js";import{M as v}from"./map-pin-CSTaY3jG.js";import{U as w}from"./user-Bv4nJ-yk.js";import{S as k}from"./settings-CAVvSHhq.js";import{S as L}from"./shopping-cart-w7sXTTOo.js";import{G as C}from"./gamepad-2-DO7picNa.js";/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const x=d("LogOut",[["path",{d:"M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4",key:"1uf3rs"}],["polyline",{points:"16 17 21 12 16 7",key:"1gabdz"}],["line",{x1:"21",x2:"9",y1:"12",y2:"12",key:"1uyos4"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const M=d("Menu",[["line",{x1:"4",x2:"20",y1:"12",y2:"12",key:"1e0a9i"}],["line",{x1:"4",x2:"20",y1:"6",y2:"6",key:"1owob3"}],["line",{x1:"4",x2:"20",y1:"18",y2:"18",key:"yk5zj1"}]]);function U(){const h=g(),u=y(),[o,l]=j.useState(!1),{items:n}=m(s=>s.cart),{user:a}=m(s=>s.auth),{siteName:b}=f(),p=(a==null?void 0:a.role)==="admin",i=()=>{h(N()),u("/")},r=[{to:"/games",label:"Игры"},{to:"/consoles",label:"Консоли"},{to:"/contact",label:"Контакты"}],c=a?[{to:"/tracking",icon:e.jsx(v,{className:"h-6 w-6"}),label:"Отслеживание"},{to:"/profile",icon:e.jsx(w,{className:"h-6 w-6"}),label:"Профиль"},...p?[{to:"/admin",icon:e.jsx(k,{className:"h-6 w-6"}),label:"Админ панель"}]:[],{to:"/cart",icon:e.jsxs("div",{className:"relative",children:[e.jsx(L,{className:"h-6 w-6"}),n.length>0&&e.jsx("span",{className:"absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center",children:n.length})]}),label:"Корзина"}]:[];return e.jsxs("nav",{className:"bg-white shadow-md",children:[e.jsx("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8",children:e.jsxs("div",{className:"flex justify-between h-16",children:[e.jsx("div",{className:"flex items-center",children:e.jsxs(t,{to:"/",className:"flex items-center",children:[e.jsx(C,{className:"h-8 w-8 text-blue-600"}),e.jsx("span",{className:"ml-2 text-xl font-bold text-gray-900",children:b||"Game Rental"})]})}),e.jsxs("div",{className:"hidden md:flex md:items-center md:space-x-8",children:[r.map(s=>e.jsx(t,{to:s.to,className:"text-gray-700 hover:text-blue-600 transition-colors",children:s.label},s.to)),c.map(s=>e.jsx(t,{to:s.to,className:"text-gray-700 hover:text-blue-600 transition-colors",title:s.label,children:s.icon},s.to)),a?e.jsx("button",{onClick:i,className:"text-gray-700 hover:text-blue-600 transition-colors",title:"Выйти",children:e.jsx(x,{className:"h-6 w-6"})}):e.jsx(t,{to:"/login",className:"inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors",children:"Войти"})]}),e.jsx("div",{className:"flex items-center md:hidden",children:e.jsx("button",{onClick:()=>l(!o),className:"inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors",children:e.jsx(M,{className:"h-6 w-6"})})})]})}),o&&e.jsx("div",{className:"md:hidden",children:e.jsxs("div",{className:"px-2 pt-2 pb-3 space-y-1 sm:px-3",children:[r.map(s=>e.jsx(t,{to:s.to,className:"block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors",onClick:()=>l(!1),children:s.label},s.to)),c.map(s=>e.jsxs(t,{to:s.to,className:"flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors",onClick:()=>l(!1),children:[s.icon,e.jsx("span",{className:"ml-2",children:s.label})]},s.to)),a?e.jsxs("button",{onClick:()=>{i(),l(!1)},className:"flex items-center w-full px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition-colors",children:[e.jsx(x,{className:"h-6 w-6"}),e.jsx("span",{className:"ml-2",children:"Выйти"})]}):e.jsx(t,{to:"/login",className:"block px-3 py-2 rounded-md text-base font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors",onClick:()=>l(!1),children:"Войти"})]})})]})}export{U as default};