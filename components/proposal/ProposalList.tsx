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
            //justifyContent: "center",
            //margin: "2%",
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
        }
    })
);

type ProposalListProps = { title: string };

const ProposalList = ({ title }: ProposalListProps): JSX.Element => {
    const classes = useStyles();
    const page = process.env.SETPAGE ? parseInt(process.env.SETPAGE) + 1 : 1;
    const pageSize = process.env.ROWMEDIUM ? parseInt(process.env.ROWMEDIUM) : 30;
    const field = 'proposalNumber';

    const { loading, error, data } = useQuery(GET_PROPOSALS, {
        variables: { pageSize, page, field }
    });

    if (loading) return <ComponentLoader />;
    if (error) return <ErrorMessage message={error.message} />;

    return (
        <div>
            <Grid container className={classes.container}>
                <Typography variant="body1" className={classes.proposalTitle}>
                    Proposals
                </Typography>
                {data.proposals.proposals.map((row: any, index: number) => {
                    return (
                        <Grid item xs={12} className={classes.proposalCard} key={index}>
                            <Card className={classes.card} elevation={0}>
                                <Grid container className={classes.container}>
                                    <Grid item xs={8} sm={10} className={classes.proposalNum}>
                                        {row.returnValues && row.returnValues.proposalId ? (
                                            <NavLink
                                                href={`/proposal/${row.returnValues.proposalId}`}
                                                name={
                                                    <Typography
                                                        variant="body2"
                                                        className={classes.value}>
                                                        #{row.returnValues.proposalId}
                                                    </Typography>
                                                }
                                            />
                                        ) : null}
                                        <Typography variant="body2" className={classes.proposer}>
                                            Proposer{' '}
                                            {row.returnValues && row.returnValues.proposer ? (
                                                <NavLink
                                                    href={`/proposal/${row.returnValues.proposer}`}
                                                    name={
                                                        <MiddleEllipsis
                                                            text={row.returnValues.proposer}
                                                        />
                                                    }
                                                />
                                            ) : null}
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={3} sm={2} className={classes.proposalButton}>
                                        {row.removed ? <Chips actionResult="Removed" /> : null}
                                        {row.status === 'Approved' ? (
                                            <Chips actionResult="Passed" />
                                        ) : null}
                                        {row.status === 'Rejected' ? (
                                            <Chips actionResult="Rejected" />
                                        ) : null}
                                        {row.status === 'Vote' ? (
                                            <Chips actionResult="Vote" />
                                        ) : null}
                                        {row.status === 'Deposit' ? (
                                            <Chips actionResult="Deposit" />
                                        ) : null}
                                        {row.status === 'Create' ? (
                                            <Chips actionResult="Create" />
                                        ) : null}
                                    </Grid>
                                    <Grid
                                        item
                                        xs={11}
                                        sm={8}
                                        className={classes.proposalDescription}>
                                        {row.returnValues &&
                                        row.returnValues.proposalId &&
                                        title ? (
                                            <NavLink
                                                href={`/proposal/${row.returnValues.proposalId}`}
                                                name={title[index]}
                                                textSecondary
                                            />
                                        ) : null}
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
