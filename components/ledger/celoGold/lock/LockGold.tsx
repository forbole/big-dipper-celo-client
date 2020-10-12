import { Select, InputLabel, Dialog, IconButton, Button, createStyles } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import React, { useEffect, useLayoutEffect } from "react";
import { makeStyles, Theme } from "@material-ui/core/styles";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import ControlButtons from '../../ControlButtons'
import TextField from '@material-ui/core/TextField';
import LockGoldConfirm from './LockGoldConfirm'
import { GET_ACCOUNT_DETAILS } from '../../../query/Account';
import { useQuery } from "@apollo/client";
import ComponentLoader from '../../../misc/ComponentLoader';
import NotAvailable from '../../../misc/NotAvailable'
import ErrorMessage from '../../../misc/ErrorMessage';
import LedgerCelo from './../../LedgerCelo'
import Login from '../../Login'
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            justifyContent: "center",
        },
        title: {
            display: "block",
            textAlign: "center",
            paddingTop: "0.5rem",
        },

        dialogTitle: {
            padding: "1rem 1rem 0rem 1rem",
        },

        dialogContent: {
            display: "flex",
        },
        divider: {
            backgroundColor: "rgba(232, 232, 232, 1)",
        },

        dialog: {
            paddingBottom: '1rem'
        },


        item: {
            justifyContent: "center",
        },

        wrapText: {
            wordWrap: 'break-word',
            wordBreak: 'break-all'

        },

        centerContent: {
            display: "flex",
            justifyContent: "center",
        },


        select: {
            justifyContent: "center",
            border: "solid 1px rgba(153, 153, 153, 1) ",
            borderWidth: "0.09rem",
            borderRadius: 4,
        },

        leftPadding: {
            paddingLeft: "1rem",
        },

        alignLeft: {
            display: "flex",
            overflow: "auto",
            paddingTop: "0.5rem",
            paddingBottom: "0.2rem",
        },
        alignRight: {
            display: "block",
            float: "right",
            paddingTop: "0.5rem",
            paddingBottom: "0.5rem",
        },

        bottomPadding: {
            paddingBottom: "1rem"
        },

        centerButtons: {
            justifyContent: "center",
            flexWrap: "wrap",
            padding: "0.1rem",
            textTransform: "none",
        },
        buttonLock: {
            justifyContent: "center",
            [theme.breakpoints.down('xs')]: {
                width: "7.5rem",
            },
            width: "9.5rem",
            padding: "0.5rem",
            textTransform: "none",
            border: "solid thin",
            margin: "0.3rem 1rem 0.2rem 0",
        },

        outlinedInput: {
            borderRadius: 5,
            border: "solid 1px rgba(153, 153, 153, 1)",
            padding: "0.25rem 1rem",
        },

        lockGold: {
            justifyContent: "center",
        },

        errorMessage: {
            color: "red",
            textAlign: "center",
            paddingBottom: "1rem"
        },

        circularProgress: {
            textAlign: "center",
            paddingBottom: "1rem"
        }

    })
);


