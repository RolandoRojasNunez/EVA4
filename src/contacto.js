import React, { useState } from 'react';

const Contacto = () => {
  const [nombre, setNombre] = useState('');
  const [apellido, setApellido] = useState('');
  const [telefono, setTelefono] = useState('');
  const [correo, setCorreo] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [enviado, setEnviado] = useState(false); // Estado para controlar el envío del formulario

  const enviarFormulario = (event) => {
    event.preventDefault();

    // Validar los campos antes de guardar en el Local Storage
    if (nombre.trim() === '' || apellido.trim() === '' || telefono.trim() === '' || correo.trim() === '' || mensaje.trim() === '') {
      alert('Por favor, completa todos los campos.');
      return;
    }

    // Guardar los datos en el Local Storage
    const datosContacto = { nombre, apellido, telefono, correo, mensaje };
    localStorage.setItem('contacto', JSON.stringify(datosContacto));

    // Mostrar mensaje de éxito
    alert('¡El formulario ha sido enviado correctamente!');
    setEnviado(true);
  };

  return (
    <section id="contacto" className="content">
      <h2>Contacto</h2>
      <p>Ponte en contacto con nosotros</p>

      {enviado ? (
        <div>
          <p>Tu mensaje ha sido enviado. Nos pondremos en contacto contigo pronto.</p>
        </div>
      ) : (
        <form id="formulario-contacto" onSubmit={enviarFormulario}>
          <label htmlFor="nombreContacto">Nombre:</label>
          <input type="text" id="nombreContacto" value={nombre} onChange={(e) => setNombre(e.target.value)} required /><br /><br />

          <label htmlFor="apellidoContacto">Apellido:</label>
          <input type="text" id="apellidoContacto" value={apellido} onChange={(e) => setApellido(e.target.value)} required /><br /><br />

          <label htmlFor="telefonoContacto">Teléfono:</label>
          <input type="tel" id="telefonoContacto" value={telefono} onChange={(e) => setTelefono(e.target.value)} required /><br /><br />

          <label htmlFor="correoContacto">Correo:</label>
          <input type="email" id="correoContacto" value={correo} onChange={(e) => setCorreo(e.target.value)} required /><br /><br />

          <label htmlFor="mensajeContacto">Mensaje:</label><br />
          <textarea id="mensajeContacto" rows="4" cols="50" value={mensaje} onChange={(e) => setMensaje(e.target.value)} required></textarea><br /><br />

          <input type="submit" value="Enviar" />
        </form>
      )}
    </section>
  );
}

export default Contacto;