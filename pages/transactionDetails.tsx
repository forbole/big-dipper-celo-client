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



interface Column {
  id: 'height' | 'miner' | 'txs' | 'gasUsed' | 'gasLimit'| 'time';
  label: string;
  minWidth?: number;
//   format?: (value: number) => string;
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
  card: {
    padding: '0.5rem',
    justifyContent: 'center',
      borderRadius: 5,
      boxShadow: '0 2px 4px 0 rgba(138, 148, 159, 0.2)',
      '& > *:nth-child(1)': {
        marginRight: spacing(2),
      },
      '& > *:nth-child(2)': {
        flex: 'auto',
      },
      background: '#43484C',
    },
    
    item:{
        padding: '0 0 1rem 0.5rem',
    },
    divider:{
        margin: '0.5rem 0 0 0',
    },
    inputLabel:{
        wordWrap: 'break-word',
        padding: '0rem'
      },
  }
});




export default function BlockDetails() {
const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Layout>
    <Card className={classes.root}>
      <CardContent>
            <Grid container spacing={1} justify="center" className={classes.item}>
                <Grid item xs={12} >
                    <Typography  color="textSecondary" variant="subtitle1"  paragraph>
                        Transaction Details
                    </Typography>
                    <Divider variant='middle' />
                </Grid>

                <Grid item xs={12} className={classes.item} >
                    <Typography variant="body2" component="h2">
                        Hash
                    </Typography>
                    <Typography variant="body2" component="h2">
                        E2D55BA9A99F150AE6E1D0457B6416C4C68915E1CB26320318A1421491C17032
                    </Typography>
                    <Divider variant='middle' className={classes.divider}/>
                </Grid>

                <Grid item xs={12} className={classes.item}>
                    <Typography variant="body2" component="h2">
                        Time
                    </Typography>
                    <Typography variant="body2" >
                        April-09-2020 11:22:08 UTC (14 seconds ago)
                    </Typography>
                   <Divider variant='middle' className={classes.divider}/>
                </Grid>

                <Grid item xs={12} className={classes.item}>
                    <Typography variant="body1" component="h2">
                        Tx Type
                    </Typography>
                    <Typography variant="body2" component="h2">
                    Contract Call
                    </Typography>
                    <Divider variant='middle' className={classes.divider}/>
                </Grid>

                <Grid item xs={12} className={classes.item}>
                    <Typography variant="body2" component="h2">
                        Status
                    </Typography>
                    <Typography variant="body2" component="h2">
                        THE BADGE HERE
                    </Typography>
                    <Divider variant='middle' className={classes.divider}/>
                </Grid>

                <Grid item xs={12} className={classes.item}>
                    <Typography variant="body2" component="h2">
                       From
                    </Typography>
                    <Typography variant="body2" component="h2">
                       <Link href="#"  color="secondary">0x22k0zzcx32juhqqhpn5aar0gus63lnnp</Link> 
                    </Typography>
                    <Divider variant='middle' className={classes.divider}/>
                </Grid>

                <Grid item xs={12} className={classes.item}>
                    <Typography variant="body2" component="h2">
                        To
                    </Typography>
                    <Typography variant="body2" component="h2">
                      <Link href="#"  color="secondary">0x22k0zzcx32juhqqhpn5aar0gus63lnnp</Link>  
                    </Typography>
                    <Divider variant='middle' className={classes.divider}/>
                </Grid>

                <Grid item xs={12} className={classes.item}>
                <Typography variant="body2" component="h2">
                    Value
                </Typography>
                <Typography variant="body2" component="h2">
                    12,946,937 cGLD
                </Typography>
                <Divider variant='middle' className={classes.divider}/>
                </Grid>

                <Grid item xs={12} className={classes.item}>
                <Typography variant="body2" component="h2">
                    Block Height
                </Typography>
                <Typography variant="body2" component="h2">
                <Link href="#"  color="secondary">1087144</Link>  
                </Typography>
                <Divider variant='middle' className={classes.divider}/>
                </Grid>

                <Grid item xs={12} className={classes.item}>
                <Typography variant="body2" component="h2">
                   Block Confirmation
                </Typography>
                <Typography variant="body2" component="h2">
                    22,733
                </Typography>
                <Divider variant='middle' className={classes.divider}/>
                </Grid>

                <Grid item xs={12} className={classes.item}>
                <Typography variant="body2" component="h2">
                    Nonce
                </Typography>
                <Typography variant="body2" component="h2">
                    0x0000000000000000
                </Typography>
                <Divider variant='middle' className={classes.divider}/>
                </Grid>

                <Grid item xs={12} className={classes.item}>
                    <Typography variant="body2" component="h2">
                        Transaction Fee
                    </Typography>
                    <Typography variant="body2" component="h2">
                    0.000140945 cGLD
                    </Typography>
                    <Divider variant='middle' className={classes.divider}/>
                </Grid>

                <Grid item xs={12} className={classes.item}>
                    <Typography variant="body2" component="h2">
                        Fee Receipient
                    </Typography>
                    <Typography variant="body2" component="h2">
                    None
                    </Typography>
                    <Divider variant='middle' className={classes.divider}/>
                </Grid>


                <Grid item xs={12} className={classes.item}>
                    <Typography variant="body2" component="h2">
                        Gate Fee
                    </Typography>
                    <Typography variant="body2" component="h2">
                    0
                    </Typography>
                    <Divider variant='middle' className={classes.divider}/>
                </Grid>

                <Grid item xs={12} className={classes.item}>
                    <Typography variant="body2" component="h2">
                        Transaction Speed
                    </Typography>
                    <Typography variant="body2" component="h2">
                    1.5 seconds
                    </Typography>
                    <Divider variant='middle' className={classes.divider}/>
                </Grid>


                <Grid item xs={12} className={classes.item}>
                    <Typography variant="body2" component="h2">
                        Raw Input
                    </Typography>
                    <Typography variant="body2" component="h2">
                    <FormControl fullWidth variant="filled">
                            <FilledInput
                            className={classes.inputLabel}
                                value={"0xa9059cbb000000000000000000000000646eac4b00452fc4356a845922f07cbd2ced9e470000000000000000000000"}
                                disableUnderline={true}
                            />
                    </FormControl>
                    </Typography>
                    <Divider variant='middle' className={classes.divider}/>
                </Grid>

                <Grid item xs={12} className={classes.item}>
                    <Typography variant="body2" component="h2">
                        Gas Used
                    </Typography>
                    <Typography variant="body2" component="h2">
                    19,186.000
                    </Typography>
                    <Divider variant='middle' className={classes.divider}/>
                </Grid>

                <Grid item xs={12} className={classes.item}>
                    <Typography variant="body2" component="h2">
                        Gas Limit
                    </Typography>
                    <Typography variant="body2" component="h2">
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