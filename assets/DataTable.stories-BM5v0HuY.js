import{j as e}from"./jsx-runtime-DFAAy_2V.js";import{S as re}from"./Skeleton-DOHpOyRE.js";import{r as k}from"./index-Bc2G9s8g.js";import{u as se}from"./usePagination-DQGAsxuz.js";import{B as T}from"./Button-CTLW7U7A.js";import{B as ne}from"./Badge-3fBGSY6l.js";function oe(a,t){return a===t?0:a==null?1:t==null?-1:typeof a=="number"&&typeof t=="number"?a-t:String(a).localeCompare(String(t))}function le(a){const[t,s]=k.useState(null),[n,l]=k.useState(null),c=d=>{if(d!==t){s(d),l("asc");return}n==="asc"?l("desc"):n==="desc"?(s(null),l(null)):l("asc")};return{sorted:k.useMemo(()=>{if(t===null||n===null)return a;const d=[...a];return d.sort((S,v)=>{const u=oe(S[t],v[t]);return n==="asc"?u:-u}),d},[a,t,n]),sortKey:t,sortDirection:n,toggleSort:c}}function ie({direction:a}){return e.jsxs("svg",{className:"chs-datatable__sort-icon",width:"14",height:"14",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true",children:[e.jsx("path",{d:"M12 5l5 6H7l5-6z",className:a==="asc"?"is-active":void 0}),e.jsx("path",{d:"M12 19l-5-6h10l-5 6z",className:a==="desc"?"is-active":void 0})]})}function j({columns:a,data:t,pageSize:s=10,loading:n=!1,emptyMessage:l="No data available."}){const{sorted:c,sortKey:N,sortDirection:d,toggleSort:S}=le(t),{page:v,currentPage:u,totalPages:J,startItem:Q,endItem:W,totalItems:w,canPrev:X,canNext:Y,goToPrev:Z,goToNext:ee}=se(c,s),ae=!n&&w===0,te=(r,i)=>{const o=i[r.key];return r.render?r.render(o,i):o};return e.jsxs("div",{className:"chs-datatable",children:[e.jsx("div",{className:"chs-datatable__scroll",children:e.jsxs("table",{className:"chs-datatable__table",children:[e.jsx("thead",{children:e.jsx("tr",{children:a.map(r=>{const i=N===r.key,o=r.sortable?i?d==="asc"?"ascending":"descending":"none":void 0;return e.jsx("th",{scope:"col",style:r.width?{width:r.width}:void 0,"aria-sort":o,children:r.sortable?e.jsxs("button",{type:"button",className:"chs-datatable__sort-btn",onClick:()=>S(r.key),children:[e.jsx("span",{children:r.header}),e.jsx(ie,{direction:i?d:null})]}):r.header},String(r.key))})})}),e.jsx("tbody",{children:n?Array.from({length:s},(r,i)=>e.jsx("tr",{className:"chs-datatable__row",children:a.map(o=>e.jsx("td",{children:e.jsx(re,{width:"80%"})},String(o.key)))},i)):ae?e.jsx("tr",{children:e.jsx("td",{className:"chs-datatable__empty",colSpan:a.length,children:l})}):v.map((r,i)=>e.jsx("tr",{className:"chs-datatable__row",children:a.map(o=>e.jsx("td",{style:o.width?{width:o.width}:void 0,children:te(o,r)},String(o.key)))},i))})]})}),!n&&w>0&&e.jsxs("div",{className:"chs-datatable__footer",children:[e.jsxs("span",{className:"chs-datatable__count",children:["Showing ",Q,"–",W," of ",w," items"]}),e.jsxs("div",{className:"chs-datatable__pager",children:[e.jsx(T,{variant:"secondary",size:"sm",onClick:Z,disabled:!X,children:"Previous"}),e.jsxs("span",{className:"chs-datatable__page-status",children:["Page ",u," of ",J]}),e.jsx(T,{variant:"secondary",size:"sm",onClick:ee,disabled:!Y,children:"Next"})]})]})]})}j.displayName="DataTable";j.__docgenInfo={description:"DataTable — a generic, sortable, paginated table.\n\nSorting and pagination are delegated to the `useSort` / `usePagination` hooks\nand composed here (sort first, then page the result). The `T` generic flows\nthrough `columns[].key` and `render`, so cell values stay typed without an\n`any` in sight. Loading swaps in `Skeleton` rows that mirror the real column\ncount; an empty dataset shows `emptyMessage` centred across the table.",methods:[],displayName:"DataTable",props:{columns:{required:!0,tsType:{name:"Array",elements:[{name:"DataTableColumn",elements:[{name:"T"}],raw:"DataTableColumn<T>"}],raw:"DataTableColumn<T>[]"},description:"Column definitions, in display order."},data:{required:!0,tsType:{name:"Array",elements:[{name:"T"}],raw:"T[]"},description:"The rows to display."},pageSize:{required:!1,tsType:{name:"number"},description:"Rows per page. @default 10",defaultValue:{value:"10",computed:!1}},loading:{required:!1,tsType:{name:"boolean"},description:"Swap the body for skeleton rows while data loads. @default false",defaultValue:{value:"false",computed:!1}},emptyMessage:{required:!1,tsType:{name:"string"},description:"Shown when there is no data and we aren't loading.",defaultValue:{value:"'No data available.'",computed:!1}}}};const _=["Admin","Editor","Viewer"],C=["Ada","Linus","Grace","Alan","Margaret","Dennis","Barbara","Ken"],A=["Lovelace","Torvalds","Hopper","Turing","Hamilton","Ritchie","Liskov","Thompson"];function x(a){return Array.from({length:a},(t,s)=>{const n=C[s%C.length]??"Ada",l=A[s%A.length]??"Lovelace",c=_[s%_.length]??"Viewer";return{id:s+1,name:`${n} ${l}`,email:`${n}.${l}`.toLowerCase()+"@example.com",role:c,age:24+s*7%40}})}const m=[{key:"name",header:"Name",sortable:!0},{key:"email",header:"Email"},{key:"role",header:"Role",sortable:!0,width:"140px"},{key:"age",header:"Age",sortable:!0,width:"80px"}],ge={title:"Components/DataTable",component:j,tags:["autodocs"],parameters:{layout:"padded"}},p={args:{columns:m.map(a=>({...a,sortable:!1})),data:x(5)}},h={args:{columns:m,data:x(8)}},g={args:{columns:m,data:x(28),pageSize:10}},f={args:{columns:m,data:[],loading:!0,pageSize:5}},y={args:{columns:m,data:[],emptyMessage:"No users match your filter."}},b={args:{data:x(20),columns:[{key:"name",header:"Name",sortable:!0},{key:"email",header:"Email"},{key:"role",header:"Role",sortable:!0,width:"140px",render:a=>{const t=a,s=t==="Admin"?"info":t==="Editor"?"success":"default";return e.jsx(ne,{variant:s,children:t})}},{key:"age",header:"Age",sortable:!0,width:"80px"}]}};var D,E,B;p.parameters={...p.parameters,docs:{...(D=p.parameters)==null?void 0:D.docs,source:{originalSource:`{
  args: {
    columns: columns.map(c => ({
      ...c,
      sortable: false
    })),
    data: makeUsers(5)
  }
}`,...(B=(E=p.parameters)==null?void 0:E.docs)==null?void 0:B.source}}};var P,z,L;h.parameters={...h.parameters,docs:{...(P=h.parameters)==null?void 0:P.docs,source:{originalSource:`{
  args: {
    columns,
    data: makeUsers(8)
  }
}`,...(L=(z=h.parameters)==null?void 0:z.docs)==null?void 0:L.source}}};var M,R,U;g.parameters={...g.parameters,docs:{...(M=g.parameters)==null?void 0:M.docs,source:{originalSource:`{
  args: {
    columns,
    data: makeUsers(28),
    pageSize: 10
  }
}`,...(U=(R=g.parameters)==null?void 0:R.docs)==null?void 0:U.source}}};var q,I,V;f.parameters={...f.parameters,docs:{...(q=f.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    columns,
    data: [],
    loading: true,
    pageSize: 5
  }
}`,...(V=(I=f.parameters)==null?void 0:I.docs)==null?void 0:V.source}}};var K,$,H;y.parameters={...y.parameters,docs:{...(K=y.parameters)==null?void 0:K.docs,source:{originalSource:`{
  args: {
    columns,
    data: [],
    emptyMessage: 'No users match your filter.'
  }
}`,...(H=($=y.parameters)==null?void 0:$.docs)==null?void 0:H.source}}};var G,O,F;b.parameters={...b.parameters,docs:{...(G=b.parameters)==null?void 0:G.docs,source:{originalSource:`{
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
}`,...(F=(O=b.parameters)==null?void 0:O.docs)==null?void 0:F.source}}};const fe=["BasicTable","SortableColumns","Pagination","LoadingState","EmptyState","RealData"];export{p as BasicTable,y as EmptyState,f as LoadingState,g as Pagination,b as RealData,h as SortableColumns,fe as __namedExportsOrder,ge as default};
