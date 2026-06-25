import{j as a}from"./jsx-runtime-DFAAy_2V.js";import{B as e}from"./Badge-3fBGSY6l.js";import"./index-Bc2G9s8g.js";const z={title:"Components/Badge",component:e,tags:["autodocs"],args:{children:"Badge"},argTypes:{variant:{control:"inline-radio",options:["default","success","warning","danger","info"]},size:{control:"inline-radio",options:["sm","md"]},dot:{control:"boolean"}}},n={args:{variant:"default"}},s={args:{variant:"success",children:"Success"}},t={args:{variant:"warning",children:"Warning"}},i={args:{variant:"danger",children:"Danger"}},c={args:{variant:"info",children:"Info"}},o={render:r=>a.jsxs("div",{style:{display:"flex",gap:12,alignItems:"center",flexWrap:"wrap"},children:[a.jsx(e,{...r,variant:"default",children:"Default"}),a.jsx(e,{...r,variant:"success",children:"Success"}),a.jsx(e,{...r,variant:"warning",children:"Warning"}),a.jsx(e,{...r,variant:"danger",children:"Danger"}),a.jsx(e,{...r,variant:"info",children:"Info"})]})},d={render:r=>a.jsxs("div",{style:{display:"flex",gap:12,alignItems:"center",flexWrap:"wrap"},children:[a.jsx(e,{...r,variant:"success",dot:!0,children:"Active"}),a.jsx(e,{...r,variant:"warning",dot:!0,children:"Pending"}),a.jsx(e,{...r,variant:"danger",dot:!0,children:"Failed"}),a.jsx(e,{...r,variant:"info",dot:!0,children:"Syncing"})]})};var g,l,p;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
  args: {
    variant: 'default'
  }
}`,...(p=(l=n.parameters)==null?void 0:l.docs)==null?void 0:p.source}}};var u,m,v;s.parameters={...s.parameters,docs:{...(u=s.parameters)==null?void 0:u.docs,source:{originalSource:`{
  args: {
    variant: 'success',
    children: 'Success'
  }
}`,...(v=(m=s.parameters)==null?void 0:m.docs)==null?void 0:v.source}}};var f,x,h;t.parameters={...t.parameters,docs:{...(f=t.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    variant: 'warning',
    children: 'Warning'
  }
}`,...(h=(x=t.parameters)==null?void 0:x.docs)==null?void 0:h.source}}};var B,S,j;i.parameters={...i.parameters,docs:{...(B=i.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    variant: 'danger',
    children: 'Danger'
  }
}`,...(j=(S=i.parameters)==null?void 0:S.docs)==null?void 0:j.source}}};var D,W,w;c.parameters={...c.parameters,docs:{...(D=c.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    variant: 'info',
    children: 'Info'
  }
}`,...(w=(W=c.parameters)==null?void 0:W.docs)==null?void 0:w.source}}};var y,I,A;o.parameters={...o.parameters,docs:{...(y=o.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: args => <div style={{
    display: 'flex',
    gap: 12,
    alignItems: 'center',
    flexWrap: 'wrap'
  }}>
      <Badge {...args} variant="default">
        Default
      </Badge>
      <Badge {...args} variant="success">
        Success
      </Badge>
      <Badge {...args} variant="warning">
        Warning
      </Badge>
      <Badge {...args} variant="danger">
        Danger
      </Badge>
      <Badge {...args} variant="info">
        Info
      </Badge>
    </div>
}`,...(A=(I=o.parameters)==null?void 0:I.docs)==null?void 0:A.source}}};var E,F,P;d.parameters={...d.parameters,docs:{...(E=d.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: args => <div style={{
    display: 'flex',
    gap: 12,
    alignItems: 'center',
    flexWrap: 'wrap'
  }}>
      <Badge {...args} variant="success" dot>
        Active
      </Badge>
      <Badge {...args} variant="warning" dot>
        Pending
      </Badge>
      <Badge {...args} variant="danger" dot>
        Failed
      </Badge>
      <Badge {...args} variant="info" dot>
        Syncing
      </Badge>
    </div>
}`,...(P=(F=d.parameters)==null?void 0:F.docs)==null?void 0:P.source}}};const C=["Default","Success","Warning","Danger","Info","AllVariants","WithDot"];export{o as AllVariants,i as Danger,n as Default,c as Info,s as Success,t as Warning,d as WithDot,C as __namedExportsOrder,z as default};
