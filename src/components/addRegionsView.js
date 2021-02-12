import { React, useState, useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import './css/form.css';
import './css/addRegionsView.css';
import { UserFormContext } from '../context/usersFormContext'
import { UserTableContext } from '../context/userTableContext'
import { LogInContext } from '../context/logInContext';
import Inputs from './newUserForm/inputs';

function AddRegions({ data }) {



    // unable the section when the section above is complete
    const [showCountrySect, setShowCountrySect] = useState(false);
    const [showCitySect, setShowCitySect] = useState(false);

    //data for sq-select inputs
    const [countryData, setCountryData] = useState([]);
    const [cityData, setCityData] = useState([]);



    const [newRegionInfo, setNewRegionInfo] = useState({});
    const { addContact, modifyContact } = useContext(UserFormContext); // esto no va, cambiar por uno de regiones
    const { infoCountries } = useContext(UserTableContext);
    useEffect(() => {
        setNewRegionInfo({})
        console.log(newRegionInfo)
    }, [])


    const submitNewRegionInfo = (e) => {
        e.preventDefault();
        addContact(newRegionInfo);
    }
    const submitContactModified = (e, id) => {
        e.preventDefault();
        // console.log(id, newRegionInfo);
        modifyContact(id, newRegionInfo);
    }

    const getInfo = (objectTag, value) => {
        console.log(newRegionInfo)
        if (objectTag === 'region') {
            setNewRegionInfo({ ...newRegionInfo, region: value });
            setCountryData([...new Set(infoCountries.filter(a => a.region_name == value).map(x => x.country_name)), '+ Agregar Pais'])
            setShowCountrySect(true)
            setShowCitySect(false)

        }
        if (objectTag === 'country') {
            setNewRegionInfo({ ...newRegionInfo, country: value })
            setShowCitySect(true)
            // setCityData([...infoCountries.filter(a => a.country_name == value).map(x => x.city_name), '+ Agregar Ciudad'])

        }
        if (objectTag === 'city') {setNewRegionInfo({ ...newRegionInfo, city: value })
    console.log(value )}
    }

    return (

        <section className='form-section'>
            <Form className='form-ctn' onSubmit={(e) => (!data) ? submitNewRegionInfo(e) : submitContactModified(e, data.contact_id)}>
                <Inputs
                    label='Region'
                    objectTag='region'
                    type='sq-select'
                    data={[...new Set(infoCountries.map(x => x.region_name)), '+ Agregar region']}
                    getInfo={getInfo}
                />

                <fieldset className={`${(showCountrySect) ? 'show' : 'hideAddInput'}`}>
                    {/* <h5>Pais</h5> */}
                    <Inputs label='Pais'
                        objectTag='country'
                        type='sq-select'
                        // defaultValue={data?.company}
                        //despues cambiar la data de este input por un map!
                        data={countryData}
                        getInfo={getInfo} />

                </fieldset>


                <fieldset className={`${(showCitySect) ? 'show' : 'hideAddInput'}`}>
                    {/* <h5>Ciudad</h5> */}
                    <Inputs label='Ciudad'
                        objectTag='city'
                        type='sq-select'
                        data={['+ Agregar Ciudad']}
                        moreInformation={`Ciudades de ${newRegionInfo?.country} ya agregadas: ${infoCountries.filter(a => a.country_name == newRegionInfo?.country ).map(x => ' '+x.city_name )}`}

                        getInfo={getInfo} />

                </fieldset>
                {(newRegionInfo.region)?<h6>Informacion a agregar</h6>:''}
                <p>{`
                ${(newRegionInfo.region) ? newRegionInfo.region : ''}
                ${(newRegionInfo.country) ? ' - ' + newRegionInfo.country : ''}
                ${(newRegionInfo.city) ? ' - ' + newRegionInfo.city : ''}`
                }</p>

                {(!data) ?
                    <button className='generic-button align-right' disabled={!newRegionInfo.city}>
                        Agregar
                </button> :
                    <button className='generic-button align-right-modal' type='submit' disabled={!!newRegionInfo[0]}>
                        Guardar Cambios
                </button>}



            </Form>
        </section>
    )
}
export default AddRegions;

