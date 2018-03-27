import { Requester } from '@LucasBadico/cote'
import * as initResponder from '$/responder'

const requester = new Requester({ name: 'test requester' })

describe('Prices service', () => {
    it('should have a default \'say-hi\'', async done => {
        expect.assertions(1)
        const hiFromService = await requester.send({ type: 'say-hi' })        
        expect(hiFromService).toEqual('hi, from the price-service')
        done()
    })

    it.only('should have a \'prices-all\' responder', async done => {
        expect.assertions(2)
        const result = await requester.send({ type: 'prices-all' })      
        expect(result).toHaveLength(6)
        expect(result).toBeInstanceOf(Array)
        done()
    })

    it('should have a \'prices-by-origin\' responder', async done => {
        expect.assertions(2)
        const result = await requester.send({ type: 'prices-by-origin', origin: '011' })
        expect(result).toHaveLength(3)
        expect(result).toBeInstanceOf(Array)
        done()
    })

    it('should have a \'prices-by-destination\' responder', async done => {
        expect.assertions(2)
        const result = await requester.send({ type: 'prices-by-destination', destination: '011' })
        expect(result).toHaveLength(3)
        expect(result).toBeInstanceOf(Array)
        done()
    })

    it('should have a \'price-minute\' responder', async done => {
        expect.assertions(1)
        const result = await requester.send({
            type: 'price-minute',
            destination: '011',
            origin: '016'
        })
        expect(result).toBeInstanceOf(Object)
        done()
    })

  })
