var seneca = require('seneca')()
  .use(require('./query/plugin'))
  .listen()

//.act('role:query,cmd:state', console.log)