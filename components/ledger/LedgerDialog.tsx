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
import ControlButtons from './ControlButtons'
import TextField from '@material-ui/core/TextField';
// import LockGoldConfirm from './LockGoldConfirm'
import { GET_ACCOUNT_DETAILS } from '../query/Account';
import { useQuery } from "@apollo/client";
// import ComponentLoader from '../../../misc/ComponentLoader';
// import NotAvailable from '../../../misc/NotAvailable'
// import ErrorMessage from '../../../misc/ErrorMessage';
import Ledger from './Ledger'
// import Login from '../../Login'
import CircularProgress from '@material-ui/core/CircularProgress';
import BigNumber from "bignumber.js";
import LockGold from './celoGold/lock/LockGold';
import LockGoldConfirm from './celoGold/lock/LockGoldConfirm';
import LockGoldSuccess from './celoGold/lock/LockGoldSuccess';

import UnlockGold from './celoGold/unlock/UnlockGold';
import UnlockGoldConfirm from './celoGold/unlock/UnlockGoldConfirm';
import UnlockGoldSuccess from './celoGold/unlock/UnlockGoldSuccess';


import { createGlobalState } from 'react-hooks-global-state';


const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            overflowY: 'auto',
            padding: "0.5rem"
        },
        buttonLabel: {
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

        gridContainer: {
            justifyContent: "center",
        },

        gridItem: {
            display: "flex",
            justifyContent: "center",
        },

        centerButton: {
            justifyContent: "center",
            flexWrap: "wrap",
            padding: "0.1rem",
            textTransform: "none",
        },

        errorMessage: {
            color: "red",
            textAlign: "center",
            paddingBottom: "1rem"
        },

        circularProgress: {
            textAlign: "center",
            paddingBottom: "1rem"
        },

        outlinedInput: {
            borderRadius: 5,
            border: "solid 1px rgba(153, 153, 153, 1)",
            padding: "0.25rem 1rem",
        },

        ledgerDialogPopup: {
            padding: "0 1rem 1rem 1rem",
        },

        dialogTitle: {
            padding: "1rem 1rem 0rem 1rem",
        },

        dialogContent: {
            display: "flex",
        },
        item: {
            justifyContent: "center",
        },

        iconButtonRight: {
            float: "right"
        },
        iconButtonLeft: {
            float: 'left'
        },

        title: {
            display: "block",
            textAlign: "center",
            paddingTop: "0.5rem",
            paddingBottom: "0.7rem",
        },
    })
);


const initialState = { dialogError: false, dialogErrorMessage: "" };
const { useGlobalState } = createGlobalState(initialState);

type LedgerFormControl = { action: string }

export const LedgerFormControl = ({ action }: LedgerFormControl) => {
    const classes = useStyles();


    const [dialogError, setDialogError] = useGlobalState('dialogError');
    const [dialogErrorMessage, setDialogErrorMessage] = useGlobalState('dialogErrorMessage');
    const [ledgerError, setLedgerError] = React.useState(false);
    const [ledgerErrorMessage, setLedgerErrorMessage] = React.useState('');
    const [ledgerLoading, setLedgerLoading] = React.useState(false);


    const checkForInputErrors = (e) => {
        if (e.target.value === '0') {
            setDialogError(true)
            setDialogErrorMessage(`Value must be grater than 0! Please enter CELO amount to ${action}. `)
        }
        else if (!(parseFloat(e.target.value) > 0)) {
            setDialogError(true)
            setDialogErrorMessage(`Incorrect format! Please enter CELO amount to ${action}. `)


        }
        else {
            setDialogError(false)
            setDialogErrorMessage("")


        }
    };

    return (
        <FormControl variant="outlined" fullWidth size="small">
            <TextField id="ledger-input-value"
                error={dialogError}
                helperText={dialogErrorMessage}
                onChange={(e) => checkForInputErrors(e)}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">CELO</InputAdornment>
                    ),
                    disableUnderline: true
                }}
                disabled={ledgerLoading}
                className={classes.outlinedInput} />

        </FormControl>
    );
}




type LedgerDialogProps = { buttonLabel: string, action: string }

