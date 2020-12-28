import { useQuery } from '@apollo/client';
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
import React, { useEffect } from 'react';
import MarkdownView from 'react-showdown';

import LedgerDialog from '../Ledger/LedgerDialog';
import { GET_PROPOSAL } from '../Query/Proposal';
import { GET_PROPOSALS } from '../Query/Proposal';
import ComponentLoader from '../Utils/ComponentLoader';
import ErrorMessage from '../Utils/ErrorMessage';
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
type ProposalDetailsProps = { proposal: string; proposalDetails: string };

const ProposalDetails = ({ proposal, proposalDetails }: ProposalDetailsProps): JSX.Element => {
    const SETPAGE = process.env.SETPAGE ? parseInt(process.env.SETPAGE) : 0;
    const ROWMEDIUM = process.env.ROWMEDIUM ? parseInt(process.env.ROWMEDIUM) : 30;
    const CELO_FRACTION = process.env.CELO_FRACTION ? parseInt(process.env.CELO_FRACTION) : 1e18;

    const getProposal = proposalDetails.split('\n');
    const proposalTitle = getProposal[0].replace('#', ' ');
    const proposalNumber = parseInt(proposal);
    const prevProposal: number = proposalNumber - 1;
    const nextProposal: number = proposalNumber + 1;
    const [maxProposalNumber, setMaxProposalNumber] = React.useState(false);
    const [minProposalNumber, setMinProposalNumber] = React.useState(false);
    const [currentUser, setCurrentUser] = React.useState('');
    const [voted, setVoted] = React.useState(false);
    const page = SETPAGE + 1;
    const pageSize = ROWMEDIUM;
    const field = 'proposalNumber';

    const { loading, error, data } = useQuery(GET_PROPOSAL, {
        variables: { proposalNumber }
    });

    const totalProposals = useQuery(GET_PROPOSALS, {
        variables: { page, pageSize, field }
    });

    const classes = useStyles();
    const totalNumOfProposals =
        totalProposals.data &&
        totalProposals.data.proposals &&
        totalProposals.data.proposals.proposals
            ? totalProposals.data.proposals.proposals.length
            : 0;

    useEffect(() => {
        const localUser = localStorage.getItem('currentUserAddress');
        const getLocalUser = localUser ? localUser : '';
        setCurrentUser(getLocalUser);

        if (proposalNumber === totalNumOfProposals) {
            setMaxProposalNumber(true);
        }

        if (proposalNumber === 1) {
            setMinProposalNumber(true);
        }
        if (data && data.proposal && data.proposal.upvoteList) {
            for (const c in data.proposal.upvoteList) {
                if (data.proposal.upvoteList[c].returnValues.account === currentUser) {
                    setVoted(true);
                }
            }
        }
    });

    if (loading) return <ComponentLoader />;
    if (error) return <ErrorMessage message={error.message} />;

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
                        {data.proposal &&
                        data.proposal.returnValues &&
                        data.proposal.returnValues.proposalId ? (
                            <Typography variant="body2" className={classes.alignRight}>
                                {data.proposal.returnValues.proposalId}
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
                        {data.proposal &&
                        data.proposal.returnValues &&
                        data.proposal.returnValues.proposer ? (
                            <NavLink
                                href={`/account/${data.proposal.returnValues.proposer}`}
                                name={
                                    <Typography variant="body2" className={classes.alignRight}>
                                        {data.proposal.returnValues.proposer}
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
                        {proposalDetails ? (
                            <MarkdownView
                                markdown={proposalDetails}
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
                        {data.proposal &&
                        data.proposal.returnValues &&
                        data.proposal.returnValues.deposit ? (
                            <Typography variant="body2" className={classes.alignRight}>
                                {new BigNumber(data.proposal.returnValues.deposit)
                                    .dividedBy(CELO_FRACTION)
                                    .toFormat(2)}{' '}
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
                        {data.proposal &&
                        data.proposal.returnValues &&
                        data.proposal.returnValues.timestamp ? (
                            <Typography variant="body2" className={classes.alignRight}>
                                {new Date(
                                    parseInt(data.proposal.returnValues.timestamp) * 1000
                                ).toUTCString()}
                            </Typography>
                        ) : (
                            <NotAvailable variant="body2" className={classes.alignRight} />
                        )}
                    </Grid>

                    <Grid item xs={12}>
                        <Divider variant="middle" className={classes.divider} />
                    </Grid>

                    <Grid item xs={4} lg={6} className={classes.item}>
                        <Typography variant="body2">Deposit End Time</Typography>
                    </Grid>
                    <Grid item xs={8} lg={6}>
                        {data.proposal && data.proposal.executionEpoch ? (
                            <Typography variant="body2" className={classes.alignRight}>
                                {new Date(data.proposal.executionEpoch * 1000).toUTCString()}
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
                        {data.proposal && data.proposal.referrendumEpoch ? (
                            <Typography variant="body2" className={classes.alignRight}>
                                {new Date(data.proposal.referrendumEpoch * 1000).toUTCString()}
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
                        {data.proposal && data.proposal.expirationEpoch ? (
                            <Typography variant="body2" className={classes.alignRight}>
                                {new Date(data.proposal.expirationEpoch * 1000).toUTCString()}
                            </Typography>
                        ) : (
                            <NotAvailable variant="body2" className={classes.alignRight} />
                        )}
                    </Grid>

                    <Grid item xs={12}>
                        <Divider variant="middle" className={classes.divider} />
                    </Grid>

                    {(data && data.proposal && data.proposal.status === 'Vote') ||
                    (data && data.proposal && data.proposal.status === 'Referendum') ? (
                        <Grid item xs={12} className={classes.centerContent}>
                            <LedgerDialog
                                action="ProposalVote"
                                buttonLabel="Vote"
                                proposalTitle={proposalTitle}
                                proposalNumber={proposalNumber}
                                proposer={
                                    data.proposal &&
                                    data.proposal.returnValues &&
                                    data.proposal.returnValues.proposer
                                        ? data.proposal.returnValues.proposer
                                        : ''
                                }
                                proposalDescription={proposalDetails}
                            />
                        </Grid>
                    ) : null}
                </Grid>
            </CardContent>
        </Card>
    );
};

export default ProposalDetails;