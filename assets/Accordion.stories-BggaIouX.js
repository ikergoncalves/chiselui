import{j as r}from"./jsx-runtime-DFAAy_2V.js";import{r as S}from"./index-Bc2G9s8g.js";import{A as k}from"./Accordion-8ILVEmIx.js";const d=[{id:"shipping",title:"How long does shipping take?",content:"Standard shipping takes 3–5 business days. Express options are offered at checkout and arrive within 1–2 business days."},{id:"returns",title:"What is your return policy?",content:"Unused items can be returned within 30 days of delivery for a full refund. Just start a return from your orders page."},{id:"warranty",title:"Is there a warranty?",content:"Every product carries a two-year limited warranty covering manufacturing defects. Wear and tear is not included."}],_={title:"Components/Accordion",component:k,tags:["autodocs"],args:{items:d,allowMultiple:!1,variant:"default",defaultOpenIds:["shipping"]},argTypes:{variant:{control:"inline-radio",options:["default","bordered"]},allowMultiple:{control:"boolean"},items:{control:!1},openIds:{control:!1},defaultOpenIds:{control:!1}}},s={},t={args:{allowMultiple:!0,defaultOpenIds:["shipping","returns"]}},a={args:{variant:"bordered"}},D=[{id:"available",title:"Available section",content:"This section can be opened and closed freely."},{id:"locked",title:"Locked section",content:"You should never see this — the header is disabled.",disabled:!0},{id:"also-available",title:"Another available section",content:"This one works too."}],o={args:{items:D,defaultOpenIds:["available"]}};function E(i){const[C,c]=S.useState(["returns"]);return r.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16},children:[r.jsx("div",{style:{display:"flex",gap:8},children:d.map(e=>r.jsxs("button",{type:"button",onClick:()=>c(l=>l.includes(e.id)?l.filter(M=>M!==e.id):[...l,e.id]),children:["Toggle ",e.id]},e.id))}),r.jsx(k,{items:d,...i,allowMultiple:!0,openIds:C,onChange:c})]})}const n={render:i=>r.jsx(E,{...i})};var p,u,m;s.parameters={...s.parameters,docs:{...(p=s.parameters)==null?void 0:p.docs,source:{originalSource:"{}",...(m=(u=s.parameters)==null?void 0:u.docs)==null?void 0:m.source}}};var f,g,h;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    allowMultiple: true,
    defaultOpenIds: ['shipping', 'returns']
  }
}`,...(h=(g=t.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};var b,y,v;a.parameters={...a.parameters,docs:{...(b=a.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    variant: 'bordered'
  }
}`,...(v=(y=a.parameters)==null?void 0:y.docs)==null?void 0:v.source}}};var w,x,I;o.parameters={...o.parameters,docs:{...(w=o.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    items: disabledItems,
    defaultOpenIds: ['available']
  }
}`,...(I=(x=o.parameters)==null?void 0:x.docs)==null?void 0:I.source}}};var A,O,j;n.parameters={...n.parameters,docs:{...(A=n.parameters)==null?void 0:A.docs,source:{originalSource:`{
  render: args => <ControlledAccordion {...args} />
}`,...(j=(O=n.parameters)==null?void 0:O.docs)==null?void 0:j.source}}};const H=["Default","AllowMultiple","Bordered","WithDisabled","Controlled"];export{t as AllowMultiple,a as Bordered,n as Controlled,s as Default,o as WithDisabled,H as __namedExportsOrder,_ as default};
