import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import ControlButtons from './ControlButtons';

const useStyles = makeStyles({
    root: {
        justifyContent: 'center'
    },

    title: {
        display: 'block',
        textAlign: 'center',
        paddingTop: '0.3rem'
    },

    message: {
        margin: '0 0.5rem 1.5rem 0.5rem'
    }
});

const SignInMessage = (): JSX.Element => {
    const classes = useStyles();

    return (
        <>
            <DialogTitle id="ledger-dialog-signin-title">
                <Grid container className={classes.root}>
                    <Grid item xs={12}>
                        <Typography variant="h6" noWrap className={classes.title}>
                            Sign in with Ledger
                        </Typography>
                    </Grid>
                </Grid>
            </DialogTitle>
            <DialogContent>
                <Grid container spacing={1} className={classes.root}>
                    <DialogContentText id="signin-ledger">
                        <Grid item xs={12} className={classes.message}>
                            <Typography variant="body2">
                                Please make sure your Ledger device is connected and Celo App 1.5.0
                                or above is opened.
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <ControlButtons />
                        </Grid>
                    </DialogContentText>
                </Grid>
            </DialogContent>
        </>
    );
};

export default SignInMessage;
