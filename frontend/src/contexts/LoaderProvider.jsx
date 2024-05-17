import React, { createContext, useState } from "react";

//crear contexto
const LoaderContext = createContext();

const initialLoader = false;
//crear proveedor
//devolver componente
const LoaderProvider = ({ children }) => {
  const [loader, setLoader] = useState(false);

  //funciones para mostrar y ocultar el loader
  const mostrarLoader = () => {
    setLoader(true);
  };

  const ocultarLoader = () => {
    setLoader(false);
  };

  //data que se le va a pasar a los hijos
  const data = { loader, mostrarLoader, ocultarLoader };
  return (
    <LoaderContext.Provider value={data}>{children}</LoaderContext.Provider>
  );
};

//exportar el proveedor
export { LoaderProvider };
export default LoaderContext;
