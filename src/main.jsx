import React from 'react';
import ReactDOM from 'react-dom/client';
import Play from './views/Play';
import App from './views/App';

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";

const router = createBrowserRouter([
  { path: "spelling-bee-ducks/", element: <App /> },
  { path: "spelling-bee-ducks/play", element: <Play /> },
  ]
);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);