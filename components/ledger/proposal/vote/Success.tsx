import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import Link from '../../../Link';

const useStyles = makeStyles({
    root: {
        justifyContent: 'center',
        width: '100%',
        paddingTop: '1.5rem',
        paddingBottom: '1rem'
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
        justifyContent: 'center'
    },

    controlButton: {
        justifyContent: 'center',
        flexWrap: 'wrap',
        paddingTop: '2rem',
        textTransform: 'none',
        borderRadius: 4
        // width: "100%",
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
        //width: "18.44rem",
        textAlign: 'center'
        //margin: "0 50%"
    },

    paddingBottom: {
        paddingBottom: '1.5rem'
    },
    icon: {
        paddingBottom: '1rem',
        paddingTop: '1rem'
    }
});

const Success = (): JSX.Element => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <DialogContent>
                <Grid container spacing={1} className={classes.root}>
                    <DialogContentText id="ledger-validator-group-vote">
                        <Grid container className={classes.item}>
                            <Grid item xs={12} alignItems="center" className={classes.icon}>
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
                                    You have successfully voted for proposal 1
                                </Typography>
                            </Grid>

                            <Grid item xs={12} md={11}>
                                <Typography variant="body2" noWrap align="left" color="textPrimary">
                                    TX Hash
                                </Typography>
                            </Grid>
                            <Grid item xs={12} md={11}>
                                <Link
                                    href="transaction/[transaction]/"
                                    //as={`transaction/${data.block.parentHash}`}
                                    color="secondary">
                                    <Typography
                                        variant="body2"
                                        className={classes.txHash}
                                        noWrap={false}>
                                        {
                                            '0xfdef0a9988f84f8914ee000407393fccc1d039130260c7d501cc4b24e5bbe4f5'
                                        }
                                    </Typography>
                                </Link>
                            </Grid>

                            <Grid
                                item
                                xs={12}
                                md={10}
                                className={classes.controlButton}
                                alignItems="center">
                                <Link href="/transactions">
                                    <Button
                                        variant="outlined"
                                        color="secondary"
                                        className={classes.controlButtonLabel}
                                        fullWidth={true}
                                        onClick={handleClose}>
                                        <Typography variant="body2" noWrap>
                                            View Proposal
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

export default Success;
