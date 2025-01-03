import{u as S,b as m,r as o,h as _,j as s,B as i,e as v,g as U}from"./index-DwH2koU-.js";import{A as P}from"./AuthCartModal-CeVCXwkB.js";import"./Modal-CChU8ZLg.js";import"./x-BNpd7WcG.js";function M(){const d=S(),{consoles:u,loading:N,error:h}=m(e=>e.products),{isAuthenticated:g,user:w}=m(e=>e.auth),c=m(e=>e.cart.items),[n,x]=o.useState({}),[A,p]=o.useState(!1),[b,C]=o.useState(null);o.useEffect(()=>{d(_())},[d]);const D=(e,a)=>{const r=parseInt(a)||1;if(!(r<1)){if(r>30){i.warning("Максимальный срок аренды - 30 дней"),x({...n,[e]:30});return}x({...n,[e]:r})}},j=e=>typeof e=="number"?e.toLocaleString():"0",f=e=>{console.log("Adding to cart:",e),console.log("Auth status:",{isAuthenticated:g,user:w}),console.log("Auth token:",v.get("authToken")),console.log("Current cart items:",c);const a=!!v.get("authToken");if(!(g&&a)){console.log("User not authenticated, showing auth modal"),C(e),p(!0),i.info("Для добавления товара в корзину необходимо авторизоваться");return}try{const l=n[e._id]||1,t={...e,type:"console",rentalDays:l,quantity:1,price:e.pricePerDay||0,title:e.title},k=c.find(y=>y._id===e._id&&y.type==="console");console.log("Dispatching addItem with:",t),d(U(t)),k?i.success(`Количество "${t.title}" увеличено`):i.success(`"${t.title}" добавлена в корзину`),console.log("Updated cart items:",c)}catch(l){console.error("Ошибка при добавлении в корзину:",l),i.error("Ошибка при добавлении в корзину")}};return N?s.jsxs("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8",children:[s.jsx("h2",{className:"text-2xl font-bold mb-6",children:"Игровые консоли"}),s.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",children:[...Array(6)].map((e,a)=>s.jsxs("div",{className:"bg-white rounded-lg shadow-md overflow-hidden animate-pulse",children:[s.jsx("div",{className:"w-full h-48 bg-gray-300"}),s.jsxs("div",{className:"p-4",children:[s.jsx("div",{className:"h-6 bg-gray-300 rounded w-3/4 mb-2"}),s.jsx("div",{className:"h-4 bg-gray-300 rounded w-full mb-2"}),s.jsx("div",{className:"h-4 bg-gray-300 rounded w-2/3 mb-4"}),s.jsx("div",{className:"h-10 bg-gray-300 rounded w-full mb-4"}),s.jsxs("div",{className:"flex justify-between items-center",children:[s.jsxs("div",{children:[s.jsx("div",{className:"h-4 bg-gray-300 rounded w-20 mb-1"}),s.jsx("div",{className:"h-6 bg-gray-300 rounded w-24 mb-1"}),s.jsx("div",{className:"h-4 bg-gray-300 rounded w-32 mb-1"}),s.jsx("div",{className:"h-6 bg-gray-300 rounded w-28"})]}),s.jsx("div",{className:"h-10 bg-gray-300 rounded w-24"})]})]})]},a))})]}):h?s.jsxs("div",{className:"text-center text-red-600 py-8",children:["Ошибка: ",h]}):s.jsxs("div",{className:"max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8",children:[s.jsx("h2",{className:"text-2xl font-bold mb-6",children:"Игровые консоли"}),s.jsx("div",{className:"grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6",children:Array.isArray(u)&&u.map(e=>{if(!e)return null;const a=n[e._id]||1,r=e.pricePerDay||0,l=r*a;return s.jsxs("div",{className:"bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1",children:[s.jsxs("div",{className:"relative group",children:[s.jsx("img",{src:e.imageUrl?`${"http://localhost:3000/api".replace("/api","")}/api/uploads/${e.imageUrl}`:"/placeholder-image.png",alt:e.title,className:"w-full h-48 object-cover rounded-t-lg",onError:t=>{console.error("Ошибка загрузки изображения:",t.target.src),t.target.onerror=null,t.target.src="/placeholder-image.png"}}),s.jsx("div",{className:"absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-300"})]}),s.jsxs("div",{className:"p-4 flex flex-col h-[calc(100%-12rem)]",children:[s.jsx("h3",{className:"text-lg font-semibold mb-2 line-clamp-1",children:e.title}),s.jsx("p",{className:"text-gray-600 mb-4 flex-grow line-clamp-3",children:e.description}),s.jsxs("div",{className:"mt-auto",children:[s.jsxs("div",{className:"mb-4",children:[s.jsx("label",{className:"block text-sm font-medium text-gray-700 mb-1",children:"Срок аренды (дней):"}),s.jsx("input",{type:"number",min:"1",max:"30",value:a,onChange:t=>D(e._id,t.target.value),className:"block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"})]}),s.jsxs("div",{className:"flex justify-between items-end",children:[s.jsxs("div",{children:[s.jsx("p",{className:"text-sm text-gray-600",children:"Цена за день:"}),s.jsxs("p",{className:"text-lg font-bold text-primary",children:[j(r)," ₸"]}),a>1&&s.jsxs(s.Fragment,{children:[s.jsxs("p",{className:"text-sm text-gray-600 mt-1",children:["Итого за ",a," ",a===1?"день":"дней",":"]}),s.jsxs("p",{className:"text-lg font-bold text-blue-600",children:[j(l)," ₸"]})]})]}),s.jsx("button",{onClick:()=>f(e),className:"btn btn-primary hover:scale-105 transition-transform duration-200",children:"В корзину"})]})]})]})]},e._id)})}),s.jsx(P,{isOpen:A,onClose:()=>p(!1),onGuestSubmit:e=>{console.log("Guest data:",e),b&&f(b)}})]})}export{M as default};
