import { Requester } from 'cote'
import service from '$/'

const requester = new Requester({ name: 'test requester' })

describe('Calculator service', () => {
    it('should have a default \'say-hi\'', async done => {
        expect.assertions(1)
        const hiFromService = await requester.send({ type: 'say-hi' })        
        expect(hiFromService).toEqual('hi, from the ddd-calculator')
        done()
    })
  })
