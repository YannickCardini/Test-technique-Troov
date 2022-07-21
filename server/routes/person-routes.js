const express = require('express');
const Person = require('../models/person');
const personRoutes = express.Router();

//Post Method
personRoutes.post('/post', async (req, res) => {

    const person = new Person({
        email: req.body.email,
        name: req.body.name,
        age: req.body.age,
        isActive: req.body.isActive
    })

    try {
        const personToSave = await person.save();
        res.status(201).json({ message: person.name + " a bien été ajouté(e)" })
    }
    catch (error) {
        if (error.message.includes("duplicate key error collection:"))
            res.status(200).json({ message: "Un compte avec l'email: " + person.email + " existe déjà." });
        else
            res.status(400).json({ message: error.message })
    }
})

//Get all Method
personRoutes.get('/getAll/:email', async (req, res) => {
    try {
        const person = await Person.find({email: req.params.email});
        res.json(person);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//Get by ID Method
personRoutes.get('/getOne/:email', async (req, res) => {
    try {
        const person = await Person.findOne({email: req.params.email});
        res.json(person);
    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
})

//Update by ID Method
personRoutes.patch('/update/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const updatedPerson = req.body;
        const options = { new: true };

        const result = await Person.findByIdAndUpdate(
            id, updatedPerson, options
        )

        res.send(result)
    }
    catch (error) {
        res.status(500).json({ message: error.message })
    }
})

//Delete by ID Method
personRoutes.delete('/delete/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const person = await Person.findByIdAndDelete(id)
        res.send(`Document with ${person.email} has been deleted..`)
    }
    catch (error) {
        res.status(400).json({ message: error.message })
    }
})

module.exports = personRoutes;