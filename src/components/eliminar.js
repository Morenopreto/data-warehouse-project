import { React, useState } from 'react';
import { Button, Modal, Spinner } from 'react-bootstrap';
import './css/eliminar.css'
function Eliminar({ handleShow, handleClose, showEliminar }) {

    const [loading, setLoading] = useState(false);
    const [loadingText, setLoadingText] = useState('Eliminando...')
    const espera = () => {
        setLoading(true)
        setTimeout(() => {
            console.log('perro')
            setLoadingText('Contacto Eliminado!')

        }, 2500)
        setTimeout(() => {
            console.log('perro');
            setLoading(false);
            handleClose();
            setLoadingText('Eliminando...')
        }, 3500)
    }
    const callback = () => {
        setTimeout(() => {
            handleClose();
        }, 1)
    }

    const retornar = () => {
        if (loading) {
            return (
                <>
                    <Modal.Body className='loading' >
                        <Button variant="primary" disabled>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                            <span>{`  ${loadingText}`}</span>
                        </Button>
                    </Modal.Body>
                </>
            )
        } else {
            return (
                <>
                    <Modal.Body >
                        Seguro desea eliminar el contacto?
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={espera}>
                            Eliminar
                        </Button>
                        <Button variant="primary" onClick={callback}>Cancelar</Button>
                    </Modal.Footer>
                </>
            )

        }
    }
    return (
        <>
            <Modal
                show={showEliminar}
                onHide={handleClose}
                // backdrop="static"
                keyboard={false}
            >

                <Modal.Header >
                    <Modal.Title>Eliminar contacto</Modal.Title>
                </Modal.Header>
                {retornar()}
            </Modal>


        </>

    )
}


export default Eliminar;