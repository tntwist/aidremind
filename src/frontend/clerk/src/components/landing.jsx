import React from "react";
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import { Box } from "@material-ui/core";

class Landing extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: null
        }
        this.login = this.login.bind(this);
    }

    login() {
        console.log("login" + this.refs)
    }

    render() {
        return (
            <div>
                <Box>
                    <form noValidate autoComplete="off">
                        <TextField ref="username" id="standard-basic" label="Benutzername" />
                    </form>
                </Box><br></br>
                <Box spacing={2}>
                    <Button component={Link} onClick={() => this.login()} to={'/tasks'} variant="contained" color="primary" disableElevation>
                        Anmelden
                </Button>
                </Box>
            </div>
        );
    }
}

export default Landing;