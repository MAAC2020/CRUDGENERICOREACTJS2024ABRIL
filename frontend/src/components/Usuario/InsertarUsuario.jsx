import { useContext } from "react";
//importacion de useForm para formularios
import { useForm } from "react-hook-form";
//importacion de id random unico
import { v4 as uuidv4 } from "uuid";
//importacion de la funcion que retorna la alerta
import sweetAlert from "../../helpers/sweetalert/sweetAlert";
import Boton from "../Button/Boton";
//importacion del contexto del loader
import LoaderContext from "../../contexts/LoaderProvider";
//importacion de los parametros globales front end
import { parametrosGlobales } from "../../helpers/constantes/constantes";
import api from "../../api/api";

const InsertarUsuario = () => {
  //contextoGlobal del loader
  const { loader, mostrarLoader, ocultarLoader } = useContext(LoaderContext);
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  //funcion cuando se sube el formulario
  const onSubmit = async (dataForm) => {
    try {
      //se ejecuta la funcionalidad de mostrar el Loader
      mostrarLoader();
      //id unico
      let id = uuidv4();
      let estado = "activo";
      let datos = { ...dataForm, id, estado };

      let data = JSON.stringify(datos);
      //@param {Array Stringify} formData: son los datos en objeto del formulario
      //@param {String} nombreTabla: es el nombre de la tabla a insertar
      //@param {String} idBaseDeDatos: es el id de la base de datos para insertar

      let post = await api(
        "insert",
        data,
        parametrosGlobales.nameTables.tablaUsuario,
        parametrosGlobales.idDataBase.idBaseDeDatos
      );

      //se ejecuta la funcion para ocultar el loader
      ocultarLoader();

      //si la respuesta es success mostrar alerta de success
      //de lo contrario mostrar alerta de error
      //@param {String} icon: es el icono
      //@param {String} title: es el titulo de la alerta
      //@param {String} text: es el texto de la alerta
      post == "success"
        ? sweetAlert("success", "Guardado!", "Guardado Correctamente")
        : sweetAlert(
            "error",
            "Error!",
            "Ups lo sentimos hubo un error intenta mas tarde!"
          );

      //limpiar el formulario
      reset();
    } catch (e) {
      sweetAlert(
        "error",
        "Error!",
        "Ups lo sentimos hubo un error intenta mas tarde!"
      );
      console.error(e);
    } finally {
      //se ejecuta la funcion para ocultar el loader
      ocultarLoader();
    }
  };
  return (
    <>
      <div className="container-fluid mt-5">
        <div className="row">
          <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xxl-12">
            {/* FORMULARIO */}
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="bg-white p-4 border border-1 rounded-4 mt-5 shadow-lg p-3 mb-5 bg-body rounded"
            >
              <div className="form-group text-center mb-4">
                <h1>Registar Usuario</h1>
              </div>
              <div className="row">
                {/* SECCION USUARIO */}
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xxl-12">
                  <div className="form-label text-muted fw-bold">Usuario</div>
                  <input
                    className="form-control rounded-4 pt-2 pb-2"
                    type="email"
                    {...register("user", {
                      required: "Este campo es requerido",
                    })}
                  />
                  {errors.user && (
                    <span className="text-danger d-block">
                      {errors.user.message}
                    </span>
                  )}
                </div>
                {/* FIN SECCION USUARIO */}

                {/* SECCION CONTRASEÑA */}
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xxl-12">
                  <div className="form-label text-muted fw-bold">
                    Contraseña
                  </div>
                  <input
                    className="form-control rounded-4 pt-2 pb-2"
                    {...register("pass", {
                      required: "Este campo es requerido",
                    })}
                  />
                  {errors.pass && (
                    <span className="text-danger d-block">
                      {errors.pass.message}
                    </span>
                  )}
                </div>
                {/* FIN SECCION CONTRASEÑA */}
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xxl-12">
                  <div className="form-label text-muted fw-bold">rol</div>
                  <select
                    className="form-select"
                    {...register("rol", {
                      required: "Este campo es requerido",
                    })}
                  >
                    <option value="">Seleccione</option>
                    <option value="admin">admin</option>
                    <option value="tecnico">tecnico</option>
                  </select>
                  {errors.rol && (
                    <span className="text-danger d-block">
                      {errors.rol.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="row mt-5">
                <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12 col-xxl-12">
                  <Boton
                    type={"submit"}
                    className="btn btn-primary-esago"
                    text="Guardar"
                    icon={"bi bi-cloud-arrow-up-fill"}
                  ></Boton>
                </div>
              </div>
            </form>
            {/* FIN DE FORMULARIO */}
          </div>
        </div>
      </div>
    </>
  );
};

export default InsertarUsuario;
