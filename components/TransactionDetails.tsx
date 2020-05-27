import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '../components/Link';
import {makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Layout from '../components/Layout';
import CardContent from '@material-ui/core/CardContent';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import Chips from '../components/Chips';
import IconButton from '@material-ui/core/IconButton';

import {useRouter} from 'next/router'
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import TablePagination from '@material-ui/core/TablePagination';
import * as numbro from 'numbro';
//import MiddleEllipsis from "react-middle-ellipsis";


const GET_TX_DETAILS = gql`
  query Transaction($hash: String!) {
    transaction(hash: $hash) {
        value
        blockNumber
        nonce
        feeCurrency
        gatewayFeeRecipient
        gatewayFee
        gas
        hash
        input
        timestamp
        gas
        from{
            address
        }
        to{
            address
        }
    
        
    }
  }
`;


const useStyles = makeStyles(({ spacing, palette }) => {
    return {
  root: {
    width: '100%',
    padding: '0.5rem',
    borderRadius: 5,
    wordWrap: 'break-word',
    
  },
  inline:{
    paddingLeft: 0,
  },

    
    item:{
        padding: '0 0 1rem 0.5rem',
    },
    divider:{
        margin: '0.5rem 0 0 0',
    },
    inputLabel:{
        wordWrap: 'break-word',
        padding: '0.5rem',
        fontSize: '0.75rem',
       
      },
      alignRight:{
        //display: 'block',
        float: 'right',
        paddingRight: '1rem'
    },
    alignLeft:{
        display: 'flex',
        float: 'left',
        paddingRight: '1rem'
    },

    MuiFilledInputInput:{
        padding: '0rem'
    }
  }
});




export default function TransactionDetails ( hash : String   ) {
    hash = hash.hash;
    const { loading, error, data, refetch } = useQuery(GET_TX_DETAILS, {
      variables: { hash},
      pollInterval: 5000,
    });
    const classes = useStyles();
    if (loading) return null;
    if (error) return `Error! ${error}`;
console.log(data)
  return (
    <Layout>
    <Card className={classes.root}>
      <CardContent>
            <Grid container spacing={1}  className={classes.item}>
                <Grid item xs={12} >
                    <Typography  color="textSecondary" variant="subtitle1"  paragraph>
                        Transaction Details
                    </Typography>
                    
                </Grid>
                <Divider />
                <Grid item xs={12} className={classes.item} >
                    <Typography variant="caption" component="h2">
                        Hash
                    </Typography>
                    <Typography variant="caption" component="h2">
                       {data.transaction && data.transaction.hash ? data.transaction.hash : 0}
                    </Typography>
                    <Divider variant='middle' className={classes.divider}/>
                </Grid>

                <Grid item xs={12} className={classes.item}>
                    <Typography variant="caption" component="h2">
                        Time
                    </Typography>
                    <Typography variant="caption" >
                    {data.transaction && data.transaction.timestamp ? new Date(parseInt(data.transaction.timestamp)).toUTCString() : ' '}                 
                    </Typography>
                   <Divider variant='middle' className={classes.divider}/>
                </Grid>

                <Grid item xs={12} className={classes.item}>
                    <Typography variant="caption" component="h2">
                        Tx Type
                    </Typography>
                    <Typography variant="caption" component="h2">
                    {data.transaction.value === 0 || data.transaction.value  ? 
                       'Contract Call' : 'Token Transfer'}
                    </Typography>
                    <Divider variant='middle' className={classes.divider}/>
                </Grid>

                <Grid item xs={12} className={classes.item}>
                    <Typography variant="caption" component="h2">
                        Status
                    </Typography>
                    <Typography variant="caption" component="h2">
                    {!data.transaction.pending ? 
                       <Chips value='Pending'/> : 
                       <Chips value='Success'/>}
                    </Typography>
                    <Divider variant='middle' className={classes.divider}/>
                </Grid>

                <Grid item xs={12} className={classes.item}>
                    <Typography variant="caption" component="h2">
                       From
                    </Typography>
                    <Typography variant="caption" component="h2">
                       <Link href="#"  color="secondary">
                       {data.transaction && data.transaction.from ? data.transaction.from.address : ' '}
                        </Link> 
                    </Typography>
                    <Divider variant='middle' className={classes.divider}/>
                </Grid>

                <Grid item xs={12} className={classes.item}>
                    <Typography variant="caption" component="h2">
                        To
                    </Typography>
                    <Typography variant="caption" component="h2">
                      <Link href="#"  color="secondary">
                      {data.transaction && data.transaction.to ? data.transaction.to.address : ' '}      
                    </Link>  
                    </Typography>
                    <Divider variant='middle' className={classes.divider}/>
                </Grid>

                <Grid item xs={12} className={classes.item}>
                <Typography variant="caption" component="h2">
                    Value
                </Typography>
                <Typography variant="caption" component="h2">
                {data.transaction && data.transaction.value ? data.transaction.value : 0}
                </Typography>
                <Divider variant='middle' className={classes.divider}/>
                </Grid>

                <Grid item xs={12} className={classes.item}>
                <Typography variant="caption" component="h2">
                    Block Height
                </Typography>
                <Typography variant="caption" component="h2">
                <Link href={`/block/${data.transaction.blockNumber}`}  color="secondary" >
                {data.transaction && data.transaction.blockNumber ? data.transaction.blockNumber : 0}
                    </Link>  
                </Typography>
                <Divider variant='middle' className={classes.divider}/>
                </Grid>

                <Grid item xs={12} className={classes.item}>
                <Typography variant="caption" component="h2">
                   Block Confirmation
                </Typography>
                <Typography variant="caption" component="h2">
                    22,733
                </Typography>
                <Divider variant='middle' className={classes.divider}/>
                </Grid>

                <Grid item xs={12} className={classes.item}>
                <Typography variant="caption" component="h2">
                    Nonce
                </Typography>
                <Typography variant="caption" component="h2">
                {data.transaction && data.transaction.nonce ? data.transaction.nonce : 0}
                </Typography>
                <Divider variant='middle' className={classes.divider}/>
                </Grid>

                <Grid item xs={12} className={classes.item}>
                    <Typography variant="caption" component="h2">
                        Transaction Fee
                    </Typography>
                    <Typography variant="caption" component="h2">
                    {data.transaction && data.transaction.feeCurrency ? data.transaction.feeCurrency : 0}  cGLD
                    </Typography>
                    <Divider variant='middle' className={classes.divider}/>
                </Grid>

                <Grid item xs={12} className={classes.item}>
                    <Typography variant="caption" component="h2">
                        Fee Receipient
                    </Typography>
                    <Typography variant="caption" component="h2">
                    {data.transaction && data.transaction.gatewayFeeRecipient ? data.transaction.gatewayFeeRecipient : ' '}
                    </Typography>
                    <Divider variant='middle' className={classes.divider}/>
                </Grid>


                <Grid item xs={12} className={classes.item}>
                    <Typography variant="caption" component="h2">
                        Gate Fee
                    </Typography>
                    <Typography variant="caption" component="h2">
                    {data.transaction && data.transaction.gatewayFee ? data.transaction.gatewayFee : ' '}
                    </Typography>
                    <Divider variant='middle' className={classes.divider}/>
                </Grid>

                <Grid item xs={12} className={classes.item}>
                    <Typography variant="caption" component="h2">
                        Transaction Speed
                    </Typography>
                    <Typography variant="caption" component="h2">
                    1.5 seconds
                    </Typography>
                    <Divider variant='middle' className={classes.divider}/>
                </Grid>


                <Grid item xs={3} md={1} className={classes.item}>
                    <Typography variant="caption" component="h2">
                        Raw Input
                    </Typography>
                </Grid>
                <Grid item xs={2} md={1} className={classes.alignRight}>
                    <Chips value={'Hex'} />
                </Grid>
                <Grid item xs={3} md={1}>
                    <Chips value={'UTF-8'} />
                </Grid>

                <Grid item xs={4} md={9} className={classes.alignRight}>
                {/* <CopyToClipboard onCopy={this.onCopy} text={value}>
                <IconButton aria-label="copy" size="small">
                <img src="/images/copy.svg" />
                </IconButton>
          </CopyToClipboard>
                 */}

                <IconButton aria-label="copy" size="small" className={classes.alignRight}>
                <img src="/images/copy.svg" />
                </IconButton>
                </Grid>
                <Grid item xs={12}  className={classes.alignLeft}>
                    <FormControl fullWidth variant="filled" size="small" margin="dense">
                            <FilledInput
                            className={classes.inputLabel}
                                value={data.transaction && data.transaction.input ? data.transaction.input : ' '}
                                disableUnderline={true}
                                readOnly
                                style={{padding: '0.7rem'}}
                                multiline
                            />
                    </FormControl>
                    <Divider variant='middle' className={classes.divider}/>
                </Grid>

                <Grid item xs={12} className={classes.item}>
                    <Typography variant="caption" component="h2">
                        Gas Used
                    </Typography>
                    <Typography variant="caption" component="h2">
                    {data.transaction && data.transaction.gas ? data.transaction.gas : ' '}
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