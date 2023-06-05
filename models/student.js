const { query } = require('./connection');



class student {
     constructor(surname, first_name, other_name, dob, email, phone, disability, gender, address, password, created_at = null, updated_at = null,id = null) {
        this.id = id;
        this.surname = surname;
        this.first_name = first_name;
        this.other_name = other_name;
        this.dob = dob;
        this.email = email;
        this.phone = phone;
        this.disability = disability;
        this.dob = dob;
        this.gender = gender;
        this.password = password;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    async save() {
        let sql = 
        `INSERT INTO students (surname, id, first_name, other_name, dob, email, phone, disability, gender, address, password) VALUES
        ('${this.surname}', '${this.id}', '${this.first_name}','${this.other_name}', '${this.dob}', '${this.email}','${this.phone}', '${this.disability}', '${this.gender}','${this.address}', '${this.password}')`
        console.log(sql);
        let result = await query(sql)
        this.id = result.insertId
        return result.insertId
    }

    static async fetch(){
        let students = []
        let sql = `SELECT * FROM students`
        let results = await query(sql);
        for (const row of results) {
            students.push(new student(row.surname, row.id, row.first_name, row.other_name, row.dob, row.email, row.phone, row.disability, row.gender, row.address, row.password, row.created_at, row.updated_at, row.id))
        }
        return students        
    }

    static async findById(id){
        let sql = `SELECT * FROM students WHERE id = ${id}`
        let results = await query(sql);
        if (results.length > 0) {
            let row = results[0]
            return new student(row.surname, row.first_name, row.other_name, row.dob, row.email, row.phone, row.disability, row.gender, row.address, row.password, row.created_at, row.updated_at, row.id)
        }
        return null
    }
    
    update(){
        let sql = `UPDATE students SET surname = '${this.surname}', first_name = '${this.first_name}', password = '${this.password}', other_name = '${this.other_name}',dob = '${this.dob}',email = '${this.email}',phone = '${this.phone}',disability = '${this.disability}',gender = '${this.gender}',address = '${this.address}', WHERE id = ${this.id}`
        let result = query(sql)
        return result.affectedRows > 0
    }

    delete(){
        let sql = `DELETE FROM students WHERE id = ${this.id}`
        let result = query(sql)
        return result.affectedRows > 0
    }

    
}

module.exports = student;