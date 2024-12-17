import React from 'react'

import Contacts, {loader as pageLoader} from './Contacts/Contacts.jsx';
import Start from './Start/Start.jsx';
import ErrorPage from "./ErrorPage/ErrorPage.jsx";

import "./main.css";

import ReactDOM from 'react-dom/client';
import { 
  createBrowserRouter, 
  RouterProvider 
} from 'react-router-dom'

const router = createBrowserRouter([
  {
      path: '/',
      element: <Start />,
      errorElement: <ErrorPage />,
      loader: pageLoader,
      children: [
        {
          path: '/contacts/:id',
          element: <Contacts />,
          loader: pageLoader
        }
      ]
  },
])

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)

