import{j as r}from"./jsx-runtime-DFAAy_2V.js";import{r as P}from"./index-Bc2G9s8g.js";import{S as a}from"./Switch-BxaGobgr.js";function o({checked:e=!1,...p}){const[s,m]=P.useState(e);return r.jsx(a,{...p,checked:s,onChange:m})}const B={title:"Components/Switch",component:a,tags:["autodocs"],args:{label:"Enable notifications"},argTypes:{size:{control:"inline-radio",options:["sm","md"]},labelPosition:{control:"inline-radio",options:["left","right"]},disabled:{control:"boolean"},onChange:{control:!1}}},l={render:e=>r.jsx(o,{...e})},t={render:e=>r.jsx(o,{...e,checked:!0})},c={render:e=>r.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[r.jsx(a,{...e,label:"Disabled, off",disabled:!0,checked:!1}),r.jsx(a,{...e,label:"Disabled, on",disabled:!0,checked:!0})]})},i={render:e=>r.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[r.jsx(o,{...e,size:"sm",label:"Small",checked:!0}),r.jsx(o,{...e,size:"md",label:"Medium",checked:!0})]})},d={args:{labelPosition:"left"},render:e=>r.jsx(o,{...e})},M=[{id:"wifi",label:"Wi-Fi"},{id:"bluetooth",label:"Bluetooth"},{id:"airplane",label:"Airplane mode"}];function O(){const[e,p]=P.useState({wifi:!0,bluetooth:!1,airplane:!1});return r.jsx("div",{style:{display:"flex",flexDirection:"column",gap:12,minWidth:200},children:M.map(s=>r.jsx(a,{label:s.label,checked:e[s.id]??!1,onChange:m=>p(T=>({...T,[s.id]:m}))},s.id))})}const n={render:()=>r.jsx(O,{})};var u,h,f;l.parameters={...l.parameters,docs:{...(u=l.parameters)==null?void 0:u.docs,source:{originalSource:`{
  render: args => <ControlledSwitch {...args} />
}`,...(f=(h=l.parameters)==null?void 0:h.docs)==null?void 0:f.source}}};var b,x,g;t.parameters={...t.parameters,docs:{...(b=t.parameters)==null?void 0:b.docs,source:{originalSource:`{
  render: args => <ControlledSwitch {...args} checked />
}`,...(g=(x=t.parameters)==null?void 0:x.docs)==null?void 0:g.source}}};var S,k,j;c.parameters={...c.parameters,docs:{...(S=c.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: args => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 12
  }}>
      <Switch {...args} label="Disabled, off" disabled checked={false} />
      <Switch {...args} label="Disabled, on" disabled checked />
    </div>
}`,...(j=(k=c.parameters)==null?void 0:k.docs)==null?void 0:j.source}}};var C,w,D;i.parameters={...i.parameters,docs:{...(C=i.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: args => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 12
  }}>
      <ControlledSwitch {...args} size="sm" label="Small" checked />
      <ControlledSwitch {...args} size="md" label="Medium" checked />
    </div>
}`,...(D=(w=i.parameters)==null?void 0:w.docs)==null?void 0:D.source}}};var y,v,z;d.parameters={...d.parameters,docs:{...(y=d.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    labelPosition: 'left'
  },
  render: args => <ControlledSwitch {...args} />
}`,...(z=(v=d.parameters)==null?void 0:v.docs)==null?void 0:z.source}}};var E,G,L;n.parameters={...n.parameters,docs:{...(E=n.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: () => <SwitchGroup />
}`,...(L=(G=n.parameters)==null?void 0:G.docs)==null?void 0:L.source}}};const F=["Default","Checked","Disabled","Sizes","LabelLeft","ControlledGroup"];export{t as Checked,n as ControlledGroup,l as Default,c as Disabled,d as LabelLeft,i as Sizes,F as __namedExportsOrder,B as default};
