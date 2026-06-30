import{j as e}from"./jsx-runtime-DFAAy_2V.js";import{r as l}from"./index-Bc2G9s8g.js";import{r as N}from"./index-BO6cjGmN.js";import{u as F}from"./useFocusTrap-Da0Y04Qi.js";import{B as R}from"./Button-CTLW7U7A.js";function u({isOpen:r,onClose:s,title:t,children:a,size:L="md",closeOnOverlayClick:O=!0,closeOnEsc:p=!0}){const h=l.useRef(null),f=l.useId(),[_,C]=l.useState(!1);if(F(h,r),l.useEffect(()=>{C(!0)},[]),l.useEffect(()=>{if(!r||!p)return;const o=T=>{T.key==="Escape"&&s()};return document.addEventListener("keydown",o),()=>document.removeEventListener("keydown",o)},[r,p,s]),l.useEffect(()=>{if(!r)return;const o=document.body.style.overflow;return document.body.style.overflow="hidden",()=>{document.body.style.overflow=o}},[r]),!r||!_)return null;const S=o=>{O&&o.target===o.currentTarget&&s()};return N.createPortal(e.jsx("div",{className:"chs-modal-overlay",onClick:S,children:e.jsxs("div",{ref:h,className:`chs-modal chs-modal--${L}`,role:"dialog","aria-modal":"true","aria-labelledby":f,tabIndex:-1,children:[e.jsxs("header",{className:"chs-modal__header",children:[e.jsx("h2",{id:f,className:"chs-modal__title",children:t}),e.jsx("button",{type:"button",className:"chs-modal__close","aria-label":"Close dialog",onClick:s,children:e.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",children:e.jsx("path",{d:"M6 6l12 12M18 6L6 18",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})})]}),e.jsx("div",{className:"chs-modal__body",children:a})]})}),document.body)}u.displayName="Modal";function m({buttonLabel:r="Open modal",...s}){const[t,a]=l.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(R,{onClick:()=>a(!0),children:r}),e.jsx(u,{title:"Dialog title",...s,isOpen:t,onClose:()=>a(!1),children:s.children??e.jsx("p",{style:{margin:0},children:"This is the modal body."})})]})}const A={title:"Components/Modal",component:u,tags:["autodocs"],argTypes:{size:{control:"inline-radio",options:["sm","md","lg","fullscreen"]},closeOnOverlayClick:{control:"boolean"},closeOnEsc:{control:"boolean"},isOpen:{control:!1},onClose:{control:!1},children:{control:!1}},args:{isOpen:!1,onClose:()=>{},title:"Edit profile",children:e.jsx("p",{style:{margin:0},children:"This is the modal body."}),size:"md",closeOnOverlayClick:!0,closeOnEsc:!0}},n={render:r=>e.jsx(m,{...r})},i={args:{title:"Terms of service",size:"md"},render:r=>e.jsx(m,{...r,buttonLabel:"Read terms",children:e.jsx("div",{style:{display:"flex",flexDirection:"column",gap:12},children:Array.from({length:24},(s,t)=>e.jsxs("p",{style:{margin:0},children:["Paragraph ",t+1,". The dialog body scrolls on its own while the header and the close button stay pinned in place."]},t))})})},d={render:()=>e.jsx("div",{style:{display:"flex",gap:12,flexWrap:"wrap"},children:["sm","md","lg","fullscreen"].map(r=>e.jsx(m,{size:r,title:`Size: ${r}`,buttonLabel:`Open ${r}`},r))})},c={args:{size:"fullscreen",title:"Fullscreen dialog"},render:r=>e.jsx(m,{...r,buttonLabel:"Open fullscreen",children:e.jsx("p",{style:{margin:0},children:"This dialog fills the entire viewport."})})};var g,y,x;n.parameters={...n.parameters,docs:{...(g=n.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: args => <ModalDemo {...args} />
}`,...(x=(y=n.parameters)==null?void 0:y.docs)==null?void 0:x.source}}};var b,v,j;i.parameters={...i.parameters,docs:{...(b=i.parameters)==null?void 0:b.docs,source:{originalSource:`{
  args: {
    title: 'Terms of service',
    size: 'md'
  },
  render: args => <ModalDemo {...args} buttonLabel="Read terms">
      <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }}>
        {Array.from({
        length: 24
      }, (_, i) => <p key={i} style={{
        margin: 0
      }}>
            Paragraph {i + 1}. The dialog body scrolls on its own while the header
            and the close button stay pinned in place.
          </p>)}
      </div>
    </ModalDemo>
}`,...(j=(v=i.parameters)==null?void 0:v.docs)==null?void 0:j.source}}};var w,k,z;d.parameters={...d.parameters,docs:{...(w=d.parameters)==null?void 0:w.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 12,
    flexWrap: 'wrap'
  }}>
      {(['sm', 'md', 'lg', 'fullscreen'] satisfies ModalSize[]).map(size => <ModalDemo key={size} size={size} title={\`Size: \${size}\`} buttonLabel={\`Open \${size}\`} />)}
    </div>
}`,...(z=(k=d.parameters)==null?void 0:k.docs)==null?void 0:z.source}}};var D,M,E;c.parameters={...c.parameters,docs:{...(D=c.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    size: 'fullscreen',
    title: 'Fullscreen dialog'
  },
  render: args => <ModalDemo {...args} buttonLabel="Open fullscreen">
      <p style={{
      margin: 0
    }}>This dialog fills the entire viewport.</p>
    </ModalDemo>
}`,...(E=(M=c.parameters)==null?void 0:M.docs)==null?void 0:E.source}}};const K=["Default","LargeContent","Sizes","Fullscreen"];export{n as Default,c as Fullscreen,i as LargeContent,d as Sizes,K as __namedExportsOrder,A as default};
