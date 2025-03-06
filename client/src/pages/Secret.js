import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

function Secret() {
  const navigate = useNavigate();
  const [cookies, , removeCookie] = useCookies([]);
  const [userEmail, setUserEmail] = useState("");
  const lastLogin = new Date().toLocaleString();
  // Add a ref to track if toast has been shown
  const toastShown = useRef(false);

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate('/login');
      } else {
        try {
          const { data } = await axios.get(
            'http://localhost:4000/api/',
            { withCredentials: true }
          );
          
          if (!data.status) {
            removeCookie('jwt');
            navigate('/login');
          } else {
            setUserEmail(data.user);
            // Only show toast if it hasn't been shown yet
            if (!toastShown.current) {
              toast.success(`Welcome back, ${data.user}`, {
                theme: 'dark'
              });
              toastShown.current = true;
            }
          }
        } catch (error) {
          console.log(error);
          removeCookie('jwt');
          navigate('/login');
        }
      }
    };
    
    verifyUser();
  }, [cookies, navigate, removeCookie]);

  const logout = () => {
    removeCookie('jwt');
    navigate('/login');
  };

  return React.createElement(
    'div',
    { className: 'private' },
    React.createElement('h1', null, 'Welcome to Your Dashboard'),
    React.createElement('div', { className: 'user-info' },
      React.createElement('h3', null, 'User Profile'),
      React.createElement('p', null, 
        React.createElement('strong', null, 'Email: '), 
        userEmail
      ),
      React.createElement('p', null, 
        React.createElement('strong', null, 'Last Login: '), 
        lastLogin
      ),
      React.createElement('p', null,
        React.createElement('strong', null, 'Account Status: '),
        'Active'
      )
    ),
    React.createElement('button', { onClick: logout }, 'Log Out'),
    React.createElement(ToastContainer, { 
      limit: 1, // Limit to 1 toast at a time
      autoClose: 3000 // Close after 3 seconds
    })
  );
}

export default Secret;
