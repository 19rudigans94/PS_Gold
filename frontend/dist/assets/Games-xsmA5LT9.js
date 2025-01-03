import{u as w,b as c,r as n,f as A,j as s,e as p,B as r,g as E}from"./index-DwH2koU-.js";import{A as S}from"./AuthCartModal-CeVCXwkB.js";import"./Modal-CChU8ZLg.js";import"./x-BNpd7WcG.js";function I(){const l=w(),{games:d,loading:f,error:m}=c(e=>e.products),{isAuthenticated:h,user:j}=c(e=>e.auth),o=c(e=>e.cart.items),[b,u]=n.useState(!1),[U,v]=n.useState(null);n.useEffect(()=>{l(A()).then(e=>{e.payload&&console.log("Loaded games:",e.payload)})},[l]);const y=e=>typeof e=="number"?e.toLocaleString():"0",N=e=>{console.log("Adding to cart:",e),console.log("Auth status:",{isAuthenticated:h,user:j}),console.log("Auth token:",p.get("authToken")),console.log("Current cart items:",o);const t=!!p.get("authToken");if(!(h&&t)){console.log("User not authenticated, showing auth modal"),v(e),u(!0),r.info("Для добавления товара в корзину необходимо авторизоваться");return}try{const a=o.find(g=>g._id===e._id&&g.type==="game");console.log("Existing item in cart:",a);const x={...e,type:"game",price:e.price||0,quantity:1};console.log("Dispatching addItem with:",x),l(E(x)),a?r.success(`Количество "${e.title}" увеличено`):r.success(`"${e.title}" добавлена в корзину`),console.log("Updated cart items:",o)}catch(a){console.error("Error adding to cart:",a),r.error("Ошибка при добавлении в корзину")}};return f?s.jsxs("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8",children:[s.jsx("h2",{className:"text-2xl font-bold mb-6",children:"Игры"}),s.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",children:[...Array(6)].map((e,t)=>s.jsxs("div",{className:"bg-white rounded-lg shadow-md overflow-hidden animate-pulse",children:[s.jsx("div",{className:"w-full h-48 bg-gray-300"}),s.jsxs("div",{className:"p-4",children:[s.jsx("div",{className:"h-6 bg-gray-300 rounded w-3/4 mb-2"}),s.jsx("div",{className:"h-4 bg-gray-300 rounded w-full mb-2"}),s.jsx("div",{className:"h-4 bg-gray-300 rounded w-2/3 mb-4"}),s.jsxs("div",{className:"flex justify-between items-center",children:[s.jsx("div",{className:"h-6 bg-gray-300 rounded w-1/4"}),s.jsx("div",{className:"h-10 bg-gray-300 rounded w-1/3"})]})]})]},t))})]}):m?s.jsxs("div",{className:"text-center text-red-600 py-8",children:["Ошибка: ",m]}):s.jsxs("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8",children:[s.jsx("h2",{className:"text-2xl font-bold mb-6",children:"Игры"}),s.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",children:Array.isArray(d)&&d.map(e=>{if(!e)return null;const t=e.price||0;return s.jsxs("div",{className:"bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1",children:[s.jsx("div",{className:"relative aspect-w-16 aspect-h-9",children:s.jsx("img",{src:e.imageUrl?`http://localhost:3000/api/${e.imageUrl}`:"/placeholder-image.png",alt:e.title,className:"w-full h-48 object-cover",onError:i=>{i.target.onerror=null,i.target.src="/placeholder-image.png"}})}),s.jsxs("div",{className:"p-4 flex flex-col h-[calc(100%-12rem)]",children:[s.jsx("h3",{className:"text-lg font-semibold mb-2 line-clamp-1",children:e.title}),s.jsx("p",{className:"text-gray-600 mb-4 flex-grow line-clamp-3",children:e.description}),s.jsxs("div",{className:"mt-auto flex justify-between items-center",children:[s.jsxs("span",{className:"text-lg font-bold text-primary",children:[y(t)," ₸"]}),s.jsx("button",{onClick:()=>N(e),className:"btn btn-primary hover:scale-105 transition-transform duration-200",children:"В корзину"})]})]})]},e._id)})}),s.jsx(S,{isOpen:b,onClose:()=>u(!1)})]})}export{I as default};
