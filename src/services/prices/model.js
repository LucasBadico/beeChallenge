
import { RethinkdbDataModel } from  '../../database/RethinkdbDataModel.js'

class PricesModel extends RethinkdbDataModel {
    setNewThing(data) { // for futurre references
        this.newThing = data
    }
}

const prices = new PricesModel({
	schema: ['costByMinute','destination','origin'],
	table: 'prices'
})
export default prices