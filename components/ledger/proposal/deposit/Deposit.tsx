import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useEffect } from 'react';

import { LedgerFormControl } from '../../LedgerDialog';

const useStyles = makeStyles({
    root: {
        justifyContent: 'center'
    },
    title: {
        display: 'block',
        textAlign: 'center',
        paddingTop: '0.5rem'
    },
    depositSelect: {
        justifyContent: 'center',
        border: 'solid rgba(255, 255, 255, 0.6) ',
        borderWidth: '0.09rem',
        borderRadius: 4,
        paddingLeft: '0.5rem'
        //minWidth: "18.4375rem",
    },

    formControl: {
        paddingBottom: '1rem',
        //width: "18.4375rem",
        overflow: 'hidden',
        textOverflow: 'clip',
        display: 'flex'
    },
    dialogTitle: {
        padding: '1rem 1rem 0rem 1rem'
    },

    divider: {
        margin: '0.15rem 0rem',
        backgroundColor: 'rgba(232, 232, 232, 1)'
    },

    item: {
        justifyContent: 'center'
    },

    menu: {
        display: 'block',
        width: '100%',
        overflow: 'hidden'
    },
    message: {
        margin: '0.5rem 0.5rem 0.5rem 0'
    },

    label: {
        paddingBottom: '0.2rem'
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
    },
    outlinedInput: {
        borderRadius: 5,
        border: 'solid 1px rgba(153, 153, 153, 1)',
        padding: '0.25rem 1rem'
    },

    controls: {
        paddingTop: '1rem'
    }
});

type DepositProps = { isLoading?: boolean; maxDeposit?: string };

const Deposit = ({ isLoading, maxDeposit }: DepositProps): JSX.Element => {
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
                                    align="left">
                                    Account
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography
                                    variant="body2"
                                    noWrap
                                    color="textPrimary"
                                    className={
                                        isLoading
                                            ? classes.disabledAccountAddress
                                            : classes.accountAddress
                                    }>
                                    {currentUser}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography
                                    variant="body2"
                                    noWrap
                                    color="textPrimary"
                                    align="left"
                                    gutterBottom>
                                    Deposit amount
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <LedgerFormControl action="deposit" />
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </Grid>
            </DialogContent>
        </>
    );
};

export default Deposit;
