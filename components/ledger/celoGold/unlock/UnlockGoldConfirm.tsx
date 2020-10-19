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
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="ledger-dialog-unlock-gold-confirm"
                //fullWidth
                maxWidth="sm"
            >
                <DialogTitle id="ledger-unlock-gold-confirm" className={classes.dialogTitle}>
                    <Grid container className={classes.item}>
                        <Grid item xs={1}>
                            <IconButton
                                aria-label="Return"
                                className={classes.iconButtonLeft}
                                onClick={handlePreviousDialog}
                            >
                                <img src="/images/last.svg" color="textPrimary" />
                            </IconButton>
                        </Grid>
                        <Grid item xs={10}>
                            <Typography variant="h6" color="textPrimary" noWrap className={classes.title}>
                                Unlock CELO
              </Typography>
                        </Grid>
                        <Grid item xs={1}>
                            <IconButton
                                aria-label="Close"
                                className={classes.iconButtonRight}
                                onClick={handleClose}
                            >
                                <img src="/images/cross.svg" color="textPrimary" />
                            </IconButton>
                        </Grid>
                    </Grid>
                </DialogTitle>

                <DialogContent className={classes.content} >
                    <Grid container spacing={1} >
                        <DialogContentText id="ledger-unlock-gold-confirm-content" className={classes.dialog}>
                            <Grid container className={classes.dialogContent}>
                                <Grid item xs={12}>
                                    <Typography variant="body2" noWrap={false} color="textPrimary" gutterBottom>
                                        You are going to unlock {amount} CELO, it that's correct, please
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
                                            {amount} CELO
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
                                            {"0.00001"} CELO
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
                                {errorMessage ?
                                    <Grid item xs={12} className={classes.errorMessage}>
                                        <Typography variant="body2">
                                            {errorMessage}
                                        </Typography>
                                    </Grid> : null}
                            </Grid>
                        </DialogContentText>
                    </Grid>
                </DialogContent>
            </Dialog>
            { previousDialog ? <UnlockGold isOpen={previousDialog} showButton={false} pageAddress={currentAddress} /> : null}
            {nextDialog ? <UnlockGoldSuccess isOpen={nextDialog} /> : null}
        </>
    );
};

export default UnlockGoldConfirm 