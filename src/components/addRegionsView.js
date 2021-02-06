import { React, useState, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import './css/form.css';
import './css/addRegionsView.css';
import { UserFormContext } from '../context/usersFormContext'
import { UserTableContext } from '../context/userTableContext'
import { LogInContext } from '../context/logInContext';
import Inputs from './newUserForm/inputs';

function AddRegions({ data, setModalStatus }) {


    const [status, setStatus] = useState(true);
    //Unable the  input for adding a new data (region, country or city)
    // const [showAddRegBtn, setShowAddRegBtn] = useState(false);
    // const [showAddCounBtn, setShowAddCounBtn] = useState(false);
    // const [showAddCityBtn, setShowAddCityBtn] = useState(false);

    // unable the section when the section above is complete
    const [showCountrySect, setShowCountrySect] = useState(false);
    const [showCitySect, setShowCitySect] = useState(false);

    //data for sq-select inputs
    const [countryData, setCountryData] = useState([]);
    const [cityData, setCityData] = useState([]);



    const [newRegionInfo, setNewRegionInfo] = useState({});
    const { addContact, modifyContact } = useContext(UserFormContext);
    const { infoCountries } = useContext(UserTableContext);
    // console.log(infoCountries)
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
        addContact(newRegionInfo);
    }
    const submitContactModified = (e, id) => {
        e.preventDefault();
        // console.log(id, newRegionInfo);
        modifyContact(id, newRegionInfo);
        setModalStatus(false)
    }

    const prueba = (objectTag, value) => {
        console.log(objectTag, value)
        if (objectTag === 'region') {

            // console.log('showCountrySect');
            setNewRegionInfo({ ...newRegionInfo, region: value });
            setShowCountrySect(true)

            setCountryData([...new Set(infoCountries.filter(a => a.region_name == value).map(x => x.country_name)), '+ Agregar Pais'])
            setShowCitySect(false)

        }
        if (objectTag === 'country') {
            setNewRegionInfo({ ...newRegionInfo, country: value })
            setShowCitySect(true)
            setCityData([...infoCountries.filter(a => a.country_name == value).map(x => x.city_name), '+ Agregar Ciudad'])

        }
        if (objectTag === 'city') setNewRegionInfo({ ...newRegionInfo, city: value })
    }

    return (

        <section className={`form-section ${(data) ? 'form-section-modal' : null}`}>
            <Form className={`form-ctn ${(data) ? 'form-ctn-modal' : null} `} onSubmit={(e) => (!data) ? submitNewContact(e) : submitContactModified(e, data.contact_id)}>
                <p>la logica deberia ser, cuando seleccionas uno de los existentes o agregas uno nuevo, habilita la proxima seccion. la logica de agregar tiene que ser la misma que la del anterior agregando el input </p>
                <Inputs
                    label='Region'
                    objectTag='region'
                    type='sq-select'
                    // defaultValue={data?.city}
                    data={[...new Set(infoCountries.map(x => x.region_name)), '+ Agregar region']}
                    prueba={prueba}
                />

                {/* <button className='addButton' type="button" onClick={() => setShowAddRegBtn(!showAddRegBtn)} >{(!showAddRegBtn) ? '+ Agregar Region' : '- Cerrar Input'}</button>
                <span className={`${(showAddRegBtn) ? 'showAddInput' : 'hideAddInput'}`}>
                    <Inputs label='Region' objectTag='region' type='text' prueba={prueba} />
                </span> */}

                <fieldset className={`${(showCountrySect) ? 'show' : 'hideAddInput'}`}>
                    {/* <h5>Pais</h5> */}
                    <Inputs label='Pais'
                        objectTag='country'
                        type='sq-select'
                        // defaultValue={data?.company}
                        //despues cambiar la data de este input por un map!
                        data={countryData}
                        prueba={prueba} />
                   
                   
                    {/* <button className='addButton' type="button" onClick={() => setShowAddCounBtn(!showAddCounBtn)} >{(!showAddCounBtn) ? '+ Agregar Pais' : '- Cerrar Input'}</button>
                    <span className={`${(showAddCounBtn) ? 'showAddInput' : 'hideAddInput'}`}>
                        <Inputs label='Pais' objectTag='country' type='text' prueba={prueba} />
                    </span> */}

                </fieldset>


                <fieldset className={`${(showCitySect) ? 'show' : 'hideAddInput'}`}>
                    {/* <h5>Ciudad</h5> */}
                    <Inputs label='Ciudad'
                        objectTag='city'
                        type='sq-select'
                        defaultValue={data?.interest}
                        data={cityData}
                        moreInformation='Por ahora nada rey.'

                        prueba={prueba} />
                    {/* <button className='addButton' type="button" onClick={() => setShowAddCityBtn(!showAddCityBtn)} >{(!showAddCityBtn) ? '+ Agregar ciudad' : '- Cerrar Input'}</button>
                    <span className={`${(showAddCityBtn) ? 'showAddInput' : 'hideAddInput'}`}>
                        <Inputs label='Ciudad' objectTag='city' type='text' prueba={prueba} />
                    </span> */}
                </fieldset>


                {(!data) ?
                    <button className='generic-button align-right'>
                        Sumbit
                </button> :
                    <button className='generic-button align-right-modal' type='submit' disabled={!!newRegionInfo[0]}>
                        Guardar Cambios
                </button>}



            </Form>
        </section>
    )
}
export default AddRegions;

