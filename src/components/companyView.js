
import React, { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { CompaniesContext } from '../context/companiesContext'
import TableComp from './table';
import EditModal from './editModal'
import './css/usersComp.css' //ESTO VA????

function CompanyView() {
    const { getAllCompanies, allCompanies } = useContext(CompaniesContext);
    const [modalStatus, setModalStatus] = useState(false);
    const [modalData, setModalData] = useState(null);


    useEffect(() => {
        getAllCompanies();
        console.log(allCompanies)
    }, []);

    const displayEditContacts = (values) => {
        setModalStatus(true);
        setModalData(values)
    }

    return (
        <div className='companies-view-div'>
            <h1>Companias</h1>
            <div className='userComp-div'>
                <NavLink className='generic-button' to={{ pathname: `/companies/newCompany` }}> Agregar nueva compania </NavLink>
            </div>
            <TableComp info={allCompanies} displayEditContacts={displayEditContacts}/>
            <EditModal modalStatus={modalStatus} setModalStatus={setModalStatus} modalData={modalData} />

        </div>
    )
}

export default CompanyView;



