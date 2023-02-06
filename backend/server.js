const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const taskRoutes = express.Router();
const PORT = 4000;
let Task = require('./task.model');

const app = express();

app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/tasks', { useNewUrlParser: true });
const connection = mongoose.connection;

// Once the connection is established, callback
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
});

taskRoutes.route('/').get( (req,res) => {
    Task.find((err, tasks) => {
        if(err)
            console.log(err);
        else {
            res.json(tasks);
        }
    });
});

taskRoutes.route('/:id').get((req,res) => {
    const id = req.params.id;
    Task.findById(id, (err,task) => {
        res.json(task);
    });
});

taskRoutes.route('/add').post((req,res) => {
    const task = new Task(req.body);
    task.save()
        .then( task => {
            res.status(200).json({'task': 'task added successfully'});
        })
        .catch( err => {
            res.status(400).send('adding new task failed');
        });
});

taskRoutes.route('/update/:id').post((req,res) => {
    Task.findById(req.params.id, (err, task) => {
        if(!task)
            res.status(404).send('Data is not found');
        else {
            task.task_description = req.body.task_description;
            task.task_name = req.body.task_name;
            task.task_status = req.body.task_status;
            task.save().then( task => {
                res.json('Task updated');
            })
            .catch( err => {
                res.status(400).send("Update not possible");
            });
        }
    });
});

app.use('/tasks', taskRoutes);

app.listen( PORT, () => {
    console.log("Server is running on port " + PORT);
});
