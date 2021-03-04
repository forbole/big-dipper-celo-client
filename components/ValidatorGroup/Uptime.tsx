import { useQuery } from '@apollo/client';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { Theme } from '@material-ui/core/styles';
import createStyles from '@material-ui/core/styles/createStyles';
import makeStyles from '@material-ui/core/styles/makeStyles';
import useTheme from '@material-ui/core/styles/useTheme';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import numbro from 'numbro';
import React from 'react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis
} from 'recharts';

import { GET_BLOCK, GET_LATEST_BLOCK_HEIGHT } from '../Query/Block';
import { GET_VALIDATOR_GROUP } from '../Query/ValidatorGroup';
import ComponentLoader from '../Utils/ComponentLoader';
import ErrorMessage from '../Utils/ErrorMessage';
import NavLink from '../Utils/NavLink';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            height: '100%',
            padding: '0 1rem',
            borderRadius: 5,
            overflowY: 'auto'
        },
        container: {
            justifyContent: 'center',
            [theme.breakpoints.down('sm')]: {
                justifyContent: 'start'
            },
            display: 'flex'
        },
        divider: {
            margin: '0.15rem 0rem',
            backgroundColor: 'rgba(232, 232, 232, 1)'
        },
        power: {
            align: 'left',
            [theme.breakpoints.down('sm')]: {
                paddingLeft: '7rem'
            }
        },

        customTooltip: {
            width: '100%',
            display: 'flex'
        },

        rootTooltip: {
            opacity: 5,
            width: '19.125rem',
            height: '10rem'
        },

        cardContent: {
            padding: '0.625rem'
        },

        proposerAddress: {
            textAlign: 'right',
            wordBreak: 'break-all'
        }
    })
);

let tooltip: string;

