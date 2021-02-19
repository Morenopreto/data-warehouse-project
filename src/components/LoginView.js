import React, { useState, useContext } from 'react';
import { Form, Card, Button } from 'react-bootstrap';
import './css/login.css'
import { LogInContext } from '../context/logInContext';

function Login() {

    const { LogIn, logInStatus } = useContext(LogInContext)
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');


    const validateForm = () => {
        return !!email.length && !!pass.length
    }
    // document.getElementsByTagName('form')[0].addEventListener('submit',()=>{
    //     console.log('se submitio')
    // })
    return (
        <Card className='card'>
            <h1>Ingreso a OnlyGodKnows</h1>
            {/* <Card.Body> */}
            <Form className="mg10-4">
                <Form.Group controlId="formGroupEmail">
                    <Form.Label>Direccion de Email</Form.Label>
                    <Form.Control className='input' type="email" value={email} placeholder="Ingrese su mail" onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control className='input' type="password" value={pass} placeholder="Contraseña" onChange={(e) => setPass(e.target.value)} />
                </Form.Group>
            </Form>
            <Button className="mg10-4 buttons" variant="primary" disabled={!validateForm()} onClick={() => LogIn(email, pass)}>{(!logInStatus)?'Iniciar Sesion':'Iniciando'}</Button>
            {/* </Card.Body> */}
        </Card>



    )
}
export default Login;