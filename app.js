const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const session = require('express-session');
const ExpressError = require('express-error');
const mongoSanitize = require('express-mongo-sanitize');
const MongoDBStore = require("connect-mongo")(session);
const router = express.Router();
const bodyParser = require("body-parser");

const app = express();

// SWART connection with klus-app database require model
const GebruikersDb = require('./models/gebruikers');
const KlussenDb = require('./models/klussen');


// SWART setting up database connection
mongoose.connect('mongodb://localhost:27017/klus-app', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
// SWART checking database connection 
const db = mongoose.connection;
db.on("error", console.error.bind(console, "!! database connection error:"));
db.once("open", () => {
    console.log('database connected succesful');
});
// 

// BOSMA SETTING EJS AND MAKING VIEWS ACCESSIBLE FROM ANYWHERE
app.engine('ejs', ejsMate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
// BOSMA setting public folder for serving static files
app.use(express.static(__dirname + '/public'));
// 

// BOSMA PARSING REQS AND MAKING SURE WE CAN UPDATE AND DELETE OVERRIDING POST
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
// 

// ROUTES

app.get('/', (req, res) => {
    res.render('home-public');
});
// 

app.get('/klussen', async (req, res) => {
    const klussen = await KlussenDb.find({});
    console.log(klussen);
    res.render('klus-lijst', { klussen });
});

// Id nog bij zoeken voor post -> relationships laten we nu zitten, we vragen gebruikersnaam in te voeren bij aanvrager-veld EN emailadres (zodat ze contact op kunnen nemen, klussen.js is hierop aangepast)
app.post('/klussen', async (req, res) => {
    const klus = new KlussenDb(req.body.klus);
    await klus.save();
    res.redirect('klussen');
});

app.get('/klusmaken', (req, res) => {
    res.render('klus-maken.ejs');
});

app.get('/klussen/:id', async (req, res) => {
    // SWART hier moet nog selectie plaatse vinden op basis van de gekozen klus
    // BOSMA dit werkt nu
    console.log(req.params.id);
    const klus = await KlussenDb.findById(req.params.id);
    res.render('klus', { klus });
});

// BOSMA Delete werkt nu
app.delete('/klussen/:id', async (req, res) => {
    const { id } = req.params;
    await KlussenDb.findByIdAndDelete(id);
    res.redirect('/klussen');
});

// BOSMA Update ga ik nu regelen
// BOSMA De GET moet doorsturen naar een edit-view (formulier klus-maken maar dan al ingevuld met huidige values)
app.get('/klussen/:id/edit', async (req, res) => {
    const klus = await KlussenDb.findById(req.params.id);
    res.render('klus-edit', { klus });
});

// Submit van edit-formulier komt hier uit
app.put('/klussen/:id', async (req, res) => {
    const { id } = req.params;
    console.log(id);
    const klus = await KlussenDb.findByIdAndUpdate(id, { ...req.body.klus });
    console.log(klus);
    res.redirect(`/klussen/${klus._id}`);
})

// BOSMA REQUESTS FOR GEBRUIKERS
// INSCHRIJVEN
app.get('/inschrijven', (req, res) => {
    res.render('gebruiker-maken');
})

app.post('/gebruikers', async (req, res) => {
    const gebruiker = new GebruikersDb(req.body.gebruiker);
    await gebruiker.save();
    res.redirect('/');
})
// 


// BOSMA SETTING UP LOCAL HOST
app.listen(3000, (req, res) => {
    console.log('Poortje 3000 luistert weer mensen!!!')
});
//