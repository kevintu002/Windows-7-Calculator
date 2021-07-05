(this["webpackJsonpreact-calculator"]=this["webpackJsonpreact-calculator"]||[]).push([[0],{57:function(e,t,n){},58:function(e,t,n){},68:function(e,t){},69:function(e,t,n){"use strict";n.r(t);var c=n(17),i=n.n(c),s=n(37),a=n.n(s),l=(n(57),n(13)),r=n(19),o=(n(58),n(9));function j(e){var t=e.upperVal,n=e.lowerVal;return Object(o.jsxs)("div",{children:[Object(o.jsx)("div",{className:"outer-div expression",children:Object(o.jsx)("div",{id:"expression",className:"inner-div sm-text","data-testid":"expression",children:t})}),Object(o.jsx)("div",{className:"outer-div",children:Object(o.jsx)("div",{id:"lowerVal",className:"inner-div lg-text","data-testid":"lowerVal",children:n})})]})}function u(e){var t=e.id,n=e.name,c=e.onClick;return Object(o.jsx)("button",{id:t||n,name:n,onClick:c,children:n})}var b=n(2),d=n(71);function O(){var e=Object(c.useState)([]),t=Object(r.a)(e,2),n=t[0],i=t[1],s=Object(c.useState)("0"),a=Object(r.a)(s,2),O=a[0],m=a[1],f=Object(c.useState)(!1),x=Object(r.a)(f,2),v=x[0],h=x[1],k=Object(c.useState)(null),g=Object(r.a)(k,2),p=g[0],C=g[1],y=Object(c.useState)("0"),E=Object(r.a)(y,2),M=E[0],S=E[1],N=Object(c.useState)(""),w=Object(r.a)(N,2),B=w[0],R=w[1],q=Object(c.useState)(Array(5).fill([" "," "])),D=Object(r.a)(q,2),I=D[0],V=D[1],A=Object(c.useState)(null),P=Object(r.a)(A,2),z=P[0],F=P[1],J=Object(c.useState)(0),K=Object(r.a)(J,2),L=K[0],T=K[1],U=new RegExp("\\+|-|\\*|\\/");Object(c.useEffect)((function(){"Infinity"===O&&(i([]),m("0"),C(null),R("Cannot divide by zero")),O.length>12&&(document.getElementById("lowerVal").style.fontSize="16px")}),[O]);var _=function(e){var t=e.target.name;["=","MR","MS","hist","sqrtinv","percent"].includes(p)||U.test(p)?(v&&i([]),m(t)):m((function(e){return"0"===e?t:e+t})),h(!1),C(t)},G=function(e){var t=e.target.name,c=n,s=O;if(U.test(p))c=[].concat(Object(l.a)(n.slice(0,-1)),[t]);else if([".","CE","toggleSign","MR","hist","paste","sqrtinv","percent"].includes(p))"."===O.slice(-1)[0]&&(s=O.slice(0,-1)),c=U.test(n.slice(-1))?[].concat(Object(l.a)(n),[s]):[s],s=H(c),c=c.concat(t);else if("="===p)c=[s=H(n),t];else{var a=[].concat(Object(l.a)(n),[O]);s=H(a),c=a.concat(t)}h(!1),i(c),m(s),C(t)},H=function(e){return Object(d.a)(e.join(""))+""},Q=function(){return I.filter((function(e){return" "!==e[0]&&" "!==e[1]}))},W=function(e,t){var n=document.getElementsByClassName("history")[e];n&&(n.style.backgroundColor=t)},X=function(e,t){var n=document.getElementsByClassName("history")[e];n&&(n.style.color=t)},Y=function(e){X(e,"white"),W(e,"rgb(102, 132, 146)")};Object(c.useEffect)((function(){return["hist","="].includes(p)||(X(z,"black"),W(z,"lightblue")),"hist"===p&&Y(z),"="===p&&W(z,"lightblue"),function(){var e;null!==z&&(X(e=z,"black"),W(e,"transparent"))}}));var Z=function(e){return function(){" "!==I[e+L][1]&&null!==z&&(m(I[e+L][1]),"="===p&&h(!0),C("hist"),Y(e),F(e))}},$=function(e){var t=e.key,n={q:"M-",p:"M+",m:"MS",r:"MR",l:"MC",c:"copy",v:"paste"},c={Enter:"MS","=":"+","@":"sqrt","%":"%"},i={Enter:"=",r:"inverse",Escape:"C",Delete:"CE",Backspace:"Del",F9:"toggleSign",ArrowUp:"up",ArrowDown:"down",PageUp:"up",PageDown:"down"};try{e.ctrlKey&&t in n?"c"===t?navigator.clipboard.writeText(O):"v"===t?(navigator.clipboard.readText().then((function(e){return m(isNaN(e)?"0":e)})),C("paste")):document.getElementById(n[t]).click():e.shiftKey&&t in c?document.getElementById(c[t]).click():"F1"===t?window.open("https://github.com/Poplica/react-calculator/blob/master/README.md","_blank"):t in i?document.getElementById(i[t]).click():document.getElementById(t).click()}catch(s){}e.target.blur()};return Object(c.useEffect)((function(){return document.addEventListener("keyup",$),function(){document.removeEventListener("keyup",$)}})),Object(o.jsxs)("main",{className:"calculator",children:[Object(o.jsx)("div",{className:"menu",children:Object(o.jsx)("a",{target:"_blank",name:"help",href:"https://github.com/Poplica/react-calculator/blob/master/README.md",rel:"noopener noreferrer",children:"Help"})}),Object(o.jsxs)("div",{className:"navigation",children:[Object(o.jsx)(u,{id:"up",onClick:function(){null!==z&&(0===z?(z+L-1===-1?m(I[0][1]):(T((function(e){return e-1})),m(I[z+L-1][1])),Y(0)):Z(z-1)(),"="===p&&h(!0),C("hist"))}}),Object(o.jsx)(u,{id:"down",onClick:function(){if(null!==z){var e=Q();z+L===e.length-1?(m(I[z+L][1]),Y(z+L)):4===z?(T((function(e){return e+1})),m(I[z+L+1][1])):Z(z+1)(),"="===p&&h(!0),C("hist")}}})]}),Object(o.jsxs)("div",{className:"display",children:[Object(o.jsx)("div",{className:"outer-div",children:I.slice(L,L+5).map((function(e,t){return Object(o.jsx)("div",{className:"history",onClick:Z(t),style:{borderBottom:" "!==e[1]&&" "!==e[0]&&4!==t?"1px dotted black":"1px solid transparent"},children:e[0]},t)}))}),Object(o.jsx)(j,{upperVal:n,lowerVal:O}),Object(o.jsx)("div",{className:"error",children:B}),Object(o.jsx)("div",{className:"m-icon",children:"0"!==M?"M":""})]}),Object(o.jsx)("div",{className:"keyboard"}),Object(o.jsxs)("div",{className:"keyboard-bot",children:[Object(o.jsx)(u,{name:"MC",onClick:function(){S("0")}}),Object(o.jsx)(u,{name:"MR",onClick:function(){m(M),C("MR")}}),Object(o.jsx)(u,{name:"MS",onClick:function(){S(O),isNaN(p)||C("MS")}}),Object(o.jsx)(u,{name:"M+",onClick:function(){S(H([M,"+",O]))}}),Object(o.jsx)(u,{name:"M-",onClick:function(){S(H([M,"-",O]))}}),Object(o.jsx)("br",{}),Object(o.jsx)(u,{name:"Del",onClick:function(){"="!==p&&"0"!==O&&(m((function(e){return 1===e.length?"0":e.slice(0,-1)})),C("del"))}}),Object(o.jsx)(u,{name:"CE",onClick:function(){m("0"),C("CE")}}),Object(o.jsx)(u,{name:"C",onClick:function(){i([]),m("0"),C(null),R(""),h(!1)}}),Object(o.jsx)(u,{id:"toggleSign",name:"\xb1",onClick:function(){m((function(e){return-1*e+""})),C("toggleSign")}}),Object(o.jsx)(u,{id:"sqrt",name:"\u221a",onClick:function(){m((function(e){return Object(b.Re)(e)+""})),C("sqrtinv")}}),Object(o.jsx)("br",{}),Object(o.jsx)(u,{name:"7",onClick:_}),Object(o.jsx)(u,{name:"8",onClick:_}),Object(o.jsx)(u,{name:"9",onClick:_}),Object(o.jsx)(u,{name:"/",onClick:G}),Object(o.jsx)(u,{name:"%",onClick:function(){n.length>1?U.test(n.slice(-1))?m((function(e){return H(n.slice(0,-1))*e/100+""})):m((function(e){return H(n)*e/100+""})):m("0"),C("percent")}}),Object(o.jsx)("br",{}),Object(o.jsx)(u,{name:"4",onClick:_}),Object(o.jsx)(u,{name:"5",onClick:_}),Object(o.jsx)(u,{name:"6",onClick:_}),Object(o.jsx)(u,{name:"*",onClick:G}),Object(o.jsx)(u,{id:"inverse",name:"1/x",onClick:function(){m((function(e){return Object(b.Gc)(e)+""})),C("sqrtinv")}}),Object(o.jsx)("br",{}),Object(o.jsx)(u,{name:"1",onClick:_}),Object(o.jsx)(u,{name:"2",onClick:_}),Object(o.jsx)(u,{name:"3",onClick:_}),Object(o.jsx)(u,{name:"-",onClick:G}),Object(o.jsx)("br",{}),Object(o.jsx)(u,{name:"0",onClick:_}),Object(o.jsx)(u,{name:".",onClick:function(){O.includes(".")||("="===p||U.test(p)||0===n.length&&"0"===O?m("0."):m((function(e){return e+"."})),h(!1),C("."))}}),Object(o.jsx)(u,{name:"+",onClick:G}),Object(o.jsx)(u,{name:"=",onClick:function(){var e=n,t=O;if(U.test(n))if([".","CE","toggleSign","MR","hist","paste","sqrtinv","percent"].includes(p)){if("."===O.slice(-1)[0]&&(t=O.slice(0,-1)),U.test(n.slice(-1)))e=[].concat(Object(l.a)(n),[t]);else{var c=n.slice(-2),s=Object(r.a)(c,2);e=[t,s[0],s[1]]}t=H(e)}else if("="===p){var a=n.slice(-2),o=Object(r.a)(a,2),j=o[0],u=o[1];e=[O,j,u],t=H([].concat(Object(l.a)(n),[j,u]))}else e=[].concat(Object(l.a)(n),[O]),t=H(e);else"."!==p?e=[O]:(e=[O.slice(0,-1)],t=O.slice(0,-1));var b=I.filter((function(e){return" "===e[0]&&" "===e[1]})),d=I;0!==b.length?(d[5-b.length]=[e.join(""),t],F(5-b.length)):(d=d.concat([[e.join(""),t]]),F(4),T(Q().length-4)),h(!0),V(d),i(e),m(t),C("=")}})]})]})}a.a.render(Object(o.jsx)(i.a.StrictMode,{children:Object(o.jsx)("div",{children:Object(o.jsx)(O,{})})}),document.getElementById("root"))}},[[69,1,2]]]);
//# sourceMappingURL=main.c3db828c.chunk.js.map