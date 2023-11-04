import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// const router = createBrowserRouter([{
//   path: "LoginSignUp",
//   element: <LoginSignUp/>,
// },
// ]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
);
