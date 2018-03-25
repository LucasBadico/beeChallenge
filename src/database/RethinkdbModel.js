import db from './'

const r = db()

export class RethinkdbModel {
    constructor({
        table,
        schema,
    }){
        this.table = table
        this.schema = [...schema, 'created_at','updated_at']
    }

    getSchema() {
        return this.schema
    }

    async getAll() {
        const all = await r.table(this.table).run()
        return all
    }

    async getById(id) {
        const result =  await r.table(this.table)
			.get(id)
			.run();
	    return result
    }

    async update(id, data) {
        data.updated_at = r.now();
        const result = await r.table(this.table)
                .get(id)
                .update(data)
                .run();
        
        return result;
    }

    async save(data) {
        const result = await r.table(this.table)
                .insert({
                    ...data,
                    created_at: r.now(),
                    updated_at: r.now(),
                })
                .run()
        return result;
    }
}
