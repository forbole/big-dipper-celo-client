import { useQuery } from '@apollo/client';
import { Button, createStyles, Dialog, IconButton } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import DialogTitle from '@material-ui/core/DialogTitle';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import { makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import React, { useEffect } from 'react';
import { createGlobalState } from 'react-hooks-global-state';

import { GET_ACCOUNT_DETAILS } from '../query/Account';
import LockGold from './celoGold/lock/LockGold';
import LockGoldConfirm from './celoGold/lock/LockGoldConfirm';
import LockGoldSuccess from './celoGold/lock/LockGoldSuccess';
import UnlockGold from './celoGold/unlock/UnlockGold';
import UnlockGoldConfirm from './celoGold/unlock/UnlockGoldConfirm';
import UnlockGoldSuccess from './celoGold/unlock/UnlockGoldSuccess';
import ControlButtons from './ControlButtons';
import Ledger from './Ledger';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            overflowY: 'auto',
            padding: '0.5rem'
        },
        buttonLabel: {
            justifyContent: 'center',
            [theme.breakpoints.down('xs')]: {
                width: '7.5rem'
            },
            width: '9.5rem',
            padding: '0.5rem',
            textTransform: 'none',
            border: 'solid thin',
            margin: '0.3rem 1rem 0.2rem 0'
        },

        gridContainer: {
            justifyContent: 'center'
        },

        gridItem: {
            display: 'flex',
            justifyContent: 'center'
        },

        centerButton: {
            justifyContent: 'center',
            flexWrap: 'wrap',
            padding: '0.1rem',
            textTransform: 'none'
        },

        errorMessage: {
            color: 'red',
            textAlign: 'center',
            paddingBottom: '1rem'
        },

        circularProgress: {
            textAlign: 'center',
            paddingBottom: '1rem'
        },

        outlinedInput: {
            borderRadius: 5,
            border: 'solid 1px rgba(153, 153, 153, 1)',
            padding: '0.25rem 1rem'
        },

        ledgerDialogPopup: {
            padding: '0 1rem 1rem 1rem'
        },

        dialogTitle: {
            padding: '1rem 1rem 0rem 1rem'
        },

        dialogContent: {
            display: 'flex'
        },
        item: {
            justifyContent: 'center'
        },

        iconButtonRight: {
            float: 'right'
        },
        iconButtonLeft: {
            float: 'left'
        },

        title: {
            display: 'block',
            textAlign: 'center',
            paddingTop: '0.5rem',
            paddingBottom: '0.7rem'
        }
    })
);

const initialState = { dialogError: false, dialogErrorMessage: '', userAmount: '0' };
const { useGlobalState } = createGlobalState(initialState);

type LedgerFormControlProps = { action: string };

export const LedgerFormControl = ({ action }: LedgerFormControlProps): JSX.Element => {
    const classes = useStyles();

    const [dialogError, setDialogError] = useGlobalState('dialogError');
    const [dialogErrorMessage, setDialogErrorMessage] = useGlobalState('dialogErrorMessage');
    const [ledgerLoading, setLedgerLoading] = React.useState(false);
    const [userAmount, setUserAmount] = useGlobalState('userAmount');

    const checkForInputErrors = (e) => {
        if (e.target.value === '0') {
            setDialogError(true);
            setDialogErrorMessage(
                `Value must be grater than 0! Please enter CELO amount to ${action}. `
            );
        } else if (!(parseFloat(e.target.value) > 0)) {
            setDialogError(true);
            setDialogErrorMessage(`Incorrect format! Please enter CELO amount to ${action}. `);
        } else {
            setDialogError(false);
            setDialogErrorMessage('');
            setUserAmount(e.target.value);
        }
    };

    return (
        <FormControl variant="outlined" fullWidth size="small">
            <TextField
                id="ledger-input-value"
                error={dialogError}
                helperText={dialogErrorMessage}
                onChange={(e) => checkForInputErrors(e)}
                InputProps={{
                    endAdornment: <InputAdornment position="end">CELO</InputAdornment>,
                    disableUnderline: true
                }}
                type="text"
                disabled={ledgerLoading}
                className={classes.outlinedInput}
                defaultValue="0"
            />
        </FormControl>
    );
};

type LedgerDialogProps = { buttonLabel: string; action: string };

