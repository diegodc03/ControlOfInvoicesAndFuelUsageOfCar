import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../src/css/bill.css';

const API_URL = 'http://localhost:5000/facturas';

const FileUpload = () => {


    
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');   
    const [cost, setCost] = useState('');
    const [date, setDate] = useState('');


    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!file || !file.name.match(/\.(jpg|jpeg|png)$/) ) {
            console.error('No hay archivo seleccionado');
            alert('Por favor, selecciona un archivo antes de enviar.');
            return;
        }

        if (!cost || !date || !fileName) {
            console.error('No hay informacion referente a la factura');
            alert('Por favor, inroduzca informacion referente a la factura.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('cost', cost);
        formData.append('date', date);
        formData.append('fileName', fileName);


        
        try {
            const response = await axios.post(`${API_URL}/uploadBill`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Respuesta del servidor:', response.data);
        } catch (error) {
            console.error('Error al subir el archivo:', error);
            alert('Error al subir el archivo. Por favor, intenta de nuevo. unicamente se puede JPG, PNG, JPEG');
        }
    };

    
    return (
        <div>
            <div className='general-info'>

                <input type="checkbox" id={'toggle'} className="toggle-bill-add-details" />
                
                <h2>Añadir Factura</h2>
                <label htmlFor="toggle" className="toggle-bill-add">CLICK AQUÍ</label>


                <div class = "add-bill-details">
                    <form onSubmit={handleSubmit}>

                        <div className='add-bill-details-information-bill'>
                            <input className='element-bill-add' type="text" placeholder="Nombre del archivo" value={fileName} onChange={(e) => setFileName(e.target.value)}/>
                            <input className='element-bill-add' type="number" placeholder="Coste" value={cost} onChange={(e) => setCost(e.target.value)}/>
                            <input className='element-bill-add' type="date" value={date} onChange={(e) => setDate(e.target.value)}/>
                        </div>
                        
                        <div className='add-bill-details-element-bill-add'>
                            <div className='select-bill-element'>
                                <label htmlFor="file">Selecciona un archivo:</label>
                                <input  type="file" onChange={handleFileChange} />
                            </div>

                            <button  type="submit">Enviar</button>
                        </div>
                        
                    </form>
                </div>
            </div>
            
            
            
            
        </div>
    );

}



export default FileUpload;