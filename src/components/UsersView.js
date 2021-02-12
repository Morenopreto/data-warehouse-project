
import React, { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { UserFormContext } from '../context/usersFormContext'
import TableComp from './table';
import EditModal from './editModal'
import './css/usersComp.css'

function UserComp() {
    const { getAllUsers, allUser } = useContext(UserFormContext);
    const [modalStatus, setModalStatus] = useState(false);
    const [modalData, setModalData] = useState(null);

    useEffect(() => {
        getAllUsers();
        console.log(allUser)
    }, []);

    const displayEditContacts = (values) => {
        setModalStatus(true);
        setModalData(values)
    }

    return (
        <div className='companies-view-div'>
            <h1>Usuarios</h1>
            <div className='userComp-div'>
                <NavLink className='generic-button' to={{ pathname: `/users/newUser` }}> Crear nuevo usuario </NavLink>
            </div>
            <TableComp info={allUser} displayEditContacts={displayEditContacts} />
            <EditModal modalStatus={modalStatus} setModalStatus={setModalStatus} modalData={modalData} />
        </div>
    )
}

export default UserComp;



