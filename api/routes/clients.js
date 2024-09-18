const router = require('express').Router()
const Client = require('../models/Client')

//CREATE CLIENT
router.post('/', async (req,res) => {
    const newClient = new Client(req.body)
    console.log(req.body)
    try {
        const savedClient = await newClient.save()
        res.status(201).json(savedClient)
    } catch (err) {
        res.status(500).json(err)
    }
})


//UPDATE CLIENT

router.put('/:id', async (req,res) => {
    try {
        await Client.updateOne({clientId: req.params.id},{
            $set: req.body
        })
        const client = await Client.findOne({clientId: req.params.id})
        res.status(200).json(client)
    } catch (err) {
        res.status(500).json(err)
    }
})

//DELETE CLIENT

router.delete('/:id', async (req,res) => {
    try {
        await Client.deleteOne({clientId: req.params.id})
        res.status(200).json("client job deleted successfully.")
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET CLIENTS
router.get('/', async (req,res) => {
    try {
        const clients = await Client.find({})
        res.status(200).json(clients)
    } catch (err) {
        res.status(500).json(err)
    }
})

//GET CLIENT
router.get('/:id', async (req,res) => {
    try {
        const client = await Client.findOne({clientId: req.params.id})
        if(!client) {
            return res.status(404).json("client not found!")
        }
        res.status(200).json(client)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router