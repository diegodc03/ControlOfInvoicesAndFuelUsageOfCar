import mongoose from 'mongoose'; // Import mongoose

const userSchema = new mongoose.Schema({
    email: { type:String, required: true },
    password: { type:String, required: true },
    name: { type:String, required: true },
    second_name: { type:String, required: true },
    cars: [{ type: mongoose.Schema.Types.ObjectId, ref: 'car'}] // Relación con coches , como esta entre corchetes es un array puede un usuario tener varios coches, y que un coche esté en varios usuarios, per a partir de coche no podemos saber el usuario
});

const user = mongoose.model('user', userSchema);

export default user; // Usar export default!cost || !date || !fileName 