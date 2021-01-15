import { useQuery } from '@apollo/client';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import { GET_PROPOSALS } from '../Query/Proposal';
import Chips from '../Utils/Chips';
import ComponentLoader from '../Utils/ComponentLoader';
import ErrorMessage from '../Utils/ErrorMessage';
import MiddleEllipsis from '../Utils/MiddleEllipsis';
import NavLink from '../Utils/NavLink';

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

type ProposalListProps = { title: any };

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

    if (title.proposalTitle.length > 0) {
        return (
            <div>
                <Grid container className={classes.container}>
                    <Typography variant="body1" className={classes.proposalTitle}>
                        Proposals
                    </Typography>
                    {title?.proposalTitle?.map((row: any, index: number) => {
                        return (
                            <Grid item xs={12} className={classes.proposalCard} key={index}>
                                <Card className={classes.card} elevation={0}>
                                    <Grid container className={classes.container}>
                                        <Grid item xs={8} sm={10} className={classes.proposalNum}>
                                            <NavLink
                                                href={`/proposal/${row.proposalNumber - 1}`}
                                                name={
                                                    <Typography
                                                        variant="body2"
                                                        className={classes.value}>
                                                        #{row.proposalNumber - 1}
                                                    </Typography>
                                                }
                                                textSecondary
                                            />

                                            <Typography
                                                variant="body2"
                                                className={classes.proposer}>
                                                Proposer
                                                <NavLink
                                                    href={`/account/${row?.proposer}`}
                                                    name={<MiddleEllipsis text={row?.proposer} />}
                                                    className={classes.proposerAddress}
                                                />
                                            </Typography>
                                        </Grid>
                                        <Grid item xs={3} sm={2} className={classes.proposalButton}>
                                            {row.proposalStatus ? (
                                                <Chips actionResult={`${row.proposalStatus}`} />
                                            ) : row.proposalStage ? (
                                                <Chips actionResult={`${row.proposalStage}`} />
                                            ) : null}
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
    } else {
        return <ComponentLoader />;
    }
};

export default ProposalList;
