const express = require('express');
const Model = require('../models/model');
const router = express.Router();

//Post Method
router.post('/post', async (req, res) => {

    const user = new Model({
        email: req.body.email,
        password: req.body.password
    })

    try {
        const userToSave = await user.save();
        res.status(200).json(userToSave)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

//Get all Method
router.get('/getAll', async (req, res) => {
    try {
        const user = await Model.find();
        res.json(user)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get by ID Method
router.get('/getOne/:id', async (req, res) => {
    try {
        const user = await Model.findById(req.params.id);
        res.json(user)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Update by ID Method
router.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updateduser = req.body;
        const options = { new: true };

        const result = await Model.findByIdAndUpdate(
            id, updateduser, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Delete by ID Method
router.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await Model.findByIdAndDelete(id)
        res.send(`Document with ${user.email} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = router;