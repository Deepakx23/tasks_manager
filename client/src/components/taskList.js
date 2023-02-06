
import { Link } from 'react-router-dom';
import axios from 'axios';
import React, { useState, useEffect } from "react";



export default function TasksList() {
const [tasks,settasks]=useState([]);
const [filtered,setfiltered]=useState([])
   

 //fetching tasklists from api which will be populated in table
useEffect(()=>{
        axios.get('http://localhost:4000/tasks')
            .then( res => {
              settasks(res.data)
            })
            .catch( err => console.log(err));
    },[])
   //filtering the table based on the task name
    const filterIssues = (e) => {
        const value = e.target.value.toLowerCase();
        const tasks_filtered = tasks.filter((item) => item.task_name.toLowerCase().includes(value));
        setfiltered(tasks_filtered);
      }

      useEffect(()=>{
        setfiltered(tasks)
    },[tasks])   
   


   
        return (
            <div>
                <h3>Tasks List</h3>
                Filter:
                <input  onChange={(e) => filterIssues(e)}/>
                <table className="table table-striped" style={{ marginTop: 20}}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        { filtered.map((task,index)=>(
                            <tr key={index}>
         <td >{task.task_name}</td>
        <td >{task.task_description}</td>
        <td className = { task.task_status=="completed" ? 'completed' : (task.task_status=="inprogress"?"completedy":"completedr")}>{task.task_status}</td>
        <td>
            <Link to={"/edit/" + task._id}>Edit</Link>
        </td>
    </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )
    
}