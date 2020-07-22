import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
//import Link from "../../Ledger.tsx"; 
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";




const useStyles = makeStyles({
    root: {
        justifyContent: "center",
    },
    title: {
        display: "block",
        textAlign: "center",
        paddingTop: "0.5rem",
        paddingBottom: "0.3rem"
    },

    dialogTitle: {
        padding: "1rem 1rem 0rem 1rem",
    },

    dialogContent: {
        display: "flex",
    },
    divider: {
        margin: "0.8125rem 0rem",
        backgroundColor: "rgba(62, 67, 71, 1)",
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
        marginRight: "0.5rem",
    },
});



const Confirm = () => {
 
    const classes = useStyles();
    const [, setOpen] = React.useState(false);


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
                            Vote
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
                    <DialogContentText id="ledger-vote" >
                        <Grid container className={classes.dialogContent}>

                            <Grid item xs={12}>
                                <Typography color="textSecondary" variant="body2" gutterBottom align="left">
                                    You’re going to vote for Yes, if that’s correct, please sign in your ledger device.
            </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider variant="middle" className={classes.divider} />
                            </Grid>
                            <Grid item xs={6} className={classes.item}>
                                <Typography variant="body2" gutterBottom>
                                    Proposal ID
            </Typography>
                            </Grid>
                            <Grid item xs={6} className={classes.item}>
                                <Typography variant="body2" align="right" gutterBottom>
                                    10
                {/* {data.block && data.block.timestamp
                ? new Date(parseInt(data.block.timestamp) * 1000).toUTCString()
                : "Data currently not available"}{" "}
              (
              {data && data.block && data.block.timestamp
                ? moment.unix(data.block.timestamp).fromNow()
                : null}
              ) */}
                                </Typography>
                                <Divider variant="middle" className={classes.divider} />
                            </Grid>
                            <Grid item xs={6} className={classes.item} >
                                <Typography variant="body2" gutterBottom >
                                    Proposer
            </Typography>
                            </Grid>
                            <Grid item xs={6} className={classes.item}>
                                <Typography variant="body2" align="right" gutterBottom>
                                    Michelle Clark
                {/* {data.block &&
              data.block.transactions &&
              data.block.transactions.transactionIndex
                ? data.block.transactions.transactionIndex.length()
                : "Data currently not available"} */}
                                </Typography>
                                <Divider variant="middle" className={classes.divider} />
                            </Grid>

                            <Grid item xs={6} className={classes.item}>
                                <Typography variant="body2" gutterBottom>Type</Typography>
                            </Grid>
                            <Grid item xs={6} className={classes.item}>
                                <Typography variant="body2" align="right" gutterBottom>
                                    Proposal
                {/* {data.block && data.block.size
                ? data.block.size
                : "Data currently not available"} */}
                                </Typography>
                                <Divider variant="middle" className={classes.divider} />
                            </Grid>

                            <Grid item xs={12} className={classes.item}>
                                <Typography variant="body2" gutterBottom>
                                    Title
            </Typography>
                                <Typography variant="body2" gutterBottom >
                                    Don’t Burn Deposits for Rejected Governance Proposals Unless Vetoed
                {/* {data.block && data.block.hash
                ? data.block.hash
                : "Data currently not available"} */}
                                </Typography>
                                <Divider variant="middle" className={classes.divider} />
                            </Grid>

                            <Grid item xs={12} className={classes.item}>
                                <Typography variant="body2" gutterBottom>
                                    Description
            </Typography>

                                <Typography variant="body2"  className={classes.wrapText}>
                                    Governance Working Group - Q1 2020 funding Community-spend proposal submitted by Gavin Birch (https://twitter.com/Ether_Gavin) of Figment Networks (https://figment.network) -=-=- Full proposal: https://ipfs.io/ipfs/QmSMGEoY2dfxADPfgoAsJxjjC6hwpSNx1dXAqePiCEMCbY
                {/* {data.block && data.block.parentHash ? (
                <Link
                  href="transaction/[transaction]/"
                  as={`transaction/${data.block.parentHash}`}
                  color="secondary"
                  //className={classes.leftInline}
                >
                  {data.block.parentHash}
                </Link>
              ) : (
                "Data currently not available"
              )} */}
                                </Typography>
                                <Divider variant="middle" className={classes.divider} />
                            </Grid>


                            <Grid item xs={12} className={classes.centerContent}>
                                <Typography variant="h6" >
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