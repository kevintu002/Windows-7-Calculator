(this["webpackJsonpreact-calculator"]=this["webpackJsonpreact-calculator"]||[]).push([[0],{27:function(e,c,n){},28:function(e,c,n){},38:function(e,c){},39:function(e,c,n){"use strict";n.r(c);var t=n(7),j=n.n(t),a=n(20),i=n.n(a),s=(n(27),n(2)),o=n(5),r=(n(28),n(1));function l(e){var c=e.upperVal,n=e.lowerVal;return Object(r.jsxs)("div",{children:[Object(r.jsx)("div",{className:"outer-div",children:Object(r.jsx)("div",{className:"inner-div sm-text",children:c})}),Object(r.jsx)("div",{className:"outer-div",children:Object(r.jsx)("div",{className:"inner-div lg-text",children:n})})]})}function b(e){var c=e.name,n=e.onClick;return Object(r.jsx)("button",{name:c,onClick:n,children:c})}var u=n(41);function O(){var e=Object(t.useState)([]),c=Object(o.a)(e,2),n=c[0],j=c[1],a=Object(t.useState)("0"),i=Object(o.a)(a,2),O=i[0],x=i[1],m=Object(t.useState)(!1),d=Object(o.a)(m,2),f=d[0],k=d[1],C=Object(t.useState)(null),v=Object(o.a)(C,2),h=v[0],p=v[1],N=new RegExp("\\+|-|\\*|\\/|%"),g=function(){return function(e){var c=e.target;N.test(h)?j((function(e){return N.test(e.slice(-1))&&e.pop(),[].concat(Object(s.a)(e),[c.name])})):"."===h?(x((function(e){return e.slice(0,-1)})),j((function(e){return[].concat(Object(s.a)(e),[O.slice(0,-1),c.name])}))):j((function(e){return[].concat(Object(s.a)(e),[O,c.name])})),p(c.name)}},w=function(){return function(e){var c=e.target;N.test(h)?x(c.name):x((function(e){return"0"===e?c.name:e+c.name})),p(c.name)}};Object(t.useEffect)((function(){f&&(console.log(n),x(Object(u.a)(n.join(""))),k(!1),p("="))}),[f,n]);return Object(r.jsxs)("div",{className:"calculator",children:[Object(r.jsx)("div",{className:"display",children:Object(r.jsx)(l,{upperVal:n,lowerVal:O})}),Object(r.jsx)("div",{className:"keyboard"}),Object(r.jsxs)("div",{className:"keyboard-bot",children:[Object(r.jsx)(b,{name:"Del",onClick:function(){"0"!==O&&x((function(e){return 1===e.length?"0":e.slice(0,-1)}))}}),Object(r.jsx)(b,{name:"CE",onClick:function(){x("0"),p(null)}}),Object(r.jsx)(b,{name:"C",onClick:function(){j([]),x("0"),k(!1),p(null)}}),Object(r.jsx)(b,{name:"\xb1"}),Object(r.jsx)(b,{name:"\u221a"}),Object(r.jsx)("br",{}),Object(r.jsx)(b,{name:"7",onClick:w()}),Object(r.jsx)(b,{name:"8",onClick:w()}),Object(r.jsx)(b,{name:"9",onClick:w()}),Object(r.jsx)(b,{name:"/",onClick:g()}),Object(r.jsx)(b,{name:"%",onClick:g()}),Object(r.jsx)("br",{}),Object(r.jsx)(b,{name:"4",onClick:w()}),Object(r.jsx)(b,{name:"5",onClick:w()}),Object(r.jsx)(b,{name:"6",onClick:w()}),Object(r.jsx)(b,{name:"*",onClick:g()}),Object(r.jsx)(b,{name:"1/x"}),Object(r.jsx)("br",{}),Object(r.jsx)(b,{name:"1",onClick:w()}),Object(r.jsx)(b,{name:"2",onClick:w()}),Object(r.jsx)(b,{name:"3",onClick:w()}),Object(r.jsx)(b,{name:"-",onClick:g()}),Object(r.jsx)("br",{}),Object(r.jsx)(b,{name:"0",onClick:w()}),Object(r.jsx)(b,{name:".",onClick:function(){O.includes(".")||x((function(e){return e+"."})),p(".")}}),Object(r.jsx)(b,{name:"+",onClick:g()}),Object(r.jsx)(b,{name:"=",onClick:function(){j("="===h?function(e){var c=e.slice(-1),n=Object(o.a)(c,1)[0],t=e.slice(-2),j=Object(o.a)(t,1)[0];return[].concat(Object(s.a)(e),[j,n])}:function(e){return[].concat(Object(s.a)(e),[O])}),k(!0),p("=")}})]})]})}i.a.render(Object(r.jsx)(j.a.StrictMode,{children:Object(r.jsx)("div",{children:Object(r.jsx)(O,{})})}),document.getElementById("root"))}},[[39,1,2]]]);
//# sourceMappingURL=main.33396307.chunk.js.map