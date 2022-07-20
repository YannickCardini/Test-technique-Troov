require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const mongoString = process.env.DATABASE_URL;
const cors = require('cors');



mongoose.connect(mongoString);
const database = mongoose.connection;

database.on('error', (error) => {
    console.log(error)
})

database.once('connected', () => {
    console.log('Database Connected');
})
const app = express();
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:3000'
}));

const userRoutes = require('./routes/user-routes');
const personRoutes = require('./routes/person-routes');

app.use('/user', userRoutes);
app.use('/person', personRoutes);


app.listen(3001, () => {
    console.log(`Server Started at ${3001}`)
})