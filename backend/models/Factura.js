const mongoose = require('mongoose');

const facturaSchema = new mongoose.Schema({
    carId: { type:String, required: true },
    date: { type:String, required: true },
    import: { type:Number, required: true },
    photoId: { type:String, required: true },       // URL de la foto
});


module.exports = mongoose.model('Factura', facturaSchema);