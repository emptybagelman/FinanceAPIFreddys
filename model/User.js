const db = require("../database/connect")

class User {
    constructor({ id, name, email, date_joined, about }){
        this.id = id
        this.name = name
        this.email = email
        this.date_joined = date_joined
        this.about = about
    }

    static async getAll(){
        const resp = await db.query("SELECT * FROM users;")
        return resp.rows.map(user => new User(user))
    }

    static async getById(id){
        const resp = await db.query("SELECT * FROM users WHERE id = $1;",[id])
        if(resp.rows.length === 0) throw new Error(`Unable to find user ${this.id}`)
            return new User(resp.rows[0])
    }

    static async getUserByEmail(email){
        const resp = await db.query("SELECT * FROM users WHERE email = $1",[email])
        if(resp.rows.length === 0) throw new Error(`Unable to find user ${email}`)
            return new User(resp.rows[0])
    }

    static async create(data){
        const {name, email, date_joined, about} = data

        const resp = await db.query("INSERT INTO users (name, email, date_joined, about) VALUES ($1, $2, $3, $4) RETURNING id;",[name, email, date_joined, about])

        const newId = resp.rows[0].id
        const newUser = await User.getById(newId)
        return newUser
    }

    async update(data){
        try {
            const validColumns = ["name", "email", "date_joined", "about"];
            const setClauses = [];
            const values = [];
            let index = 1;

            for (const key in data) {
                if (validColumns.includes(key)) {
                    setClauses.push(`${key} = $${index}`);
                    values.push(data[key]);
                    index++;
                }
            }

            if (setClauses.length === 0) {
                throw new Error('No valid columns to update');
            }

            values.push(this.id);
            const query = `UPDATE users SET ${setClauses.join(", ")} WHERE id = $${index} RETURNING *;`;

            const resp = await db.query(query, values);

            if (resp.rows.length === 0) {
                throw new Error(`Unable to find user: ${this.id}`);
            }
            return new User(resp.rows[0]);
        } catch (error) {
            throw new Error(`Error updating user: ${error.message}`);
        }
    }
}

module.exports = User;