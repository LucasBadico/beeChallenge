import db from './'

const r = db()

/*
* @TODO, make schema and table private props
*
*/
export class RethinkdbModel {
    constructor({
        table,
        schema,
    }){
        this.table = table
        this.schema = [...schema, 'created_at','updated_at']
    }
    dbtable() {
        return r.table(this.table)
    }
    getSchema() {
        return this.schema
    }

    async getAll() {
        const all = await this.dbtable().run()
        return all
    }

    async getById(id) {
        const result = await this.dbtable()
			.get(id)
			.run();
	    return result
    }

    async update(id, data) {
        data.updated_at = r.now();
        const result = await this.dbtable()
                .get(id)
                .update(data)
                .run();
        
        return result;
    }

    async create(data) {
        const result = await this.dbtable()
                .insert({
                    ...data,
                    created_at: r.now(),
                    updated_at: r.now(),
                })
                .run()
        return result;
    }
}
