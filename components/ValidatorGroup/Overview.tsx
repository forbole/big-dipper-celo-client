import { useQuery } from '@apollo/client';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import numbro from 'numbro';
import React, { useEffect } from 'react';

import LedgerDialog from '../Ledger/LedgerDialog';
import { GET_ACCOUNT_DETAILS } from '../Query/Account';
import { GET_VALIDATOR_GROUP } from '../Query/ValidatorGroup';
import Coin from '../Utils/Coin';
import ComponentLoader from '../Utils/ComponentLoader';
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

type OverviewProps = { groupAddress: string };

const Overview = ({ groupAddress }: OverviewProps): JSX.Element => {
    const classes = useStyles();
    const valGroupAddress = groupAddress;
    const [showActivateButton, setShowActivateButton] = React.useState(false);
    const [address, setAddress] = React.useState('');

    useEffect(() => {
        const localUser = localStorage.getItem('currentUserAddress');
        const getLocalUser = localUser ? localUser : '';
        setAddress(getLocalUser);
        checkIfUserHasVotedForGroup();
    });

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { loading, error, data } = useQuery(GET_VALIDATOR_GROUP, {
        variables: { valGroupAddress }
    });

    const accountQuery = useQuery(GET_ACCOUNT_DETAILS, {
        variables: { address },
        pollInterval: 10000
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

    const checkIfUserHasVotedForGroup = () => {
        if (accountQuery) {
            // if (accountQuery?.data?.account?.hasActivatablePendingVotes === true) {
            for (let c = 0; c < accountQuery?.data?.account?.groupsVotedFor?.length; c++) {
                if (accountQuery?.data?.account?.groupsVotedFor[c] === valGroupAddress) {
                    setShowActivateButton(true);
                }
            }
            // }
        }
    };

    if (loading) return <ComponentLoader />;

    return (
        <Card className={classes.root}>
            <CardContent>
                <Grid container spacing={1} className={classes.item}>
                    <Grid item xs={8} md={10} lg={11}>
                        <Typography color="textPrimary" variant="subtitle1" gutterBottom>
                            Overview
                        </Typography>
                    </Grid>
                    {showActivateButton === true ? (
                        <Grid item xs={4} md={2} lg={1}>
                            <LedgerDialog
                                buttonLabel="Activate Votes"
                                action="ValidatorGroupActivateVotes"
                                validatorGroup={valGroupAddress}
                            />
                        </Grid>
                    ) : null}
                    <Grid item xs={12}>
                        <Divider className={classes.divider} />
                    </Grid>
                    <Grid item xs={4} className={classes.item}>
                        <Typography variant="body2">Group Name</Typography>
                    </Grid>
                    <Grid item xs={8} className={classes.item}>
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

                    <Grid item xs={4} className={classes.item}>
                        <Typography variant="body2">Locked CELO</Typography>
                    </Grid>
                    <Grid item xs={8} className={classes.item}>
                        {data?.validatorGroup?.lockedGoldAmount >= 0 ? (
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
                        {data?.validatorGroup?.commission >= 0 ? (
                            <Typography variant="body2" align="right">
                                {data?.validatorGroup?.commission * 100} %
                            </Typography>
                        ) : (
                            <NotAvailable variant="body2" className={classes.alignRight} />
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
