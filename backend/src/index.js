// Importamos las librerías necesarias

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Repostaje from '../model/Repostaje.js';


// Creamos la aplicación de Express
const app = express();
app.use(cors());
app.use(express.json());



// Ruta para obtener todas las facturas
app.get('/facturas/repostajes', async (req, res) => {
    const listRepostaje = await Repostaje.find();
    res.json(listRepostaje);
});



// Ruta para guardar una factura
app.post('/facturas/repostajes', async (req, res) => {
    try {
        // Recogemos los datos enviados desde el front-end
        const { carId, date, km, liters, import: importAmount } = req.body;
    
        // Creamos una nueva instancia del modelo Repostaje
        const repostaje = new Repostaje({
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



// Ruta para borrar una factura
app.delete('/facturas/repostajes/:id', async (req, res) => {
    try {
        const repostaje = await Repostaje.findByIdAndDelete(req.params.id);
        if (!repostaje) {
          res.status(404).send('No se ha encontrado la factura');
        }
        res.send(repostaje);
      } catch (error) {
        res.status(500).send(error);
      }
});





mongoose.connect('mongodb://localhost:27017/facturas', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
      console.log('Conexión a MongoDB exitosa');
      app.listen(5000, () => {
          console.log('Servidor corriendo en el puerto 5000');
      });
  })
  .catch((error) => {
      console.error('Error de conexión a MongoDB:', error);
  });