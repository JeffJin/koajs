const http = require('http');
const https = require('https');
const Koa = require('koa');
const KeyGrip = require('Keygrip');
const { logger, responseTime, respond } = require('./middlewares');

const app = new Koa({ asyncLocalStorage: true });

//set keys
app.keys = new KeyGrip(['**eLUU*veU-9JzyaXnhM!bEZn8WuXpzkEwrf', 'GXBm@kFD.Zt-.URfUJfRC6D!n9ncn.Rd66T*'], 'sha256');

// middlewares
app.use(logger)
.use(responseTime)
.use(respond);

function setCurrentContext (data) {
  console.log('callSomeFunction', app.response.body);
  app.currentContext = {...data} /* ctx of the middleware above */
}
app.use(async (ctx, next) => {
  setCurrentContext({data: 'empty'})
});

app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

// app.listen(3003);
http.createServer(app.callback()).listen(3000);
https.createServer(app.callback()).listen(3001);