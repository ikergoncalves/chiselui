import{j as e}from"./jsx-runtime-DFAAy_2V.js";import{r as d}from"./index-Bc2G9s8g.js";/* empty css              */function s({label:r,error:T,hint:b,rows:Q=3,showCount:X=!1,autoResize:t=!1,size:Y="md",id:Z,className:ee,disabled:v,maxLength:o,value:l,defaultValue:_,onChange:x,onInput:y,...ae}){const re=d.useId(),i=Z??re,S=`${i}-error`,z=`${i}-hint`,j=d.useRef(null),n=!!T,se=n?S:b?z:void 0,N=l!==void 0,[te,oe]=d.useState(()=>String(_??"").length),C=N?String(l??"").length:te;d.useLayoutEffect(()=>{const a=j.current;!t||!a||(a.style.height="auto",a.style.height=`${a.scrollHeight}px`)},[t,l]);const le=a=>{N||oe(a.target.value.length),x==null||x(a)},ie=a=>{if(t){const w=a.currentTarget;w.style.height="auto",w.style.height=`${w.scrollHeight}px`}y==null||y(a)},ne=["chs-field",`chs-field--${Y}`,n&&"chs-field--error",v&&"chs-field--disabled",ee].filter(Boolean).join(" "),de=["chs-input","chs-textarea",t&&"chs-textarea--auto-resize"].filter(Boolean).join(" ");return e.jsxs("div",{className:ne,children:[r&&e.jsx("label",{htmlFor:i,className:"chs-field__label",children:r}),e.jsx("div",{className:de,children:e.jsx("textarea",{ref:j,id:i,className:"chs-input__control chs-textarea__control",rows:Q,maxLength:o,disabled:v,value:l,defaultValue:_,onChange:le,onInput:ie,...ae,"aria-invalid":n||void 0,"aria-describedby":se})}),X&&o!==void 0&&e.jsx("span",{className:`chs-textarea__count${C>=o?" chs-textarea__count--limit":""}`,children:`${C} / ${o}`}),n?e.jsx("p",{id:S,className:"chs-field__error",role:"alert",children:T}):b?e.jsx("p",{id:z,className:"chs-field__hint",children:b}):null]})}s.displayName="Textarea";s.__docgenInfo={description:"Textarea — a labelled multi-line field sharing Input's look and a11y wiring.\n\nAdds three multi-line conveniences on top of the shared surface: `autoResize`\ngrows the box to its content via `scrollHeight`, `showCount` renders a live\ncharacter counter against `maxLength`, and the usual `aria-invalid` /\n`aria-describedby` plumbing points assistive tech at the error or hint.",methods:[],displayName:"Textarea",props:{label:{required:!1,tsType:{name:"string"},description:"Field label, rendered above the control and linked via htmlFor/id."},error:{required:!1,tsType:{name:"string"},description:"Error message; turns the border danger and flips aria-invalid when set."},hint:{required:!1,tsType:{name:"string"},description:"Helper text shown below the field while there is no error."},rows:{required:!1,tsType:{name:"number"},description:"Initial visible row count. @default 3",defaultValue:{value:"3",computed:!1}},showCount:{required:!1,tsType:{name:"boolean"},description:'Show a "current / max" character counter (needs `maxLength`). @default false',defaultValue:{value:"false",computed:!1}},autoResize:{required:!1,tsType:{name:"boolean"},description:"Grow the control to fit its content instead of scrolling. @default false",defaultValue:{value:"false",computed:!1}},size:{required:!1,tsType:{name:"union",raw:"'sm' | 'md' | 'lg'",elements:[{name:"literal",value:"'sm'"},{name:"literal",value:"'md'"},{name:"literal",value:"'lg'"}]},description:"Control padding and font size. @default 'md'",defaultValue:{value:"'md'",computed:!1}}},composes:["TextareaHTMLAttributes"]};const he={title:"Components/Textarea",component:s,tags:["autodocs"],args:{label:"Bio",placeholder:"Tell us about yourself…"},argTypes:{size:{control:"inline-radio",options:["sm","md","lg"]},disabled:{control:"boolean"},autoResize:{control:"boolean"},showCount:{control:"boolean"}}},c={},u={args:{label:"Message",defaultValue:"Too short",error:"Please write at least 20 characters."}},m={args:{label:"Feedback",hint:"Markdown is supported."}},h={args:{label:"Notes",autoResize:!0,placeholder:"Start typing — the field grows with your content…"}},p={args:{label:"Tweet",showCount:!0,maxLength:140,defaultValue:"Hello from chiselui!"}},f={render:r=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16,maxWidth:360},children:[e.jsx(s,{...r,size:"sm",label:"Small"}),e.jsx(s,{...r,size:"md",label:"Medium"}),e.jsx(s,{...r,size:"lg",label:"Large"})]})},g={args:{label:"Bio",disabled:!0,defaultValue:"This field is read-only."}};var H,V,E;c.parameters={...c.parameters,docs:{...(H=c.parameters)==null?void 0:H.docs,source:{originalSource:"{}",...(E=(V=c.parameters)==null?void 0:V.docs)==null?void 0:E.source}}};var W,$,q;u.parameters={...u.parameters,docs:{...(W=u.parameters)==null?void 0:W.docs,source:{originalSource:`{
  args: {
    label: 'Message',
    defaultValue: 'Too short',
    error: 'Please write at least 20 characters.'
  }
}`,...(q=($=u.parameters)==null?void 0:$.docs)==null?void 0:q.source}}};var B,M,R;m.parameters={...m.parameters,docs:{...(B=m.parameters)==null?void 0:B.docs,source:{originalSource:`{
  args: {
    label: 'Feedback',
    hint: 'Markdown is supported.'
  }
}`,...(R=(M=m.parameters)==null?void 0:M.docs)==null?void 0:R.source}}};var k,D,F;h.parameters={...h.parameters,docs:{...(k=h.parameters)==null?void 0:k.docs,source:{originalSource:`{
  args: {
    label: 'Notes',
    autoResize: true,
    placeholder: 'Start typing — the field grows with your content…'
  }
}`,...(F=(D=h.parameters)==null?void 0:D.docs)==null?void 0:F.source}}};var I,L,A;p.parameters={...p.parameters,docs:{...(I=p.parameters)==null?void 0:I.docs,source:{originalSource:`{
  args: {
    label: 'Tweet',
    showCount: true,
    maxLength: 140,
    defaultValue: 'Hello from chiselui!'
  }
}`,...(A=(L=p.parameters)==null?void 0:L.docs)==null?void 0:A.source}}};var P,G,O;f.parameters={...f.parameters,docs:{...(P=f.parameters)==null?void 0:P.docs,source:{originalSource:`{
  render: args => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    maxWidth: 360
  }}>
      <Textarea {...args} size="sm" label="Small" />
      <Textarea {...args} size="md" label="Medium" />
      <Textarea {...args} size="lg" label="Large" />
    </div>
}`,...(O=(G=f.parameters)==null?void 0:G.docs)==null?void 0:O.source}}};var U,J,K;g.parameters={...g.parameters,docs:{...(U=g.parameters)==null?void 0:U.docs,source:{originalSource:`{
  args: {
    label: 'Bio',
    disabled: true,
    defaultValue: 'This field is read-only.'
  }
}`,...(K=(J=g.parameters)==null?void 0:J.docs)==null?void 0:K.source}}};const pe=["Default","WithError","WithHint","AutoResize","WithCounter","Sizes","Disabled"];export{h as AutoResize,c as Default,g as Disabled,f as Sizes,p as WithCounter,u as WithError,m as WithHint,pe as __namedExportsOrder,he as default};
