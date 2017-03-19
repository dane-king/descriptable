const request = require('request')


const queryUrl = 'https://query.wikidata.org/bigdata/namespace/wdq/sparql';


module.exports = (qry) => {
  return request.get({ url: queryUrl, qs: { query: qry, format: 'json' } })
}