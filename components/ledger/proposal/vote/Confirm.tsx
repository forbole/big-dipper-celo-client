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
        paddingBottom: '0.3rem'
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
        marginRight: '0.5rem'
    }
});

type ConfirmProps = {
    vote: string;
    proposalNumber: number;
    proposer: string;
    proposalTitle: string;
    proposalDescription: string;
};

const Confirm = ({
    vote,
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
                    <DialogContentText id="ledger-vote">
                        <Grid container className={classes.dialogContent}>
                            <Grid item xs={12}>
                                <Typography
                                    color="textSecondary"
                                    variant="body2"
                                    gutterBottom
                                    align="left">
                                    You’re going to vote {vote}, if that’s correct, please sign in
                                    your Ledger device.
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider variant="middle" className={classes.divider} />
                            </Grid>
                            <Grid item xs={3} className={classes.item}>
                                <Typography variant="body2" gutterBottom>
                                    Proposal ID
                                </Typography>
                            </Grid>
                            <Grid item xs={9} className={classes.item}>
                                <Typography variant="body2" align="right" gutterBottom>
                                    {proposalNumber}
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <Divider variant="middle" className={classes.divider} />
                            </Grid>

                            <Grid item xs={3} className={classes.item}>
                                <Typography variant="body2" gutterBottom>
                                    Proposer
                                </Typography>
                            </Grid>
                            <Grid item xs={9} className={classes.item}>
                                <Typography variant="body2" align="right" gutterBottom>
                                    {proposer}
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <Divider variant="middle" className={classes.divider} />
                            </Grid>

                            <Grid item xs={6} className={classes.item}>
                                <Typography variant="body2" gutterBottom>
                                    Type
                                </Typography>
                            </Grid>
                            <Grid item xs={6} className={classes.item}>
                                <Typography variant="body2" align="right" gutterBottom>
                                    Proposal
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <Divider variant="middle" className={classes.divider} />
                            </Grid>

                            <Grid item xs={12} className={classes.item}>
                                <Typography variant="body2" gutterBottom>
                                    Title
                                </Typography>
                                <Typography variant="body2" gutterBottom>
                                    {proposalTitle}
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <Divider variant="middle" className={classes.divider} />
                            </Grid>

                            <Grid item xs={12} className={classes.item}>
                                <Typography variant="body2" gutterBottom>
                                    Description
                                </Typography>

                                <Typography
                                    variant="body2"
                                    color="textPrimary"
                                    className={classes.wrapText}>
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
                                <Typography variant="h6">
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
