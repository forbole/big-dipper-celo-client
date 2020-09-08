
import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Divider } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import Hidden from "@material-ui/core/Hidden";
import { useQuery } from "@apollo/client";
import TablePagination from "@material-ui/core/TablePagination";
import numbro from "numbro";
import { useRouter } from "next/router";
import MiddleEllipsis from './misc/MiddleEllipsis'
import ComponentLoader from './misc/ComponentLoader';
import ErrorMessage from './misc/ErrorMessage';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import getConfig from 'next/config'
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import Card from "@material-ui/core/Card";



const useStyles = makeStyles({
    root: {
        width: "100%",
        height: "100%",
        padding: "1.5%",
        borderRadius: 4,
        wordWrap: "break-word",
        margin: "none",
        overflow: "hidden",
    },
    box: {
        letterSpacing: "1px",
        padding: "0.6rem",
        display: "block",
        overflow: "hidden",
        whiteSpace: "nowrap",
    },

    label: {
        display: "flex",
        padding: "0 0 0 0.5rem",
        marginTop: "-0.5rem"

    },
    value: {
        display: "inline-block",
        padding: "0.3rem 0 0  0.5rem",

    },
    priceCard: {
        display: "inline-block",
        borderLeft: "4px solid rgba(102, 227, 157, 1)",
        alignItems: "left",
        marginLeft: "1rem",
        height: "60%",
        overflow: "visible",
        marginTop: "1rem",
    },
    marketCard: {
        display: "inline-block",
        borderLeft: "4px solid rgba(255, 177, 52, 1)",
        alignItems: "left",
        marginLeft: "1rem",
        height: "60%",
        overflow: "visible",
        marginTop: "1rem",
    },

    priceCardsProps: {
        display: "flex"
    }
});



const data = [
    {
        name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
    },
    {
        name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
    },
    {
        name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
    },
    {
        name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
    },
    {
        name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
    },
    {
        name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
    },
    {
        name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
    },
];


type LatestBlocksProps = { pagination?: boolean, displayCard?: boolean };


const TokenPrice = ({ pagination, displayCard }: LatestBlocksProps) => {
    const classes = useStyles();
    const theme = useTheme();
    const largeScreen = useMediaQuery(theme.breakpoints.up('sm'));


    // const { loading, error, data } = useQuery(GET_BLOCK, {
    //     variables: { pageSize, page },
    //     pollInterval: 5000,
    // });

    // if (loading) return <ComponentLoader />
    // if (error) return <ErrorMessage message={error.message} />

    return (<>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Paper className={classes.root}>
                    <Typography variant="body1" className={classes.box}>
                        Token Price
                    </Typography>
                    <Grid container spacing={1}>
                        <Grid item xs={4} className={classes.priceCardsProps}>
                            <Card className={classes.priceCard} elevation={0}>
                                <Typography variant="body2" className={classes.label} color="textSecondary" noWrap>
                                    Price
                             </Typography>
                                <Typography variant="body1" className={classes.value} color="textPrimary" noWrap>
                                    $ 4.75
                                </Typography>
                            </Card>

                        </Grid>
                        <Grid item xs={4} className={classes.priceCardsProps}>
                            <Card className={classes.marketCard} elevation={0}>
                                <Typography variant="body2" className={classes.label} color="textSecondary" noWrap>
                                    Market Cap
                             </Typography>
                                <Typography variant="body1" className={classes.value} color="textPrimary" noWrap>
                                    $ 551,195.53
                                </Typography>
                            </Card>
                        </Grid>

                    </Grid>



                    {/* <Grid item xs={12}> */}
                        <div style={{ width: '100%', height: 260 }}>
                            <ResponsiveContainer>
                                {/* <ResponsiveContainer width='100%' aspect={largeScreen ? 1.0 / 0.3 : 1.0 / 0.5}> */}
                                <LineChart
                                    width={500}
                                    height={300}
                                    data={data}
                                    margin={{
                                        top: 30, right: 0, left: 0, bottom: 0,
                                    }}
                                >
                                    <CartesianGrid strokeDasharray="3 3" strokeWidth={1} opacity={0.3} />
                                    <XAxis dataKey="name" tick={{ stroke: "rgba(119, 119, 119, 1)", fontSize: 10, fontWeight: 150 }} />
                                    <YAxis yAxisId="left" tickSize={0} tickMargin={10} tick={{ stroke: "rgba(119, 119, 119, 1)", fontSize: 10, fontWeight: 150 }} />
                                    <YAxis yAxisId="right" orientation="right" tickSize={0} tickMargin={10} tick={{ stroke: "rgba(119, 119, 119, 1)", fontSize: 10, fontWeight: 150 }} />
                                    <Tooltip />
                                    <Line yAxisId="left" type="monotone" dataKey="pv" stroke="rgba(102, 227, 157, 1)" activeDot={{ r: 2 }} />
                                    <Line yAxisId="right" type="monotone" dataKey="uv" stroke="rgba(255, 177, 52, 1)" activeDot={{ stroke: 'rgba(250, 123, 108, 1)', r: 2 }} />
                                </LineChart>
                            </ResponsiveContainer>
                        </div>
                    {/* </Grid> */}
                </Paper>
            </Grid>
        </Grid>
    </>
    );
}

export default TokenPrice;
