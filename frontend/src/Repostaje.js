import logo from './logo.svg';
import './App.css';
import React, { useState } from 'react';

function ListRepostaje() {
    const [repostajes, setRepostajes] = useState([]);
    const [newRepostaje, setNewRepostaje] = useState({
        carId: '',
        date: '',
        km: '',
        liters: '',
        import: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewRepostaje((prevRepostaje) => ({
            ...prevRepostaje,
            [name]: value,
        }));
    };

    const handleAdd = () => {
        // Crear un nuevo repostaje con un ID temporal (idealmente generado en backend)
        const newEntry = { ...newRepostaje, _id: Date.now().toString() };
        setRepostajes([...repostajes, newEntry]);

        // Limpiar el formulario después de añadir
        setNewRepostaje({
            carId: '',
            date: '',
            km: '',
            liters: '',
            import: '',
        });
    };

    const handleDelete = (id) => {
        setRepostajes(repostajes.filter((repostaje) => repostaje._id !== id));
    };

    return (
        <div>
            <h1>Lista de Repostajes</h1>
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
