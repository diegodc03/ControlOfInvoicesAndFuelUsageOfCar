import React, { useEffect, useState } from 'react';
import axios from 'axios';

import '../src/css/mostrarFacturas.css';

const API_URL = 'http://localhost:5000/facturas';

const ShowBills = () => {

    const [facturas, setFacturas] = useState([]);

    useEffect(() => {
        const fetchBills = async () => {
          try {
            const response = await axios.get('http://localhost:5000/facturas/get-all');
            setFacturas(response.data);
          } catch (error) {
            console.error('Error al obtener las facturas', error);
          }
        };
        fetchBills();
      }, []);

    return (
        <div>
            <h2>Facturas</h2>
            
            <div className='show-general-bill'> 
                {facturas.map((factura) => (
                    
                    <div key={factura._id} >
                        <p>Fecha: {factura.date}</p>
                        <p>Importe: {factura.cost}</p>
                        <p>kilometros: {factura.km} </p>
                        <img src={factura.fileName} alt="Factura" style={{ width: '100px' }} />
                    </div>
        
                ))}
            </div>
        </div>
     
    );



}

export default ShowBills;