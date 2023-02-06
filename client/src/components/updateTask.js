
import axios from 'axios';
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useParams } from "react-router-dom";

export default function EditTask(props) {
    //using useparam hook to fetch url params
    let { id } = useParams(); 
//setting initial state
    const [task_description,settask_description]=useState("");
    const [task_name,settask_name]=useState("");
    const [task_status,settask_status]=useState("")
    const history = useNavigate();
  //making api call to fetch data based on id
useEffect(()=>{
    axios.get('http://localhost:4000/tasks/' + id)
    .then( res => {

            settask_description(res.data.task_description);
            settask_name(res.data.task_name);
            settask_status(res.data.task_status);
            
    })
    .catch( err => console.log(err));
},[])
//change handlers for all inputs
const  onChangeTaskDescription = e => {
    settask_description( e.target.value );
}

const  onChangeTaskName = e => {
    settask_name(  e.target.value );
}

const onChangeTaskPriority = e => {
    settask_status(e.target.value );
}

 
   const onSubmit = (e) => {
        e.preventDefault();
        const obj = {
            task_description: task_description,
            task_name: task_name,
            task_status: task_status
        };
        //sending updated api data to backend
        axios.post('http://localhost:4000/tasks/update/' +id, obj)
            .then( res => console.log(res.data));
            alert("task is updated successfully");
            history("/")
    }


        return (
            <div>
                <h3>Update Todo</h3>
                <form onSubmit={onSubmit}>
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
                        <br />
                        <div className="form-group">
                            <input type="submit" value="Update Todo" className="btn btn-primary" />
                        </div>
                </form>
            </div>
        )
    
}