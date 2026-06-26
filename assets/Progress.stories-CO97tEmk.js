import{j as r}from"./jsx-runtime-DFAAy_2V.js";import{P as a}from"./Progress-DB27Tn7y.js";import"./index-Bc2G9s8g.js";const O={title:"Components/Progress",component:a,tags:["autodocs"],args:{value:60,variant:"linear",size:"md",color:"primary",showLabel:!1,animated:!1},argTypes:{value:{control:{type:"range",min:0,max:100,step:1}},variant:{control:"inline-radio",options:["linear","circular"]},size:{control:"inline-radio",options:["sm","md","lg"]},color:{control:"inline-radio",options:["primary","success","warning","danger"]},showLabel:{control:"boolean"},animated:{control:"boolean"}},decorators:[e=>r.jsx("div",{style:{width:320},children:r.jsx(e,{})})]},s={args:{value:60}},i={args:{variant:"circular",value:75}},o={render:e=>r.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:24},children:[r.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[r.jsx(a,{...e,variant:"linear",size:"sm"}),r.jsx(a,{...e,variant:"linear",size:"md"}),r.jsx(a,{...e,variant:"linear",size:"lg"})]}),r.jsxs("div",{style:{display:"flex",gap:24,alignItems:"center"},children:[r.jsx(a,{...e,variant:"circular",size:"sm"}),r.jsx(a,{...e,variant:"circular",size:"md"}),r.jsx(a,{...e,variant:"circular",size:"lg"})]})]})},n={render:e=>r.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[r.jsx(a,{...e,color:"primary"}),r.jsx(a,{...e,color:"success"}),r.jsx(a,{...e,color:"warning"}),r.jsx(a,{...e,color:"danger"})]})},l={args:{showLabel:!0,value:42}},t={args:{variant:"linear",value:60,animated:!0}},c={args:{variant:"linear",value:0,animated:!0}};var d,m,u;s.parameters={...s.parameters,docs:{...(d=s.parameters)==null?void 0:d.docs,source:{originalSource:`{
  args: {
    value: 60
  }
}`,...(u=(m=s.parameters)==null?void 0:m.docs)==null?void 0:u.source}}};var p,g,v;i.parameters={...i.parameters,docs:{...(p=i.parameters)==null?void 0:p.docs,source:{originalSource:`{
  args: {
    variant: 'circular',
    value: 75
  }
}`,...(v=(g=i.parameters)==null?void 0:g.docs)==null?void 0:v.source}}};var x,y,f;o.parameters={...o.parameters,docs:{...(x=o.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: args => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 24
  }}>
      <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }}>
        <Progress {...args} variant="linear" size="sm" />
        <Progress {...args} variant="linear" size="md" />
        <Progress {...args} variant="linear" size="lg" />
      </div>
      <div style={{
      display: 'flex',
      gap: 24,
      alignItems: 'center'
    }}>
        <Progress {...args} variant="circular" size="sm" />
        <Progress {...args} variant="circular" size="md" />
        <Progress {...args} variant="circular" size="lg" />
      </div>
    </div>
}`,...(f=(y=o.parameters)==null?void 0:y.docs)==null?void 0:f.source}}};var j,z,P;n.parameters={...n.parameters,docs:{...(j=n.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: args => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 12
  }}>
      <Progress {...args} color="primary" />
      <Progress {...args} color="success" />
      <Progress {...args} color="warning" />
      <Progress {...args} color="danger" />
    </div>
}`,...(P=(z=n.parameters)==null?void 0:z.docs)==null?void 0:P.source}}};var h,S,b;l.parameters={...l.parameters,docs:{...(h=l.parameters)==null?void 0:h.docs,source:{originalSource:`{
  args: {
    showLabel: true,
    value: 42
  }
}`,...(b=(S=l.parameters)==null?void 0:S.docs)==null?void 0:b.source}}};var w,D,L;t.parameters={...t.parameters,docs:{...(w=t.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    variant: 'linear',
    value: 60,
    animated: true
  }
}`,...(L=(D=t.parameters)==null?void 0:D.docs)==null?void 0:L.source}}};var C,I,A;c.parameters={...c.parameters,docs:{...(C=c.parameters)==null?void 0:C.docs,source:{originalSource:`{
  args: {
    variant: 'linear',
    value: 0,
    animated: true
  }
}`,...(A=(I=c.parameters)==null?void 0:I.docs)==null?void 0:A.source}}};const R=["Default","Circular","Sizes","Colors","WithLabel","Animated","Indeterminate"];export{t as Animated,i as Circular,n as Colors,s as Default,c as Indeterminate,o as Sizes,l as WithLabel,R as __namedExportsOrder,O as default};
