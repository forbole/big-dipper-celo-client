import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import Slider from '@material-ui/core/Slider';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';



const useStyles = makeStyles(({ spacing, palette }) => {
  const family =
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
  return {
    root: {
        display: 'flex',
      },
    card: {
    display: 'block-inline',
    justifyContent: 'center',
      //padding: 10,
      //  minWidth: 170,
      //  maxWidth: 200,
       margin: '2%',
      //  paddingLeft: '2%',
      //  backr: '#fff',
      borderLeft: 'thick solid #FBCC5C',
     

      // height: 60,
      // width: 173,
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
    heading: {
      fontFamily: family,
      fontSize: 25,
      marginBottom: 2,
      marginTop: 0,
      marginLeft: '15px',
    },
    subheader: {
      fontFamily: family,
      fontSize: 13,
      letterSpacing: '1px',
      marginBottom: 1,
      marginTop: 2,
      marginLeft: '15px',
    },
    
  };
});


const KanbanCard = () => {
  const styles = useStyles();

  return (
    <div className="chart-card mb-r "  >
    <Grid container spacing={1} style={{ marginTop: 10, marginBottom: 10}} >
    <Grid item xs={6} sm={6} md={3} lg={2} xl={2}>
    <Card className={cx(styles.card)} elevation={0}>
      <Box >
      <div className={styles.subheader}>cGLD Price</div>
        <div className={styles.heading}>$2.8</div>
      </Box>
    </Card>
    </Grid>
    <Grid item xs={6} md={3} lg={2} >
    <Card className={cx(styles.card)} elevation={0} >
      <Box>
      <div className={styles.subheader}>Market Cap</div>
        <div className={styles.heading}>$10,413,896</div>
      </Box>
    </Card>
    </Grid>
    <Grid item xs={6}  md={3} lg={2}  >
    <Card className={cx(styles.card)} elevation={0}>
      <Box>
      <div className={styles.subheader}>Average block time</div>
        <div className={styles.heading}>5.6 seconds</div>
      </Box>
    </Card>
    </Grid>
    <Grid item xs={6} md={3} lg={2}  >
    <Card className={cx(styles.card)} elevation={0}>
      <Box >
      <div className={styles.subheader}>Total transactions</div>
        <div className={styles.heading}>15,545</div>
      </Box>
    </Card>
    </Grid>
    
    <Grid item xs={6} md={3} lg={2} >
    <Card className={cx(styles.card)} elevation={0}  >
      <Box>
      <div className={styles.subheader}>Total blocks</div>
        <div className={styles.heading}>1,074,922</div>
      </Box>
    </Card>
    </Grid>

    <Grid item xs={6} md={3} lg={2} >
    <Card className={cx(styles.card)} elevation={0} >
      <Box>
      <div className={styles.subheader}>Wallet addresses</div>
        <div className={styles.heading}>2,737</div>
        {/* <Box display={'flex'} alignItems={'center'}>
        </Box> */}
      </Box>
    </Card>
    </Grid>

    </Grid>
    </div>
  );
};

export default KanbanCard;