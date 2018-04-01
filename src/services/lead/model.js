
import { RethinkdbModel } from  '../../database/RethinkdbModel.js'

class LeadModel extends RethinkdbModel {
    constructor(opts){
        super(opts)
    }

    async getByEmail(email) {
        return await this.dbtable()
            .filter({ email: email.toLowerCase() })
            .run()
    }

    async getByEmail(fullName) {
        return await this.dbtable()
            .filter({ fullName: fullName.toLowerCase() })
            .run()
    }

    // not working 
    async getByDemand({ origin, destination}) {
        return await this.dbtable()
            .filter({ demand: { origin, destination } })
            .run()
    }
   
    async appendDemand(id, { origin, destination }) {
        return await this.dbtable()
            .get(id)
            .update(row => ({
                demands: row('demands').append({ origin, destination }),
            }))
    }
}

const model = new LeadModel({
	schema: ['email','fullName','firstName', 'demands'],
	table: 'leads'
})

export {
    LeadModel,
}
export default model
