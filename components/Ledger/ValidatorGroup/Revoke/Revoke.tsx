import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useEffect } from 'react';

import Coin from '../../../Utils/Coin';
import { LedgerFormControl } from '../../LedgerDialog';

const useStyles = makeStyles({
    root: {
        justifyContent: 'center'
    },

    dialogContent: {
        display: 'flex'
    },

    message: {
        margin: '0.5rem 0.5rem 0 0'
    },

    accountAddress: {
        paddingBottom: '1rem'
    },

    disabledAccountAddress: {
        paddingBottom: '1rem',
        color: 'rgba(192,192,192, 1)'
    },

    lockedCelo: {
        paddingTop: '1rem'
    }
});
type RevokeValGroupProps = { isLoading?: boolean; maxLockedCelo?: string; validatorGroup?: string };

const Revoke = ({ isLoading, maxLockedCelo, validatorGroup }: RevokeValGroupProps): JSX.Element => {
    const classes = useStyles();
    const [currentUser, setCurrentUser] = React.useState<string>('');

    useEffect(() => {
        const localUser = localStorage.getItem('currentUserAddress');
        const getLocalUser = localUser ? localUser : '';
        setCurrentUser(getLocalUser);
    });

    return (
        <>
            <DialogContent>
                <Grid container spacing={1}>
                    <DialogContentText id="ledger-validator-group-vote">
                        <Grid container className={classes.dialogContent}>
                            <Grid item xs={12} className={classes.message}>
                                <Typography
                                    variant="body2"
                                    noWrap
                                    color="textPrimary"
                                    align="left"
                                    gutterBottom>
                                    Account
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography
                                    variant="body1"
                                    noWrap
                                    color="textPrimary"
                                    className={
                                        isLoading
                                            ? classes.disabledAccountAddress
                                            : classes.accountAddress
                                    }
                                    gutterBottom>
                                    {currentUser}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} className={classes.message}>
                                <Typography variant="body2" noWrap color="textPrimary" gutterBottom>
                                    Validator Group
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography
                                    variant="body1"
                                    noWrap
                                    color="textPrimary"
                                    className={
                                        isLoading
                                            ? classes.disabledAccountAddress
                                            : classes.accountAddress
                                    }
                                    gutterBottom>
                                    {validatorGroup}
                                </Typography>
                            </Grid>

                            <Grid item xs={12} className={classes.message}>
                                <Typography variant="body2" noWrap color="textPrimary" gutterBottom>
                                    Amount
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <LedgerFormControl action="revoke" />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography
                                    variant="body2"
                                    noWrap
                                    color="textSecondary"
                                    align="right"
                                    className={classes.lockedCelo}>
                                    Max{' '}
                                    {maxLockedCelo
                                        ? Coin(maxLockedCelo, 'CELO', 2)
                                        : Coin(0, 'CELO', 2)}
                                </Typography>
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </Grid>
            </DialogContent>
        </>
    );
};

export default Revoke;
