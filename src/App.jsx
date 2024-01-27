import React from 'react';
import './App.css';
import Gallery from './pages/gallery';
import Index from './pages/Index';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/Root';
import { useLocation } from 'react-router-dom';
import Modal from './components/Modal';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      { index: true, element: <Index /> },
      {
        path: '/gallery',
        element: <Gallery />,
        children: [
          {
            path: ':id',
            loader: () => {
              console.log('data');
              return 'data';
            },
            element: <Modal />,
          },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <React.StrictMode>
      <RouterProvider router={router} />
    </React.StrictMode>
  );
}

export default App;
