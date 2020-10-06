import React, { useEffect } from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
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
import Link from "../Link";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
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
            "&:hover, &.Mui-focusVisible": { backgroundColor: "rgba(58, 211, 158, 0.5)" },
            [theme.breakpoints.up('lg')]: {
                marginRight: "2rem",
            },
        },
        loggedIn: {
            background: "rgba(153, 153, 153, 1)",
            borderRadius: 5,
            padding: "0.1rem",
            verticalAlign: "middle",
            "&:hover, &.Mui-focusVisible": { backgroundColor: "rgba(58, 211, 158, 0.5)" },
            display: "inline-flex",
            [theme.breakpoints.up('md')]: {
                marginRight: "1rem",
                marginLeft: "-0.5rem"
            },
            [theme.breakpoints.down('sm')]: {
                marginRight: "1rem",
                marginLeft: "4.5rem"
            },
        }
    }),
);


const Login = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [retry, setRetry] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState('' || null);

    useEffect(() => {
        let localUser = localStorage.getItem('currentUserAddress');
        return () => {
            // @ts-ignore
            setCurrentUser(localUser)
        };
    });

    const handleLogin = async () => {
        if (!currentUser) {
            setLoading(true);
            setOpen(true);
            setErrorMessage("Connecting...")
            setRetry(false)
            try {
                await LedgerCelo.connect()
                if (await LedgerCelo.connect() === true) {
                    setErrorMessage("Please accept the connection in your Ledger device")
                    let userAddress = await LedgerCelo.getAddress()
                    localStorage.setItem('currentUserAddress', userAddress)
                    setCurrentUser(userAddress)
                    try {
                        let ver = await LedgerCelo.getCeloAppVersion()
                    }
                    catch (e) {
                        setErrorMessage(e.message)
                    }
                    setOpen(false);
                }

            }
            catch (e) {
                setErrorMessage(LedgerCelo.checkLedgerErrors(e.message))
                setRetry(true);
            }

        }
        else if (currentUser) {
            try {
                LedgerCelo.disconnect();
                localStorage.removeItem('currentUserAddress')
                setCurrentUser(null)
                setOpen(false);
                setRetry(false);
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
            {currentUser != null ?
                <Link
                    href="/account/[account]/"
                    as={`../account/${currentUser}`}
                    color="secondary">
                    <IconButton
                        aria-label="Login"
                        className={classes.loggedIn}
                    >
                        <img src="/images/user-login.svg" />

                    </IconButton>
                </Link> : null}
            <IconButton
                aria-label="Login"
                onClick={handleLogin}
                className={classes.loginButton}
            >
                {currentUser === null ? <img src="/images/connect-ledger.svg" /> : <img src="/images/logout.svg" />}

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
                            {retry ? <Grid item xs={12} >
                                <ControlButtons showRetry={true} handleClick={handleLogin} handleClose={handleClose} />
                            </Grid> : null}
                        </DialogContentText>
                    </Grid>
                </DialogContent>
            </Dialog>

        </>
    );
};


export default Login