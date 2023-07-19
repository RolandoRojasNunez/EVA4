import React, { useState, useEffect } from 'react';

const Cotizacion = () => {
    const [nombreApellido, setNombreApellido] = useState('');
    const [correo, setCorreo] = useState('');
    const [telefono, setTelefono] = useState('');
    const [preferencias, setPreferencias] = useState([]);
    const [opcionSeleccionada, setOpcionSeleccionada] = useState('');
    const [fechaHora, setFechaHora] = useState('');
    const [comentarios, setComentarios] = useState('');

    const [cotizaciones, setCotizaciones] = useState([]);
    const [cotizacionEditando, setCotizacionEditando] = useState(null);
    const [edicionActiva, setEdicionActiva] = useState(false);

    const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Estado para mostrar el mensaje de éxito

    useEffect(() => {
        const cotizacionesGuardadas = localStorage.getItem('cotizaciones');
        if (cotizacionesGuardadas) {
            setCotizaciones(JSON.parse(cotizacionesGuardadas));
        }
    }, []);

    useEffect(() => {
        localStorage.setItem('cotizaciones', JSON.stringify(cotizaciones));
    }, [cotizaciones]);

    const guardarCotizacion = (event) => {
        event.preventDefault();

        // Validar los campos antes de guardar la cotización
        if (
            nombreApellido.trim() === '' ||
            correo.trim() === '' ||
            telefono.trim() === '' ||
            preferencias.length === 0 ||
            opcionSeleccionada.trim() === '' ||
            fechaHora.trim() === ''
        ) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        const nuevaCotizacion = {
            id: new Date().getTime().toString(),
            nombreApellido,
            correo,
            telefono,
            preferencias,
            opcionSeleccionada,
            fechaHora,
            comentarios,
        };

        setCotizaciones([...cotizaciones, nuevaCotizacion]);
        limpiarFormulario();
        setShowSuccessMessage(true);

        setTimeout(() => {
            setShowSuccessMessage(false);
        }, 2000);
    };

    const eliminarCotizacion = (id) => {
        const cotizacionesActualizadas = cotizaciones.filter((cotizacion) => cotizacion.id !== id);
        setCotizaciones(cotizacionesActualizadas);
    };

    const editarCotizacion = (cotizacion) => {
        setNombreApellido(cotizacion.nombreApellido);
        setCorreo(cotizacion.correo);
        setTelefono(cotizacion.telefono);
        setPreferencias(cotizacion.preferencias);
        setOpcionSeleccionada(cotizacion.opcionSeleccionada);
        setFechaHora(cotizacion.fechaHora);
        setComentarios(cotizacion.comentarios);

        setCotizacionEditando(cotizacion);
        setEdicionActiva(true);
    };

    const guardarEdicion = (event) => {
        event.preventDefault();

        // Validar los campos antes de guardar los cambios
        if (
            nombreApellido.trim() === '' ||
            correo.trim() === '' ||
            telefono.trim() === '' ||
            preferencias.length === 0 ||
            opcionSeleccionada.trim() === '' ||
            fechaHora.trim() === ''
        ) {
            alert('Por favor, completa todos los campos.');
            return;
        }

        const cotizacionActualizada = {
            ...cotizacionEditando,
            nombreApellido,
            correo,
            telefono,
            preferencias,
            opcionSeleccionada,
            fechaHora,
            comentarios,
        };

        const cotizacionesActualizadas = cotizaciones.map((cotizacion) =>
            cotizacion.id === cotizacionActualizada.id ? cotizacionActualizada : cotizacion
        );

        setCotizaciones(cotizacionesActualizadas);
        setEdicionActiva(false);
        setCotizacionEditando(null);
        limpiarFormulario();
        setShowSuccessMessage(true);

        setTimeout(() => {
            setShowSuccessMessage(false);
        }, 2000);
    };

    const limpiarFormulario = () => {
        setNombreApellido('');
        setCorreo('');
        setTelefono('');
        setPreferencias([]);
        setOpcionSeleccionada('');
        setFechaHora('');
        setComentarios('');
    };

    const handleTelefonoChange = (event) => {
        const value = event.target.value;
        const onlyNumbers = value.replace(/[^0-9]/g, '');
        setTelefono(onlyNumbers);
    };

    const exportarDatos = () => {
        if (cotizaciones.length === 0) {
            alert('No hay cotizaciones para exportar.');
            return;
        }

        const confirmacion = window.confirm('¿Estás seguro/a de exportar los datos? Esto eliminará los datos del Local Storage.');
        if (confirmacion) {
            const datosExportados = JSON.stringify(cotizaciones);
            const blob = new Blob([datosExportados], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'cotizaciones.json';
            link.click();
            setCotizaciones([]);
            localStorage.removeItem('cotizaciones');
        }
    };

    return (
        <section id="cotizacion" className="content">
            <h2>Cotización</h2>
            {showSuccessMessage && <div className="success-message">¡Cotización guardada con éxito!</div>}
            <form
                id="cotizacion-form"
                className="cotizacion-form"
                onSubmit={edicionActiva ? guardarEdicion : guardarCotizacion}
            >
                <label htmlFor="nombre-apellido">Nombre y Apellido</label>
                <input
                    type="text"
                    id="nombre-apellido"
                    required
                    value={nombreApellido}
                    onChange={(e) => setNombreApellido(e.target.value)}
                />

                <label htmlFor="correo">Correo Electrónico</label>
                <input type="email" id="correo" required value={correo} onChange={(e) => setCorreo(e.target.value)} />

                <label htmlFor="telefono">Teléfono</label>
                <input type="text" id="telefono" required value={telefono} onChange={handleTelefonoChange} />

                <label htmlFor="preferencia">Preferencia</label>
                <label>
                    <input
                        type="checkbox"
                        name="preferencia"
                        value="Pagina"
                        checked={preferencias.includes('Pagina')}
                        onChange={() => setPreferencias([...preferencias, 'Pagina'])}
                    />{' '}
                    Página
                </label>
                <label>
                    <input
                        type="checkbox"
                        name="preferencia"
                        value="Aplicacion"
                        checked={preferencias.includes('Aplicacion')}
                        onChange={() => setPreferencias([...preferencias, 'Aplicacion'])}
                    />{' '}
                    Aplicación
                </label>

                <label htmlFor="opciones">Opciones</label>
                <select
                    id="opciones"
                    required
                    value={opcionSeleccionada}
                    onChange={(e) => setOpcionSeleccionada(e.target.value)}
                >
                    <option value="">Seleccione una opción</option>
                    <option value="Pagina Web">Página Web</option>
                    <option value="Aplicacion IOS">Aplicación IOS</option>
                    <option value="Aplicacion Android">Aplicación Android</option>
                    <option value="Aplicacion Cloud">Aplicación Cloud</option>
                </select>

                <label htmlFor="fecha-hora">Fecha y Hora</label>
                <input type="datetime-local" id="fecha-hora" required value={fechaHora} onChange={(e) => setFechaHora(e.target.value)} />

                <label htmlFor="comentarios">Comentarios</label>
                <textarea id="comentarios" rows="4" value={comentarios} onChange={(e) => setComentarios(e.target.value)}></textarea>

                <button type="submit">{edicionActiva ? 'Guardar Cambios' : 'Guardar'}</button>
            </form>

            <button onClick={exportarDatos}>Exportar Datos</button>

            <table id="cotizaciones-table" className="cotizaciones-table">
                <thead>
                    <tr>
                        <th>Nombre y Apellido</th>
                        <th>Fecha de Cotización</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {cotizaciones.map((cotizacion) => (
                        <tr key={cotizacion.id}>
                            <td>{cotizacion.nombreApellido}</td>
                            <td>{cotizacion.fechaHora}</td>
                            <td>
                                <button onClick={() => editarCotizacion(cotizacion)}>Editar</button>
                                <button onClick={() => eliminarCotizacion(cotizacion.id)}>Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div id="editar-modal" className={`modal ${edicionActiva ? 'modal-open' : ''}`}>
                <div className="modal-content">
                    <h2>Editar Cotización</h2>
                    <form id="editar-form" onSubmit={guardarEdicion}>
                        <input type="hidden" id="editar-id" value={cotizacionEditando ? cotizacionEditando.id : ''} />

                        <label htmlFor="editar-nombre-apellido">Nombre y Apellido</label>
                        <input
                            type="text"
                            id="editar-nombre-apellido"
                            required
                            value={nombreApellido}
                            onChange={(e) => setNombreApellido(e.target.value)}
                        />

                        <label htmlFor="editar-correo">Correo Electrónico</label>
                        <input type="email" id="editar-correo" required value={correo} onChange={(e) => setCorreo(e.target.value)} />

                        <label htmlFor="editar-telefono">Teléfono</label>
                        <input type="text" id="editar-telefono" required value={telefono} onChange={handleTelefonoChange} />

                        <label htmlFor="editar-preferencia">Preferencia</label>
                        <label>
                            <input
                                type="checkbox"
                                name="editar-preferencia"
                                value="Pagina"
                                checked={preferencias.includes('Pagina')}
                                onChange={() => setPreferencias([...preferencias, 'Pagina'])}
                            />{' '}
                            Página
                        </label>
                        <label>
                            <input
                                type="checkbox"
                                name="editar-preferencia"
                                value="Aplicacion"
                                checked={preferencias.includes('Aplicacion')}
                                onChange={() => setPreferencias([...preferencias, 'Aplicacion'])}
                            />{' '}
                            Aplicación
                        </label>

                        <label htmlFor="editar-opciones">Opciones</label>
                        <select
                            id="editar-opciones"
                            required
                            value={opcionSeleccionada}
                            onChange={(e) => setOpcionSeleccionada(e.target.value)}
                        >
                            <option value="">Seleccione una opción</option>
                            <option value="Pagina Web">Página Web</option>
                            <option value="Aplicacion IOS">Aplicación IOS</option>
                            <option value="Aplicacion Android">Aplicación Android</option>
                            <option value="Aplicacion Cloud">Aplicación Cloud</option>
                        </select>

                        <label htmlFor="editar-fecha-hora">Fecha y Hora</label>
                        <input
                            type="datetime-local"
                            id="editar-fecha-hora"
                            required
                            value={fechaHora}
                            onChange={(e) => setFechaHora(e.target.value)}
                        />

                        <label htmlFor="editar-comentarios">Comentarios</label>
                        <textarea id="editar-comentarios" rows="4" value={comentarios} onChange={(e) => setComentarios(e.target.value)}></textarea>

                        <button type="submit">Guardar Cambios</button>


                    </form>
                </div>
            </div>
        </section >
    );
};

export default Cotizacion;