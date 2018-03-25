import prices from '$/model'
import * as R from 'ramda'

describe('Prices model', () => {
    it('should \'prices model\' has keys \'table\' and \'schema\'', async done => {
        expect.assertions(2)
        const keys = R.keys(prices)
        expect(keys).toContain('schema')
        expect(keys).toContain('table')
        done()
    })
  })