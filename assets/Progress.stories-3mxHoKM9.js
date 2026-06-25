import{j as e}from"./jsx-runtime-DFAAy_2V.js";import"./index-Bc2G9s8g.js";const K={sm:{diameter:40,strokeWidth:4},md:{diameter:56,strokeWidth:5},lg:{diameter:72,strokeWidth:6}};function a({value:r,variant:h="linear",size:f="md",color:G="primary",showLabel:x=!1,label:O,animated:U=!1}){const p=Math.min(100,Math.max(0,r)),n=Math.round(p),F=O??`${n}% complete`,y=["chs-progress",`chs-progress--${h}`,`chs-progress--${f}`,`chs-progress--${G}`,U&&"chs-progress--animated"].filter(Boolean).join(" "),j={role:"progressbar","aria-valuenow":n,"aria-valuemin":0,"aria-valuemax":100,"aria-label":F};if(h==="circular"){const{diameter:i,strokeWidth:g}=K[f],s=i/2,v=(i-g)/2,b=2*Math.PI*v,J=b*(1-p/100);return e.jsx("span",{className:y,...j,children:e.jsxs("svg",{className:"chs-progress__svg",width:i,height:i,viewBox:`0 0 ${i} ${i}`,"aria-hidden":"true",focusable:"false",children:[e.jsx("circle",{className:"chs-progress__track",cx:s,cy:s,r:v,fill:"none",strokeWidth:g}),e.jsx("circle",{className:"chs-progress__indicator",cx:s,cy:s,r:v,fill:"none",strokeWidth:g,strokeLinecap:"round",strokeDasharray:b,strokeDashoffset:J,transform:`rotate(-90 ${s} ${s})`}),x&&e.jsxs("text",{className:"chs-progress__svg-label",x:s,y:s,textAnchor:"middle",dominantBaseline:"central",children:[n,"%"]})]})})}const H={width:`${p}%`};return e.jsxs("div",{className:"chs-progress__linear",children:[e.jsx("div",{className:y,...j,children:e.jsx("div",{className:"chs-progress__bar",style:H})}),x&&e.jsxs("span",{className:"chs-progress__value",children:[n,"%"]})]})}a.displayName="Progress";a.__docgenInfo={description:"Progress — a determinate progress indicator in two shapes.\n\n`linear` paints a token-driven bar whose width tracks `value`; `circular`\ndraws an SVG ring whose `stroke-dashoffset` reveals the arc. Both expose the\nstandard `progressbar` ARIA contract so screen readers announce the value.",methods:[],displayName:"Progress",props:{value:{required:!0,tsType:{name:"number"},description:"Current progress, clamped to the 0–100 range."},variant:{required:!1,tsType:{name:"union",raw:"'linear' | 'circular'",elements:[{name:"literal",value:"'linear'"},{name:"literal",value:"'circular'"}]},description:"Render as a horizontal bar or an SVG ring. @default 'linear'",defaultValue:{value:"'linear'",computed:!1}},size:{required:!1,tsType:{name:"union",raw:"'sm' | 'md' | 'lg'",elements:[{name:"literal",value:"'sm'"},{name:"literal",value:"'md'"},{name:"literal",value:"'lg'"}]},description:"Track thickness / ring diameter preset. @default 'md'",defaultValue:{value:"'md'",computed:!1}},color:{required:!1,tsType:{name:"union",raw:"'primary' | 'success' | 'warning' | 'danger'",elements:[{name:"literal",value:"'primary'"},{name:"literal",value:"'success'"},{name:"literal",value:"'warning'"},{name:"literal",value:"'danger'"}]},description:"Semantic color of the indicator. @default 'primary'",defaultValue:{value:"'primary'",computed:!1}},showLabel:{required:!1,tsType:{name:"boolean"},description:'Show the "N%" readout (beside the bar / inside the ring). @default false',defaultValue:{value:"false",computed:!1}},label:{required:!1,tsType:{name:"string"},description:"Custom `aria-label`. @default 'N% complete' (auto-generated)."},animated:{required:!1,tsType:{name:"boolean"},description:"Animate the linear bar with a shimmer sweep. @default false",defaultValue:{value:"false",computed:!1}}}};const Y={title:"Components/Progress",component:a,tags:["autodocs"],args:{value:60,variant:"linear",size:"md",color:"primary",showLabel:!1,animated:!1},argTypes:{value:{control:{type:"range",min:0,max:100,step:1}},variant:{control:"inline-radio",options:["linear","circular"]},size:{control:"inline-radio",options:["sm","md","lg"]},color:{control:"inline-radio",options:["primary","success","warning","danger"]},showLabel:{control:"boolean"},animated:{control:"boolean"}},decorators:[r=>e.jsx("div",{style:{width:320},children:e.jsx(r,{})})]},l={args:{value:60}},t={args:{variant:"circular",value:75}},o={render:r=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:24},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[e.jsx(a,{...r,variant:"linear",size:"sm"}),e.jsx(a,{...r,variant:"linear",size:"md"}),e.jsx(a,{...r,variant:"linear",size:"lg"})]}),e.jsxs("div",{style:{display:"flex",gap:24,alignItems:"center"},children:[e.jsx(a,{...r,variant:"circular",size:"sm"}),e.jsx(a,{...r,variant:"circular",size:"md"}),e.jsx(a,{...r,variant:"circular",size:"lg"})]})]})},c={render:r=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:12},children:[e.jsx(a,{...r,color:"primary"}),e.jsx(a,{...r,color:"success"}),e.jsx(a,{...r,color:"warning"}),e.jsx(a,{...r,color:"danger"})]})},d={args:{showLabel:!0,value:42}},m={args:{variant:"linear",value:60,animated:!0}},u={args:{variant:"linear",value:0,animated:!0}};var w,_,z;l.parameters={...l.parameters,docs:{...(w=l.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    value: 60
  }
}`,...(z=(_=l.parameters)==null?void 0:_.docs)==null?void 0:z.source}}};var P,N,S;t.parameters={...t.parameters,docs:{...(P=t.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    variant: 'circular',
    value: 75
  }
}`,...(S=(N=t.parameters)==null?void 0:N.docs)==null?void 0:S.source}}};var k,D,I;o.parameters={...o.parameters,docs:{...(k=o.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: args => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 24
  }}>
      <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }}>
        <Progress {...args} variant="linear" size="sm" />
        <Progress {...args} variant="linear" size="md" />
        <Progress {...args} variant="linear" size="lg" />
      </div>
      <div style={{
      display: 'flex',
      gap: 24,
      alignItems: 'center'
    }}>
        <Progress {...args} variant="circular" size="sm" />
        <Progress {...args} variant="circular" size="md" />
        <Progress {...args} variant="circular" size="lg" />
      </div>
    </div>
}`,...(I=(D=o.parameters)==null?void 0:D.docs)==null?void 0:I.source}}};var C,L,T;c.parameters={...c.parameters,docs:{...(C=c.parameters)==null?void 0:C.docs,source:{originalSource:`{
  render: args => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 12
  }}>
      <Progress {...args} color="primary" />
      <Progress {...args} color="success" />
      <Progress {...args} color="warning" />
      <Progress {...args} color="danger" />
    </div>
}`,...(T=(L=c.parameters)==null?void 0:L.docs)==null?void 0:T.source}}};var $,q,A;d.parameters={...d.parameters,docs:{...($=d.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    showLabel: true,
    value: 42
  }
}`,...(A=(q=d.parameters)==null?void 0:q.docs)==null?void 0:A.source}}};var V,W,M;m.parameters={...m.parameters,docs:{...(V=m.parameters)==null?void 0:V.docs,source:{originalSource:`{
  args: {
    variant: 'linear',
    value: 60,
    animated: true
  }
}`,...(M=(W=m.parameters)==null?void 0:W.docs)==null?void 0:M.source}}};var R,B,E;u.parameters={...u.parameters,docs:{...(R=u.parameters)==null?void 0:R.docs,source:{originalSource:`{
  args: {
    variant: 'linear',
    value: 0,
    animated: true
  }
}`,...(E=(B=u.parameters)==null?void 0:B.docs)==null?void 0:E.source}}};const Z=["Default","Circular","Sizes","Colors","WithLabel","Animated","Indeterminate"];export{m as Animated,t as Circular,c as Colors,l as Default,u as Indeterminate,o as Sizes,d as WithLabel,Z as __namedExportsOrder,Y as default};
