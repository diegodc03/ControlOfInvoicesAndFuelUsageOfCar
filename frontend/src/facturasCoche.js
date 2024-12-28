import React from 'react';
import '../src/css/bill.css';
import ShowBills from './mostrarFacturas';
import AddCarBill from './addCarBill';



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