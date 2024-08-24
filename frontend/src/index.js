import React from "react";
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Test from "./components/test";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Test/>,
  },
]);

const root = createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);
