import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import { Dialog } from "@material-ui/core";
import UnlockGold from './UnlockGold'
import UnlockGoldSuccess from './UnlockGoldSuccess'
import ControlButtons from '../../ControlButtons'
import Ledger from '../../Ledger'

const useStyles = makeStyles({

    title: {
        display: "block",
        textAlign: "center",
        paddingTop: "0.5rem",
        paddingBottom: "0.7rem",
    },

    dialogTitle: {
        padding: "1rem 1rem 0rem 1rem",
    },

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

    content: {
        paddingTop: "1.4em",
        paddingBottom: "1.7rem",
    },

    iconButtonRight: {
        float: "right"
    },
    iconButtonLeft: {
        float: 'left'
    },

    unlockGoldMessage: {
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
    errorMessage: {
        color: "red",
        textAlign: "center",
        paddingBottom: "1rem"
    },
});

type UnlockGoldConfirmProps = { isOpen: boolean, amount: string, pageAddress?: string };

const UnlockGoldConfirm = ({ isOpen, amount, pageAddress }: UnlockGoldConfirmProps) => {

    const classes = useStyles();
    const [open, setOpen] = React.useState(isOpen);
    const [currentUser, setCurrentUser] = React.useState('');
    const [previousDialog, setPreviousDialog] = React.useState(false)
    const [nextDialog, setNextDialog] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [currentAddress, setCurrentAddress] = React.useState(pageAddress || '')
    const [unlockAmount, setUnlockAmount] = React.useState(amount);


    const handleClose = () => {
        setOpen(false);
    };

    const handlePreviousDialog = () => {
        setOpen(false)
        setPreviousDialog(true);
    };

    const handleNextDialog = () => {
        setOpen(false)
        setNextDialog(true)
    }

    useEffect(() => {
        let localUser = localStorage.getItem('currentUserAddress');
        //@ts-ignore
        setCurrentUser(localUser)

    });

    return (
        <>

                <DialogContent className={classes.content} >
                    <Grid container spacing={1} >
                        <DialogContentText id="ledger-unlock-gold-confirm-content" className={classes.dialog}>
                            <Grid container className={classes.dialogContent}>
                                <Grid item xs={12}>
                                    <Typography variant="body2" noWrap={false} color="textPrimary" gutterBottom>
                                        You are going to unlock {unlockAmount} CELO, it that's correct, please
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
                                            Unlock Amount
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
                                            {unlockAmount} CELO
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
                                <Grid item xs={12} className={classes.unlockGoldMessage}>
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

export default UnlockGoldConfirm 