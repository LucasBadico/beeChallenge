
import { RethinkdbDataModel } from '$/RethinkdbDataModel'
import * as R from 'ramda'

describe('RethinkdbDataModel class', () => {
    describe('instanciated directly as \'dataModel\'', () => {
        const dataModel = new RethinkdbDataModel({
            table: 'rethinkdbDataModelSpec',
            schema: [ 'foo', 'bar'],
        })
        // test instanceof

        it('should \'dataModel\' has keys \'table\' and \'schema\'', async done => {
            expect.assertions(2)
            const keys = R.keys(dataModel)
            expect(keys).toContain('schema')
            expect(keys).toContain('table')
            done()
        })

        it('should \'dataModel.table\' be \'rethinkdbDataModelSpec\'', async done => {
            expect.assertions(1)
            const { table } = dataModel
            expect(table).toBe('rethinkdbDataModelSpec')
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

        // test the methods
            // getSchema
            // getAll
            // getById
            // update
            // save

    })

    describe('extended', () => {
        it('should have a default \'say-hi\'', async done => {
            expect.assertions(1)
            expect(true).toBe(true)
            done()
        })
    })
})