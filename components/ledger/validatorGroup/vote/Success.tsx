import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import NavLink from '../../../NavLink';

const useStyles = makeStyles({
    root: {
        justifyContent: 'center',
        width: '100%'
    },
    title: {
        display: 'block',
        textAlign: 'center',
        paddingTop: '0.5rem'
    },

    dialogTitle: {
        padding: '1rem 1rem 0rem 1rem'
    },

    item: {
        justifyContent: 'center',
        padding: '1rem 0'
    },

    controlButton: {
        justifyContent: 'center',
        flexWrap: 'wrap',
        textTransform: 'none',
        borderRadius: 4,
        width: '100%'
    },
    controlButtonLabel: {
        display: 'flex',
        textTransform: 'none',
        borderRadius: 4,
        justifyContent: 'center',
        minHeight: '2.5rem',
        textAlign: 'center'
    },
    txHash: {
        overflowWrap: 'anywhere',
        textAlign: 'left'
    },
    proposalButtonLabel: {
        display: 'flex',
        textTransform: 'none',
        borderRadius: 4,
        justifyContent: 'center',
        minHeight: '2.5rem',
        textAlign: 'center'
    },

    paddingBottom: {
        paddingBottom: '1.5rem'
    }
});

type SuccessProps = { txHash: string };

const Success = ({ txHash }: SuccessProps): JSX.Element => {
    const classes = useStyles();

    return (
        <>
            <DialogContent>
                <Grid container spacing={1} className={classes.root}>
                    <DialogContentText id="ledger-validator-group-vote">
                        <Grid container className={classes.item}>
                            <Grid item xs={12} alignItems="center" className={classes.item}>
                                <Typography noWrap align="center">
                                    <img src="/images/success-icon.svg" alt="Success" />
                                </Typography>
                            </Grid>
                            <Grid
                                item
                                xs={12}
                                alignItems="center"
                                className={classes.paddingBottom}>
                                <Typography
                                    variant="body2"
                                    noWrap
                                    align="center"
                                    color="textPrimary">
                                    Voted Successfully
                                </Typography>
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                md={6}
                                className={classes.controlButton}
                                alignItems="center">
                                <NavLink
                                    href={`/transaction/${txHash}`}
                                    name={
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            className={classes.proposalButtonLabel}
                                            fullWidth={true}>
                                            <Typography variant="body2" noWrap>
                                                View Transactions
                                            </Typography>
                                        </Button>
                                    }
                                />
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </Grid>
            </DialogContent>
        </>
    );
};

export default Success;
