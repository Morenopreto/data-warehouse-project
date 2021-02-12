import { React, useState, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { VscLoading } from 'react-icons/vsc';
import { FiCheckSquare } from 'react-icons/fi';
import './css/form.css';
// import { UserFormContext } from '../context/usersFormContext'
import { UserTableContext } from '../context/userTableContext'
import { CompaniesContext } from '../context/companiesContext'
import { LogInContext } from '../context/logInContext';
import Inputs from './newUserForm/inputs';

// import { BiDotsHorizontalRounded } from 'react-icons/bi'
// import { Image, ProgressBar } from 'react-bootstrap'
// let src = 'data:image/jpeg;base64,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'


function NewCompany({ data, setModalStatus }) {
    const [status, setStatus] = useState(true);
    const [newUserInfo, setNewUserInfo] = useState({});
    const { infoCountries } = useContext(UserTableContext)
    // const { fetchStatus } = useContext(UserFormContext);
    const { addCompany, modifyCompany, fetchStatus } = useContext(CompaniesContext);



    const handleActive = () => {

        //chequear que funcion de manera correcta!!!!

        if (Array.from(document.getElementsByTagName('input')).map(item => !!item.value).find(item => item === false) === undefined
            // && document.querySelectorAll("input[type=password]")[0].value !== document.querySelectorAll("input[type=password]")[1].value
        ) { setStatus(false); console.log('viene a if') } else { setStatus(true); console.log('viene a else') };
    }
    const submitNewCompany = (e) => {
        e.preventDefault();
        addCompany(newUserInfo);
    }
    const submitCompanyModified = (e, id) => {
        e.preventDefault();
        console.log("newUserInfo")
        console.log(newUserInfo)
        console.log("newUserInfo")
        modifyCompany(id, newUserInfo);
        setModalStatus(false)
    }
    //aca solo sirve si se presenta e
    const getInfo = (objectTag, value) => {

        if (objectTag === 'company') setNewUserInfo({ ...newUserInfo, company_name: value })
        if (objectTag === 'address') setNewUserInfo({ ...newUserInfo, company_address: value })
        if (objectTag === 'mail') setNewUserInfo({ ...newUserInfo, mail: value })
        if (objectTag === 'phone') setNewUserInfo({ ...newUserInfo, phone: value })
        if (objectTag === 'city') setNewUserInfo({ ...newUserInfo, city: value })
        // console.log(newUserInfo)
    }
    return (

        <section className={`form-section ${(data) ? 'form-section-modal' : null}`}>
            <Form className={`form-ctn ${(data) ? 'form-ctn-modal' : null} `} onSubmit={(e) => (!data) ? submitNewCompany(e) : submitCompanyModified(e, data.company_id)} >
                <h5>Informacion </h5>
                <Inputs label='Compania' objectTag='company' type='text' defaultValue={data?.company} getInfo={getInfo} />
                <Inputs label='Direccion' objectTag='address' type='text' defaultValue={data?.address} getInfo={getInfo} />
                <Inputs label='Mail de contacto' objectTag='mail' type='mail' defaultValue={data?.mail} getInfo={getInfo} />
                <Inputs label='Telefono' objectTag='phone' type='text' defaultValue={data?.phone} getInfo={getInfo} />
                <Inputs
                    label='Ciudad'
                    objectTag='city'
                    type='sq-select'
                    defaultValue={data?.city}
                    data={Array.from(infoCountries.map(item => item.city_name))}
                    getInfo={getInfo} />


                {/* <NavLink className='navlinkLi' to={{ pathname: `/users/newUsers` }} onClick={(e) => submit(e)}> */}
                <button className={`generic-button ${(fetchStatus === true) ? 'submit-ok-btn' : (fetchStatus === false) ? 'submit-err-btn' : null}`} type="submit"  >
                    {(fetchStatus === null) ? 'Submit' : (fetchStatus === 'fetching') ? <VscLoading className='loading' /> : (fetchStatus) ? <FiCheckSquare className='submit-ok' /> : 'ERROR'}
                </button>
                {/* </NavLink> */}



            </Form>
        </section>
    )
}
export default NewCompany;