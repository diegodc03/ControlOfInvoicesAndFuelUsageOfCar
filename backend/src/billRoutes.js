
  
    import express from 'express';
    import bill from '../model/Bill.js';
  
    import multer from 'multer';
    import fs from 'fs';
    import path from 'path';
  
    import { fileURLToPath } from 'url';
  
    import dotenv from 'dotenv';
    dotenv.config({ path: './config.env' });
    

    const router = express.Router();
  
  

    // Simular __dirname
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    // Configurar una carpeta para servir archivos estáticos
    router.use('/billuploads', express.static(path.join(__dirname, 'billuploads')));

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







    //////////////////////////////////////////////////////////////////////////////////////////////////////
    // Ruta para subir una factura

    router.post('/uploadBill', upload.single('file'), (req, res) => {
        
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



    router.get('/get-all', async(req, res) => {
        console.log('GET /facturas/get-all');
        
        try{
        const bills = await bill.find();
        res.json(bills);
        }catch(error){
        res.status(500).send({ error: 'Error al obtener las facturas' });
        }


    });


    router.delete('/delete/:id', async(req, res) => {

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



    router.delete('/facturas/delete-all', async(req, res) => {

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



export default router;