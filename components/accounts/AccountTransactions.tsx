import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Link from '../Link';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import cx from 'clsx';
import Card from '@material-ui/core/Card';
import Layout from '../Layout';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import theme from '../../themes/dark-theme';
import TablePagination from '@material-ui/core/TablePagination';
import Divider from '@material-ui/core/Divider';
import Transactions from '../Transactions';
import CardContent from '@material-ui/core/CardContent';
import FileCopyIcon from '@material-ui/icons/FileCopy';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Avatar from '@material-ui/core/Avatar';
import ListSubheader from '@material-ui/core/ListSubheader';
import Button from '@material-ui/core/Button';
import Chips from '../Chips';


interface Column {
  id: 'rank' | 'moniker' | 'balance' | 'percentage' | 'txsCount';
  label: string;
  minWidth?: number;
//   format?: (value: number) => string;
}

const columns: Column[] = [
  { id: 'rank', label: 'Rank', },
  { id: 'moniker', label: 'Moniker', },
  { id: 'balance', label: 'Balance',},
  { id: 'percentage', label: 'Percentage',},
  { id: 'txsCount',label: 'Txs Count', },
];

interface Data {
    rank: string;
    moniker: string;
    balance: string;
    percentage: string;
    txsCount: string;
}

function createData(rank: string, moniker: string, balance: string, percentage: string, txsCount: string) {
    return { rank, moniker, balance, percentage, txsCount};
  }

  const rows = [
    createData('1', 'Michelle Cl…', '12,859.009432 cGLD', '6%', '19' ),
    createData('2', 'Rachel Hug…', '11,374.009573 cGLD', '5%', '24'),
    createData('3', 'Will Chavez', '10,384.395824 cGLD', '9%', '65'),
    createData('4', 'Will Gibson', '10,384.395824 cGLD', '6%', '444'),
    createData('5', 'Pamela', '6,937.009423 cGLD', '12%', '22'),
    createData('6', 'Michelle Cl…', '8,998.039425 cGLD', '10%', '114' ),
    createData('7', 'Rachel Hug…', '6,937.009423 cGLD', '9%', '787' ),
    createData('8', 'Will Chavez', '10,004.958632 cGLD', '2%', '78'),
    createData('9', 'Will Gibson', '12,859.009432 cGLD', '1%', '5' ),
    createData('10', 'Pamela',  '10,004.958631 cGLD', '6%', '22'),
    createData('11', 'Michelle Cl…', '6,937.009423 cGLD', '7%', '35'),
    createData('12', 'Rachel Hug…', '10,004.958632 cGLD', '8%', '67'),
    createData('13', 'Will Chavez', '10,104.958632 cGLD', '1%', '42'),
    createData('14', 'Will Gibson', '6,937.009423 cGLD', '4%', '12'),
    createData('15', 'Pamela', '10,344.958632 cGLD','5%' ,'76' ),
   
  ];
  

const useStyles = makeStyles(({ spacing }) => {
    return {
  root: {
    borderRadius: 5,
  },
  container: {
    //maxHeight: 440,
    //padding: 'checkbox',
    borderRadius: 5,
    width: '100%'
  },

  inline:{
    paddingLeft: '0rem',
  },
  card: {
    //padding: '1rem',
    justifyContent: 'center',
    marginBottom: '1rem',
    background: '#43484C',
    alignItems: 'center',
    borderRadius: 5,
      boxShadow: '0 2px 4px 0 rgba(138, 148, 159, 0.2)',
      '& > *:nth-child(1)': {
        marginRight: spacing(2),
      },
      '& > *:nth-child(2)': {
        flex: 'auto',
      },
      
    },
    // box:{
    //   letterSpacing: '1px',
    //   padding: '1rem',
    //   display: 'inline-flex',
    //   overflow: 'hidden',
    //   whiteSpace: 'nowrap',
    // },
    time:{
      padding: '0.01em',
      margin: '0.5em'
    },
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
          display: 'block',
          marginLeft: '1rem',
      },
      // alignRight:{
      //     textAlign: 'right',
      //     marginBottom: '1rem',
      // },



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

          divider:{
            margin: '0.5rem',
        },
        alignRight:{
          paddingRight: '1rem',
          float: 'right',
        },

  }
});




export default function Blocks() {

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
    <Paper className={classes.root}>
  <Typography variant="body1" className={classes.box} >
            Transactions (1000) </Typography>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow key={row.rank} >
            <TableCell component="th" scope="row" padding="checkbox"  >
            <Grid container spacing={1} style={{padding: '0.5rem 0'}}>
                   <Grid item xs={9} md={10} >
  
                    <Typography  variant="caption" gutterBottom className={classes.leftInline}>
                    Tx#   <Link href="#" color="secondary"  className={classes.leftInline}>
                     {" 0xd3b4592hfhtre8w8sd"}
                    </Link>
                     </Typography>
                     </Grid>
                     <Grid item xs={3} md={2}>
                    <Typography variant="caption" gutterBottom  className={classes.alignRight}>
                    1 min ago
                    </Typography>
                    </Grid>
    
                    <Grid item xs={5} md={4} >
                    <Typography variant="caption"  gutterBottom className={classes.leftInline}>
                       From  <Link href="#" color="secondary" className={classes.leftInline} >
                     {" 0xd3b4592hrsthrt"}
                   </Link>
                     </Typography>
                     </Grid>
  
                     <Grid item xs={7} md={8}>
                    <Typography variant="caption"  gutterBottom align='left' className={classes.rightInline}>
                       To  <Link href="#" color="secondary" className={classes.leftInline} >
                       {" 0xd3b4592hdsw12dftuytuytrutr6"}
                   </Link>
                     </Typography>
                     </Grid>
  
  
  
                     <Grid item xs={6} md={10} >
                     <Typography  variant="caption" gutterBottom className={classes.chip}>
                     <Chips value={'Contract Call'}/>
                    </Typography>
    
                  </Grid>
                     <Grid item xs={6} md={2}>
                    <Typography variant="caption" gutterBottom  className={classes.alignRight} >
                      302.140759 cGLD
                    </Typography>
                  </Grid>
                     </Grid>
            </TableCell>

          </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
    </Layout>

);
}