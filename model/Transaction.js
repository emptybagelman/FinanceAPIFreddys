const db = require("../database/connect")

class Transaction {
    constructor({ id, user_id, card_id, payee, amount, date_paid }){
        this.id = id
        this.user_id = user_id
        this.card_id = card_id
        this.payee = payee
        this.amount = amount
        this.date_paid = date_paid
    }

    static async getAll(){
        const resp = await db.query("SELECT * FROM transactions;")
        return resp.rows.map(transaction => new Transaction(transaction))
    }

    static async getById(id){
        const resp = await db.query("SELECT * FROM transactions WHERE id = $1;",[id])
        if(resp.rows.length === 0) throw new Error(`Unable to find transaction ${this.id}`)
            return new Transaction(resp.rows[0])
    }

    static async getByUserId(user_id){
        const resp = await db.query("SELECT * FROM transactions WHERE id = $1;",[user_id])
        if(resp.rows.length === 0) throw new Error(`Unable to find transaction ${this.user_id}`)
            return new Transaction(resp.rows[0])
    }

    static async getAllByCardId(card_id){
        const resp = await db.query("SELECT * FROM transactions WHERE card_id = $1;",[card_id])
        if(resp.rows.length === 0) throw new Error(`Unable to find card ${this.card_id}`)
            return resp.rows.map(transaction => new Transaction(transaction))
    }

    static async getAllByPayee(data){

        const {payee, user_id} = data

        const resp = await db.query("SELECT * FROM transactions WHERE payee = $1 AND user_id = $2;",[payee, user_id])
        if(resp.rows.length === 0) throw new Error(`Unable to find payments to ${payee} for user ${user_id}`)
            return resp.rows.map(transaction => new Transaction(transaction))
    }

    

    static async create(data){
        const {user_id, card_id, payee, amount, date_paid} = data

        const resp = await db.query("INSERT INTO transactions (user_id, card_id, payee, amount, date_paid) VALUES ($1, $2, $3, $4, $5) RETURNING id;",[user_id, card_id, payee, amount, date_paid])

        const newId = resp.rows[0].id
        const newTransaction = await Transaction.getById(newId)
        return newTransaction
    }

    async update(data){
        try {
            const validColumns = ["user_id","card_id","payee","amount","date_paid"];
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
            const query = `UPDATE transactions SET ${setClauses.join(", ")} WHERE id = $${index} RETURNING *;`;

            const resp = await db.query(query, values);

            if (resp.rows.length === 0) {
                throw new Error(`Unable to find transaction: ${this.id}`);
            }
            return new Transaction(resp.rows[0]);
        } catch (error) {
            throw new Error(`Error updating transaction: ${error.message}`);
        }
    }

    async destroy(){
        const resp = await db.query("DELETE FROM transactions WHERE id = $1 RETURNING *;",[this.id])
        return new Entry(resp.rows[0])
    }
}

module.exports = Transaction;