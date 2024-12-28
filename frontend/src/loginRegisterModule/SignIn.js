
import React from 'react';
import './SignInStyle.css';

const SignIn = () => {


  



  return (
    <div className="container-SignIn">
      <div className="paper">
        <div className="avatar">
          <span role="img" aria-label="lock">
            🔒
          </span>
        </div>
        <h1 className="title">Sign In</h1>
        <form className="form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email Address"
              required
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Password"
              required
              className="form-input"
            />
          </div>
          <div className="form-group checkbox-group">
            <input
              type="checkbox"
              id="remember"
              name="remember"
              className="checkbox"
            />
            <label htmlFor="remember">Remember me</label>
          </div>
          <button type="submit" className="submit-button">
            Sign In
          </button>
          <div className="links-container">
            <a href="#" className="link">
              Forgot password?
            </a>
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

