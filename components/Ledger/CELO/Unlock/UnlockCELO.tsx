import { createStyles } from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useEffect } from 'react';

import Coin from '../../../Utils/Coin';
import { LedgerFormControl } from '../../LedgerDialog';

const useStyles = makeStyles(() =>
    createStyles({
        dialogContent: {
            display: 'flex'
        },

        dialog: {
            paddingBottom: '1rem'
        },

        alignLeft: {
            display: 'flex',
            overflow: 'auto',
            paddingTop: '0.5rem',
            paddingBottom: '0.2rem'
        },
        alignRight: {
            display: 'block',
            float: 'right',
            paddingTop: '0.5rem',
            paddingBottom: '0.5rem'
        },

        accountAddress: {
            paddingBottom: '1rem'
        },

        disabledAccountAddress: {
            paddingBottom: '1rem',
            color: 'rgba(192,192,192, 1)'
        }
    })
);

type UnlockGoldProps = { isLoading?: boolean; maxUnlock?: string };

const UnlockGold = ({ isLoading, maxUnlock }: UnlockGoldProps): JSX.Element => {
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
                    <DialogContentText id="ledger-lock-gold" className={classes.dialog}>
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
                            <Grid item xs={12}>
                                <Typography
                                    variant="body1"
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
                                    className={classes.alignLeft}
                                    align="left">
                                    Unlock amount
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <LedgerFormControl action="unlock" />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body2" noWrap className={classes.alignRight}>
                                    {maxUnlock ? Coin(maxUnlock, 'CELO', 2) : Coin(0, 'CELO', 2)}
                                </Typography>
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </Grid>
            </DialogContent>
        </>
    );
};

export default UnlockGold;
