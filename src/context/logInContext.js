import { createContext, useState, useRef, useEffect } from 'react';


export const LogInContext = createContext();


const LogInProvider = ({ children }) => {

    const [isAuthenticated, userHasAuthenticated] = useState(false);
    const [infoContacts, setInfoContacts] = useState([]);
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const LogIn = (mail, pass) => {

        var raw = JSON.stringify({ "mail": mail.toLowerCase(), "pass": pass.toLowerCase() });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:9000/users/login", requestOptions)
            .then(response => response.json())
            .then(result => {
                userHasAuthenticated(result.data.isAuthenticated)
                sessionStorage.setItem('Token', result.data.token);
                GetUserData(result.data.token)
            })
            .catch(error => console.log('error', error));
    }

    const GetUserData = (tokenData) => {
        myHeaders.append("Authorization", `Bearer ${tokenData}`);
        // myHeaders.append("Content-Type", "application/json");

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
    const Session = () => {


    }






    return (
        <LogInContext.Provider
            value={{
                LogIn: LogIn,
                isAuthenticated: isAuthenticated,
                userHasAuthenticated: userHasAuthenticated,
                infoContacts: infoContacts
            }}
        >
            {children}
        </LogInContext.Provider>
    );
}
export default LogInProvider;


