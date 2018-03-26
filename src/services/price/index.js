import Koa from 'koa'
import Router from 'koa-router'
import { Sockend } from 'cote'
import { createServer } from 'http'
import socket from 'socket.io'

const app = new Koa()
const router = new Router()
const server = createServer(app.callback())
const io = socket(server)

router.get('/hello', (ctx, next) => {
    ctx.body = 'Hello World! from koa';
})


app.keys = ['im a newer secret', 'i like turtle'];

app.use(router.routes())
app.use(router.allowedMethods())

// I think that I could even not put the server up,
// because the handler of comunication will be on the cote
server.listen(5003);


new Sockend(io, {
    name: 'calculator sockend server'
});

export {
    server,
    app,
    router,
    io,
}
export default app