const LedgerDialog = ({ buttonLabel, action }: LedgerDialogProps) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [connected, setConnected] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState('');
    const [nextDialog, setNextDialog] = React.useState(false);
    const [amount, setAmount] = React.useState('');
    const [isLoading, setIsLoading] = React.useState(false);
    const [ledgerError, setLedgerError] = React.useState(false);
    const [ledgerErrorMessage, setLedgerErrorMessage] = React.useState('');
    const [ledgerLoading, setLedgerLoading] = React.useState(false);
    const [dialogError, setDialogError] = useGlobalState('dialogError');
    const [dialogErrorMessage, setDialogErrorMessage] = useGlobalState('dialogErrorMessage');
    const [tabNumber, setTabNumber] = React.useState(0);
    const address = currentUser;

    const AccountDetails = useQuery(GET_ACCOUNT_DETAILS, {
        variables: { address },
    });


    const dialogTab = (tabNum: number) => {

        switch (action) {
            case "Lock":
                switch (tabNum) {
                    case 0:
                        return <LockGold isLoading={isLoading}
                            maxLock={AccountDetails && AccountDetails.data && AccountDetails.data.account && AccountDetails.data.account.totalBalance && AccountDetails.data.account.totalBalance.gold ? AccountDetails.data.account.totalBalance.gold : '0'} />
                    case 1:
                        return <LockGoldConfirm amount={amount} />
                    case 2:
                        return <LockGoldSuccess />
                    default:
                        return null
                }
            // case "Unlock":
            //     switch (tabNum) {
            //         case 0:
            //             return <UnlockGold isLoading={isLoading} />
            //         case 1:
            //             return <UnlockGoldConfirm amount={amount} />
            //         case 2:
            //             return <UnlockGoldSuccess />
            //         default:
            //             return null
            //     }
            // case "Deposit":
            //     switch (tabNum) {
            //         case 0:
            //             return <ComponentName isLoading={isLoading} />
            //         case 1:
            //             return <ComponentName2 amount={amount} />
            //         case 2:
            //             return <ComponentName3 />
            //         default:
            //             return null
            //     }
        }

        // switch (tabNum) {
        //     case 0:
        //         return <ComponentName isLoading={isLoading} />
        //     case 1:
        //         return <ComponentName2 amount={amount} />
        //     case 2:
        //         return <ComponentName3 />
        //     default:
        //         return null
        // }
    }

    const handleNextDialog = () => {
        setTabNumber(tabNumber + 1)
    }

    const handlePreviousDialog = (e) => {
        if (tabNumber > 0) {
            setTabNumber(tabNumber - 1)
        }
    }

    const handleClose = () => {
        setOpen(false);
        setTabNumber(0)

    };


    const handleClick = async () => {
        setOpen(true);
        setLedgerError(false)
        setLedgerErrorMessage("")

        try {
            if (Ledger.isConnected === false) {
                setConnected(false)
                setIsLoading(true)
                setLedgerLoading(true)
                setLedgerErrorMessage("Connecting...")
                try {
                    await Ledger.connect()
                }
                catch (e) {
                    setLedgerError(true)
                    setLedgerErrorMessage(Ledger.checkLedgerErrors(e.message))
                    setIsLoading(false)
                }
            }

            if (Ledger.isConnected === true) {
                setLedgerLoading(true)
                setLedgerErrorMessage("Please accept the connection in your Ledger device. ")
                setIsLoading(true)

                try {
                    let userAddress = await Ledger.getAddress()
                    localStorage.setItem('currentUserAddress', userAddress)
                    setCurrentUser(userAddress)
                    setLedgerErrorMessage("")
                    setConnected(true)
                    setIsLoading(false)
                    setLedgerLoading(false)
                }
                catch (e) {
                    setLedgerError(true)
                    setLedgerErrorMessage(Ledger.checkLedgerErrors(e.message))
                    setIsLoading(false)
                }
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
            setIsLoading(false)
            setLedgerErrorMessage(Ledger.checkLedgerErrors(e.message))
        }

    };



    useEffect(() => {
        let localUser = localStorage.getItem('currentUserAddress');
        let lockCELOAmount = document.getElementById("ledger-input-value") as HTMLInputElement
        let lockAmount = lockCELOAmount ? lockCELOAmount.value : "0";
        console.log(lockAmount)
        //@ts-ignore
        setCurrentUser(localUser)
        setAmount(lockAmount)
        if (Ledger.isConnected === true) {
            setConnected(true)
        }
        if (Ledger.isConnected === false) {
            setConnected(false)
            setLedgerLoading(true)
        }
    });


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


    return (
        <>
            <Grid container spacing={2} className={classes.gridContainer} >
                <Grid item xs={6} className={classes.gridItem} >
                    <div className={classes.centerButton}>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleClick}
                            className={classes.buttonLabel}
                        >
                            <Typography variant="body1">{buttonLabel}</Typography>
                        </Button>
                    </div>
                </Grid>
            </Grid>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="ledger-dialog"
                fullWidth
                maxWidth="sm"
            >
                <DialogTitle id="ledger-title" className={classes.dialogTitle}>
                    <Grid container className={classes.item}>
                        {tabNumber > 0 ?
                            <Grid item xs={1}>
                                <IconButton
                                    aria-label="Return"
                                    className={classes.iconButtonLeft}
                                    onClick={handlePreviousDialog}
                                >
                                    <img src="/images/last.svg" color="textPrimary" />
                                </IconButton>
                            </Grid> : null}
                        <Grid item xs={10}>
                            <Typography variant="h6" color="textPrimary" noWrap className={classes.title}>
                                {buttonLabel}
                            </Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <IconButton
                                aria-label="Close"
                                className={classes.iconButtonRight}
                                onClick={handleClose}
                            >
                                <img src="/images/cross.svg" color="textPrimary" />
                            </IconButton>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <div className={classes.ledgerDialogPopup}>
                    {dialogTab(tabNumber)}
                    {ledgerLoading ?
                        <Grid item xs={12} className={classes.circularProgress}>
                            <CircularProgress color="secondary" />
                        </Grid>
                        : null}

                    {ledgerErrorMessage ?
                        <>
                            <Grid item xs={12} className={classes.errorMessage}>
                                <Typography variant="body2">
                                    {ledgerErrorMessage}
                                </Typography>
                            </Grid> </> : null}

                    {/* {tabNumber > 0 ? null : */}
                    {(ledgerErrorMessage || !connected || ledgerLoading) ?
                        <ControlButtons showRetry={true} handleClick={handleClick} handleClose={handleClose} showDisabled={isLoading} /> :
                        <ControlButtons handleClick={handleNextDialog} handleClose={handleClose} showDisabled={dialogError} />}
                </div>
            </Dialog>
        </>
    )

}


export default LedgerDialog
