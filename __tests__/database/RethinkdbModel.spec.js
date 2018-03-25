import { RethinkdbModel } from '$/RethinkdbModel'
import db from '$/'

describe('RethinkdbModel class', () => {
    describe('instanciated directly as \'dataModel\'', () => {
        const dataModel = new RethinkdbModel({
            table: 'rethinkdbModelSpec',
            schema: [ 'foo', 'bar'],
        })

        beforeAll(async () => {
            await db().tableCreate('rethinkdbModelSpec')
            return true
        })

        afterAll(async () => {
            await db().tableDrop('rethinkdbModelSpec')
            return true
        })

        it('should \'dataModel\' be Instanceof RethinkdbModel', async done => {
            expect.assertions(1)
            expect(dataModel).toBeInstanceOf(RethinkdbModel)
            done()
        })


        it('should \'dataModel\' has keys \'table\' and \'schema\'', async done => {
            expect.assertions(2)
            const keys = Object.keys(dataModel)
            expect(keys).toContain('schema')
            expect(keys).toContain('table')
            done()
        })

        it('should \'dataModel.table\' be \'rethinkdbModelSpec\'', async done => {
            expect.assertions(1)
            const { table } = dataModel
            expect(table).toBe('rethinkdbModelSpec')
            done()
        })

        it('should \'dataModel.schema\' has Keys inserted on creation - \'foo\' and \'bar\'', async done => {
            expect.assertions(2)
            const { schema } = dataModel
            expect(schema).toContain('foo')
            expect(schema).toContain('bar')
            done()
        })

        it('should \'dataModel.schema\' has Default Keys, not set on creation, but on class constructor - \'created_at\', \'updated_at\'', async done => {
            expect.assertions(2)
            const { schema } = dataModel
            expect(schema).toContain('created_at')
            expect(schema).toContain('updated_at')
            done()
        })

        it('should \'dataModel.getSchema()\' give Keys inserted on creation - \'foo\' and \'bar\'', async done => {
            expect.assertions(2)
            const schema = dataModel.getSchema()
            expect(schema).toContain('foo')
            expect(schema).toContain('bar')
            done()
        })

        it('should \'dataModel.getSchema()\' give Default Keys, not set on creation, but on class constructor - \'created_at\', \'updated_at\'', async done => {
            expect.assertions(2)
            const schema = dataModel.getSchema()
            expect(schema).toContain('created_at')
            expect(schema).toContain('updated_at')
            done()
        })

        it('should \'dataModel.getAll()\' retrieve a empty array, whithout errors', async done => {
            expect.assertions(2)
            const result = await dataModel.getAll()
            expect(result).toHaveLength(0)
            expect(result).toBeInstanceOf(Array)
            done()
        })

        it('should \'dataModel.create()\' save on database, whithout error', async done => {
            expect.assertions(2)

            const result = await dataModel.create({
                foo: 'foo',
                bar: 'bar'
            })
            expect(result).toBeInstanceOf(Object)
            expect(result).toHaveProperty('inserted', 1)
            done()
        })

        it('should \'dataModel.getAll()\' retrieve a array with one item, whithout errors', async done => {
            expect.assertions(2)
            const result = await dataModel.getAll()
            expect(result).toHaveLength(1)
            expect(result).toBeInstanceOf(Array)
            done()
        })

        it('should \'dataModel.getById()\' retrieve data on database, whithout error', async done => {
            expect.assertions(6)
            const all = await dataModel.getAll()
            expect(all).toHaveLength(1)
            expect(all).toBeInstanceOf(Array)
            expect(all[0]).toHaveProperty('id')

            const { id } = all[0]
            const result = await dataModel.getById(id)
            expect(result).toHaveProperty('created_at')
            expect(result).toHaveProperty('updated_at')
            expect(result).toBeInstanceOf(Object)
            done()
        })

        it('should \'dataModel.update()\' retrieve data on database, whithout error', async done => {
            expect.assertions(12)
            const all = await dataModel.getAll()
            expect(all).toHaveLength(1)
            expect(all).toBeInstanceOf(Array)
            expect(all[0]).toHaveProperty('id')
            expect(all[0]).toHaveProperty('foo')
            expect(all[0]).not.toHaveProperty('baz')

            const { id } = all[0]
            const result = await dataModel.update(id, {
                foo: 'foo updated',
                baz: 'baz'
            })
            expect(result).toBeInstanceOf(Object)
            expect(result).toHaveProperty('replaced', 1)

            const updated = await dataModel.getById(id)
            expect(updated).toHaveProperty('created_at')
            expect(updated).toHaveProperty('updated_at')
            expect(updated).toHaveProperty('foo', 'foo updated')
            expect(updated).toHaveProperty('baz')
            expect(updated).toBeInstanceOf(Object)
            done()
        })

    })

})