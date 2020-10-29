import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import MarkdownView from 'react-showdown';

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
        wordBreak: 'break-all',
        '& a': {
            color: 'rgba(58, 211, 158, 1)'
        }
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

type ConfirmProps = {
    amount: string;
    proposalNumber: number;
    proposer: string;
    proposalTitle: string;
    proposalDescription: string;
};

const Confirm = ({
    amount,
    proposalNumber,
    proposer,
    proposalTitle,
    proposalDescription
}: ConfirmProps): JSX.Element => {
    const classes = useStyles();

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
                                    You’re going to deposit {amount} CELO to Proposal{' '}
                                    {proposalNumber}, if that is correct, please sign in your Ledger
                                    device.
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider variant="middle" className={classes.divider} />
                            </Grid>
                            <Grid item xs={3} className={classes.item}>
                                <Typography variant="body2" gutterBottom color="textPrimary">
                                    Proposal ID
                                </Typography>
                            </Grid>
                            <Grid item xs={9} className={classes.item}>
                                <Typography
                                    variant="body2"
                                    align="right"
                                    gutterBottom
                                    color="textPrimary">
                                    {proposalNumber}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider variant="middle" className={classes.divider} />
                            </Grid>
                            <Grid item xs={3} className={classes.item}>
                                <Typography variant="body2" gutterBottom color="textPrimary">
                                    Proposer
                                </Typography>
                            </Grid>
                            <Grid item xs={9} className={classes.item}>
                                <Typography
                                    variant="body2"
                                    align="right"
                                    gutterBottom
                                    color="textPrimary">
                                    {proposer}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
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
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider variant="middle" className={classes.divider} />
                            </Grid>

                            <Grid item xs={12} className={classes.item}>
                                <Typography variant="body2" gutterBottom color="textPrimary">
                                    Title
                                </Typography>
                                <Typography variant="body2" gutterBottom color="textPrimary">
                                    {proposalTitle}
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
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
                                    <MarkdownView
                                        markdown={proposalDescription}
                                        options={{
                                            tables: true,
                                            emoji: true,
                                            simplifiedAutoLink: true,
                                            smoothLivePreview: true,
                                            openLinksInNewWindow: true
                                        }}
                                        flavor="vanilla"
                                    />
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider variant="middle" className={classes.divider} />
                            </Grid>

                            <Grid item xs={12} className={classes.centerContent}>
                                <Typography variant="h6" color="textPrimary">
                                    Please sign in your Ledger device…
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
