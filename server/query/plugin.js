let wikidata_qry = require('./wiki_data');
let state = require('./stateQuery');

const idx = p => o =>
  p.reduce((xs, x) =>
    (xs && xs[x]) ? xs[x] : null, o)


const getStateLink = idx(['s', 'value'])
const getStateName = idx(['sLabel', 'value'])
const getMap = idx(['map', 'value'])
const getFlag = idx(['flag', 'value'])

const getStateObj = function(o) {
  return {
    "state": getStateLink(o),
    "name": getStateName(o),
    "map": getMap(o),
    "flag": getFlag(o)
  }
}
const getStateListObj = function(o) {
  return {
    "state": getStateLink(o),
    "name": getStateName(o)
  }
}


module.exports = function api(options) {
  this.add('role:query,cmd:wikidata,state:true', function(msg, reply) {
    let qry;
    let parseFn;
    if (msg.id) {
      qry = state.getState(msg.id);
      parseFn = getStateObj;
    } else {
      qry = state.stateList;
      parseFn = getStateListObj;
    }
    console.log('qry is' + qry)
    this.act({
      role: 'query',
      cmd: 'wikidata',
      query: qry,
      parseFn: parseFn
    }, reply)
  });

  this.add('role:query,cmd:wikidata', (msg, reply) => {
    let rawData = '';
    let res = wikidata_qry(msg.query);
    res.on('data', (chunk) => rawData += chunk);

    res.on('end', () => {
      try {
        let parsedData = JSON.parse(rawData);
        let resp = parsedData.results.bindings || [];
        console.log(parsedData);
        reply(null, msg.parseFn ? resp.map(msg.parseFn) : resp)
      } catch (e) {
        console.log(e.message);
      }
    });
  })

}