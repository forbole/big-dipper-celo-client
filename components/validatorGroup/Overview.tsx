import { useQuery } from '@apollo/client';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import BigNumber from 'bignumber.js';
import numbro from 'numbro';
import React from 'react';

import LedgerDialog from '../ledger/LedgerDialog';
import ComponentLoader from '../misc/ComponentLoader';
import ErrorMessage from '../misc/ErrorMessage';
import NotAvailable from '../misc/NotAvailable';
import { GET_ACCOUNT_DETAILS } from '../query/Account';
import { GET_VALIDATOR_GROUP } from '../query/ValidatorGroup';

const useStyles = makeStyles(() => {
    return {
        root: {
            width: '100%',
            borderRadius: 5,
            wordWrap: 'break-word'
        },
        item: {
            padding: '0.5rem'
        },
        divider: {
            margin: '0.15rem 0rem',
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

        cardItem: {
            padding: '1rem'
        },

        alignRight: {
            float: 'right'
        },

        validatorGroupName: {
            display: 'block',
            color: 'rgba(46,137,90, 1)',
            fontWeight: 500
        }
    };
});

type OverviewProps = { address: string };

const Overview = ({ address }: OverviewProps): JSX.Element => {
    const classes = useStyles();
    const valGroupAddress = address;
    const CELO_FRACTION = process.env.CELO_FRACTION ? parseInt(process.env.CELO_FRACTION) : 1e18;

    const { loading, error, data } = useQuery(GET_VALIDATOR_GROUP, {
        variables: { valGroupAddress }
    });

    const accountData = useQuery(GET_ACCOUNT_DETAILS, {
        variables: { address }
    });

    const validatorGroupMembers =
        data && data.validatorGroup && data.validatorGroup.members
            ? data.validatorGroup.members
            : [];

    const calculateTotalUptime = () => {
        let addScore = 0;
        for (const c in validatorGroupMembers) {
            addScore = addScore + validatorGroupMembers[c].score;
        }
        const totalScore = (addScore / validatorGroupMembers.length) * 100;
        return numbro(totalScore).format('0.00');
    };

    if (loading) return <ComponentLoader />;
    if (error) return <ErrorMessage message={error.message} />;

    return (
        <Card className={classes.root}>
            <CardContent>
                <Grid container spacing={1} justify="center" className={classes.item}>
                    <Grid item xs={12}>
                        <Typography color="textPrimary" variant="subtitle1" gutterBottom>
                            Overview
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider className={classes.divider} />
                    </Grid>
                    <Grid item xs={6} className={classes.item}>
                        <Typography variant="body2">Group Name</Typography>
                    </Grid>
                    <Grid item xs={6} className={classes.item}>
                        {data.validatorGroup && data.validatorGroup.name ? (
                            <Typography
                                variant="body2"
                                align="right"
                                className={classes.validatorGroupName}>
                                {data.validatorGroup.name}
                            </Typography>
                        ) : (
                            <NotAvailable variant="body2" className={classes.alignRight} />
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <Divider className={classes.divider} />
                    </Grid>

                    <Grid item xs={6} className={classes.item}>
                        <Typography variant="body2">Locked CELO</Typography>
                    </Grid>
                    <Grid item xs={6} className={classes.item}>
                        {data && data.validatorGroup && data.validatorGroup.lockedGoldAmount ? (
                            <Typography variant="body2" align="right">
                                {new BigNumber(
                                    data.validatorGroup.lockedGoldAmount / CELO_FRACTION
                                ).toFormat(2)}{' '}
                                CELO
                            </Typography>
                        ) : (
                            <NotAvailable variant="body2" className={classes.alignRight} />
                        )}
                    </Grid>

                    <Grid item xs={12}>
                        <Divider className={classes.divider} />
                    </Grid>

                    <Grid item xs={6} className={classes.item}>
                        <Typography variant="body2">Group Share</Typography>
                    </Grid>
                    <Grid item xs={6} className={classes.item}>
                        <Typography variant="body2" align="right">
                            10%
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Divider className={classes.divider} />
                    </Grid>

                    <Grid item xs={6} className={classes.item}>
                        <Typography variant="body2">Uptime</Typography>
                    </Grid>
                    <Grid item xs={6} className={classes.item}>
                        <Typography variant="body2" align="right">
                            {calculateTotalUptime()} %
                        </Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Divider className={classes.divider} />
                    </Grid>

                    <Grid item xs={6} className={classes.item}>
                        <Typography variant="body2">Attestation</Typography>
                    </Grid>
                    <Grid item xs={6} className={classes.item}>
                        {accountData.data && accountData.data.account.attestation ? (
                            <Typography variant="body2" align="right">
                                {accountData.data.account.attestation}
                            </Typography>
                        ) : (
                            <NotAvailable variant="body2" className={classes.alignRight} />
                        )}
                    </Grid>

                    {/* <Grid item xs={12}>
                        <Divider className={classes.divider} />
                    </Grid>

                    <Grid item xs={12} className={classes.item}>
                        <Typography variant="body2">Description</Typography>
                        <Typography variant="body2">
                            Integer at faucibus urna. Nullam condimentum leo id elit sagittis
                            auctor. Curabitur elementum nunc a leo imperdiet, nec elementum diam
                            elementum. Etiam elementum euismod commodo. Proin eleifend eget quam ut
                            efficitur. Mauris a accumsan mauris.
                        </Typography>
                    </Grid> */}

                    <Grid item xs={12}>
                        <Divider className={classes.divider} />
                    </Grid>

                    <Grid item xs={12} className={classes.centerContent}>
                        <LedgerDialog action="ValidatorGroupVote" buttonLabel="Vote" />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default Overview;
