import './App.css';
import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Login from '../Login';
import Dashboard from '../Dashboard/dashboard';
import { Provider } from 'react-redux';
import { store } from '../../../config/redux';
import DataSiswa from '../DataSiswa';
import Absensi from '../Absensi';

function App() {
  return (
    <Provider store={store}>
      <Router>
      <div>
          <Route exact path="/" component={Login} />
          <Route path="/dashboard" component={Dashboard} />
          <Route path="/datasiswa" component={DataSiswa} />
          <Route path="/absensi" component={Absensi} />
      </div>
      </Router>
    </Provider>
   
  );
}

export default App;
