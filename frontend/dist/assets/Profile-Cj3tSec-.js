import{j as e,p as h}from"./index-wzwGaSs2.js";import{r as u}from"./react-vendor-CUI16jnX.js";import{u as p,b as P}from"./redux-vendor-D3UFojRl.js";const j=({formData:r,isEditing:a,onChange:t})=>e.jsxs(e.Fragment,{children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"name",className:"block text-sm font-medium text-gray-700",children:"Имя"}),e.jsx("input",{type:"text",id:"name",name:"name",value:r.name,onChange:t,disabled:!a,className:"mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"email",className:"block text-sm font-medium text-gray-700",children:"Email"}),e.jsx("input",{type:"email",id:"email",name:"email",value:r.email,onChange:t,disabled:!a,className:"mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"})]})]}),w=({id:r,name:a,label:t,value:s,error:o,onChange:d})=>e.jsxs("div",{children:[e.jsx("label",{htmlFor:r,className:"block text-sm font-medium text-gray-700",children:t}),e.jsx("input",{type:"password",id:r,name:a,value:s,onChange:d,className:"mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"}),o&&e.jsx("p",{className:"mt-1 text-sm text-red-600",children:o})]}),g=({formData:r,errors:a,onChange:t})=>e.jsxs("div",{className:"border-t pt-4",children:[e.jsx("h2",{className:"text-lg font-medium mb-4",children:"Изменить пароль"}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(w,{id:"currentPassword",name:"currentPassword",label:"Текущий пароль",value:r.currentPassword,error:a.currentPassword,onChange:t}),e.jsx(w,{id:"newPassword",name:"newPassword",label:"Новый пароль",value:r.newPassword,error:a.newPassword,onChange:t}),e.jsx(w,{id:"confirmNewPassword",name:"confirmNewPassword",label:"Подтвердите новый пароль",value:r.confirmNewPassword,error:a.confirmNewPassword,onChange:t})]})]}),y=({formData:r,errors:a,isLoading:t,isEditing:s,onChange:o,onSubmit:d})=>e.jsxs("form",{onSubmit:d,className:"space-y-6",children:[e.jsx(j,{formData:r,isEditing:s,onChange:o}),s&&e.jsxs(e.Fragment,{children:[e.jsx(g,{formData:r,errors:a,onChange:o}),e.jsx("div",{className:"flex justify-end",children:e.jsx("button",{type:"submit",disabled:t,className:"inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed",children:t?"Сохранение...":"Сохранить изменения"})})]})]}),N=()=>{const r=p(),{user:a,isLoading:t}=P(n=>n.auth),[s,o]=u.useState({name:a?.name||"",email:a?.email||"",currentPassword:"",newPassword:"",confirmNewPassword:""}),[d,i]=u.useState({}),[x,b]=u.useState(!1),f=()=>{const n={};return s.newPassword&&(s.currentPassword||(n.currentPassword="Необходимо ввести текущий пароль"),s.newPassword.length<6&&(n.newPassword="Новый пароль должен содержать минимум 6 символов"),s.newPassword!==s.confirmNewPassword&&(n.confirmNewPassword="Пароли не совпадают")),i(n),Object.keys(n).length===0};return{formData:s,errors:d,isLoading:t,isEditing:x,setIsEditing:b,handleChange:n=>{const{name:l,value:c}=n.target;o(m=>({...m,[l]:c})),d[l]&&i(m=>({...m,[l]:""}))},handleSubmit:async n=>{if(n.preventDefault(),!f())return;const l={name:s.name,email:s.email};s.newPassword&&(l.currentPassword=s.currentPassword,l.newPassword=s.newPassword);try{await r(h(l)).unwrap(),b(!1),o(c=>({...c,currentPassword:"",newPassword:"",confirmNewPassword:""}))}catch{}}}},I=()=>{const{formData:r,errors:a,isLoading:t,isEditing:s,setIsEditing:o,handleChange:d,handleSubmit:i}=N();return e.jsx("div",{className:"max-w-2xl mx-auto px-4 py-8",children:e.jsxs("div",{className:"bg-white rounded-lg shadow-md p-6",children:[e.jsxs("div",{className:"flex justify-between items-center mb-6",children:[e.jsx("h1",{className:"text-2xl font-bold",children:"Профиль"}),e.jsx("button",{onClick:()=>o(!s),className:"text-blue-600 hover:text-blue-700",children:s?"Отменить":"Редактировать"})]}),e.jsx(y,{formData:r,errors:a,isLoading:t,isEditing:s,onChange:d,onSubmit:i})]})})};export{I as default};
