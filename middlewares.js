export const logger = async (ctx, next) => {
  console.log('logger before next', ctx.body);
  await next();
  const rt = ctx.response.get('X-Response-Time');
  console.log('logger after next', `${ctx.method} ${ctx.url} - ${rt}`);
}

export const responseTime = async (ctx, next) => {
  console.log('x-response-time before next', ctx.body);
  const start = Date.now();
  await next();
  // throw new Error('x-response-time error');
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', `${ms}ms`);
  ctx.body = { ...ctx.body, responseTime: `${ms}ms`};
  console.log('x-response-time after next', ctx.body);
};


export const respond = async (ctx, next) => {
  console.log('response', ctx.body);
  ctx.cookies.set('x-court-scheduling-key', 'LJB Badminton', { signed: true });
  ctx.body = { ...ctx.body, description: 'Response Hello World'};
  // return {data: 'Response Hello World'};
  next();
};
