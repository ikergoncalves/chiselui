import{j as e}from"./jsx-runtime-DFAAy_2V.js";import"./index-Bc2G9s8g.js";function a({size:r="md",label:v="Loading...",color:S="primary"}){const j=["chs-spinner",`chs-spinner--${r}`,`chs-spinner--${S}`].join(" ");return e.jsx("span",{className:j,role:"status","aria-label":v,children:e.jsxs("svg",{className:"chs-spinner__svg",viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",focusable:"false",children:[e.jsx("circle",{className:"chs-spinner__track",cx:"12",cy:"12",r:"9",strokeWidth:"3"}),e.jsx("circle",{className:"chs-spinner__arc",cx:"12",cy:"12",r:"9",strokeWidth:"3",strokeLinecap:"round"})]})})}a.displayName="Spinner";a.__docgenInfo={description:`Spinner — an indeterminate loading indicator.

Hand-rolled SVG + a pure CSS animation, so it ships with zero runtime deps.
A full-circle track sits under a partial arc; rotating the whole SVG spins the
arc around the track. The accessible name is carried by \`role="status"\` +
\`aria-label\`, so the decorative SVG is hidden from assistive tech.`,methods:[],displayName:"Spinner",props:{size:{required:!1,tsType:{name:"union",raw:"'xs' | 'sm' | 'md' | 'lg' | 'xl'",elements:[{name:"literal",value:"'xs'"},{name:"literal",value:"'sm'"},{name:"literal",value:"'md'"},{name:"literal",value:"'lg'"},{name:"literal",value:"'xl'"}]},description:"Diameter preset of the spinner. @default 'md'",defaultValue:{value:"'md'",computed:!1}},label:{required:!1,tsType:{name:"string"},description:"Accessible text announced by screen readers. @default 'Loading...'",defaultValue:{value:"'Loading...'",computed:!1}},color:{required:!1,tsType:{name:"union",raw:"'primary' | 'white' | 'current'",elements:[{name:"literal",value:"'primary'"},{name:"literal",value:"'white'"},{name:"literal",value:"'current'"}]},description:"Stroke color source.\n- `primary` uses `--color-primary`\n- `white` uses `#ffffff` (for dark surfaces)\n- `current` inherits `currentColor` from the parent\n@default 'primary'",defaultValue:{value:"'primary'",computed:!1}}}};const w={title:"Components/Spinner",component:a,tags:["autodocs"],args:{size:"md",color:"primary",label:"Loading..."},argTypes:{size:{control:"inline-radio",options:["xs","sm","md","lg","xl"]},color:{control:"inline-radio",options:["primary","white","current"]},label:{control:"text"}}},s={},n={render:r=>e.jsxs("div",{style:{display:"flex",gap:24,alignItems:"center"},children:[e.jsx(a,{...r,size:"xs"}),e.jsx(a,{...r,size:"sm"}),e.jsx(a,{...r,size:"md"}),e.jsx(a,{...r,size:"lg"}),e.jsx(a,{...r,size:"xl"})]})},i={render:r=>e.jsxs("div",{style:{display:"flex",gap:24,alignItems:"center"},children:[e.jsx(a,{...r,color:"primary"}),e.jsx("span",{style:{display:"inline-flex",padding:16,borderRadius:8,background:"var(--color-neutral-900)"},children:e.jsx(a,{...r,color:"white"})}),e.jsx("span",{style:{display:"inline-flex",color:"var(--color-danger)"},children:e.jsx(a,{...r,color:"current"})})]})},l={args:{size:"lg",label:"Saving changes..."}};var t,o,c;s.parameters={...s.parameters,docs:{...(t=s.parameters)==null?void 0:t.docs,source:{originalSource:"{}",...(c=(o=s.parameters)==null?void 0:o.docs)==null?void 0:c.source}}};var d,p,m;n.parameters={...n.parameters,docs:{...(d=n.parameters)==null?void 0:d.docs,source:{originalSource:`{
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
}`,...(m=(p=n.parameters)==null?void 0:p.docs)==null?void 0:m.source}}};var u,g,x;i.parameters={...i.parameters,docs:{...(u=i.parameters)==null?void 0:u.docs,source:{originalSource:`{
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
}`,...(x=(g=i.parameters)==null?void 0:g.docs)==null?void 0:x.source}}};var f,h,y;l.parameters={...l.parameters,docs:{...(f=l.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    size: 'lg',
    label: 'Saving changes...'
  }
}`,...(y=(h=l.parameters)==null?void 0:h.docs)==null?void 0:y.source}}};const k=["Default","Sizes","Colors","WithLabel"];export{i as Colors,s as Default,n as Sizes,l as WithLabel,k as __namedExportsOrder,w as default};
