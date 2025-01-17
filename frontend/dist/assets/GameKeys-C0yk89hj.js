import{r as t,B as i,j as s,q as C,E as q,s as H,t as K}from"./react-vendor-BB4BkCfL.js";import{p as J,i as u}from"./index-DpTN90_E.js";import{B as o,l as v,g as h,a0 as M,y as N,a1 as V,a2 as _,a3 as D,a4 as r,a5 as Q,I as g,a8 as U,a9 as X,aa as Y,z as Z,E as $,J as k,k as ss,t as I,ab as es}from"./mui-vendor-QnVK6N-v.js";import"./vendor-Dh_iZ00o.js";import"./redux-vendor-56JQh752.js";function is(){const[p,S]=t.useState([]),[E,T]=t.useState([]),[P,m]=t.useState(!0),[z,c]=t.useState(!1),[x,f]=t.useState(""),[n,d]=t.useState([{login:"",password:""}]),[b,A]=t.useState({});t.useEffect(()=>{j()},[]);const j=async()=>{try{m(!0);const[e,a]=await Promise.all([J.getGames(),u.getAllKeys()]);S(e||[]),T(a||[])}catch(e){console.error("Error fetching data:",e),i.error("Ошибка при загрузке данных")}finally{m(!1)}},B=()=>{d([...n,{login:"",password:""}])},G=e=>{d(n.filter((a,l)=>l!==e))},y=(e,a,l)=>{const L=n.map((w,O)=>O===e?{...w,[a]:l}:w);d(L)},W=async()=>{try{if(!x){i.error("Выберите игру");return}if(n.some(a=>!a.login||!a.password)){i.error("Заполните все поля для ключей");return}await u.addKeys(x,n),i.success("Ключи успешно добавлены"),c(!1),f(""),d([{login:"",password:""}]),j()}catch(e){console.error("Error adding keys:",e),i.error("Ошибка при добавлении ключей")}},R=async e=>{try{await u.deleteKey(e),i.success("Ключ успешно удален"),j()}catch(a){console.error("Error deleting key:",a),i.error("Ошибка при удалении ключа")}},F=e=>{A(a=>({...a,[e]:!a[e]}))};return P?s.jsx(o,{sx:{p:3,textAlign:"center"},children:s.jsx(v,{children:"Загрузка..."})}):s.jsxs(o,{sx:{p:3},children:[s.jsxs(o,{sx:{mb:3,display:"flex",justifyContent:"space-between",alignItems:"center"},children:[s.jsx(v,{variant:"h5",children:"Управление ключами"}),s.jsx(h,{variant:"contained",startIcon:s.jsx(C,{}),onClick:()=>c(!0),children:"Добавить ключи"})]}),s.jsx(M,{component:N,children:s.jsxs(V,{children:[s.jsx(_,{children:s.jsxs(D,{children:[s.jsx(r,{children:"ID"}),s.jsx(r,{children:"Игра"}),s.jsx(r,{children:"Логин"}),s.jsx(r,{children:"Пароль"}),s.jsx(r,{children:"Статус"}),s.jsx(r,{children:"Действия"})]})}),s.jsx(Q,{children:E.map(e=>{var a;return s.jsxs(D,{children:[s.jsx(r,{children:e.id}),s.jsx(r,{children:((a=p.find(l=>l.id===e.gameId))==null?void 0:a.title)||"Неизвестная игра"}),s.jsx(r,{children:e.login}),s.jsx(r,{children:s.jsxs(o,{sx:{display:"flex",alignItems:"center",gap:1},children:[b[e.id]?e.password:"••••••••",s.jsx(g,{size:"small",onClick:()=>F(e.id),children:b[e.id]?s.jsx(q,{size:16}):s.jsx(H,{size:16})})]})}),s.jsx(r,{children:s.jsx(o,{component:"span",sx:{px:1,py:.5,borderRadius:1,backgroundColor:e.status==="available"?"success.light":"warning.light",color:"white"},children:e.status==="available"?"Доступен":"Зарезервирован"})}),s.jsx(r,{children:s.jsx(g,{color:"error",onClick:()=>R(e.id),disabled:e.status!=="available",children:s.jsx(K,{size:16})})})]},e.id)})})]})}),s.jsxs(U,{open:z,onClose:()=>c(!1),maxWidth:"sm",fullWidth:!0,children:[s.jsx(X,{children:"Добавить ключи"}),s.jsx(Y,{children:s.jsxs(o,{sx:{mt:2},children:[s.jsxs(Z,{fullWidth:!0,sx:{mb:2},children:[s.jsx($,{children:"Игра"}),s.jsx(k,{value:x,onChange:e=>f(e.target.value),label:"Игра",children:p.map(e=>s.jsx(ss,{value:e.id,children:e.title},e.id))})]}),n.map((e,a)=>s.jsxs(o,{sx:{mb:2,display:"flex",gap:1},children:[s.jsx(I,{label:"Логин",value:e.login,onChange:l=>y(a,"login",l.target.value),fullWidth:!0}),s.jsx(I,{label:"Пароль",value:e.password,onChange:l=>y(a,"password",l.target.value),fullWidth:!0}),s.jsx(g,{color:"error",onClick:()=>G(a),disabled:n.length===1,children:s.jsx(K,{size:16})})]},a)),s.jsx(h,{startIcon:s.jsx(C,{}),onClick:B,sx:{mt:1},children:"Добавить еще ключ"})]})}),s.jsxs(es,{children:[s.jsx(h,{onClick:()=>c(!1),children:"Отмена"}),s.jsx(h,{onClick:W,variant:"contained",children:"Сохранить"})]})]})]})}export{is as default};
