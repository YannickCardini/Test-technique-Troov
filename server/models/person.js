const mongoose = require('mongoose');

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const personSchema = new mongoose.Schema({
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Une adresse email est nécessaire',
        validate: [validateEmail, 'Veuillez indiquer une adresse email valide'],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Veuillez indiquer une adresse email valide']
    },
    name: {
        required: true,
        type: String,
    },
    age: {
        required: true,
        type: Number,
    },
    isActive: {
        required: true,
        type: Boolean,
    },
})

module.exports = mongoose.model('Persons', personSchema);