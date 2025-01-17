import{j as e}from"./ui-vendor-BekXbpvv.js";import{r as u}from"./react-vendor-CmdBDJ7C.js";import{u as h,b as p}from"./redux-vendor-D-krhjMU.js";import{u as P}from"./index-DbOi_nDC.js";import"./utils-upsvKRUO.js";const j=({formData:a,isEditing:r,onChange:t})=>e.jsxs(e.Fragment,{children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"name",className:"block text-sm font-medium text-gray-700",children:"Имя"}),e.jsx("input",{type:"text",id:"name",name:"name",value:a.name,onChange:t,disabled:!r,className:"mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"email",className:"block text-sm font-medium text-gray-700",children:"Email"}),e.jsx("input",{type:"email",id:"email",name:"email",value:a.email,onChange:t,disabled:!r,className:"mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 disabled:bg-gray-100"})]})]}),w=({id:a,name:r,label:t,value:s,error:n,onChange:d})=>e.jsxs("div",{children:[e.jsx("label",{htmlFor:a,className:"block text-sm font-medium text-gray-700",children:t}),e.jsx("input",{type:"password",id:a,name:r,value:s,onChange:d,className:"mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"}),n&&e.jsx("p",{className:"mt-1 text-sm text-red-600",children:n})]}),g=({formData:a,errors:r,onChange:t})=>e.jsxs("div",{className:"border-t pt-4",children:[e.jsx("h2",{className:"text-lg font-medium mb-4",children:"Изменить пароль"}),e.jsxs("div",{className:"space-y-4",children:[e.jsx(w,{id:"currentPassword",name:"currentPassword",label:"Текущий пароль",value:a.currentPassword,error:r.currentPassword,onChange:t}),e.jsx(w,{id:"newPassword",name:"newPassword",label:"Новый пароль",value:a.newPassword,error:r.newPassword,onChange:t}),e.jsx(w,{id:"confirmNewPassword",name:"confirmNewPassword",label:"Подтвердите новый пароль",value:a.confirmNewPassword,error:r.confirmNewPassword,onChange:t})]})]}),y=({formData:a,errors:r,isLoading:t,isEditing:s,onChange:n,onSubmit:d})=>e.jsxs("form",{onSubmit:d,className:"space-y-6",children:[e.jsx(j,{formData:a,isEditing:s,onChange:n}),s&&e.jsxs(e.Fragment,{children:[e.jsx(g,{formData:a,errors:r,onChange:n}),e.jsx("div",{className:"flex justify-end",children:e.jsx("button",{type:"submit",disabled:t,className:"inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed",children:t?"Сохранение...":"Сохранить изменения"})})]})]}),N=()=>{const a=h(),{user:r,isLoading:t}=p(o=>o.auth),[s,n]=u.useState({name:(r==null?void 0:r.name)||"",email:(r==null?void 0:r.email)||"",currentPassword:"",newPassword:"",confirmNewPassword:""}),[d,i]=u.useState({}),[x,b]=u.useState(!1),f=()=>{const o={};return s.newPassword&&(s.currentPassword||(o.currentPassword="Необходимо ввести текущий пароль"),s.newPassword.length<6&&(o.newPassword="Новый пароль должен содержать минимум 6 символов"),s.newPassword!==s.confirmNewPassword&&(o.confirmNewPassword="Пароли не совпадают")),i(o),Object.keys(o).length===0};return{formData:s,errors:d,isLoading:t,isEditing:x,setIsEditing:b,handleChange:o=>{const{name:l,value:c}=o.target;n(m=>({...m,[l]:c})),d[l]&&i(m=>({...m,[l]:""}))},handleSubmit:async o=>{if(o.preventDefault(),!f())return;const l={name:s.name,email:s.email};s.newPassword&&(l.currentPassword=s.currentPassword,l.newPassword=s.newPassword);try{await a(P(l)).unwrap(),b(!1),n(c=>({...c,currentPassword:"",newPassword:"",confirmNewPassword:""}))}catch{}}}},D=()=>{const{formData:a,errors:r,isLoading:t,isEditing:s,setIsEditing:n,handleChange:d,handleSubmit:i}=N();return e.jsx("div",{className:"max-w-2xl mx-auto px-4 py-8",children:e.jsxs("div",{className:"bg-white rounded-lg shadow-md p-6",children:[e.jsxs("div",{className:"flex justify-between items-center mb-6",children:[e.jsx("h1",{className:"text-2xl font-bold",children:"Профиль"}),e.jsx("button",{onClick:()=>n(!s),className:"text-blue-600 hover:text-blue-700",children:s?"Отменить":"Редактировать"})]}),e.jsx(y,{formData:a,errors:r,isLoading:t,isEditing:s,onChange:d,onSubmit:i})]})})};export{D as default};
