import{c as s,w as m,j as e,L as n,O as l}from"./index-DwH2koU-.js";import{P as d}from"./package-DTanlPbd.js";import{S as h}from"./shopping-cart-w7sXTTOo.js";import{U as x}from"./users-B41bFE6A.js";import{S as y}from"./settings-CAVvSHhq.js";/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const p=s("Key",[["circle",{cx:"7.5",cy:"15.5",r:"5.5",key:"yqb3hr"}],["path",{d:"m21 2-9.6 9.6",key:"1j0ho8"}],["path",{d:"m15.5 7.5 3 3L22 7l-3-3",key:"1rn1fs"}]]);/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const g=s("LayoutGrid",[["rect",{width:"7",height:"7",x:"3",y:"3",rx:"1",key:"1g98yp"}],["rect",{width:"7",height:"7",x:"14",y:"3",rx:"1",key:"6d4xhi"}],["rect",{width:"7",height:"7",x:"14",y:"14",rx:"1",key:"nxv5o0"}],["rect",{width:"7",height:"7",x:"3",y:"14",rx:"1",key:"1bb6yr"}]]);function w(){const i=m(),r=[{path:"/admin",icon:g,label:"Дашборд"},{path:"/admin/catalog",icon:d,label:"Каталог"},{path:"/admin/game-keys",icon:p,label:"Цифровые ключи"},{path:"/admin/orders",icon:h,label:"Заказы"},{path:"/admin/users",icon:x,label:"Пользователи"},{path:"/admin/settings",icon:y,label:"Настройки"}];return e.jsxs("div",{className:"flex bg-gray-100 mt-16",children:[e.jsxs("aside",{className:"w-64 bg-white shadow-md min-h-[calc(100vh-4rem)]",children:[e.jsx("div",{className:"p-4",children:e.jsx("h1",{className:"text-xl font-semibold text-gray-800 mb-4",children:"Панель управления"})}),e.jsx("nav",{className:"mt-2 px-2",children:e.jsx("div",{className:"space-y-1",children:r.map(({path:a,icon:c,label:o})=>{const t=i.pathname===a;return e.jsxs(n,{to:a,className:`
                    group flex items-center px-4 py-2 text-sm font-medium rounded-md
                    ${t?"bg-blue-100 text-blue-700":"text-gray-600 hover:bg-gray-50 hover:text-gray-900"}
                  `,children:[e.jsx(c,{className:`
                      mr-3 h-5 w-5
                      ${t?"text-blue-700":"text-gray-400 group-hover:text-gray-500"}
                    `}),o]},a)})})})]}),e.jsx("main",{className:"flex-1 overflow-y-auto p-8",children:e.jsx("div",{className:"max-w-7xl mx-auto",children:e.jsx("div",{className:"bg-white rounded-lg shadow-sm p-6",children:e.jsx(l,{})})})})]})}export{w as default};