const LockGold = (): JSX.Element => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [connected, setConnected] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState('');
    const [nextDialog, setNextDialog] = React.useState(false);
    const [amount, setAmount] = React.useState('');
    const [dialogError, setDialogError] = React.useState(false);
    const [dialogErrorMessage, setDialogErrorMessage] = React.useState('');
    const address = currentUser;
    const [ledgerError, setLedgerError] = React.useState(false);
    const [ledgerErrorMessage, setLedgerErrorMessage] = React.useState('');
    const [ledgerLoading, setLedgerLoading] = React.useState(false);


    const handleClose = () => {
        setOpen(false);
    };

    const handleLock = async () => {
        setLedgerError(false)
        setLedgerErrorMessage("")
        setOpen(true);

        try {
            setLedgerLoading(true)
            setLedgerErrorMessage("Connecting...")
            await LedgerCelo.connect()
            if (await LedgerCelo.connect() === true) {
                setLedgerErrorMessage("Please accept the connection in your Ledger device")
                let userAddress = await LedgerCelo.getAddress()
                localStorage.setItem('currentUserAddress', userAddress)
                setCurrentUser(userAddress)
                setLedgerErrorMessage("")
                setConnected(true)
                setLedgerLoading(false)
                try {
                    let ver = await LedgerCelo.getCeloAppVersion()
                }
                catch (e) {
                    setLedgerError(true)
                    setLedgerErrorMessage(LedgerCelo.checkLedgerErrors(e.message))
                }
            }
        }
        catch (e) {
            setLedgerError(true)
            setLedgerLoading(true)
            setLedgerErrorMessage(LedgerCelo.checkLedgerErrors(e.message))
        }



    };

    const confirmLock = async () => {

        try {
            const from = currentUser
            const lockObject = { amount, from }
            await LedgerCelo.lockCelo(lockObject)
        }
        catch (e) {
            setLedgerError(true)
            setLedgerErrorMessage(LedgerCelo.checkLedgerErrors(e.message))

        }

    };

    const checkForInputErrors = (e) => {
        if (!(parseFloat(e.target.value) > 0)) {
            setDialogError(true)
            setDialogErrorMessage("Incorrect format! Please enter CELO amount to lock. ")
        }

        else {
            setDialogError(false)
            setDialogErrorMessage("")
        }
    };


    useEffect(() => {
        let localUser = localStorage.getItem('currentUserAddress');
        let unlockCELOAmount = document.getElementById("lock-gold-amount") as HTMLInputElement
        let unlockAmount = unlockCELOAmount ? unlockCELOAmount.value : "0";
        //@ts-ignore
        setCurrentUser(localUser)
        setAmount(unlockAmount)
    });


    const lockGoldDialog = () => {
        return (
            <FormControl variant="outlined" fullWidth size="small">
                <TextField id="lock-gold-amount"
                    error={dialogError}
                    helperText={dialogErrorMessage}
                    onChange={(e) => checkForInputErrors(e)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">CELO</InputAdornment>
                        ),
                        disableUnderline: true
                    }}
                    className={classes.outlinedInput} />

            </FormControl>
        );
    }

    const { loading, error, data } = useQuery(GET_ACCOUNT_DETAILS, {
        variables: { address },
    });

    if (loading) return <ComponentLoader />
    if (error) return <ErrorMessage message={error.message} />

    return (
        <>
            <DialogTitle id="ledger-lock-gold-title" className={classes.dialogTitle}>
                <Grid container className={classes.item}>
                    <Grid item xs={12}>
                        <Typography
                            variant="h6"
                            color="textPrimary"
                            noWrap
                            className={classes.title}>
                            Lock Celo Gold
                        </Typography>
                    </Grid>
                </Grid>
            </DialogTitle>

            <DialogContent>
                <Grid container spacing={1}>
                    <DialogContentText id="ledger-lock-gold-content" className={classes.dialog}>
                        <Grid container className={classes.dialogContent}>
                            <Grid item xs={12}>
                                <Typography
                                    variant="body2"
                                    noWrap
                                    className={classes.alignLeft}
                                    align="left">
                                    Account
                                </Typography>
                            </Grid>
                            <Grid item xs={12} className={classes.bottomPadding}>
                                <TokenDropdown />
                            </Grid>

                            <Grid item xs={12}>
                                <Typography
                                    variant="body2"
                                    noWrap
                                    className={classes.alignLeft}
                                    align="left">
                                    Lock amount
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <LockGoldDialog />
                            </Grid>
                            <Grid item xs={12} className={classes.bottomPadding}>
                                <Typography variant="body2" noWrap className={classes.alignRight}>
                                    Max {'14.99217479 CELO'}
                                </Typography>
                            </Grid>

                            <ControlButtons />
                        </Grid>
                    </DialogContentText>
                </Grid>
            </DialogContent>
        </>
    );
};

export default LockGold;
