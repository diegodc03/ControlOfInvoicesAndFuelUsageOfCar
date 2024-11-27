
import './App.css';
import Header from './Header';

import Repostaje from './Repostaje';

function App() {
  /*
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
      const response = await axios.post('http://localhost:5000/facturas', formData, {
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
  */
  
  return (

  
    <div className="App">
      <Header/>

      <section>
        <Repostaje />
      </section>
    </div>
  );
}

export default App;
