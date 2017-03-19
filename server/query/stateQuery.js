let stateList = `SELECT ?s ?sLabel 
WHERE {
      ?s wdt:P31 wd:Q35657.
      SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}
ORDER BY ?sLabel`


function getState(id) {
  return `SELECT ?s ?sLabel ?article ?flag ?map WHERE {
      ?s wdt:P31 wd:Q35657.
      ?s wdt:P242 ?map.
      ?s wdt:P41 ?flag.   
  OPTIONAL {
        {SELECT * WHERE{?s wdt:P1449 ?nick.} LIMIT 1}
      	?article schema:about ?s .
      	?article schema:inLanguage "en" .
      	?article schema:isPartOf <https://en.wikipedia.org/> .
    }
  FILTER(?s = wd:${id})  
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
 }`
}


module.exports = {
  getState: getState,
  stateList: stateList
};