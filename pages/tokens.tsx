import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '../components/Link';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import Layout from '../components/Layout';
import Overview from '../components/tokens/Overview';
import ProfileSummary from '../components/tokens/ProfileSummary';




const useStyles = makeStyles((theme: Theme) =>
  createStyles({
        root: {
            display: 'block-inline',
            justifyContent: 'center',
            },

        leftInline:{
            display: 'flex',
            overflow: 'auto',
            padding: '0 0 0 1rem',
        },

        bottomPadding:{
            overflow: 'auto',
            padding: '1%'
        },

        
        formControl: {
            minWidth: theme.spacing(26),
            padding:'0 1rem 0 0',
            marginBottom: theme.spacing(3),
            float: 'right',
            maxHeight: theme.spacing(4),
            marginTop: theme.spacing(-1.5)
          },


        select:{
            align: 'center',
            justifyContent: 'center',
            fontSize: '15px',
            padding: '-20px',
            border: 'solid rgba(255, 255, 255, 0.6) ',
            borderWidth: '0.09rem',
            borderRadius: 5,
          
          
        },

        inputLabel:{
          fontSize: '15px',
          paddingLeft: '1rem',
      },

        alignLeft:{
            display: 'flex',
            overflow: 'auto',
            padding: '0 0 0 1rem',
        },

        alignRight:{
            display: 'inline-block',
            float: 'right',
            paddingRight: '1rem'
        },

        button:{
          justifyContent: 'center',
          minWidth: '8rem',
          marginBottom: '1rem',
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

        divider:{
            margin: '0.5rem',
        },

        
 

    }),
    );   






export default function Tokens() {
  const classes = useStyles();

  return (
    <Layout >
        <Grid container className={classes.root} xs={12}  >
          
            <Grid item xs={12} lg={5} className={classes.bottomPadding}>
                <Overview />
            </Grid>
           
            <Grid item xs={12} lg={5} className={classes.bottomPadding}>
                <ProfileSummary />
            </Grid>
            
            <Grid item xs={12} lg={5} className={classes.bottomPadding}>
               
            </Grid>

    </Grid>
    </Layout>
  );
}