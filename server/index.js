const request = require('request');
const query = `SELECT ?s ?sLabel ?article ?nick ?flag ?pop ?map WHERE {
  {
      ?s wdt:P31 wd:Q35657.
      ?s wdt:P1449 ?nick.
      ?s wdt:P1082 ?pop.
      ?s wdt:P41 ?flag.
      ?s wdt:P242 ?map.
           OPTIONAL {
      ?article schema:about ?s .
      ?article schema:inLanguage "en" .
      ?article schema:isPartOf <https://en.wikipedia.org/> .
    }
    }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}`

const propertiesObject = {
  query: query,
  format: 'json'
}
request({ url: 'https://query.wikidata.org/bigdata/namespace/wdq/sparql', qs: propertiesObject }, function(error, response, body) {
  if (!error && response.statusCode == 200) {
    console.log(body)
  }
})