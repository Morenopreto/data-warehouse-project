import { React, useState } from 'react';
import { ListGroup, Button, Modal } from 'react-bootstrap';
import NewContactForm from './newUserForm/newContactForm'
import Eliminar from './eliminar'
import './css/acciones.css'

function EditContactModal({ modalStatus, setModalStatus, modalData }) {


    return (
        // <div className="modal-ctn">
            <Modal  show={modalStatus} size="lg" onHide={() => setModalStatus(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Modificar Contacto</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <NewContactForm data={modalData} setModalStatus={setModalStatus} />
                </Modal.Body>
                {/* <Modal.Footer>

                    <button className="generic-button" onClick={() => setModalStatus(false)}>
                        Guardar Cambios
                </button>
                </Modal.Footer> */}
            </Modal>
        // </div>

    );

};
export default EditContactModal;