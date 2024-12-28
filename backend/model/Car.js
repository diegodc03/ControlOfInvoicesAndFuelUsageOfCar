import mongoose from 'mongoose'; // Import mongoose



const carSchema = new mongoose.Schema({
    license_plate: { type:String, required: true },
    brand: { type:String, required: true },
    model: { type:String, required: true },
    repostajes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'repostaje'}], // Relación con repostajes
    bills: [{ type: mongoose.Schema.Types.ObjectId, ref: 'bill'}] // Relación con facturas
});

const car = mongoose.model('car', carSchema);

export default car; // Usar export default




// lo que se va a necesitar es asociar diferentes repostajes a un coche, por lo que necesitamos una relación entre repostaje y coche
// para ello, vamos a crear un nuevo modelo de coche

// Tabmién se va a necesitar una relación entre bill y car, por lo que necesitamos una relación entre bill y car
// para ello, vamos a crear un nuevo atributo bill