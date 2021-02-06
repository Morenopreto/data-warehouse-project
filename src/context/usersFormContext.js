import { createContext, useState, useContext, useEffect } from 'react';
import { LogInContext } from './logInContext'



export const UserFormContext = createContext();


const UserFormProvider = ({ children }) => {
    const { tokenState, userMail, GetUserData } = useContext(LogInContext);
    const [allUser, setAllUsers] = useState([]);
    const [fetchStatus, setFetchStatus] = useState(null)
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${tokenState}`);


    const addUser = (data) => {
        setFetchStatus('fetching');
        var raw = JSON.stringify(data);
        // myHeaders.append("Authorization", `Bearer ${tokenState}`);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`http://localhost:9000/users/newUser`, requestOptions)
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

    const getAllUsers = () => {

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch(`http://localhost:9000/users?mail=${userMail}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                if (!!result.data[0]?.user_id) {
                    setAllUsers(result.data)
                }
                console.log(result.data)
            })
            .catch(error => console.log('error', error));
    }
    const modifyPermissions = (id, changes) => {

        let raw = JSON.stringify(changes)
        var requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };
        console.log(raw)
        fetch(`http://localhost:9000/users/${id}`, requestOptions)
            .then(response => response.json())
            .then(result => {
                getAllUsers()
                console.log(result)
            })
            .catch(error => console.log('error', error));
    }
    ///////CONTACTOS
    const addContact = (data) => {
        var raw = JSON.stringify(data);
        console.log(raw)
        // myHeaders.append("Authorization", `Bearer ${tokenState}`);
        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`http://localhost:9000/contacts/newContact`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
            })
            .catch(error => console.log('error', error));
    }
    const modifyContact = (id, changes) => {

        let raw = JSON.stringify(changes)
        var requestOptions = {
            method: 'PATCH',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch(`http://localhost:9000/contacts/${id}/modify`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                GetUserData(tokenState, 1)
            })
            .catch(error => console.log('error', error));
    }
    const deleteFromDB = (id,where) => {

        var requestOptions = {
            method: 'DELETE',
            headers: myHeaders,
            redirect: 'follow'
        };
        fetch(`http://localhost:9000/${where}/${id}/delete?eliminado=true`, requestOptions)
            .then(response => response.json())
            .then(result => {
                console.log(result)
                if(where==='contacts'){
                    GetUserData(tokenState, 1)
                }else if(where==='users'){
                    getAllUsers()
                }
            })
            .catch(error => console.log('error', error));
    }

    return (
        <UserFormContext.Provider
            value={{
                fetchStatus: fetchStatus,
                allUser: allUser,
                addUser: addUser,
                getAllUsers: getAllUsers,
                modifyPermissions: modifyPermissions,
                addContact: addContact,
                modifyContact: modifyContact,
                deleteFromDB: deleteFromDB
            }}
        >
            {children}
        </UserFormContext.Provider>
    );
}
export default UserFormProvider;


