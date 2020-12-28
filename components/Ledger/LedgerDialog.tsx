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

import { GET_ACCOUNT_DETAILS } from '../Query/Account';
import LockCELO from './CELO/Lock/LockCELO';
import LockCELOConfirm from './CELO/Lock/LockCELOConfirm';
import LockCELOSuccess from './CELO/Lock/LockCELOSuccess';
import UnlockCELO from './CELO/Unlock/UnlockCELO';
import UnlockCELOConfirm from './CELO/Unlock/UnlockCELOConfirm';
import UnlockCELOSuccess from './CELO/Unlock/UnlockCELOSuccess';
import ControlButtons from './ControlButtons';
import Ledger from './Ledger';
import VoteConfirm from './Proposal/Vote/Confirm';
import VoteSuccess from './Proposal/Vote/Success';
import Vote from './Proposal/Vote/Vote';
import ActivateValidatorGroupVote from './ValidatorGroup/Activate/Activate';
import ConfirmActivateValidatorGroupVote from './ValidatorGroup/Activate/Confirm';
import SuccessActivateValidatorGroupVote from './ValidatorGroup/Activate/Success';
import ConfirmRevokeValidatorGroup from './ValidatorGroup/Revoke/Confirm';
import RevokeValidatorGroup from './ValidatorGroup/Revoke/Revoke';
import SuccessRevokeValidatorGroup from './ValidatorGroup/Revoke/Success';
import ConfirmVoteValidatorGroup from './ValidatorGroup/Vote/Confirm';
import SuccessVoteValidatorGroup from './ValidatorGroup/Vote/Success';
import VoteValidatorGroup from './ValidatorGroup/Vote/Vote';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            overflowY: 'auto',
            padding: '0.5rem'
        },
        buttonLabel: {
            justifyContent: 'center',
            [theme.breakpoints.down('sm')]: {
                width: '7.5rem'
            },
            width: '20rem',
            padding: '0.5rem',
            textTransform: 'none',
            border: 'solid thin',
            margin: '0.3rem 1rem 0.2rem 0'
        },

        activateButtonLabel: {
            justifyContent: 'center',
            padding: '0.5rem',
            textTransform: 'none',
            width: '7.5rem',
            color: 'rgba(255, 255, 255, 1)',
            backgroundColor: 'rgba(8, 178, 112, 0.95)',
            '&:hover, &.Mui-focusVisible': { backgroundColor: 'rgba(8, 178, 112, 0.70)' }
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
            paddingBottom: '2rem'
            // wordBreak: 'break-all',
            // lineBreak: 'anywhere'
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
            paddingBottom: '0.7rem',
            paddingLeft: '2.5rem'
        },

        voteNoButton: {
            backgroundColor: 'rgba(240, 65, 85, 1)',
            textTransform: 'none',
            width: '100%',
            color: 'rgba(255,255,255,1)',
            fontWeight: 400,
            '&:disabled': {
                backgroundColor: 'rgba(65,65,65, 0.6)'
            },
            '&:hover, &.Mui-focusVisible': { backgroundColor: 'rgba(58, 211, 158, 0.5)' }
        },
        voteYesButton: {
            backgroundColor: 'rgba(8, 178, 122, 1)',
            textTransform: 'none',
            width: '100%',
            color: 'rgba(255,255,255,1)',
            fontWeight: 400,
            '&:disabled': {
                backgroundColor: 'rgba(65,65,65, 0.6)'
            },
            '&:hover, &.Mui-focusVisible': { backgroundColor: 'rgba(58, 211, 158, 0.5)' }
        },

        voteAbstainButton: {
            backgroundColor: 'rgba(55, 148, 240, 1)',
            textTransform: 'none',
            width: '100%',
            color: 'rgba(255,255,255,1)',
            fontWeight: 400,
            '&:disabled': {
                backgroundColor: 'rgba(65,65,65, 0.6)'
            },
            '&:hover, &.Mui-focusVisible': { backgroundColor: 'rgba(58, 211, 158, 0.5)' }
        }
    })
);

const initialState = { dialogError: false, dialogErrorMessage: '', userAmount: '0', userVote: '' };
const { useGlobalState } = createGlobalState(initialState);

