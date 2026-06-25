import{j as s}from"./jsx-runtime-DFAAy_2V.js";import"./index-Bc2G9s8g.js";function d({items:r,separator:v="/",maxItems:p}){const w=p!==void 0&&r.length>p;let m;if(w){const a=r[0],e=r[r.length-2],t=r[r.length-1];m=[...a?[{type:"item",item:a,index:0}]:[],{type:"ellipsis"},...e?[{type:"item",item:e,index:r.length-2}]:[],...t?[{type:"item",item:t,index:r.length-1}]:[]]}else m=r.map((a,e)=>({type:"item",item:a,index:e}));const R=a=>{if(a.type==="ellipsis")return s.jsx("span",{className:"chs-breadcrumb__ellipsis","aria-label":"more items",children:"…"});const{item:e,index:t}=a;return t===r.length-1?s.jsx("span",{className:"chs-breadcrumb__current","aria-current":"page",children:e.label}):e.href?s.jsx("a",{className:"chs-breadcrumb__link",href:e.href,onClick:e.onClick,children:e.label}):e.onClick?s.jsx("button",{type:"button",className:"chs-breadcrumb__button",onClick:e.onClick,children:e.label}):s.jsx("span",{className:"chs-breadcrumb__text",children:e.label})};return s.jsx("nav",{className:"chs-breadcrumb","aria-label":"Breadcrumb",children:s.jsx("ol",{className:"chs-breadcrumb__list",children:m.map((a,e)=>{const t=a.type==="ellipsis"?`ellipsis-${e}`:a.index;return s.jsxs("li",{className:"chs-breadcrumb__item",children:[e>0&&s.jsx("span",{className:"chs-breadcrumb__separator","aria-hidden":"true",children:v}),R(a)]},t)})})})}d.displayName="Breadcrumb";d.__docgenInfo={description:'Breadcrumb — hierarchical navigation following the WAI-ARIA breadcrumb pattern:\na `<nav aria-label="Breadcrumb">` wrapping an ordered list, with the final crumb\nmarked `aria-current="page"`.\n\nEach crumb picks its element from its data: `href` → `<a>`, `onClick` only →\n`<button>`, neither → plain `<span>`. The last crumb is always a `<span>` since\nit represents the page you are already on. When `maxItems` is exceeded the middle\ncollapses to a single ellipsis (labelled "more items"), always preserving the\nfirst crumb and the final two.',methods:[],displayName:"Breadcrumb",props:{items:{required:!0,tsType:{name:"Array",elements:[{name:"BreadcrumbItem"}],raw:"BreadcrumbItem[]"},description:"The trail, from root (first) to current page (last)."},separator:{required:!1,tsType:{name:"ReactNode"},description:"Node placed between crumbs. @default '/'",defaultValue:{value:"'/'",computed:!1}},maxItems:{required:!1,tsType:{name:"number"},description:"Cap on visible crumbs. When `items.length` exceeds it the middle collapses\nto an ellipsis, keeping the first crumb and the last two."}}};const D=[{label:"Home",href:"#home"},{label:"Components",href:"#components"},{label:"Navigation",href:"#navigation"},{label:"Breadcrumb",href:"#breadcrumb"}],W={title:"Components/Breadcrumb",component:d,tags:["autodocs"],args:{items:D},argTypes:{items:{control:!1},separator:{control:!1}}},n={},l={args:{items:[{label:"Dashboard",onClick:()=>alert("Go to Dashboard")},{label:"Reports",onClick:()=>alert("Go to Reports")},{label:"Q3 Summary"}]}},o={args:{separator:"›"}},i={args:{items:[{label:"Home",href:"#home"},{label:"Library",href:"#library"},{label:"Data",href:"#data"},{label:"Reports",href:"#reports"},{label:"2026",href:"#2026"},{label:"June",href:"#june"}],maxItems:4}},c={args:{items:[{label:"Home"}]}};var b,u,h;n.parameters={...n.parameters,docs:{...(b=n.parameters)==null?void 0:b.docs,source:{originalSource:"{}",...(h=(u=n.parameters)==null?void 0:u.docs)==null?void 0:h.source}}};var f,g,x;l.parameters={...l.parameters,docs:{...(f=l.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    items: [{
      label: 'Dashboard',
      onClick: () => alert('Go to Dashboard')
    }, {
      label: 'Reports',
      onClick: () => alert('Go to Reports')
    }, {
      label: 'Q3 Summary'
    }]
  }
}`,...(x=(g=l.parameters)==null?void 0:g.docs)==null?void 0:x.source}}};var y,C,_;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    separator: '›'
  }
}`,...(_=(C=o.parameters)==null?void 0:C.docs)==null?void 0:_.source}}};var k,N,j;i.parameters={...i.parameters,docs:{...(k=i.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    items: [{
      label: 'Home',
      href: '#home'
    }, {
      label: 'Library',
      href: '#library'
    }, {
      label: 'Data',
      href: '#data'
    }, {
      label: 'Reports',
      href: '#reports'
    }, {
      label: '2026',
      href: '#2026'
    }, {
      label: 'June',
      href: '#june'
    }],
    maxItems: 4
  }
}`,...(j=(N=i.parameters)==null?void 0:N.docs)==null?void 0:j.source}}};var S,B,I;c.parameters={...c.parameters,docs:{...(S=c.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    items: [{
      label: 'Home'
    }]
  }
}`,...(I=(B=c.parameters)==null?void 0:B.docs)==null?void 0:I.source}}};const A=["Default","WithOnClick","CustomSeparator","Collapsed","SingleItem"];export{i as Collapsed,o as CustomSeparator,n as Default,c as SingleItem,l as WithOnClick,A as __namedExportsOrder,W as default};
