import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '../components/Link';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import Transactions from '../components/Transactions';
import Layout from '../components/Layout';
import Hidden from '@material-ui/core/Hidden';
import cx from 'clsx';
import CardContent from '@material-ui/core/CardContent';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import Container from '@material-ui/core/Container';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Avatar from '@material-ui/core/Avatar';
import ListSubheader from '@material-ui/core/ListSubheader';
import Button from '@material-ui/core/Button';
import Chips from '../components/Chips';
import AccountTransactions from '../components/accounts/AccountTransactions';



const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
        padding: '0 0 1rem 0',
        display: 'inline-flex',
        // justifyContent: 'center',
        // margin: '1rem',
        // background: '#43484C',
        // alignItems: 'center',
        borderRadius: 5,
        //padding: '0.5rem',
        paddingBottom: '0',  
       
        },
        // card:{
        //     display: 'inline-flex',
        //     // justifyContent: 'center',
        //     // margin: '1rem',
        //     // background: '#43484C',
        //     // alignItems: 'center',
        //     borderRadius: 5,
        //     //padding: '0.5rem',
        //     paddingBottom: '0', 
        // },
        leftInline:{
        display: 'flex',
        overflow: 'auto',
        padding: '0 0 0 1rem',
        },
        rightInline:{
        display: 'flex',
        overflow: 'auto',
        padding: '0 1rem 0 0', 
        align: 'right' 
        },

        bottomPadding:{
            paddingBottom: '1rem'
        },


        formControl: {
            minWidth: theme.spacing(25),
            padding:'0',
            marginBottom: theme.spacing(2),
            //paddingTop: '0rem',
          },
        
        dropdown:{
            display: 'block',
            padding: '0'
        },

        alignLeft:{
            display: 'inline-grid',
            marginBottom: '1rem',
            paddingLeft: '3rem'
        },
        alignRight:{
            display: 'inline-grid',
            marginBottom: '1rem',
            //paddingRight: '2rem'
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
            justifyContent: 'center',
            background: '#43484C',
            alignItems: 'center',
            borderRadius: 5,           
            },
            divider:{
              margin: '0.5rem',
          },
         

    }),
    );   




function AddressCard() {
  const classes = useStyles();
  return (
    <Card >
      <CardContent>
            <Grid container spacing={1} className={classes.card} >
                <Grid item xs={10} sm={10} md={10}>
                <Typography variant="body2" gutterBottom >
                         Address
                    </Typography>
                </Grid>
                <Grid item xs={1} md={1} >
                    <Typography variant="body2" gutterBottom align="right">
                    <img src="/images/copy_icon.svg" />
                    </Typography>
                </Grid>
                <Grid item xs={1} md={1}>
                    <Typography variant="body2" gutterBottom align="right">
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




function AccountOverview(){
    const classes = useStyles();


    return(
        <span>
    <Grid container className={classes.root} xs={12} md={12} lg={5} >
      <Card className={classes.card}>
        <Grid container spacing={1} >
          <Grid item xs={12} >
          <Typography variant="body1" className={classes.box} >
              Overview
        </Typography> 
                <Divider variant='middle' className={classes.divider} />
          </Grid>
          </Grid>

          <Grid container spacing={1} >
                <Grid item xs={6} md={10} >

                  <Typography  variant="body2" gutterBottom className={classes.leftInline}>
                  Moniker   
                  </Typography>
                  </Grid>
                  <Grid item xs={6} md={2}>
                  <Typography variant="body2" gutterBottom  className={classes.alignRight}>
                  {"Michelle Clark"}
                  </Typography>
                  </Grid>

                    <Grid item xs={12}>
                    <Divider variant='middle'  />
                    </Grid>

                  <Grid item xs={6} md={4} >
                  <Typography variant="body2"  gutterBottom className={classes.leftInline}>
                     Balance
                   </Typography>
                   </Grid>
                  
                   <Grid item xs={6} md={2}>
                  <Typography variant="body2" gutterBottom  className={classes.alignRight}>
                        {"14.9125447 cGLD"}
                  </Typography>
                  <Typography variant="caption" gutterBottom  className={classes.alignRight}>
                        {"$41.978089412"}
                  </Typography>    
                  </Grid>

                    <Grid item xs={12}>
                    <Divider variant='middle'  />
                    </Grid>

                   <Grid item xs={3} md={10} >
                   <Typography  variant="body2" gutterBottom className={classes.chip}>
                   Tokens
                  </Typography>
                </Grid>

                   <Grid item xs={9} md={2} >
             
      <FormControl className={classes.formControl} >
    <InputLabel style={{padding:"0"}} >
    <option aria-label="None" value="" />
    </InputLabel>
        <Select defaultValue="" variant="outlined" style={{padding:"0"}}>
          <ListSubheader style={{padding:"0"}}>ERC-20 (2)</ListSubheader>
          <MenuItem value={1} style={{padding: "0"}}>
            <Typography variant="caption" gutterBottom color="textPrimary" className={classes.dropdown}>
                    Celo Dollar
            </Typography>

            <Typography variant="caption" gutterBottom color="textSecondary"  className={classes.dropdown}>
                        {"492,270.513 cUSD"}
            </Typography>
          </MenuItem>
          {/* <MenuItem value={2}>
          <Grid container spacing={1} >
          <Grid item xs={12} >
            <Typography variant="caption" gutterBottom  color="textPrimary" >
                    Celo Gold
            </Typography>
            </Grid>
          <Grid item xs={12} >
            <Typography variant="caption" gutterBottom  color="textSecondary" >
                        {"14.9125447 cGLD"}
            </Typography>
            </Grid>
            </Grid>
          </MenuItem> */}
        </Select>
      </FormControl>
                </Grid>

                <Grid item xs={12}>
                    <Divider variant='middle'  />
                </Grid>


                <Grid item xs={6} className={classes.alignRight} >
                    <Button variant="outlined" color="secondary" >
                        Unlock cGLD
                    </Button>
                </Grid>
                <Grid item xs={6} className={classes.alignLeft} >
                    <Button variant="outlined" color="secondary">
                        Lock cGLD
                    </Button>
                </Grid>
                
          </Grid>
          

      </Card>
    </Grid>
    </span>
    );
}



export default function Account() {
  const classes = useStyles();

  return (
    <Layout >
        <Grid container className={classes.root} xs={12}  >
            <Grid item xs={12} className={classes.bottomPadding}> 
                <AddressCard />
            </Grid>
            <Grid item xs={12} className={classes.bottomPadding}>
                <AccountOverview />
            </Grid>
            <Grid item xs={12} className={classes.bottomPadding}>
                <AccountTransactions />
            </Grid>


    </Grid>
    </Layout>
  );
}