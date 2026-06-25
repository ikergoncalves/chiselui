import{j as e}from"./jsx-runtime-DFAAy_2V.js";import{r as i}from"./index-Bc2G9s8g.js";/* empty css              */function t({label:r,checked:l=!1,onChange:o,indeterminate:n=!1,disabled:d=!1,error:s,hint:a,size:h="md",id:C}){const Q=i.useId(),j=C??Q,S=`${j}-error`,w=`${j}-hint`,v=i.useRef(null),u=!!s,X=u?S:a?w:void 0;i.useEffect(()=>{v.current&&(v.current.indeterminate=n)},[n]);const Z=["chs-field",`chs-field--${h}`,u&&"chs-field--error",d&&"chs-field--disabled"].filter(Boolean).join(" ");return e.jsxs("div",{className:Z,children:[e.jsxs("label",{className:"chs-checkbox",children:[e.jsx("input",{ref:v,id:j,type:"checkbox",className:"chs-checkbox__input",checked:l,disabled:d,onChange:ee=>o==null?void 0:o(ee.target.checked),"aria-checked":n?"mixed":void 0,"aria-invalid":u||void 0,"aria-describedby":X}),e.jsxs("span",{className:"chs-checkbox__box","aria-hidden":"true",children:[e.jsx("svg",{className:"chs-checkbox__icon chs-checkbox__check",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:3,strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("polyline",{points:"20 6 9 17 4 12"})}),e.jsx("svg",{className:"chs-checkbox__icon chs-checkbox__dash",viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:3,strokeLinecap:"round",strokeLinejoin:"round",children:e.jsx("line",{x1:"5",y1:"12",x2:"19",y2:"12"})})]}),r&&e.jsx("span",{className:"chs-checkbox__label",children:r})]}),u?e.jsx("p",{id:S,className:"chs-field__error",role:"alert",children:s}):a?e.jsx("p",{id:w,className:"chs-field__hint",children:a}):null]})}t.displayName="Checkbox";t.__docgenInfo={description:'Checkbox — a tri-state checkbox built on a visually-hidden native input.\n\nThe real `<input type="checkbox">` stays in the DOM (and the a11y tree) for\nfree keyboard, focus and form behaviour; a sibling box renders the tick or\ndash. `indeterminate` has no HTML attribute, so it is synced through a ref and\nsurfaced to assistive tech as `aria-checked="mixed"`.',methods:[],displayName:"Checkbox",props:{label:{required:!1,tsType:{name:"string"},description:"Text shown next to the box; the whole label is clickable."},checked:{required:!1,tsType:{name:"boolean"},description:"Controlled checked state. @default false",defaultValue:{value:"false",computed:!1}},onChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(checked: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"checked"}],return:{name:"void"}}},description:"Fired with the next checked value whenever the user toggles the box."},indeterminate:{required:!1,tsType:{name:"boolean"},description:'Render the third, "partially selected" state (a dash). @default false',defaultValue:{value:"false",computed:!1}},disabled:{required:!1,tsType:{name:"boolean"},description:"Block interaction and dim the control. @default false",defaultValue:{value:"false",computed:!1}},error:{required:!1,tsType:{name:"string"},description:"Error message; tints the box danger and flips aria-invalid when set."},hint:{required:!1,tsType:{name:"string"},description:"Helper text shown below the control while there is no error."},size:{required:!1,tsType:{name:"union",raw:"'sm' | 'md'",elements:[{name:"literal",value:"'sm'"},{name:"literal",value:"'md'"}]},description:"Box size. @default 'md'",defaultValue:{value:"'md'",computed:!1}},id:{required:!1,tsType:{name:"string"},description:"Caller-supplied id; falls back to a generated, stable one."}}};function c({checked:r=!1,...l}){const[o,n]=i.useState(r);return e.jsx(t,{...l,checked:o,onChange:n})}const te={title:"Components/Checkbox",component:t,tags:["autodocs"],args:{label:"Accept terms and conditions"},argTypes:{size:{control:"inline-radio",options:["sm","md"]},disabled:{control:"boolean"},indeterminate:{control:"boolean"},onChange:{control:!1}}},p={render:r=>e.jsx(c,{...r})},m={render:r=>e.jsx(c,{...r,checked:!0})},b={args:{indeterminate:!0},render:r=>e.jsx(c,{...r})},x={args:{label:"I agree to the policy",error:"You must accept before continuing."},render:r=>e.jsx(c,{...r})},f={args:{label:"Subscribe to the newsletter",hint:"We send at most one email per week."},render:r=>e.jsx(c,{...r})},k={args:{disabled:!0},render:r=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[e.jsx(t,{...r,label:"Disabled, unchecked",checked:!1}),e.jsx(t,{...r,label:"Disabled, checked",checked:!0})]})},g={render:r=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[e.jsx(c,{...r,size:"sm",label:"Small",checked:!0}),e.jsx(c,{...r,size:"md",label:"Medium",checked:!0})]})},_=[{id:"apple",label:"Apple"},{id:"banana",label:"Banana"},{id:"cherry",label:"Cherry"}];function re(){const[r,l]=i.useState(["apple"]),o=r.length===_.length,n=r.length>0&&!o,d=(s,a)=>l(h=>a?[...h,s]:h.filter(C=>C!==s));return e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:8},children:[e.jsx(t,{label:"Select all fruit",checked:o,indeterminate:n,onChange:s=>l(s?_.map(a=>a.id):[])}),e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:8,paddingInlineStart:24},children:_.map(s=>e.jsx(t,{label:s.label,checked:r.includes(s.id),onChange:a=>d(s.id,a)},s.id))})]})}const y={render:()=>e.jsx(re,{})};var D,T,N;p.parameters={...p.parameters,docs:{...(D=p.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: args => <ControlledCheckbox {...args} />
}`,...(N=(T=p.parameters)==null?void 0:T.docs)==null?void 0:N.source}}};var I,q,z;m.parameters={...m.parameters,docs:{...(I=m.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: args => <ControlledCheckbox {...args} checked />
}`,...(z=(q=m.parameters)==null?void 0:q.docs)==null?void 0:z.source}}};var B,E,W;b.parameters={...b.parameters,docs:{...(B=b.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    indeterminate: true
  },
  render: args => <ControlledCheckbox {...args} />
}`,...(W=(E=b.parameters)==null?void 0:E.docs)==null?void 0:W.source}}};var L,R,G;x.parameters={...x.parameters,docs:{...(L=x.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    label: 'I agree to the policy',
    error: 'You must accept before continuing.'
  },
  render: args => <ControlledCheckbox {...args} />
}`,...(G=(R=x.parameters)==null?void 0:R.docs)==null?void 0:G.source}}};var H,M,V;f.parameters={...f.parameters,docs:{...(H=f.parameters)==null?void 0:H.docs,source:{originalSource:`{
  args: {
    label: 'Subscribe to the newsletter',
    hint: 'We send at most one email per week.'
  },
  render: args => <ControlledCheckbox {...args} />
}`,...(V=(M=f.parameters)==null?void 0:M.docs)==null?void 0:V.source}}};var $,A,F;k.parameters={...k.parameters,docs:{...($=k.parameters)==null?void 0:$.docs,source:{originalSource:`{
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
}`,...(F=(A=k.parameters)==null?void 0:A.docs)==null?void 0:F.source}}};var O,Y,U;g.parameters={...g.parameters,docs:{...(O=g.parameters)==null?void 0:O.docs,source:{originalSource:`{
  render: args => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 12
  }}>
      <ControlledCheckbox {...args} size="sm" label="Small" checked />
      <ControlledCheckbox {...args} size="md" label="Medium" checked />
    </div>
}`,...(U=(Y=g.parameters)==null?void 0:Y.docs)==null?void 0:U.source}}};var J,K,P;y.parameters={...y.parameters,docs:{...(J=y.parameters)==null?void 0:J.docs,source:{originalSource:`{
  render: () => <CheckboxGroup />
}`,...(P=(K=y.parameters)==null?void 0:K.docs)==null?void 0:P.source}}};const ne=["Default","Checked","Indeterminate","WithError","WithHint","Disabled","Sizes","Group"];export{m as Checked,p as Default,k as Disabled,y as Group,b as Indeterminate,g as Sizes,x as WithError,f as WithHint,ne as __namedExportsOrder,te as default};
