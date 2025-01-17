import{j as e,R as u,S as b,Q as d,U as g}from"./index-Bm_OlzcE.js";import{L as x,u as p}from"./react-vendor-CUI16jnX.js";import{u as j,b as h}from"./redux-vendor-D3UFojRl.js";const C=({item:t,onQuantityChange:a,onRemove:s})=>e.jsxs("div",{className:"flex items-center py-4 border-b last:border-b-0",children:[e.jsx("img",{src:t.imageUrl,alt:t.title,className:"w-24 h-24 object-cover rounded-lg"}),e.jsxs("div",{className:"flex-grow ml-6",children:[e.jsx("h3",{className:"text-lg font-semibold",children:t.title}),e.jsxs("p",{className:"text-gray-600",children:[t.price," ₽"]})]}),e.jsxs("div",{className:"flex items-center",children:[e.jsx("input",{type:"number",min:"1",value:t.quantity,onChange:r=>a(t.id,r.target.value),className:"w-16 px-2 py-1 border rounded-lg mr-4 text-center"}),e.jsx("button",{onClick:()=>s(t.id),className:"text-red-500 hover:text-red-700",children:"Удалить"})]})]}),y=({total:t,onClearCart:a,onCheckout:s})=>e.jsxs("div",{className:"bg-white rounded-lg shadow-md p-6",children:[e.jsxs("div",{className:"flex justify-between items-center mb-6",children:[e.jsx("span",{className:"text-lg font-semibold",children:"Итого:"}),e.jsxs("span",{className:"text-2xl font-bold",children:[t," ₽"]})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("button",{onClick:a,className:"px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors",children:"Очистить корзину"}),e.jsx("button",{onClick:s,className:"px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors",children:"Оформить заказ"})]})]}),v=()=>e.jsxs("div",{className:"text-center py-8",children:[e.jsx("p",{className:"text-gray-500 mb-4",children:"Ваша корзина пуста"}),e.jsx(x,{to:"/games",className:"inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors",children:"Перейти к играм"})]}),N=()=>e.jsxs("div",{className:"container mx-auto px-4 py-8 text-center",children:[e.jsx("h2",{className:"text-2xl font-bold mb-4",children:"Для доступа к корзине необходимо войти"}),e.jsx(x,{to:"/login",className:"inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors",children:"Войти"})]}),f=()=>{const t=j(),a=p(),{items:s,total:r}=h(n=>n.cart),{isAuthenticated:l}=h(n=>n.auth);return{items:s,total:r,isAuthenticated:l,handleQuantityChange:(n,m)=>{t(u({id:n,quantity:parseInt(m)}))},handleRemoveItem:n=>{t(b(n)),d.success("Игра удалена из корзины")},handleCheckout:()=>{if(s.length===0){d.error("Корзина пуста");return}a("/checkout")},handleClearCart:()=>{t(g())}}},I=()=>{const{items:t,total:a,isAuthenticated:s,handleQuantityChange:r,handleRemoveItem:l,handleCheckout:c,handleClearCart:i}=f();return s?t.length===0?e.jsx(v,{}):e.jsxs("div",{className:"container mx-auto px-4 py-8",children:[e.jsx("h1",{className:"text-3xl font-bold mb-8",children:"Корзина"}),e.jsx("div",{className:"bg-white rounded-lg shadow-md p-6 mb-6",children:t.map(o=>e.jsx(C,{item:o,onQuantityChange:r,onRemove:l},o.id))}),e.jsx(y,{total:a,onClearCart:i,onCheckout:c})]}):e.jsx(N,{})};export{I as default};
