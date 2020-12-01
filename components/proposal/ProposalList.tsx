import { useQuery } from '@apollo/client';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import Chips from '../../components/Chips';
import ComponentLoader from '../misc/ComponentLoader';
import ErrorMessage from '../misc/ErrorMessage';
import MiddleEllipsis from '../misc/MiddleEllipsis';
import NavLink from '../NavLink';
import { GET_PROPOSALS } from '../query/Proposal';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            display: 'flex',
            padding: '1.5%'
        },
        card: {
            display: 'block',
            borderRadius: 4,
            background: 'rgba(255, 255, 255, 1)',
            alignItems: 'center'
        },
        value: {
            padding: '0.5rem 1rem',
            textAlign: 'left'
        },
        label: {
            display: 'flex',
            padding: '0.4rem 0.75rem 0.1rem 0.75rem'
        },
        container: {
            marginTop: '1.5%'
        },
        proposalDescription: {
            padding: '0rem 0 1rem 3rem'
        },
        proposalButton: {
            padding: '0.5rem 1rem 0 0',
            textAlign: 'right'
        },
        proposalCard: {
            marginBottom: '0.5rem'
        },
        proposalTitle: {
            padding: '0 0 0.5rem 0.8rem',
            marginTop: '-0.5rem'
        },
        proposer: {
            paddingTop: '0.5rem',
            textAlign: 'left'
        },

        proposalNum: {
            display: 'flex',
            marginTop: '0.5rem'
        },

        proposerAddress: {
            paddingLeft: '0.5rem'
        }
    })
);

type ProposalListProps = { title: string[] };

const ProposalList = ({ title }: ProposalListProps): JSX.Element => {
    const classes = useStyles();
    const page = process.env.SETPAGE ? parseInt(process.env.SETPAGE) + 1 : 1;
    const pageSize = process.env.ROWMEDIUM ? parseInt(process.env.ROWMEDIUM) : 30;
    const field = 'proposalNumber';

    const { loading, error, data } = useQuery(GET_PROPOSALS, {
        variables: { pageSize, page, field }
    });

    const getProposer = (proposalNumber: number) => {
        let proposer = '';
        if (data && data.proposals && data.proposals.proposals) {
            for (const d in data.proposals.proposals) {
                if (proposalNumber === data.proposals.proposals[d].proposalNumber) {
                    proposer = data.proposals.proposals[d].returnValues.proposer;
                }
            }
        }

        return proposer;
    };

    const findProposalStatus = (proposalNumber: number) => {
        if (data && data.proposals && data.proposals.proposals) {
            console.log(data.proposals.proposals);
            for (const c in data.proposals.proposals) {
                if (proposalNumber === data.proposals.proposals[c].proposalNumber) {
                    if (data.proposals.proposals[c].removed === true) {
                        return <Chips actionResult="Removed" />;
                    }

                    if (data.proposals.proposals[c].status === 'Approved') {
                        return <Chips actionResult="Passed" />;
                    }

                    if (data.proposals.proposals[c].status === 'Rejected') {
                        return <Chips actionResult="Rejected" />;
                    }
                    if (data.proposals.proposals[c].status === 'Vote') {
                        return <Chips actionResult="Vote" />;
                    }
                    if (data.proposals.proposals[c].status === 'Deposit') {
                        return <Chips actionResult="Deposit" />;
                    }
                    if (data.proposals.proposals[c].status === 'Create') {
                        return <Chips actionResult="Create" />;
                    }
                }
            }
        }
    };
    if (loading) return <ComponentLoader />;
    if (error) return <ErrorMessage message={error.message} />;

    return (
        <div>
            <Grid container className={classes.container}>
                <Typography variant="body1" className={classes.proposalTitle}>
                    Proposals
                </Typography>
                {title
                    .slice(0)
                    .reverse()
                    .map((row: any, index: number) => {
                        return (
                            <Grid item xs={12} className={classes.proposalCard} key={index}>
                                <Card className={classes.card} elevation={0}>
                                    <Grid container className={classes.container}>
                                        <Grid item xs={8} sm={10} className={classes.proposalNum}>
                                            <NavLink
                                                href={`/proposal/${row.proposalNumber}`}
                                                name={
                                                    <Typography
                                                        variant="body2"
                                                        className={classes.value}>
                                                        #{row.proposalNumber}
                                                    </Typography>
                                                }
                                                textSecondary
                                            />

                                            <Typography
                                                variant="body2"
                                                className={classes.proposer}>
                                                Proposer
                                                <NavLink
                                                    href={`/proposal/${getProposer(
                                                        row.proposalNumber
                                                    )}`}
                                                    name={
                                                        <MiddleEllipsis
                                                            text={getProposer(row.proposalNumber)}
                                                        />
                                                    }
                                                    className={classes.proposerAddress}
                                                />
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3} sm={2} className={classes.proposalButton}>
                                            {findProposalStatus(row.proposalNumber)}
                                        </Grid>
                                        <Grid
                                            item
                                            xs={11}
                                            sm={8}
                                            className={classes.proposalDescription}>
                                            <NavLink
                                                href={`/proposal/${row.proposalNumber}`}
                                                name={row.proposalTitle}
                                                textSecondary
                                            />
                                        </Grid>
                                    </Grid>
                                </Card>
                            </Grid>
                        );
                    })}
            </Grid>
        </div>
    );
};

export default ProposalList;
