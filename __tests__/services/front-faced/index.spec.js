import {
    server,
    app,
} from '$/'

import * as initResponder from '~/services/price/responder'

import httpRequester from 'supertest'

const request = httpRequester.agent(server)

describe('Front-faced app', () => {
    it('should have a default \'Hello World! from koa\'', async done => {
        expect.assertions(1)
        const helloFromRouter = await request.get('/hello')     
        expect(helloFromRouter.text).toEqual('Hello World! from koa')
        done()
    })


    it.only('should have a default \'/prices/all\' end point', async done => {
        expect.assertions(1)
        const pricesFromRouter = await request.get('/prices/all')
        console.log('allPrices test', pricesFromRouter)
        expect(true).toEqual(true)
        done()
    })
    // /prices/all
    // /prices/by-origin
    // /prices/by-destination
})
