import{j as r}from"./jsx-runtime-DFAAy_2V.js";import{S as e}from"./Skeleton-DOHpOyRE.js";import"./index-Bc2G9s8g.js";const T={title:"Components/Skeleton",component:e,tags:["autodocs"],argTypes:{variant:{control:"inline-radio",options:["text","circular","rectangular"]},animated:{control:"boolean"},lines:{control:{type:"number",min:1,max:8}}}},a={args:{variant:"text",lines:3},render:o=>r.jsx("div",{style:{width:320},children:r.jsx(e,{...o})})},t={args:{variant:"circular",width:48,height:48}},n={args:{variant:"rectangular",width:320,height:160}},s={args:{variant:"text",lines:3,animated:!1},render:o=>r.jsx("div",{style:{width:320},children:r.jsx(e,{...o})})},i={render:()=>r.jsxs("div",{style:{display:"flex",gap:16,alignItems:"center",width:320},children:[r.jsx(e,{variant:"circular",width:56,height:56}),r.jsx("div",{style:{flex:1},children:r.jsx(e,{variant:"text",lines:2})})]})};var c,d,l;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:`{
  args: {
    variant: 'text',
    lines: 3
  },
  render: args => <div style={{
    width: 320
  }}>\r
      <Skeleton {...args} />\r
    </div>
}`,...(l=(d=a.parameters)==null?void 0:d.docs)==null?void 0:l.source}}};var m,p,g;t.parameters={...t.parameters,docs:{...(m=t.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    variant: 'circular',
    width: 48,
    height: 48
  }
}`,...(g=(p=t.parameters)==null?void 0:p.docs)==null?void 0:g.source}}};var h,x,u;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    variant: 'rectangular',
    width: 320,
    height: 160
  }
}`,...(u=(x=n.parameters)==null?void 0:x.docs)==null?void 0:u.source}}};var v,S,w;s.parameters={...s.parameters,docs:{...(v=s.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    variant: 'text',
    lines: 3,
    animated: false
  },
  render: args => <div style={{
    width: 320
  }}>\r
      <Skeleton {...args} />\r
    </div>
}`,...(w=(S=s.parameters)==null?void 0:S.docs)==null?void 0:w.source}}};var y,f,j;i.parameters={...i.parameters,docs:{...(y=i.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 16,
    alignItems: 'center',
    width: 320
  }}>\r
      <Skeleton variant="circular" width={56} height={56} />\r
      <div style={{
      flex: 1
    }}>\r
        <Skeleton variant="text" lines={2} />\r
      </div>\r
    </div>
}`,...(j=(f=i.parameters)==null?void 0:f.docs)==null?void 0:j.source}}};const b=["TextBlock","Avatar","Card","Static","ProfileExample"];export{t as Avatar,n as Card,i as ProfileExample,s as Static,a as TextBlock,b as __namedExportsOrder,T as default};
