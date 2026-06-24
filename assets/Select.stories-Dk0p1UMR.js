import{j as e}from"./jsx-runtime-DFAAy_2V.js";import{r as A}from"./index-Bc2G9s8g.js";/* empty css              */function a({label:r,options:k,error:u,placeholder:c,size:W="md",id:q,className:I,disabled:p,value:h,defaultValue:P,...B}){const F=A.useId(),m=q??F,b=`${m}-error`,s=!!u,O=["chs-field",`chs-field--${W}`,s&&"chs-field--error",p&&"chs-field--disabled",I].filter(Boolean).join(" "),V=h!==void 0?{value:h}:{defaultValue:P??(c!==void 0?"":void 0)};return e.jsxs("div",{className:O,children:[r&&e.jsx("label",{htmlFor:m,className:"chs-field__label",children:r}),e.jsxs("select",{id:m,className:"chs-input chs-select",disabled:p,...V,...B,"aria-invalid":s||void 0,"aria-describedby":s?b:void 0,children:[c!==void 0&&e.jsx("option",{value:"",disabled:!0,children:c}),k.map(l=>e.jsx("option",{value:l.value,disabled:l.disabled,children:l.label},l.value))]}),s&&e.jsx("p",{id:b,className:"chs-field__error",role:"alert",children:u})]})}a.displayName="Select";a.__docgenInfo={description:"Select — a labelled wrapper around the native `<select>`.\n\nBuilt on the real element (not a custom dropdown) so keyboard, screen-reader\nand mobile behaviour come for free. Accessibility mirrors Input: id-linked\nlabel, `aria-invalid` and `aria-describedby` driven by the error state.",methods:[],displayName:"Select",props:{label:{required:!1,tsType:{name:"string"},description:"Field label, rendered above the control and linked via htmlFor/id."},options:{required:!0,tsType:{name:"Array",elements:[{name:"SelectOption"}],raw:"SelectOption[]"},description:"The selectable options."},error:{required:!1,tsType:{name:"string"},description:"Error message; turns the border danger and flips aria-invalid when set."},placeholder:{required:!1,tsType:{name:"string"},description:"Greyed, non-selectable first option shown when nothing is chosen."},size:{required:!1,tsType:{name:"union",raw:"'sm' | 'md' | 'lg'",elements:[{name:"literal",value:"'sm'"},{name:"literal",value:"'md'"},{name:"literal",value:"'lg'"}]},description:"Control height, padding and font size. @default 'md'",defaultValue:{value:"'md'",computed:!1}}},composes:["Omit"]};const L=[{value:"apple",label:"Apple"},{value:"banana",label:"Banana"},{value:"cherry",label:"Cherry"},{value:"durian",label:"Durian (out of stock)",disabled:!0}],H={title:"Components/Select",component:a,tags:["autodocs"],args:{label:"Favourite fruit",options:L},argTypes:{size:{control:"inline-radio",options:["sm","md","lg"]},disabled:{control:"boolean"},options:{control:!1}}},o={},i={args:{error:"Please pick a fruit."}},t={args:{placeholder:"Choose a fruit…"}},n={args:{disabled:!0,defaultValue:"banana"}},d={render:r=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16,maxWidth:320},children:[e.jsx(a,{...r,size:"sm",label:"Small"}),e.jsx(a,{...r,size:"md",label:"Medium"}),e.jsx(a,{...r,size:"lg",label:"Large"})]})};var f,g,v;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:"{}",...(v=(g=o.parameters)==null?void 0:g.docs)==null?void 0:v.source}}};var x,y,S;i.parameters={...i.parameters,docs:{...(x=i.parameters)==null?void 0:x.docs,source:{originalSource:`{
  args: {
    error: 'Please pick a fruit.'
  }
}`,...(S=(y=i.parameters)==null?void 0:y.docs)==null?void 0:S.source}}};var j,z,C;t.parameters={...t.parameters,docs:{...(j=t.parameters)==null?void 0:j.docs,source:{originalSource:`{
  args: {
    placeholder: 'Choose a fruit…'
  }
}`,...(C=(z=t.parameters)==null?void 0:z.docs)==null?void 0:C.source}}};var _,w,D;n.parameters={...n.parameters,docs:{...(_=n.parameters)==null?void 0:_.docs,source:{originalSource:`{
  args: {
    disabled: true,
    defaultValue: 'banana'
  }
}`,...(D=(w=n.parameters)==null?void 0:w.docs)==null?void 0:D.source}}};var E,N,T;d.parameters={...d.parameters,docs:{...(E=d.parameters)==null?void 0:E.docs,source:{originalSource:`{
  render: args => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    maxWidth: 320
  }}>\r
      <Select {...args} size="sm" label="Small" />\r
      <Select {...args} size="md" label="Medium" />\r
      <Select {...args} size="lg" label="Large" />\r
    </div>
}`,...(T=(N=d.parameters)==null?void 0:N.docs)==null?void 0:T.source}}};const J=["Default","WithError","WithPlaceholder","Disabled","Sizes"];export{o as Default,n as Disabled,d as Sizes,i as WithError,t as WithPlaceholder,J as __namedExportsOrder,H as default};
