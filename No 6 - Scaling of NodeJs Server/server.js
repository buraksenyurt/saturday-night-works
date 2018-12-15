var enigma = require('./worker');
var Koa = require('koa');
var Router = require('koa-router');
var router = new Router();
var app = new Koa();

router.get('/', async context => context.body = `Process ID ${process.pid} is here`)
    .get('/ping', async context => {
        const result = await enigma.encrypt('README.md', 'README.mdx');
        context.body = result;'No 6'
    })
    .get('/pong', async context => {
        const result = await enigma.decrypt('README.mdx', 'benioku.md');
        context.body = result;
    });

app.use(async (context, next) => {
    await next();
    var responseTime = context.response.get('X-Response-Time');
    console.log(`${context.method} ${context.url} - ${responseTime}`);
}).use(async (context, next) => {
    var startTime = Date.now();
    await next();
    context.set('X-Response-Time', `${Date.now() - startTime}ms`);
})
    .use(router.routes())
    .listen(4444);