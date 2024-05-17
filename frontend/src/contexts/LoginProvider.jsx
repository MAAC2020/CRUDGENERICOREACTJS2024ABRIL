import React, { createContext, useState } from "react";

//crear contexto
const LoginContext = createContext();

//crear proveedor
//devolver componente
const LoginProvider = ({ children }) => {
  //arreglo del usuario logueado
  const [user, setUser] = useState(null);

  //@param {Array} es el arreglo del usuario logueado
  const login = (usuario) => {
    setUser(usuario);
  };

  //funcion para cambiar el estado de cerrar la sesion
  const logout = () => {
    setUser(null);
  };

  const data = { user, login, logout };
  return <LoginContext.Provider value={data}>{children}</LoginContext.Provider>;
};

//exportar el proveedor
export { LoginProvider };
export default LoginContext;
