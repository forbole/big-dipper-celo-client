import { useQuery } from '@apollo/client';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';

import { GET_VALIDATOR } from '../Query/Validator';
import ComponentLoader from '../Utils/ComponentLoader';
import ErrorMessage from '../Utils/ErrorMessage';
import AccountDetails from './AccountDetails';
import AccountOverview from './AccountOverview';
import AddressCard from './AddressCard';
import Downtime from './Downtime';
import ProposedBlocks from './ProposedBlocks';
import AccountTransactions from './Transactions';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            display: 'flex',
            justifyContent: 'center'
        },

        leftInline: {
            display: 'flex',
            overflow: 'auto',
            padding: '0 0 0 1rem'
        },

        divider: {
            margin: '0.5rem',
            backgroundColor: 'rgba(232, 232, 232, 1)'
        },

        container: {
            justifyContent: 'center',
            padding: '0rem',
            minWidth: '14.75rem'
        }
    })
);

type AccountPageProps = { address: string };

const AccountPage = ({ address }: AccountPageProps): JSX.Element => {
    const classes = useStyles();

    const { loading, error, data } = useQuery(GET_VALIDATOR, {
        variables: { address },
        pollInterval: 5000
    });

    const isValidator = data && data.validator ? true : false;

    if (loading) return <ComponentLoader />;
    if (error) return <ErrorMessage />;

    return (
        <>
            <Grid container spacing={2} className={classes.root}>
                <Grid item xs={12}>
                    <AddressCard address={address} />
                </Grid>

                <Grid item xs={12}>
                    <AccountOverview address={address} />
                </Grid>

                <Grid item xs={12}>
                    <AccountTransactions address={address} />
                </Grid>

                {/* <Grid item xs={12} >
        <CoinBalanceHistory />
      </Grid> */}

                {isValidator ? (
                    <Grid item xs={12}>
                        <Downtime address={address} />
                    </Grid>
                ) : null}

                {isValidator ? (
                    <Grid item xs={12}>
                        <ProposedBlocks address={address} />
                    </Grid>
                ) : null}

                {isValidator ? (
                    <Grid item xs={12}>
                        <AccountDetails address={address} />
                    </Grid>
                ) : null}
            </Grid>
        </>
    );
};

export default AccountPage;
