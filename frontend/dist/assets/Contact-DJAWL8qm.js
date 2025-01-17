import{j as e,Q as l}from"./index-wzwGaSs2.js";import{r as m}from"./react-vendor-CUI16jnX.js";import"./redux-vendor-D3UFojRl.js";const d=({formData:s,onChange:r,onSubmit:t})=>e.jsxs("form",{onSubmit:t,className:"space-y-4",children:[e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-4",children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"name",className:"block text-sm font-medium text-gray-700 mb-1",children:"Ваше имя"}),e.jsx("input",{type:"text",id:"name",name:"name",value:s.name,onChange:r,required:!0,className:"w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"email",className:"block text-sm font-medium text-gray-700 mb-1",children:"Email"}),e.jsx("input",{type:"email",id:"email",name:"email",value:s.email,onChange:r,required:!0,className:"w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"})]})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"subject",className:"block text-sm font-medium text-gray-700 mb-1",children:"Тема"}),e.jsx("input",{type:"text",id:"subject",name:"subject",value:s.subject,onChange:r,required:!0,className:"w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"message",className:"block text-sm font-medium text-gray-700 mb-1",children:"Сообщение"}),e.jsx("textarea",{id:"message",name:"message",value:s.message,onChange:r,required:!0,rows:"4",className:"w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"})]}),e.jsx("button",{type:"submit",className:"w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors",children:"Отправить сообщение"})]}),c=()=>e.jsxs("div",{className:"grid grid-cols-1 md:grid-cols-2 gap-6 mb-8",children:[e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-semibold mb-2",children:"Наш адрес"}),e.jsxs("p",{className:"text-gray-600",children:["ул. Примерная, д. 123",e.jsx("br",{}),"г. Москва, 123456"]})]}),e.jsxs("div",{children:[e.jsx("h3",{className:"text-lg font-semibold mb-2",children:"Контакты"}),e.jsxs("p",{className:"text-gray-600",children:["Email: support@gamegold.com",e.jsx("br",{}),"Телефон: +7 (999) 123-45-67"]})]})]}),n=()=>{const[s,r]=m.useState({name:"",email:"",subject:"",message:""});return{formData:s,handleChange:a=>{r({...s,[a.target.name]:a.target.value})},handleSubmit:async a=>{a.preventDefault(),l.success("Сообщение отправлено! Мы свяжемся с вами в ближайшее время."),r({name:"",email:"",subject:"",message:""})}}},b=()=>{const{formData:s,handleChange:r,handleSubmit:t}=n();return e.jsxs("div",{className:"max-w-2xl mx-auto px-4 py-8",children:[e.jsx("h1",{className:"text-3xl font-bold mb-8 text-center",children:"Свяжитесь с нами"}),e.jsxs("div",{className:"bg-white rounded-lg shadow-md p-6 mb-8",children:[e.jsx(c,{}),e.jsx(d,{formData:s,onChange:r,onSubmit:t})]})]})};export{b as default};
