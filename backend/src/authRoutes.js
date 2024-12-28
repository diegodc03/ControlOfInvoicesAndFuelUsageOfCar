
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
dotenv.config({ path: './config.env' });



console.log('MONGODB_CONNECT_URL:', process.env.MONGODB_CONNECT_URL);
console.log('PORT:', process.env.PORT);


