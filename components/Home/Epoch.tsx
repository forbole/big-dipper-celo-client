import { useQuery } from '@apollo/client';
import { Card, CardContent, Divider, Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import numbro from 'numbro';
import React, { useEffect } from 'react';
import Countdown, { CountdownRenderProps } from 'react-countdown';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';

import { GET_BLOCK_MINER } from '../Query/Block';
import { GET_CHAIN } from '../Query/Chain';
import Avatar from '../Utils/Avatar';
import ComponentLoader from '../Utils/ComponentLoader';
import ErrorMessage from '../Utils/ErrorMessage';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            height: '100%',
            padding: '1.5%',
            borderRadius: 4,
            overflow: 'hidden',
            [theme.breakpoints.down('md')]: {
                height: '26.5rem'
            }
        },
        box: {
            letterSpacing: '1px',
            padding: '0.8rem',
            display: 'block',
            overflow: 'hidden',
            whiteSpace: 'nowrap'
        },

        divider: {
            width: '4rem',
            backgroundColor: 'rgba(232, 232, 232, 1)',
            fontWeight: 600
        },

        menu: {
            height: '100%',
            width: '100%',
            display: 'inline-flex'
        },

        epochNumber: {
            display: 'block',
            marginTop: '3.5rem',
            paddingLeft: '3rem',
            fontWeight: 400,
            position: 'absolute',
            textAlign: 'center'
        },

        currentEpochText: {
            fontWeight: 400,
            color: 'rgba(28, 134, 252, 1)',
            fontSize: '1.5rem'
        },
        epochData: {
            paddingTop: '2.5rem',
            paddingRight: '9%',
            paddingLeft: '4%',
            float: 'right',
            position: 'relative',
            zIndex: 99,
            [theme.breakpoints.down('md')]: {
                paddingRight: '40%',
                whiteSpace: 'nowrap'
            }
        },

        blockProposer: {
            paddingLeft: '1.5rem',
            display: 'flex',
            marginTop: '15rem',
            maxHeight: '3rem'
        },

        blockProposerAddress: {
            paddingLeft: '1rem',
            paddingRight: '1.5rem',
            wordBreak: 'break-word',
            wordWrap: 'break-word',

            display: 'flex',
            textAlign: 'left'
        },

        blockProposerName: {
            paddingLeft: '1rem',
            paddingRight: '1.5rem',
            marginTop: '0.5rem',
            wordBreak: 'break-word',
            display: 'flex',
            textAlign: 'left'
        },

        tooltip: {
            opacity: 5,
            width: '11.5rem',
            height: '4.5rem',
            overflow: 'visible'
        },

        tooltipName: {
            fontWeight: 600
        },

        tooltipValue: {
            paddingTop: '0.4rem',
            paddingRigth: '0.5rem'
        }
    })
);

type EpochTooltipProps = { active?: boolean; payload?: any };

const EpochTooltip = ({ active, payload }: EpochTooltipProps) => {
    const classes = useStyles();

    if (active) {
        return (
            <Card className={classes.tooltip}>
                <CardContent>
                    <Grid container>
                        <Grid item xs={6}>
                            <Typography
                                color="textPrimary"
                                variant="body2"
                                align="left"
                                className={classes.tooltipName}>
                                {payload[0]?.payload?.name}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography
                                color="textPrimary"
                                variant="body1"
                                align="right"
                                className={classes.tooltipValue}>
                                {numbro(payload[0]?.payload?.payload?.value).format('0.00')}%
                            </Typography>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
        );
    }

    return null;
};

const EpochEnded = () => <span>This Epoch has ended!</span>;

