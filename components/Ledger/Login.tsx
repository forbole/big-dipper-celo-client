import CircularProgress from '@material-ui/core/CircularProgress';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useEffect } from 'react';

import NavLink from '../Utils/NavLink';
import ControlButtons from './ControlButtons';
import Ledger from './Ledger';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            justifyContent: 'center'
        },

        title: {
            display: 'block',
            textAlign: 'center',
            padding: '1rem 0rem'
        },

        message: {
            margin: '0 0.5rem 0.5rem 0.5rem'
        },
        errorMessage: {
            color: 'red',
            textAlign: 'center',
            paddingBottom: '1rem'
        },
        loginButton: {
            background: 'rgba(153, 153, 153, 1)',
            borderRadius: 5,
            padding: '0.1rem',
            verticalAlign: 'middle',
            '&:hover, &.Mui-focusVisible': { backgroundColor: 'rgba(58, 211, 158, 0.5)' },
            justifyContent: 'center',
            alignText: 'center'
        },
        logoutButton: {
            background: 'rgba(153, 153, 153, 1)',
            borderRadius: 5,
            padding: '0.1rem',
            verticalAlign: 'middle',
            '&:hover, &.Mui-focusVisible': { backgroundColor: 'rgba(58, 211, 158, 0.5)' }
        },
        loggedIn: {
            background: 'rgba(153, 153, 153, 1)',
            borderRadius: 5,
            padding: '0.1rem',
            verticalAlign: 'middle',
            '&:hover, &.Mui-focusVisible': { backgroundColor: 'rgba(58, 211, 158, 0.5)' },
            display: 'inline-flex',
            [theme.breakpoints.up('md')]: {
                marginRight: '1rem',
                marginLeft: '-0.5rem'
            },
            [theme.breakpoints.down('sm')]: {
                marginRight: '1rem'
            }
        },

        loggedInIcon: {
            height: '1.3rem'
        }
    })
);

const Login = (): JSX.Element => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [retry, setRetry] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState('');

    useEffect(() => {
        const localUser = localStorage.getItem('currentUserAddress');
        const getLocalUser = localUser ? localUser : '';
        setCurrentUser(getLocalUser);
    });

    const handleLogin = async () => {
        if (!currentUser || currentUser === '' || currentUser === 'undefined') {
            setLoading(true);
            setOpen(true);
            setErrorMessage('Connecting...');
            setRetry(false);
            try {
                if (!Ledger.isLedgerConnected()) {
                    try {
                        await Ledger.connect();
                    } catch (e) {
                        setLoading(true);
                        setErrorMessage(Ledger.checkLedgerErrors(e.message));
                        setRetry(true);
                    }
                }

                if (Ledger.isLedgerConnected()) {
                    setErrorMessage('Please accept the connection in your Ledger device. ');
                    try {
                        const userAddress = await Ledger.getAddress();
                        localStorage.setItem('currentUserAddress', userAddress);
                        setCurrentUser(userAddress);
                        setOpen(false);
                    } catch (e) {
                        setLoading(true);
                        setErrorMessage(Ledger.checkLedgerErrors(e.message));
                        setRetry(true);
                    }

                    try {
                        await Ledger.getCeloAppVersion();
                    } catch (e) {
                        setErrorMessage(Ledger.checkLedgerErrors(e.message));
                    }
                }
            } catch (e) {
                setErrorMessage(Ledger.checkLedgerErrors(e.message));
                setRetry(true);
            }
        } else if (currentUser) {
            try {
                Ledger.disconnect();
                localStorage.removeItem('currentUserAddress');
                setCurrentUser('');
                setOpen(false);
                setRetry(false);
            } catch (e) {
                setErrorMessage(Ledger.checkLedgerErrors(e.message));
            }
        }
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            {currentUser === '' || currentUser === 'undefined' ? null : (
                <IconButton aria-label="Login" className={classes.loggedIn}>
                    <NavLink
                        href={`/account/${currentUser}`}
                        name={<img src="/images/user-login.svg" alt="Account" />}
                        className={classes.loggedInIcon}></NavLink>
                </IconButton>
            )}
            <IconButton
                aria-label="Login"
                onClick={handleLogin}
                className={
                    currentUser === '' || currentUser === 'undefined'
                        ? classes.loginButton
                        : classes.logoutButton
                }>
                {currentUser === '' || currentUser === 'undefined' ? (
                    <img src="/images/connect-ledger.svg" alt="Login" />
                ) : (
                    <img src="/images/logout.svg" alt="Logout" />
                )}
            </IconButton>

            <Dialog open={open} onClose={handleClose} aria-labelledby="ledger-dialog" maxWidth="sm">
                <DialogTitle id="ledger-dialog-signin-title">
                    <Grid container className={classes.root}>
                        <Grid item xs={12}>
                            <Typography variant="h6" noWrap className={classes.title}>
                                Sign in with Ledger
                            </Typography>
                        </Grid>
                        {loading ? <CircularProgress color="secondary" /> : ''}
                    </Grid>
                </DialogTitle>
                <DialogContent>
                    <Grid container spacing={1} className={classes.root}>
                        <DialogContentText id="signin-ledger">
                            <Grid item xs={12} className={classes.message}>
                                <Typography variant="body2">
                                    Please make sure your Ledger device is connected and Celo App
                                    1.0.3 or above is opened.
                                </Typography>
                            </Grid>
                            <Grid item xs={12} className={classes.errorMessage}>
                                <Typography variant="body2">{errorMessage}</Typography>
                            </Grid>
                            {retry ? (
                                <Grid item xs={12}>
                                    <ControlButtons
                                        showRetry={true}
                                        handleClick={handleLogin}
                                        handleClose={handleClose}
                                    />
                                </Grid>
                            ) : null}
                        </DialogContentText>
                    </Grid>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Login;
