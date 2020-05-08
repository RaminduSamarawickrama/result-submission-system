import React, {useState} from 'react';

import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import {TextField} from "@material-ui/core";
import {Grid} from "@material-ui/core";
import S3FileUpload from 'react-s3';
import {config} from '../configuration/config'

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            <div color="inherit" >
                Developed by Ramindu Samarawickrama
            </div>{' '}
            {"Version 1.1"}
        </Typography>
    );
}

const useStyles = makeStyles((theme) => ({
    appBar: {
        position: 'relative',
    },
    layout: {
        width: 'auto',
        marginLeft: theme.spacing(2),
        marginRight: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
            width: 600,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(1),
    },
    paper: {
        marginTop: theme.spacing(3),
        marginBottom: theme.spacing(3),
        padding: theme.spacing(2),
        [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
            marginTop: theme.spacing(6),
            marginBottom: theme.spacing(6),
            padding: theme.spacing(3),
        },
    },
    buttons: {
        display: 'flex',
        justifyContent: 'flex-end',
    },
    button: {
        marginTop: theme.spacing(3),
        marginLeft: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));

export default function StudentFileUpload () {

    const [file,setFile] = useState({});

    const fileSelected = (e) =>{
        setFile(e.target.files[0]);
    };
    const btnProceedClicked = () => {
        if(!file.name){
            alert('Upload a file before proceeding!');
        }else{
            S3FileUpload
                .uploadFile(file, config)
                .then(data => {
                    alert(`Successfully submitted ${data.key}`);
                    setFile({});
                })
                .catch(err => alert('An error occurred, document not submitted'))
        }
    };
    const classes = useStyles();

    return (
        <React.Fragment>
            <CssBaseline />

            <AppBar position="absolute" color="default" className={classes.appBar}>
                <Toolbar>
                    <Typography variant="h6" color="inherit" noWrap>
                        Examination Answer Sheet Submission
                    </Typography>
                </Toolbar>
            </AppBar>

            <main className={classes.layout}>
                <Paper className={classes.paper}>
                    <Typography component="h1" variant="h4" align="center">
                        Submit Your Answer Sheet
                    </Typography>
                    <form className={classes.form} noValidate>
                        <Grid container spacing={3}>
                            <Grid item xs={6}>
                                <TextField fullWidth label='Enter name here (Ex: Ramindu)' />
                            </Grid>
                            <Grid item xs={6}>
                                <TextField fullWidth label='Enter batch here (Ex: 37) ' />
                            </Grid>
                            <Grid item xs={6}>
                                <Button component="label" >
                                    {file.name? file.name : 'Click here to upload'}
                                    <input type="file" style={{ display: "none" }} onChange={fileSelected}/>
                                </Button>
                            </Grid>

                        </Grid>

                        <Button fullWidth variant="contained" color="primary" className={classes.button} onClick={btnProceedClicked}>
                            Proceed
                        </Button>
                    </form>
                </Paper>
                <Copyright />
            </main>
        </React.Fragment>

    );
}
