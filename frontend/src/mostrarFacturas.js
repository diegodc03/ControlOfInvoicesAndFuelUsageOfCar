import React, { useEffect, useState } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import '../src/css/mostrarFacturas.css';

const API_URL = 'http://localhost:5000/facturas';


const ShowBills = () => {

    const [facturas, setFacturas] = useState([]);
    const [selectedFactura, setSelectedFactura] = useState(null);


    useEffect(() => {
        const fetchBills = async () => {
          try {
            const response = await axios.get(`${API_URL}/get-all`);
            setFacturas(response.data);
          } catch (error) {
            console.error('Error al obtener las facturas', error);
          }
        };
        fetchBills();
      }, []);


    const handleDownloadPDF = (factura) => {
        const doc = new jsPDF();

        // Añadir información de la factura
        doc.text(`Fecha: ${factura.date}`, 10, 10);
        doc.text(`Importe: ${factura.cost}`, 10, 20);
        doc.text(`Kilómetros: ${factura.km}`, 10, 30);

        // Añadir imagen
        const img = new Image();
        var element = `${API_URL}/billuploads/${selectedFactura.fileName}`;
        img.src = element;
        img.onload = () => {
            doc.addImage(img, 'JPEG', 10, 40, 150, 100); // Ajustar tamaño y posición
            doc.save(`factura_${factura.date}.pdf`);
        };
    };

    const handleDelete = async (factura) => {
        try {
            await axios.delete(`${API_URL}/delete/${factura._id}`);
            const response = await axios.get(`${API_URL}/get-all`);
            setFacturas(response.data);
        } catch (error) {
            console.error('Error al eliminar la factura:', error);
        }
    }

    return (
        <div className='general'>
            <h2>Facturas</h2>
            <div className='container'>
                <div className='show-general-bill'> 
                    {facturas.map((factura) => (
                        
                        <div key={factura._id} className='bill-card'>
                            <p>Nombre: {factura.fileName}</p>
                            <p>Fecha: {factura.date}</p>
                            <p>Importe: {factura.cost}</p>
                            <p>kilometros: {factura.km} </p>
                            <div>
                                <img 
                                    src={`${API_URL}/billuploads/${factura.fileName}`}
                                    alt="Factura" 
                                    style={{ width: '100px' , borderRadius: '8px' }} 
                                    onClick={() => setSelectedFactura(factura)}
                                    />
                            </div>
                            <button onClick={() => handleDelete(factura)} className='delete-button'>Eliminar</button>
                            {/*
                            <button className='download-button'>descargar factura</button>*/}
                        </div>
                    ))}
                </div>
            </div>

            {/* Modal para ampliar la imagen */}
            {selectedFactura && (
                <div className="modal" onClick={() => setSelectedFactura(null)}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <img
                            src={`${API_URL}/billuploads/${selectedFactura.fileName}`}
                            alt="Factura ampliada"
                            style={{ width: '100%', borderRadius: '8px' }}
                        />
                        <button onClick={() => handleDownloadPDF(selectedFactura)}>
                            Descargar como PDF
                        </button>
                    </div>
                </div>
            )}
        </div>
     
    );



}

export default ShowBills;