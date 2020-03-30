import React, { useState, useEffect } from "react";
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { Link } from "react-router-dom";
import moment from 'moment';
import { clerkApi } from "../services/api"

function Task({ match }) {

    useEffect(() => {
        console.log(match)
        fetchData(1);
    }, [])

    const fetchData = (taskActivitieId) => {
        clerkApi.get("/TaskActivities/" + taskActivitieId).then(
            res => {
                console.log(res)
                setTaskActivitie(res.data);
            }
        ).catch(err => {
            console.log(err)
        })
    }

    const [taskActivitie, setTaskActivitie] = useState([]);

    const timeleft = (time) => {
        return moment(time).fromNow();
    }

    const unsubscribe = () => {
        console.log("unsubscribe")
    }

    return (
        <div>
            <Box align="left">
                <Typography gutterBottom variant="h4" color="secondary">
                    {taskActivitie.title}
                </Typography>
                <Typography color="secondary" variant="body1">
                    {taskActivitie.description}
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