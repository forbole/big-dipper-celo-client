import { useQuery } from '@apollo/client';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import BigNumber from 'bignumber.js';
import React, { useEffect } from 'react';
import ContentLoader from "react-content-loader";
import numbro from "numbro";
import ComponentLoader from '../misc/ComponentLoader';
import ErrorMessage from '../misc/ErrorMessage';
import NotAvailable from '../misc/NotAvailable';
import { GET_ACCOUNT_DETAILS } from '../query/Account';
import { GET_CHAIN } from '../query/Chain';
import { GET_VALIDATOR } from '../query/Validator';
import LockGold from '../ledger/celoGold/lock/LockGold';
import UnlockGold from '../ledger/celoGold/unlock/UnlockGold';
import Ledger from '../ledger/Ledger'

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
            float: 'right'
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
        }
    })
);

type AccountOverviewProps = { address: string };

const AccountOverview = ({ address }: AccountOverviewProps): JSX.Element => {
    const classes = useStyles();
    const [currentUser, setCurrentUser] = React.useState('');

    const accountQuery = useQuery(GET_ACCOUNT_DETAILS, {
        variables: { address }
    });

    const chainQuery = useQuery(GET_CHAIN, {});

    const validatorQuery = useQuery(GET_VALIDATOR, {
        variables: { address }
    });

    useEffect(() => {
        let localUser = localStorage.getItem('currentUserAddress');
        //@ts-ignore
        setCurrentUser(localUser)
    });


    if (accountQuery.loading || chainQuery.loading) return <ComponentLoader />;
    if (accountQuery.error || chainQuery.error)
        return (
            <ErrorMessage
                message={
                    accountQuery.error
                        ? accountQuery.error.message
                        : ' ' || (chainQuery.error ? chainQuery.error.message : ' ')
                }
            />
        );
    return (
        <span>
            <Card className={classes.root}>
                <Grid container spacing={1}>
                    <Grid item xs={12}>
                        <Typography variant="body1" className={classes.box}>
                            Overview
                        </Typography>
                        <Divider variant="middle" className={classes.divider} />
                    </Grid>
                    {validatorQuery &&
                    validatorQuery.data &&
                    validatorQuery.data.validator &&
                    validatorQuery.data.validator.name ? (
                        <>
                            <Grid item xs={6}>
                                <Typography variant="body2" className={classes.alignLeft}>
                                    Moniker
                                </Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="body2" className={classes.alignRight}>
                                    {' '}
                                    {validatorQuery.data.validator.name}{' '}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <Divider variant="middle" className={classes.divider} />
                            </Grid>
                        </>
                    ) : null}

                    <Grid item xs={3}>
                        <Typography variant="body2" className={classes.alignLeft}>
                            Balance
                        </Typography>
                    </Grid>

                    <Grid item xs={9}>
                        {accountQuery.data.account && accountQuery.data.account.balance ? (
                            <Typography variant="body2" className={classes.alignRight}>
                                {new BigNumber(accountQuery.data.account.balance).toFormat(4)} CELO
                            </Typography>
                        ) : (
                            <NotAvailable variant="body2" className={classes.alignRight} />
                        )}
                    </Grid>
                    <Grid item xs={12}>
                        {accountQuery.data.account &&
                        accountQuery.data.account.balance &&
                        chainQuery.data.chain &&
                        chainQuery.data.chain.tokenPrice &&
                        chainQuery.data.chain.tokenPrice.usd ? (
                            <Typography variant="body2" className={classes.alignRight}>
                                {new BigNumber(
                                    accountQuery.data.account.balance *
                                        chainQuery.data.chain.tokenPrice.usd
                                ).toFormat(4)}{' '}
                                cUSD
                            </Typography>
                        ) : (
                            <NotAvailable variant="body2" className={classes.alignRight} />
                        )}
                    </Grid>

          {address === currentUser ?
            <Grid item xs={12}>
              <Divider variant="middle" className={classes.divider} />
            </Grid> : null}

          <Grid item xs={6}>
            <UnlockGold pageAddress={address} showButton={true} />
          </Grid>
          <Grid item xs={6}>
            <UnlockGold pageAddress={address} showButton={true} />
          </Grid>

          <Grid item xs={6}>
            <LockGold pageAddress={address} showButton={true} />
          </Grid>
        </Grid>
      </Card>
    </span >
  );
}

export default AccountOverview;
