(this["webpackJsonpwindows-7-calculator"]=this["webpackJsonpwindows-7-calculator"]||[]).push([[0],{57:function(e,t,n){},58:function(e,t,n){},68:function(e,t){},69:function(e,t,n){"use strict";n.r(t);var c=n(16),i=n.n(c),s=n(37),a=n.n(s),l=(n(57),n(13)),o=n(19),r=(n(58),n(9));function u(e){var t=e.upperVal,n=e.lowerVal;return Object(r.jsxs)("div",{children:[Object(r.jsx)("div",{className:"outer-div expression",children:Object(r.jsx)("label",{id:"expression",className:"inner-div small-text","data-testid":"expression",children:t})}),Object(r.jsx)("div",{className:"outer-div",children:Object(r.jsx)("label",{id:"lowerVal",className:"inner-div large-text","data-testid":"lowerVal",children:n})})]})}function j(e){var t=e.className,n=e.id,c=e.name,i=e.onClick;return Object(r.jsx)("button",{className:t||"",id:n||c,name:c,onClick:i,children:c})}var b=n(2),m=n(71);function d(){var e=Object(c.useState)([]),t=Object(o.a)(e,2),n=t[0],i=t[1],s=Object(c.useState)("0"),a=Object(o.a)(s,2),d=a[0],O=a[1],f=Object(c.useState)("0"),x=Object(o.a)(f,2),v=x[0],h=x[1],k=Object(c.useState)(""),g=Object(o.a)(k,2),p=g[0],C=g[1],N=Object(c.useState)(Array(5).fill([" "," "])),y=Object(o.a)(N,2),E=y[0],w=y[1],S=Object(c.useState)(null),M=Object(o.a)(S,2),B=M[0],q=M[1],R=Object(c.useState)(!1),I=Object(o.a)(R,2),V=I[0],D=I[1],A=Object(c.useState)(null),P=Object(o.a)(A,2),z=P[0],F=P[1],J=Object(c.useState)(0),K=Object(o.a)(J,2),L=K[0],T=K[1],U=new RegExp("\\+|-|\\*|\\/"),_="https://github.com/Poplica/react-calculator/blob/master/README.md";Object(c.useEffect)((function(){["Infinity","NaN"].includes(d)?C("Cannot divide by zero"):d.includes("i")&&C("Cannot sqrt negative"),d.length>12&&(document.getElementById("lowerVal").style.fontSize="16px")}),[d]),Object(c.useEffect)((function(){p&&O("")}),[p]);var G=function(){i([]),O("0"),F(null),C(""),D(!1)},H=function(e){var t=e.target;if(!p){var n=t.name;["=","MR","MS","hist","sqrtinv","percent"].includes(z)||U.test(z)?(V&&i([]),O(n)):O((function(e){return"0"===e?n:e+n})),D(!1),F(n)}},Q=function(e){var t=e.target;if(!p){var c=t.name,s=n,a=d;if(U.test(z))s=[].concat(Object(l.a)(n.slice(0,-1)),[c]);else if([".","CE","toggleSign","MR","hist","paste","sqrtinv","percent"].includes(z))"."===d.slice(-1)[0]&&(a=d.slice(0,-1)),s=U.test(n.slice(-1))?[].concat(Object(l.a)(n),[a]):[a],a=W(s),s=s.concat(c);else if("="===z)s=[a=W(n),c];else{var o=[].concat(Object(l.a)(n),[d]);a=W(o),s=o.concat(c)}D(!1),i(s),O(a),F(c)}},W=function(e){return Object(m.a)(e.join(""))+""},X=function(){return E.filter((function(e){return" "!==e[0]&&" "!==e[1]}))},Y=function(e,t){var n=document.getElementsByClassName("history")[e];n&&(n.style.backgroundColor=t)},Z=function(e,t){var n=document.getElementsByClassName("history")[e];n&&(n.style.color=t)},$=function(e){Z(e,"white"),Y(e,"rgb(102, 132, 146)")};Object(c.useEffect)((function(){return["hist","="].includes(z)||(Z(B,"black"),Y(B,"lightblue")),"hist"===z&&$(B),"="===z&&Y(B,"lightblue"),function(){var e;null!==B&&(Z(e=B,"black"),Y(e,"transparent"))}}));var ee=function(e){return function(){p||" "===E[e+L][1]||null===B||("="===z&&D(!0),O(E[e+L][1]),F("hist"),$(e),q(e))}},te=function(e){var t=e.key,n={q:"M-",p:"M+",m:"MS",r:"MR",l:"MC",c:"copy",v:"paste"},c={Enter:"MS","=":"+","@":"sqrt","%":"%"},i={Enter:"=",r:"inverse",Escape:"C",Delete:"CE",Backspace:"Del",F9:"toggleSign",ArrowUp:"up",ArrowDown:"down",PageUp:"up",PageDown:"down"};try{e.ctrlKey&&t in n?"c"===t?navigator.clipboard.writeText(d):"v"===t?(navigator.clipboard.readText().then((function(e){return O(isNaN(e)?"0":e)})),F("paste")):document.getElementById(n[t]).click():e.shiftKey&&t in c?document.getElementById(c[t]).click():"F1"===t?window.open(_,"_blank"):t in i?document.getElementById(i[t]).click():document.getElementById(t).click()}catch(s){}e.target.blur()};return Object(c.useEffect)((function(){return document.addEventListener("keyup",te),function(){document.removeEventListener("keyup",te)}})),Object(r.jsxs)("main",{className:"calculator",children:[Object(r.jsx)("div",{className:"menu",children:Object(r.jsx)("a",{target:"_blank",name:"help",href:_,rel:"noopener noreferrer",children:"Help"})}),Object(r.jsxs)("div",{className:"display",children:[Object(r.jsxs)("div",{className:" outer-div navigation",children:[Object(r.jsx)(j,{id:"up",name:"\u25b2",onClick:function(){p||null===B||(0===B?(B+L-1===-1?O(E[0][1]):(T((function(e){return e-1})),O(E[B+L-1][1])),$(0)):ee(B-1)(),"="===z&&D(!0),F("hist"))}}),Object(r.jsx)(j,{id:"down",name:"\u25bc",onClick:function(){if(!p&&null!==B){var e=X();B+L===e.length-1?(O(E[B+L][1]),$(B+L)):4===B?(T((function(e){return e+1})),O(E[B+L+1][1])):ee(B+1)(),"="===z&&D(!0),F("hist")}}})]}),Object(r.jsx)("div",{className:"outer-div",children:E.slice(L,L+5).map((function(e,t){return Object(r.jsx)("div",{className:"history",onClick:ee(t),style:{borderBottom:" "!==e[1]&&" "!==e[0]&&4!==t?"1px dotted black":"1px solid transparent"},children:e[0]},t)}))}),Object(r.jsx)(u,{upperVal:n,lowerVal:d}),Object(r.jsx)("label",{id:"error",children:p}),Object(r.jsx)("label",{id:"memory",children:"0"!==v?"M":""})]}),Object(r.jsxs)("div",{className:"keyboard",children:[Object(r.jsx)(j,{name:"MC",onClick:function(){h("0")}}),Object(r.jsx)(j,{name:"MR",onClick:function(){p||(O(v),F("MR"))}}),Object(r.jsx)(j,{name:"MS",onClick:function(){p||(h(d),isNaN(z)||F("MS"))}}),Object(r.jsx)(j,{name:"M+",onClick:function(){p||h(W([v,"+",d]))}}),Object(r.jsx)(j,{name:"M-",onClick:function(){p||h(W([v,"-",d]))}}),Object(r.jsx)("br",{}),Object(r.jsx)(j,{name:"Del",onClick:function(){p||"="===z||"0"===d||(O((function(e){return 1===e.length?"0":e.slice(0,-1)})),F("del"))}}),Object(r.jsx)(j,{name:"CE",onClick:function(){p?G():(O("0"),F("CE"))}}),Object(r.jsx)(j,{name:"C",onClick:G}),Object(r.jsx)(j,{id:"toggleSign",name:"\xb1",onClick:function(){p||(O((function(e){return-1*e+""})),F("toggleSign"))}}),Object(r.jsx)(j,{id:"sqrt",name:"\u221a",onClick:function(){p||(O((function(e){return Object(b.Re)(e)+""})),F("sqrtinv"))}}),Object(r.jsx)("br",{}),Object(r.jsx)(j,{className:"button-num",name:"7",onClick:H}),Object(r.jsx)(j,{className:"button-num",name:"8",onClick:H}),Object(r.jsx)(j,{className:"button-num",name:"9",onClick:H}),Object(r.jsx)(j,{name:"/",onClick:Q}),Object(r.jsx)(j,{name:"%",onClick:function(){p||(n.length>1?U.test(n.slice(-1))?O((function(e){return W(n.slice(0,-1))*e/100+""})):O((function(e){return W(n)*e/100+""})):O("0"),F("percent"))}}),Object(r.jsx)("br",{}),Object(r.jsx)(j,{className:"button-num",name:"4",onClick:H}),Object(r.jsx)(j,{className:"button-num",name:"5",onClick:H}),Object(r.jsx)(j,{className:"button-num",name:"6",onClick:H}),Object(r.jsx)(j,{name:"*",onClick:Q}),Object(r.jsx)(j,{id:"inverse",name:"1/x",onClick:function(){p||(O((function(e){return Object(b.Gc)(e)+""})),F("sqrtinv"))}}),Object(r.jsx)("br",{})]}),Object(r.jsxs)("div",{className:"keyboard keyboard-bot",children:[Object(r.jsxs)("div",{className:"bot-left",children:[Object(r.jsx)(j,{className:"button-num",name:"1",onClick:H}),Object(r.jsx)(j,{className:"button-num",name:"2",onClick:H}),Object(r.jsx)(j,{className:"button-num",name:"3",onClick:H}),Object(r.jsx)(j,{name:"-",onClick:Q}),Object(r.jsx)("br",{}),Object(r.jsx)(j,{className:"button-num button-wide",name:"0",onClick:H}),Object(r.jsx)(j,{className:"button-num",name:".",onClick:function(){p||d.includes(".")||("="===z||U.test(z)||0===n.length&&"0"===d?O("0."):O((function(e){return e+"."})),D(!1),F("."))}}),Object(r.jsx)(j,{name:"+",onClick:Q})]}),Object(r.jsx)("div",{className:"bot-right",children:Object(r.jsx)(j,{className:"button-tall",name:"=",onClick:function(){if(!p){var e=n,t=d;if(U.test(n))if([".","CE","toggleSign","MR","hist","paste","sqrtinv","percent"].includes(z)){if("."===d.slice(-1)[0]&&(t=d.slice(0,-1)),U.test(n.slice(-1)))e=[].concat(Object(l.a)(n),[t]);else{var c=n.slice(-2),s=Object(o.a)(c,2);e=[t,s[0],s[1]]}t=W(e)}else if("="===z){var a=n.slice(-2),r=Object(o.a)(a,2),u=r[0],j=r[1];e=[d,u,j],t=W([].concat(Object(l.a)(n),[u,j]))}else e=[].concat(Object(l.a)(n),[d]),t=W(e);else"."!==z?e=[d]:(e=[d.slice(0,-1)],t=d.slice(0,-1));var b=E.filter((function(e){return" "===e[0]&&" "===e[1]})),m=E;0!==b.length?(m[5-b.length]=[e.join(""),t],q(5-b.length)):(m=m.concat([[e.join(""),t]]),q(4),T(X().length-4)),D(!0),w(m),i(e),O(t),F("=")}}})})]})]})}a.a.render(Object(r.jsx)(i.a.StrictMode,{children:Object(r.jsx)("div",{children:Object(r.jsx)(d,{})})}),document.getElementById("root"))}},[[69,1,2]]]);
//# sourceMappingURL=main.e991a648.chunk.js.map