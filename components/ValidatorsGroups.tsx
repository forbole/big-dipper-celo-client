import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
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
        padding: "0.6rem",
        display: "block",
        overflow: "hidden",
        whiteSpace: "nowrap",
    },

    rootMain: {
        height: '100%'
    },

    data: {
        display: "inline-flex",

    },
    groupsData: {
        padding: "1rem",
        textAlign: "center"

    },
    validatorData: {
        padding: "1rem",
        textAlign: "center"

    },
    infoData: {
        paddingTop: "1.2rem",
        paddingBottom: "0.4rem"
    },

    valueData: {
        paddingBottom: "0.6rem"
    }

});



type ValidatorsGroupsProps = { epochNumber: number };


const ValidatorsGroups = ({ epochNumber }: ValidatorsGroupsProps) => {
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
        <Grid container spacing={1} className={classes.rootMain}>
            <Grid item xs={12}>
                <Paper className={classes.root}>

                    <Typography variant="body1" className={classes.box}>
                        Validators / Groups
                    </Typography>
                    <Grid container spacing={1} className={classes.rootMain}>
                        <Grid item xs={12} className={classes.data}>
                            <Grid item xs={6} className={classes.validatorData}>
                                <img src="/images/validator-icon.svg" />
                                <Typography variant="body1" className={classes.infoData} noWrap>
                                    Validators
                                </Typography>
                                <Typography variant="h4" noWrap >
                                    100/155
                                </Typography>
                                <Typography variant="body2" color="textSecondary" gutterBottom noWrap>
                                    Elected / Registered
                                </Typography>
                            </Grid>
                            <Grid item xs={6} className={classes.groupsData} >
                                <img src="/images/groups.svg" />
                                <Typography variant="body1" className={classes.infoData} noWrap>
                                    Groups
                                </Typography>
                                <Typography variant="h4" noWrap >
                                    67/68
                                </Typography>
                                <Typography variant="body2" color="textSecondary" gutterBottom className={classes.valueData} noWrap>
                                    Elected / Registered
                                </Typography>
                            </Grid>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
    </>
    );
}

export default ValidatorsGroups;
