
import { RethinkdbModel } from  '../../database/RethinkdbModel.js'

class PricesModel extends RethinkdbModel {
    setNewThing(data) { // for futurre references
        this.newThing = data
    }
}

const model = new PricesModel({
	schema: ['costByMinute','destination','origin'],
	table: 'prices'
})

export default model
