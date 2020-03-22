import React, { useState, useEffect } from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from "react-router-dom";
import { tasksService } from "../api/tasks";
import BlurCircularIcon from '@material-ui/icons/BlurCircular';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Grid } from "@material-ui/core";

function Tasks(props) {

    useEffect(() => {
        setTasks(tasksService.getTaskActivities())
    }, [])

    const [tasks, setTasks] = useState([]);

    const timeleft = (time) => {
        return moment(time).fromNow();
    }

    const addTask = () => {
        console.log("add Task")
    }

    return (
        <div>
            <List component="nav">
                {tasks.map(taskActivitie => (
                    <ListItem key={taskActivitie.id} button component={Link} to={`/task/${taskActivitie.task_id}`}>
                        <ListItemIcon>
                            <BlurCircularIcon />
                        </ListItemIcon>
                        <ListItemText primary={taskActivitie.task.title} />
                        <ListItemSecondaryAction>
                            <Typography color="secondary" variant="body1">
                                {timeleft(taskActivitie.due_to_date)}
                            </Typography>
                        </ListItemSecondaryAction>
                    </ListItem>
                ))}
            </List>
            <Grid container justify="center">
                <Grid item>
                    <AddCircleIcon color="primary" fontSize="large" onClick={() => addTask()} />
                </Grid>
            </Grid>
        </div >
    );


}

export default Tasks;