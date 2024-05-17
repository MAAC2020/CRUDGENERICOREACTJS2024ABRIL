import { useContext } from "react";
//importacion de componentes de bootstap
import Boton from "../Button/Boton";
//importacion de useForm para formularios
import { useForm } from "react-hook-form";
//importacion de la alertas
import sweetAlert from "../../helpers/sweetalert/sweetAlert";
//importacion componente boton
//importacion del contexto del loader
import LoaderContext from "../../contexts/LoaderProvider";
//importacion del contexto del Login
import LoginContext from "../../contexts/LoginProvider";
//importacion de funcion para loguearse
// import api_login from "../../api/api_login";
//importacion de los parametros globales para
// import { parametrosGlobales } from "../../helpers/constantes/constantes";

import api from "../../api/api";

const FormLogin = () => {
  //contextoGlobal del loader
  const { mostrarLoader, ocultarLoader } = useContext(LoaderContext);
  //contexto global del login
  const { login, logout } = useContext(LoginContext);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();
  //funcion cuando se sube el formulario
  const onSubmit = async (datos) => {
    mostrarLoader();

    let data = JSON.stringify(datos);
    //se llama la funcion para insertar a la persona
    //login es el nombre de la funcion
    //@param {Array} data: son los datos en objeto del formulario
    let get = await api("login", data);

    console.log("<<<<<<<<<<GET>>>>>>>");

    //si la respuesta es un arreglo
    //de lo contrario mostrar alerta de error
    //@param {String} icon: es el icono
    //@param {String} title: es el titulo de la alerta
    //@param {String} text: es el texto de la alerta
    get
      ? sweetAlert("success", "Bienvenido!", "Inicio Correcto")
      : sweetAlert(
          "error",
          "Usuario o Contraseña Incorrectos!",
          "Ups lo sentimos hubo un error intenta mas tarde!"
        );
    //pasar al metodo del contexto la respuesta obtenida del login
    //si la respuesta es null, entonces pasar al login un arreglo , en caso contrario pasar el registro del logueo
    get == null ? login(null) : login(get);

    console.log("GEEET", get);

    // console.log(get);
    //se ejecuta la funcion para ocultar el loader
    ocultarLoader();

    // console.log(data);
    //limpiar el formulario
    reset();
  };
  return (
    <>
      {/* FORMULARIO LOGIN */}
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-xs-12 col-sm-12 col-md-5 col-lg-5 col-xl-5 col-xxl-5">
            {/* FORMULARIO */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white p-4 border border-1 rounded-4 mt-5 shadow-lg p-3 mb-5 bg-body rounded"
            >
              <div className="form-group text-center mb-4">
                <h1 className="font-weight-bold">Login</h1>
              </div>
              <div className="row">
                <div className="col-xs-12">
                  <div className="form-group mb-4">
                    <div
                      htmlFor="campo1"
                      className="form-label text-muted fw-bold"
                    >
                      <i className="bi bi-person-circle"> </i>Usuario
                    </div>
                    <input
                      {...register("user", {
                        required: "Este campo es requerido",
                      })}
                      placeholder="usuario"
                      id="campo1"
                      className="form-control rounded-4 pt-2 pb-2"
                    ></input>
                    {errors.user && (
                      <span className="text-danger d-block">
                        {errors.user.message}
                      </span>
                    )}
                  </div>
                  <div className="form-group mb-4">
                    <div
                      htmlFor="campo2"
                      className="form-label text-muted fw-bold"
                    >
                      <i className="bi bi-eye-fill"> </i>Contraseña
                    </div>
                    <input
                      type="password"
                      {...register("pass", {
                        required: "Este campo es requerido",
                      })}
                      placeholder="contraseña"
                      id="campo2"
                      className="form-control rounded-4 pt-2 pb-2"
                    ></input>
                    {errors.pass && (
                      <span className="text-danger d-block">
                        {errors.pass.message}
                      </span>
                    )}
                  </div>
                  <div className="form-group d-flex justify-content-center">
                    <hr className="w-100 mx-4"></hr>
                  </div>
                  <div className="form-group text-center mb-4">
                    <Boton
                      className={
                        "rounded-pill w-100 pt-2 pb-2 btn btn-primary-esago"
                      }
                      text={"Iniciar Sesion"}
                      icon={"bi bi-box-arrow-in-right"}
                    ></Boton>
                  </div>
                </div>
              </div>
            </form>
            {/* FIN FORMULARIO */}
          </div>
        </div>
      </div>
      {/* FIN FORMULARIO LOGIN */}
    </>
  );
};

export default FormLogin;
