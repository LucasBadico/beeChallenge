import { Requester } from 'cote'
import * as initResponder from '$/'

const requester = new Requester({ name: 'test requester' })

describe('Lead service', () => {
    it('should have a default \'say-hi\'', async done => {
        expect.assertions(1)
        const hiFromService = await requester.send({ type: 'say-hi-lead' })        
        expect(hiFromService).toEqual('hi, from the lead-service')
        done()
    })

    it('should \'lead-add-demand\' responder insert a new lead on database', async done => {
        expect.assertions(7)
        const data = {
            fullName: 'Lucas Gomes',
            email: 'lucas@gmail.com',
            demand: {
                origin: '075',
                destination: '011',
            },
        }
        const result = await requester.send({ type: 'lead-add-demand', ...data })      
        expect(result).toBeInstanceOf(Object)
        expect(result).toHaveProperty('email', data.email)
        expect(result).toHaveProperty('fullName', data.fullName)
        expect(result).toHaveProperty('demands')
        expect(result).toHaveProperty('firstName')
        expect(result.demands).toHaveLength(1)
        expect(result.demands[0]).toHaveProperty('demands', data.demands)
        done()
    })

    it('should \'lead-add-demand\' responder insert a new lead on database', async done => {
        expect.assertions(6)
        const data = {
            fullName: 'Lucas Gomes',
            email: 'lucas@gmail.com',
            demand: {
                origin: '011',
                destination: '075',
            },
        }
        const result = await requester.send({ type: 'lead-add-demand', ...data })      
        expect(result).toBeInstanceOf(Object)
        expect(result).toHaveProperty('email', data.email)
        expect(result).toHaveProperty('firstName')
        expect(result).toHaveProperty('fullName', data.fullName)
        expect(result.demands).toHaveLength(2)
        expect(result.demands[1]).toHaveProperty('demands', data.demands)
        done()
    })
  
    it('should have a \'leads-all\' responder', async done => {
        expect.assertions(2)
        const result = await requester.send({ type: 'leads-all' })      
        expect(result).toHaveLength(1)
        expect(result).toBeInstanceOf(Array)
        done()
    })

  


  })
