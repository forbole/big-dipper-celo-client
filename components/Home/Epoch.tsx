import { useQuery, useSubscription } from '@apollo/client';
import { Card, CardContent, Divider, Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import numbro from 'numbro';
import React from 'react';
import Countdown, { CountdownRenderProps } from 'react-countdown';
import { Cell, Pie, PieChart, Tooltip } from 'recharts';

import { BLOCK_SUBSCRIPTION } from '../Query/Block';
import { GET_CHAIN } from '../Query/Chain';
import { GET_EPOCH } from '../Query/Epoch';
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
            marginTop: '15rem'
        },

        blockProposerAddress: {
            paddingLeft: '3.5rem',
            paddingRight: '1.5rem',
            wordBreak: 'break-word',
            wordWrap: 'break-word',

            display: 'flex',
            textAlign: 'left'
        },

        blockProposerName: {
            paddingLeft: '3.5rem',
            paddingRight: '1.5rem',
            marginTop: '0.5rem',
            wordBreak: 'break-word',
            display: 'flex',
            textAlign: 'left',
            [theme.breakpoints.down('md')]: {
                paddingBottom: '4rem'
            }
        },

        roundIcon: {
            marginTop: '-0.25rem',
            border: 'solid 2px rgba(8, 178, 122, 1)',
            borderRadius: 50,
            position: 'absolute'
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

const Epoch = (): JSX.Element => {
    const classes = useStyles();
    const [hasEnded, setHasEnded] = React.useState(false);

    const blockProposer = useSubscription(BLOCK_SUBSCRIPTION);

    const averageBlockTime = useQuery(GET_CHAIN);
    const { loading, error, data } = useQuery(GET_EPOCH);

    const lastBlockInEpoch =
        data && data.epoch && data.epoch.lastBlockNumberForEpoch
            ? data.epoch.lastBlockNumberForEpoch
            : 0;

    const averageTimeOfBlock =
        averageBlockTime &&
        averageBlockTime.data &&
        averageBlockTime.data.chain &&
        averageBlockTime.data.chain.averageBlockTime
            ? averageBlockTime.data.chain.averageBlockTime
            : 0;
    if (loading) return <ComponentLoader />;
    if (error) return <ErrorMessage />;

    const chartData = [
        {
            name: 'Epoch Remaining',
            value:
                ((data?.epoch?.lastBlockNumberForEpoch - blockProposer?.data?.blockAdded?.number) /
                    data?.epoch?.epochSize) *
                100,

            fill: 'rgba(246, 247, 249, 1)'
        },
        {
            name: 'Epoch Completed',
            value:
                ((blockProposer?.data?.blockAdded?.number - data?.epoch?.firstBlockNumberForEpoch) /
                    data?.epoch?.epochSize) *
                100,
            fill: 'rgba(28, 134, 252, 1)'
        }
    ];

    const EpochEnded = () => <span>This Epoch has ended!</span>;

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
                            {data && data.epoch && data.epoch.epochNumber ? (
                                <Typography variant="body1">
                                    <span className={classes.currentEpochText}>
                                        {data.epoch.epochNumber}
                                    </span>{' '}
                                    th Epoch
                                </Typography>
                            ) : null}
                            <Typography variant="body1" gutterBottom>
                                {blockProposer &&
                                blockProposer.data &&
                                blockProposer.data.blockAdded &&
                                blockProposer.data.blockAdded.number ? (
                                    <Countdown
                                        date={
                                            Date.now() +
                                            (lastBlockInEpoch -
                                                blockProposer.data.blockAdded.number) *
                                                averageTimeOfBlock *
                                                1000
                                        }
                                        intervalDelay={1}
                                        precision={3}
                                        renderer={renderer}
                                    />
                                ) : null}
                            </Typography>
                            {!hasEnded ? (
                                <Typography variant="body2">until Epoch Ends</Typography>
                            ) : null}
                        </Grid>

                        <Grid item xs={12} className={classes.epochNumber}>
                            {blockProposer &&
                            blockProposer.data &&
                            blockProposer.data.blockAdded &&
                            blockProposer.data.blockAdded.number &&
                            data &&
                            data.epoch &&
                            data.epoch.firstBlockNumberForEpoch ? (
                                <Typography variant="body1" noWrap>
                                    {blockProposer.data.blockAdded.number -
                                        data.epoch.firstBlockNumberForEpoch >
                                    0
                                        ? blockProposer.data.blockAdded.number -
                                          data.epoch.firstBlockNumberForEpoch
                                        : 0}
                                </Typography>
                            ) : null}
                            <Divider variant="middle" className={classes.divider} />
                            {data && data.epoch && data.epoch.epochSize ? (
                                <Typography variant="body1" noWrap>
                                    {data.epoch.epochSize}
                                </Typography>
                            ) : null}
                        </Grid>
                        {blockProposer &&
                        blockProposer.data &&
                        blockProposer.data.blockAdded &&
                        blockProposer.data.blockAdded.number &&
                        blockProposer.data.blockAdded.miner ? (
                            <Grid item xs={12} className={classes.blockProposer}>
                                <img
                                    src={`https://ui-avatars.com/api/?rounded=true&size=40&name=${blockProposer.data.blockAdded.miner.name}&color=rgba(8, 178, 122, 1)&background=fff`}
                                    className={classes.roundIcon}
                                    alt="Block Proposer"
                                />
                                {blockProposer.data.blockAdded.miner.name ? (
                                    <Typography
                                        variant="body2"
                                        color="textPrimary"
                                        className={classes.blockProposerName}>
                                        {blockProposer.data.blockAdded.miner.name}
                                    </Typography>
                                ) : (
                                    <Typography
                                        variant="body2"
                                        color="textPrimary"
                                        className={classes.blockProposerAddress}>
                                        {blockProposer.data.blockAdded.miner.signer}
                                    </Typography>
                                )}
                            </Grid>
                        ) : null}
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
};

export default Epoch;
