import{S as a,i as e,s,h as t,e as r,q as l,d as n,k as i,c as o,a as c,b as u,f as d,w as p,x as h,y as m,u as f,B as w,_ as v,t as b,j as y,l as P,G as $,I as g,D as q,$ as E,n as I,E as T,p as N,r as S,v as U,z as j}from"./client.04a4a16d.js";import{S as k}from"./Spinner.7b0034d3.js";function x(a){let e,s,l,p,h,m,f,w,v,b,y=a[3]&&C(a);function $(a,e){return a[0]?D:L}let N=$(a),S=N(a);return{c(){e=r("form"),s=r("input"),l=t(),p=r("input"),h=t(),m=r("input"),f=t(),y&&y.c(),w=t(),S.c(),this.h()},l(a){e=o(a,"FORM",{});var t=c(e);s=o(t,"INPUT",{type:!0,required:!0,autocomplete:!0,placeholder:!0}),l=i(t),p=o(t,"INPUT",{type:!0,required:!0,placeholder:!0}),h=i(t),m=o(t,"INPUT",{type:!0,required:!0,placeholder:!0}),f=i(t),y&&y.l(t),w=i(t),S.l(t),t.forEach(n),this.h()},h(){u(s,"type","email"),s.required=!0,u(s,"autocomplete","email"),u(s,"placeholder","Email"),u(p,"type","password"),p.required=!0,u(p,"placeholder","Password"),u(m,"type","password"),m.required=!0,u(m,"placeholder","Confirm Password")},m(t,r){d(t,e,r),P(e,s),g(s,a[1].email),P(e,l),P(e,p),g(p,a[1].password),P(e,h),P(e,m),g(m,a[1].confirm),P(e,f),y&&y.m(e,null),P(e,w),S.m(e,null),v||(b=[q(s,"input",a[6]),q(p,"input",a[7]),q(p,"blur",a[4]),q(m,"input",a[8]),q(m,"blur",a[4]),q(e,"submit",E(a[5]))],v=!0)},p(a,t){2&t&&s.value!==a[1].email&&g(s,a[1].email),2&t&&p.value!==a[1].password&&g(p,a[1].password),2&t&&m.value!==a[1].confirm&&g(m,a[1].confirm),a[3]?y?y.p(a,t):(y=C(a),y.c(),y.m(e,w)):y&&(y.d(1),y=null),N===(N=$(a))&&S?S.p(a,t):(S.d(1),S=N(a),S&&(S.c(),S.m(e,null)))},i:I,o:I,d(a){a&&n(e),y&&y.d(),S.d(),v=!1,T(b)}}}function A(a){let e,s;return e=new k({}),{c(){N(e.$$.fragment)},l(a){S(e.$$.fragment,a)},m(a,t){U(e,a,t),s=!0},p:I,i(a){s||(m(e.$$.fragment,a),s=!0)},o(a){p(e.$$.fragment,a),s=!1},d(a){j(e,a)}}}function C(a){let e,s;return{c(){e=r("div"),s=b(a[3]),this.h()},l(t){e=o(t,"DIV",{class:!0});var r=c(e);s=y(r,a[3]),r.forEach(n),this.h()},h(){u(e,"class","error")},m(a,t){d(a,e,t),P(e,s)},p(a,e){8&e&&$(s,a[3])},d(a){a&&n(e)}}}function D(a){let e,s,l,p,h;return{c(){e=r("h3"),s=b(a[0]),l=t(),p=r("a"),h=b("Proceed To Login"),this.h()},l(t){e=o(t,"H3",{});var r=c(e);s=y(r,a[0]),r.forEach(n),l=i(t),p=o(t,"A",{href:!0,class:!0});var u=c(p);h=y(u,"Proceed To Login"),u.forEach(n),this.h()},h(){u(p,"href","/login"),u(p,"class","link-btn")},m(a,t){d(a,e,t),P(e,s),d(a,l,t),d(a,p,t),P(p,h)},p(a,e){1&e&&$(s,a[0])},d(a){a&&n(e),a&&n(l),a&&n(p)}}}function L(a){let e;return{c(){e=r("input"),this.h()},l(a){e=o(a,"INPUT",{type:!0,class:!0,value:!0,disabled:!0}),this.h()},h(){u(e,"type","submit"),u(e,"class","link-btn"),e.value="Creat Account",e.disabled=a[3]},m(a,s){d(a,e,s)},p(a,s){8&s&&(e.disabled=a[3])},d(a){a&&n(e)}}}function O(a){let e,s,f,v,b;const y=[A,x],P=[];function $(a,e){return a[2]?0:1}return f=$(a),v=P[f]=y[f](a),{c(){e=t(),s=r("div"),v.c(),this.h()},l(a){l('[data-svelte="svelte-1q4b2lt"]',document.head).forEach(n),e=i(a),s=o(a,"DIV",{class:!0});var t=c(s);v.l(t),t.forEach(n),this.h()},h(){document.title="Apocalyptia Online - Signup",u(s,"class","cntr-card")},m(a,t){d(a,e,t),d(a,s,t),P[f].m(s,null),b=!0},p(a,[e]){let t=f;f=$(a),f===t?P[f].p(a,e):(w(),p(P[t],1,1,(()=>{P[t]=null})),h(),v=P[f],v||(v=P[f]=y[f](a),v.c()),m(v,1),v.m(s,null))},i(a){b||(m(v),b=!0)},o(a){p(v),b=!1},d(a){a&&n(e),a&&n(s),P[f].d()}}}function V(a,e,s){f&&(window.location.href="www.apocalyptiaonline.com");let t="";const r={email:"",password:"",confirm:""};let l=!1,n="";return[t,r,l,n,()=>{r.password&&r.confirm&&r.password!=r.confirm&&s(3,n="Password does not match!")},()=>{r.email&&r.password==r.confirm&&(s(2,l=!0),v().then((a=>s(0,t="Confirmation email sent. Please confirm your account."))).catch((a=>{s(2,l=!1),alert(a)})))},function(){r.email=this.value,s(1,r)},function(){r.password=this.value,s(1,r)},function(){r.confirm=this.value,s(1,r)}]}export default class extends a{constructor(a){super(),e(this,a,V,O,s,{})}}