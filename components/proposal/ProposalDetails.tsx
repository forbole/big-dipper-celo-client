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
import React from 'react';
import MarkdownView from 'react-showdown';

import Link from '../Link';
import ComponentLoader from '../misc/ComponentLoader';
import ErrorMessage from '../misc/ErrorMessage';
import NotAvailable from '../misc/NotAvailable';
import { GET_PROPOSAL } from '../query/Proposal';

const useStyles = makeStyles(() => {
    return {
        root: {
            width: '100%',
            // padding: "1%",
            borderRadius: 5,
            wordWrap: 'break-word'
        },
        item: {
            padding: '0 0 0 0.5rem'
        },
        divider: {
            margin: '0.5rem 0 0 0',
            backgroundColor: 'rgba(232, 232, 232, 1)'
        },
        arrowIcon: {
            padding: '0.25rem',
            justifyContent: 'center',
            border: 'solid rgba(67, 72, 76, 1) ',
            borderRadius: 5,
            backgroundColor: 'rgba(77, 81, 85, 1)',
            color: 'rgba(255, 255, 255, 0.6)',
            height: '1.5rem',
            width: '1.5rem'
        },
        iconButtonRight: {
            padding: '0',
            float: 'right'
        },
        iconButtonLeft: {
            padding: '0',
            float: 'left'
        },

        centerContent: {
            display: 'flex',
            margin: '1rem 0 -0.5rem 0',
            justifyContent: 'center'
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
        },

        markdownFile: {
            '& a': {
                color: 'rgba(58, 211, 158, 1)'
            }
        }
    };
});

type ProposalDetailsProps = { proposal: string; proposalDetails: string };

const ProposalDetails = ({ proposal, proposalDetails }: ProposalDetailsProps): JSX.Element => {
    const getProposal = proposalDetails.split('\n');
    const proposalTitle = getProposal[0].replace('#', ' ');
    const proposalNumber = parseInt(proposal);
    const prevProposal: number = proposalNumber - 1;
    const nextProposal: number = proposalNumber + 1;

    const { loading, error, data } = useQuery(GET_PROPOSAL, {
        variables: { proposalNumber }
    });

    const classes = useStyles();

    if (loading) return <ComponentLoader />;
    if (error) return <ErrorMessage message={error.message} />;

    const CELO_FRACTION = process.env.CELO_FRACTION ? parseInt(process.env.CELO_FRACTION) : 1e18;

    return (
        <Card className={classes.root}>
            <CardContent>
                <Grid container spacing={1} justify="center" className={classes.item}>
                    <Grid item xs={10}>
                        <Typography color="textSecondary" variant="subtitle1" gutterBottom>
                            Proposals Details
                        </Typography>
                    </Grid>

                    <Grid item xs={1}>
                        <Link
                            href="/proposal/[proposal]/"
                            as={`/proposal/${prevProposal}`}
                            color="secondary">
                            <IconButton
                                aria-label="Previous Proposal"
                                className={classes.iconButtonRight}>
                                <ArrowBackIosIcon className={classes.arrowIcon} />
                            </IconButton>
                        </Link>
                    </Grid>
                    <Grid item xs={1}>
                        <Link
                            href="/proposal/[proposal]/"
                            as={`/proposal/${nextProposal}`}
                            color="secondary">
                            {' '}
                            <IconButton
                                aria-label="Next Proposal"
                                className={classes.iconButtonLeft}>
                                <ArrowForwardIosIcon className={classes.arrowIcon} />
                            </IconButton>
                        </Link>
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
                        <Typography variant="body2" className={classes.alignRight}>
                            {data.proposal &&
                            data.proposal.returnValues &&
                            data.proposal.returnValues.proposalId ? (
                                data.proposal.returnValues.proposalId
                            ) : (
                                <NotAvailable variant="body2" />
                            )}
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Divider variant="middle" className={classes.divider} />
                    </Grid>

                    <Grid item xs={4} lg={6} className={classes.item}>
                        <Typography variant="body2">Proposer</Typography>
                    </Grid>
                    <Grid item xs={8} lg={6}>
                        <Typography variant="body2" className={classes.alignRight}>
                            {data.proposal &&
                            data.proposal.returnValues &&
                            data.proposal.returnValues.proposer ? (
                                data.proposal.returnValues.proposer
                            ) : (
                                <NotAvailable variant="body2" />
                            )}
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Divider variant="middle" className={classes.divider} />
                    </Grid>

                    <Grid item xs={12} className={classes.item}>
                        <Typography variant="body2">Title</Typography>
                        <Typography variant="body2">
                            {proposalTitle ? proposalTitle : <NotAvailable variant="body2" />}
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Divider variant="middle" className={classes.divider} />
                    </Grid>

                    <Grid item xs={12} className={classes.item}>
                        <Typography variant="body2">Description</Typography>

                        <Typography variant="body2" className={classes.markdownFile}>
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
                                <NotAvailable variant="body2" />
                            )}
                        </Typography>
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
                                {new BigNumber(
                                    data.proposal.returnValues.deposit / CELO_FRACTION
                                ).toFormat()}
                            </Typography>
                        ) : (
                            <NotAvailable variant="body2" />
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
                            <NotAvailable variant="body2" />
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
                            <NotAvailable variant="body2" />
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
                            <NotAvailable variant="body2" />
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
                            <NotAvailable variant="body2" />
                        )}
                    </Grid>

                    <Grid item xs={12}>
                        <Divider variant="middle" className={classes.divider} />
                    </Grid>

                    <Grid item xs={12} className={classes.centerContent}>
                        {/* <LedgerButtons option="Vote" /> */}
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default ProposalDetails;
