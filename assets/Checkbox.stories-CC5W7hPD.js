import{j as r}from"./jsx-runtime-DFAAy_2V.js";import{r as q}from"./index-Bc2G9s8g.js";import{C as o}from"./Checkbox-DGvGBRf1.js";/* empty css              */function a({checked:e=!1,...c}){const[n,b]=q.useState(e);return r.jsx(o,{...c,checked:n,onChange:b})}const X={title:"Components/Checkbox",component:o,tags:["autodocs"],args:{label:"Accept terms and conditions"},argTypes:{size:{control:"inline-radio",options:["sm","md"]},disabled:{control:"boolean"},indeterminate:{control:"boolean"},onChange:{control:!1}}},l={render:e=>r.jsx(a,{...e})},d={render:e=>r.jsx(a,{...e,checked:!0})},i={args:{indeterminate:!0},render:e=>r.jsx(a,{...e})},m={args:{label:"I agree to the policy",error:"You must accept before continuing."},render:e=>r.jsx(a,{...e})},p={args:{label:"Subscribe to the newsletter",hint:"We send at most one email per week."},render:e=>r.jsx(a,{...e})},u={args:{disabled:!0},render:e=>r.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[r.jsx(o,{...e,label:"Disabled, unchecked",checked:!1}),r.jsx(o,{...e,label:"Disabled, checked",checked:!0})]})},h={render:e=>r.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[r.jsx(a,{...e,size:"sm",label:"Small",checked:!0}),r.jsx(a,{...e,size:"md",label:"Medium",checked:!0})]})},x=[{id:"apple",label:"Apple"},{id:"banana",label:"Banana"},{id:"cherry",label:"Cherry"}];function L(){const[e,c]=q.useState(["apple"]),n=e.length===x.length,b=e.length>0&&!n,J=(s,t)=>c(k=>t?[...k,s]:k.filter(K=>K!==s));return r.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:8},children:[r.jsx(o,{label:"Select all fruit",checked:n,indeterminate:b,onChange:s=>c(s?x.map(t=>t.id):[])}),r.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8,paddingInlineStart:24},children:x.map(s=>r.jsx(o,{label:s.label,checked:e.includes(s.id),onChange:t=>J(s.id,t)},s.id))})]})}const g={render:()=>r.jsx(L,{})};var C,f,S;l.parameters={...l.parameters,docs:{...(C=l.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: args => <ControlledCheckbox {...args} />
}`,...(S=(f=l.parameters)==null?void 0:f.docs)==null?void 0:S.source}}};var j,y,D;d.parameters={...d.parameters,docs:{...(j=d.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: args => <ControlledCheckbox {...args} checked />
}`,...(D=(y=d.parameters)==null?void 0:y.docs)==null?void 0:D.source}}};var v,z,I;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    indeterminate: true
  },
  render: args => <ControlledCheckbox {...args} />
}`,...(I=(z=i.parameters)==null?void 0:z.docs)==null?void 0:I.source}}};var W,E,w;m.parameters={...m.parameters,docs:{...(W=m.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    label: 'I agree to the policy',
    error: 'You must accept before continuing.'
  },
  render: args => <ControlledCheckbox {...args} />
}`,...(w=(E=m.parameters)==null?void 0:E.docs)==null?void 0:w.source}}};var G,A,H;p.parameters={...p.parameters,docs:{...(G=p.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    label: 'Subscribe to the newsletter',
    hint: 'We send at most one email per week.'
  },
  render: args => <ControlledCheckbox {...args} />
}`,...(H=(A=p.parameters)==null?void 0:A.docs)==null?void 0:H.source}}};var M,R,T;u.parameters={...u.parameters,docs:{...(M=u.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    disabled: true
  },
  render: args => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 12
  }}>
      <Checkbox {...args} label="Disabled, unchecked" checked={false} />
      <Checkbox {...args} label="Disabled, checked" checked />
    </div>
}`,...(T=(R=u.parameters)==null?void 0:R.docs)==null?void 0:T.source}}};var Y,_,B;h.parameters={...h.parameters,docs:{...(Y=h.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  render: args => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 12
  }}>
      <ControlledCheckbox {...args} size="sm" label="Small" checked />
      <ControlledCheckbox {...args} size="md" label="Medium" checked />
    </div>
}`,...(B=(_=h.parameters)==null?void 0:_.docs)==null?void 0:B.source}}};var F,O,U;g.parameters={...g.parameters,docs:{...(F=g.parameters)==null?void 0:F.docs,source:{originalSource:`{
  render: () => <CheckboxGroup />
}`,...(U=(O=g.parameters)==null?void 0:O.docs)==null?void 0:U.source}}};const Z=["Default","Checked","Indeterminate","WithError","WithHint","Disabled","Sizes","Group"];export{d as Checked,l as Default,u as Disabled,g as Group,i as Indeterminate,h as Sizes,m as WithError,p as WithHint,Z as __namedExportsOrder,X as default};
