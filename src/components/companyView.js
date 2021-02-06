
import React, { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { CompaniesContext } from '../context/companiesContext'
import TableComp from './table';
import './css/usersComp.css' //ESTO VA????

function CompanyView() {
    const { getAllCompanies, allCompanies } = useContext(CompaniesContext);

    useEffect(() => {
        getAllCompanies();
        console.log(allCompanies)
    }, []);


    return (
        <div>
            <h1>Companias</h1>
            <div className='userComp-div'>
                <NavLink className='generic-button' to={{ pathname: `/companies/newCompany` }}> Agregar nueva compania </NavLink>
            </div>
            <TableComp info={allCompanies} />
        </div>
    )
}

export default CompanyView;



