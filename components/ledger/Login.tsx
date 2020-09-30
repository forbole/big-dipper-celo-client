import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import ControlButtons from "./ControlButtons";
import IconButton from '@material-ui/core/IconButton';
import LedgerCelo from './LedgerCelo'
import CircularProgress from '@material-ui/core/CircularProgress';
import Alert from '@material-ui/lab/Alert';
import {
    deserializeError,
    DisconnectedDevice,
    DisconnectedDeviceDuringOperation
} from "@ledgerhq/errors";

const useStyles = makeStyles({

    root: {
        justifyContent: "center",
    },

    title: {
        display: "block",
        textAlign: "center",
        paddingTop: "0.3rem",
    },

    message: {
        margin: "0 0.5rem 0.5rem 0.5rem",
    },
    errorMessage: {
        color: "red",
        textAlign: "center",
        paddingBottom: "1rem"
    },
    loginButton: {
        background: "rgba(153, 153, 153, 1)",
        borderRadius: 5,
        padding: "0.1rem",
        verticalAlign: "middle",
        "&:hover, &.Mui-focusVisible": { backgroundColor: "rgba(58, 211, 158, 0.5)" }
    },

});



const Login = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [loggedIn, setLoggedIn] = React.useState(false);
    const [retry, setRetry] = React.useState(false);



    const handleLogin = async () => {
        if (!loggedIn) {
            setLoading(true);
            setOpen(true);
            try {
                await LedgerCelo.connect()
                if (await LedgerCelo.connect() === true) {
                    setErrorMessage("Please accept the connection in your Ledger device")
                    let userAddress = await LedgerCelo.getAddress()
                    try {
                        let ver = await LedgerCelo.getCeloAppVersion()
                    }
                    catch (e) {
                        setErrorMessage(e.message)
                        console.log(e.message)
                    }
                    setOpen(false);
                    setLoggedIn(true);
                }

            }
            catch (e) {
                setErrorMessage(LedgerCelo.checkLedgerErrors(e.message))
                setRetry(true)
            }

        }
        else {
            try {
                LedgerCelo.disconnect();
                setLoggedIn(false)
                setOpen(false);

            }
            catch (e) {
                setErrorMessage(e.message)

            }
        }
    };


    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <IconButton
                aria-label="Login"
                onClick={handleLogin}
                className={classes.loginButton}
            >
                {!loggedIn ? <img src="/images/connect-ledger.svg" /> : <img src="/images/logout.svg" />}

            </IconButton>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="ledger-dialog"
                //fullWidth
                maxWidth="sm"
            >
                <DialogTitle id="ledger-dialog-signin-title">
                    <Grid container className={classes.root}>
                        <Grid item xs={12}>
                            <Typography
                                variant="h6"
                                noWrap
                                className={classes.title}
                            >
                                Sign in with Ledger
              </Typography>
                        </Grid>
                        {loading ? <CircularProgress color="secondary" /> : ''}

                    </Grid>
                </DialogTitle>
                <DialogContent >
                    <Grid container spacing={1} className={classes.root}>
                        <DialogContentText id="signin-ledger">

                            <Grid item xs={12} className={classes.message}>
                                <Typography variant="body2">
                                    Please make sure your Ledger device is connected and Celo
                                    App 1.0.3 or above is opened.
                  </Typography>
                            </Grid>
                            <Grid item xs={12} className={classes.errorMessage}>
                                <Typography variant="body2">
                                    {errorMessage}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} >
                                {retry ? <ControlButtons retry={true} /> : null}
                            </Grid>
                        </DialogContentText>
                    </Grid>
                </DialogContent>
            </Dialog>

        </>
    );
};


export default Login