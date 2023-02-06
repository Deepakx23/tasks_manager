import React, { Component } from 'react';
import { BrowserRouter as Router,NavLink, Route, Link ,Routes,Switch} from 'react-router-dom';

import TasksList from './components/taskList';
import CreateTask from './components/createTask';
import EditTask from './components/updateTask';


import logo from './logo.svg';

function App() {

    return (
      
        <div className="container">
           
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <NavLink to="/" className="navbar-brand"><h3>Task Manager</h3></NavLink> 
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#myNavbar" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="myNavbar">
              <ul className="navbar-nav mr-auto">
                <li className="navbar-item">
                  <NavLink to="/" className="nav-link">Tasks</NavLink>
                </li>
                <li className="navbar-item">

                  <NavLink to="/create" className="nav-link">Create Tasks</NavLink>
                </li>
              </ul>
            </div>

          </nav>
          <Routes>
          <Route path='/' exact element={<TasksList/>}  />
          <Route path='/edit/:id' element={<EditTask/>}  /> 
          <Route path='/create' element={<CreateTask/>}  /> 
          </Routes>
        </div>
     
    );
  
}

export default App;
