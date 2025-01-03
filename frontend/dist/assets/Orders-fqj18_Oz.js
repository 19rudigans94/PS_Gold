import{c as N,j as e,r as a,C as w,B as b}from"./index-DwH2koU-.js";import{X as v}from"./x-BNpd7WcG.js";import{S}from"./search-C5MJdETT.js";import{E as k}from"./eye-RRX6OTpV.js";import{P as C}from"./package-DTanlPbd.js";import{T as L}from"./truck-CFFM20aK.js";/**
 * @license lucide-react v0.344.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const O=N("CheckCircle",[["path",{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14",key:"g774vq"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]]);function D({order:s,onClose:c,onStatusUpdate:l}){return e.jsx("div",{className:"fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50",children:e.jsxs("div",{className:"relative top-20 mx-auto p-5 border w-[600px] shadow-lg rounded-md bg-white",children:[e.jsxs("div",{className:"flex justify-between items-center mb-4",children:[e.jsxs("h3",{className:"text-lg font-medium",children:["Детали заказа ",s.orderNumber]}),e.jsx("button",{onClick:c,className:"text-gray-400 hover:text-gray-500",children:e.jsx(v,{className:"h-6 w-6"})})]}),e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{children:[e.jsx("h4",{className:"text-sm font-medium text-gray-500 mb-2",children:"Информация о клиенте"}),e.jsx("div",{className:"bg-gray-50 p-4 rounded-md",children:e.jsx("p",{className:"text-sm text-gray-900",children:s.customer})})]}),e.jsxs("div",{children:[e.jsx("h4",{className:"text-sm font-medium text-gray-500 mb-2",children:"Информация о заказе"}),e.jsxs("div",{className:"bg-gray-50 p-4 rounded-md space-y-2",children:[e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"text-sm text-gray-500",children:"Дата заказа:"}),e.jsx("span",{className:"text-sm text-gray-900",children:new Date(s.date).toLocaleDateString("ru-RU")})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("span",{className:"text-sm text-gray-500",children:"Статус:"}),e.jsxs("span",{className:"text-sm font-medium",children:[s.status==="pending"&&"Ожидает",s.status==="processing"&&"В обработке",s.status==="completed"&&"Выполнен"]})]})]})]}),e.jsxs("div",{children:[e.jsx("h4",{className:"text-sm font-medium text-gray-500 mb-2",children:"Товары"}),e.jsx("div",{className:"bg-gray-50 p-4 rounded-md",children:e.jsxs("table",{className:"min-w-full",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{className:"text-left text-xs font-medium text-gray-500 uppercase",children:"Наименование"}),e.jsx("th",{className:"text-right text-xs font-medium text-gray-500 uppercase",children:"Количество"}),e.jsx("th",{className:"text-right text-xs font-medium text-gray-500 uppercase",children:"Цена"})]})}),e.jsx("tbody",{className:"divide-y divide-gray-200",children:s.items.map((r,i)=>e.jsxs("tr",{children:[e.jsx("td",{className:"py-2 text-sm text-gray-900",children:r.name}),e.jsx("td",{className:"py-2 text-sm text-gray-900 text-right",children:r.quantity}),e.jsxs("td",{className:"py-2 text-sm text-gray-900 text-right",children:[r.price.toLocaleString("ru-RU")," ₽"]})]},i))}),e.jsx("tfoot",{children:e.jsxs("tr",{children:[e.jsx("td",{colSpan:"2",className:"py-2 text-sm font-medium text-gray-900 text-right",children:"Итого:"}),e.jsxs("td",{className:"py-2 text-sm font-medium text-gray-900 text-right",children:[s.total.toLocaleString("ru-RU")," ₽"]})]})})]})})]})]}),e.jsx("div",{className:"mt-6 flex justify-end",children:e.jsx("button",{onClick:c,className:"px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500",children:"Закрыть"})})]})})}function q(){const[s,c]=a.useState(""),[l,r]=a.useState(null),[i,x]=a.useState(!1),[h,p]=a.useState([]),[u,d]=a.useState(!0),[m,o]=a.useState(null);a.useEffect(()=>{g()},[]);const g=async()=>{try{d(!0);const t=await w.getOrders();p(Array.isArray(t)?t:[]),o(null)}catch(t){o("Ошибка при загрузке заказов"),b.error("Не удалось загрузить список заказов"),console.error("Error fetching orders:",t)}finally{d(!1)}},y=t=>{const n={pending:{icon:C,text:"Ожидает",className:"bg-yellow-100 text-yellow-800"},processing:{icon:L,text:"В обработке",className:"bg-blue-100 text-blue-800"},completed:{icon:O,text:"Выполнен",className:"bg-green-100 text-green-800"}}[t],f=n.icon;return e.jsxs("span",{className:`px-2 inline-flex items-center rounded-full ${n.className}`,children:[e.jsx(f,{className:"h-4 w-4 mr-1"}),e.jsx("span",{className:"text-sm",children:n.text})]})},j=h.filter(t=>t.orderNumber.toLowerCase().includes(s.toLowerCase())||t.customer.toLowerCase().includes(s.toLowerCase()));return e.jsxs("div",{className:"space-y-6",children:[e.jsxs("div",{children:[e.jsx("h1",{className:"text-2xl font-bold text-gray-900",children:"Заказы"}),e.jsx("p",{className:"mt-1 text-sm text-gray-500",children:"Управление заказами"})]}),e.jsxs("div",{className:"flex items-center px-4 py-2 bg-white rounded-lg shadow-sm",children:[e.jsx(S,{className:"h-5 w-5 text-gray-400"}),e.jsx("input",{type:"text",placeholder:"Поиск заказов...",className:"ml-2 flex-1 outline-none",value:s,onChange:t=>c(t.target.value)})]}),e.jsx("div",{className:"bg-white shadow-sm rounded-lg overflow-hidden",children:u?e.jsx("div",{className:"text-center py-4",children:"Загрузка..."}):m?e.jsx("div",{className:"text-center py-4 text-red-600",children:m}):e.jsxs("table",{className:"min-w-full divide-y divide-gray-200",children:[e.jsx("thead",{className:"bg-gray-50",children:e.jsxs("tr",{children:[e.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Номер заказа"}),e.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Клиент"}),e.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Дата"}),e.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Сумма"}),e.jsx("th",{className:"px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Статус"}),e.jsx("th",{className:"px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider",children:"Действия"})]})}),e.jsx("tbody",{className:"bg-white divide-y divide-gray-200",children:j.map(t=>e.jsxs("tr",{className:"hover:bg-gray-50",children:[e.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:e.jsx("div",{className:"text-sm font-medium text-gray-900",children:t.orderNumber})}),e.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:e.jsx("div",{className:"text-sm text-gray-900",children:t.customer})}),e.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:e.jsx("div",{className:"text-sm text-gray-500",children:new Date(t.date).toLocaleDateString("ru-RU")})}),e.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:e.jsxs("div",{className:"text-sm text-gray-900",children:[t.total.toLocaleString("ru-RU")," ₽"]})}),e.jsx("td",{className:"px-6 py-4 whitespace-nowrap",children:y(t.status)}),e.jsx("td",{className:"px-6 py-4 whitespace-nowrap text-right text-sm font-medium",children:e.jsx("button",{onClick:()=>{r(t),x(!0)},className:"text-blue-600 hover:text-blue-900",children:e.jsx(k,{className:"h-5 w-5"})})})]},t.id))})]})}),i&&l&&e.jsx(D,{order:l,onClose:()=>{x(!1),r(null)}})]})}export{q as default};
