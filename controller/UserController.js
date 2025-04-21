const User = require("../model/User")

async function index(req,res) {
    try {
        const allUsers = await User.getAll()
        res.status(200).json(allUsers)
    } catch (error) {
        res.status(502).json({"error":error.message})
    }
}

async function findById(req,res){
    try {
        const id = parseInt(req.params.id)
        const user = await User.getById(id)
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({"error":error.message})
    }
}

async function findByEmail(req,res){
    try {
        const email = parseInt(req.params.email)
        const user = await User.getUserByEmail(email)
        res.status(200).json(user)
    } catch (error) {
        res.status(404).json({"error":error.message})
    }
}

async function create(req,res){
    const data = req.body
    const result = await User.create(data)
    res.status(201).send({"Created successfully":result})
}

async function update(req,res){
    try {
        const id = parseInt(req.params.id)
        const data = req.body
        const user = await User.getById(id)
        if(!user){ return res.status(404).json({message: "user not found"})}

        const updatedUser = await user.update(data)
        res.json(updatedUser)

    } catch (error) {
        res.status(500).json({message: "Internal server error", error: error.message})
    }
}

module.exports = {
    index, findById, findByEmail, create, update
}