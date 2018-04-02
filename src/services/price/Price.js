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
            throw Error(err)
        }
    }

    static async findById(id, asRaw) {
        try {
            const result = await model.getById(id)
            if (R.isEmpty(result) || R.isNil(result)) throw Error('Id not found', id)
            if (asRaw) return result
            return new Price(result, true)
        } catch (err){
            throw Error(err)
        }
    }

    static async findByOrigin(origin, asRaw) {
        try {
            const result = await model.getByOrigin(origin)
            if (R.isEmpty(result) || R.isNil(result)) throw Error('Origin not found', origin)
            if (asRaw) return result
            return result.reduce(
                (acc, item) => [...acc, new Price(item, true)],
                [],
            )
        } catch (err){
            throw Error(err)
        }
    }
    
    static async findByDestination(destination, asRaw) {
        try {
            const result = await model.getByDestination(destination)
            if (R.isEmpty(result) || R.isNil(result)) throw Error('Destination not found', destination)
            if (asRaw) return result
            return result.reduce(
                (acc, item) => [...acc, new Price(item, true)],
                [],
            )
        } catch (err){
            throw Error(err)
        }
    }

    static async byOriginAndDestination({ destination, origin }, asRaw) {
        try {
            const result = await model.getByOriginAndDestination({ destination, origin })
            if (R.isEmpty(result) || R.isNil(result)) throw Error('Price not found', { destination, origin })
            if (asRaw) return result
            return result.reduce(
                (acc, item) => [...acc, new Price(item, true)],
                [],
            )
        } catch (err){
            throw Error(err)
        }
    }

    async save() {
        let result
        const data = R.pick(model.getSchema(), this)

        try {
            if (this.id) {
               result = await model.update(this.id, data)
            } else {
                result = await model.create(data);
            }
            if (R.isEmpty(result) || R.isNil(result)) {
                throw Error('operation error', !!this.id ? 'update' : 'create')
            }
            return this
        } catch (err){
            throw Error(err)
        }
    }

}

export default Price