
import axios from 'axios';
import React, { useState, useEffect } from "react";
import { BrowserRouter as Redirect,NavLink, Route, Link ,Routes,Switch} from 'react-router-dom';
import { useNavigate } from "react-router";

export default function CreateTask(){
//Setting initial state
    const [task_description,settask_description]=useState("");
    const [task_name,settask_name]=useState("");
    const [task_status,settask_status]=useState("");
    const history = useNavigate();
  
//Change handlers for input fields
  const  onChangeTaskDescription = e => {
        settask_description( e.target.value );
    }

  const  onChangeTaskName = e => {
        settask_name(  e.target.value );
    }

   const onChangeTaskPriority = e => {
        settask_status(e.target.value );
    }
//submitting the inoputs
   const onSubmit = e => {
        e.preventDefault();


        const obj = {
            task_description: task_description,
            task_name: task_name,
            task_status: task_status?task_status:"inprogress",
           
        }
//API call to backend with inputted data
        axios.post('http://localhost:4000/tasks/add', obj)
            .then( res => console.log(res.data));
        
            settask_description("");
            settask_name("");
            settask_status("");
            alert('Task is created successfully');
            history("/")
    }
        return (
            <div style={{marginTop: 20}}>
                <h3>Add New Task</h3>
                <form onSubmit = {onSubmit}>
                <div className="form-group">
                        <label>Name: </label>
                        <input type="text"
                                className="form-control"
                                value={task_name}
                                onChange={onChangeTaskName}
                                required
                                />
                                
                    </div>
                    <div className="form-group">
                        <label>Description: </label>
                        <input type="text"
                                className="form-control"
                                value={task_description}
                                onChange={onChangeTaskDescription}
                                required
                                />

                    </div>
                   
                    <div className="form-group">
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="priorityOptions"
                                    id="priorityLow"
                                    value="completed"
                                    checked={task_status === "completed"}
                                    onChange={onChangeTaskPriority}
                                    />
                            <label className="form-check-label">Completed</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="priorityOptions"
                                    id="priorityMedium"
                                    value="inprogress"
                                    checked={task_status === "inprogress"}
                                    onChange={onChangeTaskPriority}
                                    />
                            <label className="form-check-label">Inprogress</label>
                        </div>
                        <div className="form-check form-check-inline">
                            <input  className="form-check-input"
                                    type="radio"
                                    name="priorityOptions"
                                    id="priorityHigh"
                                    value="failed"
                                    checked={task_status === "failed"}
                                    onChange={onChangeTaskPriority}
                                    />
                            <label className="form-check-label">Failed</label>
                        </div>
                    </div> 
                    <div className="form-group">
                        <input type="submit" value="Create Todo" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    
}