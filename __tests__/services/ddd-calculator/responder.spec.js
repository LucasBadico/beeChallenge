import { Requester } from '@LucasBadico/cote'
import service from '$/responder'

const requester = new Requester({ name: 'test requester' })

describe('Calculator service', () => {
    it('should have a default \'say-hi\'', async done => {
        expect.assertions(1)
        const hiFromService = await requester.send({ type: 'say-hi' })        
        expect(hiFromService).toEqual('hi, from the ddd-calculator')
        done()
    })

    it('should result be 0, when the fulltime is less then the plan freetime', () => {
        const result = await requester.send({
            type: 'calc-full',
            origin: '011',
            destination: '016',
            totalTime: 40,
            plan: 'faleMais30'
        })

        // test for 60

        // test for 120
    })

    it('should result also be 0, when the fulltime is the same as plan freetime', () => {
        const result = await requester.send({
            type: 'calc-full',
            origin: '011',
            destination: '016',
            totalTime: 40,
            plan: 'faleMais30'
        })

        // test for 60

        // test for 120
    })

    it('should result not be 0, when the fulltime is the greater then plan freetime', () => {
        const result = await requester.send({
            type: 'calc-full',
            origin: '011',
            destination: '016',
            totalTime: 40,
            plan: 'faleMais30'
        })

        // test for 60

        // test for 120
    })
    
  })
