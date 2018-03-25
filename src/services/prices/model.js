
import { RethinkdbModel } from  '../../database/RethinkdbModel.js'

class PricesModel extends RethinkdbModel {
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

const model = new PricesModel({
	schema: ['costByMinute','destination','origin'],
	table: 'prices'
})

export default model
