import { useQuery } from '@apollo/client';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import numbro from 'numbro';
import React from 'react';

import LedgerDialog from '../Ledger/LedgerDialog';
import { GET_VALIDATOR_GROUP } from '../Query/ValidatorGroup';
import Coin from '../Utils/Coin';
import ComponentLoader from '../Utils/ComponentLoader';
import ErrorMessage from '../Utils/ErrorMessage';
import NotAvailable from '../Utils/NotAvailable';

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
            fontWeight: 500,
            wordBreak: 'break-all'
        }
    };
});

type OverviewProps = { address: string };

const Overview = ({ address }: OverviewProps): JSX.Element => {
    const classes = useStyles();
    const valGroupAddress = address;

    const { loading, error, data } = useQuery(GET_VALIDATOR_GROUP, {
        variables: { valGroupAddress }
    });

    const validatorGroupMembers = data?.validatorGroup?.members
        ? data?.validatorGroup?.members
        : [];

    const calculateTotalUptime = () => {
        let addScore = 0;
        for (const c in validatorGroupMembers) {
            addScore = addScore + validatorGroupMembers[c].score;
        }
        if (addScore && validatorGroupMembers.length > 0) {
            const totalScore = (addScore / validatorGroupMembers.length) * 100;
            return numbro(totalScore).format('0.00');
        } else {
            return '0.00';
        }
    };

    const calculateAttestation = () => {
        let addTotalRequested = 0;
        let addTotalFulfilled = 0;

        if (data?.validatorGroup) {
            for (const d in data?.validatorGroup?.members) {
                addTotalRequested =
                    addTotalRequested +
                    parseFloat(data?.validatorGroup?.members[d]?.attestationRequested);
                addTotalFulfilled =
                    addTotalFulfilled +
                    parseFloat(data?.validatorGroup?.members[d]?.attestationCompleted);
            }
        }
        if (addTotalFulfilled && addTotalRequested > 0) {
            return numbro((addTotalFulfilled / addTotalRequested) * 100).format('0.00');
        } else {
            return '0.00';
        }
    };

    if (loading) return <ComponentLoader />;
    if (error) return <ErrorMessage />;

    return (
        <Card className={classes.root}>
            <CardContent>
                <Grid container spacing={1} className={classes.item}>
                    <Grid item xs={10} md={11}>
                        <Typography color="textPrimary" variant="subtitle1" gutterBottom>
                            Overview
                        </Typography>
                    </Grid>
                    <Grid item xs={2} md={1}>
                        <LedgerDialog
                            buttonLabel="Activate Votes"
                            action="ValidatorGroupActivateVotes"
                            validatorGroup={valGroupAddress}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Divider className={classes.divider} />
                    </Grid>
                    <Grid item xs={3} className={classes.item}>
                        <Typography variant="body2">Group Name</Typography>
                    </Grid>
                    <Grid item xs={9} className={classes.item}>
                        {data?.validatorGroup?.name ? (
                            <Typography
                                variant="body2"
                                align="right"
                                className={classes.validatorGroupName}>
                                {data?.validatorGroup?.name}
                            </Typography>
                        ) : (
                            <NotAvailable variant="body2" className={classes.alignRight} />
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        <Divider className={classes.divider} />
                    </Grid>

                    <Grid item xs={3} className={classes.item}>
                        <Typography variant="body2">Locked CELO</Typography>
                    </Grid>
                    <Grid item xs={9} className={classes.item}>
                        {data?.validatorGroup?.lockedGoldAmount ? (
                            <Typography variant="body2" align="right">
                                {Coin(data?.validatorGroup?.lockedGoldAmount, 'CELO', 2)}
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
                        {data?.validatorGroup?.commission ? (
                            <Typography variant="body2" align="right">
                                {data?.validatorGroup?.commission * 100} %
                            </Typography>
                        ) : (
                            <NotAvailable variant="body2" />
                        )}
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
                        <Typography variant="body2" align="right">
                            {calculateAttestation()} %
                        </Typography>
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

                    <Grid item xs={6} className={classes.centerContent}>
                        <LedgerDialog
                            action="ValidatorGroupVote"
                            buttonLabel="Vote"
                            validatorGroup={valGroupAddress}
                        />
                    </Grid>
                    <Grid item xs={6} className={classes.centerContent}>
                        <LedgerDialog
                            action="ValidatorGroupRevoke"
                            buttonLabel="Revoke"
                            validatorGroup={valGroupAddress}
                        />
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default Overview;
