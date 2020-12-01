import { useQuery, useSubscription } from '@apollo/client';
import { Divider, Theme } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import Countdown, { CountdownRenderProps } from 'react-countdown';
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

import ComponentLoader from '../misc/ComponentLoader';
import ErrorMessage from '../misc/ErrorMessage';
import { BLOCK_SUBSCRIPTION } from '../query/Block';
import { GET_CHAIN } from '../query/Chain';
import { GET_EPOCH } from '../query/Epoch';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            height: '100%',
            padding: '1.5%',
            borderRadius: 4,
            overflow: 'hidden'
            // display: "flex"
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
            marginTop: '-11.5rem',
            paddingLeft: '3.2rem',
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
            paddingRight: '20%',
            float: 'right',
            whiteSpace: 'nowrap',

            [theme.breakpoints.down('md')]: {
                paddingRight: '40%'
            }
        },

        blockProposer: {
            [theme.breakpoints.down('md')]: {
                marginTop: '-2rem'
            },
            paddingLeft: '1.5rem',
            display: 'flex'
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
        }
    })
);

const Epoch = (): JSX.Element => {
    const classes = useStyles();
    const pageSize = 1;
    const page = 1;
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
    // if (loading) return <ComponentLoader />;
    if (error)
        return (
            <ErrorMessage
                message={
                    (blockProposer.error && blockProposer.error.message
                        ? blockProposer.error.message
                        : (null as any)) || (error && error.message ? error.message : (null as any))
                }
            />
        );

    const chartData = [
        {
            name: 'Epoch Remaining',
            value:
                data &&
                data.epoch &&
                data.epoch.lastBlockNumberForEpoch &&
                data.epoch.epochSize &&
                blockProposer.data &&
                blockProposer.data.blockAdded &&
                blockProposer.data.blockAdded.number
                    ? ((data.epoch.lastBlockNumberForEpoch - blockProposer.data.blockAdded.number) /
                          data.epoch.epochSize) *
                      100
                    : 0,
            fill: 'rgba(246, 247, 249, 1)'
        },
        {
            name: 'Epoch Completed',
            value:
                data &&
                data.epoch &&
                data.epoch.firstBlockNumberForEpoch &&
                data.epoch.epochSize &&
                blockProposer.data &&
                blockProposer.data.blockAdded &&
                blockProposer.data.blockAdded.number
                    ? ((blockProposer.data.blockAdded.number -
                          data.epoch.firstBlockNumberForEpoch) /
                          data.epoch.epochSize) *
                      100
                    : 0,
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
                                width: '100%',
                                height: '15rem',
                                overflow: 'visible',
                                display: 'inline-block'
                            }}>
                            <ResponsiveContainer>
                                <PieChart>
                                    <Pie
                                        data={chartData}
                                        cx={95}
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
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
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
