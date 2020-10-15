import { Select, InputLabel, Theme, createStyles, makeStyles, Button, Dialog, TextField } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import ListSubheader from "@material-ui/core/ListSubheader";
import InputAdornment from "@material-ui/core/InputAdornment";
import FormControl from "@material-ui/core/FormControl";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import React, { useEffect, useLayoutEffect } from "react";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import ControlButtons from '../../ControlButtons'
import UnlockGoldConfirm from './UnlockGoldConfirm'
import { GET_ACCOUNT_DETAILS } from '../../../query/Account';
import { useQuery } from "@apollo/client";
import ComponentLoader from '../../../misc/ComponentLoader';
import NotAvailable from '../../../misc/NotAvailable'
import ErrorMessage from '../../../misc/ErrorMessage';
import Ledger from '../../Ledger'
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
            padding: "1rem 1rem 1rem 1rem",
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
            border: "solid 1px rgba(153, 153, 153, 1)",
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
        buttonUnlock: {
            justifyContent: "center",
            [theme.breakpoints.down('xs')]: {
                width: "7.5rem",
            },
            width: "9.5rem",
            padding: "0.5rem",
            textTransform: "none",
            border: "solid thin",
            margin: "0.3rem 0 0.2rem 1rem",
        },

        outlinedInput: {
            borderRadius: 5,
            border: "solid 1px rgba(153, 153, 153, 1)",
            padding: "0.25rem 1rem",
        },

        unlockGold: {
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



type UnlockGoldProps = { isOpen?: boolean, currentAddressPage?: string };


const UnlockGold = ({ isOpen, currentAddressPage }: UnlockGoldProps) => {

    const classes = useStyles();
    const [open, setOpen] = React.useState(isOpen);
    const [connected, setConnected] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState('');
    const [nextDialog, setNextDialog] = React.useState(false);
    const [amount, setAmount] = React.useState('')
    const [dialogError, setDialogError] = React.useState(false);
    const [dialogErrorMessage, setDialogErrorMessage] = React.useState("");
    const [ledgerError, setLedgerError] = React.useState(false);
    const [ledgerErrorMessage, setLedgerErrorMessage] = React.useState('');
    const [ledgerLoading, setLedgerLoading] = React.useState(false);
    const address = currentUser;


    const handleClose = () => {
        setOpen(false);
    };

    const handleUnlock = async () => {
        setLedgerError(false)
        setLedgerErrorMessage("")
        setOpen(true);

        try {
            if (Ledger.isConnected === false) {
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

    const confirmUnlock = async () => {
        // setOpen(false);
        // setNextDialog(true)
        try {
            const from = currentUser
            const unlockObject = { amount, from }
            await Ledger.unlockCelo(unlockObject)
        }
        catch (e) {
            setLedgerError(true)
            setLedgerErrorMessage(Ledger.checkLedgerErrors(e.message))

        }
    };

    const checkForInputErrors = (e) => {
        if (!(parseFloat(e.target.value) > 0)) {
            setDialogError(true)
            setDialogErrorMessage("Incorrect format! Please enter CELO amount to unlock. ")
        }

        else {
            setDialogError(false)
            setDialogErrorMessage("")
        }
    };

    useEffect(() => {
        let localUser = localStorage.getItem('currentUserAddress');
        let unlockCELOAmount = document.getElementById("unlock-gold-amount") as HTMLInputElement
        let unlockAmount = unlockCELOAmount ? unlockCELOAmount.value : "0";
        //@ts-ignore
        setCurrentUser(localUser)
        setAmount(unlockAmount)
    });

    const unlockGoldDialog = () => {
        return (
            <FormControl variant="outlined" fullWidth size="small">
                <TextField id="unlock-gold-amount"
                    error={dialogError}
                    helperText={dialogErrorMessage}
                    onChange={(e) => checkForInputErrors(e)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">CELO</InputAdornment>
                        ),
                        disableUnderline: true,
                    }}
                    disabled={ledgerLoading}
                    className={classes.outlinedInput} />
            </FormControl>
        );
    }

    const { loading, error, data } = useQuery(GET_ACCOUNT_DETAILS, {
        variables: { address },
    });


    if (loading) return <ComponentLoader />
    if (error) return <ErrorMessage message={error.message} />
    if (currentAddressPage === currentUser) {
        return (
            <>
                {/* {!isOpen ? */}
                <Grid container spacing={2} className={classes.unlockGold}>
                    <Grid item xs={6} className={classes.centerContent} >
                        <div className={classes.centerButtons}>
                            <Button
                                variant="outlined"
                                color="secondary"
                                onClick={handleUnlock}
                                className={classes.buttonUnlock}
                            >
                                <Typography variant="body1">Unlock CELO</Typography>
                            </Button>
                        </div>
                    </Grid>
                </Grid>
                {/* : null} */}
                <Dialog
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="ledger-dialog-unlock-gold"
                    //fullWidth
                    maxWidth="sm"
                >
                    <>
                        <DialogTitle id="ledger-unlock-gold-title" className={classes.dialogTitle}>
                            <Grid container className={classes.item}>
                                <Grid item xs={12}>
                                    <Typography variant="h6" color="textPrimary" noWrap className={classes.title}>
                                        Unlock CELO
              </Typography>
                                </Grid>
                            </Grid>
                        </DialogTitle>

                        <DialogContent >
                            <Grid container spacing={1} >
                                <DialogContentText id="ledger-unlock-gold-content" className={classes.dialog}>
                                    <Grid container className={classes.dialogContent}>
                                        <Grid item xs={12}>
                                            <Typography
                                                variant="body2"
                                                noWrap
                                                className={classes.alignLeft}
                                                align="left"
                                            >
                                                Account
                </Typography>
                                        </Grid>
                                        <Grid item xs={12} className={classes.bottomPadding}>
                                            <Typography
                                                variant="body2"
                                                noWrap
                                                color="textPrimary"
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
                                                Unlock amount
                </Typography>
                                        </Grid>
                                        <Grid item xs={12}>
                                            {unlockGoldDialog()}

                                        </Grid>
                                        <Grid item xs={12} className={classes.bottomPadding}>
                                            < Typography
                                                variant="body2"
                                                noWrap
                                                className={classes.alignRight}
                                            > Max {data.account && data.account.totalBalance && data.account.totalBalance.lockedGold ?
                                                data.account.totalBalance.lockedGold
                                                : 0} CELO
                                        </Typography>

                                        </Grid>

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

                                        {!ledgerErrorMessage ?
                                            <ControlButtons handleClick={confirmUnlock} handleClose={handleClose} showDisabled={dialogError || !connected} />
                                            :
                                            <ControlButtons showRetry={true} handleClick={handleUnlock} handleClose={handleClose} />}

                                    </Grid>
                                </DialogContentText>
                            </Grid>
                        </DialogContent>
                    </>
                </Dialog>
                { nextDialog ? <UnlockGoldConfirm isOpen={nextDialog} amount={amount} /> : null}

            </>
        );
    }
    else {
        return null
    }
};

export default UnlockGold