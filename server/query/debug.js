const qry = require('./stateQuery');
const runQuery = require('./query');

runQuery(qry).pipe(process.stdout);