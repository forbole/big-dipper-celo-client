import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '../Link';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { GET_VALIDATOR } from '../query/Validator'
import { GET_ACCOUNT_DETAILS } from '../query/Account'
import ComponentLoader from '../misc/ComponentLoader';
import NotAvailable from '../misc/NotAvailable';
import ErrorMessage from '../misc/ErrorMessage';
import { useQuery } from "@apollo/client";
import MiddleEllipsis from '../misc/MiddleEllipsis'
import numbro from "numbro";
import BigNumber from 'bignumber.js'

const useStyles = makeStyles(({ spacing }) => {
    return {
        root: {
            width: '100%',
            padding: '0 1rem 1rem 1rem',
            borderRadius: 5,
            wordWrap: 'break-word',

        },
        item: {
            padding: '0 0 0.5rem 0',

        },
        divider: {
            margin: '0.5rem 0 0 0',
            backgroundColor: "rgba(232, 232, 232, 1)",
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
            padding: '0',
        },
        alignRight: {
            float: 'right',
            wordWrap: 'break-word',
            overflowWrap: 'anywhere',
            display: "flex",
            textAlign: "right"
        },
        alignLeft: {
            float: 'left',
        },
        icon: {
            fill: "rgba(255, 255, 255, 0.6)",
        },
    }

});

type AccountDetailsProps = { address: string };


