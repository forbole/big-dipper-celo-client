import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';




const useStyles = makeStyles((theme: Theme) =>
  createStyles({
        root: {
            padding: '0 0 1rem 0',
            display: 'inline-flex',
            borderRadius: 5,
            paddingBottom: '0',
            },

        card:{
        display: 'inline-flex',
        }
 

    }),
    );   

export default function AddressCard() {
    const classes = useStyles();

    return (
      <Card >
        <CardContent>
              <Grid container spacing={1} className={classes.card} >
                  <Grid item xs={10} sm={10} md={10}>
                  <Typography variant="body1" gutterBottom >
                           Address
                      </Typography>
                  </Grid>
                  <Grid item xs={1}  >
                      <Typography variant="body2" gutterBottom align="right">
                      <img src="/images/copy_icon.svg" />
                      </Typography>
                  </Grid>
                  <Grid item xs={1} >
                      <Typography variant="body2" gutterBottom align="center">
                      <img src="/images/qr_code.svg" />
                      </Typography>
                  </Grid>
                  <Grid item xs={12}>    
                      <Typography variant="body2" align="left">
                      0xB177242c85d34cc72e1cc0301eb6f08770ED8a6B
                      </Typography>
                  </Grid>
  
  
  
      </Grid>
        </CardContent>
      </Card>
  
  );
  }