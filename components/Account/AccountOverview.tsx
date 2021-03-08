import { useQuery } from '@apollo/client';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { useEffect } from 'react';

import LedgerDialog from '../Ledger/LedgerDialog';
import { GET_ACCOUNT_DETAILS } from '../Query/Account';
import { GET_CHAIN } from '../Query/Chain';
import { GET_VALIDATOR } from '../Query/Validator';
import Coin from '../Utils/Coin';
import ComponentLoader from '../Utils/ComponentLoader';
import ErrorMessage from '../Utils/ErrorMessage';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            padding: '1rem'
        },
        alignLeft: {
            display: 'flex',
            overflow: 'auto'
        },
        alignRight: {
            display: 'block',
            float: 'right',
            fontWeight: 300
        },
        buttonUnlock: {
            justifyContent: 'center',
            [theme.breakpoints.down('xs')]: {
                width: '7.5rem'
            },
            width: '9.5rem',
            padding: '0.5rem',
            textTransform: 'none',
            border: 'solid thin',
            margin: '0.3rem 0 0.2rem 1rem'
        },
        buttonLock: {
            justifyContent: 'center',
            [theme.breakpoints.down('xs')]: {
                width: '7.5rem'
            },
            width: '9.5rem',
            padding: '0.5rem',
            textTransform: 'none',
            border: 'solid thin',
            margin: '0.3rem 1rem 0.2rem 0'
        },
        box: {
            letterSpacing: '1px',
            paddingBottom: '1rem',
            display: 'block',
            overflow: 'hidden',
            whiteSpace: 'nowrap'
        },
        divider: {
            backgroundColor: 'rgba(232, 232, 232, 1)'
        },
        centerButtons: {
            justifyContent: 'center',
            flexWrap: 'wrap',
            padding: '0.1rem',
            textTransform: 'none'
        },
        centerContent: {
            display: 'flex',
            justifyContent: 'center'
        },

        validatorName: {
            display: 'block',
            float: 'right',
            color: 'rgba(46,137,90, 1)',
            fontWeight: 500
        }
    })
);

type AccountOverviewProps = { address: string };

const AccountOverview = ({ address }: AccountOverviewProps): JSX.Element => {
    const classes = useStyles();
    const [currentUser, setCurrentUser] = React.useState('');

    const accountQuery = useQuery(GET_ACCOUNT_DETAILS, {
        variables: { address },
        pollInterval: 5000
    });

    const chainQuery = useQuery(GET_CHAIN, {});

    const validatorQuery = useQuery(GET_VALIDATOR, {
        variables: { address }
    });

    useEffect(() => {
        const localUser = localStorage.getItem('currentUserAddress');
        const getLocalUser = localUser ? localUser : '';
        setCurrentUser(getLocalUser);
    });

    if (accountQuery?.loading || chainQuery?.loading) return <ComponentLoader />;
    if (accountQuery?.error || chainQuery?.error) return <ErrorMessage />;
    return (
        <span>
            <Card className={classes.root}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typography variant="body1" className={classes.box}>
                            Overview
                        </Typography>
                        <Divider className={classes.divider} />
                    </Grid>
                    {validatorQuery?.data?.validator?.name ? (
                        <>
                            <Grid item xs={3}>
                                <Typography variant="body2" className={classes.alignLeft}>
                                    Moniker
                                </Typography>
                            </Grid>
                            <Grid item xs={9}>
                                <Typography variant="body1" className={classes.validatorName}>
                                    {' '}
                                    {validatorQuery?.data?.validator?.name}{' '}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider className={classes.divider} />
                            </Grid>
                        </>
                    ) : null}

                    <Grid item xs={3}>
                        <Typography variant="body2" className={classes.alignLeft}>
                            Balance
                        </Typography>
                    </Grid>

                    <Grid item xs={9}>
                        <Typography variant="h5" className={classes.alignRight}>
                            {accountQuery?.data?.account?.balance
                                ? Coin(accountQuery?.data?.account?.balance, 'CELO', 2)
                                : Coin(0, 'CELO', 2)}
                        </Typography>
                    </Grid>
                    <Grid item xs={12} style={{ marginTop: '-0.5rem' }}>
                        <Typography variant="h6" className={classes.alignRight}>
                            {accountQuery?.data?.account?.balance &&
                            chainQuery?.data?.chain?.tokenPrice?.usd
                                ? Coin(
                                      accountQuery?.data?.account?.balance,
                                      'cUSD',
                                      2,
                                      chainQuery?.data?.chain?.tokenPrice?.usd
                                  )
                                : Coin(0, 'cUSD', 2)}
                        </Typography>
                    </Grid>

                    <Grid item xs={4}>
                        <Typography variant="body2" className={classes.alignLeft}>
                            Locked CELO
                        </Typography>
                    </Grid>

                    <Grid item xs={8}>
                        <Typography variant="body1" className={classes.alignRight}>
                            {accountQuery?.data?.account?.lockedGold?.total
                                ? Coin(accountQuery?.data?.account?.lockedGold?.total, 'CELO', 2)
                                : Coin(0, 'CELO', 2)}
                        </Typography>
                    </Grid>

                    <Grid item xs={6}>
                        <Typography variant="body2" className={classes.alignLeft}>
                            Locked Nonvoting CELO
                        </Typography>
                    </Grid>
                    <Grid item xs={6} style={{ marginTop: '-0.5rem' }}>
                        <Typography variant="body1" className={classes.alignRight}>
                            {accountQuery?.data?.account?.lockedGold?.nonvoting
                                ? Coin(
                                      accountQuery?.data?.account?.lockedGold?.nonvoting,
                                      'CELO',
                                      2
                                  )
                                : Coin(0, 'CELO', 2)}
                        </Typography>
                    </Grid>

                    {address === currentUser ? (
                        <>
                            <Grid item xs={12}>
                                <Divider className={classes.divider} />
                            </Grid>

                            <Grid item xs={6}>
                                <LedgerDialog buttonLabel="Unlock CELO" action="UnlockCelo" />
                            </Grid>

                            <Grid item xs={6}>
                                <LedgerDialog buttonLabel="Lock CELO" action="LockCelo" />
                            </Grid>
                        </>
                    ) : null}
                </Grid>
            </Card>
        </span>
    );
};

export default AccountOverview;
