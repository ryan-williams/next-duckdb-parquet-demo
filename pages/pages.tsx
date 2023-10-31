import React from "react"
import { loadParquet } from "@/src/parquet";

type Person = { id: number, name: string }
const parquetPath = 'public/people.parquet'

export async function getStaticProps() {
    const data = await loadParquet<Person>(parquetPath)  // ✅ works fine under pages/
    return { props: { data } }
}

export default function Home({ data }: { data: Person[] }) {
    return <div>
        <p>Parquet data loaded on server (in <code>getStaticProps</code>, with <code>loadParquet</code>):</p>
        <pre>{JSON.stringify(data)}</pre>
    </div>
}
