import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import LockGold from './LockGold'
import LockGoldSuccess from './LockGoldSuccess'
import Dialog from "@material-ui/core/Dialog";
import Ledger from '../../Ledger'

const useStyles = makeStyles({


    dialogContent: {
        display: "flex",
    },
    divider: {
        marginTop: "0.5rem",
        backgroundColor: "rgba(232, 232, 232, 1)",
    },

    dialog: {
        paddingBottom: '1rem'
    },


    item: {
        justifyContent: "center",
    },

    lockGoldMessage: {
        marginTop: "1rem",
        marginBottom: "-0.8rem",
    },

    alignLeft: {
        display: "flex",
        overflow: "auto",
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
    },
    alignRight: {
        display: "block",
        float: "right",
        paddingTop: "0.5rem",
        paddingBottom: "0.5rem",
    },

});

type LockGoldConfirmProps = { amount: string };


const LockGoldConfirm = ({ amount }: LockGoldConfirmProps) => {

    const classes = useStyles();
    const [currentUser, setCurrentUser] = React.useState('');
    const [lockAmount, setLockAmount] = React.useState(amount);


    useEffect(() => {
        let localUser = localStorage.getItem('currentUserAddress');
        //@ts-ignore
        setCurrentUser(localUser)
    });

    return (
        <>
            <DialogContent >
                <Grid container spacing={1} >
                    <DialogContentText id="ledger-lock-gold-confirm" className={classes.dialog}>
                        <Grid container className={classes.dialogContent}>
                            <Grid item xs={12}>
                                <Typography variant="body2" noWrap={false} color="textPrimary" gutterBottom>
                                    You are going to lock {lockAmount} CELO, it that's correct, please
                                    sign in your ledger device.
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider className={classes.divider} />
                            </Grid>
                            <Grid container spacing={1} className={classes.item}>
                                <Grid item xs={6}>
                                    <Typography
                                        variant="body2"
                                        noWrap
                                        className={classes.alignLeft}
                                        align="left"
                                        color="textPrimary"
                                    >
                                        Account
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography
                                        variant="body2"
                                        noWrap
                                        className={classes.alignRight}
                                        align="right"
                                        color="textPrimary"
                                    >
                                        {currentUser}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider className={classes.divider} />
                            </Grid>
                            <Grid container spacing={1} className={classes.item}>
                                <Grid item xs={6}>
                                    <Typography
                                        variant="body2"
                                        noWrap
                                        className={classes.alignLeft}
                                        align="left"
                                        color="textPrimary"
                                    >
                                        Lock Amount
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography
                                        variant="body2"
                                        noWrap
                                        className={classes.alignRight}
                                        align="right"
                                        color="textPrimary"
                                    >
                                        {lockAmount} CELO
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider className={classes.divider} />
                            </Grid>
                            <Grid container spacing={1} className={classes.item}>
                                <Grid item xs={6}>
                                    <Typography
                                        variant="body2"
                                        noWrap
                                        className={classes.alignLeft}
                                        align="left"
                                        color="textPrimary"
                                    >
                                        Tx Fee
                                    </Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <Typography
                                        variant="body2"
                                        noWrap
                                        className={classes.alignRight}
                                        align="right"
                                        color="textPrimary"
                                    >
                                        {"UNKNOWN"} CELO
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider className={classes.divider} />
                            </Grid>
                            <Grid item xs={12} className={classes.lockGoldMessage}>
                                <Typography variant="h6" noWrap align="center" color="textPrimary" >
                                    Please sign in your ledger device...
                </Typography>
                            </Grid>
                        </Grid>
                    </DialogContentText>
                </Grid>
            </DialogContent>

        </>
    );
};

export default LockGoldConfirm 