const CustomTooltip = (payload: any, active?: boolean) => {
    const classes = useStyles();
    if (!active || !tooltip) return null as any;
    if (active && payload) {
        return (
            <Card className={classes.rootTooltip}>
                <CardContent className={classes.cardContent}>
                    <Grid container>
                        <Grid item xs={3}>
                            <Typography color="textPrimary" variant="body2" align="left">
                                Proposer
                            </Typography>
                        </Grid>
                        <Grid item xs={9}>
                            <NavLink
                                href={`/account/${payload.payload[0]?.payload?.Proposer}`}
                                name={
                                    <Typography variant="caption">
                                        {payload.payload[0]?.payload?.Proposer}
                                    </Typography>
                                }
                                className={classes.proposerAddress}
                            />
                        </Grid>

                        <Grid item xs={5}>
                            <Typography color="textPrimary" variant="body2" align="left">
                                Height
                            </Typography>
                        </Grid>

                        <Grid item xs={7}>
                            <NavLink
                                href={`/block/${payload.payload[0]?.payload?.Height}`}
                                name={
                                    <Typography color="textPrimary" variant="body2" align="right">
                                        {payload.payload[0]?.payload?.Height}
                                    </Typography>
                                }
                            />
                        </Grid>

                        <Grid item xs={5}>
                            <Typography color="textPrimary" variant="body2" align="left">
                                Voted
                            </Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <Typography color="textPrimary" variant="body2" align="right">
                                {payload.payload[0]?.payload?.VotedNumber}
                            </Typography>
                        </Grid>

                        <Grid item xs={5}>
                            <Typography color="textPrimary" variant="body2" align="left">
                                Missed
                            </Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <Typography color="textPrimary" variant="body2" align="right">
                                {payload.payload[0]?.payload?.MissedNumber}
                            </Typography>
                        </Grid>

                        <Grid item xs={5}>
                            <Typography color="textPrimary" variant="body2" align="left">
                                Votes Available
                            </Typography>
                        </Grid>
                        <Grid item xs={7}>
                            <Typography color="textPrimary" variant="body2" align="right">
                                {numbro(payload.payload[0]?.payload?.VotesAvailable).format('0.00')}{' '}
                                %
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography color="textPrimary" variant="body2" align="left">
                                Gas (used)
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography color="textPrimary" variant="body2" align="right">
                                {payload.payload[0]?.payload?.GasUsed}
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }
};

type UptimeProps = { address: string };

const Uptime = ({ address }: UptimeProps): JSX.Element => {
    const ROWMEDIUM = process.env.ROWMEDIUM ? parseInt(process.env.ROWMEDIUM) : 30;

    const classes = useStyles();
    const theme = useTheme();
    const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const valGroupAddress = address;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [page, setPage] = React.useState(1);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [pageSize, setPageSize] = React.useState(ROWMEDIUM);
    const membersArray: { [index: number]: string } = [];
    let signedBlockCounter = 0;
    let missedBlockCounter = 0;
    const blockUptime: {
        [index: number]: {
            Height: number;
            Voted: number | undefined;
            VotedNumber: number | undefined;
            Missed: number | undefined;
            MissedNumber: number;
            VotesAvailable: number;
            Proposer: string;
            GasUsed: number;
        };
    } = [];
    const allSigners: {
        [index: number]: {
            signers: { [index: number]: { signer: string } };
            number: number;
        };
    } = [];

    const latestBlock = useQuery(GET_LATEST_BLOCK_HEIGHT, {
        variables: { pageSize, page },
        pollInterval: 5000
    });

    const number = latestBlock?.data?.blocks?.blocks[0]?.number - 24 ?? 0;
    //set the number to query from
    const fromBlock = number - 14;

    const blockData = useQuery(GET_BLOCK, {
        variables: { pageSize, page, fromBlock },
        pollInterval: 5000
    });

    const { loading, error, data } = useQuery(GET_VALIDATOR_GROUP, {
        variables: { valGroupAddress }
    });

    const groupMembers = [];
    for (let c = 0; c < data?.validatorGroup?.members.length; c++) {
        groupMembers[c] = data?.validatorGroup?.members[c]?.address;
    }
    if (data?.validatorGroup?.members) {
        for (let c = 0; c < data?.validatorGroup?.members.length; c++) {
            membersArray[c] = data?.validatorGroup?.members[c].signer;
        }
    }
    const findValidatorsWhoSignedTheBlock = (
        returnRealValue: boolean,
        calculateMissed: boolean
    ) => {
        if (blockData?.data?.blocks?.blocks) {
            blockData?.data?.blocks?.blocks.map((row: any, index: number) => {
                allSigners[index] = { signers: row?.signers, number: row?.number };
            });

            for (let d = 0; d < Object.keys(allSigners).length; d++) {
                signedBlockCounter = 0;
                missedBlockCounter = 0;
                for (let c = 0; c < Object.keys(membersArray).length; c++) {
                    if (calculateMissed) {
                        if (Object.keys(allSigners[d].signers).length > 0) {
                            for (let e = 0; e < Object.keys(allSigners[d].signers).length; e++) {
                                if (allSigners[d].signers[e].signer === membersArray[c]) {
                                    signedBlockCounter++;
                                } else {
                                    missedBlockCounter++;
                                }
                            }
                        } else {
                            missedBlockCounter++;
                        }
                    } else if (!calculateMissed) {
                        if (Object.keys(allSigners[d].signers).length > 0) {
                            for (let e = 0; e < Object.keys(allSigners[d].signers).length; e++) {
                                if (allSigners[d].signers[e].signer === membersArray[c]) {
                                    signedBlockCounter++;
                                } else {
                                    missedBlockCounter++;
                                }
                            }
                        } else {
                            signedBlockCounter++;
                        }
                    }
                }
                return missedBlockCounter;
            }
        } else {
            return 0;
        }
    };

    if (blockData?.data?.blocks?.blocks) {
        blockData?.data?.blocks?.blocks.map((row: any, index: number) => {
            blockUptime[index] = {
                Height: row?.number ?? 0,
                Voted:
                    ((findValidatorsWhoSignedTheBlock(true, false) as number) * 100) /
                        Object.keys(membersArray).length ?? 0,
                VotedNumber: findValidatorsWhoSignedTheBlock(true, false) ?? 0,
                Missed:
                    ((findValidatorsWhoSignedTheBlock(true, true) as number) * 100) /
                        Object.keys(membersArray).length ?? 0,
                MissedNumber: (findValidatorsWhoSignedTheBlock(true, true) as number) ?? 0,
                VotesAvailable:
                    (data?.validatorGroup?.votes / data?.validatorGroup?.votesAvailable) * 100 ?? 0,
                Proposer: row?.miner?.signer ?? '',
                GasUsed: row?.gasUsed ?? 0
            };
        });
    }
    const validatorGroupMembers = data?.validatorGroup?.members ?? [];

    const calculateGroupUptime = () => {
        let addScore = 0;
        for (const c in validatorGroupMembers) {
            addScore = addScore + validatorGroupMembers[c]?.score;
        }
        const totalScore = (addScore / validatorGroupMembers.length) * 100;
        return totalScore ? numbro(totalScore).format('0.00') : 0;
    };

    if (loading) return <ComponentLoader />;
    if (error) return <ErrorMessage />;
    return (
        <Card className={classes.root}>
            <CardContent>
                <Grid container spacing={1} className={classes.container}>
                    <Grid item xs={6}>
                        <Typography
                            color="textPrimary"
                            variant="subtitle1"
                            align="left"
                            gutterBottom>
                            Uptime
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography
                            color="secondary"
                            variant="subtitle1"
                            align="right"
                            gutterBottom>
                            {calculateGroupUptime()} %
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider variant="middle" className={classes.divider} />
                    </Grid>
                    <Grid item xs={12} lg={10}>
                        <ResponsiveContainer width="100%" height={smallScreen ? 200 : 303}>
                            <BarChart
                                data={Object.assign(blockUptime).reverse()}
                                margin={{
                                    top: 0,
                                    right: smallScreen ? 0 : 0,
                                    left: smallScreen ? 0 : 0,
                                    bottom: 5
                                }}
                                // barGap=""
                                barCategoryGap="5%"
                                stackOffset="expand">
                                <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                                <XAxis
                                    tick={{
                                        stroke: 'rgba(119, 119, 119, 1)',
                                        fontSize: 10,
                                        fontWeight: 200
                                    }}
                                    dataKey="name"
                                    label={{
                                        value: 'Blocks',
                                        position: 'insideBottomLeft',
                                        fill: 'rgba(119, 119, 119, 1)',
                                        fontWeight: 'normal',
                                        textAnchor: 'start',
                                        dy: 5
                                    }}
                                />
                                <YAxis
                                    tickSize={0}
                                    tickMargin={10}
                                    tick={{
                                        stroke: 'rgba(119, 119, 119, 1)',
                                        fontSize: 10,
                                        fontWeight: 200
                                    }}
                                    label={{
                                        value: 'Votes available',
                                        angle: -270,
                                        position: 'center',
                                        fill: 'rgba(119, 119, 119, 1)',
                                        fontWeight: 'normal',
                                        dx: -15
                                    }}
                                />

                                <Tooltip content={<CustomTooltip />} />
                                <Legend align="left" verticalAlign="top" height={50} width={200} />
                                <Bar
                                    dataKey="Voted"
                                    fill="rgba(58, 211, 158, 1)"
                                    barSize={6}
                                    fillOpacity={1}
                                    name="Voted"
                                    onMouseOver={() => (tooltip = 'Voted')}
                                />
                                <Bar
                                    dataKey="Missed"
                                    fill="rgb(127,127,127)"
                                    barSize={6}
                                    fillOpacity={4}
                                    name="Missed"
                                    onMouseOver={() => (tooltip = 'Missed')}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default Uptime;
