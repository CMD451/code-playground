import React from "react";
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import App from "./components/App";

import "./styles/root.css"

const router = createBrowserRouter([
  {
    path: '/',
    element: <App lang='python' />,  
  },

  {
    path: '/python',
    element: <App lang='python' />,
  },

  {
    path: '/c',
    element: <App lang='c' />,
  }
]);



const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
