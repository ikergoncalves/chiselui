import{j as t}from"./jsx-runtime-DFAAy_2V.js";import{S as se}from"./Skeleton-DOHpOyRE.js";import{r as h}from"./index-Bc2G9s8g.js";import{B as C}from"./Button-CTLW7U7A.js";import{B as re}from"./Badge-3fBGSY6l.js";function ne(e,a){return e===a?0:e==null?1:a==null?-1:typeof e=="number"&&typeof a=="number"?e-a:String(e).localeCompare(String(a))}function oe(e){const[a,s]=h.useState(null),[r,o]=h.useState(null),l=d=>{if(d!==a){s(d),o("asc");return}r==="asc"?o("desc"):r==="desc"?(s(null),o(null)):o("asc")};return{sorted:h.useMemo(()=>{if(a===null||r===null)return e;const d=[...e];return d.sort((p,g)=>{const u=ne(p[a],g[a]);return r==="asc"?u:-u}),d},[e,a,r]),sortKey:a,sortDirection:r,toggleSort:l}}function le(e,a){const[s,r]=h.useState(1),o=e.length,l=Math.max(1,Math.ceil(o/a));h.useEffect(()=>{s>l&&r(l)},[s,l]);const y=h.useMemo(()=>{const i=(s-1)*a;return e.slice(i,i+a)},[e,s,a]),d=o===0?0:(s-1)*a+1,p=Math.min(s*a,o),g=s>1,u=s<l;return{page:y,currentPage:s,totalPages:l,startItem:d,endItem:p,totalItems:o,canPrev:g,canNext:u,goToPrev:()=>r(i=>Math.max(1,i-1)),goToNext:()=>r(i=>Math.min(l,i+1)),setPage:i=>r(Math.min(l,Math.max(1,i)))}}function ie({direction:e}){return t.jsxs("svg",{className:"chs-datatable__sort-icon",width:"14",height:"14",viewBox:"0 0 24 24",fill:"currentColor","aria-hidden":"true",children:[t.jsx("path",{d:"M12 5l5 6H7l5-6z",className:e==="asc"?"is-active":void 0}),t.jsx("path",{d:"M12 19l-5-6h10l-5 6z",className:e==="desc"?"is-active":void 0})]})}function N({columns:e,data:a,pageSize:s=10,loading:r=!1,emptyMessage:o="No data available."}){const{sorted:l,sortKey:y,sortDirection:d,toggleSort:p}=oe(a),{page:g,currentPage:u,totalPages:j,startItem:_,endItem:P,totalItems:i,canPrev:X,canNext:Y,goToPrev:Z,goToNext:ee}=le(l,s),ae=!r&&i===0,te=(n,m)=>{const c=m[n.key];return n.render?n.render(c,m):c};return t.jsxs("div",{className:"chs-datatable",children:[t.jsx("div",{className:"chs-datatable__scroll",children:t.jsxs("table",{className:"chs-datatable__table",children:[t.jsx("thead",{children:t.jsx("tr",{children:e.map(n=>{const m=y===n.key,c=n.sortable?m?d==="asc"?"ascending":"descending":"none":void 0;return t.jsx("th",{scope:"col",style:n.width?{width:n.width}:void 0,"aria-sort":c,children:n.sortable?t.jsxs("button",{type:"button",className:"chs-datatable__sort-btn",onClick:()=>p(n.key),children:[t.jsx("span",{children:n.header}),t.jsx(ie,{direction:m?d:null})]}):n.header},String(n.key))})})}),t.jsx("tbody",{children:r?Array.from({length:s},(n,m)=>t.jsx("tr",{className:"chs-datatable__row",children:e.map(c=>t.jsx("td",{children:t.jsx(se,{width:"80%"})},String(c.key)))},m)):ae?t.jsx("tr",{children:t.jsx("td",{className:"chs-datatable__empty",colSpan:e.length,children:o})}):g.map((n,m)=>t.jsx("tr",{className:"chs-datatable__row",children:e.map(c=>t.jsx("td",{style:c.width?{width:c.width}:void 0,children:te(c,n)},String(c.key)))},m))})]})}),!r&&i>0&&t.jsxs("div",{className:"chs-datatable__footer",children:[t.jsxs("span",{className:"chs-datatable__count",children:["Showing ",_,"–",P," of ",i," items"]}),t.jsxs("div",{className:"chs-datatable__pager",children:[t.jsx(C,{variant:"secondary",size:"sm",onClick:Z,disabled:!X,children:"Previous"}),t.jsxs("span",{className:"chs-datatable__page-status",children:["Page ",u," of ",j]}),t.jsx(C,{variant:"secondary",size:"sm",onClick:ee,disabled:!Y,children:"Next"})]})]})]})}N.displayName="DataTable";N.__docgenInfo={description:"DataTable — a generic, sortable, paginated table.\n\nSorting and pagination are delegated to the `useSort` / `usePagination` hooks\nand composed here (sort first, then page the result). The `T` generic flows\nthrough `columns[].key` and `render`, so cell values stay typed without an\n`any` in sight. Loading swaps in `Skeleton` rows that mirror the real column\ncount; an empty dataset shows `emptyMessage` centred across the table.",methods:[],displayName:"DataTable",props:{columns:{required:!0,tsType:{name:"Array",elements:[{name:"DataTableColumn",elements:[{name:"T"}],raw:"DataTableColumn<T>"}],raw:"DataTableColumn<T>[]"},description:"Column definitions, in display order."},data:{required:!0,tsType:{name:"Array",elements:[{name:"T"}],raw:"T[]"},description:"The rows to display."},pageSize:{required:!1,tsType:{name:"number"},description:"Rows per page. @default 10",defaultValue:{value:"10",computed:!1}},loading:{required:!1,tsType:{name:"boolean"},description:"Swap the body for skeleton rows while data loads. @default false",defaultValue:{value:"false",computed:!1}},emptyMessage:{required:!1,tsType:{name:"string"},description:"Shown when there is no data and we aren't loading.",defaultValue:{value:"'No data available.'",computed:!1}}}};const M=["Admin","Editor","Viewer"],A=["Ada","Linus","Grace","Alan","Margaret","Dennis","Barbara","Ken"],D=["Lovelace","Torvalds","Hopper","Turing","Hamilton","Ritchie","Liskov","Thompson"];function k(e){return Array.from({length:e},(a,s)=>{const r=A[s%A.length]??"Ada",o=D[s%D.length]??"Lovelace",l=M[s%M.length]??"Viewer";return{id:s+1,name:`${r} ${o}`,email:`${r}.${o}`.toLowerCase()+"@example.com",role:l,age:24+s*7%40}})}const f=[{key:"name",header:"Name",sortable:!0},{key:"email",header:"Email"},{key:"role",header:"Role",sortable:!0,width:"140px"},{key:"age",header:"Age",sortable:!0,width:"80px"}],pe={title:"Components/DataTable",component:N,tags:["autodocs"],parameters:{layout:"padded"}},b={args:{columns:f.map(e=>({...e,sortable:!1})),data:k(5)}},x={args:{columns:f,data:k(8)}},v={args:{columns:f,data:k(28),pageSize:10}},w={args:{columns:f,data:[],loading:!0,pageSize:5}},S={args:{columns:f,data:[],emptyMessage:"No users match your filter."}},T={args:{data:k(20),columns:[{key:"name",header:"Name",sortable:!0},{key:"email",header:"Email"},{key:"role",header:"Role",sortable:!0,width:"140px",render:e=>{const a=e,s=a==="Admin"?"info":a==="Editor"?"success":"default";return t.jsx(re,{variant:s,children:a})}},{key:"age",header:"Age",sortable:!0,width:"80px"}]}};var E,B,I;b.parameters={...b.parameters,docs:{...(E=b.parameters)==null?void 0:E.docs,source:{originalSource:`{
  args: {
    columns: columns.map(c => ({
      ...c,
      sortable: false
    })),
    data: makeUsers(5)
  }
}`,...(I=(B=b.parameters)==null?void 0:B.docs)==null?void 0:I.source}}};var L,R,U;x.parameters={...x.parameters,docs:{...(L=x.parameters)==null?void 0:L.docs,source:{originalSource:`{
  args: {
    columns,
    data: makeUsers(8)
  }
}`,...(U=(R=x.parameters)==null?void 0:R.docs)==null?void 0:U.source}}};var q,V,K;v.parameters={...v.parameters,docs:{...(q=v.parameters)==null?void 0:q.docs,source:{originalSource:`{
  args: {
    columns,
    data: makeUsers(28),
    pageSize: 10
  }
}`,...(K=(V=v.parameters)==null?void 0:V.docs)==null?void 0:K.source}}};var $,z,H;w.parameters={...w.parameters,docs:{...($=w.parameters)==null?void 0:$.docs,source:{originalSource:`{
  args: {
    columns,
    data: [],
    loading: true,
    pageSize: 5
  }
}`,...(H=(z=w.parameters)==null?void 0:z.docs)==null?void 0:H.source}}};var G,O,F;S.parameters={...S.parameters,docs:{...(G=S.parameters)==null?void 0:G.docs,source:{originalSource:`{
  args: {
    columns,
    data: [],
    emptyMessage: 'No users match your filter.'
  }
}`,...(F=(O=S.parameters)==null?void 0:O.docs)==null?void 0:F.source}}};var J,Q,W;T.parameters={...T.parameters,docs:{...(J=T.parameters)==null?void 0:J.docs,source:{originalSource:`{
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
}`,...(W=(Q=T.parameters)==null?void 0:Q.docs)==null?void 0:W.source}}};const ge=["BasicTable","SortableColumns","Pagination","LoadingState","EmptyState","RealData"];export{b as BasicTable,S as EmptyState,w as LoadingState,v as Pagination,T as RealData,x as SortableColumns,ge as __namedExportsOrder,pe as default};
