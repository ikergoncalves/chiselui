import{j as e}from"./jsx-runtime-DFAAy_2V.js";import{T as n}from"./Textarea-CIe47bbe.js";import"./index-Bc2G9s8g.js";/* empty css              */const v={title:"Components/Textarea",component:n,tags:["autodocs"],args:{label:"Bio",placeholder:"Tell us about yourself…"},argTypes:{size:{control:"inline-radio",options:["sm","md","lg"]},disabled:{control:"boolean"},autoResize:{control:"boolean"},showCount:{control:"boolean"}}},a={},r={args:{label:"Message",defaultValue:"Too short",error:"Please write at least 20 characters."}},s={args:{label:"Feedback",hint:"Markdown is supported."}},o={args:{label:"Notes",autoResize:!0,placeholder:"Start typing — the field grows with your content…"}},t={args:{label:"Tweet",showCount:!0,maxLength:140,defaultValue:"Hello from chiselui!"}},l={render:c=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16,maxWidth:360},children:[e.jsx(n,{...c,size:"sm",label:"Small"}),e.jsx(n,{...c,size:"md",label:"Medium"}),e.jsx(n,{...c,size:"lg",label:"Large"})]})},i={args:{label:"Bio",disabled:!0,defaultValue:"This field is read-only."}};var d,u,m;a.parameters={...a.parameters,docs:{...(d=a.parameters)==null?void 0:d.docs,source:{originalSource:"{}",...(m=(u=a.parameters)==null?void 0:u.docs)==null?void 0:m.source}}};var p,g,h;r.parameters={...r.parameters,docs:{...(p=r.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    label: 'Message',
    defaultValue: 'Too short',
    error: 'Please write at least 20 characters.'
  }
}`,...(h=(g=r.parameters)==null?void 0:g.docs)==null?void 0:h.source}}};var b,f,x;s.parameters={...s.parameters,docs:{...(b=s.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    label: 'Feedback',
    hint: 'Markdown is supported.'
  }
}`,...(x=(f=s.parameters)==null?void 0:f.docs)==null?void 0:x.source}}};var z,T,w;o.parameters={...o.parameters,docs:{...(z=o.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    label: 'Notes',
    autoResize: true,
    placeholder: 'Start typing — the field grows with your content…'
  }
}`,...(w=(T=o.parameters)==null?void 0:T.docs)==null?void 0:w.source}}};var S,y,W;t.parameters={...t.parameters,docs:{...(S=t.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    label: 'Tweet',
    showCount: true,
    maxLength: 140,
    defaultValue: 'Hello from chiselui!'
  }
}`,...(W=(y=t.parameters)==null?void 0:y.docs)==null?void 0:W.source}}};var j,C,D;l.parameters={...l.parameters,docs:{...(j=l.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: args => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    maxWidth: 360
  }}>
      <Textarea {...args} size="sm" label="Small" />
      <Textarea {...args} size="md" label="Medium" />
      <Textarea {...args} size="lg" label="Large" />
    </div>
}`,...(D=(C=l.parameters)==null?void 0:C.docs)==null?void 0:D.source}}};var M,R,V;i.parameters={...i.parameters,docs:{...(M=i.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    label: 'Bio',
    disabled: true,
    defaultValue: 'This field is read-only.'
  }
}`,...(V=(R=i.parameters)==null?void 0:R.docs)==null?void 0:V.source}}};const B=["Default","WithError","WithHint","AutoResize","WithCounter","Sizes","Disabled"];export{o as AutoResize,a as Default,i as Disabled,l as Sizes,t as WithCounter,r as WithError,s as WithHint,B as __namedExportsOrder,v as default};
