import React, { useContext, useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
//COMPONENTS
import NavbarComp from './components/navbar';
import Login from './components/LoginView';
import ContactsComp from './components/ContactsView';
import UsersComp from './components/UsersView';
import CompanyView from './components/companyView';
import UserForm from './components/newUserForm/newUserForm';
import NewContacForm from './components/newUserForm/newContactForm'
import RegionsView from './components/RegionsView'
import AddRegions from './components/addRegionsView'
// CONTEXTS
import LogInProvider, { LogInContext } from '../src/context/logInContext';
import UserFormProvider from '../src/context/usersFormContext';
import UserTableProvider from '../src/context/userTableContext';
import CompaniesProvider from '../src/context/companiesContext';



function App() {

  const { isAuthenticated, userAdmin } = useContext(LogInContext)
  // console.log('isAuthenticated')
  // console.log('user admin: ' + userAdmin)

  if (!isAuthenticated) {
    return (
      //agregar un if que si ya esta inciado sesion, haga redirect a        <Redirect to='/contacts' />

      <div className="App logIn">
        <BrowserRouter>
          <Redirect to='' />
          <Login />
        </BrowserRouter>

      </div>
    );
  }
  else {
    return (

      // <BrowserRouter>
      //   <NavbarComp />
      //   <Redirect to='/contacts' />
      // </BrowserRouter>

      <div className="App">
        <UserFormProvider>
          <BrowserRouter>
            <UserTableProvider>
            <CompaniesProvider>

              {/* <Redirect to='/contacts' /> */}
              <NavbarComp userAdmin={userAdmin} />

              <Switch>
                {/* <Route exact path='/' ><Home greeting="Esto va a ser el home" /></Route> */}
                <Route exact path='/contacts/newContact' ><NewContacForm /></Route>
                <Route exact path='/contacts' ><ContactsComp /></Route>
                <Route path='/users/newUser' >{(userAdmin) ? <UserForm /> : null}</Route>
                <Route path='/users' >{(userAdmin) ? <UsersComp /> : null}</Route>
                <Route path='/companies' ><CompanyView /></Route>
                <Route path='/regions/addNew' ><AddRegions /></Route>
                <Route path='/regions' ><RegionsView /></Route>
                {/* <Route exact path='/users' ><TableComp /></Route> */}



                {/* <Route path='/categories/:id_categories/:id_producto'><ItemDetailContainer /></Route>

              <Route path='/categories/:id_categories'><ProductList /></Route>

              <Route path='/categories'><Categories /></Route>

              <Route path='/carrito'><Cart /></Route> */}
                <Route ><h1>Page not found</h1></Route>
              </Switch>
              <h2>Footer</h2>


            </CompaniesProvider>
            </UserTableProvider>
          </BrowserRouter>
        </UserFormProvider>
      </div>

    );
  }
}

export default App;
