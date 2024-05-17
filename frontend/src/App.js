import React, { useContext } from "react";
import Footer from "./components/Footer/Footer";
import MenuLateral from "./components/MenuLateral/MenuLateral";
//importacion de Routes
import { Route, Routes } from "react-router-dom";
import Loader from "./components/loader/Loader";
import LoaderContext from "./contexts/LoaderProvider";
import LoginContext from "./contexts/LoginProvider";
import LoginView from "./views/Login/LoginView";
import UsuarioView from "./views/Usuario/UsuarioView";
import ConsultarUsuarioView from "./views/Usuario/ConsultarUsuarioView";

const App = () => {
  //contextoGlobal del loader
  const { loader } = useContext(LoaderContext);
  //contexto global del usuario logueado
  const { user } = useContext(LoginContext);

  console.log("USER", user);

  return (
    <>
      {/* si se loguea muestra el menu lateral con las opciones se envuelve toda la aplicacion con el contexto */}
      <MenuLateral
        estilo={{ backgroundColor: "#038450" }}
        urlLogo="https://raw.githubusercontent.com/ESAGOBOLIVAR/recursos-de-imagenes/logo-bolivar/Capa%202%20(1).png"
      />
      <Routes>
        {/* SI EL USUARIO ES NULO SIGNIFICA QUE NO SE HA LOGUEADO ENTONCES MOSTRAR LA VISTA FORMLOGIN POR DEFECTO */}
        {user == null && <Route path="*" element={<LoginView />} />}

        {/* SI EL USUARIO ESTA LOGUEADO Y EL ROL ES ADMIN MOSTRAR POR DEFECTO LAS SIGUIENTES RUTAS Y DAR PERMISO PARA ACCEDER A ESTAR */}
        {user && user.rol == "admin" && user.estado == "activo" && (
          <>
            <Route path="*" element={<UsuarioView />} />
            <Route path="/usuario" element={<UsuarioView />} />
            <Route
              path="/usuario/consultar"
              element={<ConsultarUsuarioView />}
            />
          </>
        )}
      </Routes>
      <Footer estilo={{ backgroundColor: "#038450" }} />
      {/* SI EL LOADER ES TRUE MOSTRARLO EN CASO CONTRARIO OCULTARLO */}
      {loader && <Loader></Loader>}
    </>
  );
};

export default App;
