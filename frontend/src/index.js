import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
//BROWSER ROUTER PARA ENVOLVER LA APLICACION
import { BrowserRouter } from "react-router-dom";
import { LoaderProvider } from "./contexts/LoaderProvider";
import { LoginProvider } from "./contexts/LoginProvider";
// IMPORTACION DE BOOTSTRAP
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <LoginProvider>
      <LoaderProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LoaderProvider>
    </LoginProvider>
  </>
);
