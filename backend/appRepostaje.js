
// Importamos las librerías necesarias
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Factura = require('./models/Repostaje');
const Repostaje = require('./models/Repostaje');

// Creamos la aplicación de Express
const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));                     // Configurar



// Definimos las rutas para la base de datos no relacional
mongoose.connect('mongodb://localhost:27017/repostaje', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log('Conectado a MongoDB'));



  
// Ruta para obtener todas las facturas
app.get('/repostaje', async (req, res) => {
    const listRepostaje = await Repostaje.find();
    res.json(listRepostaje);
});


// Ruta para guardar una factura
app.post('/repostaje', async (req, res) => {
    try {
      // Aquí el archivo está disponible en req.file y el resto de datos en req.body
      const repostaje = new Repostaje({
        carId: req.body.carId,
        date: req.body.date,
        km: req.body.km,
        liters: req.body.liters,
        import: req.body.import
       
      });
      await factura.save();
      res.status(201).send(factura);
    } catch (error) {
      res.status(400).send(error);
    }
  });



// Ruta para borrar una factura
app.delete('/repostaje/:id', async (req, res) => {
    try {
        const repostaje = await Repostaje.findByIdAndDelete(req.params.id);
        if (!repostaje) {
          res.status(404).send('No se ha encontrado la factura');
        }
        res.send(factura);
      } catch (error) {
        res.status(500).send(error);
      }
});


