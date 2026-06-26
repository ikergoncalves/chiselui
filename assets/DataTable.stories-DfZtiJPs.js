import{j as $}from"./jsx-runtime-DFAAy_2V.js";import{D as j}from"./DataTable-JIj4Yy94.js";import{B as M}from"./Badge-CoqqYGGi.js";import"./index-Bc2G9s8g.js";import"./Skeleton-DOHpOyRE.js";import"./usePagination-DQGAsxuz.js";import"./Button-CTLW7U7A.js";const p=["Admin","Editor","Viewer"],g=["Ada","Linus","Grace","Alan","Margaret","Dennis","Barbara","Ken"],h=["Lovelace","Torvalds","Hopper","Turing","Hamilton","Ritchie","Liskov","Thompson"];function d(a){return Array.from({length:a},(s,e)=>{const i=g[e%g.length]??"Ada",u=h[e%h.length]??"Lovelace",z=p[e%p.length]??"Viewer";return{id:e+1,name:`${i} ${u}`,email:`${i}.${u}`.toLowerCase()+"@example.com",role:z,age:24+e*7%40}})}const r=[{key:"name",header:"Name",sortable:!0},{key:"email",header:"Email"},{key:"role",header:"Role",sortable:!0,width:"140px"},{key:"age",header:"Age",sortable:!0,width:"80px"}],q={title:"Components/DataTable",component:j,tags:["autodocs"],parameters:{layout:"padded"}},t={args:{columns:r.map(a=>({...a,sortable:!1})),data:d(5)}},o={args:{columns:r,data:d(8)}},n={args:{columns:r,data:d(28),pageSize:10}},m={args:{columns:r,data:[],loading:!0,pageSize:5}},c={args:{columns:r,data:[],emptyMessage:"No users match your filter."}},l={args:{data:d(20),columns:[{key:"name",header:"Name",sortable:!0},{key:"email",header:"Email"},{key:"role",header:"Role",sortable:!0,width:"140px",render:a=>{const s=a,e=s==="Admin"?"info":s==="Editor"?"success":"default";return $.jsx(M,{variant:e,children:s})}},{key:"age",header:"Age",sortable:!0,width:"80px"}]}};var y,b,k;t.parameters={...t.parameters,docs:{...(y=t.parameters)==null?void 0:y.docs,source:{originalSource:`{
  args: {
    columns: columns.map(c => ({
      ...c,
      sortable: false
    })),
    data: makeUsers(5)
  }
}`,...(k=(b=t.parameters)==null?void 0:b.docs)==null?void 0:k.source}}};var f,S,x;o.parameters={...o.parameters,docs:{...(f=o.parameters)==null?void 0:f.docs,source:{originalSource:`{
  args: {
    columns,
    data: makeUsers(8)
  }
}`,...(x=(S=o.parameters)==null?void 0:S.docs)==null?void 0:x.source}}};var v,A,E;n.parameters={...n.parameters,docs:{...(v=n.parameters)==null?void 0:v.docs,source:{originalSource:`{
  args: {
    columns,
    data: makeUsers(28),
    pageSize: 10
  }
}`,...(E=(A=n.parameters)==null?void 0:A.docs)==null?void 0:E.source}}};var w,B,L;m.parameters={...m.parameters,docs:{...(w=m.parameters)==null?void 0:w.docs,source:{originalSource:`{
  args: {
    columns,
    data: [],
    loading: true,
    pageSize: 5
  }
}`,...(L=(B=m.parameters)==null?void 0:B.docs)==null?void 0:L.source}}};var N,R,T;c.parameters={...c.parameters,docs:{...(N=c.parameters)==null?void 0:N.docs,source:{originalSource:`{
  args: {
    columns,
    data: [],
    emptyMessage: 'No users match your filter.'
  }
}`,...(T=(R=c.parameters)==null?void 0:R.docs)==null?void 0:T.source}}};var D,U,C;l.parameters={...l.parameters,docs:{...(D=l.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    data: makeUsers(20),
    columns: [{
      key: 'name',
      header: 'Name',
      sortable: true
    }, {
      key: 'email',
      header: 'Email'
    }, {
      key: 'role',
      header: 'Role',
      sortable: true,
      width: '140px',
      // Custom renderer: surface the role as a coloured Badge.
      render: value => {
        const role = value as User['role'];
        const variant = role === 'Admin' ? 'info' : role === 'Editor' ? 'success' : 'default';
        return <Badge variant={variant}>{role}</Badge>;
      }
    }, {
      key: 'age',
      header: 'Age',
      sortable: true,
      width: '80px'
    }]
  }
}`,...(C=(U=l.parameters)==null?void 0:U.docs)==null?void 0:C.source}}};const F=["BasicTable","SortableColumns","Pagination","LoadingState","EmptyState","RealData"];export{t as BasicTable,c as EmptyState,m as LoadingState,n as Pagination,l as RealData,o as SortableColumns,F as __namedExportsOrder,q as default};
