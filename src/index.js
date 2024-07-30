import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {createBrowserRouter, RouterProvider, Router } from "react-router-dom";
import { Login } from './pages/Login';
import { Detailed } from './pages/Detailed';
import { ResetPassword } from './pages/ResetPassword';
import { AuthProvider } from './context/AuthContext';

const router = createBrowserRouter([{
  path: "/",
  element: <App/>,
},
{
  path: "/login",
  element: <Login/>,
},
{
  path: "/detailed",
  element: <Detailed/>,
},
{
  path: "/reset_password/:token",
  element: <ResetPassword/>,
},

]);


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
  <RouterProvider router={router}>
    
      <Router>{router}</Router>
    
  </RouterProvider></AuthProvider>
);
