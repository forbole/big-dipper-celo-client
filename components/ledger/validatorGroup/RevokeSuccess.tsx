import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Link from "../../Link";



const useStyles = makeStyles({
    root: {
        justifyContent: "center",
        width: "100%",
    },
    title: {
        display: "block",
        textAlign: "center",
        paddingTop: "0.5rem",
    },

    dialogTitle: {
        padding: "1rem 1rem 0rem 1rem",
    },

    item: {
        justifyContent: "center",
        padding: "1rem"
    },

    controlButton: {
        justifyContent: "center",
        flexWrap: "wrap",
        paddingTop: "2rem",
        textTransform: "none",
        borderRadius: 4,
        //minHeight: "2.5rem",
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

});



const RevokeSuccess = () => {
    const classes = useStyles();
    const [, setOpen] = React.useState(false);



    const handleClose = () => {
        setOpen(false);
    };

    return (<>

        <DialogContent className={classes.root}>
            <Grid container spacing={1} >
                <DialogContentText id="ledger-validator-group-vote" >
                    <Grid container className={classes.item}>
                        <Grid
                            item
                            xs={12}
                            alignItems="center"
                            className={classes.item}
                        ><Typography
                            noWrap
                            align="center"
                        >
                                <img src="/images/success_icon.svg" />
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
                            >
                                The vote was successfully revoked.
                                                  </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Link href="/transactions">
                                <div className={classes.controlButton}>
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
                                </div>
                            </Link>
                        </Grid>
                    </Grid>
                </DialogContentText>
            </Grid>
        </DialogContent>
    </>
    );
};

export default RevokeSuccess