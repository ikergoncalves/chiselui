import{j as e}from"./jsx-runtime-DFAAy_2V.js";import{r as M}from"./index-Bc2G9s8g.js";/* empty css              */function r({label:a,error:p,hint:m,leftAddon:u,rightAddon:h,size:U="md",id:B,className:C,disabled:f,...F}){const H=M.useId(),s=B??H,g=`${s}-error`,b=`${s}-hint`,l=!!p,R=l?g:m?b:void 0,L=["chs-field",`chs-field--${U}`,l&&"chs-field--error",f&&"chs-field--disabled",C].filter(Boolean).join(" ");return e.jsxs("div",{className:L,children:[a&&e.jsx("label",{htmlFor:s,className:"chs-field__label",children:a}),e.jsxs("div",{className:"chs-input",children:[u&&e.jsx("span",{className:"chs-input__addon chs-input__addon--left",children:u}),e.jsx("input",{id:s,className:"chs-input__control",disabled:f,...F,"aria-invalid":l||void 0,"aria-describedby":R}),h&&e.jsx("span",{className:"chs-input__addon chs-input__addon--right",children:h})]}),l?e.jsx("p",{id:g,className:"chs-field__error",role:"alert",children:p}):m?e.jsx("p",{id:b,className:"chs-field__hint",children:m}):null]})}r.displayName="Input";r.__docgenInfo={description:"Input — a labelled text field with optional hint, error and inline addons.\n\nAccessibility is wired automatically: the label is associated through a\n`useId`-generated id, `aria-invalid` is set while there is an error, and\n`aria-describedby` points at whichever message (error or hint) is on screen.",methods:[],displayName:"Input",props:{label:{required:!1,tsType:{name:"string"},description:"Field label, rendered above the control and linked via htmlFor/id."},error:{required:!1,tsType:{name:"string"},description:"Error message; turns the border danger and flips aria-invalid when set."},hint:{required:!1,tsType:{name:"string"},description:"Helper text shown below the field while there is no error."},leftAddon:{required:!1,tsType:{name:"ReactNode"},description:'Node rendered inside the field, before the input (icon, "$", etc.).'},rightAddon:{required:!1,tsType:{name:"ReactNode"},description:"Node rendered inside the field, after the input (unit, action, etc.)."},size:{required:!1,tsType:{name:"union",raw:"'sm' | 'md' | 'lg'",elements:[{name:"literal",value:"'sm'"},{name:"literal",value:"'md'"},{name:"literal",value:"'lg'"}]},description:"Control height, padding and font size. @default 'md'",defaultValue:{value:"'md'",computed:!1}}},composes:["Omit"]};const G={title:"Components/Input",component:r,tags:["autodocs"],args:{label:"Email",placeholder:"you@example.com"},argTypes:{size:{control:"inline-radio",options:["sm","md","lg"]},disabled:{control:"boolean"},leftAddon:{control:!1},rightAddon:{control:!1}}},t={},i={args:{label:"Email",defaultValue:"not-an-email",error:"Enter a valid email address."}},n={args:{label:"Password",type:"password",placeholder:"••••••••",hint:"Use at least 8 characters."}},o={args:{label:"Amount",leftAddon:"$",rightAddon:"USD",placeholder:"0.00"}},d={render:a=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16,maxWidth:320},children:[e.jsx(r,{...a,size:"sm",label:"Small"}),e.jsx(r,{...a,size:"md",label:"Medium"}),e.jsx(r,{...a,size:"lg",label:"Large"})]})},c={args:{label:"Email",disabled:!0,defaultValue:"you@example.com"}};var x,y,_;t.parameters={...t.parameters,docs:{...(x=t.parameters)==null?void 0:x.docs,source:{originalSource:"{}",...(_=(y=t.parameters)==null?void 0:y.docs)==null?void 0:_.source}}};var v,j,N;i.parameters={...i.parameters,docs:{...(v=i.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    label: 'Email',
    defaultValue: 'not-an-email',
    error: 'Enter a valid email address.'
  }
}`,...(N=(j=i.parameters)==null?void 0:j.docs)==null?void 0:N.source}}};var E,I,w;n.parameters={...n.parameters,docs:{...(E=n.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    label: 'Password',
    type: 'password',
    placeholder: '••••••••',
    hint: 'Use at least 8 characters.'
  }
}`,...(w=(I=n.parameters)==null?void 0:I.docs)==null?void 0:w.source}}};var S,z,A;o.parameters={...o.parameters,docs:{...(S=o.parameters)==null?void 0:S.docs,source:{originalSource:`{
  args: {
    label: 'Amount',
    leftAddon: '$',
    rightAddon: 'USD',
    placeholder: '0.00'
  }
}`,...(A=(z=o.parameters)==null?void 0:z.docs)==null?void 0:A.source}}};var D,W,T;d.parameters={...d.parameters,docs:{...(D=d.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: args => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    maxWidth: 320
  }}>\r
      <Input {...args} size="sm" label="Small" />\r
      <Input {...args} size="md" label="Medium" />\r
      <Input {...args} size="lg" label="Large" />\r
    </div>
}`,...(T=(W=d.parameters)==null?void 0:W.docs)==null?void 0:T.source}}};var q,$,V;c.parameters={...c.parameters,docs:{...(q=c.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    label: 'Email',
    disabled: true,
    defaultValue: 'you@example.com'
  }
}`,...(V=($=c.parameters)==null?void 0:$.docs)==null?void 0:V.source}}};const J=["Default","WithError","WithHint","WithAddons","Sizes","Disabled"];export{t as Default,c as Disabled,d as Sizes,o as WithAddons,i as WithError,n as WithHint,J as __namedExportsOrder,G as default};
