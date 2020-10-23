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
import Ledger from './../../Ledger';
import Login from '../../Login'
import CircularProgress from '@material-ui/core/CircularProgress';
import BigNumber from "bignumber.js";
import LedgerDialog from '../../LedgerDialog'
import { LedgerFormControl } from '../../LedgerDialog'


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        dialogContent: {
            display: "flex",
        },

        dialog: {
            paddingBottom: '1rem'
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

type LockGoldProps = { isLoading?: boolean, maxLock?: string };


const LockGold = ({ isLoading, maxLock }: LockGoldProps) => {

    const classes = useStyles();
    const [currentUser, setCurrentUser] = React.useState('');
    const [nextDialog, setNextDialog] = React.useState(false);
    const [amount, setAmount] = React.useState('');
    const [dialogError, setDialogError] = React.useState(false);
    const [dialogErrorMessage, setDialogErrorMessage] = React.useState('');
    const [ledgerError, setLedgerError] = React.useState(false);
    const [ledgerErrorMessage, setLedgerErrorMessage] = React.useState('');
    const [ledgerLoading, setLedgerLoading] = React.useState(false);
    const [showLockButton, setShowLockButton] = React.useState(showButton);
    const [currentAddress, setCurrentAddress] = React.useState(pageAddress || '');
    const address = currentUser;

    const handleClose = () => {
        setOpen(false);
    };

    const handleLock = async () => {
        setOpen(true);
        setLedgerError(false)
        setLedgerErrorMessage("")

        try {
            if (Ledger.isConnected === false) {
                setConnected(false)
                setLedgerLoading(true)
                setLedgerErrorMessage("Connecting...")
                await Ledger.connect()
            }

            if (Ledger.isConnected === true) {
                setLedgerLoading(true)
                setLedgerErrorMessage("Please accept the connection in your Ledger device. ")
                let userAddress = await Ledger.getAddress()
                localStorage.setItem('currentUserAddress', userAddress)
                setCurrentUser(userAddress)
                setLedgerErrorMessage("")
                setConnected(true)
                setLedgerLoading(false)
                try {
                    let ver = await Ledger.getCeloAppVersion()
                    setDialogError(true)

                }
                catch (e) {
                    setLedgerError(true)
                    setLedgerErrorMessage(Ledger.checkLedgerErrors(e.message))
                }
            }
        }
        catch (e) {
            setLedgerError(true)
            setLedgerLoading(true)
            setLedgerErrorMessage(Ledger.checkLedgerErrors(e.message))
        }




    };

    const confirmLock = async () => {
        setOpen(false);
        setNextDialog(true)
        try {
            const from = currentUser
            const lockObject = { amount, from }
            await Ledger.lockCelo(lockObject)
        }
        catch (e) {
            setLedgerError(true)
            setLedgerErrorMessage(Ledger.checkLedgerErrors(e.message))

        }

    };

    const checkForInputErrors = (e) => {
        if (e.target.value === '0') {
            setDialogError(true)
            setDialogErrorMessage("Value must be grater than 0! Please enter CELO amount to lock. ")
        }
        else if (!(parseFloat(e.target.value) > 0)) {
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
        //@ts-ignore
        setCurrentUser(localUser)
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
    if (error) return null
    if (currentAddress === currentUser) {
        return (
            <>
                {showLockButton === true ?
                    <Grid container spacing={2} className={classes.lockGold} >
                        <Grid item xs={6} className={classes.centerContent} >
                            <div className={classes.centerButtons}>
                                <Button
                                    variant="outlined"
                                    color="secondary"
                                    onClick={handleLock}
                                    className={classes.buttonLock}
                                >
                                    Account
                                </Typography>
                            </Grid>
                            <Grid item xs={12} >
                                <Typography
                                    variant="body2"
                                    noWrap
                                    color="textPrimary"
                                    className={isLoading ? classes.disabledAccountAddress : classes.accountAddress}
                                >
                                    {currentUser}
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography
                                    variant="body2"
                                    noWrap
                                    className={classes.alignLeft}
                                    align="left"
                                >
                                    Lock amount
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <LedgerFormControl action="lock" />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography
                                    variant="body2"
                                    noWrap
                                    className={classes.alignRight}
                                >
                                    {maxLock} CELO
                                </Typography>
                            </Grid>

                        </Grid>
                    </DialogContentText>
                </Grid>
            </DialogContent>

        </>
    );
}

export default LockGold;
