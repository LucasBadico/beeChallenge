
import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import cors from 'koa2-cors'
import { Sockend } from 'cote'
import { getAvailablePort } from 'utils'
import { createServer } from 'http'
import socket from 'socket.io'
import router from './routes'

const app = new Koa()
const server = createServer(app.callback())
const io = socket(server)

app.keys = ['im a newer secret', 'i like turtle'];

app.use(
    bodyParser({
        extendTypes: { json: ['text/plain'] }
    })
)
app.use(cors({ origin: '*' }))
app.use(router.routes())
app.use(router.allowedMethods())
// getAvailablePort(5001).then(port => server.listen(port))
server.listen(3030)
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
