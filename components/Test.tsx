import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '../components/Link';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import Chips from '../components/Chips';






const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 2,
      margin: '1rem 0 0rem 0',
    },
    card: {
      margin: 'auto',
        borderRadius: 5,
        boxShadow: '0 2px 4px 0 rgba(138, 148, 159, 0.2)',
        '& > *:nth-child(1)': {
          marginRight: 5,
        },
        '& > *:nth-child(2)': {
          flex: 'auto',
        },
        overflow: 'hidden',
      },
    leftInline:{
      display: 'block',
      overflow: 'auto',
      padding: '0 0 0 1rem',
    },
    rightInline:{
      display: 'block',
      overflow: 'auto',
      padding: '0 1rem 0 0',
    },
    link:{
      float: 'right',
      textAlign: 'right',
    },
    box:{
      letterSpacing: '1px',
      padding: '1rem',
      display: 'block',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },
    chip:{
      display: 'block',
      // overflow: 'auto',
      //align: 'left',
      //padding: '0 3rem 0 0',
    }
  }),
);


export default function LatestTransactions() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
          <Typography variant="body1" className={classes.box} >
              Latest Transactions
       <Link href="/transactions" className={classes.link} color="secondary">
             {'view more'}
        </Link>
        </Typography> 
                <Divider variant='middle'/>
          </Grid>
          </Grid>
          
          <Grid container spacing={1}>
         
          <Grid item xs={6} container direction="column" >
              <Grid item xs={12}  >
                <Typography  variant="body2" gutterBottom className={classes.leftInline}>
                Tx#   <Link href="#" color="secondary" >
                {" 0xd3b4592hfhtr"}
               </Link>
                </Typography>
                <Typography variant="body2"  gutterBottom className={classes.leftInline}>
                   From  <Link href="#" color="secondary" >
                 {" 0xd3b4592hrsthrt"}
               </Link>
                 </Typography>
                 <Typography  variant="body2" gutterBottom className={classes.chip}>
                 <Chips value={'Contract Call'}/>
                </Typography>

              </Grid>
            </Grid>

            <Grid item xs={6} container direction="column" >
              <Grid item xs={12} >
                <Typography variant="body2" gutterBottom align='right' className={classes.rightInline}>
                1 min ago
                </Typography>
                <Typography variant="body2" gutterBottom align='left' className={classes.rightInline}>
                   To   <Link href="#" color="secondary" >
                 {" 0xd3b4592h"}
               </Link>
                 </Typography>
                <Typography variant="body2" gutterBottom color="textSecondary" align='right' className={classes.rightInline}>
                  302.140759 cGLD
                </Typography>
              </Grid>
        </Grid>
        </Grid>
      </Card>
    </div>
  );
}