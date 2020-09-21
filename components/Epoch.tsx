import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Divider } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import { useQuery } from "@apollo/client";
import { useRouter } from "next/router";
import MiddleEllipsis from './misc/MiddleEllipsis'
import ComponentLoader from './misc/ComponentLoader';
import ErrorMessage from './misc/ErrorMessage';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import getConfig from 'next/config'
import {
    PieChart, Pie, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Sector, Cell, Line
} from 'recharts';
import Card from "@material-ui/core/Card";
import { GET_BLOCK } from './query/Block'
import { GET_EPOCH } from "./query/Epoch"
import EpochCountdown from "./EpochCountdown"

const useStyles = makeStyles({
    root: {
        width: "100%",
        height: "100%",
        padding: "1.5%",
        borderRadius: 4,
        overflow: "hidden",
    },
    box: {
        letterSpacing: "1px",
        padding: "0.8rem",
        display: "block",
        overflow: "hidden",
        whiteSpace: "nowrap",
    },

    divider: {
        width: "4rem",
        backgroundColor: "rgba(232, 232, 232, 1)",
        fontWeight: 600,
    },

    menu: {
        height: '100%'
    },

    epochNumber: {
        display: "block",
        marginTop: "-19rem",
        paddingLeft: "3.2rem",
        fontWeight: 400,
        position: "absolute",
        textAlign: "center",
    },

    currentEpochText: {
        fontWeight: 400,
        color: "rgba(28, 134, 252, 1)",
        fontSize: "1.5rem"
    },
    epochData: {
        display: "inline-block",
        marginTop: "-19.5rem",
        marginLeft: "12.5rem",
        position: "absolute",
    },

    blockProposer: {
        marginTop: "-7rem",
        marginLeft: "1rem",
        display: "flex",
    },

    blockProposerAddress: {
        paddingLeft: "3.5rem",
        paddingRight: "1.5rem",
        wordBreak: "break-word",
        wordWrap: "break-word",

        display: "flex",
        textAlign: "left",

    },

    blockProposerName: {
        paddingLeft: "3.5rem",
        paddingRight: "1.5rem",
        marginTop: "0.5rem",
        wordBreak: "break-word",
        display: "flex",
        textAlign: "left",
    },

    roundIcon: {
        marginTop: "-0.25rem",
        border: "solid 2px rgba(8, 178, 122, 1)",
        borderRadius: 50,
        position: "absolute",
    }
});





const Epoch = () => {
    const classes = useStyles();
    const theme = useTheme();
    const largeScreen = useMediaQuery(theme.breakpoints.up('sm'));
    const pageSize = 1;
    const page = 1;

    const blockProposer = useQuery(GET_BLOCK, {
        variables: { pageSize, page },
        pollInterval: 5000,
    });



    const { loading, error, data } = useQuery(GET_EPOCH, {
        pollInterval: 5001,
    });


    useEffect(() => {

    });

    if (blockProposer.loading || loading) return <ComponentLoader />
    if (blockProposer.error || error) return <ErrorMessage message={blockProposer.error.message || error.message} />

    let chartData = [
        { name: 'Epoch Remaining', value: ((((data.epoch.lastBlockNumberForEpoch) - (blockProposer.data.blocks.blocks[0].number)) / data.epoch.epochSize) * 100), fill: "rgba(246, 247, 249, 1)" },
        { name: 'Epoch Completed', value: ((((blockProposer.data.blocks.blocks[0].number) - (data.epoch.firstBlockNumberForEpoch)) / data.epoch.epochSize) * 100), fill: "rgba(28, 134, 252, 1)" }
    ];

    return (<>
        <Grid container className={classes.menu}>
            <Grid item xs={12}>
                <Paper className={classes.root}>

                    <Typography variant="body1" className={classes.box}>
                        Epoch
                    </Typography>
                    <Grid item xs={6}>
                        <div style={{ width: '100%', height: 357 }}>
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

                                    {
                                        chartData.map((entry: any, index: number) => <Cell key={`cell-${index}`} fill={entry.fill} />)
                                    }
                                    <Tooltip />


                                </PieChart>

                            </ResponsiveContainer>
                        </div>
                    </Grid>

                    <Grid item xs={6} className={classes.epochData} >
                        {data.epoch && data.epoch.epochNumber ?
                            <Typography variant="body1" noWrap >
                                <span className={classes.currentEpochText}>{data.epoch.epochNumber}</span> th Epoch
                        </Typography> : null}
                        <Typography variant="body1" gutterBottom noWrap>
                            <EpochCountdown />
                        </Typography>
                        <Typography variant="body2" noWrap>
                            until Epoch Ends
                        </Typography>
                    </Grid>

                    <Grid item xs={5} className={classes.epochNumber}>
                        {blockProposer.data.blocks && blockProposer.data.blocks.blocks[0] && blockProposer.data.blocks.blocks[0].number && data.epoch && data.epoch.firstBlockNumberForEpoch ?
                            < Typography variant="body1" noWrap>
                                {(blockProposer.data.blocks.blocks[0].number) - (data.epoch.firstBlockNumberForEpoch)}
                            </Typography> : null}
                        <Divider variant="middle" className={classes.divider} />
                        {data.epoch && data.epoch.epochSize ?
                            <Typography variant="body1" noWrap >
                                {data.epoch.epochSize}
                            </Typography> : null}
                    </Grid>
                    {blockProposer.data.blocks && blockProposer.data.blocks.blocks[0] && blockProposer.data.blocks.blocks[0].miner && blockProposer.data.blocks.blocks[0].miner ?
                        <Grid item xs={12} className={classes.blockProposer} >
                            <img src={`https://ui-avatars.com/api/?rounded=true&size=40&name=${blockProposer.data.blocks.blocks[0].miner.name}&color=rgba(8, 178, 122, 1)&background=fff`} className={classes.roundIcon} />
                            {blockProposer.data.blocks.blocks[0].miner.name ?
                                <Typography variant="body2" color="textPrimary" className={classes.blockProposerName} >
                                    {blockProposer.data.blocks.blocks[0].miner.name}
                                </Typography> :
                                <Typography variant="body2" color="textPrimary" className={classes.blockProposerAddress} >
                                    {blockProposer.data.blocks.blocks[0].miner.signer}
                                </Typography>}
                        </Grid> : null}

                </Paper>
            </Grid>
        </Grid>
    </>
    );

}

export default Epoch;