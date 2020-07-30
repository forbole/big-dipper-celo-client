import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
//import Link from "..//Ledger.tsx"; 
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import NotAvailable from '../../../misc/NotAvailable'




const useStyles = makeStyles({
    root: {
        justifyContent: "center",
    },
    title: {
        display: "block",
        textAlign: "center",
        paddingTop: "0.5rem",
    },

    dialogTitle: {
        padding: "1rem",
    },

    dialogContent: {
        display: "flex",
    },
    divider: {
        margin: "0.8125rem 0rem",
        backgroundColor: "rgba(62, 67, 71, 1)",
    },

    dialog: {
        paddingBottom: '1rem'
    },


    item: {
        justifyContent: "center",
    },

    wrapText: {
        wordWrap: 'break-word',
        wordBreak: 'break-all'

    },

    centerContent: {
        display: "flex",
        justifyContent: "center",
    },
    iconButtonRight: {
        padding: "0",
        marginLeft: "0.5rem",
    },
    iconButtonLeft: {
        marginLeft: "-0.6rem",
    },

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
                        <IconButton
                            aria-label="Return"
                            className={classes.iconButtonLeft}
                        >
                            <img src="/images/last.svg" color="textPrimary" />
                        </IconButton>
                    </Grid>
                    <Grid item xs={10}>
                        <Typography variant="h6" color="textPrimary" noWrap className={classes.title}>
                            Revoke the vote
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

            <DialogContent >
                <Grid container spacing={1} >
                    <DialogContentText id="ledger-vote" className={classes.dialog}>
                        <Grid container className={classes.dialogContent}>

                            <Grid item xs={12} >
                                <Typography color="textPrimary" variant="body2" gutterBottom align="left">
                                    You’re going to revoke 1 Locked CGLD to Emma Garrett, if that’s correct, please sign in your ledger device.
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
                                <Typography variant="body2" color="textPrimary" align="right" gutterBottom>
                                    Michelle Clark
                {/* {data.block && data.block.timestamp
                ? new Date(parseInt(data.block.timestamp) * 1000).toUTCString()
                : <NotAvailable variant="body2" />}
              (
              {data && data.block && data.block.timestamp
                ? moment.unix(data.block.timestamp).fromNow()
                : null}
              ) */}
                                </Typography>

                            </Grid>
                            <Grid item xs={12}>
                                <Divider variant="middle" className={classes.divider} />
                            </Grid>

                            <Grid item xs={6} className={classes.item} >
                                <Typography variant="body2" color="textPrimary" gutterBottom >
                                    Validator group
            </Typography>
                            </Grid>
                            <Grid item xs={6} className={classes.item}>
                                <Typography variant="body2" color="textPrimary" align="right" gutterBottom>
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
                                <Typography variant="body2" color="textPrimary" gutterBottom>Amount</Typography>
                            </Grid>
                            <Grid item xs={6} className={classes.item}>
                                <Typography variant="body2" color="textPrimary" align="right" gutterBottom>
                                    1 Locked CGLD
                {/* {data.block && data.block.size
                ? data.block.size
                : <NotAvailable variant="body2" />} */}
                                </Typography>
                              
                            </Grid>

                            <Grid item xs={12}>
                                <Divider variant="middle" className={classes.divider} />
                            </Grid>

                            <Grid item xs={12} className={classes.centerContent}>
                                <Typography variant="h6" color="textPrimary" >
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

export default Confirm