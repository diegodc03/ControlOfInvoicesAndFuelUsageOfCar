import mongoose from 'mongoose'; // Import mongoose

const repostajeSchema = new mongoose.Schema({
    carId: { type:String, required: true },
    date: { type:String, required: true },
    km: { type:Number, required: true },
    liters: { type:Number, required: true },
    import: { type:Number, required: true },
});

const Repostaje = mongoose.model('repostajes', repostajeSchema);

export default Repostaje; // Usar export default