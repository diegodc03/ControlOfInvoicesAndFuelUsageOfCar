// Importamos las librerías necesarias

import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import Repostajes from '../model/Repostaje.js';
import bill from '../model/Bill.js';

import multer from 'multer';
import fs from 'fs';
import path from 'path';

import { fileURLToPath } from 'url';

import dotenv from 'dotenv';
dotenv.config({ path: '../config.env' });



console.log('MONGODB_CONNECT_URL:', process.env.MONGODB_CONNECT_URL);
console.log('PORT:', process.env.PORT);



// Simular __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);




// Creamos la aplicación de Express
const app = express();
app.use(cors());
app.use(express.json());



// Configurar una carpeta para servir archivos estáticos
app.use('/facturas/billuploads', express.static(path.join(__dirname, 'billuploads')));



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




// Ruta para obtener todas las facturas
app.get('/facturas/repostajes', async (req, res) => {
    const listRepostaje = await Repostajes.find();
    res.json(listRepostaje);
});



// Ruta para guardar una factura
app.post('/facturas/repostajes', async (req, res) => {
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
app.delete('/facturas/repostajes/:id', async (req, res) => {
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



//////////////////////////////////////////////////////////////////////////////////////////////////////
// Ruta para subir una factura

app.post('/facturas/uploadBill', upload.single('file'), (req, res) => {
  
  const { cost, date, km, fileName } = req.body;
  const file = req.file;
  
  if (!cost || !date || !km || !fileName || !file ) {
    return res.status(400).send('Faltan datos o archivos, comprueba tu solicitud');
  }

  // check if there is a file
  if (!req.file || req.file.length === 0) {
    return res.status(400).send('No se subió ningún archivo');
  }

  try {
    // Ruta donde se guardará el archivo
    const uploadDir = path.join(__dirname, 'billuploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir); // Crear el directorio si no existe
    }

    const newPath = path.join(uploadDir, fileName);

    // Guardar el archivo con el nombre especificado
    if (fs.existsSync(newPath)) {
      return res.status(400).send('El archivo con este nombre ya existe');
    }

    fs.renameSync(file.path, newPath);

    
     // We create de new bill object
     const newBill = new bill({
      date,
      cost,
      km,
      fileName
    });


    // We save the bill object in the database
    newBill.save();
    
    console.log('Archivo recibido:', file);
    // Responder al cliente
    res.status(200).json({
      message: 'Datos y archivo guardados correctamente',
      data: {
        date,
        km,
        cost,
        fileName,
      },
    });
  } catch (error) {
    res.status(500).send({ error: 'Error al guardar datos o archivo' });
  }
});



app.get('/facturas/get-all', async(req, res) => {
  console.log('GET /facturas/get-all');
  
  try{
    const bills = await bill.find();
    res.json(bills);
  }catch(error){
    res.status(500).send({ error: 'Error al obtener las facturas' });
  }


});


app.delete('/facturas/delete/:id', async(req, res) => {

  const { id } = req.params;
  console.log('DELETE /facturas/delete/:id', id);
  try {
    const billToDelete = await bill.findById(id);
    if (!billToDelete) {
      return res.status(404).send('Factura no encontrada');
    }


    console.log('Factura encontrada:', billToDelete);
    
    // delete the related file
    const uploadDir = path.join(__dirname, 'billuploads');
    const filePath = path.join(uploadDir, billToDelete.fileName);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    await bill.findByIdAndDelete(id);

    res.status(200).send('Factura eliminada correctamente');

  }catch (error) {
    res.status(500).send({ error: 'Error al eliminar la factura' });
  }

});



app.delete('/facturas/delete-all', async(req, res) => {

  console.log('DELETE /facturas/delete-all');
  try {
    const bills = await bill.find();
    bills.forEach(async (billToDelete) => {
      const uploadDir = path.join(__dirname, 'billuploads');
      const filePath = path.join(uploadDir, billToDelete.fileName);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      await bill.findByIdAndDelete(billToDelete._id);
    });

    res.status(200).send('Todas las facturas han sido eliminadas correctamente');

  }catch (error) {
    res.status(500).send({ error: 'Error al eliminar las facturas' });
  }

});



const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.MONGODB_CONNECT_URL)
  .then(() => {
      console.log('Conexión a MongoDB exitosa');
      app.listen(PORT, () => {
          console.log('Servidor corriendo ');
      });
  })
  .catch((error) => {
      console.error('Error de conexión a MongoDB:', error);
  });