const Epoch = (): JSX.Element => {
    const classes = useStyles();
    const [hasEnded, setHasEnded] = React.useState(false);
    let timerOn = false;

    const chain = useQuery(GET_CHAIN, {
        pollInterval: 5000
    });

    const number = chain?.data?.chain?.latestHeight;

    const { loading, error, data } = useQuery(GET_BLOCK_MINER, {
        variables: { number },
        pollInterval: 5000
    });

    const chartData = [
        {
            name: 'Epoch Remaining',
            value:
                ((chain?.data?.chain?.lastBlockNumberForEpoch - chain?.data?.chain?.latestHeight) /
                    chain?.data?.chain?.epochSize) *
                100,

            fill: 'rgba(246, 247, 249, 1)'
        },
        {
            name: 'Epoch Completed',
            value:
                ((chain?.data?.chain?.latestHeight - chain?.data?.chain?.firstBlockNumberForEpoch) /
                    chain?.data?.chain?.epochSize) *
                100,
            fill: 'rgba(28, 134, 252, 1)'
        }
    ];

    useEffect(() => {
        calculateRemainingTime();
    });

    const calculateRemainingTime = () => {
        const averageBlockTime =
            chain?.data?.chain?.averageBlockTime >= 4.5 &&
            chain?.data?.chain?.averageBlockTime < 6.5
                ? chain?.data?.chain?.averageBlockTime
                : 5;

        const blockTimeLeft =
            (chain?.data?.chain?.lastBlockNumberForEpoch - chain?.data?.chain?.latestHeight) *
            averageBlockTime *
            1000;
        const remainingTime = Date.now() + blockTimeLeft;
        timerOn = remainingTime > 0 ? true : false;
        return remainingTime;
    };

    const renderer = ({
        hours,
        minutes,
        seconds,
        completed
    }: CountdownRenderProps): JSX.Element => {
        if (completed) {
            // Render a completed state
            setHasEnded(true);
            return <EpochEnded />;
        } else {
            // Render a countdown
            return (
                <>
                    <span id="hours" style={{ color: 'rgba(28, 134, 252, 1)' }}>
                        {hours}
                    </span>
                    <span> h </span>
                    <span id="minutes" style={{ color: 'rgba(28, 134, 252, 1)' }}>
                        {minutes}
                    </span>
                    <span> m </span>
                    <span id="seconds" style={{ color: 'rgba(28, 134, 252, 1)' }}>
                        {seconds}
                    </span>
                    <span> s </span>
                </>
            );
        }
    };

    // if (error || chain.error) return <ErrorMessage />;
    if (loading && chain.loading) return <ComponentLoader />;

    return (
        <>
            <Grid container className={classes.menu}>
                <Grid item xs={12}>
                    <Paper className={classes.root}>
                        <Typography variant="body1" className={classes.box}>
                            Epoch
                        </Typography>
                        <Grid
                            item
                            xs={7}
                            style={{
                                overflow: 'overlay',
                                display: 'inline-block',
                                position: 'absolute',
                                zIndex: 999
                            }}>
                            <PieChart height={200} width={200}>
                                <Pie
                                    data={chartData}
                                    cx={90}
                                    cy={80}
                                    innerRadius={60}
                                    outerRadius={70}
                                    startAngle={90}
                                    endAngle={-270}
                                    strokeWidth={0}
                                    paddingAngle={2}
                                    dataKey="value"
                                />

                                {chartData.map((entry: any, index: number) => (
                                    <Cell key={`cell-${index}`} fill={entry.fill} />
                                ))}
                                <Tooltip content={<EpochTooltip />} />
                            </PieChart>
                        </Grid>

                        <Grid item xs={5} className={classes.epochData}>
                            {chain?.data?.chain?.epochNumber && chain?.data?.chain?.latestHeight ? (
                                <>
                                    <Typography variant="body1">
                                        <span className={classes.currentEpochText}>
                                            {chain?.data?.chain?.epochNumber}
                                        </span>{' '}
                                        th Epoch
                                    </Typography>
                                    <Typography variant="body1" gutterBottom>
                                        <Countdown
                                            date={calculateRemainingTime()}
                                            intervalDelay={1}
                                            precision={3}
                                            renderer={renderer}
                                        />
                                    </Typography>
                                    {!hasEnded && timerOn ? (
                                        <Typography variant="body2">Until Epoch End</Typography>
                                    ) : null}
                                </>
                            ) : null}
                        </Grid>

                        {timerOn ? (
                            <Grid item xs={12} className={classes.epochNumber}>
                                {chain?.data?.chain?.latestHeight &&
                                chain?.data?.chain?.firstBlockNumberForEpoch &&
                                chain?.data?.chain?.epochSize ? (
                                    <>
                                        <Typography variant="body1" noWrap>
                                            {chain?.data?.chain?.latestHeight -
                                                chain?.data?.chain?.firstBlockNumberForEpoch >
                                            0
                                                ? chain?.data?.chain?.latestHeight -
                                                  chain?.data?.chain?.firstBlockNumberForEpoch
                                                : 0}
                                        </Typography>

                                        <Divider variant="middle" className={classes.divider} />

                                        <Typography variant="body1" noWrap>
                                            {chain?.data?.chain?.epochSize}
                                        </Typography>
                                    </>
                                ) : null}
                            </Grid>
                        ) : null}
                        <Grid item xs={12} className={classes.blockProposer}>
                            {data?.block?.miner?.name || data?.block?.miner?.signer ? (
                                <>
                                    <Avatar
                                        value={
                                            data?.block?.miner?.name || data?.block?.miner?.signer
                                        }
                                    />
                                    <Typography
                                        variant="body1"
                                        color="textPrimary"
                                        className={
                                            data?.block?.miner?.name
                                                ? classes.blockProposerName
                                                : classes.blockProposerAddress
                                        }>
                                        {data?.block?.miner?.name || data?.block?.miner?.signer}
                                    </Typography>
                                </>
                            ) : null}
                        </Grid>
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
};

export default Epoch;
