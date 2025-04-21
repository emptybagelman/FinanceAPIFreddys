const Card = require("../model/Card")

async function index(req,res) {
    try {
        const allCards = await Card.getAll()
        res.status(200).json(allCards)
    } catch (error) {
        res.status(502).json({"error":error.message})
    }
}

async function findById(req,res){
    try {
        const id = parseInt(req.params.id)
        const card = await Card.getById(id)
        res.status(200).json(card)
    } catch (error) {
        res.status(404).json({"error":error.message})
    }
}

async function findBalance(req,res){
    try {
        const id = parseInt(req.params.id)
        const card = await Card.getCardBalance(id)
        res.status(200).json({"balance":card})
    } catch (error) {
        res.status(404).json({"error":error.message})
    }
}

async function create(req,res){
    const data = req.body
    const result = await Card.create(data)
    res.status(201).send({"Created successfully":result})
}

async function update(req,res){
    try {
        const id = parseInt(req.params.id)
        const data = req.body
        const card = await Card.getById(id)
        if(!card){ return res.status(404).json({message: "card not found"})}

        const updatedCard = await card.update(data)
        res.json(updatedCard)

    } catch (error) {
        res.status(500).json({message: "Internal server error", error: error.message})
    }
}

module.exports = {
    index, findById, findBalance, create, update
}