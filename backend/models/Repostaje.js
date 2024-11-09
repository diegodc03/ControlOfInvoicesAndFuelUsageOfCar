const moongose = require('mongoose');

const repostajeSchema = new moongose.Schema({
    carId: { type:String, required: true },
    date: { type:String, required: true },
    km: { type:Number, required: true },
    liters: { type:Number, required: true },
    importe: { type:Number, required: true },
    photoId: { type:String, required: false },       // URL de la foto
});

module.exports = moongose.model('Repostaje', repostajeSchema);