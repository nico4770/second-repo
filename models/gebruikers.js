
const mongoose = require('mongoose');
const { Schema } = mongoose;


const gebruikersSchema = new Schema({

    gebruikersnaam: {
        type: String,
        required: [true, 'Vul een schermnaam in'],
        unique: true
    },
    wachtwoord: {
        type: String,
        required: [true, 'Vul een wachtwoord in']
    },
    voornaam: {
        type: String,
        required: [true, 'Vul je voornaam in']
    },
    achternaam: {
        type: String,
        required: [true, 'Vul je achternaam in']
    },
    email: {
        type: String,
        required: [true, 'Vul je email adres in'],
        unique: true
    },

    telnr: String,
    woonplaats: String,
    straat: String,
    huisnr: String,
    huisnrtoev: String,
    postcode: String,
    bio: String,

}, {

    collection: 'gebruikers'

});


const Gebruiker = mongoose.model('Gebruiker', gebruikersSchema);

module.exports = Gebruiker;



