import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../src/css/header.css';

function ListRepostaje() {
    const [repostajes, setRepostajes] = useState([]);
    const [newRepostaje, setNewRepostaje] = useState({
        carId: '',
        date: '',
        km: '',
        liters: '',
        import: '',
    });

    const API_URL = 'http://localhost:5000/facturas/repostajes'; // Cambia esto por la URL de tu API

    // Obtener repostajes al cargar el componente
    useEffect(() => {
        const fetchRepostajes = async () => {
            try {
                const response = await axios.get(API_URL);
                setRepostajes(response.data);
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

    try {
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
        } catch (error) {
            console.error('Error al eliminar el repostaje:', error);
        }
    };

    return (
        <div>
            <ul>
                {repostajes.map((repostaje) => (
                    <li key={repostaje._id}>
                        <p>Coche: {repostaje.carId}</p>
                        <p>Fecha: {repostaje.date}</p>
                        <p>Kilómetros: {repostaje.km}</p>
                        <p>Litros: {repostaje.liters}</p>
                        <p>Importe: {repostaje.import}</p>
                        <button onClick={() => handleDelete(repostaje._id)}>Borrar</button>
                    </li>
                ))}
            </ul>

            <h2>Añadir Repostaje</h2>
            <form onSubmit={(e) => e.preventDefault()}>
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
                <button onClick={handleAdd}>Añadir Repostaje</button>
            </form>
        </div>
    );
}

export default ListRepostaje;
