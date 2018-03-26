import {
    server,
    app,
} from '$/'

import httpRequester from 'supertest'

const request = httpRequester.agent(server)

describe('Calculator app', () => {
    it('should have a default \'Hello World! from koa\'', async done => {
        expect.assertions(1)
        const helloFromRouter = await request.get('/hello')     
        expect(helloFromRouter.text).toEqual('Hello World! from koa')
        done()
    })
})
