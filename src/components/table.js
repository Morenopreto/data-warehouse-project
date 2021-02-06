import { useLocation } from 'react-router-dom';
import { MdArrowDropDown, MdFileUpload, MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { Table } from 'react-bootstrap';
import { BsArrowUpDown } from 'react-icons/bs'
import TableRows from './TableRows';


function TableComp({ info, pag, displayEditContacts }) {
    // console.log('info')
    // console.log(info)
    // console.log('info')
    // let paginationArrowLeft;
    // let paginationArrowRight;
    //VER COMO ADAPTAR LAS FUNCIONES PARA QUE SEAN GENERICAS!
    const location = useLocation();

    // if (pag.Page > 1) { paginationArrowLeft = <MdKeyboardArrowLeft onClick={() => { GetUserData(tokenState, (pagination.Page - 1) * 9) }} /> }
    //     if (pag.Page != pag.PageCount) { paginationArrowRight = <MdKeyboardArrowRight onClick={() => GetUserData(tokenState, pagination.Page * 10 + 1)} /> }

    return (
        <div>
            <Table striped bordered hover id='tabla'>

                {(location.pathname === '/contacts') ? (
                    <thead>
                        <tr>
                            <th className='row-ex-ch'>ID </th>
                            <th className='row-gde'>Contacto  </th>
                            <th className='row-mdno'>Pais/Region </th>
                            <th className='row-mdno'>Compania </th>
                            <th className='row-mdno'>Cargo </th>
                            <th className='row-mdno'>Interes </th>
                            <th className='row-ex-ch'>Acciones</th>
                        </tr>
                    </thead>



                ) : (location.pathname === '/users') ? (
                    <thead>
                        <tr>
                            <th className='row-ex-ch'>User ID </th>
                            <th className='row-mdno'> Datos Usuario </th>
                            <th className='row-mdno'>Telefono </th>
                            <th className='row-gde'> Permisos </th>
                            <th className='row-ex-ch'>Acciones</th>


                        </tr>
                    </thead>

                ) : (
                            <thead>
                                <tr>
                                    <th className='row-ex-ch'>ID </th>
                                    <th className='row-mdno'>Nombre </th>
                                    <th className='row-mdno'>Ciudad</th>
                                    <th className='row-mdno'> Direccion </th>
                                    <th className='row-mdno'>Telefono </th>
                                    {/* <th className='row-mdno'> Mail </th> */}
                                    <th className='row-ex-ch'>Acciones</th>

                                </tr>
                            </thead>

                        )}


                <tbody>
                    {info?.map((data, key) => (
                        <TableRows key={key} data={data} where={location.pathname} displayEditContacts={displayEditContacts} />
                    ))}
                </tbody>
            </Table>
            {/* <div>
                <label> {pagination.Page} - {pagination.PageCount} Pags. </label>
                <span>{paginationArrowLeft}</span>
                <span>{paginationArrowRight}</span>
            </div> */}
        </div>
    )
}
export default TableComp;