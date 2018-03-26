
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import { Sockend } from 'cote'
import { createServer } from 'http'
import socket from 'socket.io'
import router from './routes'

const app = new Koa()
const server = createServer(app.callback())
const io = socket(server)

app.keys = ['im a newer secret', 'i like turtle'];

app.use(bodyParser())
app.use(router.routes())
app.use(router.allowedMethods())

server.listen(5001);

new Sockend(io, {
    name: 'front-faced sockend server'
});

export {
    server,
    app,
    router,
    io,
}
export default app
