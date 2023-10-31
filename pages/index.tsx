import React from "react"
import * as fs from "fs";
import {loadParquet, useParquet, useParquetBuf} from "@/src/parquet";

type Person = { id: number, name: string }

export async function getStaticProps() {
    const parquetPath = 'public/people.parquet'  // generated by `node init-data.js`
    const dataArr = fs.readFileSync(parquetPath).toJSON().data
    const data = await loadParquet<Person>(parquetPath)
    return { props: { dataArr, data } }
}

export default function Home({ dataArr, data }: { dataArr: number[], data: Person[] }) {
    const parsedData = useParquetBuf(dataArr, 'people')

    const path = 'people.parquet'
    const url = (typeof window !== 'undefined') ? `${window.location.href}${path}` : undefined
    const fetchedData = useParquet(url)
    return (
        <div>
            <p>Parquet data loaded on server (in <code>getStaticProps</code>, with <code>loadParquet</code>):</p>
            <pre>{JSON.stringify(data)}</pre>
            <p>Parquet data buffer loaded on server, parsed on client (with <code>useParquetBuf</code>):</p>
            <pre>{JSON.stringify(parsedData)}</pre>
            {fetchedData && <>
                <p>Parquet data fetched on client, from <a href={url}>{url}</a> (with <code>useParquet</code>):</p>
                <pre>{JSON.stringify(fetchedData)}</pre>
            </>}
        </div>
    )
}
