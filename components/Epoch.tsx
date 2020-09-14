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


});



const data = [
    { name: 'validator', value: 400 },
];
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];



type EpochProps = { epochNumber?: number };


const Epoch = ({ epochNumber }: EpochProps) => {
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
        <Grid container spacing={2} className={classes.menu}>
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
                                        data={data}
                                        cx={95}
                                        cy={80}
                                        innerRadius={60}
                                        outerRadius={70}
                                        fill="rgba(28, 134, 252, 1)"
                                        strokeWidth={0}
                                        paddingAngle={2}
                                        dataKey="value"
                                    />
                                    <Tooltip />
                                </PieChart>

                            </ResponsiveContainer>
                        </div>
                    </Grid>

                    <Grid item xs={6} className={classes.epochData} >
                        <Typography variant="body1" noWrap >
                            <span className={classes.currentEpochText}>134</span> th Epoch
                        </Typography>
                        <Typography variant="body1" gutterBottom noWrap>
                            <span className={classes.currentEpochText}>8</span> h <span className={classes.currentEpochText}>27</span> m <span className={classes.currentEpochText}>6</span> s
                        </Typography>
                        <Typography variant="body2" noWrap>
                            until Epoch Ends
                        </Typography>

                    </Grid>


                    <Grid item xs={5} className={classes.epochNumber}>
                        <Typography variant="body1" noWrap>
                            182
                         </Typography>
                        <Divider variant="middle" className={classes.divider} />
                        <Typography variant="body1" noWrap >
                            17280
                     </Typography>
                    </Grid>

                </Paper>
            </Grid>
        </Grid>
    </>
    );
}

export default Epoch;
