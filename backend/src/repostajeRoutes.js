

import Repostajes from '../model/Repostaje.js';


import dotenv from 'dotenv';
dotenv.config({ path: './config.env' });





// Ruta para obtener todas las facturas
app.get('/repostajes', async (req, res) => {
    const listRepostaje = await Repostajes.find();
    res.json(listRepostaje);
});



// Ruta para guardar una factura
app.post('/repostajes', async (req, res) => {
    try {
        const { carId, date, km, liters, import: importAmount } = req.body;

        // Creamos una nueva instancia del modelo Repostaje
        const repostaje = new Repostajes({
          carId,
          date,
          km,
          liters,
          import: importAmount
        });
      
        // Guardamos el repostaje en la base de datos
        await repostaje.save();
        res.status(201).json(repostaje);  // Respondemos con los datos del repostaje guardado
      } catch (error) {
        res.status(400).json({ error: 'Error al guardar el repostaje', message: error.message });
      }
  });



// Ruta para borrar un repostaje
app.delete('/repostajes/:id', async (req, res) => {
  try{
    const { id } = req.params;
    const repostaje = await Repostajes.findById(id);
    if (!repostaje) {
      return res.status(404).send('Repostaje no encontrado');
    }
    await Repostajes.findByIdAndDelete(id);
    res.status(200).send('Repostaje eliminado correctamente');

  }catch(error){
    res.status(500).send({ error: 'Error al eliminar el repostaje' });
  }
});