import { Requester } from 'cote'

import service from '$/'

const requester = new Requester({ name: 'test requester' })

describe('Calculator service', () => {
    it('should have a say-hi listner', async () => {
        const result = await requester.send({ type: 'say-hi' })
        console.log({ result })
        expect(result).toBe('hi, from the ddd-calculator')
    })
  })
