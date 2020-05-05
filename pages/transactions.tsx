import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '../components/Link';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import Chips from '../components/Chips';
import Layout from '../components/Layout';
import Hidden from '@material-ui/core/Hidden';
import cx from 'clsx';

const useStyles = makeStyles(({ spacing }) => {
    return {
    root: {
        padding: '0 0 1rem 0',
        display: 'block'
        },
        leftInline:{
        display: 'flex',
        overflow: 'auto',
        padding: '0 1rem 0 1rem',
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
        padding: '0 0 0.5rem 0',
        },
        containers: {
        display:'inline-block'
        },
        card: {
        padding: '0 0.5rem',
        justifyContent: 'center',
        margin: '1rem',
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
      },
      displayCard: {
        padding: '1rem',
        justifyContent: 'center',
        margin: '1rem',
        background: '#43484C',
        alignItems: 'center',
        borderRadius: 5,  
      }
        }
});




function DisplayCard() {
  const classes = useStyles();
  return (
  <Card className={cx(classes.displayCard)} elevation={0}>
  <Grid container spacing={1} justify="center" >
  <Grid item xs={6}  >
    <Typography align='left' variant="body1" >cGLD Price</Typography>
    </Grid>
    <Grid item xs={6}  >
    <Typography align='right' variant="body1" >$2.8</Typography>
    </Grid>
    <Grid item xs={6}  >
    <Typography align='left' variant="body1" >Market Cap</Typography>
    </Grid>
    <Grid item xs={6} >
    <Typography align='right' variant="body1" >$10,413,896</Typography>
    </Grid>
  </Grid>
  </Card>
  );
}

export default function LatestTransactions() {
  const classes = useStyles();

  return (
    <Layout >
    <Hidden smUp>
        <DisplayCard />
    </Hidden>
    <Grid container className={classes.root} xs={12}  >
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

                  <Typography  variant="caption"  className={classes.leftInline}>
                  Tx#   <Link href="#" color="secondary"  className={classes.leftInline}>
                  {" 0xd3b4592hfhtre8w8sd"}
                 </Link>
                  </Typography>
                  </Grid>
                  <Grid item xs={3} md={2}>
                  <Typography variant="caption"   className={classes.time}>
                  1 min ago
                  </Typography>
                  </Grid>
  
                  <Grid item xs={5} md={4} >
                  <Typography variant="caption"   className={classes.leftInline}>
                     From  <Link href="#" color="secondary" className={classes.leftInline} >
                   {" 0xd3b4592hrsthrt"}
                 </Link>
                   </Typography>
                   </Grid>

                   <Grid item xs={7} md={8}>
                  <Typography variant="caption"   align='left' className={classes.rightInline}>
                     To  <Link href="#" color="secondary" className={classes.leftInline} >
                     {" 0xd3b4592hdsw12dftuytuytrutr6"}
                 </Link>
                   </Typography>
                   </Grid>



                   <Grid item xs={6} md={10} >
                   <Typography  variant="caption"  className={classes.chip}>
                   <Chips value={'Token Transfer'}/>
                  </Typography>
  
                </Grid>
                   <Grid item xs={6} md={2}>
                  <Typography variant="caption"   className={classes.time} >
                    302.140759 cGLD
                  </Typography>
                </Grid>
          </Grid>
  
          <Divider variant='middle' className={classes.divider}/>

          <Grid container spacing={1} >
                <Grid item xs={9} md={6} >

                  <Typography  variant="caption"  className={classes.leftInline}>
                  Tx#   <Link href="#" color="secondary"  className={classes.leftInline}>
                  {" 0xd3b4592hfhtre8w8sd"}
                 </Link>
                  </Typography>
                  </Grid>
                  <Grid item xs={3} md={6}>
                  <Typography variant="caption"  className={classes.time} >
                  1 min ago
                  </Typography>
                  </Grid>
  
                  <Grid item xs={5} md={4}>
                  <Typography variant="caption"   className={classes.leftInline}>
                     From  <Link href="#" color="secondary" className={classes.leftInline} >
                   {" 0xd3b4592hrsthrt"}
                 </Link>
                   </Typography>
                   </Grid>

                   <Grid item xs={7} md={8}>
                  <Typography variant="caption"   align='left' className={classes.rightInline}>
                     To  <Link href="#" color="secondary" className={classes.leftInline} >
                     {" 0xd3b4592hdsw12dftuytuytrutr6"}
                 </Link>
                   </Typography>
                   </Grid>



                   <Grid item xs={6} md={6} >
                   <Typography  variant="caption"  className={classes.chip}>
                   <Chips value={'Token Transfer'}/>
                  </Typography>
                </Grid>
                
                   <Grid item xs={6} md={6}>
                  <Typography variant="caption"   className={classes.time}>
                    302.140759 cGLD
                  </Typography>
                </Grid>
          </Grid>
  
          <Divider variant='middle' className={classes.divider} />

          <Grid container spacing={1} >
                <Grid item xs={9} md={6} >

                  <Typography  variant="caption"  className={classes.leftInline}>
                  Tx#   <Link href="#" color="secondary"  className={classes.leftInline}>
                  {" 0xd3b4592hfhtre8w8sd"}
                 </Link>
                  </Typography>
                  </Grid>
                  <Grid item xs={3} md={6}>
                  <Typography variant="caption"  className={classes.time} >
                  1 min ago
                  </Typography>
                  </Grid>
  
                  <Grid item xs={5} md={4}>
                  <Typography variant="caption"   className={classes.leftInline}>
                     From  <Link href="#" color="secondary" className={classes.leftInline} >
                   {" 0xd3b4592hrsthrt"}
                 </Link>
                   </Typography>
                   </Grid>

                   <Grid item xs={7} md={8}>
                  <Typography variant="caption"   align='left' className={classes.rightInline}>
                     To  <Link href="#" color="secondary" className={classes.leftInline} >
                     {" 0xd3b4592hdsw12dftuytuytrutr6"}
                 </Link>
                   </Typography>
                   </Grid>



                   <Grid item xs={6} md={6} >
                   <Typography  variant="caption"  className={classes.chip}>
                   <Chips value={'Token Transfer'}/>
                  </Typography>
  
                </Grid>
                   <Grid item xs={6} md={6}>
                  <Typography variant="caption"  className={classes.time} >
                    302.140759 cGLD
                  </Typography>
                </Grid>
          </Grid>


      </Card>
    </Grid>
    </Layout>
  );
}