
import React, { useEffect, Fragment, useState } from "react";
import { makeStyles, withStyles, createStyles, Theme } from "@material-ui/core/styles";

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
import { GET_COIN_HISTORY_BY_NUM_OF_DAYS } from './query/Coin'
import { GET_CHAIN } from './query/Chain'
import NotAvailable from './misc/NotAvailable'
import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';



const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: "100%",
            height: "100%",
            padding: "1.5%",
            borderRadius: 4,
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
        },
        selectDateFrom: {
            fontSize: "0.75rem",
            [theme.breakpoints.down('sm')]: {
                transform: "translate(0, 1.5px) scale(0.90)",
            },
            marginRight: "1rem",
            marginLeft: "0.6rem",
            position: "relative"
        },
        selectDateTo: {
            fontSize: "0.75rem",
            [theme.breakpoints.down('sm')]: {
                transform: "translate(0, 1.5px) scale(0.90)",
            },
            marginRight: "1rem",
            marginLeft: "1rem",
            position: "relative"
        },
        dateSelection: {
            display: "flex",
            padding: "0.5rem 0",
        },

        selectDateGrid: {
            fontSize: "14px",
            display: "inline-flex"
        }
    })
);


const StyledDatePicker = withStyles({
    root: {
        "& div.MuiInputAdornment-positionEnd ": {
            // marginLeft: "-30%",
            position: "absolute",
            marginLeft: "5.5rem"
        },
    }

})(KeyboardDatePicker);


function SelectDate() {
    const classes = useStyles();
    const [selectedFromDate, setSelectedFromDate] = React.useState<Date | null>(
        new Date('2014-08-18T21:11:54'),
    );

    const [selectedToDate, setSelectedToDate] = React.useState<Date | null>(
        new Date('2014-08-19T21:11:54'),
    );
    const handleDateFromChange = (date: Date | null) => {
        setSelectedFromDate(date);
    };
    const handleDateToChange = (date: Date | null) => {
        setSelectedToDate(date);
    };

    console.log(selectedFromDate)

    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container className={classes.dateSelection}>
                <Grid item xs={6}>
                    <StyledDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="none"
                        id="date-picker-from"
                        label="Date from"
                        value={selectedFromDate}
                        onChange={handleDateFromChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        className={classes.selectDateFrom}

                    />
                </Grid>

                <Grid item xs={6}>
                    <StyledDatePicker
                        disableToolbar
                        variant="inline"
                        format="MM/dd/yyyy"
                        margin="none"
                        id="date-picker-to"
                        label="Date to"
                        value={selectedToDate}
                        onChange={handleDateToChange}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        className={classes.selectDateTo}
                    />
                </Grid>
            </Grid>
        </MuiPickersUtilsProvider>
    );
}

type TokenPriceProps = { pagination?: boolean, displayCard?: boolean };


const TokenPrice = () => {
    const classes = useStyles();
    const theme = useTheme();
    const largeScreen = useMediaQuery(theme.breakpoints.up('sm'));
    const days = 1;

    const { loading, error, data } = useQuery(GET_COIN_HISTORY_BY_NUM_OF_DAYS, {
        variables: { days },
        pollInterval: 5000,
    });


    const chainData = useQuery(GET_CHAIN, {
        pollInterval: 5000,
    });


    if (loading) return <ComponentLoader />
    if (error) return <ErrorMessage message={error.message} />

    return (<>
        <Grid container spacing={1}>
            <Grid item xs={12}>
                <Paper className={classes.root}>
                    <Typography variant="body1" className={classes.box}>
                        Token Price
                    </Typography>
                    <Grid container spacing={2}>
                        <Grid item xs={6} md={3} className={classes.priceCardsProps}>
                            <Card className={classes.priceCard} elevation={0}>
                                <Typography variant="body2" className={classes.label} color="textSecondary" noWrap>
                                    Price
                             </Typography>
                                {chainData.data && chainData.data.chain && chainData.data.chain.tokenPrice && chainData.data.chain.tokenPrice.usd >= 0 ?
                                    <Typography variant="body1" className={classes.value} color="textPrimary" noWrap>
                                        $ {numbro(chainData.data.chain.tokenPrice.usd).format("0.00")}
                                    </Typography> : <NotAvailable variant="body2" />}
                            </Card>

                        </Grid>
                        <Grid item xs={6} md={3} className={classes.priceCardsProps}>
                            <Card className={classes.marketCard} elevation={0}>
                                <Typography variant="body2" className={classes.label} color="textSecondary" noWrap>
                                    Market Cap
                             </Typography>
                                {chainData.data && chainData.data.chain && chainData.data.chain.tokenPrice && chainData.data.chain.tokenPrice.usdMarketCap >= 0 ?
                                    <Typography variant="body1" className={classes.value} color="textPrimary" noWrap>
                                        $ {numbro(chainData.data.chain.tokenPrice.usdMarketCap).format("0.00")}
                                    </Typography> : <NotAvailable variant="body2" />}
                            </Card>
                        </Grid>
                        <Hidden mdDown>
                            <Grid item xs={12} lg={5}>
                                <SelectDate />
                            </Grid>
                        </Hidden>
                    </Grid>

                    <Hidden mdUp>
                        <Grid container className={classes.selectDateGrid}>
                            <Grid item xs={12} md={5} className={classes.selectDateGrid}>
                                <SelectDate />
                            </Grid>

                        </Grid>
                    </Hidden>

                    <div style={{ width: '100%', height: 290 }}>
                        <ResponsiveContainer>
                            <LineChart
                                width={500}
                                height={250}
                                data={data.coinHistoryByNumOfDays.prices}
                                margin={{
                                    top: 20, right: 0, left: 0, bottom: 0,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" strokeWidth={1} opacity={0.3} />
                                <XAxis dataKey="time" tick={{ stroke: "rgba(119, 119, 119, 1)", fontSize: 10, fontWeight: 150 }} />
                                <YAxis yAxisId="left" tickSize={0} tickMargin={10} tick={{ stroke: "rgba(119, 119, 119, 1)", fontSize: 10, fontWeight: 150 }} />
                                <YAxis yAxisId="right" orientation="right" tickSize={0} tickMargin={10} tick={{ stroke: "rgba(119, 119, 119, 1)", fontSize: 10, fontWeight: 150 }} />
                                <Tooltip />
                                <Line yAxisId="left" type="monotone" dataKey="price" stroke="rgba(102, 227, 157, 1)" activeDot={{ stroke: "rgba(102, 128, 113, 1)", r: 3 }} strokeWidth={2} dot={false} />
                                <Line yAxisId="right" type="monotone" dataKey="uv" stroke="rgba(255, 177, 52, 1)" activeDot={{ stroke: 'rgba(250, 123, 108, 1)', r: 0 }} strokeWidth={2} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </Paper>
            </Grid>
        </Grid>
    </>
    );
}

export default TokenPrice;
