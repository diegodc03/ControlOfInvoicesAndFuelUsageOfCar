// Importamos las librerías necesarias

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Repostaje from '../model/Repostaje.js';
import multer from 'multer';
import fs from 'fs';
import path from 'path';


// Creamos la aplicación de Express
const app = express();
app.use(cors());
app.use(express.json());





// Configurar multer para aceptar solo imágenes
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'billuploads/'); // El directorio de destino
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname); // Obtiene la extensión del archivo original
    cb(null, `${Date.now()}${ext}`); // Guarda el archivo con un nombre único basado en la fecha y la extensión original
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    if (allowedTypes.includes(file.mimetype)) {
      cb(null, true); // Acepta el archivo
    } else {
      cb(new Error('Solo se permiten imágenes JPEG o PNG'), false); // Rechaza otros tipos
    }
  },
});

//Configuamos el multer para subir archivos al servidor
/*
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });
  
const upload = multer({ storage: storage });
*/



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
    if (!req.files || req.files.length === 0) {
      return res.status(400).send('No se subió ningún archivo');
    }

    console.log('Archivos subidos:', req.files);

    // Puedes procesar cada archivo subido
    const savedPaths = req.files.map((file) => saveImage(file)); // saveImage maneja cada archivo
    res.status(200).send({
      message: 'Archivos subidos correctamente',
      paths: savedPaths,
    });
  } catch (error) {
    console.error('Error al subir los archivos:', error);
    res.status(500).send({ error: 'Error al procesar los archivos' });
  }
});



//////////////////////////////////////////////////////////////////////////////////////////////////////
// Ruta para subir una factura

app.post('/facturas/uploadBill', upload.single('file'), (req, res) => {
  
  const { cost, date, fileName } = req.body;
  const file = req.file;
  
  if (!cost || !date || !fileName || !file || file.length === 0) {
    console.log('Archivo recibido:', file);
    console.log('valor de file', file.length)
    console.log('Nombre:', fileName, 'Coste:', cost, 'Fecha:', date);
    return res.status(400).send('Faltan datos o archivos, comprueba tu solicitud');
  }

  try {
    if (!req.file || req.file.length === 0) {
      return res.status(400).send('No se subió ningún archivo');
    }


    console.log('Archivo recibido:', file);
    console.log('Nombre:', fileName, 'Coste:', cost, 'Fecha:', date);

    res.json({ message: 'Datos recibidos correctamente.' });


    // Guardar todos los archivos subidos
    const savedPaths = req.files.map((file) => saveImage(file));

    res.status(200).send({
      message: 'Archivos subidos correctamente',
      paths: savedPaths,
    });
  } catch (error) {
    console.error('Error al subir los archivos:', error);
    res.status(500).send({ error: 'Error al procesar los archivos' });
  }
});


  function saveImage(file) {
    const originalFileName = file.originalname; // Nombre original del archivo con su extensión
    const newPath = path.join(__dirname, 'billuploads', originalFileName); // Usa path.join para asegurar la correcta concatenación
    console.log(`Guardando archivo en: ${newPath}`);
    try {
      // Verifica si el archivo ya existe para evitar sobrescribirlo
      if (fs.existsSync(file.path)) {
        fs.renameSync(file.path, newPath); // Renombra el archivo de acuerdo a su nombre original
        console.log(`Archivo guardado en: ${newPath}`);
        return newPath; // Devuelve la ruta del archivo guardado
      } else {
        console.log(`Archivo no encontrado: ${file.path}`);
        return null;
      }
    } catch (error) {
      console.error('Error al guardar el archivo:', error);
      return null;
    }
  }


  app.get('/facturas', async(req, res) => {



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