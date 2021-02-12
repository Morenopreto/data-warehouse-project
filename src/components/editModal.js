import { React, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { ListGroup, Button, Modal } from 'react-bootstrap';
import NewContactForm from './newUserForm/newContactForm'
import UserForm from './newUserForm/newUserView'
import NewCompanyView from './newCompanyView'
// import AddRegions from './addRegionsView'
// import Eliminar from './eliminar'
import './css/acciones.css'

function EditModal({ modalStatus, setModalStatus, modalData }) {

    const location = useLocation();
    console.log(location.pathname)
    return (
        <Modal show={modalStatus} size="lg" onHide={() => setModalStatus(false)}>
            {
                (location.pathname == '/contacts') ?
                    (
                        <>
                            <Modal.Header closeButton>
                                <Modal.Title>Modificar Contacto</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <NewContactForm data={modalData} setModalStatus={setModalStatus} />
                            </Modal.Body>
                        </>
                    ) :
                    (location.pathname == '/users') ?
                        (<>
                            <Modal.Header closeButton>
                                <Modal.Title>Modificar Usuario</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <UserForm data={modalData} setModalStatus={setModalStatus} />
                            </Modal.Body>
                        </>
                        ):(location.pathname == '/companies')? (
                                <>
                                    <Modal.Header closeButton>
                                        <Modal.Title>Modificar Compania</Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        <NewCompanyView data={modalData} setModalStatus={setModalStatus} />
                                    </Modal.Body>
                                </>
                            ) : (null)
                            // :  (
                            //     <>
                            //         <Modal.Header closeButton>
                            //             <Modal.Title>Modificar Region/Ciudad</Modal.Title>
                            //         </Modal.Header>
                            //         <Modal.Body>
                            //             <AddRegions data={modalData} setModalStatus={setModalStatus} />
                            //         </Modal.Body>
                            //     </>
                            // )
            }

        </Modal>

    );

};
export default EditModal;