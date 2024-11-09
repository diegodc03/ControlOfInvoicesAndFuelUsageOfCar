
// Importamos las librerías necesarias
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Factura = require('./models/Factura');

// Creamos la aplicación de Express
const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static('uploads'));                     // Configurar



// Definimos las rutas para la base de datos no relacional
mongoose.connect('mongodb://localhost:27017/facturas', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }).then(() => console.log('Conectado a MongoDB'));



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
app.post('/api/facturas', upload.single('foto'), async (req, res) => {
    try {
      // Aquí el archivo está disponible en req.file y el resto de datos en req.body
      const factura = new Factura({
        cocheId: req.body.cocheId,
        fecha: req.body.fecha,
        importe: req.body.importe,
        fotoUrl: `http://localhost:5000/facturas/${req.file.filename}`, // URL accesible a la imagen
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



app.listen(3000, () => console.log('Servidor escuchando en el puerto 3000'));