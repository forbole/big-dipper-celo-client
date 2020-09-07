// import React from "react";
// import Container from "@material-ui/core/Container";
// import Typography from "@material-ui/core/Typography";
// import Link from "../components/Link";
// import { makeStyles, useTheme, Theme } from "@material-ui/core/styles";
// import Grid from "@material-ui/core/Grid";
// import cx from "clsx";
// import Card from "@material-ui/core/Card";
// import {
//     LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
// } from 'recharts';


// const useStyles = makeStyles(({ spacing }) => {
//     return {

//         price: {
//             marginRight: "-1.7rem",
//         },
//         largeCard: {
//             display: "flex",
//             padding: "1rem",
//             //border: "solid 1px rgba(61, 66, 71, 1)",
//             background: "rgba(255, 255, 255, 1)",
//             borderRadius: 4,
//             marginBottom: "1rem",
//         },
//         setFontSize: {
//             marginRight: "-1.7rem",
//             fontSize: "1.0625rem",
//         },
//     };
// });


// const data = [
//     {
//         name: 'Page A', uv: 4000, pv: 2400, amt: 2400,
//     },
//     {
//         name: 'Page B', uv: 3000, pv: 1398, amt: 2210,
//     },
//     {
//         name: 'Page C', uv: 2000, pv: 9800, amt: 2290,
//     },
//     {
//         name: 'Page D', uv: 2780, pv: 3908, amt: 2000,
//     },
//     {
//         name: 'Page E', uv: 1890, pv: 4800, amt: 2181,
//     },
//     {
//         name: 'Page F', uv: 2390, pv: 3800, amt: 2500,
//     },
//     {
//         name: 'Page G', uv: 3490, pv: 4300, amt: 2100,
//     },
// ];


// type TokenPriceProps = { price?: string };

// const TokenPrice = ({ price }: TokenPriceProps) => {
//     const classes = useStyles();

//     return (
//         <Card className={cx(classes.largeCard)} elevation={0}>

//             <Grid container>
//                 <Grid item sm={12}>
//                     <LineChart
//                         width={500}
//                         height={300}
//                         data={data}
//                         margin={{
//                             top: 5, right: 30, left: 20, bottom: 5,
//                         }}
//                     >
//                         <CartesianGrid strokeDasharray="3 3" />
//                         <XAxis dataKey="name" />
//                         <YAxis />
//                         <Tooltip />
//                         <Legend />
//                         <Line type="monotone" dataKey="pv" stroke="rgba(102, 227, 157, 1)" activeDot={{ r: 8 }} />
//                         <Line type="monotone" dataKey="uv" stroke="rgba(255, 177, 52, 1)" />
//                     </LineChart>
//                 </Grid>
//             </Grid>
//         </Card>)
// }

// export default TokenPrice



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
    link: {
        float: "right",
        textAlign: "right",
    },
    divider: {
        padding: "0 1rem",
        backgroundColor: "rgba(62, 67, 71, 1)",
    },

    cell: {
        maxHeight: "1rem",
    },

    tableCell: {
        overflow: "auto",
        padding: "0.4rem",
    },
    table: {
        background: "rgba(246, 247, 249, 1)",
        padding: "0.2rem",
    },
    inline: {
        paddingLeft: "0rem",
    },

    textContent: {
        textOverflow: "ellipsis",
        overflow: "hidden",
        minWidth: 0,

    },
    truncareText: {
        overflow: "hidden",
        textOverflow: "ellipsis",
        width: "6rem",
        minWidth: "2rem",
        maxWidth: "15rem",
    },
    label: {
        display: "flex",
        padding: "0 0 0 0.5rem",
        marginTop: "-0.5rem"
        //color: "rgba(255, 255, 255, 1)"

    },
    value: {
        // fontWeight: 300,
        display: "inline-block",
        padding: "0.3rem 0 0  0.5rem",
        // marginTop: "-0.5rem"
        //padding: "0 0.75rem 2rem 1.5rem",
        //color: "rgba(255, 255, 255, 1)"

    },
    priceCard: {
        display: "inline-block",
        // justifyContent: "center",

        borderLeft: "4px solid rgba(102, 227, 157, 1)",
        // background: "rgba(250, 123, 108, 1)",
        alignItems: "left",
        marginLeft: "1rem",
        height: "60%",
        overflow: "visible",
        marginTop: "1rem",

        // height: "8.75rem",
    },
    marketCard: {

        display: "inline-block",
        // justifyContent: "center",

        borderLeft: "4px solid rgba(255, 177, 52, 1)",
        // background: "rgba(250, 123, 108, 1)",
        alignItems: "left",
        marginLeft: "1rem",
        height: "60%",
        overflow: "visible",
        marginTop: "1rem",

        // height: "8.75rem",


    },

    priceCardsProps: {
        display: "flex"
    }
});

moment.relativeTimeThreshold("s", 59);
moment.relativeTimeThreshold("ss", 3);



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

    const { publicRuntimeConfig } = getConfig()

    const [page, setPage] = React.useState(publicRuntimeConfig.setPage);
    const [pageSize, setPageSize] = React.useState(publicRuntimeConfig.rowSmall);



    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (
        event: React.ChangeEvent<HTMLInputElement>
    ) => {
        setPageSize(+event.target.value);
        setPage(publicRuntimeConfig.setPage);
    };

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
                                <Typography variant="body2" className={classes.label} color="textSecondary">
                                    Price
                             </Typography>
                                <Typography variant="body1" className={classes.value} color="textPrimary">
                                    $ 4.75
                                </Typography>
                            </Card>

                        </Grid>
                        <Grid item xs={4} spacing={1} className={classes.priceCardsProps}>
                            <Card className={classes.marketCard} elevation={0}>
                                <Typography variant="body2" className={classes.label} color="textSecondary">
                                    Market Cap
                             </Typography>
                                <Typography variant="body1" className={classes.value} color="textPrimary">
                                    $ 551,195.53
                                </Typography>
                            </Card>
                        </Grid>

                    </Grid>



                    <Grid item xs={12}>
                        <ResponsiveContainer width='95%' aspect={1.0 / 0.7}>
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
                                <Line yAxisId="left" type="monotone" dataKey="pv" stroke="rgba(102, 227, 157, 1)" activeDot={{ r: 8 }} />
                                <Line yAxisId="right" type="monotone" dataKey="uv" stroke="rgba(255, 177, 52, 1)" />
                            </LineChart>
                        </ResponsiveContainer>

                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    </>
    );
}

export default TokenPrice;
