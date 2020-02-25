import React from 'react';
import {AppBar} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles';
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import { Add } from "@material-ui/icons";

import PGATable from './Components/PGATable'
import Container from "@material-ui/core/Container";

import "./App.css"

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

function App() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleMenu = event => {
        setAnchorEl(event.currentTarget);
        this.setState({
            showModal: true
        })
    };

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        PGA Code Challenge
                    </Typography>
                    <IconButton
                        aria-label="add golfer"
                        aria-controls="menu-appbar"
                        aria-haspopup="true"
                        onClick={handleMenu}
                        color="inherit"
                    >
                        <Add />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Container className="App-body">
                <PGATable/>
            </Container>
        </div>
    );
}

export default App;
