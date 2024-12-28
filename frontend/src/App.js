
import './App.css';
import Header from './Header';
import Repostaje from './Repostaje';
import CarBills from './facturasCoche.js';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import SignIn from './loginRegisterModule/SignIn.js';
import SignUp from './loginRegisterModule/SignUp.js';

function App() {
 
  return (
    
      <div className="App">
        <Header />
        <section className="section">
          <Routes>
            {/* Ruta predeterminada para mostrar Repostaje */}
            <Route path="/login" element={<SignIn />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/" element={<SignIn />} />

            {/* Otras rutas */}
            <Route path="/repostaje" element={<Repostaje />} />
            <Route path="/facturas" element={<CarBills />} />

            {/* Ruta para manejar URLs inexistentes (opcional) */}
            <Route path="*" element={<SignIn />} />
          </Routes>
        </section>
      </div>

  );
}

export default App;
