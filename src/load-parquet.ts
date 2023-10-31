/**
 * Adapted from https://github.com/ilyabo/graphnavi / https://github.com/duckdb/duckdb-wasm/issues/1148
 *
 * This is a trimmed down version of `parquet.ts` which contains a server-side loadParquet path, as well as some
 * print-debug statements for demonstrating brokenness when used under the "app router".
 */
import * as duckdb from "@duckdb/duckdb-wasm";
import {AsyncDuckDB, DuckDBBundle} from "@duckdb/duckdb-wasm";
import Worker from 'web-worker';
import path from "path"

type WorkerBundle = { bundle: DuckDBBundle, worker: Worker }

export async function nodeWorkerBundle(): Promise<WorkerBundle> {
    const DUCKDB_DIST = `node_modules/@duckdb/duckdb-wasm/dist`
    const bundle = await duckdb.selectBundle({
        mvp: {
            mainModule: path.resolve(DUCKDB_DIST, './duckdb-mvp.wasm'),
            mainWorker: path.resolve(DUCKDB_DIST, './duckdb-node-mvp.worker.cjs'),
        },
        eh: {
            mainModule: path.resolve(DUCKDB_DIST, './duckdb-eh.wasm'),
            mainWorker: path.resolve(DUCKDB_DIST, './duckdb-node-eh.worker.cjs'),
        },
    });
    const mainWorker = bundle.mainWorker
    if (mainWorker) {
        const worker = new Worker(mainWorker);
        return { bundle, worker }
    } else {
        throw Error(`No mainWorker: ${mainWorker}`)
    }
}

export async function initDuckDb(): Promise<AsyncDuckDB> {
    console.log("duckdb-wasm fetch")
    const { worker, bundle } = await nodeWorkerBundle()
    console.log("bestBundle:", bundle)
    const logger = new duckdb.ConsoleLogger()
    console.log("made logger");
    const db = new AsyncDuckDB(logger, worker);
    console.log("made db");
    await db.instantiate(bundle.mainModule, bundle.pthreadWorker);
    console.log("instantiated db");
    await db.open({
        path: ":memory:",
        query: {
            castBigIntToDouble: true,
        },
    });
    console.time("opened db");
    return db
}

/**
 * Run a query against the provided DuckDB instance, round-trip through JSON to obtain plain JS objects
 */
export async function runQuery<T>(db: AsyncDuckDB, query: string): Promise<T[]> {
    const conn = await db.connect()
    const result = await conn.query(query)
    const proxies = result.toArray()
    // TODO: is there an easier / cheaper way to get plain JS objects here?
    return JSON.parse(JSON.stringify(proxies)) as T[]
}

/**
 * Load a parquet file from a local path or URL
 */
export async function loadParquet<T>(path: string): Promise<T[]> {
    const db = await initDuckDb()
    return runQuery(db, `select * from read_parquet('${path}')`)
}
