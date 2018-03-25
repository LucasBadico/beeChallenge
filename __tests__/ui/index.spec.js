import {
    server,
    app,
} from '$/'

import httpRequester from 'supertest'

const request = httpRequester.agent(server)

describe('Render client server', () => {
    it('should have a default \'HELLO FROM REACT!\'', async done => {
        expect.assertions(1)
        const heyFromReact = await request.get('/hey')   
        expect(heyFromReact.text).toContain('HELLO FROM REACT!')
        done()
    })
  })
