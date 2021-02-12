import React, { useContext, useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { LogInContext } from '../context/logInContext'
import { UserTableContext } from '../context/userTableContext'
// import { Table } from 'react-bootstrap'; YA LO PASE
// import { BsArrowUpDown } from 'react-icons/bs'; YA LO PASE
import { MdArrowDropDown, MdFileUpload, MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { GrFormClose } from 'react-icons/gr';
import SearchForm from './table/searchForm';
import EditModal from './editModal'
import TableComp from './table';
import './css/table.css';


function ContactsComp() {
    let paginationArrowLeft;
    let paginationArrowRight;
    const { infoContacts, pagination, GetUserData, tokenState } = useContext(LogInContext);
    const { searchParameter, hiddenSearch, addItemToSearch, hiddenSearchModify, search, deletePill } = useContext(UserTableContext);
    const [infoContactsSort, setInfoContactsSort] = useState(null)
    const [lastParameter, setLastParameter] = useState(null);
    const [modalStatus, setModalStatus] = useState(false);
    const [modalData, setModalData] = useState(null);

    useEffect(() => {
        setInfoContactsSort(infoContacts);
    }, [infoContacts]);

    const displayEditContacts = (values) => {
        setModalStatus(true);
        setModalData(values)
    }


    if (pagination.Page > 1) { paginationArrowLeft = <MdKeyboardArrowLeft onClick={() => { GetUserData(tokenState, (pagination.Page - 1) * 9) }} /> }
        if (pagination.Page != pagination.PageCount) { paginationArrowRight = <MdKeyboardArrowRight onClick={() => GetUserData(tokenState, pagination.Page * 10 + 1)} /> }
    return (
        <div className='contacts-view-div'>
            <h1>Contactos</h1>


            {/* DESDE ACA PODRIA SER OTRO COMPONENTE */}
            <section className='search-buttos-ctn'>

                <div className='search-ctn'>
                    <div id='div-input-search' className='div-input-search'>
                        <input type='text' id='input-search' className='input-search' onKeyDown={(e) => { addItemToSearch(e); }} onClick={(e) => { if (!hiddenSearch) hiddenSearchModify(e) }} />
                        {/* <i class="fas fa-caret-down" onClick={(e) => hiddenSearchModify(e)}></i> */}
                        <MdArrowDropDown className='cursor' onClick={(e) => hiddenSearchModify(e)} />
                    </div>
                </div>
                <div className='search-bar-buttons-ctn'>
                    <NavLink className='generic-button' to={{ pathname: `/contacts/newContact` }}> Agregar Contacto </NavLink>

                </div>
                <div>
                    <ul className='search-ul-blue-pills'>
                        {/* Creation of blue pills with search values stored as objects. Eg: {city:Alberta}. With data[Object.keys(data) i can acces to each value as a string to be rendered. */}
                        {searchParameter?.map((data, key) => (
                            <li key={`li-${key}`} className='search-blue-pill'>{data[Object.keys(data)]}<GrFormClose key={`delete-pill-${key}`} onClick={() => deletePill(data[Object.keys(data)])} /></li>
                        )
                        )}
                    </ul>
                </div>
            </section>

            {/* HASTA ACA */}
            <SearchForm hiddenSearch={hiddenSearch} infoContactsSort={infoContactsSort} />
            <TableComp info={infoContacts} displayEditContacts={displayEditContacts} />
             <div className='pagination'>
                <label> {pagination.Page} - {pagination.PageCount} Pags. </label>
                <span>{paginationArrowLeft}</span>
                <span>{paginationArrowRight}</span>
            </div>
            <EditModal modalStatus={modalStatus} setModalStatus={setModalStatus} modalData={modalData} />
        </div>
    )
}
export default ContactsComp;




