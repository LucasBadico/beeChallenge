import * as R from 'ramda'
import model from './model'

class Lead {
    constructor(props){
        Object.assign(this, props)
    }
    
    static async all(asRaw) {
        try {
            const result = await model.getAll()
            if (R.isEmpty(result)) return []
            if (asRaw) return result
            return result.reduce(
                (acc, item) => [...acc, new Lead(item, true)],
                [],
            )
        } catch (err){
            throw new Error(err)
        }
    }

    static async findById(id, asRaw) {
        try {
            const result = await model.getById(id)
            if (R.isEmpty(result) || R.isNil(result)) throw new Error('Id not found', id)
            if (asRaw) return result
            return new Lead(result, true)
        } catch (err){
            throw new Error(err)
        }
    }

    static async findByEmail(email, asRaw) {
        try {
            const result = await model.getByEmail(email)
            if (R.isEmpty(result) || R.isNil(result)) {
                throw new Error('Lead not finded', email)
            }
            if (result.length > 1) {
                throw new Error('Inconsistencia na busca')
            }
            if (asRaw) {
                return result[0]
            }
            return new User(result[0], true)
        } catch (err) {
            throw new Error(err)
        }
    }

    static async findByFullName(fullName, asRaw) {
        try {
            const result = await model.getByEmail(fullName)
            if (R.isEmpty(result) || R.isNil(result)) {
                throw new Error('Lead not finded', fullName)
            }
            if (asRaw) {
                return result
            }
            return result.reduce(
                (acc, item) => [...acc, new Lead(item, true)],
                [],
            )
        } catch (err) {
            throw new Error(err)
        }
    }

    // not implemented 
    static async findByDemand({ origin, destination }, asRaw) {
        try {
            const result = await model.getByDemand({ origin, destination })
            if (R.isEmpty(result) || R.isNil(result)) {
                throw new Error('Lead not finded', { origin, destination })
            }
            if (asRaw) {
                return result
            }
            return result.reduce(
                (acc, item) => [...acc, new Lead(item, true)],
                [],
            )
        } catch (err) {
            throw new Error(err)
        }
    }

    async addDemand({ origin, destination }) {
        try {
            if (!this.id) {
                throw new Error('Lead not instantiated yet')
            }
            await appendDemand(this.id, { origin, destination })
            
            if (this.demands && this.demands instanceof Array) {
                this.demands.push({ origin, destination })
            } else {
                this.demands = [ { origin, destination } ]
            }
        } catch (err) {
            throw new Error(err)
        } finally {
            return this
        }
    }

    async save() {
        let result
        const data = R.pick(this, model.getSchema())

        try {
            if (this.id) {
               result = await model.update(this.id, data)
            } else {
                result = await model.create(data);
            }
            if (R.isEmpty(result) || R.isNil(result)) {
                throw new Error('operation error', !!this.id ? 'update' : 'create')
            }
        } catch (err) {
            throw new Error(err)
        } finally {
            return this
        }
    }

}

export default Lead