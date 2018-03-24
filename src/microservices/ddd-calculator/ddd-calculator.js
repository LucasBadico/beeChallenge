
import Koa from 'koa'
import Router from 'koa-router'
import { Sockend } from 'cote'
import { createServer } from 'http'
import socket from 'socket.io'


const app = new Koa()
// const router = new Router()
const server = createServer(app.callback())
const io = socket(server)

// router.get('/hello', (cxt, next) => {
//     console.log(JSON.stringify({cxt, next}, null, 4))
//     ctx.body = 'Hello World! from koa-router'
//     return next();
// })

app.keys = ['im a newer secret', 'i like turtle'];
app.use(async ctx => {
    ctx.body = 'Hello World! from koa';
  });
// app.use(router.routes())
// app.use(router.allowedMethods())



server.listen(5001);



new Sockend(io, {
    name: 'calculator sockend server'
});

export {
    server,
    app,
    // router,
    io,
}
export default app
