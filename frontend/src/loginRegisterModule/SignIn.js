import React, { useState } from 'react';
import axios from 'axios';
import API_URLS from '../routesBackend'
import './SignInStyle.css';

const SignIn = () => {

  const [loginUser, setLoginUser] = useState({
      email: "",
      password: "",
    });

  
  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginUser((prevUser) => ({
        ...prevUser,
        [name]: value,
    }));
  };



  const handleAdd = async () => {
  // Validar datos antes de enviar
    if(loginUser.email === '' || loginUser.password === '' ){
      console.error('Todos los campos son obligatorios.');
      alert('Por favor, completa todos los campos antes de agregar.');
      return;
    }
    try {
      console.log('Añadiendo repostaje:');
      console.log('Nuevo repostaje:', loginUser);
      // Enviar datos al servidor
      const response = await axios.post(API_URLS.userLogin, loginUser);
  
      // Mostrar retroalimentación al usuario
      alert('User añadido correctamente.', response.data);
        
      setLoginUser({
        email: "",
        password: "",
      });
  
        } catch (error) {
            console.error('Error al agregar el repostaje:', error);
  
            // Retroalimentación en caso de error
            alert('Hubo un error al intentar agregar el repostaje. Inténtalo de nuevo.');
        }
    };



  return (
    <div className="container-SignIn">
      <div className="paper">
        <div className="avatar">
          <span role="img" aria-label="lock">
            🔒
          </span>
        </div>
        <h1 className="title">Sign In</h1>
        <form onSubmit={(e) => e.preventDefault()} className='form'>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="xxxxx@xxxx.xxxx"
              required
              className="form-input"
              value={loginUser.email}
              onChange={handleChange}>
            </input>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="xxxxxxxxx"
              required
              className="form-input"
              value={loginUser.password}
              onChange={handleChange}>
            </input>
          </div>
          
          <button type="submit" className="submit-button" onClick={handleAdd}>
            Sign In
          </button>
          <div className="links-container">
            <a href="/register" className="link">
              Don't have an account? Sign Up
            </a>
          </div>
        </form>
      </div>
      <footer className="footer">
        <p>© 2024 Your Company. All rights reserved.</p>
      </footer>
    </div>
  );
}


export default SignIn;

