import{j as e}from"./jsx-runtime-DFAAy_2V.js";import{T as r}from"./ThemeToggle-mjW8rQax.js";import"./index-Bc2G9s8g.js";const b={title:"Components/ThemeToggle",component:r,tags:["autodocs"],argTypes:{size:{control:"inline-radio",options:["sm","md","lg"]},defaultTheme:{control:"inline-radio",options:["light","dark","system"]},storageKey:{control:"text"}}},o={},a={render:()=>e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:16},children:[e.jsx(r,{size:"sm"}),e.jsx(r,{size:"md"}),e.jsx(r,{size:"lg"})]})},t={render:()=>e.jsx("div",{"data-theme":"dark",style:{display:"flex",alignItems:"center",justifyContent:"center",padding:48,borderRadius:12,background:"var(--color-neutral-50)"},children:e.jsx(r,{defaultTheme:"dark"})})},s={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:16,width:320,padding:24,borderRadius:12,background:"var(--color-surface)",border:"1px solid var(--color-border)",color:"var(--color-neutral-900)",fontFamily:"var(--font-sans)"},children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between"},children:[e.jsx("strong",{style:{fontSize:"var(--font-size-lg)"},children:"Theme preview"}),e.jsx(r,{defaultTheme:"light"})]}),e.jsx("p",{style:{margin:0,color:"var(--color-neutral-600)"},children:"Click the toggle to crossfade between light, dark and system themes."}),e.jsx("div",{style:{padding:12,borderRadius:8,background:"var(--color-neutral-100)",color:"var(--color-neutral-700)"},children:"Surface, border and text colours all animate together."})]})};var l,d,n;o.parameters={...o.parameters,docs:{...(l=o.parameters)==null?void 0:l.docs,source:{originalSource:"{}",...(n=(d=o.parameters)==null?void 0:d.docs)==null?void 0:n.source}}};var i,c,m;a.parameters={...a.parameters,docs:{...(i=a.parameters)==null?void 0:i.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    alignItems: 'center',
    gap: 16
  }}>
      <ThemeToggle size="sm" />
      <ThemeToggle size="md" />
      <ThemeToggle size="lg" />
    </div>
}`,...(m=(c=a.parameters)==null?void 0:c.docs)==null?void 0:m.source}}};var g,u,p;t.parameters={...t.parameters,docs:{...(g=t.parameters)==null?void 0:g.docs,source:{originalSource:`{
  render: () => <div data-theme="dark" style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 48,
    borderRadius: 12,
    background: 'var(--color-neutral-50)'
  }}>
      <ThemeToggle defaultTheme="dark" />
    </div>
}`,...(p=(u=t.parameters)==null?void 0:u.docs)==null?void 0:p.source}}};var f,h,v;s.parameters={...s.parameters,docs:{...(f=s.parameters)==null?void 0:f.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    width: 320,
    padding: 24,
    borderRadius: 12,
    background: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    color: 'var(--color-neutral-900)',
    fontFamily: 'var(--font-sans)'
  }}>
      <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }}>
        <strong style={{
        fontSize: 'var(--font-size-lg)'
      }}>Theme preview</strong>
        <ThemeToggle defaultTheme="light" />
      </div>
      <p style={{
      margin: 0,
      color: 'var(--color-neutral-600)'
    }}>
        Click the toggle to crossfade between light, dark and system themes.
      </p>
      <div style={{
      padding: 12,
      borderRadius: 8,
      background: 'var(--color-neutral-100)',
      color: 'var(--color-neutral-700)'
    }}>
        Surface, border and text colours all animate together.
      </div>
    </div>
}`,...(v=(h=s.parameters)==null?void 0:h.docs)==null?void 0:v.source}}};const k=["Default","Sizes","DarkBackground","Transition"];export{t as DarkBackground,o as Default,a as Sizes,s as Transition,k as __namedExportsOrder,b as default};
