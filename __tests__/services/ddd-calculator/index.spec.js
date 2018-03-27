import { Requester } from 'cote'
import * as initResponderCalculator from '$/'

const requester = new Requester({ name: 'test requester' })

describe('Calculator service', () => {
    it('should have a default \'say-hi\'', async done => {
        expect.assertions(1)
        const hiFromService = await requester.send({ type: 'say-hi-ddd-calculator' })        
        expect(hiFromService).toEqual('hi, from the ddd-calculator')
        done()
    })

    it('should result be 0, when the totaltime is less then the plan freetime', async () => {
        expect.assertions(3)
        const zero30 = await requester.send({
            type: 'calculator-fale-mais',
            costByMinute: 1.9,
            totalTime: 10,
            plan: 'FaleMais30'
        })

        expect(zero30).toEqual(0)

        const zero60 = await requester.send({
            type: 'calculator-fale-mais',
            costByMinute: 1.9,
            totalTime: 50,
            plan: 'FaleMais60'
        })

        expect(zero60).toEqual(0)

        const zero120 = await requester.send({
            type: 'calculator-fale-mais',
            costByMinute: 1.9,
            totalTime: 100,
            plan: 'FaleMais120'
        })

        expect(zero120).toEqual(0)
    })

    it('should result also be 0, when the totaltime is the same as plan freetime', async() => {
        expect.assertions(3)
        const zero30 = await requester.send({
            type: 'calculator-fale-mais',
            costByMinute: 1.9,
            totalTime: 30,
            plan: 'FaleMais30'
        })

        expect(zero30).toEqual(0)

        const zero60 = await requester.send({
            type: 'calculator-fale-mais',
            costByMinute: 1.9,
            totalTime: 60,
            plan: 'FaleMais60'
        })

        expect(zero60).toEqual(0)

        const zero120 = await requester.send({
            type: 'calculator-fale-mais',
            costByMinute: 1.9,
            totalTime: 120,
            plan: 'FaleMais120'
        })

        expect(zero120).toEqual(0)
    })

    it('should result not be 0, when the totaltime is the greater then plan freetime', async () => {
        expect.assertions(3)
        const notZero30 = await requester.send({
            type: 'calculator-fale-mais',
            costByMinute: 1.9,
            totalTime: 50,
            plan: 'FaleMais30'
        })

        expect(notZero30).toBeGreaterThan(1)

        const notZero60 = await requester.send({
            type: 'calculator-fale-mais',
            costByMinute: 1.9,
            totalTime: 80,
            plan: 'FaleMais60'
        })

        expect(notZero60).toBeGreaterThan(1)

        const notZero120 = await requester.send({
            type: 'calculator-fale-mais',
            costByMinute: 1.9,
            totalTime: 160,
            plan: 'FaleMais120'
        })

        expect(notZero120).toBeGreaterThan(1)

    })
    
  })
