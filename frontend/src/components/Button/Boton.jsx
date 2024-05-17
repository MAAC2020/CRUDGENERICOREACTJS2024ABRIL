//@param {String} className: es la clase del boton
//@param {String} text: es el texto del boton
//@param {String} type: es el tipo del boton
//@param {String} icon: es el icono del boton
const Boton = ({ className, text, type, icon }) => {
  return (
    <>
      <button type={type} className={className}>
        <i className={icon}> </i>
        {text}
      </button>
    </>
  );
};

export default Boton;
