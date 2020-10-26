import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
//import Link from "../../Ledger.tsx";
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import NotAvailable from '../../../misc/NotAvailable';

const useStyles = makeStyles({
    root: {
        justifyContent: 'center'
    },
    title: {
        display: 'block',
        textAlign: 'center',
        paddingTop: '0.5rem',
        paddingBottom: '0.5rem'
    },

    dialogTitle: {
        padding: '1rem 1rem 0rem 1rem'
    },

    dialogContent: {
        display: 'flex'
    },
    divider: {
        margin: '0.8125rem 0rem',
        backgroundColor: 'rgba(232, 232, 232, 1)'
    },

    dialog: {
        paddingBottom: '1rem'
    },

    item: {
        justifyContent: 'center'
    },

    wrapText: {
        wordWrap: 'break-word',
        wordBreak: 'break-all'
    },

    centerContent: {
        display: 'flex',
        justifyContent: 'center'
    },
    iconButtonRight: {
        float: 'right'
    },
    iconButtonLeft: {
        float: 'left'
    }
});

const Confirm = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <DialogTitle id="ledger-dialog-title" className={classes.dialogTitle}>
                <Grid container className={classes.item}>
                    <Grid item xs={1}>
                        <IconButton aria-label="Return" className={classes.iconButtonLeft}>
                            <img src="/images/last.svg" color="textPrimary" />
                        </IconButton>
                    </Grid>
                    <Grid item xs={10}>
                        <Typography
                            variant="h6"
                            color="textPrimary"
                            noWrap
                            className={classes.title}>
                            Deposit
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton
                            aria-label="Close"
                            className={classes.iconButtonRight}
                            onClick={handleClose}>
                            <img src="/images/cross.svg" color="textPrimary" />
                        </IconButton>
                    </Grid>
                </Grid>
            </DialogTitle>

            <DialogContent>
                <Grid container spacing={1}>
                    <DialogContentText id="ledger-vote" className={classes.dialog}>
                        <Grid container className={classes.dialogContent}>
                            <Grid item xs={12}>
                                <Typography
                                    color="textPrimary"
                                    variant="body2"
                                    gutterBottom
                                    align="left">
                                    You’re going to deposit 1 CELO to Proposal 10, if that’s
                                    correct, please sign in your ledger device.
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider variant="middle" className={classes.divider} />
                            </Grid>
                            <Grid item xs={6} className={classes.item}>
                                <Typography variant="body2" gutterBottom color="textPrimary">
                                    Proposal ID
                                </Typography>
                            </Grid>
                            <Grid item xs={6} className={classes.item}>
                                <Typography
                                    variant="body2"
                                    align="right"
                                    gutterBottom
                                    color="textPrimary">
                                    10
                                    {/* {data.block && data.block.timestamp
                ? new Date(parseInt(data.block.timestamp) * 1000).toUTCString()
                : <NotAvailable variant="body2" />}
              (
              {data && data.block && data.block.timestamp
                ? moment.unix(data.block.timestamp).fromNow()
                : null}
              ) */}
                                </Typography>
                                <Divider variant="middle" className={classes.divider} />
                            </Grid>
                            <Grid item xs={6} className={classes.item}>
                                <Typography variant="body2" gutterBottom color="textPrimary">
                                    Proposer
                                </Typography>
                            </Grid>
                            <Grid item xs={6} className={classes.item}>
                                <Typography
                                    variant="body2"
                                    align="right"
                                    gutterBottom
                                    color="textPrimary">
                                    Michelle Clark
                                    {/* {data.block &&
              data.block.transactions &&
              data.block.transactions.transactionIndex
                ? data.block.transactions.transactionIndex.length()
                : <NotAvailable variant="body2" />} */}
                                </Typography>
                                <Divider variant="middle" className={classes.divider} />
                            </Grid>

                            <Grid item xs={6} className={classes.item}>
                                <Typography variant="body2" gutterBottom color="textPrimary">
                                    Type
                                </Typography>
                            </Grid>
                            <Grid item xs={6} className={classes.item}>
                                <Typography
                                    variant="body2"
                                    align="right"
                                    gutterBottom
                                    color="textPrimary">
                                    Proposal
                                    {/* {data.block && data.block.size
                ? data.block.size
                : <NotAvailable variant="body2" />} */}
                                </Typography>
                                <Divider variant="middle" className={classes.divider} />
                            </Grid>

                            <Grid item xs={12} className={classes.item}>
                                <Typography variant="body2" gutterBottom color="textPrimary">
                                    Title
                                </Typography>
                                <Typography variant="body2" gutterBottom color="textPrimary">
                                    Don’t Burn Deposits for Rejected Governance Proposals Unless
                                    Vetoed
                                    {/* {data.block && data.block.hash
                ? data.block.hash
                : <NotAvailable variant="body2" />} */}
                                </Typography>
                                <Divider variant="middle" className={classes.divider} />
                            </Grid>

                            <Grid item xs={12} className={classes.item}>
                                <Typography variant="body2" gutterBottom color="textPrimary">
                                    Description
                                </Typography>

                                <Typography
                                    variant="body2"
                                    className={classes.wrapText}
                                    color="textPrimary">
                                    Governance Working Group - Q1 2020 funding Community-spend
                                    proposal submitted by Gavin Birch
                                    (https://twitter.com/Ether_Gavin) of Figment Networks
                                    (https://figment.network) -=-=- Full proposal:
                                    https://ipfs.io/ipfs/QmSMGEoY2dfxADPfgoAsJxjjC6hwpSNx1dXAqePiCEMCbY
                                    {/* {data.block && data.block.parentHash ? (
                <Link
                  href="transaction/[transaction]/"
                  as={`transaction/${data.block.parentHash}`}
                  color="secondary"
                  //className={classes.leftInline}
                >
                  {data.block.parentHash}
                </Link>
              ) : <NotAvailable variant="body2" />} */}
                                </Typography>
                                <Divider variant="middle" className={classes.divider} />
                            </Grid>

                            <Grid item xs={12} className={classes.centerContent}>
                                <Typography variant="h6" color="textPrimary">
                                    Please sign in your ledger device…
                                </Typography>
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </Grid>
            </DialogContent>
        </>
    );
};

export default Confirm;
