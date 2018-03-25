
import { RethinkdbModel } from  '../../database/RethinkdbModel.js'

class PriceModel extends RethinkdbModel {
    constructor(opts){
        super(opts)
    }
   async getByOrigin(origin) { // for futurre references
        return await this.dbtable()
        .filter({origin})
        .run();
    }

    async getByDestination(destination) { // for futurre references
        return await this.dbtable()
        .filter({ destination })
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
