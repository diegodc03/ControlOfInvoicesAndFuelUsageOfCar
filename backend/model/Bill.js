import mongoose from 'mongoose'; // Import mongoose

const repostajeSchema = new mongoose.Schema({
    //carId: { type:String, required: false },
    date: { type:String, required: true },
    km: { type:Number, required: true },
    cost: { type:Number, required: true },
    fileName: { type:String, required: true },
});

const bill = mongoose.model('bill', repostajeSchema);

export default bill; // Usar export default