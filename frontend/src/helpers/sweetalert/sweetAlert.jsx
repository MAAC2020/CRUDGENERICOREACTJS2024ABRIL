//@param {String} icon: es el icono
//@param {String} title: es el titulo de la alerta
//@param {String} text: es el texto de la alerta
const sweetAlert = (icon, title, text) => {
  return Swal.fire({
    icon: icon,
    title: title,
    text: text,
  });
};

export default sweetAlert;
