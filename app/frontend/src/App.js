import React from "react";
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Login from "./components/pages/Login";
import AuthContextProvider from "./contexts/auth";
import LangContextProvider from "./contexts/lang";
import Navbar from "./components/navbar/Navbar";
import LocalStorageContextProvider from "./contexts/local-storage";

const App = props => {
  return (
    <LocalStorageContextProvider>
      <AuthContextProvider>
        <LangContextProvider>
          <div className="App">
            <BrowserRouter>
              <Route component={Navbar} />
              <Switch>  
                <Route exact path="/login" component={Login}/>
              </Switch>
            </BrowserRouter>
          </div>
        </LangContextProvider>
      </AuthContextProvider>
    </LocalStorageContextProvider>
  );
};

export default App;