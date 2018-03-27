
import Koa from 'koa'
import Router from 'koa-router'
import { Sockend } from 'cote'
import { createServer } from 'http'
import socket from 'socket.io'
import * as initResponder from './responder'

const app = new Koa()
const router = new Router()
const server = createServer(app.callback())
// const io = socket(server)

router.get('/hello', (ctx, next) => {
    ctx.body = 'Hello World! from koa';
})

app.keys = ['im a newer secret', 'i like turtle'];

app.use(router.routes())
app.use(router.allowedMethods())



server.listen(5004);


new Sockend(io, {
    name: 'calculator sockend server',
    namespace: 'calculator'
});

export {
    server,
    app,
    router,
    // io,
}
export default app
