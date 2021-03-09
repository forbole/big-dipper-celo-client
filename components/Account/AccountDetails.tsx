import { useQuery } from '@apollo/client';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import BigNumber from 'bignumber.js';
import React from 'react';

import { GET_ACCOUNT_DETAILS } from '../Query/Account';
import { GET_VALIDATOR } from '../Query/Validator';
import Coin from '../Utils/Coin';
import ComponentLoader from '../Utils/ComponentLoader';
import NavLink from '../Utils/NavLink';
import NotAvailable from '../Utils/NotAvailable';

const useStyles = makeStyles(() => {
    return {
        root: {
            width: '100%',
            padding: '0 1rem 1rem 1rem',
            borderRadius: 5,
            wordWrap: 'break-word'
        },
        item: {
            padding: '0 0 0.5rem 0'
        },
        divider: {
            margin: '0.5rem 0 0 0',
            backgroundColor: 'rgba(232, 232, 232, 1)'
        },
        arrowIcon: {
            padding: '0.25rem',
            justifyContent: 'center',
            border: 'solid rgba(67, 72, 76, 1) ',
            borderRadius: 5,
            backgroundColor: 'rgba(246, 247, 249, 1)',
            color: 'rgba(255, 255, 255, 0.6)',
            height: '1.5rem',
            width: '1.5rem'
        },
        iconButton: {
            padding: '0'
        },
        alignRight: {
            float: 'right',
            wordWrap: 'break-word',
            overflowWrap: 'anywhere',
            display: 'flex',
            textAlign: 'right'
        },
        alignLeft: {
            float: 'left'
        },
        icon: {
            fill: 'rgba(144, 144, 144, 1)'
        }
    };
});

type AccountDetailsProps = { address: string };

