import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useEffect } from 'react';

const useStyles = makeStyles({
    root: {
        justifyContent: 'center'
    },
    title: {
        display: 'block',
        textAlign: 'center',
        paddingTop: '0.5rem'
    },

    dialogTitle: {
        padding: '1rem 1rem 0rem 1rem'
    },

    dialogContent: {
        display: 'block'
    },
    divider: {
        margin: '0.15rem 0rem',
        backgroundColor: 'rgba(232, 232, 232, 1)'
    },

    dialog: {
        paddingBottom: '1rem'
    },
    controlButton: {
        justifyContent: 'center',
        flexWrap: 'wrap',
        paddingTop: '2rem',
        textTransform: 'none',
        borderRadius: 4,
        width: '100%'
    },

    item: {
        justifyContent: 'center'
    },

    icon: {
        fill: 'rgba(255, 255, 255, 0.8)',
        paddingRight: '0.5rem',
        fontWeight: 400
    },

    message: {
        margin: '0.5rem 0.5rem 0 0.5rem'
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
    },

    paddingBottom: {
        paddingBottom: '1rem'
    },

    address: {
        overflow: 'hidden'
    },
    voteButton: {
        textTransform: 'none',
        borderRadius: 4,
        minHeight: '2.5rem',
        width: '19.4375rem',
        color: 'rgba(255, 255, 255, 1)'
    },

    errorMessage: {
        color: 'red',
        textAlign: 'center',
        paddingBottom: '1rem'
    },

    circularProgress: {
        textAlign: 'center',
        paddingBottom: '1rem',
        paddingTop: '2rem'
    },
    accountAddress: {
        paddingBottom: '1rem'
    },

    disabledAccountAddress: {
        paddingBottom: '1rem',
        color: 'rgba(192,192,192, 1)'
    }
});

type VoteProps = {
    isLoading: boolean;
    ledgerLoading: boolean;
    proposalTitle: string;
    voteHandler: any;
};

const Vote = ({ isLoading, ledgerLoading, proposalTitle, voteHandler }: VoteProps): JSX.Element => {
    const classes = useStyles();
    const [currentUser, setCurrentUser] = React.useState('');

    useEffect(() => {
        const localUser = localStorage.getItem('currentUserAddress');
        const getLocalUser = localUser ? localUser : '';
        setCurrentUser(getLocalUser);
    });

    return (
        <>
            <DialogContent>
                <DialogContentText id="ledger-vote" className={classes.dialog}>
                    <Grid container className={classes.dialogContent}>
                        <Grid item xs={12} className={classes.message}>
                            <Typography variant="body2" noWrap color="textPrimary" gutterBottom>
                                Account
                            </Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.message}>
                            <Typography
                                variant="body2"
                                noWrap
                                color="textPrimary"
                                gutterBottom
                                className={
                                    !isLoading && !ledgerLoading
                                        ? classes.accountAddress
                                        : classes.disabledAccountAddress
                                }>
                                {currentUser}
                            </Typography>
                        </Grid>

                        <Grid item xs={12} className={classes.message}>
                            <Typography variant="body1" color="textPrimary" gutterBottom>
                                You’re going to vote for
                            </Typography>
                            <Typography
                                variant="body2"
                                color="textPrimary"
                                className={classes.paddingBottom}>
                                {proposalTitle}
                            </Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.paddingBottom}>
                            <Button
                                variant="contained"
                                className={classes.voteYesButton}
                                onClick={(e) => voteHandler((e.target as HTMLElement).textContent)}
                                disabled={isLoading || ledgerLoading}>
                                Yes
                            </Button>
                        </Grid>
                        <Grid item xs={12} className={classes.paddingBottom}>
                            <Button
                                variant="contained"
                                className={classes.voteNoButton}
                                onClick={(e) => voteHandler((e.target as HTMLElement).textContent)}
                                disabled={isLoading || ledgerLoading}>
                                No
                            </Button>
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                className={classes.voteAbstainButton}
                                onClick={(e) => voteHandler((e.target as HTMLElement).textContent)}
                                disabled={isLoading || ledgerLoading}>
                                Abstain
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContentText>
            </DialogContent>
        </>
    );
};

export default Vote;
