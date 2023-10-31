# next.js / duckdb-wasm parquet demo
Example [Next.js] app using [duckdb-wasm] to read/fetch Parquet files, in Node and the browser.

**This `@app-broken` branch is a repro of some brokenness under the [App Router] (also [next.js#57819]); see [the @main branch][repo] or [live demo][demo] for a working example.** 

## ⚠️ Broken under "App Router" ⚠️ <a id="app-broken"></a>

For some reason, [the server-side `loadParquet` path][loadParquet] doesn't seem to work under Next.js new "App router."

Here's a trimmed down example:

- [pages/pages.tsx] ✅ works
- [app/app/page.tsx] ❌ broken

Attempting to load the latter emits this on the server side:
```
duckdb-wasm fetch
bestBundle: {
  mainModule: '/Users/ryan/c/next-duckdb-parquet-demo/node_modules/@duckdb/duckdb-wasm/dist/duckdb-eh.wasm',
  mainWorker: '/Users/ryan/c/next-duckdb-parquet-demo/node_modules/@duckdb/duckdb-wasm/dist/duckdb-node-eh.worker.cjs',
  pthreadWorker: null
}
made logger
made db
worker terminated with 1 pending requests
```
and the client hangs.

Similarly, `next build` times out, meaning I can't deploy a demo. [Here's a GitHub Actions run][failed GHA] that failed due to this issue.

`diff pages/pages.tsx app/app/page.tsx`:
```diff
-export async function getStaticProps() {
-    const data = await loadParquet<Person>(parquetPath)  // ✅ works fine under pages/
-    return { props: { data } }
-}
-
-export default function Home({ data }: { data: Person[] }) {
+export default async function Home() {
+    const data = await loadParquet<Person>(parquetPath)  // ❌ broken under app/
```

[This line][broken db instantiation line]:

```typescript
await db.instantiate(bundle.mainModule, bundle.pthreadWorker);
```
emits this error:
```
worker terminated with 1 pending requests
```

I haven't found any further leads about what might be going on.


[Next.js]: https://nextjs.org/
[duckdb-wasm]: https://github.com/duckdb/duckdb-wasm
[repo]: https://github.com/ryan-williams/next-duckdb-parquet-demo
[demo]: https://runsascoded.com/next-duckdb-parquet-demo/

[pages/pages.tsx]: pages/pages.tsx
[app/app/page.tsx]: app/app/page.tsx
[failed GHA]: https://github.com/ryan-williams/next-duckdb-parquet-demo/actions/runs/6708443526/job/18229259080

[loadParquet]: src/parquet.ts#L66-L72
[broken db instantiation line]: src/parquet.ts#L43
[App Router]: https://nextjs.org/docs/app
[next.js#57819]: https://github.com/vercel/next.js/discussions/57819
