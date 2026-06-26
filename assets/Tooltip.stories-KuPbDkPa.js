import{j as e}from"./jsx-runtime-DFAAy_2V.js";import{r as d}from"./index-Bc2G9s8g.js";import{u as N,h as _,i as L,b as A,c as U,d as V,e as W,F as $,f as z,o as G,g as J,s as K}from"./floating-ui.react-DYhZ0s1a.js";import{B as p}from"./Button-CTLW7U7A.js";import"./index-BO6cjGmN.js";function n({content:t,placement:o="top",delay:R=300,children:c}){const[m,k]=d.useState(!1),{refs:u,floatingStyles:C,context:r}=N({open:m,onOpenChange:k,placement:o,whileElementsMounted:z,middleware:[G(8),J(),K({padding:8})]}),F=_(r,{move:!1,delay:{open:R,close:0}}),P=L(r),B=A(r),E=U(r,{role:"tooltip"}),{getReferenceProps:O,getFloatingProps:S}=V([F,P,B,E]),D=c.ref,q=W([u.setReference,D]),H=d.cloneElement(c,O({ref:q,...c.props}));return e.jsxs(e.Fragment,{children:[H,m&&e.jsx($,{children:e.jsx("div",{ref:u.setFloating,className:"chs-tooltip",style:C,...S(),children:t})})]})}n.displayName="Tooltip";n.__docgenInfo={description:"Tooltip — an accessible, edge-aware hover/focus bubble.\n\nPositioning is delegated to Floating UI: `offset` + `flip` + `shift` keep the\nbubble on-screen even at the viewport edges, which is the whole reason this is\nthe one component allowed an external dependency. Opens on pointer hover (after\n`delay`) and on keyboard focus, so it's reachable without a mouse.",methods:[],displayName:"Tooltip",props:{content:{required:!0,tsType:{name:"ReactNode"},description:"The bubble contents."},placement:{required:!1,tsType:{name:"union",raw:"'top' | 'right' | 'bottom' | 'left'",elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'right'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'left'"}]},description:`Side of the trigger to anchor on; flips automatically near a viewport edge.
@default 'top'`,defaultValue:{value:"'top'",computed:!1}},delay:{required:!1,tsType:{name:"number"},description:"Delay in ms before opening on hover. @default 300",defaultValue:{value:"300",computed:!1}},children:{required:!0,tsType:{name:"ReactElement"},description:"The single trigger element. Must accept a ref and DOM props."}}};const oe={title:"Components/Tooltip",component:n,tags:["autodocs"],args:{content:"I am a tooltip",placement:"top",delay:300,children:e.jsx(p,{children:"Hover me"})},argTypes:{placement:{control:"inline-radio",options:["top","right","bottom","left"]},content:{control:"text"},children:{control:!1}}},a={},s={render:t=>e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(2, max-content)",gap:32,padding:80},children:["top","right","bottom","left"].map(o=>d.createElement(n,{...t,key:o,placement:o,content:`Placement: ${o}`},e.jsx(p,{variant:"secondary",children:o})))})},i={args:{content:"This is a much longer tooltip whose text wraps once it reaches the 240px max-width cap, so it stays comfortably readable."},render:t=>e.jsx("div",{style:{padding:80},children:e.jsx(n,{...t,children:e.jsx(p,{children:"Hover for details"})})})},Q=()=>e.jsxs("svg",{width:"20",height:"20",viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",children:[e.jsx("circle",{cx:"12",cy:"12",r:"9",stroke:"currentColor",strokeWidth:"2"}),e.jsx("path",{d:"M12 11v5M12 8h.01",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})]}),l={args:{content:"More information"},render:t=>e.jsx("div",{style:{padding:80},children:e.jsx(n,{...t,children:e.jsx("button",{type:"button","aria-label":"More information",style:{display:"inline-flex",padding:8,borderRadius:8,color:"var(--color-neutral-600)",cursor:"pointer"},children:e.jsx(Q,{})})})})};var g,h,f;a.parameters={...a.parameters,docs:{...(g=a.parameters)==null?void 0:g.docs,source:{originalSource:"{}",...(f=(h=a.parameters)==null?void 0:h.docs)==null?void 0:f.source}}};var y,x,v;s.parameters={...s.parameters,docs:{...(y=s.parameters)==null?void 0:y.docs,source:{originalSource:`{
  render: args => <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(2, max-content)',
    gap: 32,
    padding: 80
  }}>
      {(['top', 'right', 'bottom', 'left'] as const).map(placement => <Tooltip {...args} key={placement} placement={placement} content={\`Placement: \${placement}\`}>
          <Button variant="secondary">{placement}</Button>
        </Tooltip>)}
    </div>
}`,...(v=(x=s.parameters)==null?void 0:x.docs)==null?void 0:v.source}}};var b,T,j;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    content: 'This is a much longer tooltip whose text wraps once it reaches the 240px max-width cap, so it stays comfortably readable.'
  },
  render: args => <div style={{
    padding: 80
  }}>
      <Tooltip {...args}>
        <Button>Hover for details</Button>
      </Tooltip>
    </div>
}`,...(j=(T=i.parameters)==null?void 0:T.docs)==null?void 0:j.source}}};var w,I,M;l.parameters={...l.parameters,docs:{...(w=l.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    content: 'More information'
  },
  render: args => <div style={{
    padding: 80
  }}>
      <Tooltip {...args}>
        <button type="button" aria-label="More information" style={{
        display: 'inline-flex',
        padding: 8,
        borderRadius: 8,
        color: 'var(--color-neutral-600)',
        cursor: 'pointer'
      }}>
          <InfoIcon />
        </button>
      </Tooltip>
    </div>
}`,...(M=(I=l.parameters)==null?void 0:I.docs)==null?void 0:M.source}}};const ne=["Default","AllPlacements","LongContent","OnIcon"];export{s as AllPlacements,a as Default,i as LongContent,l as OnIcon,ne as __namedExportsOrder,oe as default};
