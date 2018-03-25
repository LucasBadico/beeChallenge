import {
    server,
    app,
} from '$/prices'

import httpRequester from 'supertest'

const request = httpRequester.agent(server)

describe('Prices app', () => {
    it('should have a default \'Hello World! from koa\'', async done => {
        expect.assertions(1)
        const helloFromApp = await request.get('/hello')     
        expect(helloFromApp.text).toEqual('Hello World! from koa')
        done()
    })
  })
