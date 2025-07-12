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

function callSomeFunction () {
  console.log('callSomeFunction', app.response.body);
  app.currentContext = {} /* ctx of the middleware above */
}
app.use(async (ctx, next) => {
  callSomeFunction()
});

app.listen(3003);
