import { createContext, useState, useRef, useEffect } from 'react';


export const UserContext = createContext();


const UserProvider = ({ children }) => {

    const [token, setToken] = useState(false);
    const [infoContacts, setInfoContacts] = useState([]);

    // useEffect(() => {
    //     setToken(sessionStorage.getItem('Token'))
    //     GetUserData(token)
    // }, [sessionStorage.getItem('Token')])



    const GetUserData = (token) => {

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Bearer ${token}`);
        myHeaders.append("Content-Type", "application/json");

        var requestOptions = {
            method: 'GET',
            headers: myHeaders,
            redirect: 'follow'
        };

        fetch("http://localhost:9000/contacts", requestOptions)
            .then(response => response.json())
            .then(result => {
                setInfoContacts(result.data)
                console.log(result.data)
            })
            .catch(error => console.log('error', error));
    }

    return (
        <UserContext.Provider
            value={{
                infoContacts: infoContacts
            }}
        >
            {children}
        </UserContext.Provider>
    );
}
export default UserProvider;


