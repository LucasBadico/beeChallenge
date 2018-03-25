import model from '$/model'

describe('Prices model', () => {
    it('should \'prices model\' has keys \'table\' and \'schema\'', async done => {
        expect.assertions(2)
        const keys = Object.keys(model)
        expect(keys).toContain('schema')
        expect(keys).toContain('table')
        done()
    })
  })