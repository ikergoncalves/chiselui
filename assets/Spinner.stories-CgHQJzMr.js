import{j as e}from"./jsx-runtime-DFAAy_2V.js";import{S as s}from"./Spinner-BSpvfVml.js";import"./index-Bc2G9s8g.js";const v={title:"Components/Spinner",component:s,tags:["autodocs"],args:{size:"md",color:"primary",label:"Loading..."},argTypes:{size:{control:"inline-radio",options:["xs","sm","md","lg","xl"]},color:{control:"inline-radio",options:["primary","white","current"]},label:{control:"text"}}},a={},n={render:r=>e.jsxs("div",{style:{display:"flex",gap:24,alignItems:"center"},children:[e.jsx(s,{...r,size:"xs"}),e.jsx(s,{...r,size:"sm"}),e.jsx(s,{...r,size:"md"}),e.jsx(s,{...r,size:"lg"}),e.jsx(s,{...r,size:"xl"})]})},o={render:r=>e.jsxs("div",{style:{display:"flex",gap:24,alignItems:"center"},children:[e.jsx(s,{...r,color:"primary"}),e.jsx("span",{style:{display:"inline-flex",padding:16,borderRadius:8,background:"var(--color-neutral-900)"},children:e.jsx(s,{...r,color:"white"})}),e.jsx("span",{style:{display:"inline-flex",color:"var(--color-danger)"},children:e.jsx(s,{...r,color:"current"})})]})},i={args:{size:"lg",label:"Saving changes..."}};var l,t,c;a.parameters={...a.parameters,docs:{...(l=a.parameters)==null?void 0:l.docs,source:{originalSource:"{}",...(c=(t=a.parameters)==null?void 0:t.docs)==null?void 0:c.source}}};var p,d,m;n.parameters={...n.parameters,docs:{...(p=n.parameters)==null?void 0:p.docs,source:{originalSource:`{
  render: args => <div style={{
    display: 'flex',
    gap: 24,
    alignItems: 'center'
  }}>
      <Spinner {...args} size="xs" />
      <Spinner {...args} size="sm" />
      <Spinner {...args} size="md" />
      <Spinner {...args} size="lg" />
      <Spinner {...args} size="xl" />
    </div>
}`,...(m=(d=n.parameters)==null?void 0:d.docs)==null?void 0:m.source}}};var g,x,u;o.parameters={...o.parameters,docs:{...(g=o.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: args => <div style={{
    display: 'flex',
    gap: 24,
    alignItems: 'center'
  }}>
      <Spinner {...args} color="primary" />
      {/* \`white\` only reads against a dark surface. */}
      <span style={{
      display: 'inline-flex',
      padding: 16,
      borderRadius: 8,
      background: 'var(--color-neutral-900)'
    }}>
        <Spinner {...args} color="white" />
      </span>
      {/* \`current\` inherits the parent text color. */}
      <span style={{
      display: 'inline-flex',
      color: 'var(--color-danger)'
    }}>
        <Spinner {...args} color="current" />
      </span>
    </div>
}`,...(u=(x=o.parameters)==null?void 0:x.docs)==null?void 0:u.source}}};var y,S,z;i.parameters={...i.parameters,docs:{...(y=i.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    size: 'lg',
    label: 'Saving changes...'
  }
}`,...(z=(S=i.parameters)==null?void 0:S.docs)==null?void 0:z.source}}};const b=["Default","Sizes","Colors","WithLabel"];export{o as Colors,a as Default,n as Sizes,i as WithLabel,b as __namedExportsOrder,v as default};
