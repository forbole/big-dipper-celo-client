import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import OutlinedInput from "@material-ui/core/OutlinedInput";
import ControlButtons from "../../ControlButtons"
import { Select, InputLabel, TextField, InputAdornment } from "@material-ui/core";
import Ledger from '../../Ledger'
import Confirm from './Confirm'
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
    root: {
        justifyContent: "center",
    },
    title: {
        display: "block",
        textAlign: "center",
        paddingTop: "0.5rem",
    },
    depositSelect: {
        justifyContent: "center",
        border: "solid rgba(255, 255, 255, 0.6) ",
        borderWidth: "0.09rem",
        borderRadius: 4,
        paddingLeft: "0.5rem",
        //minWidth: "18.4375rem",
    },

    formControl: {
        paddingBottom: "1rem",
        //width: "18.4375rem",
        overflow: "hidden",
        textOverflow: "clip",
        display: "flex",
    },
    dialogTitle: {
        padding: "1rem 1rem 0rem 1rem",
    },

    divider: {
        margin: "0.15rem 0rem",
        backgroundColor: "rgba(232, 232, 232, 1)",
    },

    item: {
        justifyContent: "center",
    },

    menu: {
        display: "block",
        width: "100%",
        overflow: "hidden",
    },
    message: {
        margin: "0.5rem 0.5rem 0.5rem 0",
    },



    label: {
        paddingBottom: "0.2rem",
    },

    voteButton: {
        textTransform: "none",
        borderRadius: 4,
        minHeight: "2.5rem",
        width: "19.4375rem",
        color: "rgba(255, 255, 255, 1)"
    },

    errorMessage: {
        color: "red",
        textAlign: "center",
        paddingBottom: "1rem"
    },

    circularProgress: {
        textAlign: "center",
        paddingBottom: "1rem",
        paddingTop: "2rem",
    },
    accountAddress: {
        paddingBottom: "1rem"
    },

    disabledAccountAddress: {
        paddingBottom: "1rem",
        color: "rgba(192,192,192, 1)"
    },
    outlinedInput: {
        borderRadius: 5,
        border: "solid 1px rgba(153, 153, 153, 1)",
        padding: "0.25rem 1rem",
    },

    controls: {
        paddingTop: "1rem",
    }

});


type DepositProps = { isOpen?: boolean, showButton: boolean, proposalTit: string, proposalDet: string, proposalNum: number, proposer: string }


