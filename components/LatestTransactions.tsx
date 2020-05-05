import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '../components/Link';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import Chips from '../components/Chips';


const useStyles = makeStyles(({ spacing }) => {
    return {
    root: {
        padding: '0 0 1rem 0',
        display: 'inline-flex'
        },
        leftInline:{
        display: 'flex',
        overflow: 'auto',
        padding: '0 0 0 0.5rem',
        },
        rightInline:{
        display: 'flex',
        overflow: 'auto',
        padding: '0 1rem 0 0', 
        align: 'right' 
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
        marginLeft: '1rem',
        },
        containers: {
        display:'inline-block'
        },
        cardContent:{
        paddingLeft: '0rem',
        },
        card: {
        padding: '0 0.5rem',
        justifyContent: 'center',
        //margin: '1rem',
        background: '#43484C',
        alignItems: 'center',
        borderRadius: 5,           
        },
        divider:{
          margin: '0.5rem',
      },
      time:{
        paddingRight: '1rem',
        float: 'right',
      }
        }
});


export default function LatestTransactions() {
  const classes = useStyles();

  return (
    <span>
    <Grid container className={classes.root} xs={12} md={12} lg={5} >
      <Card className={classes.card}>
        <Grid container spacing={1} >
          <Grid item xs={12} >
          <Typography variant="body1" className={classes.box} >
              Latest Transactions
              <Link href="/transactions" className={classes.link} color="secondary">
    {'view more'}
  </Link>
        </Typography> 
                <Divider variant='middle' className={classes.divider} />
          </Grid>
          </Grid>

          <Grid container spacing={1} >
                <Grid item xs={9} md={10} >

                  <Typography  variant="caption" gutterBottom className={classes.leftInline}>
                  Tx#   <Link href="#" color="secondary"  className={classes.leftInline}>
                  {" 0xd3b4592hfhtre8w8sd"}
                 </Link>
                  </Typography>
                  </Grid>
                  <Grid item xs={3} md={2}>
                  <Typography variant="caption" gutterBottom  className={classes.time}>
                  1 min ago
                  </Typography>
                  </Grid>
  
                  <Grid item xs={5} md={4} >
                  <Typography variant="caption"  gutterBottom className={classes.leftInline}>
                     From  <Link href="#" color="secondary" className={classes.leftInline} >
                   {" 0xd3b4592hrsthrt"}
                 </Link>
                   </Typography>
                   </Grid>

                   <Grid item xs={7} md={8}>
                  <Typography variant="caption"  gutterBottom align='left' className={classes.rightInline}>
                     To  <Link href="#" color="secondary" className={classes.leftInline} >
                     {" 0xd3b4592hdsw12dftuytuytrutr6"}
                 </Link>
                   </Typography>
                   </Grid>



                   <Grid item xs={6} md={10} >
                   <Typography  variant="caption" gutterBottom className={classes.chip}>
                   <Chips value={'Token Transfer'}/>
                  </Typography>
  
                </Grid>
                   <Grid item xs={6} md={2}>
                  <Typography variant="caption" gutterBottom  className={classes.time} >
                    302.140759 cGLD
                  </Typography>
                </Grid>
          </Grid>
  
          <Divider variant='middle' className={classes.divider}/>

          <Grid container spacing={1} >
                <Grid item xs={9} md={6} >

                  <Typography  variant="caption" gutterBottom className={classes.leftInline}>
                  Tx#   <Link href="#" color="secondary"  className={classes.leftInline}>
                  {" 0xd3b4592hfhtre8w8sd"}
                 </Link>
                  </Typography>
                  </Grid>
                  <Grid item xs={3} md={6}>
                  <Typography variant="caption" gutterBottom className={classes.time} >
                  1 min ago
                  </Typography>
                  </Grid>
  
                  <Grid item xs={5} md={4}>
                  <Typography variant="caption"  gutterBottom className={classes.leftInline}>
                     From  <Link href="#" color="secondary" className={classes.leftInline} >
                   {" 0xd3b4592hrsthrt"}
                 </Link>
                   </Typography>
                   </Grid>

                   <Grid item xs={7} md={8}>
                  <Typography variant="caption"  gutterBottom align='left' className={classes.rightInline}>
                     To  <Link href="#" color="secondary" className={classes.leftInline} >
                     {" 0xd3b4592hdsw12dftuytuytrutr6"}
                 </Link>
                   </Typography>
                   </Grid>



                   <Grid item xs={6} md={6} >
                   <Typography  variant="caption" gutterBottom className={classes.chip}>
                   <Chips value={'Token Transfer'}/>
                  </Typography>
                </Grid>
                
                   <Grid item xs={6} md={6}>
                  <Typography variant="caption" gutterBottom  className={classes.time}>
                    302.140759 cGLD
                  </Typography>
                </Grid>
          </Grid>
  
          <Divider variant='middle' className={classes.divider} />

          <Grid container spacing={1} >
                <Grid item xs={9} md={6} >

                  <Typography  variant="caption" gutterBottom className={classes.leftInline}>
                  Tx#   <Link href="#" color="secondary"  className={classes.leftInline}>
                  {" 0xd3b4592hfhtre8w8sd"}
                 </Link>
                  </Typography>
                  </Grid>
                  <Grid item xs={3} md={6}>
                  <Typography variant="caption" gutterBottom className={classes.time} >
                  1 min ago
                  </Typography>
                  </Grid>
  
                  <Grid item xs={5} md={4}>
                  <Typography variant="caption"  gutterBottom className={classes.leftInline}>
                     From  <Link href="#" color="secondary" className={classes.leftInline} >
                   {" 0xd3b4592hrsthrt"}
                 </Link>
                   </Typography>
                   </Grid>

                   <Grid item xs={7} md={8}>
                  <Typography variant="caption"  gutterBottom align='left' className={classes.rightInline}>
                     To  <Link href="#" color="secondary" className={classes.leftInline} >
                     {" 0xd3b4592hdsw12dftuytuytrutr6"}
                 </Link>
                   </Typography>
                   </Grid>



                   <Grid item xs={6} md={6} >
                   <Typography  variant="caption" gutterBottom className={classes.chip}>
                   <Chips value={'Token Transfer'}/>
                  </Typography>
  
                </Grid>
                   <Grid item xs={6} md={6}>
                  <Typography variant="caption" gutterBottom className={classes.time} >
                    302.140759 cGLD
                  </Typography>
                </Grid>
          </Grid>


      </Card>
    </Grid>
    </span>
  );
}