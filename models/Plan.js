const { query } = require('./connection');


class Plan {
     constructor(name, price, description, created_at = null, updated_at = null, id = null ) {
        this.id = id;
        this.name = name;
        this.price = price;        
        this.description = description;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    async save() {
        let sql = `INSERT INTO plans (name, price, description) VALUES ('${this.name}', '${this.price}', '${this.description}')`
        let result = await query(sql)
        this.id = result.insertId
        return result.insertId
    }

    static async fetch(){
        let plans = []
        let sql = `SELECT * FROM plans`
        let results = await query(sql);
        for (const row of results) {
            plans.push(new Plan(row.name, row.price, row.description, row.created_at, row.updated_at, row.id))
        }
        return plans        
    }

    static async findById(id){
        let sql = `SELECT * FROM plans WHERE id = ${id}`
        let results = await query(sql);
        if (results.length > 0) {
            let row = results[0]
            return new Plan(row.name, row.price, row.description, row.created_at, row.updated_at, row.id)
        }
        return null
    }
    
    update(){
        let sql = `UPDATE plans SET name = '${this.name}', price = '${this.price}', description = '${this.description}' WHERE id = ${this.id}`
        let result = query(sql)
        return result.affectedRows > 0
    }

    delete(){
        let sql = `DELETE FROM plans WHERE id = ${this.id}`
        let result = query(sql)
        return result.affectedRows > 0
    }

    
}

module.exports = Plan;