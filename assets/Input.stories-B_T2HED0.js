import{j as e}from"./jsx-runtime-DFAAy_2V.js";import{I as n}from"./Input-sJxAtvxh.js";import"./index-Bc2G9s8g.js";/* empty css              */const V={title:"Components/Input",component:n,tags:["autodocs"],args:{label:"Email",placeholder:"you@example.com"},argTypes:{size:{control:"inline-radio",options:["sm","md","lg"]},disabled:{control:"boolean"},leftAddon:{control:!1},rightAddon:{control:!1}}},a={},r={args:{label:"Email",defaultValue:"not-an-email",error:"Enter a valid email address."}},s={args:{label:"Password",type:"password",placeholder:"••••••••",hint:"Use at least 8 characters."}},o={args:{label:"Amount",leftAddon:"$",rightAddon:"USD",placeholder:"0.00"}},l={render:d=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16,maxWidth:320},children:[e.jsx(n,{...d,size:"sm",label:"Small"}),e.jsx(n,{...d,size:"md",label:"Medium"}),e.jsx(n,{...d,size:"lg",label:"Large"})]})},t={args:{label:"Email",disabled:!0,defaultValue:"you@example.com"}};var i,c,m;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:"{}",...(m=(c=a.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};var p,u,g;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    label: 'Email',
    defaultValue: 'not-an-email',
    error: 'Enter a valid email address.'
  }
}`,...(g=(u=r.parameters)==null?void 0:u.docs)==null?void 0:g.source}}};var b,h,f;s.parameters={...s.parameters,docs:{...(b=s.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    label: 'Password',
    type: 'password',
    placeholder: '••••••••',
    hint: 'Use at least 8 characters.'
  }
}`,...(f=(h=s.parameters)==null?void 0:h.docs)==null?void 0:f.source}}};var x,S,E;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    label: 'Amount',
    leftAddon: '$',
    rightAddon: 'USD',
    placeholder: '0.00'
  }
}`,...(E=(S=o.parameters)==null?void 0:S.docs)==null?void 0:E.source}}};var y,A,z;l.parameters={...l.parameters,docs:{...(y=l.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: args => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    maxWidth: 320
  }}>
      <Input {...args} size="sm" label="Small" />
      <Input {...args} size="md" label="Medium" />
      <Input {...args} size="lg" label="Large" />
    </div>
}`,...(z=(A=l.parameters)==null?void 0:A.docs)==null?void 0:z.source}}};var D,W,j;t.parameters={...t.parameters,docs:{...(D=t.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    label: 'Email',
    disabled: true,
    defaultValue: 'you@example.com'
  }
}`,...(j=(W=t.parameters)==null?void 0:W.docs)==null?void 0:j.source}}};const H=["Default","WithError","WithHint","WithAddons","Sizes","Disabled"];export{a as Default,t as Disabled,l as Sizes,o as WithAddons,r as WithError,s as WithHint,H as __namedExportsOrder,V as default};
