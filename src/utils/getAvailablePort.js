const getAvailablePort = startingAt => {

    const getNextAvailablePort = (currentPort, fn) => {
        const server = net.createServer()
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