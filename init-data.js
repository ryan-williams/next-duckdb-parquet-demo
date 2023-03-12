const duckdb = require('duckdb')
const db = new duckdb.Database(':memory:')
db.run(`
CREATE TABLE people(id INTEGER, name VARCHAR);
INSERT INTO people VALUES (1, 'Mark'), (2, 'Hannes');
COPY (SELECT * FROM people) TO 'public/people.parquet' (FORMAT 'parquet');
`)
