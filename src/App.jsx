import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Gallery from './pages/Gallery';
import Index from './pages/Index';
import Root from './pages/Root';
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
