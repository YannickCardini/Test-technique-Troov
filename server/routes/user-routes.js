const express = require('express');
const User = require('../models/user');
const userRoutes = express.Router();

//Post Method
userRoutes.post('/post', async (req, res) => {

    const user = new User({
        email: req.body.email,
        password: req.body.password
    })

    try {
        const userToSave = await user.save();
        res.status(201).json({ message: "Votre compte sur Test technique Troov a bien été créé" })
    }
    catch (error) {
        if (error.message.includes("duplicate key error collection:"))
            res.status(200).json({ message: "Un compte avec l'email: " + user.email + " existe déjà." });
        else
            res.status(400).json({ message: error.message })
    }
})

//Get all Method
userRoutes.get('/getAll', async (req, res) => {
    try {
        const user = await User.find();
        res.json(user)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Get by ID Method
userRoutes.get('/getOne/:email', async (req, res) => {
    try {
        const user = await User.findOne({email: req.params.email});
        res.json(user);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//Update by ID Method
userRoutes.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updateduser = req.body;
        const options = { new: true };

        const result = await User.findByIdAndUpdate(
            id, updateduser, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Delete by ID Method
userRoutes.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findByIdAndDelete(id)
        res.send(`Document with ${user.email} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = userRoutes;