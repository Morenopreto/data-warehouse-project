import React, { useContext, useState } from 'react';
import { LogInContext } from '../context/logInContext'
import { Table } from 'react-bootstrap';
import { BsArrowUpDown } from 'react-icons/bs';
import UsersRows from './usersRow'
import './css/table.css'

function TableComp() {
    const { infoContacts } = useContext(LogInContext);
    const [hiddenSearch, setHiddenSearch] = useState(true);
    const [checkedState, setCheckedState] = useState(false);

    const hiddenSearchModify = (e) => {
        console.log(e.target.localName === 'input' && hiddenSearch === false)
        if (e.target.localName === 'input' && hiddenSearch === false) {
            console.log('entro')
            setHiddenSearch(true)
        } else {
            hiddenSearch ? setHiddenSearch(false) : setHiddenSearch(true);
        }
    }
    const changeCheckedState = (e) => {
        console.log('este ' + e.target.checked)
        setCheckedState(e.target.checked);

    }

    return (
        <div>
            <h1>Contactos</h1>
            <div className='div-input-search'>
                <input type='text' className='input-search' onClick={(e) => hiddenSearchModify(e)} />
                <i class="fas fa-caret-down" onClick={(e) => hiddenSearchModify(e)}></i>
            </div>
            <div>
                <ul className='search-ul-blue-pills'>
                    <li className='search-blue-pill'>Argentina</li>
                    <li className='search-blue-pill'>Pluscargo</li>
                </ul>
            </div>
            <form className='search-form' hidden={hiddenSearch}>
                <div className='search-form-divs'>
                    <label>Nombre contacto:</label>
                    <input type='text' className='search-form-inputs' placeholder='Introduce el nombre del contacto.' />
                </div>
                <div className='search-form-divs'>
                    <label>Cargo:</label>
                    <input type='text' className='search-form-inputs' placeholder='Introduce el cargo del contacto.' />
                </div>
                <div className='search-form-divs'>
                    <label>Pais/Region:</label>

                    <select name="country" className='search-form-selects' id="countries">
                        <option value="volvo">Todos</option>
                        <option value="volvo">Argentina</option>
                        <option value="saab">Brasil</option>
                    </select>
                </div>
                <div className='search-form-divs'>

                    <label>Compania:</label>
                    <select name="company" className='search-form-selects' id="companies">
                        <option value="volvo">Todas</option>
                        <option value="volvo">Pluscargo</option>
                        <option value="audi">Moontravel</option>
                    </select>
                </div>
                <div className='search-form-divs'>

                    <label>Canal Favorito:</label>
                    <select name="favourite" className='search-form-selects' id="favourites">
                        <option value="volvo">Cualquiera</option>
                        <option value="mercedes">whataspa</option>
                        <option value="audi">textmessage</option>
                    </select>
                </div>
                <div className='search-form-divs'>
                    <label>Interes:</label>
                    <select name="interest" className='search-form-selects' id="interests">
                        <option value="volvo">Cualquiera</option>
                        <option value="mercedes">ni idea</option>
                        <option value="audi">otra opcion</option>
                    </select>
                </div>

            </form>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th className='row-ex-ch'><input type="checkbox" onChange={(e) => changeCheckedState(e)} /></th>
                        <th className='row-gde'>Contacto <BsArrowUpDown /> </th>
                        <th className='row-mdno'>Pais/Region <BsArrowUpDown /></th>
                        <th className='row-mdno'>Compania <BsArrowUpDown /></th>
                        <th className='row-mdno'>Cargo <BsArrowUpDown /></th>
                        <th className='row-ch-mdno'>Canal Preferido <BsArrowUpDown /></th>
                        <th className='row-mdno'>Interes <BsArrowUpDown /></th>
                        <th className='row-ex-ch'>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {infoContacts?.map((data, key) => (
                        <UsersRows key={key} data={data} checkedState={checkedState} />
                    )

                    )}
                </tbody>
            </Table>
        </div>
    )
}
export default TableComp;