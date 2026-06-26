import{j as i}from"./jsx-runtime-DFAAy_2V.js";import{r as W}from"./index-Bc2G9s8g.js";import{P as M}from"./Pagination-C0NED0RK.js";import"./usePagination-DQGAsxuz.js";const k={title:"Components/Pagination",component:M,tags:["autodocs"],args:{totalItems:100,pageSize:10,siblingCount:1,showFirstLast:!0,disabled:!1},argTypes:{siblingCount:{control:{type:"number",min:0,max:3}},showFirstLast:{control:"boolean"},disabled:{control:"boolean"},currentPage:{control:!1}}},e={},a={args:{totalItems:25,pageSize:10}},s={args:{totalItems:200,pageSize:10,defaultPage:10}},r={args:{totalItems:200,pageSize:10,defaultPage:10,siblingCount:2}},t={args:{showFirstLast:!1}},o={args:{disabled:!0}};function _(c){const[l,N]=W.useState(1);return i.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16},children:[i.jsxs("p",{style:{margin:0},children:["Current page: ",l]}),i.jsx(M,{...c,currentPage:l,onChange:N})]})}const n={render:c=>i.jsx(_,{...c})};var g,p,m;e.parameters={...e.parameters,docs:{...(g=e.parameters)==null?void 0:g.docs,source:{originalSource:"{}",...(m=(p=e.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};var d,u,S;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    totalItems: 25,
    pageSize: 10
  }
}`,...(S=(u=a.parameters)==null?void 0:u.docs)==null?void 0:S.source}}};var f,b,P;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    totalItems: 200,
    pageSize: 10,
    // Start mid-trail so both gaps collapse to an ellipsis.
    defaultPage: 10
  }
}`,...(P=(b=s.parameters)==null?void 0:b.docs)==null?void 0:P.source}}};var x,C,h;r.parameters={...r.parameters,docs:{...(x=r.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    totalItems: 200,
    pageSize: 10,
    defaultPage: 10,
    siblingCount: 2
  }
}`,...(h=(C=r.parameters)==null?void 0:C.docs)==null?void 0:h.source}}};var F,y,z;t.parameters={...t.parameters,docs:{...(F=t.parameters)==null?void 0:F.docs,source:{originalSource:`{
  args: {
    showFirstLast: false
  }
}`,...(z=(y=t.parameters)==null?void 0:y.docs)==null?void 0:z.source}}};var I,j,w;o.parameters={...o.parameters,docs:{...(I=o.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    disabled: true
  }
}`,...(w=(j=o.parameters)==null?void 0:j.docs)==null?void 0:w.source}}};var L,D,E;n.parameters={...n.parameters,docs:{...(L=n.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: args => <ControlledPagination {...args} />
}`,...(E=(D=n.parameters)==null?void 0:D.docs)==null?void 0:E.source}}};const q=["Default","FewPages","ManyPages","WithSiblings","NoFirstLast","Disabled","Controlled"];export{n as Controlled,e as Default,o as Disabled,a as FewPages,s as ManyPages,t as NoFirstLast,r as WithSiblings,q as __namedExportsOrder,k as default};
