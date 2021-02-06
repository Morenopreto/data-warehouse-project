import { React, useState, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import '../css/form.css';
import { UserFormContext } from '../../context/usersFormContext'
import { UserTableContext } from '../../context/userTableContext'
import { LogInContext } from '../../context/logInContext';
import Inputs from './inputs';

function NewContactForm({ data,setModalStatus }) {
    console.log(data)
    const [status, setStatus] = useState(true);
    const [newContactInfo, setNewContactInfo] = useState({});
    const { addContact, modifyContact } = useContext(UserFormContext);
    const { infoCountries } = useContext(UserTableContext);
    // let disabled = true;
    // useEffect(() => {
    //     (newContactInfo.length)?disabled=false:disabled=true;
    // }, [newContactInfo])


    const handleActive = () => {

        //chequear que funcion de manera correcta!!!!

        if (Array.from(document.getElementsByTagName('input')).map(item => !!item.value).find(item => item === false) === undefined
            // && document.querySelectorAll("input[type=password]")[0].value !== document.querySelectorAll("input[type=password]")[1].value
        ) { setStatus(false); console.log('viene a if') } else { setStatus(true); console.log('viene a else') };
    }
    const submitNewContact = (e) => {
        e.preventDefault();
        addContact(newContactInfo);
    }
    const submitContactModified = (e, id) => {
        e.preventDefault();
        console.log(id, newContactInfo);
        modifyContact(id, newContactInfo);
        setModalStatus(false)
    }

    const prueba = (objectTag, value) => {
        console.log(objectTag, value)
        if (objectTag === 'name') setNewContactInfo({ ...newContactInfo, name: value })
        if (objectTag === 'surname') setNewContactInfo({ ...newContactInfo, surname: value })
        if (objectTag === 'mail') setNewContactInfo({ ...newContactInfo, mail: value })
        if (objectTag === 'city_name') setNewContactInfo({ ...newContactInfo, city_name: value })
        if (objectTag === 'company_name') setNewContactInfo({ ...newContactInfo, company_name: value })
        if (objectTag === 'interest') setNewContactInfo({ ...newContactInfo, interest: value })
        if (objectTag === 'position') setNewContactInfo({ ...newContactInfo, position: value })

    }

    return (

        <section className={`form-section ${(data) ? 'form-section-modal' : null}`}>
            <Form className={`form-ctn ${(data) ? 'form-ctn-modal' : null} `} onSubmit={(e) => (!data) ? submitNewContact(e) : submitContactModified(e, data.contact_id)}>
                <h5>Informacion Personal</h5>
                <Inputs label='Nombre' objectTag='name' type='text' defaultValue={data?.name} prueba={prueba} />
                <Inputs label='Apellido' objectTag='surname' type='text' defaultValue={data?.surname} prueba={prueba} />
                <Inputs label='Mail' objectTag='mail' type='mail' defaultValue={data?.mail} prueba={prueba} />
                <Inputs
                    label='Ciudad'
                    objectTag='city_name'
                    type='sq-select'
                    defaultValue={data?.city}
                    data={Array.from(infoCountries.map(item => item.city_name))}
                    moreInformation='Si la ciudad no se encuentra, debe agregarla desde la seccion Regiones/Ciudades.'
                    prueba={prueba}
                />


                <h5>Informacion de la compañia</h5>
                <Inputs label='Posicion en la compañia' objectTag='position' type='text' defaultValue={data?.position} prueba={prueba} />
                {/* <Inputs label='Compañia' objectTag='company' type='text' prueba={prueba} /> */}
                <Inputs label='Compañia'
                    objectTag='company_name'
                    type='sq-select'
                    defaultValue={data?.company}
                    //despues cambiar la data de este input por un map!
                    data={['Plus Cargo', 'Del Beagle', 'Frodas', 'Chandon', 'El purgatorio bar', 'Aerolab', 'AWE Systems', 'Los Yamanas']}
                    moreInformation='Si la ciudad no se encuentra, debe agregarla desde la seccion compañias.'

                    prueba={prueba} />
                <h5>Informacion Extra</h5>
                <Inputs label='Porcentaje de Interes'
                    objectTag='interest'
                    type='sq-select'
                    defaultValue={data?.interest}
                    data={['0%', '25%', '50%', '75%', '100%']}
                    moreInformation='Seleccione el porcentaje de interes del contacto en las propuestas que usted le ofrece.'

                    prueba={prueba} />


                {(!data) ?
                    <button className='generic-button align-right'>
                        Sumbit
                </button> :
                    <button className='generic-button align-right-modal' type='submit' disabled={!!newContactInfo[0]}>
                        Guardar Cambios
                </button>}



            </Form>
        </section>
    )
}
export default NewContactForm;

