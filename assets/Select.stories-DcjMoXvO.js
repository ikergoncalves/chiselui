import{j as e}from"./jsx-runtime-DFAAy_2V.js";import{S as t}from"./Select-CebP2Quz.js";import"./index-Bc2G9s8g.js";/* empty css              */const D=[{value:"apple",label:"Apple"},{value:"banana",label:"Banana"},{value:"cherry",label:"Cherry"},{value:"durian",label:"Durian (out of stock)",disabled:!0}],P={title:"Components/Select",component:t,tags:["autodocs"],args:{label:"Favourite fruit",options:D},argTypes:{size:{control:"inline-radio",options:["sm","md","lg"]},disabled:{control:"boolean"},options:{control:!1}}},a={},r={args:{error:"Please pick a fruit."}},s={args:{placeholder:"Choose a fruit…"}},o={args:{disabled:!0,defaultValue:"banana"}},l={render:i=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16,maxWidth:320},children:[e.jsx(t,{...i,size:"sm",label:"Small"}),e.jsx(t,{...i,size:"md",label:"Medium"}),e.jsx(t,{...i,size:"lg",label:"Large"})]})};var c,n,d;a.parameters={...a.parameters,docs:{...(c=a.parameters)==null?void 0:c.docs,source:{originalSource:"{}",...(d=(n=a.parameters)==null?void 0:n.docs)==null?void 0:d.source}}};var m,p,u;r.parameters={...r.parameters,docs:{...(m=r.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    error: 'Please pick a fruit.'
  }
}`,...(u=(p=r.parameters)==null?void 0:p.docs)==null?void 0:u.source}}};var g,b,f;s.parameters={...s.parameters,docs:{...(g=s.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    placeholder: 'Choose a fruit…'
  }
}`,...(f=(b=s.parameters)==null?void 0:b.docs)==null?void 0:f.source}}};var h,S,x;o.parameters={...o.parameters,docs:{...(h=o.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    disabled: true,
    defaultValue: 'banana'
  }
}`,...(x=(S=o.parameters)==null?void 0:S.docs)==null?void 0:x.source}}};var z,v,y;l.parameters={...l.parameters,docs:{...(z=l.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: args => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    maxWidth: 320
  }}>
      <Select {...args} size="sm" label="Small" />
      <Select {...args} size="md" label="Medium" />
      <Select {...args} size="lg" label="Large" />
    </div>
}`,...(y=(v=l.parameters)==null?void 0:v.docs)==null?void 0:y.source}}};const k=["Default","WithError","WithPlaceholder","Disabled","Sizes"];export{a as Default,o as Disabled,l as Sizes,r as WithError,s as WithPlaceholder,k as __namedExportsOrder,P as default};
