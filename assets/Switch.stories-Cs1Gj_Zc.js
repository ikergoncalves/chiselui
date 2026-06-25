import{j as a}from"./jsx-runtime-DFAAy_2V.js";import{r as p}from"./index-Bc2G9s8g.js";function t({label:e,checked:r=!1,onChange:s,disabled:l=!1,size:m="md",labelPosition:G="right",id:I}){const L=p.useId(),P=I??L,V=["chs-switch",`chs-switch--${m}`,G==="left"&&"chs-switch--label-left"].filter(Boolean).join(" ");return a.jsxs("label",{className:V,children:[a.jsx("input",{id:P,type:"checkbox",role:"switch",className:"chs-switch__input",checked:r,disabled:l,onChange:B=>s==null?void 0:s(B.target.checked),"aria-checked":r}),a.jsx("span",{className:"chs-switch__track","aria-hidden":"true",children:a.jsx("span",{className:"chs-switch__thumb"})}),e&&a.jsx("span",{className:"chs-switch__label",children:e})]})}t.displayName="Switch";t.__docgenInfo={description:'Switch — an on/off toggle built on a visually-hidden native checkbox.\n\nThe input carries `role="switch"` so assistive tech announces it as a switch\nrather than a checkbox; the visible track + thumb are decorative and the thumb\nslides via a CSS `transform` transition. `aria-checked` is set explicitly so\nthe state is reported the same way across browsers and tests.',methods:[],displayName:"Switch",props:{label:{required:!1,tsType:{name:"string"},description:"Text shown beside the track; the whole label is clickable."},checked:{required:!1,tsType:{name:"boolean"},description:"Controlled on/off state. @default false",defaultValue:{value:"false",computed:!1}},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(checked: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"checked"}],return:{name:"void"}}},description:"Fired with the next checked value whenever the user toggles the switch."},disabled:{required:!1,tsType:{name:"boolean"},description:"Block interaction and dim the control. @default false",defaultValue:{value:"false",computed:!1}},size:{required:!1,tsType:{name:"union",raw:"'sm' | 'md'",elements:[{name:"literal",value:"'sm'"},{name:"literal",value:"'md'"}]},description:"Track and thumb size. @default 'md'",defaultValue:{value:"'md'",computed:!1}},labelPosition:{required:!1,tsType:{name:"union",raw:"'left' | 'right'",elements:[{name:"literal",value:"'left'"},{name:"literal",value:"'right'"}]},description:"Which side of the track the label sits on. @default 'right'",defaultValue:{value:"'right'",computed:!1}},id:{required:!1,tsType:{name:"string"},description:"Caller-supplied id; falls back to a generated, stable one."}}};function i({checked:e=!1,...r}){const[s,l]=p.useState(e);return a.jsx(t,{...r,checked:s,onChange:l})}const A={title:"Components/Switch",component:t,tags:["autodocs"],args:{label:"Enable notifications"},argTypes:{size:{control:"inline-radio",options:["sm","md"]},labelPosition:{control:"inline-radio",options:["left","right"]},disabled:{control:"boolean"},onChange:{control:!1}}},o={render:e=>a.jsx(i,{...e})},c={render:e=>a.jsx(i,{...e,checked:!0})},n={render:e=>a.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[a.jsx(t,{...e,label:"Disabled, off",disabled:!0,checked:!1}),a.jsx(t,{...e,label:"Disabled, on",disabled:!0,checked:!0})]})},d={render:e=>a.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[a.jsx(i,{...e,size:"sm",label:"Small",checked:!0}),a.jsx(i,{...e,size:"md",label:"Medium",checked:!0})]})},u={args:{labelPosition:"left"},render:e=>a.jsx(i,{...e})},W=[{id:"wifi",label:"Wi-Fi"},{id:"bluetooth",label:"Bluetooth"},{id:"airplane",label:"Airplane mode"}];function F(){const[e,r]=p.useState({wifi:!0,bluetooth:!1,airplane:!1});return a.jsx("div",{style:{display:"flex",flexDirection:"column",gap:12,minWidth:200},children:W.map(s=>a.jsx(t,{label:s.label,checked:e[s.id]??!1,onChange:l=>r(m=>({...m,[s.id]:l}))},s.id))})}const h={render:()=>a.jsx(F,{})};var f,b,g;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: args => <ControlledSwitch {...args} />
}`,...(g=(b=o.parameters)==null?void 0:b.docs)==null?void 0:g.source}}};var x,w,k;c.parameters={...c.parameters,docs:{...(x=c.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: args => <ControlledSwitch {...args} checked />
}`,...(k=(w=c.parameters)==null?void 0:w.docs)==null?void 0:k.source}}};var S,y,v;n.parameters={...n.parameters,docs:{...(S=n.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: args => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 12
  }}>
      <Switch {...args} label="Disabled, off" disabled checked={false} />
      <Switch {...args} label="Disabled, on" disabled checked />
    </div>
}`,...(v=(y=n.parameters)==null?void 0:y.docs)==null?void 0:v.source}}};var j,C,D;d.parameters={...d.parameters,docs:{...(j=d.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: args => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 12
  }}>
      <ControlledSwitch {...args} size="sm" label="Small" checked />
      <ControlledSwitch {...args} size="md" label="Medium" checked />
    </div>
}`,...(D=(C=d.parameters)==null?void 0:C.docs)==null?void 0:D.source}}};var T,_,z;u.parameters={...u.parameters,docs:{...(T=u.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    labelPosition: 'left'
  },
  render: args => <ControlledSwitch {...args} />
}`,...(z=(_=u.parameters)==null?void 0:_.docs)==null?void 0:z.source}}};var N,q,E;h.parameters={...h.parameters,docs:{...(N=h.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => <SwitchGroup />
}`,...(E=(q=h.parameters)==null?void 0:q.docs)==null?void 0:E.source}}};const R=["Default","Checked","Disabled","Sizes","LabelLeft","ControlledGroup"];export{c as Checked,h as ControlledGroup,o as Default,n as Disabled,u as LabelLeft,d as Sizes,R as __namedExportsOrder,A as default};
