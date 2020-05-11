import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '../components/Link';
import Card from '@material-ui/core/Card';
import Divider from '@material-ui/core/Divider';
import Layout from '../components/Layout';
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
import AccountTransactions from '../components/accounts/Transactions';
import InternalTransactions from '../components/accounts/InternalTransactions';
import Downtime from '../components/accounts/Downtime';
import ValidatedBlocks from '../components/accounts/ValidatedBlocks';
import AddressCard from '../components/accounts/AddressCard';
import AccountDetails from '../components/accounts/AccountDetails';
import Hidden from '@material-ui/core/Hidden';



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






// function SearchBar() {
//   const classes = useStyles();
//   const [values, setValues] = React.useState<State>({
//     txSearch: '',
//   });

//   const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
//     setValues({ ...values, [prop]: event.target.value });
//   };




//   return (
//     <div className={classes.root}>
//       <Grid container spacing={1} className={classes.container}>
//       <Grid item xs={11} md={7} >
//         <FormControl fullWidth variant="filled">
        
//           <InputLabel htmlFor="filled-adornment-amount" ></InputLabel>
         
//           <FilledInput
//           className={classes.inputLabel}
//             id="filled-adornment-amount"
//             value={values.txSearch}
//             fullWidth
//             disableUnderline={true}
//             onChange={handleChange('txSearch')}
//             placeholder="Search by address / token symbol name / tx"
//             startAdornment={<InputAdornment position="start">
//                 <SearchIcon />
//             </InputAdornment>}
//           />
//         </FormControl>
//         </Grid>
//         </Grid> 
//       </div>
//   );
// }

function TokenDropdown(){
  const classes = useStyles();
  let celoGold = '14.221738 cGLD';
  let celoDollar = '492,270.513 cUSD'
  return(
       
    <FormControl className={classes.formControl}  >
    
    <InputLabel htmlFor="grouped-native-select" className={classes.inputLabel} >
    {celoGold}
    </InputLabel>     
    <Select defaultValue="" id="grouped-select"  color="primary" className={classes.select} disableUnderline={true}>
          <ListSubheader >ERC-20 (2)</ListSubheader>
          <Divider />
          <ListSubheader style={{padding: '0.5rem 0 0 1rem'}}><Typography variant="body2" gutterBottom color="textPrimary"  >
                    Celo Dollar
            </Typography></ListSubheader>
          <MenuItem value={1} style={{padding: '0 0 0 1rem'}}>
            

            <Typography variant="body2" gutterBottom color="textSecondary"  >
                      {celoDollar}
            </Typography>
          </MenuItem>

          <Divider variant='middle' className={classes.divider} />
          <ListSubheader style={{padding: '0 0 0 1rem'}}><Typography variant="body2" gutterBottom color="textPrimary" >
                    Celo Gold
            </Typography></ListSubheader>

          <MenuItem value={2} style={{padding: '0 0 0 1rem'}}>
            

            <Typography variant="body2" gutterBottom color="textSecondary"  >
                      {celoGold}
            </Typography>
          </MenuItem>

        </Select>
      </FormControl>
);
}


function AccountOverview(){
    const classes = useStyles();

    return(
        <span>
    {/* <Grid container className={classes.root} xs={12} md={12} lg={6} > */}
      <Card className={classes.card}>
        <Grid container spacing={1} >
          <Grid item xs={12} >
          <Typography variant="body1" className={classes.box} >
              Overview
        </Typography> 
                <Divider variant='middle'  />
          </Grid>
          </Grid>

          <Grid container spacing={1} >
                <Grid item xs={6}  >

                  <Typography  variant="body2" gutterBottom className={classes.alignLeft}>
                  Moniker   
                  </Typography>
                  </Grid>
                  <Grid item xs={6} >
                  <Typography variant="body2" gutterBottom  className={classes.alignRight}>
                  {"Michelle Clark"}
                  </Typography>
                  </Grid>

                    <Grid item xs={12}>
                    <Divider variant='middle'  />
                    </Grid>

                  <Grid item xs={6} md={9} >
                  <Typography variant="body2"  gutterBottom className={classes.alignLeft}>
                     Balance
                   </Typography>
                   </Grid>
                  
                   <Grid item xs={6} md={3}>
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

                   <Grid item xs={4} md={10} >
                   <Typography  variant="body2" gutterBottom className={classes.chip}>
                   Tokens
                  </Typography>
                </Grid>

                   <Grid item xs={8} md={2} >
                  <TokenDropdown />
                </Grid>

                <Grid item xs={12}>
                    <Divider variant='middle'  />
                </Grid>


                <Grid item xs={6} align='center'  >
                    <Button variant="outlined" color="secondary" className={classes.button} >
                        Unlock cGLD
                    </Button>
                </Grid>
                <Grid item xs={6} align='center' >
                    <Button variant="outlined" color="secondary" className={classes.button}>
                        Lock cGLD
                    </Button>
                </Grid>
                
          </Grid>
          

      </Card>
    {/* </Grid> */}
    </span>
    );
}



export default function Account() {
  const classes = useStyles();

  return (
    <Layout >
        <Grid container className={classes.root} xs={12}  >
          <Hidden lgUp>
            <Grid item xs={12} lg={5} className={classes.bottomPadding}> 
                <AddressCard />
            </Grid>
            </Hidden>

            <Hidden lgUp>
            <Grid item xs={12}  lg={5} className={classes.bottomPadding}>
                <AccountOverview />
            </Grid>
            </Hidden>


            <Hidden mdDown>
            <Grid item xs={12} lg={5} className={classes.bottomPadding}> 
                <AddressCard/>
                <p></p>
                <AccountOverview />
            
            </Grid>
            </Hidden>

            <Hidden mdDown>
            <Grid item xs={12} lg={5} className={classes.bottomPadding}>  
                <AccountDetails />
            </Grid>
            </Hidden>

            <Grid item xs={12} lg={5} className={classes.bottomPadding}>
                <AccountTransactions />
            </Grid>
           
            <Grid item xs={12} lg={5} className={classes.bottomPadding}>
                <InternalTransactions />
            </Grid>
            
            <Grid item xs={12} lg={5} className={classes.bottomPadding}>
               <Downtime />
            </Grid>
            
            <Grid item xs={12} lg={5} className={classes.bottomPadding}>
               <ValidatedBlocks />
            </Grid>

            <Hidden lgUp>
            <Grid item xs={12} lg={5} className={classes.bottomPadding}>
               <AccountDetails />
            </Grid>
            </Hidden>
    </Grid>
    </Layout>
  );
}