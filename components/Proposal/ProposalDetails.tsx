import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import BigNumber from 'bignumber.js';
import moment from 'moment';
import React, { useEffect } from 'react';
import MarkdownView from 'react-showdown';

import LedgerDialog from '../Ledger/LedgerDialog';
import NavLink from '../Utils/NavLink';
import NotAvailable from '../Utils/NotAvailable';

const useStyles = makeStyles(() => {
    return {
        root: {
            width: '100%',
            // padding: "1%",
            borderRadius: 5,
            wordWrap: 'break-word'
        },
        item: {
            padding: '0 0 0 0.5rem',
            '& a': {
                color: 'rgba(58, 211, 158, 1)'
            }
        },
        divider: {
            margin: '0.5rem 0 0 0',
            backgroundColor: 'rgba(232, 232, 232, 1)'
        },
        arrowIcon: {
            padding: '0.25rem 0.25rem 0.25rem 0.5rem',
            justifyContent: 'center',
            borderRadius: 5,
            backgroundColor: 'rgba(246, 247, 249, 1) ',
            color: 'rgba(77, 81, 85, 1)',
            '&:hover': { backgroundColor: 'rgba(58, 211, 158, 0.5)' },
            '&:focus': { backgroundColor: 'rgba(58, 211, 158, 0.5)' }
        },
        iconButtonRight: {
            padding: '0',
            float: 'right',
            '&:disabled': {
                display: 'none'
            }
        },
        iconButtonLeft: {
            padding: '0',
            float: 'left',
            '&:disabled': {
                display: 'none'
            }
        },

        centerContent: {
            display: 'flex',
            margin: '1rem 0 -0.5rem 0',
            // justifyContent: "center",
            textAlign: 'center'
        },

        MuiCardContentRootlastChild: {
            paddingBottom: '0rem'
        },

        alignRight: {
            float: 'right',
            wordWrap: 'break-word',
            overflowWrap: 'anywhere',
            display: 'flex',
            textAlign: 'right'
        }
    };
});
type ProposalDetailsProps = {
    proposalId: number;
    proposalTitle: string;
    proposalDescription: string;
    proposalStatus: string;
    proposer: string;
    deposit: string;
    submittedTime: number;
    approvalPhaseTime: number;
    votingPhaseStartTime: number;
    votingPhaseEndTime: number;
    executionPhaseStartTime: number;
    executionPhaseEndTime: number;
    upvoteList: any[];
    totalNumberOfProposals: number;
};

