import mongoose from 'mongoose'; // Import mongoose

const repostajeSchema = new mongoose.Schema({
    carId: { type:String, required: true },
    date: { type:String, required: true },
    km: { type:Number, required: true },
    liters: { type:Number, required: true },
    import: { type:Number, required: true },
});

const Repostajes = mongoose.model('repostajes', repostajeSchema);

export default Repostajes; // Usar export default!cost || !date || !fileName 