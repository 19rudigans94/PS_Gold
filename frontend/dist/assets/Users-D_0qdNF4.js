import{c as Q,j as e,B as $,M as g,P as Y,Z as I,I as L,$ as Z,i as B,Y as y,Q as C,L as _,k as z,T as J}from"./index-wzwGaSs2.js";import{R as T,r as m}from"./react-vendor-CUI16jnX.js";import{G as p}from"./Grid-BWmcepYI.js";import{T as E,F as w,I as P,S as R}from"./TextField-NdKXI3fy.js";import{T as K,a as N,b as X,c as A,d as o,e as ee,D as se,f as ae,g as te}from"./TableRow-CvzK8VQr.js";import{C as O}from"./Chip-5IJ5bNYJ.js";import{E as re}from"./Edit-Dd5VPgBn.js";import{D as ne}from"./DialogTitle-B3YQUZg3.js";import{P as le}from"./Pagination-C8I8sWM9.js";import"./redux-vendor-D3UFojRl.js";import"./LastPage-CecZoR59.js";const oe=Q(e.jsx("path",{d:"M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2m0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2m0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2"}),"MoreVert"),ie=({searchTerm:s,selectedRole:l,onSearch:t,onRoleChange:i})=>e.jsx($,{sx:{mb:3},children:e.jsxs(p,{container:!0,spacing:2,children:[e.jsx(p,{item:!0,xs:12,sm:8,children:e.jsx(E,{fullWidth:!0,label:"Поиск",value:s,onChange:a=>t(a.target.value),placeholder:"Поиск по имени, email..."})}),e.jsx(p,{item:!0,xs:12,sm:4,children:e.jsxs(w,{fullWidth:!0,children:[e.jsx(P,{children:"Роль"}),e.jsxs(R,{value:l,onChange:a=>i(a.target.value),label:"Роль",children:[e.jsx(g,{value:"all",children:"Все"}),e.jsx(g,{value:"user",children:"Пользователь"}),e.jsx(g,{value:"admin",children:"Администратор"})]})]})})]})}),ce=({user:s,onStatusChange:l,onRoleChange:t,onEdit:i})=>{const[a,x]=T.useState(null),c=h=>{x(h.currentTarget)},d=()=>{x(null)},j=h=>{l(s.id,h),d()},f=h=>{t(s.id,h),d()};return e.jsxs(A,{children:[e.jsx(o,{children:s.name}),e.jsx(o,{children:s.email}),e.jsx(o,{children:e.jsx(O,{label:s.role==="admin"?"Администратор":"Пользователь",color:s.role==="admin"?"primary":"default"})}),e.jsx(o,{children:e.jsx(O,{label:s.status==="active"?"Активен":"Заблокирован",color:s.status==="active"?"success":"error"})}),e.jsx(o,{children:new Date(s.registeredAt).toLocaleDateString("ru")}),e.jsx(o,{children:new Date(s.lastLogin).toLocaleDateString("ru")}),e.jsxs(o,{children:[e.jsx(I,{title:"Редактировать",children:e.jsx(L,{onClick:()=>i(s),children:e.jsx(re,{})})}),e.jsx(I,{title:"Действия",children:e.jsx(L,{onClick:c,children:e.jsx(oe,{})})}),e.jsxs(Z,{anchorEl:a,open:!!a,onClose:d,children:[e.jsx(g,{onClick:()=>j(s.status==="active"?"blocked":"active"),children:s.status==="active"?"Заблокировать":"Разблокировать"}),e.jsx(g,{onClick:()=>f(s.role==="admin"?"user":"admin"),children:s.role==="admin"?"Сделать пользователем":"Сделать администратором"})]})]})]})},de=({users:s,onStatusChange:l,onRoleChange:t,onEdit:i})=>e.jsx(K,{component:Y,children:e.jsxs(N,{children:[e.jsx(X,{children:e.jsxs(A,{children:[e.jsx(o,{children:"Имя"}),e.jsx(o,{children:"Email"}),e.jsx(o,{children:"Роль"}),e.jsx(o,{children:"Статус"}),e.jsx(o,{children:"Дата регистрации"}),e.jsx(o,{children:"Последний вход"}),e.jsx(o,{children:"Действия"})]})}),e.jsx(ee,{children:s.map(a=>e.jsx(ce,{user:a,onStatusChange:l,onRoleChange:t,onEdit:i},a.id))})]})}),he=({open:s,onClose:l,user:t,onSubmit:i})=>{const[a,x]=T.useState({name:"",email:"",role:"user",status:"active"});T.useEffect(()=>{t&&x({name:t.name,email:t.email,role:t.role,status:t.status})},[t]);const c=j=>{const{name:f,value:h}=j.target;x(u=>({...u,[f]:h}))},d=j=>{j.preventDefault(),i(a)};return e.jsxs(se,{open:s,onClose:l,maxWidth:"sm",fullWidth:!0,children:[e.jsx(ne,{children:t?"Редактировать пользователя":"Добавить пользователя"}),e.jsxs("form",{onSubmit:d,children:[e.jsx(ae,{children:e.jsxs(p,{container:!0,spacing:2,children:[e.jsx(p,{item:!0,xs:12,children:e.jsx(E,{fullWidth:!0,label:"Имя",name:"name",value:a.name,onChange:c,required:!0})}),e.jsx(p,{item:!0,xs:12,children:e.jsx(E,{fullWidth:!0,label:"Email",name:"email",type:"email",value:a.email,onChange:c,required:!0})}),e.jsx(p,{item:!0,xs:12,sm:6,children:e.jsxs(w,{fullWidth:!0,children:[e.jsx(P,{children:"Роль"}),e.jsxs(R,{name:"role",value:a.role,onChange:c,label:"Роль",children:[e.jsx(g,{value:"user",children:"Пользователь"}),e.jsx(g,{value:"admin",children:"Администратор"})]})]})}),e.jsx(p,{item:!0,xs:12,sm:6,children:e.jsxs(w,{fullWidth:!0,children:[e.jsx(P,{children:"Статус"}),e.jsxs(R,{name:"status",value:a.status,onChange:c,label:"Статус",children:[e.jsx(g,{value:"active",children:"Активен"}),e.jsx(g,{value:"blocked",children:"Заблокирован"})]})]})})]})}),e.jsxs(te,{children:[e.jsx(B,{onClick:l,children:"Отмена"}),e.jsx(B,{type:"submit",variant:"contained",color:"primary",children:t?"Сохранить":"Добавить"})]})]})]})},ue=({currentPage:s,totalPages:l,onPageChange:t})=>e.jsx($,{sx:{display:"flex",justifyContent:"center",mt:3},children:e.jsx(le,{count:l,page:s,onChange:(i,a)=>t(a),color:"primary"})}),me=()=>{const[s,l]=m.useState([]),[t,i]=m.useState(""),[a,x]=m.useState(""),[c,d]=m.useState(1),[j,f]=m.useState(1),[h,u]=m.useState(!0),[S,v]=m.useState(null),[D,M]=m.useState(!1),[F,W]=m.useState(null),b=async()=>{try{u(!0),v(null);const n=new URLSearchParams({page:c,limit:10});a&&n.append("role",a),t&&n.append("search",t);const r=await y.get(`/users?${n}`);if(!r.data.success)throw new Error(r.data.message||"Failed to fetch users");l(r.data.data),f(Math.ceil(r.data.total/10))}catch(n){const r=n.response?.data?.message||n.message||"Ошибка при загрузке пользователей";v(r),C.error(r),console.error("Error fetching users:",n)}finally{u(!1)}};m.useEffect(()=>{b()},[c,a,t]);const q=n=>{i(n),d(1)},G=n=>{x(n==="all"?"":n),d(1)},V=n=>{d(n)},H=(n=null)=>{W(n),M(!0)},k=()=>{W(null),M(!1)};return{users:s,loading:h,error:S,searchTerm:t,selectedRole:a,currentPage:c,totalPages:j,openDialog:D,selectedUser:F,handleSearch:q,handleRoleChange:G,handlePageChange:V,handleOpenDialog:H,handleCloseDialog:k,handleUpdateUser:async n=>{try{u(!0);const r=await y.put(`/users/${F.id}`,n);if(!r.data.success)throw new Error(r.data.message||"Failed to update user");C.success("Пользователь успешно обновлен"),k(),b()}catch(r){const U=r.response?.data?.message||r.message||"Ошибка при обновлении пользователя";C.error(U),console.error("Error updating user:",r)}finally{u(!1)}},handleDeleteUser:async n=>{if(window.confirm("Вы уверены, что хотите удалить этого пользователя?"))try{u(!0);const r=await y.delete(`/users/${n}`);if(!r.data.success)throw new Error(r.data.message||"Failed to delete user");C.success("Пользователь успешно удален"),b()}catch(r){const U=r.response?.data?.message||r.message||"Ошибка при удалении пользователя";C.error(U),console.error("Error deleting user:",r)}finally{u(!1)}},refresh:b}},Ee=()=>{const{users:s,loading:l,searchTerm:t,selectedRole:i,currentPage:a,totalPages:x,openDialog:c,selectedUser:d,handleSearch:j,handleRoleChange:f,handlePageChange:h,handleOpenDialog:u,handleCloseDialog:S,updateUserStatus:v,updateUserRole:D}=me();return l?e.jsx(_,{}):e.jsxs(z,{maxWidth:"lg",sx:{mt:4,mb:4},children:[e.jsx(J,{variant:"h4",component:"h1",sx:{mb:4},children:"Управление пользователями"}),e.jsx(ie,{searchTerm:t,selectedRole:i,onSearch:j,onRoleChange:f}),e.jsx(de,{users:s,onStatusChange:v,onRoleChange:D,onEdit:u}),e.jsx(ue,{currentPage:a,totalPages:x,onPageChange:h}),e.jsx(he,{open:c,onClose:S,user:d,onSubmit:S})]})};export{Ee as default};
