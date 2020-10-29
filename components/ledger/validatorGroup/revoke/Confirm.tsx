import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Divider from '@material-ui/core/Divider';
//import Link from "..//Ledger.tsx";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

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
        padding: '1rem'
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
        padding: '0',
        marginLeft: '0.5rem'
    },
    iconButtonLeft: {
        marginLeft: '-0.6rem'
    }
});

type ConfirmProps = { revokeAmount: string };

const Confirm = ({ revokeAmount }: ConfirmProps): JSX.Element => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
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
                                    You’re going to revoke {revokeAmount} Locked CELO to Emma
                                    Garrett, if that’s correct, please sign in your ledger device.
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider variant="middle" className={classes.divider} />
                            </Grid>
                            <Grid item xs={6} className={classes.item}>
                                <Typography variant="body2" color="textPrimary" gutterBottom>
                                    Account
                                </Typography>
                            </Grid>
                            <Grid item xs={6} className={classes.item}>
                                <Typography
                                    variant="body2"
                                    color="textPrimary"
                                    align="right"
                                    gutterBottom>
                                    Michelle Clark
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider variant="middle" className={classes.divider} />
                            </Grid>

                            <Grid item xs={6} className={classes.item}>
                                <Typography variant="body2" color="textPrimary" gutterBottom>
                                    Validator group
                                </Typography>
                            </Grid>
                            <Grid item xs={6} className={classes.item}>
                                <Typography
                                    variant="body2"
                                    color="textPrimary"
                                    align="right"
                                    gutterBottom>
                                    Nan Valdez Group
                                    {/* {data.block &&
              data.block.transactions &&
              data.block.transactions.transactionIndex
                ? data.block.transactions.transactionIndex.length()
                : <NotAvailable variant="body2" />} */}
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <Divider variant="middle" className={classes.divider} />
                            </Grid>

                            <Grid item xs={6} className={classes.item}>
                                <Typography variant="body2" color="textPrimary" gutterBottom>
                                    Amount
                                </Typography>
                            </Grid>
                            <Grid item xs={6} className={classes.item}>
                                <Typography
                                    variant="body2"
                                    color="textPrimary"
                                    align="right"
                                    gutterBottom>
                                    1 Locked CELO
                                    {/* {data.block && data.block.size
                ? data.block.size
                : <NotAvailable variant="body2" />} */}
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
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
