import React, { useState, useContext, useEffect } from 'react';
import { Form, Card, Button } from 'react-bootstrap';
import './css/login.css'
import { LogInContext } from '../context/logInContext';

function Login() {

    const { LogIn } = useContext(LogInContext)
    const [email, setEmail] = useState('');
    const [pass, setPass] = useState('');


    const validateForm = () => {
        return !!email.length && !!pass.length
    }

    return (
        <Card className='card'>
            <h4>Sign In OnlyGodKnows</h4>
            {/* <Card.Body> */}
            <Form className="mg10-4">
                <Form.Group controlId="formGroupEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control className='input' type="email" value={email} placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
                </Form.Group>
                <Form.Group controlId="formGroupPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control className='input' type="password" value={pass} placeholder="Password" onChange={(e) => setPass(e.target.value)} />
                </Form.Group>
            </Form>
            <Button className="mg10-4" variant="primary" disabled={!validateForm()} onClick={()=>LogIn(email, pass)}>Log In</Button>
            {/* </Card.Body> */}
        </Card>



    )
}
export default Login;