const LedgerDialog = ({ buttonLabel, action }: LedgerDialogProps): JSX.Element => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [connected, setConnected] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState('');
    const [amount, setAmount] = useGlobalState('userAmount');
    const [isLoading, setIsLoading] = React.useState(false);
    const [ledgerError, setLedgerError] = React.useState(false);
    const [ledgerErrorMessage, setLedgerErrorMessage] = React.useState('');
    const [ledgerLoading, setLedgerLoading] = React.useState(false);
    const [dialogError, setDialogError] = useGlobalState('dialogError');
    // const [dialogErrorMessage, setDialogErrorMessage] = useGlobalState('dialogErrorMessage');
    const [tabNumber, setTabNumber] = React.useState(0);
    const [showControlButtons, setShowControlButtons] = React.useState(false);

    const address = currentUser;

    const AccountDetails = useQuery(GET_ACCOUNT_DETAILS, {
        variables: { address }
    });

    const dialogTab = (tabNum: number) => {
        switch (action) {
            case 'LockCelo':
                switch (tabNum) {
                    case 0:
                        return (
                            <LockGold
                                isLoading={isLoading}
                                maxLock={
                                    AccountDetails &&
                                    AccountDetails.data &&
                                    AccountDetails.data.account &&
                                    AccountDetails.data.account.totalBalance &&
                                    AccountDetails.data.account.totalBalance.gold
                                        ? AccountDetails.data.account.totalBalance.gold
                                        : '0'
                                }
                            />
                        );
                    case 1:
                        return <LockGoldConfirm amount={amount} />;
                    case 2:
                        return <LockGoldSuccess />;
                    default:
                        return null;
                }
            case 'UnlockCelo':
                switch (tabNum) {
                    case 0:
                        return (
                            <UnlockGold
                                isLoading={isLoading}
                                maxUnlock={
                                    AccountDetails &&
                                    AccountDetails.data &&
                                    AccountDetails.data.account &&
                                    AccountDetails.data.account.totalBalance &&
                                    AccountDetails.data.account.totalBalance.lockedGold
                                        ? AccountDetails.data.account.totalBalance.lockedGold
                                        : '0'
                                }
                            />
                        );
                    case 1:
                        return <UnlockGoldConfirm amount={amount} />;
                    case 2:
                        return <UnlockGoldSuccess />;
                    default:
                        return null;
                }
            // case "ProposalDeposit":
            //     switch (tabNum) {
            //         case 0:
            //             return <Deposit isLoading={isLoading} />
            //         case 1:
            //             return <Confirm amount={amount} />
            //         case 2:
            //             return <Success />
            //         default:
            //             return null
            //     }
            // case "ProposalVote":
            //     switch (tabNum) {
            //         case 0:
            //             return <Deposit isLoading={isLoading} />
            //         case 1:
            //             return <Confirm amount={amount} />
            //         case 2:
            //             return <Success />
            //         default:
            //             return null
            //     }

            // case "ValidatorGroupVote":
            //     switch (tabNum) {
            //         case 0:
            //             return <Deposit isLoading={isLoading} />
            //         case 1:
            //             return <Confirm amount={amount} />
            //         case 2:
            //             return <Success />
            //         default:
            //             return null
            //     }
            // case "ValidatorGroupRevoke":
            //     switch (tabNum) {
            //         case 0:
            //             return <Revoke isLoading={isLoading} />
            //         case 1:
            //             return <Confirm amount={amount} />
            //         case 2:
            //             return <Success />
            //         default:
            //             return null
            //     }
        }
    };

    const handleLock = async () => {
        try {
            setLedgerLoading(true);
            const from = currentUser;
            const lockObject = { amount, from };
            await Ledger.lockCelo(lockObject);
            setLedgerLoading(false);
        } catch (e) {
            setLedgerError(true);
            setLedgerLoading(true);
            setLedgerErrorMessage(Ledger.checkLedgerErrors(e.message));
        }
    };

    const handleUnlock = async () => {
        try {
            setLedgerLoading(true);
            const from = currentUser;
            const unlockObject = { amount, from };
            await Ledger.unlockCelo(unlockObject);
            setLedgerLoading(false);
        } catch (e) {
            setLedgerError(true);
            setLedgerLoading(true);
            setLedgerErrorMessage(Ledger.checkLedgerErrors(e.message));
        }
    };

    const actionHandler = () => {
        setTabNumber(tabNumber + 1);

        switch (action) {
            case 'LockCelo':
                switch (tabNumber) {
                    case 0:
                        return handleLock();
                    default:
                        return null;
                }
            case 'UnlockCelo':
                switch (tabNumber) {
                    case 0:
                        return handleUnlock();
                    default:
                        return null;
                }
        }
    };

    const handlePreviousDialog = (e) => {
        if (tabNumber > 0) {
            setTabNumber(tabNumber - 1);
        }
    };

    const handleClose = () => {
        setOpen(false);
        setTabNumber(0);
    };

    const handleClick = async () => {
        setOpen(true);
        setLedgerError(false);
        setLedgerErrorMessage('');

        try {
            if (Ledger.isConnected === false) {
                setConnected(false);
                setIsLoading(true);
                setLedgerLoading(true);
                setLedgerErrorMessage('Connecting...');
                try {
                    await Ledger.connect();
                } catch (e) {
                    setLedgerError(true);
                    setLedgerErrorMessage(Ledger.checkLedgerErrors(e.message));
                    setIsLoading(false);
                }
            }

            if (Ledger.isConnected === true) {
                setLedgerLoading(true);
                setLedgerErrorMessage('Please accept the connection in your Ledger device. ');
                setIsLoading(true);

                try {
                    const userAddress = await Ledger.getAddress();
                    localStorage.setItem('currentUserAddress', userAddress);
                    setCurrentUser(userAddress);
                    setLedgerErrorMessage('');
                    setConnected(true);
                    setIsLoading(false);
                    setLedgerLoading(false);
                } catch (e) {
                    setLedgerError(true);
                    setLedgerErrorMessage(Ledger.checkLedgerErrors(e.message));
                    setIsLoading(false);
                }
                try {
                    const ver = await Ledger.getCeloAppVersion();
                    setDialogError(true);
                } catch (e) {
                    setLedgerError(true);
                    setLedgerErrorMessage(Ledger.checkLedgerErrors(e.message));
                }
            }
        } catch (e) {
            setLedgerError(true);
            setLedgerLoading(true);
            setIsLoading(false);
            setLedgerErrorMessage(Ledger.checkLedgerErrors(e.message));
        }
    };

    useEffect(() => {
        const localUser = localStorage.getItem('currentUserAddress');
        const getLocalUser = localUser ? localUser : '';
        setCurrentUser(getLocalUser);

        if (Ledger.isConnected === true) {
            setConnected(true);
        }
        if (Ledger.isConnected === false) {
            setConnected(false);
            setLedgerLoading(true);
        }

        if (tabNumber === 0) {
            setShowControlButtons(true);
        } else {
            setShowControlButtons(false);
        }
    });

    return (
        <>
            <Grid container spacing={2} className={classes.gridContainer}>
                <Grid item xs={6} className={classes.gridItem}>
                    <div className={classes.centerButton}>
                        <Button
                            variant="outlined"
                            color="secondary"
                            onClick={handleClick}
                            className={classes.buttonLabel}>
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
                maxWidth="sm">
                <DialogTitle id="ledger-title" className={classes.dialogTitle}>
                    <Grid container className={classes.item}>
                        {tabNumber > 0 ? (
                            <Grid item xs={1}>
                                <IconButton
                                    aria-label="Return"
                                    className={classes.iconButtonLeft}
                                    onClick={handlePreviousDialog}>
                                    <img src="/images/last.svg" color="textPrimary" alt="Return" />
                                </IconButton>
                            </Grid>
                        ) : null}
                        <Grid item xs={10}>
                            <Typography
                                variant="h6"
                                color="textPrimary"
                                noWrap
                                className={classes.title}>
                                {buttonLabel}
                            </Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <IconButton
                                aria-label="Close"
                                className={classes.iconButtonRight}
                                onClick={handleClose}>
                                <img src="/images/cross.svg" color="textPrimary" alt="Close" />
                            </IconButton>
                        </Grid>
                    </Grid>
                </DialogTitle>
                <div className={classes.ledgerDialogPopup}>
                    {dialogTab(tabNumber)}
                    {ledgerLoading ? (
                        <Grid item xs={12} className={classes.circularProgress}>
                            <CircularProgress color="secondary" />
                        </Grid>
                    ) : null}

                    {ledgerErrorMessage ? (
                        <>
                            <Grid item xs={12} className={classes.errorMessage}>
                                <Typography variant="body2">{ledgerErrorMessage}</Typography>
                            </Grid>{' '}
                        </>
                    ) : null}

                    {showControlButtons ? (
                        ledgerErrorMessage || !connected || ledgerLoading ? (
                            <ControlButtons
                                showRetry={true}
                                handleClick={handleClick}
                                handleClose={handleClose}
                                showDisabled={isLoading}
                            />
                        ) : (
                            <ControlButtons
                                handleClick={actionHandler}
                                handleClose={handleClose}
                                showDisabled={dialogError}
                            />
                        )
                    ) : null}
                </div>
            </Dialog>
        </>
    );
};

export default LedgerDialog;
