import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { makeStyles } from '@mui/styles';

import './SignUpStyle.css';

const SignUp = () => {
  

  



  return (
    <div className="container-signup">
      <div className="avatar">🔒</div>
      <h1 className="title">Sign Up</h1>
      <form>
        <div className="row">
          <div>
            <label for="firstName">First Name</label>
            <input type="text" id="firstName" name="firstName" placeholder="First Name" required></input>
          </div>
          <div>
            <label for="lastName">Last Name</label>
            <input type="text" id="lastName" name="lastName" placeholder="Last Name" required></input>
          </div>
        </div>
        <div>
          <label for="email">Email Address</label>
          <input type="email" id="email" name="email" placeholder="Email Address" required></input>
        </div>
        <div>
          <label for="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Password" required></input>
        </div>
        <div class="checkbox-group">
          <input type="checkbox" id="allowExtraEmails" name="allowExtraEmails"></input>
          <label for="allowExtraEmails">I want to receive inspiration, marketing promotions and updates via email.</label>
        </div>
        <button type="submit" class="submit-button">Sign Up</button>
      </form>
      <div class="footer">
        <p>Already have an account? <a href="/login">Sign in</a></p>
      </div>
    </div>
  );

}

export default SignUp;
