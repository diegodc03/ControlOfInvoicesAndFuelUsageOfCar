  // Importamos las librerías necesarias

  import express from 'express';
  import cors from 'cors';
  import mongoose from 'mongoose';

  import dotenv from 'dotenv';
  dotenv.config({ path: './config.env' });

  import authRoutes from './authRoutes.js';
  import repostajeRoutes from './repostajeRoutes.js';
  import billRoutes from './billRoutes.js';

  console.log('MONGODB_CONNECT_URL:', process.env.MONGODB_CONNECT_URL);
  console.log('PORT:', process.env.PORT);



  // Creamos la aplicación de Express
  const app = express();
  app.use(cors());
  app.use(express.json());


  // Usar las rutas separadas
  app.use('/auth', authRoutes); // Las rutas de autenticación estarán bajo /auth
  app.use('/repostajes', repostajeRoutes); // Opcional: Rutas para repostajes
  app.use('/facturas', billRoutes); // Opcional: Rutas para facturas


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