const Deposit = ({ isOpen, showButton, proposalTit, proposalDet, proposalNum, proposer }: DepositProps) => {

    const classes = useStyles();
    const [open, setOpen] = React.useState(isOpen);
    const [currentUser, setCurrentUser] = React.useState('');
    const [vote, setVote] = React.useState('');
    const [connected, setConnected] = React.useState(false);
    const [isLoading, setIsLoading] = React.useState(false);
    const [nextDialog, setNextDialog] = React.useState(false);
    const [amount, setAmount] = React.useState('');
    // const [proposalNumber, setProposalNumber] = React.useState(proposalNum);
    // const [proposalTitle, setProposalTitle] = React.useState(proposalTit);
    // const [proposalDetails, setProposalDetails] = React.useState(proposalDet);
    // const [proposalProposer, setProposalProposer] = React.useState(proposer);
    const [dialogError, setDialogError] = React.useState(false);
    const [dialogErrorMessage, setDialogErrorMessage] = React.useState('');
    const [ledgerError, setLedgerError] = React.useState(false);
    const [ledgerErrorMessage, setLedgerErrorMessage] = React.useState('');
    const [ledgerLoading, setLedgerLoading] = React.useState(false);
    const [showDepositButton, setShowDepositButton] = React.useState(showButton);


    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = async () => {
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
                // setIsLoading(true)
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
                    // setIsLoading(false)

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
    }

    const handleDeposit = () => {
        setOpen(false);
        setNextDialog(true)
    };

    useEffect(() => {
        let localUser = localStorage.getItem('currentUserAddress');
        let depositCELOAmount = document.getElementById("deposit-gold-amount") as HTMLInputElement
        let depositAmount = depositCELOAmount ? depositCELOAmount.value : "0";
        //@ts-ignore
        setCurrentUser(localUser)
        setAmount(depositAmount)
        if (Ledger.isConnected === true) {
            setConnected(true)
        }
        if (Ledger.isConnected === false) {
            setConnected(false)
            setLedgerLoading(true)
        }
    });

    console.log(amount)

    const checkForInputErrors = (e) => {
        if (e.target.value === '0') {
            setDialogError(true)
            setDialogErrorMessage("Value must be grater than 0! Please enter CELO amount to deposit. ")
        }
        else if (!(parseFloat(e.target.value) > 0)) {
            setDialogError(true)
            setDialogErrorMessage("Incorrect format! Please enter CELO amount to deposit. ")
        }
        else {
            setDialogError(false)
            setDialogErrorMessage("")
        }
    };


    const depositGoldDialog = () => {
        return (
            <FormControl variant="outlined" fullWidth size="small">
                <TextField id="deposit-gold-amount"
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

    return (
        <>
            {showDepositButton === true ?
                <Grid container spacing={2}  >
                    <Grid item xs={12}  >
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleOpen}
                            className={classes.voteButton}
                        >
                            <Typography variant="body1">Deposit</Typography>
                        </Button>
                    </Grid>
                </Grid>
                : null}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="deposit-ledger-dialog"
                //fullWidth
                maxWidth="sm"
            >
                <DialogTitle
                    id="ledger-proposal-deposit-title"
                    className={classes.dialogTitle}
                >
                    <Grid container className={classes.item}>
                        <Grid item xs={12}>
                            <Typography
                                variant="h6"
                                noWrap
                                className={classes.title}
                                color="textPrimary"
                            >
                                Deposit
              </Typography>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <DialogContent >
                    <Grid container spacing={1}>
                        <DialogContentText id="ledger-proposal-deposit" component="span">
                            <Grid container>
                                <Grid item xs={12} className={classes.message}>
                                    <Typography variant="body2" color="textPrimary" gutterBottom>
                                        Deposit amount will be returned to your account after the
                                        proposal active period is finished.
                  </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography
                                        variant="body2"
                                        color="textPrimary"
                                        noWrap
                                        gutterBottom
                                        align="left"
                                    >
                                        Account
                </Typography>
                                </Grid>
                                <Grid item xs={12} >
                                    <Typography
                                        variant="body2"
                                        noWrap
                                        color="textPrimary"
                                        className={ledgerLoading ? classes.disabledAccountAddress : classes.accountAddress}
                                    >
                                        {currentUser}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography
                                        variant="body2"
                                        noWrap
                                        color="textPrimary"
                                        align="left"
                                        gutterBottom
                                    >
                                        Deposit amount
                </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    {depositGoldDialog()}
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

                                <Grid item xs={12} className={classes.controls}>
                                    {/* {(ledgerErrorMessage && connected === false && ledgerLoading) ? */}
                                    {/* // <ControlButtons showRetry={true} handleClick={handleOpen} handleClose={handleClose} />
                                        // :
                                        // <ControlButtons showDisabled={isLoading} handleClick={handleDeposit} handleClose={handleClose} />} */}

                                    {/* 
                                    {(!ledgerErrorMessage && connected === true && !ledgerLoading) ?
                                        <ControlButtons handleClick={handleDeposit} handleClose={handleClose} showDisabled={dialogError} />
                                        :
                                        <ControlButtons showRetry={true} handleClick={handleOpen} handleClose={handleClose} />} */}


                                    {(ledgerErrorMessage || !connected || ledgerLoading) ?
                                        <ControlButtons showRetry={true} handleClick={handleOpen} handleClose={handleClose} showDisabled={isLoading} /> :
                                        <ControlButtons handleClick={handleDeposit} handleClose={handleClose} showDisabled={dialogError} />}

                                </Grid>
                            </Grid>
                        </DialogContentText>
                    </Grid>
                </DialogContent>
            </Dialog>
            { nextDialog ? <Confirm isOpen={nextDialog} proposalNum={proposalNum} proposalTit={proposalTit} proposer={proposer} proposalDet={proposalDet} amount={amount} children={this} /> : null}

        </>
    );
};

export default Deposit