import { useQuery } from '@apollo/client';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
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

import NavLink from '../NavLink';
import { GET_VALIDATOR_GROUP } from '../query/ValidatorGroup';

const data_chart = [
    {
        Voted: 99
    },
    {
        Voted: 91
    },
    {
        Voted: 94
    },
    {
        Voted: 87
    },
    {
        Voted: 90
    },
    {
        Missed: 99
    },
    {
        Voted: 96
    },
    {
        Voted: 91
    },
    {
        Voted: 94
    },
    {
        Voted: 87
    },
    {
        Voted: 90
    },
    {
        Voted: 99
    },
    {
        Voted: 96
    },
    {
        Voted: 96
    },
    {
        Voted: 96
    },
    {
        Voted: 96
    },
    {
        Voted: 96
    }
];

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
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
            marginLeft: '-10rem',
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
            height: '7.9rem'
        },

        cardContent: {
            padding: '0.625rem'
        }
    })
);
const CustomTooltip = () => {
    const classes = useStyles();
    return (
        <Card className={classes.rootTooltip}>
            <CardContent className={classes.cardContent}>
                <Grid container>
                    <Grid item xs={5}>
                        <Typography color="textPrimary" variant="body2" align="left">
                            Proposer
                        </Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <NavLink
                            href={`/account/${1}`}
                            name={
                                <Typography color="textPrimary" variant="body2" align="right">
                                    Nans Aguilars
                                </Typography>
                            }
                        />
                    </Grid>

                    <Grid item xs={5}>
                        <Typography color="textPrimary" variant="body2" align="left">
                            Height
                        </Typography>
                    </Grid>

                    <Grid item xs={7}>
                        <NavLink
                            href={`/block/${108144}`}
                            name={
                                <Typography color="textPrimary" variant="body2" align="right">
                                    108144
                                </Typography>
                            }
                        />
                    </Grid>

                    <Grid item xs={5}>
                        <Typography color="textPrimary" variant="body2" align="left">
                            Votes Available
                        </Typography>
                    </Grid>
                    <Grid item xs={7}>
                        <Typography color="textPrimary" variant="body2" align="right">
                            89%
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography color="textPrimary" variant="body2" align="left">
                            Gas (used / wanted)
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography color="textPrimary" variant="body2" align="right">
                            1,500,795 / 3,000,000
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography color="textPrimary" variant="body2" align="left">
                            Vote
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography color="textPrimary" variant="body2" align="right">
                            Yes
                        </Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

type UptimeProps = { address: string };

const Uptime = ({ address }: UptimeProps): JSX.Element => {
    const classes = useStyles();
    const theme = useTheme();
    const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const valGroupAddress = address;

    const { loading, error, data } = useQuery(GET_VALIDATOR_GROUP, {
        variables: { valGroupAddress }
    });

    const validatorGroupMembers =
        data && data.validatorGroup && data.validatorGroup.members
            ? data.validatorGroup.members
            : [];

    const calculateTotalUptime = () => {
        let addScore = 0;
        for (const c in validatorGroupMembers) {
            addScore = addScore + validatorGroupMembers[c].score;
        }
        const totalScore = (addScore / validatorGroupMembers.length) * 100;
        return numbro(totalScore).format('0.00');
    };

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
                            {calculateTotalUptime()} %
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider variant="middle" className={classes.divider} />
                    </Grid>
                    <Grid item xs={12} lg={10}>
                        <ResponsiveContainer width="100%" height={smallScreen ? 200 : 250}>
                            <BarChart
                                // width={350}
                                // height={250}
                                data={data_chart}
                                margin={{
                                    top: 0,
                                    right: smallScreen ? 0 : 350,
                                    left: smallScreen ? 0 : 100,
                                    bottom: 5
                                }}
                                barGap="-5"
                                barCategoryGap="1%"
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
                                />
                                <Bar
                                    dataKey="Missed"
                                    fill="rgba(150, 152, 154, 1)"
                                    barSize={6}
                                    fillOpacity={1}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </Grid>
                    <span className={classes.power}>
                        <Typography
                            color="textSecondary"
                            variant="caption"
                            className={classes.power}>
                            10/10000 (19h)
                        </Typography>
                    </span>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default Uptime;
