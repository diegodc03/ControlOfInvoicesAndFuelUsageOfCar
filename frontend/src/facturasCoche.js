import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../src/css/bill.css';
import ShowBills from './mostrarFacturas';
import AddCarBill from './addCarBill';

const API_URL = 'http://localhost:5000/facturas';

const CarBills = () => {

    return (
        <div>
            <AddCarBill />

            <div>
                <ShowBills />
            </div>
        </div>
    );
}


export default CarBills;