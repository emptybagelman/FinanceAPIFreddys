const Transaction = require("../model/Transaction")

async function index(req,res) {
    try {
        const allTransactions = await Transaction.getAll()
        res.status(200).json(allTransactions)
    } catch (error) {
        res.status(502).json({"error":error.message})
    }
}

async function findById(req,res){
    try {
        const id = parseInt(req.params.id)
        const transaction = await Transaction.getById(id)
        res.status(200).json(transaction)
    } catch (error) {
        res.status(404).json({"error":error.message})
    }
}

async function findAllByUserId(req,res){
    try {
        const user_id = parseInt(req.params.user_id)
        const transaction = await Transaction.getById(user_id)
        res.status(200).json(transaction)
    } catch (error) {
        res.status(404).json({"error":error.message})
    }
}

async function findAllByCardId(req,res){
    try {
        const card_id = parseInt(req.params.card_id)
        const transaction = await Transaction.getAllByCardId(card_id)
        res.status(200).json(transaction)
    } catch (error) {
        res.status(404).json({"error":error.message})
    }
}

async function findAllByPayee(req,res){
    try {
        const data = req.params
        const transaction = await Transaction.getAllByPayee(data)
        res.status(200).json(transaction)
    } catch (error) {
        res.status(404).json({"error":error.message})
    }
}

async function create(req,res){
    const data = req.body
    const result = await Transaction.create(data)
    res.status(201).send({"Created successfully":result})
}

async function update(req,res){
    try {
        const id = parseInt(req.params.id)
        const data = req.body
        const transaction = await Transaction.getById(id)
        if(!transaction){ return res.status(404).json({message: "transaction not found"})}

        const updatedTransaction = await transaction.update(data)
        res.json(updatedTransaction)

    } catch (error) {
        res.status(500).json({message: "Internal server error", error: error.message})
    }
}

async function destroy(req,res){
    try {
        const id = parseInt(req.params.id)
        const toDelete = await Transaction.getById(id)
        await toDelete.destroy()
        res.status(204).json({"deleted":toDelete})
    } catch (error) {
        res.status(404).json({message: error.message})
    }
}

module.exports = {
    index, findById, findAllByUserId, findAllByCardId, findAllByPayee, create, update, destroy
}