type LedgerFormControlProps = { action: string };

export const LedgerFormControl = ({ action }: LedgerFormControlProps): JSX.Element => {
    const classes = useStyles();

    const [dialogError, setDialogError] = useGlobalState('dialogError');
    const [dialogErrorMessage, setDialogErrorMessage] = useGlobalState('dialogErrorMessage');
    const [ledgerLoading, setLedgerLoading] = React.useState(false);
    const [userAmount, setUserAmount] = useGlobalState('userAmount');

    const checkForInputErrors = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
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

type LedgerDialogProps = {
    buttonLabel: string;
    action: string;
    proposalNumber?: number;
    proposer?: string;
    proposalTitle?: string;
    proposalDescription?: string;
    validatorGroup?: string;
};

type CheckIfAccountProps = { address: string };

const LedgerDialog = ({
    buttonLabel,
    action,
    proposalNumber,
    proposer,
    proposalTitle,
    proposalDescription,
    validatorGroup
}: LedgerDialogProps): JSX.Element => {
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
    const [showCircuralProgress, setShowCircuralProgress] = React.useState(false);
    // const [dialogErrorMessage, setDialogErrorMessage] = useGlobalState('dialogErrorMessage');
    const [tabNumber, setTabNumber] = React.useState(0);
    const [showControlButtons, setShowControlButtons] = React.useState(false);
    const [getProposalNumber, setProposalNumber] = React.useState(proposalNumber || 0);
    const [getProposer, setProposer] = React.useState(proposer || '');
    const [getProposalTitle, setProposalTitle] = React.useState(proposalTitle || '');
    const [getProposalDescription, setProposalDescription] = React.useState(
        proposalDescription || ''
    );
    const [vote, setVote] = React.useState('');
    const [hash, setHash] = React.useState('');

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
                            <LockCELO
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
                        return <LockCELOConfirm amount={amount} />;
                    case 2:
                        return <LockCELOSuccess txHash={hash} />;
                    default:
                        return null;
                }
            case 'UnlockCelo':
                switch (tabNum) {
                    case 0:
                        return (
                            <UnlockCELO
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
                        return <UnlockCELOConfirm amount={amount} />;
                    case 2:
                        return <UnlockCELOSuccess txHash={hash} />;
                    default:
                        return null;
                }

            case 'ProposalVote':
                switch (tabNum) {
                    case 0:
                        return (
                            <Vote
                                isLoading={isLoading}
                                ledgerLoading={ledgerLoading}
                                proposalTitle={getProposalTitle}
                                voteHandler={actionHandler}
                            />
                        );
                    case 1:
                        return (
                            <VoteConfirm
                                vote={vote}
                                proposalNumber={getProposalNumber}
                                proposer={getProposer}
                                proposalTitle={getProposalTitle}
                                proposalDescription={getProposalDescription}
                            />
                        );
                    case 2:
                        return <VoteSuccess txHash={hash} />;
                    default:
                        return null;
                }
            case 'ValidatorGroupVote':
                switch (tabNum) {
                    case 0:
                        return (
                            <VoteValidatorGroup
                                isLoading={isLoading}
                                maxLockedCelo={
                                    AccountDetails &&
                                    AccountDetails.data &&
                                    AccountDetails.data.account &&
                                    AccountDetails.data.account.totalBalance &&
                                    AccountDetails.data.account.totalBalance.lockedGold
                                        ? AccountDetails.data.account.totalBalance.lockedGold
                                        : '0'
                                }
                                validatorGroup={validatorGroup}
                            />
                        );
                    case 1:
                        return (
                            <ConfirmVoteValidatorGroup
                                lockAmount={amount}
                                validatorGroup={validatorGroup}
                            />
                        );
                    case 2:
                        return <SuccessVoteValidatorGroup txHash={hash} />;
                    default:
                        return null;
                }
            case 'ValidatorGroupRevoke':
                switch (tabNum) {
                    case 0:
                        return (
                            <RevokeValidatorGroup
                                isLoading={isLoading}
                                maxLockedCelo={
                                    AccountDetails &&
                                    AccountDetails.data &&
                                    AccountDetails.data.account &&
                                    AccountDetails.data.account.totalBalance &&
                                    AccountDetails.data.account.totalBalance.lockedGold
                                        ? AccountDetails.data.account.totalBalance.lockedGold
                                        : '0'
                                }
                                validatorGroup={validatorGroup}
                            />
                        );
                    case 1:
                        return (
                            <ConfirmRevokeValidatorGroup
                                revokeAmount={amount}
                                validatorGroup={validatorGroup}
                            />
                        );
                    case 2:
                        return <SuccessRevokeValidatorGroup txHash={hash} />;
                    default:
                        return null;
                }
            case 'ValidatorGroupActivateVotes':
                switch (tabNum) {
                    case 0:
                        return (
                            <ActivateValidatorGroupVote
                                isLoading={isLoading}
                                validatorGroup={validatorGroup}
                            />
                        );
                    case 1:
                        return (
                            <ConfirmActivateValidatorGroupVote validatorGroup={validatorGroup} />
                        );
                    case 2:
                        return <SuccessActivateValidatorGroupVote txHash={hash} />;
                    default:
                        return null;
                }
        }
    };

    const checkIfAccount = async ({ address }: CheckIfAccountProps) => {
        const accountAddress = { address: address };
        try {
            const isAccount = await Ledger.isAccount(accountAddress);
            if (isAccount === true) {
                return true;
            } else {
                setLedgerLoading(true);
                setLedgerErrorMessage(
                    `Can't find an account with address ${address} on the chain. Please accept the connection and sign the transaction on your Ledger deivce to create an account. `
                );
                setIsLoading(true);
                const createAccount = await Ledger.createAccount(accountAddress);
                if (createAccount === true) {
                    return true;
                } else {
                    return false;
                }
            }
        } catch (e) {
            setLedgerError(true);
            setLedgerLoading(true);
            setLedgerErrorMessage(Ledger.checkLedgerErrors(e.message));
        }
    };

    const handleLock = async () => {
        try {
            const address = { address: currentUser };
            //check if account exist
            if (checkIfAccount(address)) {
                setShowCircuralProgress(true);
                const from = currentUser;
                const lockObject = { amount, from };
                const lockCelo = await Ledger.lockCelo(lockObject);
                setShowCircuralProgress(false);
                if (lockCelo && lockCelo.status === true) {
                    setTabNumber(2);
                    setLedgerLoading(false);
                    setHash(lockCelo.blockHash);
                }
            }
        } catch (e) {
            setLedgerError(true);
            setLedgerLoading(true);
            setLedgerErrorMessage(Ledger.checkLedgerErrors(e.message));
        }
    };

    const handleUnlock = async () => {
        try {
            // setLedgerLoading(true);
            const address = { address: currentUser };
            if (checkIfAccount(address)) {
                setShowCircuralProgress(true);
                const from = currentUser;
                const unlockObject = { amount, from };
                const unlockCelo = await Ledger.unlockCelo(unlockObject);
                setShowCircuralProgress(false);
                if (unlockCelo && unlockCelo.status === true) {
                    setTabNumber(2);
                    setLedgerLoading(false);
                    setHash(unlockCelo.blockHash);
                }
            }
        } catch (e) {
            setLedgerError(true);
            setLedgerLoading(true);
            setLedgerErrorMessage(Ledger.checkLedgerErrors(e.message));
        }
    };

    const handleProposalVote = async () => {
        try {
            const address = { address: currentUser };
            if (checkIfAccount(address)) {
                setLedgerLoading(true);
                const from = currentUser;
                const vote = '';
                const proposalNumber = getProposalNumber;
                const voteObject = { proposalNumber, from, vote };
                await Ledger.voteProposal(voteObject);
                setLedgerLoading(false);
            }
        } catch (e) {
            setLedgerError(true);
            setLedgerLoading(true);
            setLedgerErrorMessage(Ledger.checkLedgerErrors(e.message));
        }
    };

    const handleValidatorGroupVote = async () => {
        try {
            const address = { address: currentUser };
            if (checkIfAccount(address)) {
                setShowCircuralProgress(true);
                const from = currentUser;
                const group = validatorGroup ? validatorGroup : '';
                const groupVote = { amount, from, group };
                const voteValidatorGroup = await Ledger.voteValidatorGroup(groupVote);

                setShowCircuralProgress(false);
                if (voteValidatorGroup && voteValidatorGroup.status === true) {
                    setTabNumber(2);
                    setLedgerLoading(false);
                    setHash(voteValidatorGroup.blockHash);
                }
            }
        } catch (e) {
            setLedgerError(true);
            setLedgerLoading(true);
            setLedgerErrorMessage(Ledger.checkLedgerErrors(e.message));
        }
    };

    const handleRevokeValidatorGroupVote = async () => {
        try {
            const address = { address: currentUser };
            if (checkIfAccount(address)) {
                setShowCircuralProgress(true);
                const account = currentUser;
                const group = validatorGroup ? validatorGroup : '';
                const revokeObject = { amount, account, group };
                const revokeValidatorGroupVote = await Ledger.revokeValidatorGroupVote(
                    revokeObject
                );
                setShowCircuralProgress(false);
                if (revokeValidatorGroupVote && revokeValidatorGroupVote.status === true) {
                    setTabNumber(2);
                    setLedgerLoading(false);
                    setHash(revokeValidatorGroupVote.blockHash);
                }
            }
        } catch (e) {
            setLedgerError(true);
            setLedgerLoading(true);
            setLedgerErrorMessage(Ledger.checkLedgerErrors(e.message));
        }
    };

    const handleValidatorGroupActivateVotes = async () => {
        try {
            const address = { address: currentUser };
            if (checkIfAccount(address)) {
                setShowCircuralProgress(true);
                const activateVotesObject = {
                    address: currentUser,
                    validatorGroupAddress: validatorGroup ? validatorGroup : ''
                };
                const activateValidatorGroupVote = await Ledger.activateVaidatorGroupVotes(
                    activateVotesObject
                );
                setShowCircuralProgress(false);
                if (activateValidatorGroupVote && activateValidatorGroupVote.status === true) {
                    setTabNumber(2);
                    setLedgerLoading(false);
                    setHash(activateValidatorGroupVote.blockHash);
                }
            }
        } catch (e) {
            setLedgerError(true);
            setLedgerLoading(true);
            setLedgerErrorMessage(Ledger.checkLedgerErrors(e.message));
        }
    };

    const actionHandler = (e: React.SetStateAction<string>) => {
        setTabNumber(tabNumber + 1);

        switch (action) {
            case 'LockCelo':
                switch (tabNumber) {
                    case 0:
                        return handleLock();
                    default:
                        return;
                }
            case 'UnlockCelo':
                switch (tabNumber) {
                    case 0:
                        return handleUnlock();
                    default:
                        return;
                }
            case 'ProposalVote':
                setVote(e);
                switch (tabNumber) {
                    case 0:
                        return handleProposalVote();
                    default:
                        return;
                }
                break;
            case 'ValidatorGroupVote':
                switch (tabNumber) {
                    case 0:
                        return handleValidatorGroupVote();
                    default:
                        return;
                }
            case 'ValidatorGroupRevoke':
                switch (tabNumber) {
                    case 0:
                        return handleRevokeValidatorGroupVote();
                    default:
                        return;
                }
            case 'ValidatorGroupActivateVotes':
                switch (tabNumber) {
                    case 0:
                        return handleValidatorGroupActivateVotes();
                    default:
                        return;
                }
        }
    };

    const handlePreviousDialog = () => {
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
                    setLedgerLoading(true);
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
                    const getCeloAppVersion = await Ledger.getCeloAppVersion();
                    // setDialogError(true);
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

        if (ledgerLoading) {
            setShowControlButtons(true);
        } else if (tabNumber === 0 && action != 'ProposalVote') {
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
                            className={
                                action === 'ValidatorGroupActivateVotes'
                                    ? classes.activateButtonLabel
                                    : classes.buttonLabel
                            }>
                            <Typography
                                variant={
                                    action === 'ValidatorGroupActivateVotes' ? 'caption' : 'body1'
                                }>
                                {buttonLabel}
                            </Typography>
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
                        {tabNumber === 1 ? (
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
                    {ledgerLoading || showCircuralProgress ? (
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