const AccountDetails = ({ address }: AccountDetailsProps): JSX.Element => {
    const classes = useStyles();

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { loading, error, data } = useQuery(GET_VALIDATOR, {
        variables: { address },
        pollInterval: 5000
    });

    const accountQuery = useQuery(GET_ACCOUNT_DETAILS, {
        variables: { address },
        pollInterval: 5000
    });

    if (loading) return <ComponentLoader />;

    if (data?.validator && accountQuery?.data)
        return (
            <Accordion defaultExpanded>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon className={classes.icon} />}
                    aria-controls="accoountDetailsPanel"
                    id="accoountDetailsPanel">
                    <Typography variant="body1"> Account Details</Typography>
                </AccordionSummary>
                <AccordionDetails className={classes.root}>
                    <Grid container>
                        <Divider variant="middle" className={classes.divider} />

                        <Grid container spacing={1} justify="center" className={classes.item}>
                            {data?.validator?.name ? (
                                <>
                                    <Grid item xs={4} className={classes.item}>
                                        <Typography variant="body2" className={classes.alignLeft}>
                                            Moniker
                                        </Typography>
                                    </Grid>
                                    <Grid item xs={8} className={classes.item}>
                                        <Typography variant="body2" className={classes.alignRight}>
                                            {data?.validator?.name}
                                        </Typography>
                                    </Grid>

                                    <Grid item xs={12}>
                                        <Divider variant="middle" className={classes.divider} />
                                    </Grid>
                                </>
                            ) : null}

                            <Grid item xs={4} className={classes.item}>
                                <Typography variant="body2" className={classes.alignLeft}>
                                    Metadata URL
                                </Typography>
                            </Grid>
                            <Grid item xs={8} className={classes.item}>
                                {accountQuery?.data?.account?.accountSummary?.metadataURL ? (
                                    <NavLink
                                        href="/"
                                        name={
                                            <Typography
                                                variant="body2"
                                                className={classes.alignRight}>
                                                {
                                                    accountQuery?.data?.account?.accountSummary
                                                        ?.metadataURL
                                                }
                                            </Typography>
                                        }
                                    />
                                ) : (
                                    <NotAvailable variant="body2" className={classes.alignRight} />
                                )}
                            </Grid>

                            <Grid item xs={12}>
                                <Divider className={classes.divider} />
                            </Grid>

                            <Grid item xs={4} className={classes.item}>
                                <Typography variant="body2" className={classes.alignLeft}>
                                    Type
                                </Typography>
                            </Grid>
                            <Grid item xs={8} className={classes.item}>
                                <Typography variant="body2" className={classes.alignRight}>
                                    validator
                                </Typography>
                            </Grid>

                            <Grid item xs={12}>
                                <Divider className={classes.divider} />
                            </Grid>

                            <Grid item xs={6} className={classes.item}>
                                <Typography variant="body2" className={classes.alignLeft}>
                                    Attestations Requested
                                </Typography>
                            </Grid>
                            <Grid item xs={6} className={classes.item}>
                                {data?.validator?.attestationRequested ? (
                                    <Typography variant="body2" className={classes.alignRight}>
                                        {data?.validator?.attestationRequested}
                                    </Typography>
                                ) : (
                                    <NotAvailable variant="body2" className={classes.alignRight} />
                                )}
                            </Grid>

                            <Grid item xs={12}>
                                <Divider className={classes.divider} />
                            </Grid>

                            <Grid item xs={6} className={classes.item}>
                                <Typography variant="body2" className={classes.alignLeft}>
                                    Attestations Fulfilled
                                </Typography>
                            </Grid>
                            <Grid item xs={6} className={classes.item}>
                                {data?.validator?.attestationFulfilled ? (
                                    <Typography variant="body2" className={classes.alignRight}>
                                        {data?.validator?.attestationFulfilled}
                                    </Typography>
                                ) : (
                                    <NotAvailable variant="body2" className={classes.alignRight} />
                                )}
                            </Grid>

                            <Grid item xs={12}>
                                <Divider className={classes.divider} />
                            </Grid>

                            <Grid item xs={4} className={classes.item}>
                                <Typography variant="body2" className={classes.alignLeft}>
                                    Locked Gold
                                </Typography>
                            </Grid>

                            {accountQuery?.data?.account?.lockedGold?.total ? (
                                <>
                                    <Grid item xs={8} className={classes.item}>
                                        <Typography variant="body2" className={classes.alignRight}>
                                            {Coin(
                                                accountQuery?.data?.account?.lockedGold?.total,
                                                'CELO',
                                                2
                                            )}
                                        </Typography>
                                    </Grid>
                                </>
                            ) : (
                                <Grid item xs={8} className={classes.item}>
                                    <NotAvailable variant="body2" className={classes.alignRight} />
                                </Grid>
                            )}

                            {accountQuery?.data?.account?.lockedGold?.nonvoting ? (
                                <>
                                    <Grid item xs={12} className={classes.item}>
                                        <Typography variant="body2" className={classes.alignRight}>
                                            {Coin(
                                                accountQuery?.data?.account?.lockedGold?.nonvoting,
                                                'non-voting CELO',
                                                2
                                            )}
                                        </Typography>
                                    </Grid>
                                </>
                            ) : (
                                <>
                                    <Grid item xs={12} className={classes.item}>
                                        <NotAvailable
                                            variant="body2"
                                            className={classes.alignRight}
                                        />
                                    </Grid>
                                </>
                            )}

                            <Grid item xs={12}>
                                <Divider variant="middle" className={classes.divider} />
                            </Grid>

                            <Grid item xs={3} className={classes.item}>
                                <Typography variant="body2" className={classes.alignLeft}>
                                    Score
                                </Typography>
                            </Grid>
                            <Grid item xs={9} className={classes.item}>
                                {data?.validator?.score ? (
                                    <Typography variant="body2" className={classes.alignRight}>
                                        {new BigNumber(data?.validator?.score * 100).toFormat(2)} %
                                    </Typography>
                                ) : (
                                    <NotAvailable variant="body2" className={classes.alignRight} />
                                )}
                            </Grid>

                            <Grid item xs={12}>
                                <Divider variant="middle" className={classes.divider} />
                            </Grid>

                            <Grid item xs={4} className={classes.item}>
                                <Typography variant="body2" className={classes.alignLeft}>
                                    Affiliiation
                                </Typography>
                            </Grid>

                            <Grid item xs={8} className={classes.item}>
                                {data?.validator?.affiliation ? (
                                    <NavLink
                                        href={`/validatorGroup/${data?.validator?.affiliation}`}
                                        name={
                                            <Typography
                                                variant="body2"
                                                className={classes.alignRight}>
                                                {data?.validator?.affiliation}
                                            </Typography>
                                        }
                                    />
                                ) : (
                                    <NotAvailable variant="body2" className={classes.alignRight} />
                                )}
                            </Grid>

                            <Grid item xs={12}>
                                <Divider variant="middle" className={classes.divider} />
                            </Grid>

                            <Grid item xs={4} className={classes.item}>
                                <Typography variant="body2" className={classes.alignLeft}>
                                    Validator Signer
                                </Typography>
                            </Grid>

                            <Grid item xs={8} className={classes.item}>
                                {data?.validator?.signer ? (
                                    <NavLink
                                        href={`/validatorGroup/${data?.validator?.signer}`}
                                        name={
                                            <Typography
                                                variant="body2"
                                                className={classes.alignRight}>
                                                {data?.validator?.signer}
                                            </Typography>
                                        }
                                    />
                                ) : (
                                    <NotAvailable variant="body2" className={classes.alignRight} />
                                )}
                            </Grid>

                            <Grid item xs={12}>
                                <Divider variant="middle" className={classes.divider} />
                            </Grid>

                            <Grid item xs={4} className={classes.item}>
                                <Typography variant="body2">All Signers</Typography>
                            </Grid>

                            {accountQuery?.data?.account?.accountSummary?.authorizedSigners ? (
                                <>
                                    <Grid item xs={8} className={classes.item}>
                                        <NavLink
                                            href={`/account/${accountQuery?.data?.account?.accountSummary?.authorizedSigners?.vote}`}
                                            name={
                                                <Typography
                                                    variant="body2"
                                                    className={classes.alignRight}>
                                                    {
                                                        accountQuery?.data?.account?.accountSummary
                                                            ?.authorizedSigners?.vote
                                                    }
                                                </Typography>
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} className={classes.item}>
                                        <NavLink
                                            href={`/account/${accountQuery?.data?.account?.accountSummary?.authorizedSigners?.validator}`}
                                            name={
                                                <Typography
                                                    variant="body2"
                                                    className={classes.alignRight}>
                                                    {
                                                        accountQuery?.data?.account?.accountSummary
                                                            ?.authorizedSigners?.validator
                                                    }
                                                </Typography>
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12} className={classes.item}>
                                        <NavLink
                                            href={`/account/${accountQuery?.data?.account?.accountSummary?.authorizedSigners?.attestation}`}
                                            name={
                                                <Typography
                                                    variant="body2"
                                                    className={classes.alignRight}>
                                                    {
                                                        accountQuery?.data?.account?.accountSummary
                                                            ?.authorizedSigners?.attestation
                                                    }
                                                </Typography>
                                            }
                                        />
                                    </Grid>
                                </>
                            ) : (
                                <>
                                    <Grid item xs={8} className={classes.item}>
                                        <NotAvailable
                                            className={classes.alignRight}
                                            variant="body2"
                                        />
                                    </Grid>
                                </>
                            )}
                        </Grid>
                    </Grid>
                </AccordionDetails>
            </Accordion>
        );
    else {
        return null as any;
    }
};

export default AccountDetails;
