import React from "react"
import { loadParquet } from "@/src/load-parquet";

type Person = { id: number, name: string }
const parquetPath = 'public/people.parquet'

export default async function Home() {
    const data = await loadParquet<Person>(parquetPath)  // ❌ broken under app/
    return <div>
        <p>Parquet data loaded on server (in <code>getStaticProps</code>, with <code>loadParquet</code>):</p>
        <pre>{JSON.stringify(data)}</pre>
    </div>
}
