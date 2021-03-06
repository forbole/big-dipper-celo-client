import { useQuery } from '@apollo/client';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import moment from 'moment';
import React from 'react';

import { GET_BLOCK_DETAILS } from '../Query/Block';
import ComponentLoader from '../Utils/ComponentLoader';
import NavLink from '../Utils/NavLink';
import NotAvailable from '../Utils/NotAvailable';

const useStyles = makeStyles(() => {
    return {
        root: {
            width: '100%',
            borderRadius: 5,
            wordWrap: 'break-word'
        },

        divider: {
            marginTop: '0.5rem',
            backgroundColor: 'rgba(232, 232, 232, 1)'
        },
        arrowIcon: {
            padding: '0.3rem',
            justifyContent: 'center',
            border: 'solid 1px rgba(119, 119, 119, 1) ',
            borderRadius: 5,
            backgroundColor: 'rgba(255, 255, 255, 0.6)',
            color: 'rgba(119, 119, 119, 1)',
            height: '1.5rem',
            width: '1.5rem'
        },
        iconButtonRight: {
            padding: '0',
            float: 'right'
        },
        iconButtonLeft: {
            padding: '0',
            float: 'left',
            marginLeft: '-0.625rem'
        },

        tabs: {
            fontSize: '1rem',
            textTransform: 'none',
            display: 'inline-block'
        },
        icon: {
            fill: 'rgba(8, 178, 122, 1)',
            marginTop: '0.1rem',
            marginRight: '-0.2rem'
        },

        signersList: {
            paddingLeft: '2rem'
        }
    };
});

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`all-signers-tab-${index}`}
            aria-labelledby={`all-signers-tab-${index}`}
            {...other}>
            {value === index && (
                <Grid container>
                    <Grid item xs={12}>
                        <Typography>{children}</Typography>
                    </Grid>
                </Grid>
            )}
        </div>
    );
}
type BlockDetailsProps = { blockNumber: string };

