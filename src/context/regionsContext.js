import { createContext, useState, useContext, useEffect } from 'react';
import { LogInContext } from './logInContext'
import { UserTableContext } from './userTableContext';



export const RegionsContext = createContext();


const RegionsProvider = ({ children }) => {
    const { tokenState } = useContext(LogInContext);
    const { GetCountryData } = useContext(UserTableContext);
    const [allRegions, setAllRegions] = useState([]);
    const [fetchStatus, setFetchStatus] = useState(null)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${tokenState}`);


    const addRegions = (data) => {
        setFetchStatus('fetching');
        var raw = JSON.stringify(data);
        // myHeaders.append("Authorization", `Bearer ${tokenState}`);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`http://localhost:9000/regions/newRegion`, requestOptions)
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
    // pueded que no vaya porque esta GetCountryData desde usertable context.
    const getAllRegions = () => {

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch(`http://localhost:9000/companies`, requestOptions)
            .then(response => response.json())
            .then(result => {
                setAllRegions(result.data)
                console.log(result.data)
            })
            .catch(error => console.log('error', error));
    }

    const modifyRegions = (id, where, changes) => {
        console.log('changes')
        console.log(changes)
        console.log('changes')
        let raw = JSON.stringify(changes)
        var requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`http://localhost:9000/${where}/${id}/modify`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                GetCountryData()
                // GetUserData(tokenState, 1)
            })
            .catch(error => console.log('error', error));
    }
    const deleteFromDB = (id, where) => {

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch(`http://localhost:9000/${where}/${id}/delete?eliminado=true`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                GetCountryData()
                // getAllRegions(tokenState, 1)

            })
            .catch(error => console.log('error', error));
    }


    return (
        <RegionsContext.Provider
            value={{
                fetchStatus: fetchStatus,
                allRegions: allRegions,
                addRegions: addRegions,
                modifyRegions: modifyRegions,
                getAllRegions: getAllRegions,
                deleteFromDB: deleteFromDB

            }}
        >
            {children}
        </RegionsContext.Provider>
    );
}
export default RegionsProvider;


