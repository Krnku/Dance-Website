//Requirements section for app.js

const express = require("express");
const path = require("path");
const app = express();
const bodyparser = require('body-parser')
const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/contactDance', { UseNewUrlParser: true });
const port = 8000;

//Defining Mongoose Schema:

var contactschema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

var Contact = mongoose.model('Contact', contactschema);

//EXPRESS SPECIFIC STUFF:

app.use('/static', express.static('static')); //For serving static files
app.use(express.urlencoded())


//PUG SPECIFIC STUFF:

app.set('view engine', 'pug'); //Setting the engine as pug:
app.set('views', path.join(__dirname, 'views')) //Setting views directory:

//ENDPOINTS

app.get('/', (req, res) => {
    const tt = {};
    res.status(200).render('home.pug', tt);

})

app.get('/contact', (req, res) => {
    const tt = {};
    res.status(200).render('contact.pug', tt);

})

app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(() => {
    res.send("This data has been saved into the database")
}).catch(() => {
    res.status(400).send("Data has not been saved into the database")
});

})

//START THE SERVER

app.listen(port, () => {
    console.log(`The application started succcesfully on port ${port}`)
});




