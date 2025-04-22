const db = require("../database/connect")

class Card {
    constructor({ id, user_id, name, minimum, balance }){
        this.id = id
        this.user_id = user_id
        this.name = name
        this.minimum = minimum
        this.balance = balance
    }

    static async getAll(){
        const resp = await db.query("SELECT * FROM cards;")
        return resp.rows.map(card => new Card(card))
    }

    static async getById(id){
        const resp = await db.query("SELECT * FROM cards WHERE id = $1;",[id])
        if(resp.rows.length === 0) throw new Error(`Unable to find user ${this.id}`)
            return new Card(resp.rows[0])
    }

    static async getCardBalance(id){
        const resp = await db.query("SELECT amount FROM transactions WHERE card_id = $1;",[id])
        if(resp.rows.length === 0) throw new Error(`Unable to find user ${this.id}`)
            console.log(resp.rows);
            const balance = resp.rows.reduce((partial, a) => Number(partial) + Number(a.amount), 0)
            return balance
    }

    static async create(data){
        const {user_id, name, minimum} = data

        const resp = await db.query("INSERT INTO cards (user_id, name, minimum, balance) VALUES ($1, $2, $3, $4) RETURNING id;",[user_id, name, minimum, balance])

        const newId = resp.rows[0].id
        const newCard = await Card.getById(newId)
        return newCard
    }

    async update(data){
        try {
            const validColumns = ["name", "minimum", "balance"];
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
            const query = `UPDATE cards SET ${setClauses.join(", ")} WHERE id = $${index} RETURNING *;`;

            const resp = await db.query(query, values);

            if (resp.rows.length === 0) {
                throw new Error(`Unable to find user: ${this.id}`);
            }
            return new Card(resp.rows[0]);
        } catch (error) {
            throw new Error(`Error updating user: ${error.message}`);
        }
    }
}

module.exports = Card;