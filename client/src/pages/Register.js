import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    email: '',
    password: ''
  });

  const generateError = (error) => {
    toast.error(error, {
      position: 'bottom-right'
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        'http://localhost:4000/api/register',
        values,
        { withCredentials: true }
      );
      
      if (data.errors) {
        const { email, password } = data.errors;
        if (email) generateError(email);
        else if (password) generateError(password);
      } else {
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      'div',
      { className: 'container' },
      React.createElement('h2', null, 'Register Account'),
      React.createElement(
        'form',
        { onSubmit: handleSubmit },
        React.createElement(
          'div',
          null,
          React.createElement('label', { htmlFor: 'email' }, 'Email'),
          React.createElement('input', {
            type: 'email',
            name: 'email',
            placeholder: 'Email',
            onChange: (e) => setValues({...values, [e.target.name]: e.target.value})
          })
        ),
        React.createElement(
          'div',
          null,
          React.createElement('label', { htmlFor: 'password' }, 'Password'),
          React.createElement('input', {
            type: 'password',
            name: 'password',
            placeholder: 'Password',
            onChange: (e) => setValues({...values, [e.target.name]: e.target.value})
          })
        ),
        React.createElement('button', { type: 'submit' }, 'Submit'),
        React.createElement(
          'span',
          null,
          'Already have an account? ',
          React.createElement(Link, { to: '/login' }, 'Login')
        )
      )
    ),
    React.createElement(ToastContainer)
  );
}

export default Register;
