import{ar as O,as as u,Q as i,j as s,B as o,T as C,i as h,P as H,I as m,M as N}from"./index-wzwGaSs2.js";import{r as l}from"./react-vendor-CUI16jnX.js";import{P as K,E as Q,a as V,T as v}from"./ui-vendor-Bkdsgf4t.js";import{T as _,a as q,b as J,c as T,d as r,e as U,D as X,f as Y,g as Z}from"./TableRow-CvzK8VQr.js";import{D as $}from"./DialogTitle-B3YQUZg3.js";import{F as k,I as ss,S as es,T as D}from"./TextField-NdKXI3fy.js";import"./redux-vendor-D3UFojRl.js";function cs(){const[g,I]=l.useState([]),[S,P]=l.useState([]),[E,p]=l.useState(!0),[A,c]=l.useState(!1),[x,f]=l.useState(""),[t,d]=l.useState([{login:"",password:""}]),[b,B]=l.useState({});l.useEffect(()=>{j()},[]);const j=async()=>{try{p(!0);const[e,a]=await Promise.all([O.getGames(),u.getAllKeys()]);I(e||[]),P(a||[])}catch(e){console.error("Error fetching data:",e),i.error("Ошибка при загрузке данных")}finally{p(!1)}},G=()=>{d([...t,{login:"",password:""}])},z=e=>{d(t.filter((a,n)=>n!==e))},y=(e,a,n)=>{const L=t.map((w,M)=>M===e?{...w,[a]:n}:w);d(L)},W=async()=>{try{if(!x){i.error("Выберите игру");return}if(t.some(a=>!a.login||!a.password)){i.error("Заполните все поля для ключей");return}await u.addKeys(x,t),i.success("Ключи успешно добавлены"),c(!1),f(""),d([{login:"",password:""}]),j()}catch(e){console.error("Error adding keys:",e),i.error("Ошибка при добавлении ключей")}},R=async e=>{try{await u.deleteKey(e),i.success("Ключ успешно удален"),j()}catch(a){console.error("Error deleting key:",a),i.error("Ошибка при удалении ключа")}},F=e=>{B(a=>({...a,[e]:!a[e]}))};return E?s.jsx(o,{sx:{p:3,textAlign:"center"},children:s.jsx(C,{children:"Загрузка..."})}):s.jsxs(o,{sx:{p:3},children:[s.jsxs(o,{sx:{mb:3,display:"flex",justifyContent:"space-between",alignItems:"center"},children:[s.jsx(C,{variant:"h5",children:"Управление ключами"}),s.jsx(h,{variant:"contained",startIcon:s.jsx(K,{}),onClick:()=>c(!0),children:"Добавить ключи"})]}),s.jsx(_,{component:H,children:s.jsxs(q,{children:[s.jsx(J,{children:s.jsxs(T,{children:[s.jsx(r,{children:"ID"}),s.jsx(r,{children:"Игра"}),s.jsx(r,{children:"Логин"}),s.jsx(r,{children:"Пароль"}),s.jsx(r,{children:"Статус"}),s.jsx(r,{children:"Действия"})]})}),s.jsx(U,{children:S.map(e=>s.jsxs(T,{children:[s.jsx(r,{children:e.id}),s.jsx(r,{children:g.find(a=>a.id===e.gameId)?.title||"Неизвестная игра"}),s.jsx(r,{children:e.login}),s.jsx(r,{children:s.jsxs(o,{sx:{display:"flex",alignItems:"center",gap:1},children:[b[e.id]?e.password:"••••••••",s.jsx(m,{size:"small",onClick:()=>F(e.id),children:b[e.id]?s.jsx(Q,{size:16}):s.jsx(V,{size:16})})]})}),s.jsx(r,{children:s.jsx(o,{component:"span",sx:{px:1,py:.5,borderRadius:1,backgroundColor:e.status==="available"?"success.light":"warning.light",color:"white"},children:e.status==="available"?"Доступен":"Зарезервирован"})}),s.jsx(r,{children:s.jsx(m,{color:"error",onClick:()=>R(e.id),disabled:e.status!=="available",children:s.jsx(v,{size:16})})})]},e.id))})]})}),s.jsxs(X,{open:A,onClose:()=>c(!1),maxWidth:"sm",fullWidth:!0,children:[s.jsx($,{children:"Добавить ключи"}),s.jsx(Y,{children:s.jsxs(o,{sx:{mt:2},children:[s.jsxs(k,{fullWidth:!0,sx:{mb:2},children:[s.jsx(ss,{children:"Игра"}),s.jsx(es,{value:x,onChange:e=>f(e.target.value),label:"Игра",children:g.map(e=>s.jsx(N,{value:e.id,children:e.title},e.id))})]}),t.map((e,a)=>s.jsxs(o,{sx:{mb:2,display:"flex",gap:1},children:[s.jsx(D,{label:"Логин",value:e.login,onChange:n=>y(a,"login",n.target.value),fullWidth:!0}),s.jsx(D,{label:"Пароль",value:e.password,onChange:n=>y(a,"password",n.target.value),fullWidth:!0}),s.jsx(m,{color:"error",onClick:()=>z(a),disabled:t.length===1,children:s.jsx(v,{size:16})})]},a)),s.jsx(h,{startIcon:s.jsx(K,{}),onClick:G,sx:{mt:1},children:"Добавить еще ключ"})]})}),s.jsxs(Z,{children:[s.jsx(h,{onClick:()=>c(!1),children:"Отмена"}),s.jsx(h,{onClick:W,variant:"contained",children:"Сохранить"})]})]})]})}export{cs as default};
