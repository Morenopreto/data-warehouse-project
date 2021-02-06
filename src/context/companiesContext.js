import { createContext, useState, useContext, useEffect } from 'react';
import { LogInContext } from './logInContext'



export const CompaniesContext = createContext();


const CompaniesProvider = ({ children }) => {
    const { tokenState } = useContext(LogInContext);
    const [allCompanies, setAllCompanies] = useState([]);
    const [fetchStatus, setFetchStatus] = useState(null)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${tokenState}`);


    const addCompany = (data) => {
        setFetchStatus('fetching');
        var raw = JSON.stringify(data);
        // myHeaders.append("Authorization", `Bearer ${tokenState}`);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`http://localhost:9000/companies/newCompany`, requestOptions)
            .then(response => response.json())
            .then(result => {
                (!result.requestInfo[0]['error']) ?
                    setFetchStatus(true) : setFetchStatus(false);
                console.log(!result.requestInfo[0]['error'])
            })
            .catch(error => {
                console.log('error', error)

                // setFetchStatus(false)
            })
            .finally(() => { setTimeout(() => { setFetchStatus(null) }, 1500) })

    }

    const getAllCompanies = () => {

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch(`http://localhost:9000/companies`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setAllCompanies(result.data)

                console.log(result.data)
            })
            .catch(error => console.log('error', error));
    }

    const modifyCompany = (id, changes) => {

        let raw = JSON.stringify(changes)
        var requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`http://localhost:9000/companies/${id}/modify`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                // GetUserData(tokenState, 1)
            })
            .catch(error => console.log('error', error));
    }
    const deleteCompanyFromDB = (id) => {

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch(`http://localhost:9000/companies/${id}/delete?eliminado=true`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)

                getAllCompanies(tokenState, 1)

            })
            .catch(error => console.log('error', error));
    }


    return (
        <CompaniesContext.Provider
            value={{
                fetchStatus: fetchStatus,
                allCompanies: allCompanies,
                addCompany: addCompany,
                modifyCompany: modifyCompany,
                getAllCompanies: getAllCompanies,
                deleteCompanyFromDB:deleteCompanyFromDB

            }}
        >
            {children}
        </CompaniesContext.Provider>
    );
}
export default CompaniesProvider;


