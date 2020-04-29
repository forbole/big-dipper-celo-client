import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import MuiLink from '@material-ui/core/Link';
import Link from '../components/Link';
import clsx from 'clsx';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import CssBaseline from '@material-ui/core/CssBaseline';
import SearchBar from '../components/SearchBar';
import ChartData from '../components/ChartData';
import LatestBlocks from '../components/LatestBlocks';
import NetworkDropdown from '../components/NetworkDropdown';
import Grid from '@material-ui/core/Grid';
import VpnKeyIcon from '@material-ui/icons/VpnKey';
import LatestTransactions from '../components/LatestTransactions'
import Footer from '../components/Footer'
import cx from 'clsx';
import Card from '@material-ui/core/Card';
import Layout from '../components/Layout';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import theme from '../themes/dark-theme';
import TablePagination from '@material-ui/core/TablePagination';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';



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
  

const useStyles = makeStyles(({ spacing }) => {
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
    }
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
                        Block #1087144
                    </Typography>
                    <Divider variant='middle' />
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
                        Transactions
                    </Typography>
                    <Typography variant="body2" component="h2">
                    7
                    </Typography>
                    <Divider variant='middle' className={classes.divider}/>
                </Grid>

                <Grid item xs={12} className={classes.item}>
                    <Typography variant="body2" component="h2">
                        Speed
                    </Typography>
                    <Typography variant="body2" component="h2">
                        793 bytes
                    </Typography>
                    <Divider variant='middle' className={classes.divider}/>
                </Grid>

                <Grid item xs={12} className={classes.item}>
                    <Typography variant="body2" component="h2">
                        Miner
                    </Typography>
                    <Typography variant="body2" component="h2">
                       <Link href="#"  color="secondary">Michelle Clark</Link> 
                    </Typography>
                    <Divider variant='middle' className={classes.divider}/>
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
                        Parent Hash
                    </Typography>
                    <Typography variant="body2" component="h2">
                      <Link href="#"  color="secondary">E2D55BA9A99F150AE6E1D0457B6416C4C68915E1CB26320318A1421491C17032</Link>  
                    </Typography>
                    <Divider variant='middle' className={classes.divider}/>
                </Grid>

                <Grid item xs={12} className={classes.item}>
                <Typography variant="body2" component="h2">
                    Difficulty
                </Typography>
                <Typography variant="body2" component="h2">
                    1
                </Typography>
                <Divider variant='middle' className={classes.divider}/>
                </Grid>

                <Grid item xs={12} className={classes.item}>
                <Typography variant="body2" component="h2">
                    Total Difficulty
                </Typography>
                <Typography variant="body2" component="h2">
                    1,101,248
                </Typography>
                <Divider variant='middle' className={classes.divider}/>
                </Grid>

                <Grid item xs={12} className={classes.item}>
                <Typography variant="body2" component="h2">
                    Nonce
                </Typography>
                <Typography variant="body2" component="h2">
                    0x00000000000000000
                </Typography>
                <Divider variant='middle' className={classes.divider}/>
                </Grid>

                <Grid item xs={12} className={classes.item}>
                <Typography variant="body2" component="h2">
                    Gas Used
                </Typography>
                <Typography variant="body2" component="h2">
                    19,186.000 (99.93%)
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