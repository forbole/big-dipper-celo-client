import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import Link from '../Link';




const useStyles = makeStyles((theme: Theme) =>
  createStyles({
        root: {
            paddingBottom: '0.5rem',
            },

        alignLeft:{
            display: 'flex',
            overflow: 'auto',
            padding: '0 0 0 1rem',
        },

        alignRight:{
            display: 'inline-block',
            float: 'right',
            paddingRight: '1rem',
        },
 
        box:{
            letterSpacing: '1px',
            padding: '1rem',
            display: 'block',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            },       
 
        contract:{
            //overflowWrap: 'break-word',
            wordWrap: 'anywhere',
            display: 'inline-block',
            float: 'right',
        }

    }),
    );   



export default function ProfileSummary(){
    const classes = useStyles();

    return(
      <Card className={classes.root}>
        <Grid container spacing={1} >
          <Grid item xs={12} >
          <Typography variant="body2" className={classes.box} >
              Profile Summary
        </Typography> 
                <Divider variant='middle'  />
          </Grid>

                <Grid item xs={3}  >

                  <Typography  variant="caption" gutterBottom className={classes.alignLeft}>
                  Contract   
                  </Typography>
                  </Grid>
                  <Grid item xs={9}  >
                  <Typography variant="caption" gutterBottom  className={classes.alignRight}>
                  <Link href="/" color="secondary" className={classes.contract} >
                  {"0xa561131a1c8ac25925fb848bca45a74af61e5a38"} </Link>
                  </Typography>
                  </Grid>

                    <Grid item xs={12}>
                    <Divider variant='middle'  />
                    </Grid>

                  <Grid item xs={7}  >
                  <Typography variant="caption"  gutterBottom className={classes.alignLeft}>
                    Decimals
                   </Typography>
                   </Grid>
                  
                   <Grid item xs={5} >
                  <Typography variant="caption" gutterBottom  className={classes.alignRight}>
                        {"$2,110,316.72"}
                  </Typography> 
                  </Grid>


                
          </Grid>
          

      </Card>
    );
}


