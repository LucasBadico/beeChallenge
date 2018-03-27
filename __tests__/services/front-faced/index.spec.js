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


    it('should have a default \'/prices/all\' end point', async done => {
        expect.assertions(2)
        const { text } = await request.get('/prices/all')
        const pricesFromRouter = JSON.parse(text)
        expect(pricesFromRouter).toHaveLength(6)
        expect(pricesFromRouter).toBeInstanceOf(Array)
        done()
    })

    it('should have a default \'/prices/by-origin\' end point', async done => {
        expect.assertions(2)
        const { text }  = await request.post('/prices/by-origin').type('json').send({ origin: '011' })

        const pricesFromRouter = JSON.parse(text)
        expect(pricesFromRouter).toHaveLength(3)
        expect(pricesFromRouter).toBeInstanceOf(Array)
        done()
    })

    it('should have a default \'/prices/by-destination\' end point', async done => {
        expect.assertions(2)
        const { text }  = await request.post('/prices/by-destination').type('json').send({ destination: '011' })

        const pricesFromRouter = JSON.parse(text)
        expect(pricesFromRouter).toHaveLength(3)
        expect(pricesFromRouter).toBeInstanceOf(Array)
        done()
    })
    // /prices/by-destination
})
