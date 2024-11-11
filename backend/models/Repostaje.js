const moongose = require('mongoose');

const repostajeSchema = new moongose.Schema({
    carId: { type:String, required: true },
    date: { type:String, required: true },
    km: { type:Number, required: true },
    liters: { type:Number, required: true },
    import: { type:Number, required: true },
});

module.exports = moongose.model('Repostaje', repostajeSchema);