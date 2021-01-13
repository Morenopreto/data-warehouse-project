import React, { useContext, useState } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import './App.css';
import NavbarComp from './components/navbar';
import Login from './components/login';
import TableComp from './components/table';
import UserForm from './components/UserForm';
import { LogInContext } from '../src/context/logInContext';
import UserProvider from '../src/context/userContext';



function App() {

  const { isAuthenticated } = useContext(LogInContext)
  console.log(isAuthenticated)

  if (!isAuthenticated) {
    return (
      //agregar un if que si ya esta inciado sesion, haga redirect a        <Redirect to='/contacts' />

      <div className="App">
        <Login />
      </div>
    );
  } else {
    return (

      // <BrowserRouter>
      //   <NavbarComp />
      //   <Redirect to='/contacts' />
      // </BrowserRouter>

      <UserProvider>
        <BrowserRouter>
          <Redirect to='/contacts' />
          <div className="App">
            <NavbarComp />

            <Switch>
              {/* <Route exact path='/' ><Home greeting="Esto va a ser el home" /></Route> */}
              <Route exact path='/contacts' ><TableComp /></Route>
              <Route exact path='/users' ><UserForm /></Route>
              <Route exact path='/users' ><TableComp /></Route>



              {/* <Route path='/categories/:id_categories/:id_producto'><ItemDetailContainer /></Route>

              <Route path='/categories/:id_categories'><ProductList /></Route>

              <Route path='/categories'><Categories /></Route>

              <Route path='/carrito'><Cart /></Route> */}
              <Route ><h1>Page not found</h1></Route>
            </Switch>
            <h2>Footer</h2>
          </div>

        </BrowserRouter>
      </UserProvider>
    );
  }
}

export default App;
