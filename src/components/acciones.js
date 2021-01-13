import { React, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import './css/acciones.css'
import Eliminar from './eliminar'

function Acciones({ displayAcciones }) {
    const [showEliminar, setShowEliminar] = useState(false);

    const handleClose = () => setShowEliminar(false);
    const handleShow = () => setShowEliminar(true);
    // const handleShow = () => (showEliminar)? setShowEliminar(false):setShowEliminar(true);
    // const handleShow = () => (showEliminar)? console.log('show eliminar esta siendo true!'):console.log('show eliminar esta siendo false!');  

    if (displayAcciones) {
        return (
            <ListGroup className='acciones-display'>
                <ListGroup.Item action href="#link1" onClick={handleShow} variant='flush'>
                    <Eliminar handleShow={handleShow} handleClose={handleClose} showEliminar={showEliminar} />
                    Eliminar Contacto
          </ListGroup.Item>
                <ListGroup.Item action href="#link2" variant='flush'>
                    Editar Contacto
          </ListGroup.Item>
            </ListGroup>
        )
    } else {
        return (null)
    }

};
export default Acciones;