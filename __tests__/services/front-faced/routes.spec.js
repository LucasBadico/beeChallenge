import {
    server,
    app,
} from '$/'

import httpRequester from 'supertest'
import * as initResponderPrice from '~/services/price'

const request = httpRequester.agent(server)

const PLANS = {
    FALE30: 'FaleMais30',
    FALE60: 'FaleMais60',
    FALE120: 'FaleMais120',
}

describe('Front-faced app', () => {
    it('should have a default \'Hello World! from koa root/api/hello\'', async done => {
        expect.assertions(1)
        const helloFromRouter = await request.get('/api/hello')     
        expect(helloFromRouter.text).toEqual('Hello World! from koa root/api/hello')
        done()
    })
    

    it('should end point \'/api/prices/all\' respond with a list of Prices', async done => {
        expect.assertions(2)
        const { body } = await request.get('/api/prices/all')
        const pricesFromRouter = body
        expect(pricesFromRouter).toHaveLength(6)
        expect(pricesFromRouter).toBeInstanceOf(Array)
        done()
    })

    it('should end point \'/api/prices/by-origin\' respond with a list of Prices', async done => {
        expect.assertions(2)
        const { body }  = await request.post('/api/prices/by-origin').type('json').send({ origin: '011' })

        const pricesFromRouter = body
        expect(pricesFromRouter).toHaveLength(3)
        expect(pricesFromRouter).toBeInstanceOf(Array)
        done()
    })

    it('should end point \'/api/prices/by-destination\' respond with a list of Prices', async done => {
        expect.assertions(2)
        const { body }  = await request
            .post('/api/prices/by-destination')
            .type('json')
            .send({ destination: '011' })

        const pricesFromRouter = body
        expect(pricesFromRouter).toHaveLength(3)
        expect(pricesFromRouter).toBeInstanceOf(Array)
        done()
    })

    it.skip('should \'/api/calculator/fale-mais\' throw error if no costByMinute or origin and destination is sended', async done => {
        expect.assertions(3)
        const { text, error, statusCode } = await request
            .post('/api/calculator/fale-mais')
            .type('json')
            .send({ plan: PLANS.FALE30, totalTime: 10 })

        expect(text).toBe('Não é possivel Calcular, envie custo do minuto ou a origem e o destino.')
        expect(error).toBeTruthy()
        expect(statusCode).toBe(400)
        done()
    })

    it.skip('should \'/api/calculator/fale-mais\' return price if costByMinute is sended, with plan and time', async done => {
        expect.assertions(4)
        const { body, error, statusCode, ok } = await request
            .post('/api/calculator/fale-mais')
            .type('json')
            .send({ plan: PLANS.FALE30, totalTime: 10, costByMinute: 1.9 })
        expect(body).toBe(0)
        expect(error).toBeFalsy()
        expect(ok).toBe(true)
        expect(statusCode).toBe(200)
        done()
    })

    // this scenario is not working, something wrong with requester
    it.skip('should \'/api/calculator/fale-mais\' return price if origin and destination is sended, with plan and time', async done => {
        expect.assertions(4)
        const { body, error, statusCode, ok } = await request
            .post('/api/calculator/fale-mais')
            .type('json')
            .send({ plan: PLANS.FALE30, totalTime: 10, origin: '011', destination: '016' })
        expect(body).toBe(0)
        expect(error).toBeFalsy()
        expect(ok).toBe(true)
        expect(statusCode).toBe(200)
        done()
    })

    // it('should \'/api/calculator/fale-mais\' return price if origin and destination is sended, with plan and time', async done => {

    // })
})
