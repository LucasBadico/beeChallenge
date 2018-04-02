
import { RethinkdbModel } from  '../../database/RethinkdbModel.js'
import log from 'log'
class LeadModel extends RethinkdbModel {
    constructor(opts){
        super(opts)
    }

    async getByEmail(email) {
        const result = await this.dbtable()
            .filter({ email: email })
            .run();
        return result
    }

    async getByFullName(fullName) {
        return await this.dbtable()
            .filter({ fullName: fullName })
            .run()
    }

    // not working 
    async getByDemand({ origin, destination}) {
        return await this.dbtable()
            .filter({ demand: { origin, destination } })
            .run()
    }
   
    async appendDemand(id, { origin, destination }) {
        const result = await this.dbtable()
            .get(id)
            .update(row => ({
                demands: row('demands').append({ origin, destination }),
            }))
            .run()
        return result
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
