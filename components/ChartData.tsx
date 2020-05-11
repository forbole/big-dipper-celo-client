import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles(({ spacing, palette }) => {
  return {
    root: {
        display: 'flex',
      },
    card: {
        display: 'block-inline',
        justifyContent: 'center',
        margin: '2%',
        borderLeft: 'thick solid #FBCC5C',
        borderRadius: 5,
        boxShadow: '0 2px 4px 0 rgba(138, 148, 159, 0.2)',
        '& > *:nth-child(1)': {
          marginRight: spacing(2),
        },
        '& > *:nth-child(2)': {
          flex: 'auto',
        },
        background: '#43484C',
        alignItems: 'center',
    },
    value: {
      margin: '0rem 0 0 0.3rem'
    },
    label: {
       margin: '1rem 0 0.5rem 0.3rem',
       display: 'inline',
    },
    container: {
      //margin: '0 0 1rem 0',
    }
    
  };
});


const ChartData = () => {
  const classes = useStyles();

  return (
    <div >
    <Grid container className={classes.container} >
    <Grid item xs={6} md={3} lg={2} >
    <Card className={cx(classes.card)} elevation={0}>
      <Typography variant="caption" className={classes.label} >
        cGLD Price
      </Typography>
      <Typography variant="h6" className={classes.value} >
        $2.8
      </Typography>
    </Card>
    </Grid>

    <Grid item xs={6} md={3} lg={2} >
    <Card className={cx(classes.card)} elevation={0} >
    <Typography variant="caption" className={classes.label} >
        Market Cap
      </Typography>
      <Typography variant="h6" className={classes.value} >
        $10,413,896
      </Typography>
    </Card>
    </Grid>

    <Grid item xs={6}  md={3} lg={2}  >
    <Card className={cx(classes.card)} elevation={0}>
    <Typography variant="caption" className={classes.label} >
        Average block time
      </Typography>
      <Typography variant="h6" className={classes.value} >
        5.6 seconds
      </Typography>
    </Card>
    </Grid>

    <Grid item xs={6} md={3} lg={2}  >
    <Card className={cx(classes.card)} elevation={0}>
    <Typography variant="caption" className={classes.label} >
        Total transactions
      </Typography>
      <Typography variant="h6" className={classes.value} >
        15,545
      </Typography>
    </Card>
    </Grid>
    
    <Grid item xs={6} md={3} lg={2} >
    <Card className={cx(classes.card)} elevation={0}  >
      <Typography variant="caption" className={classes.label} >
          Total blocks
      </Typography>
      <Typography variant="h6" className={classes.value} >
          1,074,922
      </Typography>

    </Card>
    </Grid>

    <Grid item xs={6} md={3} lg={2} >
    <Card className={cx(classes.card)} elevation={0} >
    <Typography variant="caption" className={classes.label} >
            Wallet addresses
      </Typography>
      <Typography variant="h6" className={classes.value} >
            2,737
      </Typography>
    </Card>
    </Grid>
    </Grid>
    </div>
  );
};

export default ChartData;