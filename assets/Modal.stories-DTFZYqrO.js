import{j as r}from"./jsx-runtime-DFAAy_2V.js";import{r as a}from"./index-Bc2G9s8g.js";import{r as _}from"./index-BO6cjGmN.js";import{B as F}from"./Button-0IhRy6He.js";const N=["a[href]","area[href]","button:not([disabled])","input:not([disabled])","select:not([disabled])","textarea:not([disabled])","iframe","audio[controls]","video[controls]",'[contenteditable]:not([contenteditable="false"])','[tabindex]:not([tabindex="-1"])'].join(",");function R(e,s){a.useEffect(()=>{if(!s)return;const t=e.current;if(!t)return;const l=document.activeElement,m=()=>Array.from(t.querySelectorAll(N)),i=m()[0];i?i.focus():t.focus();const c=n=>{if(n.key!=="Tab")return;const d=m(),o=d[0],u=d[d.length-1];if(!o||!u){n.preventDefault();return}const f=document.activeElement;n.shiftKey?(f===o||!t.contains(f))&&(n.preventDefault(),u.focus()):(f===u||!t.contains(f))&&(n.preventDefault(),o.focus())};return document.addEventListener("keydown",c,!0),()=>{document.removeEventListener("keydown",c,!0),l&&document.contains(l)&&l.focus()}},[e,s])}function x({isOpen:e,onClose:s,title:t,children:l,size:m="md",closeOnOverlayClick:v=!0,closeOnEsc:i=!0}){const c=a.useRef(null),n=a.useId();if(R(c,e),a.useEffect(()=>{if(!e||!i)return;const o=u=>{u.key==="Escape"&&s()};return document.addEventListener("keydown",o),()=>document.removeEventListener("keydown",o)},[e,i,s]),a.useEffect(()=>{if(!e)return;const o=document.body.style.overflow;return document.body.style.overflow="hidden",()=>{document.body.style.overflow=o}},[e]),!e)return null;const d=o=>{v&&o.target===o.currentTarget&&s()};return _.createPortal(r.jsx("div",{className:"chs-modal-overlay",onClick:d,children:r.jsxs("div",{ref:c,className:`chs-modal chs-modal--${m}`,role:"dialog","aria-modal":"true","aria-labelledby":n,tabIndex:-1,children:[r.jsxs("header",{className:"chs-modal__header",children:[r.jsx("h2",{id:n,className:"chs-modal__title",children:t}),r.jsx("button",{type:"button",className:"chs-modal__close","aria-label":"Close dialog",onClick:s,children:r.jsx("svg",{width:"18",height:"18",viewBox:"0 0 24 24",fill:"none","aria-hidden":"true",children:r.jsx("path",{d:"M6 6l12 12M18 6L6 18",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round"})})})]}),r.jsx("div",{className:"chs-modal__body",children:l})]})}),document.body)}x.displayName="Modal";function b({buttonLabel:e="Open modal",...s}){const[t,l]=a.useState(!1);return r.jsxs(r.Fragment,{children:[r.jsx(F,{onClick:()=>l(!0),children:e}),r.jsx(x,{title:"Dialog title",...s,isOpen:t,onClose:()=>l(!1),children:s.children??r.jsx("p",{style:{margin:0},children:"This is the modal body."})})]})}const K={title:"Components/Modal",component:x,tags:["autodocs"],argTypes:{size:{control:"inline-radio",options:["sm","md","lg","fullscreen"]},closeOnOverlayClick:{control:"boolean"},closeOnEsc:{control:"boolean"},isOpen:{control:!1},onClose:{control:!1},children:{control:!1}},args:{isOpen:!1,onClose:()=>{},title:"Edit profile",children:r.jsx("p",{style:{margin:0},children:"This is the modal body."}),size:"md",closeOnOverlayClick:!0,closeOnEsc:!0}},p={render:e=>r.jsx(b,{...e})},h={args:{title:"Terms of service",size:"md"},render:e=>r.jsx(b,{...e,buttonLabel:"Read terms",children:r.jsx("div",{style:{display:"flex",flexDirection:"column",gap:12},children:Array.from({length:24},(s,t)=>r.jsxs("p",{style:{margin:0},children:["Paragraph ",t+1,". The dialog body scrolls on its own while the header and the close button stay pinned in place."]},t))})})},g={render:()=>r.jsx("div",{style:{display:"flex",gap:12,flexWrap:"wrap"},children:["sm","md","lg","fullscreen"].map(e=>r.jsx(b,{size:e,title:`Size: ${e}`,buttonLabel:`Open ${e}`},e))})},y={args:{size:"fullscreen",title:"Fullscreen dialog"},render:e=>r.jsx(b,{...e,buttonLabel:"Open fullscreen",children:r.jsx("p",{style:{margin:0},children:"This dialog fills the entire viewport."})})};var j,w,E;p.parameters={...p.parameters,docs:{...(j=p.parameters)==null?void 0:j.docs,source:{originalSource:`{
  render: args => <ModalDemo {...args} />
}`,...(E=(w=p.parameters)==null?void 0:w.docs)==null?void 0:E.source}}};var D,k,L;h.parameters={...h.parameters,docs:{...(D=h.parameters)==null?void 0:D.docs,source:{originalSource:`{
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
}`,...(L=(k=h.parameters)==null?void 0:k.docs)==null?void 0:L.source}}};var z,O,C;g.parameters={...g.parameters,docs:{...(z=g.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    gap: 12,
    flexWrap: 'wrap'
  }}>
      {(['sm', 'md', 'lg', 'fullscreen'] satisfies ModalSize[]).map(size => <ModalDemo key={size} size={size} title={\`Size: \${size}\`} buttonLabel={\`Open \${size}\`} />)}
    </div>
}`,...(C=(O=g.parameters)==null?void 0:O.docs)==null?void 0:C.source}}};var M,S,T;y.parameters={...y.parameters,docs:{...(M=y.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    size: 'fullscreen',
    title: 'Fullscreen dialog'
  },
  render: args => <ModalDemo {...args} buttonLabel="Open fullscreen">
      <p style={{
      margin: 0
    }}>This dialog fills the entire viewport.</p>
    </ModalDemo>
}`,...(T=(S=y.parameters)==null?void 0:S.docs)==null?void 0:T.source}}};const P=["Default","LargeContent","Sizes","Fullscreen"];export{p as Default,y as Fullscreen,h as LargeContent,g as Sizes,P as __namedExportsOrder,K as default};
