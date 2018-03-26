import { Requester } from 'cote'
import * as initResponder from '$/responder'

const requester = new Requester({ name: 'test requester' })

describe('Prices service', () => {
    it('should have a default \'say-hi\'', async done => {
        expect.assertions(1)
        const hiFromService = await requester.send({ type: 'say-hi' })        
        expect(hiFromService).toEqual('hi, from the ddd-calculator')
        done()
    })

    it('should have a \'all-prices\' responder', async done => {
        expect.assertions(2)
        const result = await requester.send({ type: 'all-prices' })      
        expect(result).toHaveLength(6)
        expect(result).toBeInstanceOf(Array)
        done()
    })

    it('should have a \'by-origin\' responder', async done => {
        expect.assertions(2)
        const result = await requester.send({ type: 'by-origin', origin: '011' })
        expect(result).toHaveLength(3)
        expect(result).toBeInstanceOf(Array)
        done()
    })

    it('should have a \'by-destination\' responder', async done => {
        expect.assertions(2)
        const result = await requester.send({ type: 'by-destination', destination: '011' })
        expect(result).toHaveLength(3)
        expect(result).toBeInstanceOf(Array)
        done()
    })

  })
