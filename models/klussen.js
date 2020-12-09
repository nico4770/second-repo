
const mongoose = require('mongoose');
const { schema } = require('./gebruikers');
const { Schema } = mongoose;
// SWART optie ??
// const vandaagdt = new Date()


const KlussenSchema = new Schema({
    // aanvrager: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Gebruiker',
    //     required: true
    // },
    aanvrager: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    omschrijving: {
        type: String,
        required: true,
        maxLength: 40
    },

    toelichting: String,

    categorie: {
        type: String,
        required: true,
        enum: ['overig', 'boodschap', 'technisch', 'sociaal', 'fysiek', 'culinair'],
        default: 'overig'
    },

    plaatsingdt: {
        type: Date,
        default: Date.now
        // SWART optie ??
        // vandaagdt.toDateString(),
    },

    vervaldt: {
        type: Date,
        required: [true, 'Vul verval datum in']
    },

    status: {
        type: String,
        required: true,
        enum: ['aanvraag', 'uitvoer', 'afgewerkt'],
        default: 'aanvraag'
    },

    // uitvoerder: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Gebruiker',
    // }

}, {

    collection: 'klussen'

});

const Klus = mongoose.model('Klus', KlussenSchema);

module.exports = Klus;