const AccountDetails = ({ address }: AccountDetailsProps) => {
    const classes = useStyles();


    const { loading, error, data } = useQuery(GET_VALIDATOR, {
        variables: { address },
        pollInterval: 5000,
    });


    const accountQuery = useQuery(GET_ACCOUNT_DETAILS, {
        variables: { address },
        pollInterval: 5000,
    });


    if (loading) return <ComponentLoader />
    if (error) return <ErrorMessage message={error.message} />

    if (data.validator && accountQuery.data) return (
        <Accordion defaultExpanded>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon className={classes.icon} />}
                aria-controls="accoountDetailsPanel"
                id="accoountDetailsPanel"
            >
                <Typography variant="body1" > Account Details</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.root}>
                <Grid container >
                    <Divider variant='middle' className={classes.divider} />

                    <Grid container spacing={1} justify="center" className={classes.item}>

                        {data.validator && data.validator.name ?
                            <>
                                <Grid item xs={4} className={classes.item}>
                                    <Typography variant="body2" className={classes.alignLeft}>
                                        Moniker
                    </Typography>
                                </Grid>
                                <Grid item xs={8} className={classes.item} >

                                    <Typography variant="body2" className={classes.alignRight} >
                                        {data.validator.name}
                                    </Typography>
                                </Grid>

                                <Grid item xs={12}>
                                    <Divider variant='middle' className={classes.divider} />
                                </Grid>
                            </> : null}

                        <Grid item xs={4} className={classes.item}>

                            <Typography variant="body2" className={classes.alignLeft}>
                                Metadata URL
                    </Typography>
                        </Grid>
                        <Grid item xs={8} className={classes.item} >
                            {accountQuery.data && accountQuery.data.account && accountQuery.data.account.accountSummary && accountQuery.data.account.accountSummary.metadataURL ?
                                <Link href="/" target="_blank" color="secondary">
                                    <Typography variant="body2" className={classes.alignRight} >
                                        {accountQuery.data.account.accountSummary.metadataURL}
                                    </Typography>
                                </Link> :
                                < NotAvailable variant="body2" className={classes.alignRight} />}
                        </Grid>

                        <Grid item xs={12}>
                            <Divider variant='middle' className={classes.divider} />
                        </Grid>

                        <Grid item xs={4} className={classes.item}>
                            <Typography variant="body2" className={classes.alignLeft}>
                                Type
                    </Typography>
                        </Grid>
                        <Grid item xs={8} className={classes.item} >
                            <Typography variant="body2" className={classes.alignRight}  >
                                validator
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider variant='middle' className={classes.divider} />
                        </Grid>

                        {/* <Grid item xs={6} className={classes.item}>
                            <Typography variant="body2" className={classes.alignLeft}>
                                Attestations Requested
                    </Typography>
                        </Grid>
                        <Grid item xs={6} className={classes.item} >
                            <Typography variant="body2" className={classes.alignRight}  >
                                {"15"}
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider variant='middle' className={classes.divider} />
                        </Grid>

                        <Grid item xs={6} className={classes.item}>
                            <Typography variant="body2" className={classes.alignLeft}>
                                Attestations Fulfilled
                    </Typography>
                        </Grid>
                        <Grid item xs={6} className={classes.item} >
                            <Typography variant="body2" className={classes.alignRight} >
                                {"12"}
                            </Typography>
                        </Grid>

                        <Grid item xs={12}>
                            <Divider variant='middle' className={classes.divider} />
                        </Grid> */}

                        <Grid item xs={4} className={classes.item}>
                            <Typography variant="body2" className={classes.alignLeft}>
                                Locked Gold
                    </Typography>
                        </Grid>

                        {accountQuery.data && accountQuery.data.account && accountQuery.data.account.lockedGold && accountQuery.data.account.lockedGold.total && accountQuery.data.account.lockedGold.nonvoting ?
                            <><Grid item xs={8} className={classes.item} >
                                <Typography variant="body2" className={classes.alignRight}  >
                                    {new BigNumber(accountQuery.data.account.lockedGold.total).toFormat(4)} CELO
                                </Typography>
                            </Grid>
                                <Grid item xs={12} className={classes.item} >
                                    <Typography variant="body2" className={classes.alignRight}  >
                                        {new BigNumber(accountQuery.data.account.lockedGold.nonvoting).toFormat(4)} non-voting CELO
                                    </Typography>
                                </Grid>
                            </>
                            :
                            <Grid item xs={8} className={classes.item} >
                                < NotAvailable variant="body2" className={classes.alignRight} />
                            </Grid>}

                        <Grid item xs={12}>
                            <Divider variant='middle' className={classes.divider} />
                        </Grid>

                        <Grid item xs={3} className={classes.item}>

                            <Typography variant="body2" className={classes.alignLeft}>
                                Score
                    </Typography>
                        </Grid>
                        <Grid item xs={9} className={classes.item} >
                            {data.validator && data.validator.score ?
                                <Typography variant="body2" className={classes.alignRight} >
                                    {data.validator.score}%
                                </Typography> :
                                < NotAvailable variant="body2" className={classes.alignRight} />}
                        </Grid>

                        <Grid item xs={12}>
                            <Divider variant='middle' className={classes.divider} />
                        </Grid>


                        <Grid item xs={4} className={classes.item}>
                            <Typography variant="body2" className={classes.alignLeft}>
                                Affiliiation
                            </Typography>
                        </Grid>

                        <Grid item xs={8} className={classes.item} >
                            {data.validator && data.validator.affiliation ?
                                <Typography variant="body2" className={classes.alignRight}  >
                                    <Link
                                        href={`/validatorGroup/${data.validator.affiliation}`}
                                        color="secondary"
                                    >
                                        {data.validator.affiliation}
                                    </Link>
                                </Typography> :
                                < NotAvailable variant="body2" className={classes.alignRight} />}
                        </Grid>

                        <Grid item xs={12}>
                            <Divider variant='middle' className={classes.divider} />
                        </Grid>


                        <Grid item xs={6} className={classes.item}>
                            <Typography variant="body2" className={classes.alignLeft}>
                                Validator Signer
                            </Typography>
                        </Grid>

                        <Grid item xs={6} className={classes.item} >
                            {data.validator && data.validator.signer ?
                                <Typography variant="body2" className={classes.alignRight} >
                                    {data.validator.signer}
                                </Typography> :
                                < NotAvailable variant="body2" className={classes.alignRight} />}
                        </Grid>

                        <Grid item xs={12}>
                            <Divider variant='middle' className={classes.divider} />
                        </Grid>


                        <Grid item xs={5} className={classes.item}>
                            <Typography variant="body2">
                                All Signers
                    </Typography>
                        </Grid>

                        {accountQuery.data && accountQuery.data.account && accountQuery.data.account.accountSummary && accountQuery.data.account.accountSummary.authorizedSigners ?
                            <>
                                <Grid item xs={7} className={classes.item} >
                                    <Link
                                        href={`/account/${accountQuery.data.account.accountSummary.authorizedSigners.vote}`}
                                        color="secondary"
                                    >
                                        <Typography variant="body2" className={classes.alignRight}  >
                                            {accountQuery.data.account.accountSummary.authorizedSigners.vote}
                                        </Typography>

                                    </Link>
                                </Grid>
                                <Grid item xs={12} className={classes.item} >
                                    <Link
                                        href={`/account/${accountQuery.data.account.accountSummary.authorizedSigners.validator}`}
                                        color="secondary"
                                    >
                                        <Typography variant="body2" className={classes.alignRight}  >
                                            {accountQuery.data.account.accountSummary.authorizedSigners.validator}
                                        </Typography>

                                    </Link>
                                </Grid>
                                <Grid item xs={12} className={classes.item} >
                                    <Link
                                        href={`/account/${accountQuery.data.account.accountSummary.authorizedSigners.attestation}`}
                                        color="secondary"
                                    >
                                        <Typography variant="body2" className={classes.alignRight}  >
                                            {accountQuery.data.account.accountSummary.authorizedSigners.attestation}
                                        </Typography>
                                    </Link>
                                </Grid> </>

                            : <>
                                <Grid item xs={7} className={classes.item} >
                                    <NotAvailable variant="body2" />
                                </Grid>
                            </>}
                    </Grid>

                </Grid>
            </AccordionDetails >
        </Accordion >
    );
    else {
        return null;
    }
}

export default AccountDetails