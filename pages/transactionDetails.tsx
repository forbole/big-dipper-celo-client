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
//import CopyToClipboard from 'react-copy-to-clipboard';


let copied = false;
let value = "";

interface Column {
  id: 'height' | 'miner' | 'txs' | 'gasUsed' | 'gasLimit'| 'time';
  label: string;
  minWidth?: number;
}

const columns: Column[] = [
  { id: 'height', label: 'Height', },
  { id: 'miner', label: 'Miner', },
  {
    id: 'txs',
    label: 'Txs',
  },
  {
    id: 'gasUsed',
    label: 'Gas Used', 
  },
  {
    id: 'gasLimit',
    label: 'Gas Limit',
  },
  {
    id: 'time',
    label: 'Time',
  },
];

interface Data {
    height: string;
    miner: string;
    txs: string;
    gasUsed: string;
    gasLimit: string;
    time: string;
}

function createData(height: string, miner: string, txs: string, gasUsed: string, gasLimit: string, time: string) {
    return { height, miner, txs, gasUsed, gasLimit, time};
  }

  const rows = [
    createData('1087144', 'Michelle Cl…', '7', '1215', '548946', '14s ago'),
    createData('1087143', 'Rachel Hug…', '0', '54889', '5484894', '2 mins ago'),
    createData('1087142', 'Will Chavez', '8', '4515868', '656888', '2 mins ago'),
    createData('1087141', 'Will Gibson', '128', '56165', '646868', '2 mins ago'),
    createData('1087140', 'Pamela', '10', '34685468', '54684', '2 mins ago'),
    createData('1087144', 'Michelle Cl…', '7', '1215', '548946', '14s ago'),
    createData('1087143', 'Rachel Hug…', '0', '54889', '5484894', '2 mins ago'),
    createData('1087142', 'Will Chavez', '8', '4515868', '656888', '2 mins ago'),
    createData('1087141', 'Will Gibson', '128', '56165', '646868', '2 mins ago'),
    createData('1087140', 'Pamela', '10', '34685468', '54684', '2 mins ago'),
    createData('1087144', 'Michelle Cl…', '7', '1215', '548946', '14s ago'),
    createData('1087143', 'Rachel Hug…', '0', '54889', '5484894', '2 mins ago'),
    createData('1087142', 'Will Chavez', '8', '4515868', '656888', '2 mins ago'),
    createData('1087141', 'Will Gibson', '128', '56165', '646868', '2 mins ago'),
    createData('1087140', 'Pamela', '10', '34685468', '54684', '2 mins ago'),
    createData('1087144', 'Michelle Cl…', '7', '1215', '548946', '14s ago'),
    createData('1087143', 'Rachel Hug…', '0', '54889', '5484894', '2 mins ago'),
    createData('1087142', 'Will Chavez', '8', '4515868', '656888', '2 mins ago'),
    createData('1087141', 'Will Gibson', '128', '56165', '646868', '2 mins ago'),
    createData('1087140', 'Pamela', '10', '34685468', '54684', '2 mins ago'),
  ];
  

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



const  onCopy = () => {
    return copied = true;
  };


export default function TransactionDetails() {
const classes = useStyles();


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
                        E2D55BA9A99F150AE6E1D0457B6416C4C68915E1CB26320318A1421491C17032
                    </Typography>
                    <Divider variant='middle' className={classes.divider}/>
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
                        Tx Type
                    </Typography>
                    <Typography variant="caption" component="h2">
                    Contract Call
                    </Typography>
                    <Divider variant='middle' className={classes.divider}/>
                </Grid>

                <Grid item xs={12} className={classes.item}>
                    <Typography variant="caption" component="h2">
                        Status
                    </Typography>
                    <Typography variant="caption" component="h2">
                    <Chips value={'Success'}/>
                    </Typography>
                    <Divider variant='middle' className={classes.divider}/>
                </Grid>

                <Grid item xs={12} className={classes.item}>
                    <Typography variant="caption" component="h2">
                       From
                    </Typography>
                    <Typography variant="caption" component="h2">
                       <Link href="#"  color="secondary">0x22k0zzcx32juhqqhpn5aar0gus63lnnp</Link> 
                    </Typography>
                    <Divider variant='middle' className={classes.divider}/>
                </Grid>

                <Grid item xs={12} className={classes.item}>
                    <Typography variant="caption" component="h2">
                        To
                    </Typography>
                    <Typography variant="caption" component="h2">
                      <Link href="#"  color="secondary">0x22k0zzcx32juhqqhpn5aar0gus63lnnp</Link>  
                    </Typography>
                    <Divider variant='middle' className={classes.divider}/>
                </Grid>

                <Grid item xs={12} className={classes.item}>
                <Typography variant="caption" component="h2">
                    Value
                </Typography>
                <Typography variant="caption" component="h2">
                    12,946,937 cGLD
                </Typography>
                <Divider variant='middle' className={classes.divider}/>
                </Grid>

                <Grid item xs={12} className={classes.item}>
                <Typography variant="caption" component="h2">
                    Block Height
                </Typography>
                <Typography variant="caption" component="h2">
                <Link href="#"  color="secondary">1087144</Link>  
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
                    0x0000000000000000
                </Typography>
                <Divider variant='middle' className={classes.divider}/>
                </Grid>

                <Grid item xs={12} className={classes.item}>
                    <Typography variant="caption" component="h2">
                        Transaction Fee
                    </Typography>
                    <Typography variant="caption" component="h2">
                    0.000140945 cGLD
                    </Typography>
                    <Divider variant='middle' className={classes.divider}/>
                </Grid>

                <Grid item xs={12} className={classes.item}>
                    <Typography variant="caption" component="h2">
                        Fee Receipient
                    </Typography>
                    <Typography variant="caption" component="h2">
                    None
                    </Typography>
                    <Divider variant='middle' className={classes.divider}/>
                </Grid>


                <Grid item xs={12} className={classes.item}>
                    <Typography variant="caption" component="h2">
                        Gate Fee
                    </Typography>
                    <Typography variant="caption" component="h2">
                    0
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


                <Grid item xs={3} className={classes.item}>
                    <Typography variant="caption" component="h2">
                        Raw Input
                    </Typography>
                </Grid>
                <Grid item xs={2} >
                    <Chips value={'Hex'} />
                </Grid>
                <Grid item xs={3} >
                    <Chips value={'UTF-8'} />
                </Grid>

                <Grid item xs={4} className={classes.alignRight}>
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
                <Grid item xs={12} md={5} className={classes.alignLeft}>
                    <FormControl fullWidth variant="filled" size="small" margin="dense">
                            <FilledInput
                            className={classes.inputLabel}
                                value={"0xa9059cbb000000000000000000000000646eac4b00452fc4356a845922f07cbd2ced9e470000000000000000000000"}
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
                    19,186.000
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