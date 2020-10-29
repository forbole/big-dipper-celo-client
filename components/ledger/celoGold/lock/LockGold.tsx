import { createStyles } from '@material-ui/core';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useEffect } from 'react';

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

type LockGoldProps = { isLoading?: boolean; maxLock?: string };

const LockGold = ({ isLoading, maxLock }: LockGoldProps): JSX.Element => {
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
                                    className={classes.alignLeft}
                                    align="left">
                                    Lock amount
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <LedgerFormControl action="lock" />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="body2" noWrap className={classes.alignRight}>
                                    {maxLock} CELO
                                </Typography>
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </Grid>
            </DialogContent>
        </>
    );
};

export default LockGold;
