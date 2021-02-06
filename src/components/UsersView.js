
import React, { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { UserFormContext } from '../context/usersFormContext'
import TableComp from './table';
import './css/usersComp.css'

function UserComp() {
    const { getAllUsers, allUser } = useContext(UserFormContext);

    useEffect(() => {
        getAllUsers();
        console.log(allUser)
    }, []);


    return (
        <div>
            <h1>Usuarios</h1>
            <div className='userComp-div'>
                <NavLink className='generic-button' to={{ pathname: `/users/newUser` }}> Crear nuevo usuario </NavLink>
            </div>
            <TableComp info={allUser} />
        </div>
    )
}

export default UserComp;



