(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(e,t,n){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return n(63)}])},63:function(e,t,n){"use strict";n.r(t),n.d(t,{__N_SSG:function(){return f},default:function(){return h}});var r=n(5893),a=n(7294),i=n(2777);n(4763),n(1864);let c={log:()=>{}};async function o(){let e=i.sq(),t=await i.Dn(e),n=t.mainWorker;if(n){let e=await i.ez(n);return{bundle:t,worker:e}}throw Error("No mainWorker: ".concat(n))}let s=null;async function u(){console.time("duckdb-wasm fetch");let{worker:e,bundle:t}=await o();console.timeEnd("duckdb-wasm fetch"),console.log("bestBundle:",t),console.time("DB instantiation");let n=new i.ak(c,e);return await n.instantiate(t.mainModule,t.pthreadWorker),await n.open({path:":memory:",query:{castBigIntToDouble:!0}}),console.timeEnd("DB instantiation"),n}async function l(e){let t=await (s||(s=u())),n=await t.connect(),r=await n.query("select * from read_parquet('".concat(e,"')")),a=r.toArray();return JSON.parse(JSON.stringify(a))}async function d(e,t,n){let r=await (s||(s=u())),a=new Uint8Array(e);await r.registerFileBuffer(t,a);let i=await r.connect(),c=await i.query("SELECT * FROM parquet_scan('".concat(t,"')")),o=JSON.parse(JSON.stringify(c.toArray()));return n(o),r}var f=!0;function h(e){let{dataArr:t,data:n}=e,i=function(e,t){let[n,r]=(0,a.useState)(null);return(0,a.useEffect)(()=>{d(e,t,r)},[]),n}(t,"people"),c="people.parquet",o="".concat(window.location.href).concat(c),s="".concat(window.location.host,"/").concat(c),u=function(e){let[t,n]=(0,a.useState)(null);return(0,a.useEffect)(()=>{e&&l(e).then(e=>n(e))},[]),t}(o);return(0,r.jsxs)("div",{children:[(0,r.jsxs)("p",{children:["Parquet data loaded on server (in ",(0,r.jsx)("code",{children:"getStaticProps"}),", with ",(0,r.jsx)("code",{children:"loadParquet"}),"):"]}),(0,r.jsx)("pre",{children:JSON.stringify(n)}),(0,r.jsxs)("p",{children:["Parquet data buffer loaded on server, parsed on client (with ",(0,r.jsx)("code",{children:"useParquetBuf"}),"):"]}),(0,r.jsx)("pre",{children:JSON.stringify(i)}),u&&(0,r.jsxs)(r.Fragment,{children:[(0,r.jsxs)("p",{children:["Parquet data fetched on client, from ",(0,r.jsx)("a",{href:o,children:s})," (with ",(0,r.jsx)("code",{children:"useParquet"}),"):"]}),(0,r.jsx)("pre",{children:JSON.stringify(u)})]})]})}}},function(e){e.O(0,[774,364,888,179],function(){return e(e.s=8312)}),_N_E=e.O()}]);