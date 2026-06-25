import{j as e}from"./jsx-runtime-DFAAy_2V.js";import{r as s}from"./index-Bc2G9s8g.js";import{r as X}from"./index-BO6cjGmN.js";import{u as I}from"./useFocusTrap-Da0Y04Qi.js";import{B as h}from"./Button-CTLW7U7A.js";function u({isOpen:r,onClose:t,title:m,children:n,placement:f="right",size:P="md",closeOnOverlayClick:T=!0,closeOnEsc:g=!0,footer:y}){const w=s.useRef(null),b=s.useId();if(I(w,r),s.useEffect(()=>{if(!r||!g)return;const o=F=>{F.key==="Escape"&&t()};return document.addEventListener("keydown",o),()=>document.removeEventListener("keydown",o)},[r,g,t]),s.useEffect(()=>{if(!r)return;const o=document.body.style.overflow;return document.body.style.overflow="hidden",()=>{document.body.style.overflow=o}},[r]),!r)return null;const W=o=>{T&&o.target===o.currentTarget&&t()};return X.createPortal(e.jsx("div",{className:`chs-drawer-overlay chs-drawer-overlay--${f}`,onClick:W,children:e.jsxs("div",{ref:w,className:`chs-drawer chs-drawer--${f} chs-drawer--${P}`,role:"dialog","aria-modal":"true","aria-labelledby":b,tabIndex:-1,children:[e.jsxs("header",{className:"chs-drawer__header",children:[e.jsx("h2",{id:b,className:"chs-drawer__title",children:m}),e.jsx("button",{type:"button",className:"chs-drawer__close","aria-label":"Close dialog",onClick:t,children:e.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",children:e.jsx("path",{d:"M6 6l12 12M18 6L6 18",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})})]}),e.jsx("div",{className:"chs-drawer__body",children:n}),y&&e.jsx("footer",{className:"chs-drawer__footer",children:y})]})}),document.body)}u.displayName="Drawer";function a({buttonLabel:r="Open drawer",...t}){const[m,n]=s.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(h,{onClick:()=>n(!0),children:r}),e.jsx(u,{title:"Panel title",...t,isOpen:m,onClose:()=>n(!1),children:t.children??e.jsx("p",{style:{margin:0},children:"This is the drawer body."})})]})}const G={title:"Components/Drawer",component:u,tags:["autodocs"],argTypes:{placement:{control:"inline-radio",options:["left","right","top","bottom"]},size:{control:"inline-radio",options:["sm","md","lg","full"]},closeOnOverlayClick:{control:"boolean"},closeOnEsc:{control:"boolean"},isOpen:{control:!1},onClose:{control:!1},children:{control:!1},footer:{control:!1}},args:{isOpen:!1,onClose:()=>{},title:"Filters",children:e.jsx("p",{style:{margin:0},children:"This is the drawer body."}),placement:"right",size:"md",closeOnOverlayClick:!0,closeOnEsc:!0}},l={render:r=>e.jsx(a,{...r})},i={render:()=>e.jsx("div",{style:{display:"flex",gap:12,flexWrap:"wrap"},children:["left","right","top","bottom"].map(r=>e.jsx(a,{placement:r,title:`Placement: ${r}`,buttonLabel:`Open ${r}`},r))})},c={render:()=>e.jsx("div",{style:{display:"flex",gap:12,flexWrap:"wrap"},children:["sm","md","lg","full"].map(r=>e.jsx(a,{placement:"right",size:r,title:`Size: ${r}`,buttonLabel:`Open ${r}`},r))})},d={render:r=>e.jsx(a,{...r,title:"Edit settings",buttonLabel:"Open with footer",footer:e.jsxs(e.Fragment,{children:[e.jsx(h,{variant:"ghost",children:"Cancel"}),e.jsx(h,{variant:"primary",children:"Save changes"})]}),children:e.jsx("p",{style:{margin:0},children:"The footer stays pinned to the bottom of the panel while this body scrolls on its own."})})},p={args:{closeOnOverlayClick:!1,title:"Click X to close"},render:r=>e.jsx(a,{...r,buttonLabel:"Open (overlay locked)",children:e.jsx("p",{style:{margin:0},children:"Clicking the backdrop won't close this drawer — use the X button or Escape instead."})})};var x,v,j;l.parameters={...l.parameters,docs:{...(x=l.parameters)==null?void 0:x.docs,source:{originalSource:`{
  render: args => <DrawerDemo {...args} />
}`,...(j=(v=l.parameters)==null?void 0:v.docs)==null?void 0:j.source}}};var D,k,O;i.parameters={...i.parameters,docs:{...(D=i.parameters)==null?void 0:D.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 12,
    flexWrap: 'wrap'
  }}>
      {(['left', 'right', 'top', 'bottom'] satisfies DrawerPlacement[]).map(placement => <DrawerDemo key={placement} placement={placement} title={\`Placement: \${placement}\`} buttonLabel={\`Open \${placement}\`} />)}
    </div>
}`,...(O=(k=i.parameters)==null?void 0:k.docs)==null?void 0:O.source}}};var C,E,S;c.parameters={...c.parameters,docs:{...(C=c.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 12,
    flexWrap: 'wrap'
  }}>
      {(['sm', 'md', 'lg', 'full'] satisfies DrawerSize[]).map(size => <DrawerDemo key={size} placement="right" size={size} title={\`Size: \${size}\`} buttonLabel={\`Open \${size}\`} />)}
    </div>
}`,...(S=(E=c.parameters)==null?void 0:E.docs)==null?void 0:S.source}}};var L,_,$;d.parameters={...d.parameters,docs:{...(L=d.parameters)==null?void 0:L.docs,source:{originalSource:`{
  render: args => <DrawerDemo {...args} title="Edit settings" buttonLabel="Open with footer" footer={<>
          <Button variant="ghost">Cancel</Button>
          <Button variant="primary">Save changes</Button>
        </>}>
      <p style={{
      margin: 0
    }}>
        The footer stays pinned to the bottom of the panel while this body scrolls
        on its own.
      </p>
    </DrawerDemo>
}`,...($=(_=d.parameters)==null?void 0:_.docs)==null?void 0:$.source}}};var z,N,B;p.parameters={...p.parameters,docs:{...(z=p.parameters)==null?void 0:z.docs,source:{originalSource:`{
  args: {
    closeOnOverlayClick: false,
    title: 'Click X to close'
  },
  render: args => <DrawerDemo {...args} buttonLabel="Open (overlay locked)">
      <p style={{
      margin: 0
    }}>
        Clicking the backdrop won&apos;t close this drawer — use the X button or
        Escape instead.
      </p>
    </DrawerDemo>
}`,...(B=(N=p.parameters)==null?void 0:N.docs)==null?void 0:B.source}}};const H=["Default","Placements","Sizes","WithFooter","NoOverlayClose"];export{l as Default,p as NoOverlayClose,i as Placements,c as Sizes,d as WithFooter,H as __namedExportsOrder,G as default};
