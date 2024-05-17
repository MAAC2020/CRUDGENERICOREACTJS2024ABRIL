import { useContext, useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
//importacion de react hook forms
import { useForm } from "react-hook-form";
//importacion de moment js para fechas
//importacion de sweet alert
import sweetAlert from "../../helpers/sweetalert/sweetAlert";
//importacion del contexto del loader
import LoaderContext from "../../contexts/LoaderProvider";
//importacion de estilos de bootstrap
import { Col, Form, Row } from "react-bootstrap";
//importacion Boton
// import api_actualizar from "../../api/api_actualizar";
//importacion parametros globales
import { parametrosGlobales } from "../../helpers/constantes/constantes";
import Boton from "../Button/Boton";
import api from "../../api/api";

const EditarUsuarioModal = ({
  elementoEditar,
  show,
  setShow,
  handleClose,
  handleShow,
  obtenerRegistrosTabla,
}) => {
  //contextoGlobal del loader
  const { mostrarLoader, ocultarLoader } = useContext(LoaderContext);
  //cargar 1 sola vez cada vez que se llama el componente
  useEffect(() => {
    console.log("USE EFECT");
    console.log(elementoEditar);
  }, []);
  //inicializar los valores por defecto del objeto que se le pasa al dar click
  //desestructuracion para modificar la propiedad de la fecha_nacimiento
  //formato de fechas año-mes-dia
  //YYYY-MM-DD
  //cualquier valor del formulario es necesario modificarlo aqui
  //estado para valores por defecto del formulario
  const [defaultValues, setDefaultValues] = useState({
    ...elementoEditar,
  });

  //estado de mostrar bloquear el formulario de editar
  const [disabledForm, setDisabledForm] = useState(true);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({
    //se le pasa el valor del estado
    defaultValues: defaultValues,
  });

  const onSubmit = async (datosForm) => {
    //mostrar loader
    mostrarLoader();

    let { id } = datosForm;
    let data = JSON.stringify(datosForm);

    let campo = JSON.stringify(
      parametrosGlobales.nameFieldUpdate.nombreCampoActualizarId
    );
    let valor = JSON.stringify(id);

    let update = await api(
      "update",
      data,
      parametrosGlobales.nameTables.tablaUsuario,
      parametrosGlobales.idDataBase.idBaseDeDatos,
      campo,
      valor
    );

    //ocultar loader
    ocultarLoader();
    //si la respuesta es success mostrar alerta de success
    //de lo contrario mostrar alerta de error
    //@param {String} icon: es el icono
    //@param {String} title: es el titulo de la alerta
    //@param {String} text: es el texto de la alerta
    update == "success" &&
      sweetAlert("success", "Actualizado!", "Actualizado Correctamente");

    update == "error" &&
      sweetAlert(
        "error",
        "Error!",
        "Ups lo sentimos hubo un error intenta mas tarde!"
      );

    update == "warning" &&
      sweetAlert(
        "warning",
        "No se encuentra!",
        "El registro que esta tratando de actualizar no se encontro en la base de datos!"
      );

    // console.log(update);

    //cerrar el formulario
    handleClose();

    //recargar la tabla
    obtenerRegistrosTabla();

    //limpiar el formulario
    //reset();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Persona</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <fieldset disabled={disabledForm}>
            <Form
              onSubmit={handleSubmit(onSubmit)}
              className="p-4 rounded border border-2"
            >
              {/* FORMULARIO */}
              <Row>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Form.Label className="text-muted fw-bold">
                    Usuario
                  </Form.Label>
                  <Form.Control
                    className="rounded-4 pt-2 pb-2"
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
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Form.Label className="text-muted fw-bold">
                    Contraseña
                  </Form.Label>
                  <Form.Control
                    className="rounded-4 pt-2 pb-2"
                    {...register("pass", {
                      required: "Este campo es requerido",
                    })}
                  />
                  {errors.pass && (
                    <span className="text-danger d-block">
                      {errors.pass.message}
                    </span>
                  )}
                </Col>
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Form.Label className="text-muted fw-bold">rol</Form.Label>
                  <Form.Select
                    {...register("rol", {
                      required: "Este campo es requerido",
                    })}
                  >
                    <option value="">Seleccione</option>
                    <option value="admin">admin</option>
                    <option value="tecnico">tecnico</option>
                  </Form.Select>
                  {errors.rol && (
                    <span className="text-danger d-block">
                      {errors.rol.message}
                    </span>
                  )}
                </Col>
                {/* SECCION ESTADO */}

                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Form.Label className="text-muted fw-bold">estado</Form.Label>
                  <Form.Select
                    {...register("estado", {
                      required: "Este campo es requerido",
                    })}
                  >
                    <option value="">Seleccione</option>
                    <option value="activo">activo</option>
                    <option value="inactivo">inactivo</option>
                  </Form.Select>
                  {errors.estado && (
                    <span className="text-danger d-block">
                      {errors.estado.message}
                    </span>
                  )}
                </Col>
                {/* FIN SECCION ESTADO */}
              </Row>
              <Row className="mt-5">
                <Col xs={12} sm={12} md={12} lg={12} xl={12} xxl={12}>
                  <Boton
                    type={"submit"}
                    className={"btn btn-primary-esago"}
                    text="Guardar"
                    icon={"bi bi-cloud-arrow-up-fill"}
                  ></Boton>
                </Col>
              </Row>
            </Form>
          </fieldset>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
          {/* PASAR LO CONTRARIO DE LO QUE TIENE DISABLED FORM PARA PODER EDITAR ELFORM */}
          <Button
            variant="warning"
            onClick={() => setDisabledForm(!disabledForm)}
          >
            Editar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditarUsuarioModal;
