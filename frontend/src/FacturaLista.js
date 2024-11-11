// FacturasList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FacturasList = () => {
  const [facturas, setFacturas] = useState([]);

  useEffect(() => {
    const fetchFacturas = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/facturas');
        setFacturas(response.data);
      } catch (error) {
        console.error('Error al obtener las facturas', error);
      }
    };
    fetchFacturas();
  }, []);

  return (
    <div>
      <h2>Facturas</h2>
      {facturas.map((factura) => (
        <div key={factura._id}>
          <h3>ID del Coche: {factura.cocheId}</h3>
          <p>Fecha: {factura.fecha}</p>
          <p>Importe: {factura.importe}</p>
          <img src={factura.photoId} alt="Factura" style={{ width: '100px' }} />
        </div>
      ))}
    </div>
  );
};

export default FacturasList;
