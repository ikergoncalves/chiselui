import{j as r}from"./jsx-runtime-DFAAy_2V.js";import{B as a}from"./Button-CTLW7U7A.js";import"./index-Bc2G9s8g.js";const W=()=>r.jsx("svg",{width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",children:r.jsx("path",{d:"M12 5v14M5 12h14",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})}),R=()=>r.jsx("svg",{width:"1em",height:"1em",viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",children:r.jsx("path",{d:"M5 12h14M13 6l6 6-6 6",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"})}),T={title:"Components/Button",component:a,tags:["autodocs"],args:{children:"Button"},argTypes:{variant:{control:"inline-radio",options:["primary","secondary","ghost","danger"]},size:{control:"inline-radio",options:["sm","md","lg"]},loading:{control:"boolean"},disabled:{control:"boolean"},leftIcon:{control:!1},rightIcon:{control:!1},onClick:{action:"clicked"}}},s={args:{variant:"primary"}},t={args:{variant:"secondary"}},n={args:{variant:"ghost"}},o={args:{variant:"danger"}},i={render:e=>r.jsxs("div",{style:{display:"flex",gap:12,alignItems:"center"},children:[r.jsx(a,{...e,size:"sm",children:"Small"}),r.jsx(a,{...e,size:"md",children:"Medium"}),r.jsx(a,{...e,size:"lg",children:"Large"})]})},d={args:{variant:"primary",loading:!0,children:"Saving…"}},c={render:e=>r.jsxs("div",{style:{display:"flex",gap:12,alignItems:"center"},children:[r.jsx(a,{...e,leftIcon:r.jsx(W,{}),children:"Add item"}),r.jsx(a,{...e,variant:"secondary",rightIcon:r.jsx(R,{}),children:"Continue"})]})},l={render:e=>r.jsxs("div",{style:{display:"flex",gap:12,alignItems:"center"},children:[r.jsx(a,{...e,variant:"primary",disabled:!0,children:"Primary"}),r.jsx(a,{...e,variant:"secondary",disabled:!0,children:"Secondary"}),r.jsx(a,{...e,variant:"ghost",disabled:!0,children:"Ghost"}),r.jsx(a,{...e,variant:"danger",disabled:!0,children:"Danger"})]})};var m,g,u;s.parameters={...s.parameters,docs:{...(m=s.parameters)==null?void 0:m.docs,source:{originalSource:`{
  args: {
    variant: 'primary'
  }
}`,...(u=(g=s.parameters)==null?void 0:g.docs)==null?void 0:u.source}}};var p,h,v;t.parameters={...t.parameters,docs:{...(p=t.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    variant: 'secondary'
  }
}`,...(v=(h=t.parameters)==null?void 0:h.docs)==null?void 0:v.source}}};var y,x,B;n.parameters={...n.parameters,docs:{...(y=n.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    variant: 'ghost'
  }
}`,...(B=(x=n.parameters)==null?void 0:x.docs)==null?void 0:B.source}}};var j,S,I;o.parameters={...o.parameters,docs:{...(j=o.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    variant: 'danger'
  }
}`,...(I=(S=o.parameters)==null?void 0:S.docs)==null?void 0:I.source}}};var f,b,k;i.parameters={...i.parameters,docs:{...(f=i.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: args => <div style={{
    display: 'flex',
    gap: 12,
    alignItems: 'center'
  }}>
      <Button {...args} size="sm">
        Small
      </Button>
      <Button {...args} size="md">
        Medium
      </Button>
      <Button {...args} size="lg">
        Large
      </Button>
    </div>
}`,...(k=(b=i.parameters)==null?void 0:b.docs)==null?void 0:k.source}}};var z,L,w;d.parameters={...d.parameters,docs:{...(z=d.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    variant: 'primary',
    loading: true,
    children: 'Saving…'
  }
}`,...(w=(L=d.parameters)==null?void 0:L.docs)==null?void 0:w.source}}};var C,D,M;c.parameters={...c.parameters,docs:{...(C=c.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: args => <div style={{
    display: 'flex',
    gap: 12,
    alignItems: 'center'
  }}>
      <Button {...args} leftIcon={<PlusIcon />}>
        Add item
      </Button>
      <Button {...args} variant="secondary" rightIcon={<ArrowRightIcon />}>
        Continue
      </Button>
    </div>
}`,...(M=(D=c.parameters)==null?void 0:D.docs)==null?void 0:M.source}}};var P,A,G;l.parameters={...l.parameters,docs:{...(P=l.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: args => <div style={{
    display: 'flex',
    gap: 12,
    alignItems: 'center'
  }}>
      <Button {...args} variant="primary" disabled>
        Primary
      </Button>
      <Button {...args} variant="secondary" disabled>
        Secondary
      </Button>
      <Button {...args} variant="ghost" disabled>
        Ghost
      </Button>
      <Button {...args} variant="danger" disabled>
        Danger
      </Button>
    </div>
}`,...(G=(A=l.parameters)==null?void 0:A.docs)==null?void 0:G.source}}};const q=["Primary","Secondary","Ghost","Danger","Sizes","Loading","WithIcons","DisabledState"];export{o as Danger,l as DisabledState,n as Ghost,d as Loading,s as Primary,t as Secondary,i as Sizes,c as WithIcons,q as __namedExportsOrder,T as default};
