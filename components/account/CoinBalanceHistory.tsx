import React, { PureComponent } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
} from 'recharts';
import { curveCardinal } from 'd3-shape';
import Typography from "@material-ui/core/Typography";
import Link from "../Link";
import {
  makeStyles, withStyles
} from "@material-ui/core/styles";
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';

const dataY = [{ value: 2000000 }, { value: 4000000 }, { value: 6000000 }, { value: 80000000 }, { value: 6000000 }, { value: 120000000}];
const data = [
  {
    name: 'Apr 10', cGLD: 2500000, 
  },
  {
    name: 'Apr 11', cGLD: 6000000, 
  },
  {
    name: 'Apr 12', cGLD: 9800000, 
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
  };
});


export default function CoinBalanceHistory() {
  const classes = useStyles();

  return (
    <ExpansionPanel>
      <ExpansionPanelSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="coin-balance-history"
        id="coin-balance-history"
      >
        <Typography variant="body1">Coin Balance History</Typography>
      </ExpansionPanelSummary>
      <ExpansionPanelDetails className={classes.root}>
      <Grid container >
        <AreaChart
          width={350}
          height={250}
          data={data}
          margin={{
            top: 10, right: 0, left: 0, bottom: 0,
          }}
          
          //baseValue={1000000}
        >
            <CartesianGrid strokeDasharray="3 3" strokeWidth={1} opacity={0.3}/>
            <XAxis dataKey="name" />
            <YAxis tickSize={0.5} />
          <Tooltip />
            {/* <Area type="monotone" dataKey="cGLD" stroke="#8884d8" fill="rgba(58, 211, 158, 0.15)" fillOpacity={1} /> */}
            <Area type={cardinal} dataKey="cGLD" stroke="rgba(58, 211, 158, 1)" fill="rgba(58, 211, 158, 0.15)" fillOpacity={1} />
        </AreaChart>
      </Grid>
    </ExpansionPanelDetails>
    </ExpansionPanel> 
    );

}