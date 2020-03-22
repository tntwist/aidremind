import React, { useState, useEffect } from "react";
import { tasksService } from "../api/tasks";
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import history from "../services/history";
import { Link } from "react-router-dom";

function Task({ match }) {

    useEffect(() => {
        getTask();
    }, [])

    const getTask = async () => {
        const task = tasksService.getTask(match.params.id)
        setTask(task)
    }

    const [task, setTask] = useState([]);

    const unsubscribe = () => {
        console.log("unsubscribe")
    }

    return (
        <div>
            <Box align="left">
                <Typography gutterBottom variant="h4" color="secondary">
                    {task.title}
                </Typography>
                <Typography color="secondary" variant="body1">
                    {task.description}
                </Typography>
            </Box>
            <div className="taskMenu">
                <Box>
                    <Grid container direction="row" justify="space-between" alignItems="center">
                        <Grid item>
                            <Button component={Link} to={'/tasks'} variant="contained" color="primary" disableElevation>
                                Zurück
                            </Button>
                        </Grid>
                        <Grid item>
                            <Button component={Link} to={'/tasks'} onClick={() => unsubscribe()} variant="contained" color="primary" disableElevation>
                                Abmelden
                        </Button>
                        </Grid>
                    </Grid>
                </Box>
            </div>
        </div >
    );
}

export default Task;