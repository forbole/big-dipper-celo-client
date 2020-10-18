import Button from "@material-ui/core/Button";
import Link from "../../../Link";
import Grid from "@material-ui/core/Grid";
import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Typography from "@material-ui/core/Typography";
import { Dialog } from "@material-ui/core";


const useStyles = makeStyles({
    root: {
        justifyContent: "center",
    },

    item: {
        justifyContent: "center",
    },

    controlButton: {
        justifyContent: "center",
        flexWrap: "wrap",
        paddingTop: "3rem",
        textTransform: "none",
        borderRadius: 4,
        width: "100%",
    },
    controlButtonLabel: {
        display: "flex",
        textTransform: "none",
        borderRadius: 4,
        justifyContent: "center",
        minHeight: "2.5rem",
        textAlign: "center",
    },

    icon: {
        paddingBottom: "1rem",
        paddingTop: "3.5rem"
    },

    paddingBottom: {
        paddingBottom: "1rem"
    },
    
    dialogContent:{
        padding: "4.2rem"
    }

});

type UnlockGoldSuccessProps = { isOpen: boolean };


const UnlockGoldSuccess = ({ isOpen }: UnlockGoldSuccessProps) => {

    const classes = useStyles();
    const [open, setOpen] = React.useState(isOpen);


    const handleClose = () => {
        setOpen(false);
    };


    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="ledger-dialog-unlock-gold-success"
                //fullWidth
                maxWidth="sm"
            >
                <DialogContent className={classes.dialogContent}>
                    <Grid container spacing={1} className={classes.root}>
                        <DialogContentText id="ledger-validator-group-vote" >
                            <Grid container className={classes.item}>
                                <Grid
                                    item
                                    xs={12}
                                    alignItems="center"
                                    className={classes.icon}
                                ><Typography
                                    noWrap
                                    align="center"
                                >
                                        <img src="/images/success-icon.svg" />
                                    </Typography>
                                </Grid>
                                <Grid
                                    item
                                    xs={12}
                                    alignItems="center"
                                >
                                    <Typography
                                        variant="body2"
                                        noWrap
                                        align="center"
                                        color="textPrimary"
                                    >
                                        Unlocked Successfully
                                                  </Typography>
                                </Grid>


                                <Grid item xs={12} md={10} className={classes.controlButton} alignItems="center">
                                    <Link href="/transactions">
                                        <Button
                                            variant="outlined"
                                            color="secondary"
                                            className={classes.controlButtonLabel}
                                            fullWidth={true}
                                            onClick={handleClose}

                                        >
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
            </Dialog>
        </>
    );
};

export default UnlockGoldSuccess