const BlockDetails = ({ blockNumber }: BlockDetailsProps): JSX.Element => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const number: number = parseFloat(blockNumber);

    const prevBlock: number = number - 1;
    const nextBlock: number = number + 1;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { loading, error, data } = useQuery(GET_BLOCK_DETAILS, {
        variables: { number },
        pollInterval: 5000
    });

    const handleChange = (event: unknown, newValue: number) => {
        setValue(newValue);
    };

    const StyledTabs = withStyles({
        root: {
            paddingBottom: '0.5rem',
            '& div.MuiTabs-scroller': {
                '& .MuiTabs-flexContainer': {
                    display: 'flex',
                    flexWrap: 'wrap'
                },
                ' & .Mui-selected': {
                    color: 'rgba(119, 119, 119, 1)'
                },
                ' & .MuiTab-wrapper': {
                    display: 'block',
                    fontSize: '0.875rem',
                    ' & .all-signers-icon': {
                        verticalAlign: 'middle',
                        height: '1.3rem',
                        width: '1.3rem',
                        margin: '0 0.5rem'
                    }
                }
            }
        }
    })(Tabs);

    if (loading) return <ComponentLoader />;

    return (
        <Card className={classes.root}>
            <CardContent>
                <Grid container spacing={2} justify="center">
                    <Grid item xs={10}>
                        <Typography color="textPrimary" variant="subtitle1">
                            Block #{number}
                        </Typography>
                    </Grid>

                    <Grid item xs={1}>
                        <NavLink
                            href={`/block/${prevBlock}`}
                            name={
                                <IconButton
                                    aria-label="Previous Block"
                                    className={classes.iconButtonRight}>
                                    <ArrowBackIosIcon className={classes.arrowIcon} />
                                </IconButton>
                            }
                        />
                    </Grid>
                    <Grid item xs={1}>
                        <NavLink
                            href={`/block/${nextBlock}`}
                            name={
                                <IconButton
                                    aria-label="Next Block"
                                    className={classes.iconButtonLeft}>
                                    <ArrowForwardIosIcon className={classes.arrowIcon} />
                                </IconButton>
                            }
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" component="h2">
                            Time
                        </Typography>
                        <Typography variant="body2" component="h2" color="textSecondary">
                            {data?.block?.timestamp ? (
                                <>
                                    {new Date(
                                        parseInt(data?.block?.timestamp) * 1000
                                    ).toUTCString()}{' '}
                                    (
                                    {moment
                                        .unix(data?.block?.timestamp)
                                        .format('Do MMMM YYYY, h:mm:ss a')}
                                    )
                                </>
                            ) : (
                                <NotAvailable variant="body2" />
                            )}
                        </Typography>
                        <Divider variant="middle" className={classes.divider} />
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2">Transactions</Typography>
                        <Typography variant="body2" color="textSecondary">
                            {data?.block?.transactions?.length ?? '0'}
                        </Typography>
                        <Divider variant="middle" className={classes.divider} />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="body2">Size</Typography>
                        <Typography variant="body2" component="h2" color="textSecondary">
                            {data?.block?.size ? (
                                data?.block?.size
                            ) : (
                                <NotAvailable variant="body2" color="textSecondary" />
                            )}
                        </Typography>
                        <Divider variant="middle" className={classes.divider} />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="body2" component="h2">
                            Validator
                        </Typography>
                        <Typography variant="body2" component="h2">
                            {data?.block?.miner?.name || data?.block?.miner?.signer ? (
                                <NavLink
                                    href={`/account/${data?.block?.miner?.signer}`}
                                    name={data?.block?.miner?.name || data?.block?.miner?.signer}
                                />
                            ) : (
                                <NotAvailable variant="body2" color="textSecondary" />
                            )}
                        </Typography>
                        <Divider variant="middle" className={classes.divider} />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="body2" component="h2">
                            Hash
                        </Typography>

                        {data?.block?.hash ? (
                            <Typography variant="body2" component="h2">
                                <NavLink
                                    href={`/transaction/${data?.block?.hash}`}
                                    name={data?.block?.hash}
                                />
                            </Typography>
                        ) : (
                            <NotAvailable variant="body2" color="textSecondary" />
                        )}

                        <Divider variant="middle" className={classes.divider} />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="body2" component="h2">
                            Parent Hash
                        </Typography>
                        {data?.block?.parentHash ? (
                            <Typography variant="body2" component="h2">
                                <NavLink
                                    href={`/transaction/${data?.block?.parentHash}`}
                                    name={data?.block?.parentHash}
                                />
                            </Typography>
                        ) : (
                            <NotAvailable variant="body2" color="textSecondary" />
                        )}
                        <Divider variant="middle" className={classes.divider} />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="body2" component="h2">
                            Total Difficulty
                        </Typography>
                        <Typography variant="body2" component="h2" color="textSecondary">
                            {data?.block?.totalDifficulty ? (
                                data?.block?.totalDifficulty
                            ) : (
                                <NotAvailable variant="body2" color="textSecondary" />
                            )}
                        </Typography>
                        <Divider variant="middle" className={classes.divider} />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="body2" component="h2">
                            Nonce
                        </Typography>
                        <Typography variant="body2" component="h2" color="textSecondary">
                            {data?.block?.transactions?.nonce ? (
                                data?.block?.transactions?.nonce
                            ) : (
                                <NotAvailable variant="body2" color="textSecondary" />
                            )}
                        </Typography>
                        <Divider variant="middle" className={classes.divider} />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="body2" component="h2">
                            Gas Used
                        </Typography>
                        <Typography variant="body2" component="h2" color="textSecondary">
                            {data?.block?.gasUsed ? (
                                data?.block?.gasUsed
                            ) : (
                                <NotAvailable variant="body2" color="textSecondary" />
                            )}
                        </Typography>
                        <Divider variant="middle" className={classes.divider} />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="body2" component="h2">
                            Gas Limit
                        </Typography>
                        <Typography variant="body2" component="h2" color="textSecondary">
                            {data?.block?.gasLimit ? (
                                data?.block?.gasLimit
                            ) : (
                                <NotAvailable variant="body2" color="textSecondary" />
                            )}
                        </Typography>
                        <Divider variant="middle" className={classes.divider} />
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="body2" component="h2" gutterBottom>
                            Signers
                        </Typography>

                        <Grid item xs={12}>
                            <StyledTabs
                                value={value}
                                textColor="primary"
                                onChange={handleChange}
                                aria-label="Block Signers Tabs"
                                variant="fullWidth"
                                TabIndicatorProps={{
                                    style: {
                                        backgroundColor: 'textSecondary'
                                    }
                                }}>
                                <Tab
                                    label="Signed Block"
                                    icon={
                                        <img
                                            src="/images/up.svg"
                                            className="all-signers-icon"
                                            alt="Signed Block"
                                        />
                                    }
                                    className={classes.tabs}
                                    wrapped={false}
                                />
                                <Tab
                                    label="Missed Block"
                                    icon={
                                        <img
                                            src="/images/down.svg"
                                            className="all-signers-icon"
                                            alt="Missed Block"
                                        />
                                    }
                                    className={classes.tabs}
                                    wrapped={false}
                                />
                            </StyledTabs>
                            {data?.block?.signers ? (
                                <ol className={classes.signersList}>
                                    {data?.block?.signers.map((row: any, index: number) => {
                                        if (row?.exist) {
                                            return (
                                                <TabPanel value={value} index={0} key={index}>
                                                    <li key={index}>
                                                        <NavLink
                                                            href={`/validatorGroup/${row?.signer}`}
                                                            name={row?.signer}
                                                        />
                                                        {row?.validator?.validatorGroup?.address ? (
                                                            <NavLink
                                                                href={`/validatorGroup/${row?.validator?.validatorGroup?.address}`}
                                                                name={
                                                                    row?.validator?.name ||
                                                                    row?.signer
                                                                }
                                                            />
                                                        ) : (
                                                            ''
                                                        )}
                                                    </li>
                                                </TabPanel>
                                            );
                                        } else {
                                            return (
                                                <TabPanel value={value} index={1} key={index}>
                                                    <li key={index}>
                                                        <NavLink
                                                            href={`/validatorGroup/${row?.signer}`}
                                                            name={row?.signer}
                                                        />
                                                    </li>
                                                </TabPanel>
                                            );
                                        }
                                    })}
                                </ol>
                            ) : (
                                <NotAvailable variant="body2" />
                            )}
                        </Grid>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default BlockDetails;
