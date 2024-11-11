import logo from './logo.svg';
import './App.css';

function App() {
  
  const [facturas, setFacturas] = useState([]);
  const [nuevaFactura, setNuevaFactura] = useState({
    carId: '',
    date: '',
    import: '',
    photoId: null,
  });



  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNuevaFactura({ ...nuevaFactura, [name]: value });
  };

  const handleFileChange = (e) => {
    setNuevaFactura({ ...nuevaFactura, photoId: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('cocheId', nuevaFactura.cocheId);
    formData.append('fecha', nuevaFactura.fecha);
    formData.append('importe', nuevaFactura.importe);
    formData.append('foto', nuevaFactura.photoId);

    try {
      const response = await axios.post('http://localhost:5000/api/facturas', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      setFacturas((prevFacturas) => [...prevFacturas, response.data]);
      setNuevaFactura({ cocheId: '', fecha: '', importe: '', photoId: null });
    } catch (error) {
      console.error('Error al enviar la factura', error);
    }
  };
  
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="cocheId"
        value={nuevaFactura.cocheId}
        onChange={handleInputChange}
        placeholder="ID del Coche"
      />
      <input
        type="text"
        name="fecha"
        value={nuevaFactura.fecha}
        onChange={handleInputChange}
        placeholder="Fecha"
      />
      <input
        type="number"
        name="importe"
        value={nuevaFactura.importe}
        onChange={handleInputChange}
        placeholder="Importe"
      />
      <input type="file" onChange={handleFileChange} />
      <button type="submit">Agregar Factura</button>
    </form>
  );
}

export default App;