const ProposalDetails = ({
    proposalId,
    proposalTitle,
    proposalDescription,
    proposalStatus,
    proposer,
    deposit,
    submittedTime,
    votingPhaseStartTime,
    votingPhaseEndTime,
    executionPhaseStartTime,
    executionPhaseEndTime,
    upvoteList,
    totalNumberOfProposals
}: ProposalDetailsProps): JSX.Element => {
    const CELO_FRACTION = process.env.CELO_FRACTION ? parseInt(process.env.CELO_FRACTION) : 1e18;

    const prevProposal: number = proposalId - 1;
    const nextProposal: number = proposalId + 1;
    const [maxProposalNumber, setMaxProposalNumber] = React.useState(false);
    const [minProposalNumber, setMinProposalNumber] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState('');
    const [voted, setVoted] = React.useState(false);

    const classes = useStyles();

    useEffect(() => {
        const localUser = localStorage.getItem('currentUserAddress');
        const getLocalUser = localUser ? localUser : '';
        setCurrentUser(getLocalUser);

        if (proposalId === totalNumberOfProposals) {
            setMaxProposalNumber(true);
        }

        if (proposalId === 1) {
            setMinProposalNumber(true);
        }
        if (upvoteList) {
            for (const c in upvoteList) {
                if (upvoteList[c]?.returnValues?.account === currentUser) {
                    setVoted(true);
                }
            }
        }
    });

    return (
        <Card className={classes.root}>
            <CardContent>
                <Grid container spacing={1} justify="center" className={classes.item}>
                    <Grid item xs={10}>
                        <Typography color="textPrimary" variant="subtitle1" gutterBottom>
                            Proposals Details
                        </Typography>
                    </Grid>

                    <Grid item xs={1}>
                        <NavLink
                            href={`/proposal/${prevProposal}`}
                            name={
                                <IconButton
                                    aria-label="Previous Proposal"
                                    className={classes.iconButtonRight}
                                    disabled={minProposalNumber}>
                                    <ArrowBackIosIcon className={classes.arrowIcon} />
                                </IconButton>
                            }
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <NavLink
                            href={`/proposal/${nextProposal}`}
                            name={
                                <IconButton
                                    aria-label="Next Proposal"
                                    className={classes.iconButtonLeft}
                                    disabled={maxProposalNumber}>
                                    <ArrowForwardIosIcon className={classes.arrowIcon} />
                                </IconButton>
                            }
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Divider variant="middle" className={classes.divider} />
                    </Grid>

                    <Grid item xs={6} className={classes.item}>
                        <Typography variant="body2" gutterBottom>
                            Proposal ID
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        {proposalId ? (
                            <Typography variant="body2" className={classes.alignRight}>
                                {proposalId}
                            </Typography>
                        ) : (
                            <NotAvailable variant="body2" className={classes.alignRight} />
                        )}
                    </Grid>

                    <Grid item xs={12}>
                        <Divider variant="middle" className={classes.divider} />
                    </Grid>

                    <Grid item xs={4} lg={6} className={classes.item}>
                        <Typography variant="body2">Proposer</Typography>
                    </Grid>
                    <Grid item xs={8} lg={6}>
                        {proposer ? (
                            <NavLink
                                href={`/account/${proposer}`}
                                name={
                                    <Typography variant="body2" className={classes.alignRight}>
                                        {proposer}
                                    </Typography>
                                }
                            />
                        ) : (
                            <NotAvailable variant="body2" className={classes.alignRight} />
                        )}
                    </Grid>

                    <Grid item xs={12}>
                        <Divider variant="middle" className={classes.divider} />
                    </Grid>

                    <Grid item xs={12} className={classes.item}>
                        <Typography variant="body2">Title</Typography>
                        <Typography variant="body2">
                            {proposalTitle ? (
                                proposalTitle
                            ) : (
                                <NotAvailable variant="body2" className={classes.alignRight} />
                            )}
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Divider variant="middle" className={classes.divider} />
                    </Grid>

                    <Grid item xs={12} className={classes.item}>
                        <Typography variant="body2">Description</Typography>
                        {proposalDescription ? (
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
                        ) : (
                            <NotAvailable variant="body2" className={classes.alignRight} />
                        )}
                    </Grid>

                    <Grid item xs={12}>
                        <Divider variant="middle" className={classes.divider} />
                    </Grid>

                    <Grid item xs={4} lg={6} className={classes.item}>
                        <Typography variant="body2">Deposit</Typography>
                    </Grid>
                    <Grid item xs={8} lg={6}>
                        {deposit ? (
                            <Typography variant="body2" className={classes.alignRight}>
                                {new BigNumber(deposit).dividedBy(CELO_FRACTION).toFormat(2)}{' '}
                            </Typography>
                        ) : (
                            <NotAvailable variant="body2" className={classes.alignRight} />
                        )}
                    </Grid>

                    <Grid item xs={12}>
                        <Divider variant="middle" className={classes.divider} />
                    </Grid>

                    <Grid item xs={4} lg={6} className={classes.item}>
                        <Typography variant="body2">Submitted Time</Typography>
                    </Grid>
                    <Grid item xs={8} lg={6}>
                        {submittedTime ? (
                            <Typography variant="body2" className={classes.alignRight}>
                                {moment.unix(submittedTime).format('Do MMMM YYYY, h:mm:ss a')}
                            </Typography>
                        ) : (
                            <NotAvailable variant="body2" className={classes.alignRight} />
                        )}
                    </Grid>

                    <Grid item xs={12}>
                        <Divider variant="middle" className={classes.divider} />
                    </Grid>

                    <Grid item xs={4} lg={6} className={classes.item}>
                        <Typography variant="body2">Voting Start Time</Typography>
                    </Grid>
                    <Grid item xs={8} lg={6}>
                        {votingPhaseStartTime ? (
                            <Typography variant="body2" className={classes.alignRight}>
                                {moment
                                    .unix(votingPhaseStartTime)
                                    .format('Do MMMM YYYY, h:mm:ss a')}
                            </Typography>
                        ) : (
                            <NotAvailable variant="body2" className={classes.alignRight} />
                        )}
                    </Grid>

                    <Grid item xs={12}>
                        <Divider variant="middle" className={classes.divider} />
                    </Grid>

                    <Grid item xs={4} lg={6} className={classes.item}>
                        <Typography variant="body2">Voting End Time</Typography>
                    </Grid>
                    <Grid item xs={8} lg={6}>
                        {votingPhaseEndTime ? (
                            <Typography variant="body2" className={classes.alignRight}>
                                {moment.unix(votingPhaseEndTime).format('Do MMMM YYYY, h:mm:ss a')}
                            </Typography>
                        ) : (
                            <NotAvailable variant="body2" className={classes.alignRight} />
                        )}
                    </Grid>

                    <Grid item xs={12}>
                        <Divider variant="middle" className={classes.divider} />
                    </Grid>

                    <Grid item xs={4} lg={6} className={classes.item}>
                        <Typography variant="body2">Execution Start Time</Typography>
                    </Grid>
                    <Grid item xs={8} lg={6}>
                        {executionPhaseStartTime ? (
                            <Typography variant="body2" className={classes.alignRight}>
                                {moment
                                    .unix(executionPhaseStartTime)
                                    .format('Do MMMM YYYY, h:mm:ss a')}
                            </Typography>
                        ) : (
                            <NotAvailable variant="body2" className={classes.alignRight} />
                        )}
                    </Grid>

                    <Grid item xs={12}>
                        <Divider variant="middle" className={classes.divider} />
                    </Grid>

                    <Grid item xs={4} lg={6} className={classes.item}>
                        <Typography variant="body2">Execution End Time</Typography>
                    </Grid>
                    <Grid item xs={8} lg={6}>
                        {executionPhaseEndTime ? (
                            <Typography variant="body2" className={classes.alignRight}>
                                {moment
                                    .unix(executionPhaseEndTime)
                                    .format('Do MMMM YYYY, h:mm:ss a')}
                            </Typography>
                        ) : (
                            <NotAvailable variant="body2" className={classes.alignRight} />
                        )}
                    </Grid>

                    {proposalStatus === ('Vote' || 'Referendum') ? (
                        <Grid item xs={12} className={classes.centerContent}>
                            <LedgerDialog
                                action="ProposalVote"
                                buttonLabel="Vote"
                                proposalTitle={proposalTitle}
                                proposalNumber={proposalId}
                                proposer={proposer}
                                proposalDescription={proposalDescription}
                            />
                        </Grid>
                    ) : null}
                </Grid>
            </CardContent>
        </Card>
    );
};

export default ProposalDetails;
