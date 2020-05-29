import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '../components/Link';
import {  makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import cx from 'clsx';
import Card from '@material-ui/core/Card';



const useStyles = makeStyles(({ spacing }) => {
    return {
  inline:{
    //marginRight: '0rem',
  },
  card: {
    display: 'flex',
    padding: '0.3rem',
    justifyContent: 'center',
    borderLeft: 'thick solid #FBCC5C',
    background: '#43484C',
    borderRadius: 5,
      boxShadow: '0 2px 4px 0 rgba(138, 148, 159, 0.2)',
          
    },
  }
});




export default function PriceCard() {
    const classes = useStyles();
    return (
    <Card className={cx(classes.card)} elevation={0}>
    <Grid container  >
    <Grid item xs={3} md={6} >
      <Typography align='left' variant="caption" >cGLD Price</Typography>
      </Grid>
      <Grid item xs={1} md={4} >
      <Typography align='right' variant="caption" style={{ marginRight: '-3rem'}} >$2.8</Typography>
      </Grid>
      <Grid item xs={3}  md={6} className={classes.inline}>
      <Typography align='left' variant="caption" >Market Cap</Typography>
      </Grid>
      <Grid item xs={2} md={4} className={classes.inline} style={{ marginRight: '-3rem'}}>
      <Typography align='right' variant="caption" >$10,413,896</Typography>
      </Grid>
    </Grid>
    </Card>
    );
}