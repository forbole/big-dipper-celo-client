import React, { PureComponent } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { curveCardinal } from 'd3-shape';
import Typography from "@material-ui/core/Typography";
import Link from "../Link";
import {
  makeStyles, withStyles
} from "@material-ui/core/styles";
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';

const dataY = [{ value: 2000000 }, { value: 4000000 }, { value: 6000000 }, { value: 80000000 }, { value: 6000000 }, { value: 120000000 }];
const data = [
  {
    name: 'Apr 10', cGLD: 2500000,
  },
  {
    name: 'Apr 11', cGLD: 6000000,
  },
  {
    name: 'Apr 12', cGLD: 5400000,
  },
  {
    name: 'Apr 13', cGLD: 4000000,
  },
  {
    name: 'Apr 14', cGLD: 6200000,
  },
  {
    name: 'Apr 15', cGLD: 7800000,
  },
];

const cardinal = curveCardinal.tension(1);

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
    }
  };
});


const CoinBalanceHistory = () => {
  const classes = useStyles();

  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="coinBalanceHistoryPanel"
        id="coinBalanceHistoryPanel"
      >
        <Typography variant="body1">Coin Balance History</Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.root}>
        <Grid container className={classes.container} >
          <Grid item xs={12} lg={10} >
            {/* <div style={{ width: '50%', height: '35%' }}> */}
            <ResponsiveContainer width='95%' aspect={1.0 / 0.7}>
              <AreaChart
                // width={350}
                // height={250}
                data={data}
                margin={{
                  top: 0, right: 0, left: 0, bottom: 0,
                }}

              >
                <CartesianGrid strokeDasharray="3 3" strokeWidth={1} opacity={0.3} />
                <XAxis dataKey="name" tick={{ stroke: "rgba(255, 255, 255, 0.6)", fontSize: 10, fontWeight: 150 }} />
                <YAxis tickSize={0} tickMargin={10} tick={{ stroke: "rgba(255, 255, 255, 0.6)", fontSize: 10, fontWeight: 150 }} />
                <Tooltip />
                {/* <Area type="monotone" dataKey="cGLD" stroke="#8884d8" fill="rgba(58, 211, 158, 0.15)" fillOpacity={1} /> */}
                <Area type={cardinal} dataKey="cGLD" stroke="rgba(58, 211, 158, 1)" fill="rgba(58, 211, 158, 0.15)" fillOpacity={1} />
              </AreaChart>
            </ResponsiveContainer>
            {/* </div> */}
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion >
  );

}

export default CoinBalanceHistory