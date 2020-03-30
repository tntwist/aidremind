import React, { useState, useEffect } from "react";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from "react-router-dom"
import BlurCircularIcon from '@material-ui/icons/BlurCircular';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Typography from '@material-ui/core/Typography';
import moment from 'moment';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import { Grid } from "@material-ui/core";
import { clerkApi } from "../services/api"

function Tasks(props) {

    useEffect(() => {
        fetchData(1);
    }, [])

    const fetchData = (usedId) => {
        clerkApi.get("/TaskActivities/Upcoming?userId=" + usedId).then(
            res => {
                setTaskActivities(res.data);
            }
        ).catch(err => {
            console.log(err)
        })
    }

    const [taskActivities, setTaskActivities] = useState([]);

    const timeleft = (time) => {
        return moment(time).fromNow();
    }

    const addTask = () => {
        console.log("add Task")
    }

    return (
        <div>
            {console.log(taskActivities), taskActivities &&
                <List component="nav">
                    {taskActivities.map(taskActivitie => (
                        <ListItem key={taskActivitie.taskActivityId} button component={Link} to={`/task/${taskActivitie.taskActivityId}`}>
                            <ListItemIcon>
                                <BlurCircularIcon />
                            </ListItemIcon>
                            <ListItemText
                                primary={taskActivitie.task.title}
                                secondary={<Typography color="secondary" variant="body1">{timeleft(taskActivitie.due_to_date)}</Typography>} />
                        </ListItem>
                    ))}
                </List>
            }
            <Grid container justify="center">
                <Grid item>
                    <AddCircleIcon color="primary" fontSize="large" onClick={() => addTask()} />
                </Grid>
            </Grid>

        </div >
    );


}

export default Tasks;