import React, { PureComponent } from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Cell, Legend, Label
} from 'recharts';
import { curveCardinal } from 'd3-shape';
import Typography from "@material-ui/core/Typography";
import Link from "../Link";
import {
    makeStyles, withStyles
} from "@material-ui/core/styles";
import Grid from '@material-ui/core/Grid';
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Divider from "@material-ui/core/Divider";


const data = [
    {
        voted: 99,
    },
    {
        voted: 91,
    },
    {
        voted: 94,
    },
    {
        voted: 87,
    },
    {
        voted: 90,
    },
    {
        voted: 99,
    },
    {
        voted: 96,
    },
    {
        voted: 91,
    },
    {
        voted: 94,
    },
    {
        voted: 87,
    },
    {
        voted: 90,
    },
    {
        voted: 99,
    },
    {
        voted: 96,
    },
];

const useStyles = makeStyles(() => {
    return {
        root: {
            width: "100%",
            padding: "0.5rem",
            borderRadius: 5,
            overflowY: "auto",
        },
        container: {
            justifyContent: "center",
        },
        divider: {
            margin: "0.15rem 0rem",
            backgroundColor: "rgba(62, 67, 71, 1)",
        },
        legend: {
            align: "left"
        }
    };
});

const Uptime = () => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                <Grid container spacing={1} justify="center" >
                    <Grid item xs={12}>
                        <Typography color="textPrimary" variant="subtitle1" gutterBottom>
                            Uptime
            </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider variant="middle" className={classes.divider} />
                    </Grid>
                    <Grid item xs={12}>
                        <BarChart
                            width={350}
                            height={250}
                            data={data}
                            margin={{
                                top: 0, right: 30, left: 20, bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" opacity={0.1} />
                            <XAxis tick={{ stroke: "rgba(255, 255, 255, 0.6)", fontSize: 10, fontWeight: 150, }} dataKey="name">
                                <Label value="Blocks" offset={0} position="insideBottom" />
                            </XAxis>
                            <YAxis tickSize={0} tickMargin={10} tick={{ stroke: "rgba(255, 255, 255, 0.6)", fontSize: 10, fontWeight: 150 }}
                                label={{ value: 'Votes available', angle: -270, position: 'insideLeft', color: "rgba(255, 255, 255, 0.6)" }} />
                            <Tooltip />
                            <Legend align="left" verticalAlign="top" />
                            <Bar dataKey="voted" fill="rgba(58, 211, 158, 1)" barSize={6} fillOpacity={1} />
                            <Bar dataKey="missed" fill="rgba(150, 152, 154, 1)" barSize={6} fillOpacity={1} />
                        </BarChart>
                    </Grid>
                </Grid>

            </CardContent>
        </Card >

    );

}

export default Uptime
