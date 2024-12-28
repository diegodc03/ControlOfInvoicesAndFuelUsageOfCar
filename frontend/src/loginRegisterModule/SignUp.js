import React, { useState, useEffect } from 'react';
import axios from 'axios';
import API_URLS from '../routesBackend';
import './SignUpStyle.css';


const SignUp = () => {

  const [newUser, setNewUser] = useState({
    email: "",
    password: "",
    name: "",
    second_name: "",
  });


  // Manejar cambios en los campos del formulario
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevUser) => ({
        ...prevUser,
        [name]: value,
    }));
  };


  // Agregar un repostaje
  const handleAdd = async () => {
  // Validar datos antes de enviar
  if(newUser.email === '' || newUser.password === '' || newUser.name === '' || newUser.second_name === ''){
    console.error('Todos los campos son obligatorios.');
    alert('Por favor, completa todos los campos antes de agregar.');
    return;
  }

  try {
    console.log('Añadiendo repostaje:');
    console.log('Nuevo repostaje:', newUser);
    // Enviar datos al servidor
    const response = await axios.post(API_URLS.userSignUp, newUser);

    // Mostrar retroalimentación al usuario
    alert('User añadido correctamente.');

    
    setNewUser({
      email: "",
      password: "",
      name: "",
      second_name: "",
    });

      } catch (error) {
          console.error('Error al agregar el repostaje:', error);

          // Retroalimentación en caso de error
          alert('Hubo un error al intentar agregar el repostaje. Inténtalo de nuevo.');
      }
  };


    

  return (
    <div className="container-signup">
      <div className="avatar">🔒</div>
      <h1 className="title">Sign Up</h1>
      <form onSubmit={(e) => e.preventDefault()}>
        <div className="row">
          <div>
            <label for="name">First Name</label>
            <input type="text" 
                    id="name"
                    name="name" 
                    placeholder="ej: Diego" 
                    required 
                    value={newUser.name}
                    onChange={handleChange}></input>
          </div>
          <div>
            <label for="second_name">Last Name</label>
            <input type="text" 
                    id="second_name" 
                    name="second_name" 
                    placeholder="de Castro" required
                    value={newUser.second_name}
                    onChange={handleChange}></input>
          </div>
        </div>
        <div>
          <label for="email">Email Address</label>
          <input type="email" 
                  id="email" 
                  name="email" 
                  placeholder="Email Address" required
                  value={newUser.email}
                  onChange={handleChange}></input>
        </div>
        <div>
          <label for="password">Password</label>
          <input type="password" 
                  id="password" 
                  name="password" 
                  placeholder="Password" required
                  value={newUser.password}
                  onChange={handleChange}></input>
        </div>
        <button type="submit" class="submit-button" onClick={handleAdd}>Sign Up</button>
      </form>
      <div class="footer">
        <p>Already have an account? <a href="/login">Sign in</a></p>
      </div>
    </div>
  );

}

export default SignUp;
