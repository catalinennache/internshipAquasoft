import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {Provider} from 'react-redux';
import EmployeesComponent from './components/Employees';
import ProjectsComponent from './components/Projects';
import store from './redux/store'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navigation from './components/Navi'
import axios from 'axios'
import Config from './configuration'

axios.post(Config.API_URL,{
  query:Config.QUERIES.INITIAL_DATA,
  headers:{"Content-type":"application/json"}
}).then((result)=>{
console.log(result.data.data)
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store({employees:result.data.data.getAllEmployees, projects:result.data.data.getAllProjects})}>
      <Router>
        <Route exact path = "/" component = {App}/>
        <Route exact path = "/projects">
          <ProjectsComponent/>
        </Route>
        <Route exact path = "/employees">
          <EmployeesComponent/>
        </Route>

        <Navigation/>
      </Router>
    </Provider>

  </React.StrictMode>,
  document.getElementById('root')
);
})

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
