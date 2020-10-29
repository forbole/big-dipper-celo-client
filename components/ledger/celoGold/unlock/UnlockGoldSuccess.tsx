import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import React from 'react';

const useStyles = makeStyles({
    root: {
        justifyContent: 'center'
    },

    item: {
        justifyContent: 'center'
    },

    controlButton: {
        justifyContent: 'center',
        flexWrap: 'wrap',
        paddingTop: '2rem',
        textTransform: 'none',
        borderRadius: 4,
        width: '100%',
        paddingBottom: '1rem'
    },
    controlButtonLabel: {
        display: 'flex',
        textTransform: 'none',
        borderRadius: 4,
        justifyContent: 'center',
        minHeight: '2.5rem',
        textAlign: 'center'
    },

    icon: {
        paddingBottom: '1rem',
        paddingTop: '2.5rem'
    }
});

const UnlockGoldSuccess = () => {
    const classes = useStyles();

    const handleTx = () => {
        // setOpen(false);
    };

    return (
        <>
            <DialogContent>
                <Grid container spacing={1} className={classes.root}>
                    <DialogContentText id="ledger-unlock-gold-success">
                        <Grid container className={classes.item}>
                            <Grid item xs={12} alignItems="center" className={classes.icon}>
                                <Typography noWrap align="center">
                                    <img src="/images/success-icon.svg" alt="Unlock Success" />
                                </Typography>
                            </Grid>
                            <Grid item xs={12} alignItems="center">
                                <Typography
                                    variant="body2"
                                    noWrap
                                    align="center"
                                    color="textPrimary">
                                    Unlocked Successfully
                                </Typography>
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                md={11}
                                lg={8}
                                className={classes.controlButton}
                                alignItems="center">
                                <Link href="/transactions">
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        className={classes.controlButtonLabel}
                                        fullWidth={true}
                                        onClick={handleTx}>
                                        <Typography variant="body2" noWrap>
                                            View Transactions
                                        </Typography>
                                    </Button>
                                </Link>
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </Grid>
            </DialogContent>
        </>
    );
};

export default UnlockGoldSuccess;
