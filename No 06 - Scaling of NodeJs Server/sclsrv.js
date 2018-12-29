const cluster = require('cluster');
const { cpus } = require('os')
const isMaster = cluster.isMaster
const numOfWorkers = cpus().length

// Master process'temiyiz?
if (isMaster) {
    console.log(`alt process'ler oluşturulacak. Toplam ${numOfWorkers} çekirdek varmış`)
    let workers = []
    for (let i = 0; i < numOfWorkers; i++) {
        workers.push(cluster.fork()) // her bir çekirdek için bir işçi process oluştur
    }

    // işçi process'lerin etkinleşme ve sonlanma olaylarını takip et
    cluster.on('online', (worker) => console.log(`${worker.process.pid} etkinleştirildi`))
    cluster.on('exit', (worker, exitCode) => {
        console.log(`${worker.process.pid} işini bitirdi. Çıkış kodu, ${exitCode}`)
        console.log(`Yeni bir işçi oluşturulacak`)
        cluster.fork()
    })
} else { // Eğer komutan process değilse işçidir

    // Her bir işçi tek başına bir Koa sunucusuymuş gibi kullanılır
    var enigma = require('./worker');
    var Koa = require('koa');
    var Router = require('koa-router');
    var router = new Router();
    var app = new Koa();

    router.get('/', async context => context.body = `Process ID ${process.pid} is here`)
        .get('/ping', async context => {
            console.log(`şu an ${process.pid} işçisi çalışıyor`)
            const result = await enigma.encrypt('README.md', 'README.mdx');
            context.body = result;
        })
        .get('/pong', async context => {
            const result = await enigma.decrypt('README.mdx', 'benioku.md');
            context.body = result;
        });

    app.use(async (context, next) => {
        await next();
        var responseTime = context.response.get('X-Response-Time');
        console.log(`${context.method} ${context.url} - ${responseTime} -Pid:${process.pid}`);
    }).use(async (context, next) => {
        var startTime = Date.now();
        await next();
        context.set('X-Response-Time', `${Date.now() - startTime}ms`);
    })
        .use(router.routes())
        .listen(4444);
}