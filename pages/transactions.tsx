import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '../components/Link';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import cx from 'clsx';
import Card from '@material-ui/core/Card';
import Layout from '../components/Layout';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import theme from '../themes/dark-theme';
import TablePagination from '@material-ui/core/TablePagination';
import Divider from '@material-ui/core/Divider';
import Chips from '../components/Chips';


  

const useStyles = makeStyles(({ spacing }) => {
    return {
    root: {
        padding: '0 0 1rem 0',
        display: 'block'
        },
        leftInline:{
        display: 'flex',
        overflow: 'auto',
        padding: '0 0 0 0.2rem',
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
        padding: '0.5rem',
        justifyContent: 'center',
        margin: '1rem',
        background: '#43484C',
        alignItems: 'center',
        borderRadius: 5,
            boxShadow: '0 2px 4px 0 rgba(138, 148, 159, 0.2)',
            '& > *:nth-child(1)': {
            marginRight: spacing(2),
            },
            '& > *:nth-child(2)': {
            flex: 'auto',
            },
            
        },
        divider:{
            margin: '0.5rem',
        }

        }
});


  

function DisplayCard() {
    const classes = useStyles();
    return (
    <Card className={cx(classes.card)} elevation={0}>
    <Grid container spacing={1} justify="center" >
    <Grid item xs={6}  >
      <Typography align='left' variant="body1" >cGLD Price</Typography>
      </Grid>
      <Grid item xs={6}  >
      <Typography align='right' variant="body1" >$2.8</Typography>
      </Grid>
      <Grid item xs={6}  className={classes.cardContent}>
      <Typography align='left' variant="body1" >Market Cap</Typography>
      </Grid>
      <Grid item xs={6}  className={classes.cardContent}>
      <Typography align='right' variant="body1" >$10,413,896</Typography>
      </Grid>
    </Grid>
    </Card>
    );
}


  export default function Transactions() {
    const classes = useStyles();
  
    return (
      <Layout >
        <Hidden smUp>
            <DisplayCard />
        </Hidden>
      <Grid container className={classes.root} xs={12}>
        <Card className={classes.card}>
          <Grid container spacing={1} >
            <Grid item xs={12}>
            <Typography variant="body1" className={classes.box} >
                Latest Transactions
          </Typography> 
                  <Divider variant='middle' className={classes.divider} />
            </Grid>
            </Grid>
  
            {/* 1st Transaction */}
            <Grid container spacing={1} >
                <Grid item xs={8} md={6} >

                  <Typography  variant="body2" gutterBottom className={classes.leftInline}>
                  Tx#   <Link href="#" color="secondary"  className={classes.leftInline}>
                  {" 0xd3b4592hfhtre8w8sd"}
                 </Link>
                  </Typography>
                  </Grid>
                  <Grid item xs={4} md={6}>
                  <Typography variant="body2" gutterBottom color="textSecondary" align='right'>
                  1 min ago
                  </Typography>
                  </Grid>
  
                  <Grid item xs={6} md={3}>
                  <Typography variant="body2"  gutterBottom className={classes.leftInline}>
                     From  <Link href="#" color="secondary" className={classes.leftInline} >
                   {" 0xd3b4592hrsthrt"}
                 </Link>
                   </Typography>
                   </Grid>

                   <Grid item xs={6} md={9}>
                  <Typography variant="body2"  gutterBottom align='left' className={classes.rightInline}>
                     To  <Link href="#" color="secondary" className={classes.leftInline} >
                     {" 0xd3b4592hdsw12dftuytuytrutr6"}
                 </Link>
                   </Typography>
                   </Grid>



                   <Grid item xs={6} md={6} >
                   <Typography  variant="body2" gutterBottom className={classes.chip}>
                   <Chips value={'Token Transfer'}/>
                  </Typography>
  
                </Grid>
                   <Grid item xs={6} md={6}>
                  <Typography variant="body2" gutterBottom color="textSecondary" align='right'>
                    302.140759 cGLD
                  </Typography>
                </Grid>
          </Grid>
  
          <Divider variant='middle' className={classes.divider}/>
  
              {/* 2nd Transaction */}
              <Grid container spacing={1} >
                <Grid item xs={8} md={6} >

                  <Typography  variant="body2" gutterBottom className={classes.leftInline}>
                  Tx#   <Link href="#" color="secondary"  className={classes.leftInline}>
                  {" 0xd3b4592hfhtre8w8sd"}
                 </Link>
                  </Typography>
                  </Grid>
                  <Grid item xs={4} md={6}>
                  <Typography variant="body2" gutterBottom color="textSecondary" align='right'>
                  1 min ago
                  </Typography>
                  </Grid>
  
                  <Grid item xs={6} md={3}>
                  <Typography variant="body2"  gutterBottom className={classes.leftInline}>
                     From  <Link href="#" color="secondary" className={classes.leftInline} >
                   {" 0xd3b4592hrsthrt"}
                 </Link>
                   </Typography>
                   </Grid>

                   <Grid item xs={6} md={9}>
                  <Typography variant="body2"  gutterBottom align='left' className={classes.rightInline}>
                     To  <Link href="#" color="secondary" className={classes.leftInline} >
                     {" 0xd3b4592hdsw12dftuytuytrutr6"}
                 </Link>
                   </Typography>
                   </Grid>



                   <Grid item xs={6} md={6} >
                   <Typography  variant="body2" gutterBottom className={classes.chip}>
                   <Chips value={'Contract Call'}/>
                  </Typography>
  
                </Grid>
                   <Grid item xs={6} md={6}>
                  <Typography variant="body2" gutterBottom color="textSecondary" align='right'>
                    302.140759 cGLD
                  </Typography>
                </Grid>
          </Grid>
  
        <Divider variant='middle' className={classes.divider}/>
          
          {/* 3rd Transaction */}
          <Grid container spacing={1} >
                <Grid item xs={8} md={6} >

                  <Typography  variant="body2" gutterBottom className={classes.leftInline}>
                  Tx#   <Link href="#" color="secondary"  className={classes.leftInline}>
                  {" 0xd3b4592hfhtre8w8sd"}
                 </Link>
                  </Typography>
                  </Grid>
                  <Grid item xs={4} md={6}>
                  <Typography variant="body2" gutterBottom color="textSecondary" align='right'>
                  1 min ago
                  </Typography>
                  </Grid>
  
                  <Grid item xs={6} md={3}>
                  <Typography variant="body2"  gutterBottom className={classes.leftInline}>
                     From  <Link href="#" color="secondary" className={classes.leftInline} >
                   {" 0xd3b4592hrsthrt"}
                 </Link>
                   </Typography>
                   </Grid>

                   <Grid item xs={6} md={9}>
                  <Typography variant="body2"  gutterBottom align='left' className={classes.rightInline}>
                     To  <Link href="#" color="secondary" className={classes.leftInline} >
                     {" 0xd3b4592hdsw12dftuytuytrutr6"}
                 </Link>
                   </Typography>
                   </Grid>



                   <Grid item xs={6} md={6} >
                   <Typography  variant="body2" gutterBottom className={classes.chip}>
                   <Chips value={'Token Transfer'}/>
                  </Typography>
  
                </Grid>
                   <Grid item xs={6} md={6}>
                  <Typography variant="body2" gutterBottom color="textSecondary" align='right'>
                    302.140759 cGLD
                  </Typography>
                </Grid>
          </Grid>
          <Divider variant='middle' className={classes.divider}/>
          
          {/* 4th Transaction */}
          <Grid container spacing={1} >
                <Grid item xs={8} md={6} >

                  <Typography  variant="body2" gutterBottom className={classes.leftInline}>
                  Tx#   <Link href="#" color="secondary"  className={classes.leftInline}>
                  {" 0xd3b4592hfhtre8w8sd"}
                 </Link>
                  </Typography>
                  </Grid>
                  <Grid item xs={4} md={6}>
                  <Typography variant="body2" gutterBottom color="textSecondary" align='right'>
                  1 min ago
                  </Typography>
                  </Grid>
  
                  <Grid item xs={6} md={3}>
                  <Typography variant="body2"  gutterBottom className={classes.leftInline}>
                     From  <Link href="#" color="secondary" className={classes.leftInline} >
                   {" 0xd3b4592hrsthrt"}
                 </Link>
                   </Typography>
                   </Grid>

                   <Grid item xs={6} md={9}>
                  <Typography variant="body2"  gutterBottom align='left' className={classes.rightInline}>
                     To  <Link href="#" color="secondary" className={classes.leftInline} >
                     {" 0xd3b4592hdsw12dftuytuytrutr6"}
                 </Link>
                   </Typography>
                   </Grid>



                   <Grid item xs={6} md={6} >
                   <Typography  variant="body2" gutterBottom className={classes.chip}>
                   <Chips value={'Token Transfer'}/>
                  </Typography>
  
                </Grid>
                   <Grid item xs={6} md={6}>
                  <Typography variant="body2" gutterBottom color="textSecondary" align='right'>
                    302.140759 cGLD
                  </Typography>
                </Grid>
          </Grid>
  
        </Card>
      </Grid>
      </Layout>
    );
  }
