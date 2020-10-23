import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
//import Link from "../../Ledger.tsx"; 
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import NotAvailable from '../../../misc/NotAvailable'
import { Dialog } from "@material-ui/core";
import MarkdownView from 'react-showdown';
import Vote from './Vote';
import Success from './Success';



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
        backgroundColor: "rgba(232, 232, 232, 1)",
    },

    item: {
        justifyContent: "center",
    },

    wrapText: {
        wordWrap: 'break-word',
        wordBreak: 'break-all',
        '& a': {
            color: 'rgba(58, 211, 158, 1)'
        }
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

type ConfirmProps = { isOpen: boolean, voteSel: string, proposalNum: number, proposalTit: string, proposalDet: string, proposer: string }


const Confirm = ({ isOpen, voteSel, proposalNum, proposalTit, proposalDet, proposer }: ConfirmProps) => {

    const classes = useStyles();
    const [open, setOpen] = React.useState(isOpen);
    const [currentUser, setCurrentUser] = React.useState('');
    const [previousDialog, setPreviousDialog] = React.useState(false)
    const [nextDialog, setNextDialog] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [voteSelection, setVoteSelection] = React.useState(voteSel);
    const [proposalNumber, setProposalNumber] = React.useState(proposalNum);
    const [proposalTitle, setProposalTitle] = React.useState(proposalTit);
    const [proposalDetails, setProposalDetails] = React.useState(proposalDet);
    const [proposalProposer, setProposalProposer] = React.useState(proposer);
    // const [currentAddress, setCurrentAddress] = React.useState(pageAddress || '');
    // const [lockAmount, setLockAmount] = React.useState(amount);


    useEffect(() => {
        let localUser = localStorage.getItem('currentUserAddress');
        //@ts-ignore
        setCurrentUser(localUser)
    });

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

    return (
        <>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="ledger-dialog"
                //fullWidth
                maxWidth="sm"
            >
                <DialogTitle id="ledger-dialog-title" className={classes.dialogTitle}>
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
                                    <Typography color="textPrimary" variant="body2" gutterBottom align="left">
                                        You’re going to vote for {voteSelection}, if that’s correct, please sign in your ledger device.
            </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Divider className={classes.divider} />
                                </Grid>
                                <Grid item xs={6} className={classes.item}>
                                    <Typography variant="body2" color="textPrimary" gutterBottom>
                                        Proposal ID
            </Typography>
                                </Grid>
                                <Grid item xs={6} className={classes.item}>
                                    <Typography variant="body2" align="right" gutterBottom>
                                        {proposalNumber}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Divider className={classes.divider} />
                                </Grid>

                                <Grid item xs={3} className={classes.item} >
                                    <Typography variant="body2" color="textPrimary" gutterBottom >
                                        Proposer
                                    </Typography>
                                </Grid>
                                <Grid item xs={9} className={classes.item}>
                                    <Typography variant="body2" align="right" gutterBottom>
                                        {proposer}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Divider className={classes.divider} />
                                </Grid>

                                <Grid item xs={6} className={classes.item}>
                                    <Typography variant="body2" gutterBottom color="textPrimary" >Type</Typography>
                                </Grid>
                                <Grid item xs={6} className={classes.item}>
                                    <Typography variant="body2" align="right" gutterBottom>
                                        Proposal
                                    </Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Divider className={classes.divider} />
                                </Grid>

                                <Grid item xs={12} className={classes.item}>
                                    <Typography variant="body2" color="textPrimary" gutterBottom>
                                        Title
            </Typography>
                                    <Typography variant="body2" gutterBottom >
                                        {proposalTitle}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Divider className={classes.divider} />
                                </Grid>

                                <Grid item xs={12} className={classes.item}>
                                    <Typography variant="body2" gutterBottom color="textPrimary">
                                        Description
            </Typography>

                                    <Typography variant="body2" className={classes.wrapText}>
                                        <MarkdownView
                                            markdown={proposalDetails}
                                            options={{ tables: true, emoji: true, simplifiedAutoLink: true, smoothLivePreview: true, openLinksInNewWindow: true, }}
                                            flavor="vanilla"
                                        />
                                    </Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Divider className={classes.divider} />
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
            </Dialog>
            { previousDialog ? <Vote isOpen={previousDialog} showButton={false} /> : null}
            {nextDialog ? <Success isOpen={nextDialog} /> : null}
        </>
    );
};

export default Confirm