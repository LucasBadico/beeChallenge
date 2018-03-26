import * as R from 'ramda'
import model from './model'

class Price {
    constructor(props){
        Object.assign(this, props)
    }
    
    static async all(asRaw) {
        try {
            const result = await model.getAll()
            if (R.isEmpty(result)) return []
            if (asRaw) return result
            return result.reduce(
                (acc, item) => [...acc, new Price(item, true)],
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
            return new Price(result, true)
        } catch (err){
            throw new Error(err)
        }
    }

    static async findByOrigin(origin, asRaw) {
        try {
            const result = await model.getByOrigin(origin)
            if (R.isEmpty(result) || R.isNil(result)) throw new Error('Origin not found', origin)
            if (asRaw) return result
            return result.reduce(
                (acc, item) => [...acc, new Price(item, true)],
                [],
            )
        } catch (err){
            throw new Error(err)
        }
    }
    
    static async findByDestination(destination, asRaw) {
        try {
            const result = await model.getByDestination(destination)
            if (R.isEmpty(result) || R.isNil(result)) throw new Error('Destination not found', destination)
            if (asRaw) return result
            return result.reduce(
                (acc, item) => [...acc, new Price(item, true)],
                [],
            )
        } catch (err){
            throw new Error(err)
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
            return this
        } catch (err){
            throw new Error(err)
        }
    }

}

export default Price