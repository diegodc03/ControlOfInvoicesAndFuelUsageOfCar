
import './App.css';
import Header from './Header';
import Repostaje from './Repostaje';
import CarBills from './facturasCoche.js';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";


function App() {
 
  return (

      <div className="App">
        <Header />
        <section className="section">
          <Routes>
            {/* Ruta predeterminada para mostrar Repostaje */}
            <Route path="/" element={<Repostaje />} />

            {/* Otras rutas */}
            <Route path="/repostaje" element={<Repostaje />} />
            <Route path="/facturas" element={<CarBills />} />

            {/* Ruta para manejar URLs inexistentes (opcional) */}
            <Route path="*" element={<Repostaje />} />
          </Routes>
        </section>
      </div>

  );
}

export default App;
