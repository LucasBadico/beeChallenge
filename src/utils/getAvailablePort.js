import { createServer } from 'http'

export const getAvailablePort = async startingAt => {
    const getNextAvailablePort = (currentPort, fn) => {
        const server = createServer()
        server.listen(currentPort, _ => {
            server.once('close', _ => {
                fn(currentPort)
            })
            server.close()
        })
        server.on('error', _ => {
            getNextAvailablePort(++currentPort, fn)
        })
    }

    return new Promise(resolve => {
        getNextAvailablePort(startingAt, resolve)
    })
}