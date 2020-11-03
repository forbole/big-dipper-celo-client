import { useQuery } from '@apollo/client';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import ComponentLoader from '../misc/ComponentLoader';
import ErrorMessage from '../misc/ErrorMessage';
import NotAvailable from '../misc/NotAvailable';
import { GET_ELECTION } from '../query/Election';

const useStyles = makeStyles({
    root: {
        width: '100%',
        height: '100%',
        padding: '1.5%',
        borderRadius: 4,
        paddingBottom: '3.9rem'
    },
    box: {
        letterSpacing: '1px',
        padding: '0.8rem 0.6rem 3.9rem 0.6rem',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
        display: 'flex'
    },

    rootMain: {
        height: '100%'
    },

    data: {
        display: 'inline-flex'
    },
    groupsData: {
        textAlign: 'center'
    },
    validatorData: {
        textAlign: 'center'
    },
    infoData: {
        paddingTop: '1.5rem',
        paddingBottom: '0.4rem'
    },

    valueData: {
        paddingBottom: '0.6rem'
    }
});

const ValidatorsGroups = (): JSX.Element => {
    const classes = useStyles();

    const { loading, error, data } = useQuery(GET_ELECTION, {
        pollInterval: 5000
    });

    if (loading) return <ComponentLoader />;
    if (error) return <ErrorMessage message={error.message} />;

    return (
        <>
            <Grid container spacing={2} className={classes.rootMain}>
                <Grid item xs={12}>
                    <Paper className={classes.root}>
                        <Typography variant="body1" className={classes.box}>
                            Validators / Groups
                        </Typography>
                        <Grid container spacing={1} className={classes.rootMain}>
                            <Grid item xs={12} className={classes.data}>
                                <Grid item xs={6} className={classes.validatorData}>
                                    <img src="/images/validator-icon.svg" alt="Validators" />
                                    <Typography variant="body1" className={classes.infoData} noWrap>
                                        Validators
                                    </Typography>
                                    {data.election &&
                                    data.election.electedValidators &&
                                    data.election.registeredValidators ? (
                                        <Typography variant="h4" noWrap>
                                            {data.election.electedValidators} /{' '}
                                            {data.election.registeredValidators}
                                        </Typography>
                                    ) : (
                                        <NotAvailable variant="body2" />
                                    )}
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        gutterBottom
                                        noWrap>
                                        Elected / Registered
                                    </Typography>
                                </Grid>
                                <Grid item xs={6} className={classes.groupsData}>
                                    <img src="/images/groups.svg" alt="Groups" />
                                    <Typography variant="body1" className={classes.infoData} noWrap>
                                        Groups
                                    </Typography>
                                    {data.election &&
                                    data.election.electedValidatorGroups &&
                                    data.election.registeredValidatorGroups ? (
                                        <Typography variant="h4" noWrap>
                                            {data.election.electedValidatorGroups} /{' '}
                                            {data.election.registeredValidatorGroups}
                                        </Typography>
                                    ) : (
                                        <NotAvailable variant="body2" />
                                    )}
                                    <Typography
                                        variant="body2"
                                        color="textSecondary"
                                        gutterBottom
                                        className={classes.valueData}
                                        noWrap>
                                        Elected / Registered
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
};

export default ValidatorsGroups;
