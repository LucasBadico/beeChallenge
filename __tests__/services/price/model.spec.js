import model, { PriceModel } from '$/model'


describe('Price model - as model', () => {
    it('should \'model\' has keys \'table\' and \'schema\'', async done => {
        expect.assertions(2)
        const keys = Object.keys(model)
        expect(keys).toContain('schema')
        expect(keys).toContain('table')
        done()
    })

    it('should \'model\' be Instanceof PriceModel', async done => {
        expect.assertions(1)
        expect(model).toBeInstanceOf(PriceModel)
        done()
    })

    it('should \'model.schema\' has Keys inserted on creation - \'costByMinute\', \'origin\' and \'destination\'', async done => {
        expect.assertions(3)
        const { schema } = model
        expect(schema).toContain('costByMinute')
        expect(schema).toContain('destination')
        expect(schema).toContain('origin')
        done()
    })

    it.skip('should \'model.schema\' has Default Keys, not set on creation, but on class constructor - \'created_at\', \'updated_at\'', async done => {
        expect.assertions(2)
        const { schema } = model
        expect(schema).toContain('created_at')
        expect(schema).toContain('updated_at')
        done()
    })

    it('should \'model.getSchema()\' give Keys inserted on creation - \'costByMinute\', \'origin\' and \'destination\'', async done => {
        expect.assertions(3)
        const schema = model.getSchema()
        expect(schema).toContain('costByMinute')
        expect(schema).toContain('destination')
        expect(schema).toContain('origin')
        done()
    })

    it('should \'model.getSchema()\' give Default Keys, not set on creation, but on class constructor - \'created_at\', \'updated_at\'', async done => {
        expect.assertions(2)
        const schema = model.getSchema()
        expect(schema).toContain('created_at')
        expect(schema).toContain('updated_at')
        done()
    })

    it('should \'model.getAll()\' retrieve a array with 6 items, without errors', async done => {
        expect.assertions(2)
        const result = await model.getAll()
        expect(result).toHaveLength(6)
        expect(result).toBeInstanceOf(Array)
        done()
    })

    it('should \'model.getById()\' retrieve data on database, without error', async done => {
        expect.assertions(4)
        const all = await model.getAll()
        expect(all).toHaveLength(6)
        expect(all).toBeInstanceOf(Array)
        expect(all[0]).toHaveProperty('id')

        const { id } = all[0]
        const result = await model.getById(id)
        // until create this data with the service
        // expect(result).toHaveProperty('created_at')
        // expect(result).toHaveProperty('updated_at')
        expect(result).toBeInstanceOf(Object)
        done()
    })

    it('should \'model.getByOrigin()\' retrieve data on database, without error', async done => {
        expect.assertions(2)
        const result = await model.getByOrigin('011')
        expect(result).toHaveLength(3)
        expect(result).toBeInstanceOf(Array)
        done()
    })

    it('should \'model.getByDestination()\' retrieve data on database, without error', async done => {
        expect.assertions(2)
        const result = await model.getByDestination('011')
        expect(result).toHaveLength(3)
        expect(result).toBeInstanceOf(Array)
        done()
    })

    it('should \'model.getByOriginAndDestination()\' retrieve data on database, without error', async done => {
        expect.assertions(2)
        const result = await model.getByOriginAndDestination({
            origin: '011',
            destination: '016',
        })
        expect(result).toHaveLength(1)
        expect(result).toBeInstanceOf(Array)
        done()
    })
  })