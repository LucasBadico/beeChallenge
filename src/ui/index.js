
import Koa from 'koa'
import Router from 'koa-router'
import { Sockend } from '@LucasBadico/cote'
import { createServer } from 'http'
import socket from 'socket.io'
import render from './renderer'
import 'ignore-styles'

const app = new Koa()
const server = createServer(app.callback())
const io = socket(server)

app.keys = ['im a newer secret', 'i like turtle'];

app.use(render)

server.listen(5002);

new Sockend(io, {
    name: 'ui sockend server'
});

export {
    server,
    app,
    // router,
    io,
}
export default app
