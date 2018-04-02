import model, { LeadModel } from '$/model'
import db from '~/database'

describe('Lead model - as model', () => {

    beforeAll(async () => {
        await db().table('leads').delete()
        return true
    })

    afterAll(async () => {
        await db().table('leads').delete()
        return true
    })

    it('should \'model\' has keys \'table\' and \'schema\'', async done => {
        expect.assertions(2)
        const keys = Object.keys(model)
        expect(keys).toContain('schema')
        expect(keys).toContain('table')
        done()
    })

    it('should \'model\' be Instanceof LeadModel', async done => {
        expect.assertions(1)
        expect(model).toBeInstanceOf(LeadModel)
        done()
    })

    it('should \'model.schema\' has Keys inserted on creation - \'costByMinute\', \'origin\' and \'destination\'', async done => {
        expect.assertions(4)
        const { schema } = model
        expect(schema).toContain('email')
        expect(schema).toContain('fullName')
        expect(schema).toContain('firstName')
        expect(schema).toContain('demands')
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
        expect.assertions(4)
        const schema = model.getSchema()
        expect(schema).toContain('email')
        expect(schema).toContain('fullName')
        expect(schema).toContain('firstName')
        expect(schema).toContain('demands')
        done()
    })

    it('should \'model.getSchema()\' give Default Keys, not set on creation, but on class constructor - \'created_at\', \'updated_at\'', async done => {
        expect.assertions(2)
        const schema = model.getSchema()
        expect(schema).toContain('created_at')
        expect(schema).toContain('updated_at')
        done()
    })

    it('should \'model.getAll()\' retrieve a array with 0 items, without errors', async done => {
        expect.assertions(2)
        const result = await model.getAll()
        expect(result).toHaveLength(0)
        expect(result).toBeInstanceOf(Array)
        done()
    })

    it('should \'model.create()\' insert a item, without errors', async done => {
        expect.assertions(2)

        const data = {
            fullName: 'Lucas Gomes',
            email: 'lucas@gmail.com',
            demands: [{
                origin: '075',
                destination: '011',
            }]
        }

        const result = await model.create(data)
        expect(result).toBeInstanceOf(Object)
        expect(result.inserted).toBe(1)
        done()
    })

    it('should \'model.getAll()\' retrieve a array with 1 item, without errors', async done => {
        expect.assertions(2)
        const result = await model.getAll()
        expect(result).toHaveLength(1)
        expect(result).toBeInstanceOf(Array)
        done()
    })

    it('should \'model.getByEmail()\' retrieve data on database, without error', async done => {
        expect.assertions(5)
        const all = await model.getAll()
        expect(all).toHaveLength(1)
        expect(all).toBeInstanceOf(Array)

        const [ result, ...none] = await model.getByEmail(all[0].email)
        
        expect(result).toHaveProperty('created_at')
        expect(result).toHaveProperty('updated_at')
        expect(result).toBeInstanceOf(Object)
        done()
    })

    it('should \'model.appendDemand()\' upadate item on database, without error', async done => {
        expect.assertions(5)
        let all = await model.getAll()
        expect(all).toHaveLength(1)
        expect(all[0].demands).toHaveLength(1)
        const id = all[0].id

        await model.appendDemand(id, { origin: '1', destination: '2' })
        all = await model.getAll()

        expect(all).toHaveLength(1)
        expect(all[0]).toHaveProperty('id', id)
        expect(all[0].demands).toHaveLength(2)
        done()
    })

  })