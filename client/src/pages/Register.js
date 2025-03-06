import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

function Register() {
  const navigate = useNavigate();
  const [values, setValues] = useState({
    firstName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  
  // Password strength checker
  useEffect(() => {
    const calculateStrength = (password) => {
      if (!password) return '';
      
      const hasLower = /[a-z]/.test(password);
      const hasUpper = /[A-Z]/.test(password);
      const hasNumber = /[0-9]/.test(password);
      const hasSpecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);
      const length = password.length;
      
      let strength = 0;
      if (hasLower) strength++;
      if (hasUpper) strength++;
      if (hasNumber) strength++;
      if (hasSpecial) strength++;
      if (length >= 8) strength++;
      
      if (strength < 2) return 'weak';
      if (strength < 4) return 'medium';
      return 'strong';
    };
    
    setPasswordStrength(calculateStrength(values.password));
  }, [values.password]);
  
  // Client-side validation
  const validate = () => {
    const newErrors = {};
    
    if (!values.firstName) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!values.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!values.password) {
      newErrors.password = 'Password is required';
    } else if (values.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (values.password !== values.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    if (!agreeToTerms) {
      newErrors.terms = 'You must agree to the terms';
    }
    
    return newErrors;
  };

  const generateError = (error) => {
    toast.error(error, {
      position: 'bottom-right',
      autoClose: 3000
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const formErrors = validate();
    setErrors(formErrors);
    
    // If no errors, submit form
    if (Object.keys(formErrors).length === 0) {
      setIsSubmitting(true);
      try {
        const { data } = await axios.post(
          'http://localhost:4000/api/register',
          {
            firstName: values.firstName,
            email: values.email,
            password: values.password
          },
          { withCredentials: true }
        );
        
        setIsSubmitting(false);
        
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
        } else {
          toast.success('Registration successful!', {
            position: 'bottom-right',
            autoClose: 1500,
            onClose: () => navigate('/')
          });
        }
      } catch (error) {
        setIsSubmitting(false);
        console.log(error);
        generateError('Something went wrong. Please try again.');
      }
    }
  };

  // Get strength color
  const getStrengthColor = () => {
    if (passwordStrength === 'weak') return '#FF3B30';
    if (passwordStrength === 'medium') return '#FFCC00';
    if (passwordStrength === 'strong') return '#34C759';
    return '#ccc';
  };

  return React.createElement(
    React.Fragment,
    null,
    React.createElement(
      'div',
      { className: 'container' },
      React.createElement('h2', null, 'Create Your Account'),
      React.createElement(
        'form',
        { onSubmit: handleSubmit },
        
        // First Name Input (add this new field)
        React.createElement(
          'div',
          { className: errors.firstName ? 'form-group error' : 'form-group' },
          React.createElement('label', { htmlFor: 'firstName' }, 'First Name'),
          React.createElement('input', {
            type: 'text',
            name: 'firstName',
            placeholder: 'Enter your first name',
            value: values.firstName,
            onChange: (e) => setValues({...values, [e.target.name]: e.target.value})
          }),
          errors.firstName && React.createElement('small', { className: 'error-text' }, errors.firstName)
        ),
        
        // Email Input
        React.createElement(
          'div',
          { className: errors.email ? 'form-group error' : 'form-group' },
          React.createElement('label', { htmlFor: 'email' }, 'Email'),
          React.createElement('input', {
            type: 'email',
            name: 'email',
            placeholder: 'Enter your email',
            value: values.email,
            onChange: (e) => setValues({...values, [e.target.name]: e.target.value})
          }),
          errors.email && React.createElement('small', { className: 'error-text' }, errors.email)
        ),
        
        // Password Input
        React.createElement(
          'div',
          { className: errors.password ? 'form-group error' : 'form-group' },
          React.createElement('label', { htmlFor: 'password' }, 'Password'),
          React.createElement('input', {
            type: 'password',
            name: 'password',
            placeholder: 'Create a password',
            value: values.password,
            onChange: (e) => setValues({...values, [e.target.name]: e.target.value})
          }),
          values.password && React.createElement(
            'div',
            { className: 'password-strength' },
            React.createElement('span', null, 'Strength: '),
            React.createElement(
              'span',
              { style: { color: getStrengthColor() } },
              passwordStrength.charAt(0).toUpperCase() + passwordStrength.slice(1)
            )
          ),
          errors.password && React.createElement('small', { className: 'error-text' }, errors.password)
        ),
        
        // Confirm Password Input
        React.createElement(
          'div',
          { className: errors.confirmPassword ? 'form-group error' : 'form-group' },
          React.createElement('label', { htmlFor: 'confirmPassword' }, 'Confirm Password'),
          React.createElement('input', {
            type: 'password',
            name: 'confirmPassword',
            placeholder: 'Re-enter your password',
            value: values.confirmPassword,
            onChange: (e) => setValues({...values, [e.target.name]: e.target.value})
          }),
          errors.confirmPassword && React.createElement('small', { className: 'error-text' }, errors.confirmPassword)
        ),
        
        // Terms & Conditions
        React.createElement(
          'div',
          { className: 'form-check' },
          React.createElement('input', {
            type: 'checkbox',
            id: 'terms',
            checked: agreeToTerms,
            onChange: () => setAgreeToTerms(!agreeToTerms)
          }),
          React.createElement('label', { htmlFor: 'terms' }, 'I agree to the Terms and Privacy Policy'),
          errors.terms && React.createElement('small', { className: 'error-text block' }, errors.terms)
        ),
        
        // Submit Button
        React.createElement('button', 
          { 
            type: 'submit',
            disabled: isSubmitting,
            className: isSubmitting ? 'btn-loading' : ''
          }, 
          isSubmitting ? 'Registering...' : 'Register'
        ),
        
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
