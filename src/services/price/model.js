
import { RethinkdbModel } from  '../../database/RethinkdbModel.js'

class PriceModel extends RethinkdbModel {
    constructor(opts){
        super(opts)
    }
   async getByOrigin(origin) {
        return await this.dbtable()
        .filter({origin})
        .run();
    }

    async getByDestination(destination) {
        return await this.dbtable()
        .filter({ destination })
        .run();
    }

    async getByOriginAndDestination({ origin, destination }) {
        return await this.dbtable()
        .filter({ destination, origin })
        .run();
    }
}

const model = new PriceModel({
	schema: ['costByMinute','destination','origin'],
	table: 'prices'
})

export {
    PriceModel,
}
export default model
