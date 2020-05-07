import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '../components/Link';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Layout from '../components/Layout';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';


const useStyles = makeStyles(({ spacing }) => {
    return {
      root: {
          width: '100%',
          padding: '0.5rem',
          borderRadius: 5,
          wordWrap: 'break-word',
          
      },
      item:{
          padding: '0 0 1rem 0.5rem',
      },
      divider:{
          margin: '0.5rem 0 0 0',
      },
      arrowIcon:{
          padding: '0.25rem',
          justifyContent: 'center',
          border: 'solid rgba(67, 72, 76, 1) ',
          borderRadius: 5,
          backgroundColor: 'rgba(77, 81, 85, 1)',
          color: 'rgba(255, 255, 255, 0.6)',
          height: '1.5rem',
          width: '1.5rem'
      },
      iconButton:{
        padding: '0',
      }
  }
});




export default function BlockDetails() {
const classes = useStyles();

  return (
    <Layout>
    <Card className={classes.root}>
      <CardContent>
            <Grid container spacing={1} justify="center" className={classes.item}>
                <Grid item xs={10} >
                    <Typography  color="textSecondary" variant="subtitle1"  paragraph>
                        Block #1087144
                    </Typography>
                </Grid>

                <Grid item xs={1}  >
                    <IconButton  aria-label="Previous Block" className={classes.iconButton}>
                <ArrowBackIosIcon className={classes.arrowIcon}/>
                  </IconButton>
                </Grid>

                <Grid item xs={1} >
                <IconButton aria-label="Next Block" className={classes.iconButton} >
                <ArrowForwardIosIcon className={classes.arrowIcon}/>
                  </IconButton>
                </Grid>

                <Grid item xs={12}>
                <Divider  />
                </Grid>
                <Grid item xs={12} className={classes.item}>
                    <Typography variant="caption" component="h2">
                        Time
                    </Typography>
                    <Typography variant="caption" >
                        April-09-2020 11:22:08 UTC (14 seconds ago)
                    </Typography>
                   <Divider variant='middle' className={classes.divider}/>
                </Grid>
                <Grid item xs={12} className={classes.item}>
                    <Typography variant="caption" component="h2">
                        Transactions
                    </Typography>
                    <Typography variant="caption" component="h2">
                    7
                    </Typography>
                    <Divider variant='middle' className={classes.divider}/>
                </Grid>

                <Grid item xs={12} className={classes.item}>
                    <Typography variant="caption" component="h2">
                        Speed
                    </Typography>
                    <Typography variant="caption" component="h2">
                        793 bytes
                    </Typography>
                    <Divider variant='middle' className={classes.divider}/>
                </Grid>

                <Grid item xs={12} className={classes.item}>
                    <Typography variant="caption" component="h2">
                        Miner
                    </Typography>
                    <Typography variant="caption" component="h2">
                       <Link href="#"  color="secondary">Michelle Clark</Link> 
                    </Typography>
                    <Divider variant='middle' className={classes.divider}/>
                </Grid>

                <Grid item xs={12} className={classes.item} >
                    <Typography variant="caption" component="h2">
                        Hash
                    </Typography>
                    <Typography variant="caption" component="h2">
                        E2D55BA9A99F150AE6E1D0457B6416C4C68915E1CB26320318A1421491C17032
                    </Typography>
                    <Divider variant='middle' className={classes.divider}/>
                </Grid>

                <Grid item xs={12} className={classes.item}>
                    <Typography variant="caption" component="h2">
                        Parent Hash
                    </Typography>
                    <Typography variant="caption" component="h2">
                      <Link href="#"  color="secondary">E2D55BA9A99F150AE6E1D0457B6416C4C68915E1CB26320318A1421491C17032</Link>  
                    </Typography>
                    <Divider variant='middle' className={classes.divider}/>
                </Grid>

                <Grid item xs={12} className={classes.item}>
                <Typography variant="caption" component="h2">
                    Difficulty
                </Typography>
                <Typography variant="caption" component="h2">
                    1
                </Typography>
                <Divider variant='middle' className={classes.divider}/>
                </Grid>

                <Grid item xs={12} className={classes.item}>
                <Typography variant="caption" component="h2">
                    Total Difficulty
                </Typography>
                <Typography variant="caption" component="h2">
                    1,101,248
                </Typography>
                <Divider variant='middle' className={classes.divider}/>
                </Grid>

                <Grid item xs={12} className={classes.item}>
                <Typography variant="caption" component="h2">
                    Nonce
                </Typography>
                <Typography variant="caption" component="h2">
                    0x00000000000000000
                </Typography>
                <Divider variant='middle' className={classes.divider}/>
                </Grid>

                <Grid item xs={12} className={classes.item}>
                <Typography variant="caption" component="h2">
                    Gas Used
                </Typography>
                <Typography variant="caption" component="h2">
                    19,186.000 (99.93%)
                </Typography>
                <Divider variant='middle' className={classes.divider}/>
                </Grid>

                <Grid item xs={12} className={classes.item}>
                    <Typography variant="caption" component="h2">
                        Gas Limit
                    </Typography>
                    <Typography variant="caption" component="h2">
                    20,000.000
                    </Typography>
                    <Divider variant='middle' className={classes.divider}/>
                </Grid>

    </Grid>
      </CardContent>
    </Card>
    </Layout>

);
}