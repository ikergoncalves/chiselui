import{j as e}from"./jsx-runtime-DFAAy_2V.js";import{r as t}from"./index-Bc2G9s8g.js";import{B as T}from"./Badge-CoqqYGGi.js";import{T as A}from"./ThemeToggle-Dqm3N4Uj.js";import{A as z}from"./Accordion-8ILVEmIx.js";import{S as s}from"./Switch-BxaGobgr.js";const D={maxWidth:560,border:"1px solid var(--color-border)",borderRadius:"var(--radius-lg)",overflow:"hidden"},E={padding:"var(--space-5) var(--space-6)",borderBottom:"1px solid var(--color-border)",display:"flex",justifyContent:"space-between",alignItems:"center"},o={display:"flex",flexDirection:"column",gap:"var(--space-3)",padding:"var(--space-4) var(--space-6)"};function a(){const[m,u]=t.useState(!1),[f,y]=t.useState(!0),[S,v]=t.useState(!1),[k,x]=t.useState(!0),[b,w]=t.useState(!1),[j,C]=t.useState(!1),[P]=t.useState(!1),N=[{id:"appearance",title:"Appearance",content:e.jsxs("div",{style:o,children:[e.jsx(s,{label:"Dark mode",checked:P,disabled:!0}),e.jsx(s,{label:"Compact layout",checked:m,onChange:u})]})},{id:"notifications",title:"Notifications",content:e.jsxs("div",{style:o,children:[e.jsx(s,{label:"Email notifications",checked:f,onChange:y}),e.jsx(s,{label:"Push notifications",checked:S,onChange:v}),e.jsx(s,{label:"Weekly digest",checked:k,onChange:x})]})},{id:"privacy",title:"Privacy",content:e.jsxs("div",{style:o,children:[e.jsx(s,{label:"Share usage data",checked:b,onChange:w}),e.jsx(s,{label:"Personalized ads",checked:j,onChange:C})]})}];return e.jsxs("div",{style:D,children:[e.jsxs("div",{style:E,children:[e.jsxs("div",{style:{display:"flex",alignItems:"center",gap:"var(--space-3)"},children:[e.jsx("h2",{style:{margin:0,fontSize:"var(--font-size-lg)"},children:"Settings"}),e.jsx(T,{variant:"info",children:"Beta"})]}),e.jsx(A,{})]}),e.jsx(z,{items:N,allowMultiple:!0,defaultOpenIds:["appearance"]})]})}const O={title:"Compositions/Settings Panel",component:a,tags:["autodocs"],parameters:{layout:"centered"}},i={};a.__docgenInfo={description:`SettingsPanel — Accordion + Switch + Badge + ThemeToggle composing into a
settings surface. Each switch is independently controlled, the accordion lets
several sections stay open at once, and the ThemeToggle in the header recolours
every component through the shared design tokens.`,methods:[],displayName:"SettingsPanel"};var n,c,l,r,d;a.parameters={...a.parameters,docs:{...(n=a.parameters)==null?void 0:n.docs,source:{originalSource:`function SettingsPanel() {
  // One useState per switch keeps each toggle independently controlled.
  const [compactLayout, setCompactLayout] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [pushNotifications, setPushNotifications] = useState(false);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [shareUsage, setShareUsage] = useState(false);
  const [personalizedAds, setPersonalizedAds] = useState(false);

  // "Dark mode" is owned by the ThemeToggle in the header, so this switch is just
  // an indicator: it's disabled and never toggles. I still keep it in state so
  // every switch in the panel follows the same controlled pattern.
  const [darkMode] = useState(false);
  const items: AccordionItem[] = [{
    id: 'appearance',
    title: 'Appearance',
    content: <div style={sectionStyle}>
          <Switch label="Dark mode" checked={darkMode} disabled />
          <Switch label="Compact layout" checked={compactLayout} onChange={setCompactLayout} />
        </div>
  }, {
    id: 'notifications',
    title: 'Notifications',
    content: <div style={sectionStyle}>
          <Switch label="Email notifications" checked={emailNotifications} onChange={setEmailNotifications} />
          <Switch label="Push notifications" checked={pushNotifications} onChange={setPushNotifications} />
          <Switch label="Weekly digest" checked={weeklyDigest} onChange={setWeeklyDigest} />
        </div>
  }, {
    id: 'privacy',
    title: 'Privacy',
    content: <div style={sectionStyle}>
          <Switch label="Share usage data" checked={shareUsage} onChange={setShareUsage} />
          <Switch label="Personalized ads" checked={personalizedAds} onChange={setPersonalizedAds} />
        </div>
  }];
  return <div style={panelStyle}>
      <div style={headerStyle}>
        <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-3)'
      }}>
          <h2 style={{
          margin: 0,
          fontSize: 'var(--font-size-lg)'
        }}>Settings</h2>
          <Badge variant="info">Beta</Badge>
        </div>
        <ThemeToggle />
      </div>

      <Accordion items={items} allowMultiple defaultOpenIds={['appearance']} />
    </div>;
}`,...(l=(c=a.parameters)==null?void 0:c.docs)==null?void 0:l.source},description:{story:`SettingsPanel — Accordion + Switch + Badge + ThemeToggle composing into a
settings surface. Each switch is independently controlled, the accordion lets
several sections stay open at once, and the ThemeToggle in the header recolours
every component through the shared design tokens.`,...(d=(r=a.parameters)==null?void 0:r.docs)==null?void 0:d.description}}};var h,p,g;i.parameters={...i.parameters,docs:{...(h=i.parameters)==null?void 0:h.docs,source:{originalSource:"{}",...(g=(p=i.parameters)==null?void 0:p.docs)==null?void 0:g.source}}};const _=["SettingsPanel","Default"];export{i as Default,a as SettingsPanel,_ as __namedExportsOrder,O as default};
