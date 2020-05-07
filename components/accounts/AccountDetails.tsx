import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '../Link';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Layout from '../Layout';
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
      },
      alignRight:{
            float: 'right',
           // wordWrap: 'break-word',
            overflowWrap: 'anywhere',
    },
    alignLeft:{
        float: 'left',
    },


  }
});




export default function AccountDetails() {
const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
            <Grid container spacing={1} justify="center" className={classes.item}>
                <Grid item xs={12} >
                    <Typography  color="textSecondary" variant="subtitle1"  paragraph>
                        Account Details
                        <Divider variant='middle' className={classes.divider}/>
                    </Typography>
                </Grid>
                <Divider  />

                <Grid item xs={4} className={classes.item}>
                    <Typography variant="body2" className={classes.alignLeft}>
                        Moniker
                    </Typography>
                </Grid>
                <Grid item xs={8} className={classes.item} >
                    <Typography variant="body2" className={classes.alignRight} >
                       {"Michelle Clark"} 
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Divider variant='middle' className={classes.divider}/>
                </Grid>

                <Grid item xs={4} className={classes.item}>
                    <Typography variant="body2" className={classes.alignLeft}>
                        Metadata URL
                    </Typography>
                </Grid>
                <Grid item xs={8} className={classes.item} >
                    <Typography variant="body2" className={classes.alignRight}  >
                    <Link href="#"  color="secondary">{"https://storage.googleap..."}</Link>  
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Divider variant='middle' className={classes.divider}/>
                </Grid>

                <Grid item xs={4} className={classes.item}>
                    <Typography variant="body2" className={classes.alignLeft}>
                        Type
                    </Typography>
                </Grid>
                <Grid item xs={8} className={classes.item} >
                    <Typography variant="body2" className={classes.alignRight}  >
                       {"validator"} 
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Divider variant='middle' className={classes.divider}/>
                </Grid>

                <Grid item xs={6} className={classes.item}>
                    <Typography variant="body2" className={classes.alignLeft}>
                        Attestations Requested
                    </Typography>
                </Grid>
                <Grid item xs={6} className={classes.item} >
                    <Typography variant="body2" className={classes.alignRight}  >
                       {"15"} 
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Divider variant='middle' className={classes.divider}/>
                </Grid>

                <Grid item xs={6} className={classes.item}>
                    <Typography variant="body2" className={classes.alignLeft}>
                        Attestations Fulfilled
                    </Typography>
                </Grid>
                <Grid item xs={6} className={classes.item} >
                    <Typography variant="body2" className={classes.alignRight} >
                       {"12"} 
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Divider variant='middle' className={classes.divider}/>
                </Grid>

                <Grid item xs={5} className={classes.item}>
                    <Typography variant="body2" className={classes.alignLeft}>
                        Locked Gold
                    </Typography>
                </Grid>
                <Grid item xs={7} className={classes.item} >
                    <Typography variant="body2" className={classes.alignRight}  >
                       {"10,000 cGLD"} 
                    </Typography>
                    <Typography variant="body2" className={classes.alignRight}  >
                       {"10,000 non-voting cGLD"} 
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Divider variant='middle' className={classes.divider}/>
                </Grid>

                <Grid item xs={3} className={classes.item}>
                    <Typography variant="body2" className={classes.alignLeft}>
                        Score
                    </Typography>
                </Grid>
                <Grid item xs={9} className={classes.item} >
                    <Typography variant="body2" className={classes.alignRight} >
                       {"45.8994%"} 
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Divider variant='middle' className={classes.divider}/>
                </Grid>


                <Grid item xs={4} className={classes.item}>
                    <Typography variant="body2" className={classes.alignLeft}>
                        Affiliiation
                    </Typography>
                </Grid>
                <Grid item xs={8} className={classes.item} >
                    <Typography variant="body2" className={classes.alignRight}  >
                         <Link href="#"  color="secondary" >{"0xa5611567865ftre78fhfd5fd577rfcf75645fy"}</Link>  
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Divider variant='middle' className={classes.divider}/>
                </Grid>


                <Grid item xs={6} className={classes.item}>
                    <Typography variant="body2" className={classes.alignLeft}>
                        Validator Signer
                    </Typography>
                </Grid>
                <Grid item xs={6} className={classes.item} >
                    <Typography variant="body2" className={classes.alignRight} >
                       {"Michelle Clark"} 
                    </Typography>
                </Grid>

                <Grid item xs={12}>
                    <Divider variant='middle' className={classes.divider}/>
                </Grid>


                <Grid item xs={5} className={classes.item}>
                    <Typography variant="body2">
                        All Signers
                    </Typography>
                </Grid>
                <Grid item xs={7} className={classes.item} >
                    <Typography variant="body2" className={classes.alignRight}  >
                    <Link href="#"  color="secondary">{"0xa56443ff65ftre78fhfd5fd577rfcf75645fy"}</Link>  
                    </Typography>
                </Grid>

    </Grid>
      </CardContent>
    </Card>

);
}