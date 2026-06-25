import{j as e}from"./jsx-runtime-DFAAy_2V.js";import{r as s}from"./index-Bc2G9s8g.js";import{u as H,a as J,b as Q,c as X,d as Y,e as Z,F as ee,f as te,o as oe,g as ne,s as ae}from"./floating-ui.react-DYhZ0s1a.js";import{u as se}from"./useFocusTrap-Da0Y04Qi.js";import{B as n}from"./Button-CTLW7U7A.js";import{I as b}from"./Input-sJxAtvxh.js";import"./index-BO6cjGmN.js";/* empty css              */function a({content:o,children:t,placement:p="bottom",trapFocus:d=!1,closeOnEsc:q=!0,offset:O=8,open:g,onOpenChange:m}){const[B,M]=s.useState(!1),h=g!==void 0,u=h?g:B,U=x=>{h||M(x),m==null||m(x)},v=s.useRef(null),{refs:y,floatingStyles:A,context:f}=H({open:u,onOpenChange:U,placement:p,whileElementsMounted:te,middleware:[oe(O),ne(),ae({padding:8})]}),L=J(f),V=Q(f,{escapeKey:q}),W=X(f,{role:"dialog"}),{getReferenceProps:_,getFloatingProps:$}=Y([L,V,W]);se(v,d&&u);const K=t.ref,z=Z([y.setReference,K]),G=s.cloneElement(t,_({ref:z,...t.props}));return e.jsxs(e.Fragment,{children:[G,u&&e.jsx(ee,{children:e.jsx("div",{ref:y.setFloating,className:"chs-popover-positioner",style:A,children:e.jsx("div",{ref:v,className:"chs-popover",tabIndex:-1,...$(),role:d?"dialog":"region","aria-modal":d||void 0,children:o})})})]})}a.displayName="Popover";a.__docgenInfo={description:"Popover — a click-triggered floating panel for interactive content.\n\nWhere {@link Tooltip} opens on hover and holds a passive label, the Popover\nopens on click and is meant to host real UI: forms, menus, lists. Positioning\nis delegated to Floating UI (`offset` + `flip` + `shift`, kept current by\n`autoUpdate`); `useClick` toggles it, `useDismiss` closes it on Escape and\noutside press. With `trapFocus` it becomes a `dialog` whose focus is confined\nby {@link useFocusTrap}; otherwise it's a passive `region`.\n\nThe trigger is never modified — it's cloned with the reference ref and the\ninteraction props merged in, exactly like the Tooltip.",methods:[],displayName:"Popover",props:{content:{required:!0,tsType:{name:"ReactNode"},description:"Panel contents — may be interactive (forms, menus, lists)."},children:{required:!0,tsType:{name:"ReactElement"},description:"The single trigger element. Must accept a ref and DOM props."},placement:{required:!1,tsType:{name:"union",raw:`| 'top'
| 'top-start'
| 'top-end'
| 'right'
| 'right-start'
| 'right-end'
| 'bottom'
| 'bottom-start'
| 'bottom-end'
| 'left'
| 'left-start'
| 'left-end'`,elements:[{name:"literal",value:"'top'"},{name:"literal",value:"'top-start'"},{name:"literal",value:"'top-end'"},{name:"literal",value:"'right'"},{name:"literal",value:"'right-start'"},{name:"literal",value:"'right-end'"},{name:"literal",value:"'bottom'"},{name:"literal",value:"'bottom-start'"},{name:"literal",value:"'bottom-end'"},{name:"literal",value:"'left'"},{name:"literal",value:"'left-start'"},{name:"literal",value:"'left-end'"}]},description:`Side of the trigger to anchor on; flips automatically near a viewport edge.
@default 'bottom'`,defaultValue:{value:"'bottom'",computed:!1}},trapFocus:{required:!1,tsType:{name:"boolean"},description:"Confine keyboard focus inside the panel and hand it back to the trigger on\nclose. Switches the panel role to `dialog` (from `region`). Use it for menus\nand forms. @default false",defaultValue:{value:"false",computed:!1}},closeOnEsc:{required:!1,tsType:{name:"boolean"},description:"Close when Escape is pressed. @default true",defaultValue:{value:"true",computed:!1}},offset:{required:!1,tsType:{name:"number"},description:"Distance in px between the trigger and the panel. @default 8",defaultValue:{value:"8",computed:!1}},open:{required:!1,tsType:{name:"boolean"},description:"Controlled open state. Provide alongside `onOpenChange`."},onOpenChange:{required:!1,tsType:{name:"signature",type:"function",raw:"(open: boolean) => void",signature:{arguments:[{type:{name:"boolean"},name:"open"}],return:{name:"void"}}},description:"Notified on every open/close request (click, Escape, outside press)."}}};const N=["top","top-start","top-end","right","right-start","right-end","bottom","bottom-start","bottom-end","left","left-start","left-end"],ge={title:"Components/Popover",component:a,tags:["autodocs"],args:{content:"I am a popover — click outside or press Escape to close me.",placement:"bottom",trapFocus:!1,closeOnEsc:!0,offset:8,children:e.jsx(n,{children:"Open popover"})},argTypes:{placement:{control:"select",options:N},content:{control:"text"},children:{control:!1},open:{control:!1},onOpenChange:{control:!1}}},r={},l={args:{trapFocus:!0,content:e.jsxs("form",{style:{display:"flex",flexDirection:"column",gap:12,width:220},onSubmit:o=>o.preventDefault(),children:[e.jsx(b,{label:"Name",placeholder:"Ada Lovelace"}),e.jsx(b,{label:"Email",type:"email",placeholder:"ada@example.com"}),e.jsx(n,{type:"submit",children:"Save changes"})]})},render:o=>e.jsx("div",{style:{padding:80},children:e.jsx(a,{...o,children:e.jsx(n,{children:"Edit profile"})})})},i={render:o=>e.jsx("div",{style:{display:"grid",gridTemplateColumns:"repeat(3, max-content)",gap:24,padding:140},children:N.map(t=>s.createElement(a,{...o,key:t,placement:t,content:`placement: ${t}`},e.jsx(n,{variant:"secondary",children:t})))})};function re(){const[o,t]=s.useState(!1);return e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:16,padding:80},children:[e.jsxs(n,{variant:"ghost",onClick:()=>t(p=>!p),children:["Toggle externally (",o?"open":"closed",")"]}),e.jsx(a,{open:o,onOpenChange:t,content:"My visibility is owned by the parent component.",children:e.jsx(n,{children:"Anchor"})})]})}const c={render:()=>e.jsx(re,{})};var E,j,P;r.parameters={...r.parameters,docs:{...(E=r.parameters)==null?void 0:E.docs,source:{originalSource:"{}",...(P=(j=r.parameters)==null?void 0:j.docs)==null?void 0:P.source}}};var T,C,k;l.parameters={...l.parameters,docs:{...(T=l.parameters)==null?void 0:T.docs,source:{originalSource:`{
  args: {
    trapFocus: true,
    content: <form style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 12,
      width: 220
    }} onSubmit={event => event.preventDefault()}>
        <Input label="Name" placeholder="Ada Lovelace" />
        <Input label="Email" type="email" placeholder="ada@example.com" />
        <Button type="submit">Save changes</Button>
      </form>
  },
  render: args => <div style={{
    padding: 80
  }}>
      <Popover {...args}>
        <Button>Edit profile</Button>
      </Popover>
    </div>
}`,...(k=(C=l.parameters)==null?void 0:C.docs)==null?void 0:k.source}}};var S,w,F;i.parameters={...i.parameters,docs:{...(S=i.parameters)==null?void 0:S.docs,source:{originalSource:`{
  render: args => <div style={{
    display: 'grid',
    gridTemplateColumns: 'repeat(3, max-content)',
    gap: 24,
    padding: 140
  }}>
      {PLACEMENTS.map(placement => <Popover {...args} key={placement} placement={placement} content={\`placement: \${placement}\`}>
          <Button variant="secondary">{placement}</Button>
        </Popover>)}
    </div>
}`,...(F=(w=i.parameters)==null?void 0:w.docs)==null?void 0:F.source}}};var I,R,D;c.parameters={...c.parameters,docs:{...(I=c.parameters)==null?void 0:I.docs,source:{originalSource:`{
  render: () => <ControlledExample />
}`,...(D=(R=c.parameters)==null?void 0:R.docs)==null?void 0:D.source}}};const he=["Default","WithForm","Placements","Controlled"];export{c as Controlled,r as Default,i as Placements,l as WithForm,he as __namedExportsOrder,ge as default};
