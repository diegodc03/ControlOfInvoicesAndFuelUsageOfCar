
// Importamos las librerías necesarias
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Factura = require('./models/Repostaje');
const Repostaje = require('./models/Repostaje');
const multer = require('multer'); // Asegúrate de que multer está importado

const PORT = 5000;

// Creamos la aplicación de Express
const app = express();
///app.listen(PORT, () => console.log(`Servidor escuchando en el puerto ${PORT}`));
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));                     // Configurar





// Definimos las rutas para la base de datos no relacional
mongoose.connect('mongodb://localhost:27017/facturas')
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.log('Error al conectar a MongoDB', err));



// Configuración de almacenamiento con Multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/'); // Directorio donde se guardarán las fotos
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname)); // Usar timestamp para nombre único
    },
  });

  const upload = multer({ storage: storage });



// Ruta para obtener todas las facturas
app.get('/facturas', async (req, res) => {
    const facturas = await Factura.find();
    res.json(facturas);
});


// Ruta para guardar una factura
app.post('/facturas', upload.single('foto'), async (req, res) => {
    try {
      // Aquí el archivo está disponible en req.file y el resto de datos en req.body
      const factura = new Factura({
        carId: req.body.cocheId,
        date: req.body.fecha,
        import: req.body.importe,
        photoId: `http://localhost:5000/facturas/${req.file.filename}`, // URL accesible a la imagen
      });
  
      await factura.save();
      res.status(201).send(factura);
    } catch (error) {
      res.status(400).send(error);
    }
  });



// Ruta para borrar una factura
app.delete('/facturas/:id', async (req, res) => {
    try {
        const factura = await Factura.findByIdAndDelete(req.params.id);
        if (!factura) {
          res.status(404).send('No se ha encontrado la factura');
        }
        res.send(factura);
      } catch (error) {
        res.status(500).send(error);
      }
});


/** 
 * ==============================
 * RUTAS PARA "repostaje"
 * ==============================
 */

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



/** 
 * ==============================
 * INICIO DEL SERVIDOR
 * ==============================
 */

app.listen(5000, () => console.log('Servidor escuchando en el puerto 5000'));