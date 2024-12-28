import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../src/css/bill.css';

import API_URLS from './routesBackend';


    
const AddCarBill = () => {

    const [isClicked, setIsClicked] = useState(false);
    
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState('');   
    const [cost, setCost] = useState('');
    const [date, setDate] = useState('');
    const [km, setKm] = useState('');


    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validar y ajustar el nombre del archivo
        const adjustedFileName = changeFileName(fileName);
        setFileName(adjustedFileName);

        if (!file || !file.name.match(/\.(jpg|jpeg|png)$/) ) {
            console.error('No hay archivo seleccionado');
            alert('Por favor, selecciona un archivo antes de enviar.');
            return;
        }

        if (!cost || !date || !fileName || !km) {
            console.error('No hay informacion referente a la factura');
            alert('Por favor, inroduzca informacion referente a la factura.');
            return;
        }

        console.log('filename:', fileName);

        const formData = new FormData();
        formData.append('file', file);
        formData.append('cost', cost);
        formData.append('date', date);
        formData.append('km', km);
        formData.append('fileName', adjustedFileName);


        
        try {
            const response = await axios.post(`${API_URLS.facturas}/uploadBill`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log('Respuesta del servidor:', response.data);

            alert('Archivo subido correctamente');

            // Volver a cargar la página para mostrar la nueva factura
            window.location.reload();

        } catch (error) {
            console.error('Error al subir el archivo:', error);
            alert('Error al subir el archivo. Por favor, intenta de nuevo. unicamente se puede JPG, PNG, JPEG');
        }
    };

    
    const changeFileName = (e) => {
        console.log(e);
        let name = e;

        const validExtensions = ['jpg', 'jpeg', 'png'];
        const hadValidExtension = validExtensions.some((ext) => name.toLowerCase().endsWith(`.${ext}`));

        if (!hadValidExtension) {
            name += '.jpg';
        }
        return name;
    }

    const handleClick = () => {
        setIsClicked(!isClicked);
    }

    return (
        <div>
            <div className='general-info'>

                <input type="checkbox" id={'toggle'} className="toggle-bill-add-details" />
                
                <div className='general-info-tittle'>
                    <h2>Añadir Factura</h2>
                    <label htmlFor="toggle" className="toggle-bill-add" onClick={handleClick} >
                        {!isClicked ? 'Agregar Factura' : 'Cerrar'}    
                    </label>
                </div>
                


                <div className = "add-bill-details">
                    <form onSubmit={handleSubmit}>
    
                        <div className='add-bill-details-information-bill'>
                            <input className='element-bill-add' type="text" placeholder="Nombre del archivo" value={fileName} onChange={(e) => setFileName(e.target.value)}/>
                            <input className='element-bill-add' type="number" placeholder="Coste" value={cost} onChange={(e) => setCost(e.target.value)}/>
                            <input className='element-bill-add' type="number" placeholder="Kilometraje" value={km} onChange={(e) => setKm(e.target.value)}/>
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



export default AddCarBill;