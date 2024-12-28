
import express from 'express';

import User from './model/User.js';


const router = express.Router();



router.post('/user-signup', async (req, res) => {

    const {name, second_name, email, password } = req.body;
    
    try {
        const user = new User({name, second_name, email, password });
        await user.save();
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: 'Error al guardar el usuario', message: error.message });
    }

});



router.post('/user-login', async (req, res) => {

    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email, password });
        if (!user) {
            return res.status(404).send('Usuario no encontrado');
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).send({ error: 'Error al buscar el usuario' });
    }
});


