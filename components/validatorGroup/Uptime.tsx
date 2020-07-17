import React, { PureComponent } from 'react';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Cell, Legend, Label, ResponsiveContainer
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
        Voted: 99,
    },
    {
        Voted: 91,
    },
    {
        Voted: 94,
    },
    {
        Voted: 87,
    },
    {
        Voted: 90,
    },
    {
        Voted: 99,
    },
    {
        Voted: 96,
    },
    {
        Voted: 91,
    },
    {
        Voted: 94,
    },
    {
        Voted: 87,
    },
    {
        Voted: 90,
    },
    {
        Voted: 99,
    },
    {
        Voted: 96,
    },
    {
        Voted: 96,
    },
    {
        Voted: 96,
    },
    {
        Voted: 96,
    },
    {
        Voted: 96,
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
            display: "flex",
        },
        divider: {
            margin: "0.15rem 0rem",
            backgroundColor: "rgba(62, 67, 71, 1)",
        },
        power: {
            align: "left",
            marginLeft: "-3rem"

        }
    };
});

const Uptime = () => {
    const classes = useStyles();

    return (
        <Card className={classes.root}>
            <CardContent>
                <Grid container spacing={1} className={classes.container} >
                    <Grid item xs={6}>
                        <Typography color="textPrimary" variant="subtitle1" align="left" gutterBottom>
                            Uptime
            </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography color="secondary" variant="subtitle1" align="right" gutterBottom>
                            99.8%
            </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider variant="middle" className={classes.divider} />
                    </Grid>
                    <ResponsiveContainer width='95%' aspect={1.0 / 0.9}>
                        <BarChart
                            // width={350}
                            // height={250}
                            data={data}
                            margin={{
                                top: 0, right: 0, left: -10, bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                            <XAxis tick={{ stroke: "rgba(255, 255, 255, 0.6)", fontSize: 10, fontWeight: 150, }} dataKey="name"
                                label={{ value: 'Blocks', position: 'insideBottomLeft', fill: "rgba(255, 255, 255, 0.6)", fontWeight: "normal", textAnchor: "start" }} />
                            <YAxis tickSize={0} tickMargin={10} tick={{ stroke: "rgba(255, 255, 255, 0.6)", fontSize: 10, fontWeight: 150 }}
                                label={{ value: 'Votes available', angle: -270, position: 'center', fill: "rgba(255, 255, 255, 0.6)", fontWeight: "normal", }} />
                            <Tooltip />
                            <Legend align="left" verticalAlign="top" height={50} width={200} />
                            <Bar dataKey="Voted" fill="rgba(58, 211, 158, 1)" barSize={6} fillOpacity={1} />
                            <Bar dataKey="Missed" fill="rgba(150, 152, 154, 1)" barSize={6} fillOpacity={1} />
                        </BarChart>
                    </ResponsiveContainer>
                    <span className={classes.power}>
                        <Typography color="textSecondary" variant="caption" className={classes.power}  >
                            10/10000 (19h)
            </Typography>
                    </span>
                </Grid>

            </CardContent>
        </Card >

    );

}

export default Uptime
