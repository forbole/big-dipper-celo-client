import { useQuery } from '@apollo/client';
import { createStyles, Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import { GET_ELECTION } from '../Query/Election';
import ComponentLoader from '../Utils/ComponentLoader';
import ErrorMessage from '../Utils/ErrorMessage';
import NotAvailable from '../Utils/NotAvailable';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            height: '100%',
            padding: '1.5%',
            borderRadius: 4
        },
        box: {
            letterSpacing: '1px',
            padding: '0.8rem 0.6rem 3.9rem 0.6rem',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            display: 'flex'
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
        },

        validators: {
            paddingBottom: '4.5rem',
            [theme.breakpoints.down('md')]: {
                paddingBottom: '4rem'
            }
        }
    })
);

const ValidatorsGroups = (): JSX.Element => {
    const classes = useStyles();

    const { loading, error, data } = useQuery(GET_ELECTION, {
        pollInterval: 5000
    });

    if (loading) return <ComponentLoader />;
    if (error) return <ErrorMessage />;

    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Paper className={classes.root}>
                        <Typography variant="body1" className={classes.box}>
                            Validators / Groups
                        </Typography>
                        <Grid container spacing={1}>
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
                                        noWrap
                                        className={classes.validators}>
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
