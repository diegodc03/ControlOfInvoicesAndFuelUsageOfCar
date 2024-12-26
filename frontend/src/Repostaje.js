import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../src/css/header.css';
import '../src/css/repostaje.css';

function ListRepostaje() {
    const [repostajes, setRepostajes] = useState([]);
    const [newRepostaje, setNewRepostaje] = useState({
        carId: '',
        date: '',
        km: '',
        liters: '',
        import: '',
    });

    const [isClicked, setIsClicked] = useState(false);

    const API_URL = 'http://localhost:5000/facturas/repostajes'; // Cambia esto por la URL de tu API

    // Obtener repostajes al cargar el componente
    useEffect(() => {
        const fetchRepostajes = async () => {
            try {
                const response = await axios.get(API_URL);
                // Ordenar por kilómetros en orden descendente
                const sortedRepostajes = response.data.sort((a, b) => b.km - a.km);
                setRepostajes(sortedRepostajes);
            } catch (error) {
                console.error('Error al obtener los repostajes:', error);
            }
        };
        fetchRepostajes();
    }, []);

    // Manejar cambios en los campos del formulario
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewRepostaje((prevRepostaje) => ({
            ...prevRepostaje,
            [name]: value,
        }));
    };

        // Agregar un repostaje
    const handleAdd = async () => {
        // Validar datos antes de enviar
        if (!newRepostaje.carId || !newRepostaje.date || !newRepostaje.km || !newRepostaje.liters || !newRepostaje.import) {
            console.error('Todos los campos son obligatorios.');
            alert('Por favor, completa todos los campos antes de agregar.');
            return;
        }

        // Comprobar los datos si se añaden correctamente
        if(repostajes.length > 0){
            // Ordenar los repostajes por fecha (aseguramos que estén correctamente ordenados)
            const sortedRepostajes = [...repostajes].sort((a, b) => new Date(b.date) - new Date(a.date));
        }

        // Hay que encontrar el repostaje anterior al nuevo repostaje
        // Es decir, el que tenga el menor mayor número de kilómetros despues del nuevo repostaje
        const repostajeAnterior = repostajes.find((repostaje) => repostaje.km < newRepostaje.km);
        
        if(repostajeAnterior){
            // Se tiene que calcular que la fecha del repostaje nuevo sea mayor a la fecha del repostaje anterior y menor a la fecha actual
            const fechaActual = new Date();
            const fechaAnterior = new Date(repostajeAnterior.date);

            //Quiero encontrar el indice del repostaje posterior si hay alguno
            const index = repostajes.findIndex((repostaje) => repostaje.km > newRepostaje.km);
            if(index > 0){
                const repostajePosterior = repostajes[index];
                const fechaPosterior = new Date(repostajePosterior.date);

                if(fechaAnterior < new Date(newRepostaje.date) && new Date(newRepostaje.date) < fechaActual && fechaActual > fechaPosterior){
                    console.log('Fecha correcta');
                }else{
                    console.error('La fecha del repostaje no es correcta');
                    alert('La fecha del repostaje no es correcta');
                    return;
                }
                
                if(repostajeAnterior.km < newRepostaje.km && newRepostaje.km < repostajePosterior.km){
                    console.log('Kilometraje correcto');
                }else{
                    console.error('El kilometraje del repostaje no es correcto');
                    alert('El kilometraje del repostaje no es correcto');
                    return;
                }
            }   
        }

        try {
            console.log('Añadiendo repostaje:');
            console.log('Nuevo repostaje:', newRepostaje);
            // Enviar datos al servidor
            const response = await axios.post(API_URL, newRepostaje);

            // Agregar el nuevo repostaje a la lista local
            setRepostajes([...repostajes, response.data]);

            // Mostrar retroalimentación al usuario
            alert('Repostaje añadido correctamente.');


            // Limpiar el formulario después de añadir
            setNewRepostaje({
                carId: '',
                date: '',
                km: '',
                liters: '',
                import: '',
            });
        } catch (error) {
            console.error('Error al agregar el repostaje:', error);

            // Retroalimentación en caso de error
            alert('Hubo un error al intentar agregar el repostaje. Inténtalo de nuevo.');
        }
    };


    // Eliminar un repostaje
    const handleDelete = async (id) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setRepostajes(repostajes.filter((repostaje) => repostaje._id !== id));
            alert('Repostaje eliminado correctamente');

            // Si se elimina un repostaje, se debe reiniciar pagina
            window.location.reload();
        } catch (error) {
            console.error('Error al eliminar el repostaje:', error);
        }
    };


    const handleRepostajeIsClicked = () => {
        setIsClicked(!isClicked);
    }

    return (
        <div class="divisionPart">
            
      
                <input type="checkbox" id="toggle-add-repostaje" className="toggle-add-repostaje movil-format-checkbox" />
                <label htmlFor="toggle-add-repostaje" className="add-repostaje-btn movil-format" onClick={handleRepostajeIsClicked}>
                    <h2>
                        {!isClicked ? 'Añadir Repostaje' : 'Ocultar'}   
                    </h2>
                </label>

            


            <div  class="repostajesList">
                <h2 >Repostajes Añadidos</h2>
                <ul>
                    {repostajes.map((repostaje) => (
                        <li key={repostaje._id} className="repostaje-item">
                        {/* Checkbox para manejar el toggle */}
                        <input type="checkbox" id={`toggle-${repostaje._id}`} className="toggle-details" />

                        <label htmlFor={`toggle-${repostaje._id}`} className="general-info">
                            <div>Fecha: {repostaje.date}</div> 
                            <div>Kilómetros: {repostaje.km}</div>
                            <button onClick={() => handleDelete(repostaje._id)}>Borrar</button>
                        </label>

                        {/* Contenido que se mostrará/ocultará */}
                        <div className="detalles">
                            <div ><strong>Coche:</strong> {repostaje.carId}</div>
                            <div ><strong>Litros:</strong> {repostaje.liters}</div>
                            <div ><strong>Importe:</strong> {repostaje.import}</div>
                        </div>
                        </li>
                    ))}
                </ul>
            </div>
            

            <div class="verticalDivider"></div>

            <div class="addRepostaje">
                <h2>Añadir Repostaje</h2>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div className= "inputRepostaje">
                        <label>
                            Coche:
                            <input
                                type="text"
                                name="carId"
                                value={newRepostaje.carId}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Fecha:
                            <input
                                type="date"
                                name="date"
                                value={newRepostaje.date}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Kilómetros:
                            <input
                                type="number"
                                name="km"
                                value={newRepostaje.km}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Litros:
                            <input
                                type="number"
                                name="liters"
                                value={newRepostaje.liters}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            Importe:
                            <input
                                type="number"
                                name="import"
                                value={newRepostaje.import}
                                onChange={handleChange}
                            />
                        </label>
                    
                    </div>
                    <button class="btnRepostaje" onClick={handleAdd}>Añadir Repostaje</button>
                </form>
            </div>
            
        </div>
    );
}

export default ListRepostaje;
