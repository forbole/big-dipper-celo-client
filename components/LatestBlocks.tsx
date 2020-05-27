import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Link from '../components/Link';
import Grid from '@material-ui/core/Grid';
import { Divider } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import cx from 'clsx';
import Card from '@material-ui/core/Card';
import Layout from '../components/Layout';
import theme from '../themes/dark-theme';
import moment from 'moment'
import Hidden from '@material-ui/core/Hidden';
import PriceCard from './PriceCard'
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import TablePagination from '@material-ui/core/TablePagination';
import * as numbro from 'numbro';
import MiddleEllipsis from "react-middle-ellipsis";
// import Link from 'next/link'

moment.updateLocale('en', {
  relativeTime : {
      past: function(input) {
        return input === 'just now'
          ? input
          : input + ' ago'
      },
      s  : 'just now',
      future: "in %s",
      ss : '%d seconds',
      m:  "a minute",
      mm: "%d minutes",
      h:  "an hour",
      hh: "%d hours",
      d:  "a day",
      dd: "%d days",
      M:  "a month",
      MM: "%d months",
      y:  "a year",
      yy: "%d years"
  }
});


const GET_BLOCK = gql`
  {
    blocks (pageSize: 500, page: 10) {
      blocks{
        number
        miner{
          name
          signer
        }
        transactions{
            transactionIndex
        }
        gasUsed
        gasLimit
        timestamp
      }
    }
  }
`;

const blocks: any[] = [];

function getBlocks() {
  const { loading, error, data } = useQuery(GET_BLOCK, {
    pollInterval: 5000,
  });
 //const blocks: any[] = [];
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    data.blocks.blocks.forEach(function (block: any, i: number) {
      blocks[i] = block;
      //console.log(block)
    })
  )
};

interface Column {
  id: 'height' | 'validator' | 'txs' | 'gasUsed' | 'gasLimit' |  'time';
  label: string;
};

const columns: Column[] = [
  
  { id: 'height', label: 'Height', },
  { id: 'validator', label: 'Validator', },
  { id: 'txs', label: 'Txs',},
  { id: 'gasUsed', label: 'Gas Used', },
  { id: 'gasLimit', label: 'Gas Limit',},
  { id: 'time', label: 'Time'}, 
];

const columns_homepage: Column[] = [
  
  { id: 'height', label: 'Height', },
  { id: 'validator', label: 'Validator', },
  { id: 'txs', label: 'Txs',},
  { id: 'time', label: 'Time'}, 
];

const useStyles = makeStyles({
    box:{
        letterSpacing: '1px',
        padding: '1rem',
        display: 'block',
        overflow: 'hidden',
        whiteSpace: 'nowrap',
    },
    link:{
        float: 'right',
        textAlign: 'right',

    },
    divider: {
      padding: '0 1rem'
    },

    cell:{
      maxHeight: '1rem',
    },


    tableCell:{
        overflow: 'auto',
        padding: '0.4rem',
    },
    table:{
        background: '#4D5155',
        padding: '0.2rem'
    },
    inline:{
      paddingLeft: '0rem',
    },
    card: {
      padding: '1rem',
      justifyContent: 'center',
      marginBottom: '1rem',
      background: '#43484C',
      alignItems: 'center',
      borderRadius: 5,
        boxShadow: '0 2px 4px 0 rgba(138, 148, 159, 0.2)',
        '& > *:nth-child(1)': {
          marginRight: '2rem',
        },
        '& > *:nth-child(2)': {
          flex: 'auto',
        },
        
      },

      blocks:{
        //padding: '1.5%',
      },

    textContent:{
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      minWidth: 0
      //whiteSpace: 'noWrap'
    },
    truncareText:{
      overflow: "hidden", 
      textOverflow: "ellipsis", 
      width: '6rem',
      minWidth: '2rem', 
      maxWidth: '15rem',
    },

});



export default function LatestBlocks(props : any) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  getBlocks();
  
  const paginate = props.pagination ? (page * rowsPerPage) : 5;
  const paginate_2 = props.pagination  ? page * rowsPerPage + rowsPerPage : 10;

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Grid container className={classes.blocks}>
        <Grid item xs={12} >
          {props.priceCard ? 
          <Hidden smUp>
        <PriceCard />
        </Hidden> : null}
        <Paper className={classes.root}>
      <Typography variant="body1" className={classes.box} >
                  Blocks   {!props.pagination ? <Link href="/blocks" className={classes.link} color="secondary">
      {'view more'}
      </Link> : null} 
  </Typography>
                  <Divider variant='middle' className={classes.divider}/>
          <TableContainer className={classes.container}>
          <Paper className={classes.tableCell}>
            <Table >
              <TableHead>
                {props.pagination ? 
                <TableRow>
                  {columns.map((column) => (
                    <TableCell
                      key={column.id}
                      align="left"
                      className={classes.table}
                      padding="checkbox" 
                    >
                      <Typography variant="caption" noWrap className={classes.tableCell}>{column.label}</Typography>
                    </TableCell>
                  ))}
                </TableRow> : 

                <TableRow>
                {columns_homepage.map((column) => (
                  <TableCell
                    key={column.id}
                    align="left"
                    className={classes.table}
                    padding="checkbox" 
                  >
                    <Typography variant="caption" noWrap className={classes.tableCell}>{column.label}</Typography>
                  </TableCell>
                ))}
                </TableRow> }

              </TableHead>
              <TableBody>
                { blocks.slice(paginate, paginate_2).map((row)  => {
                  return (
                <TableRow key={row.number} >
                <TableCell component="th" scope="row" padding="checkbox" align="left" className={classes.tableCell} >
                <Typography variant="caption"  noWrap> 
                <Link href="block/[block]/" as={`block/${row.number}`} color="secondary" >{row.number}</Link>
                </Typography>
                </TableCell>   

                <TableCell align="left" padding="checkbox" className={classes.tableCell}>
                
                <Link href="#" color="secondary" >
                <Typography variant="caption" display="inline" className={classes.textContent}>
                <div style={{ width: "40%", minWidth:"10%", maxWidth: "100%", whiteSpace: "nowrap" }}>                
                  <MiddleEllipsis>
                    <span>
                    {row.miner && row.miner.name ? row.miner.name : row.miner.signer}
                    </span>
                  </MiddleEllipsis>
                </div>
                </Typography>
                  </Link>
                  </TableCell>


                <TableCell align="left" padding="checkbox" className={classes.tableCell}>
                <Typography variant="caption" noWrap>
                    <Link href="block/[block]/" as={`transaction/${row.number}`} color="secondary" >
                    {row.transactions && row.transactions.transactionIndex ? row.transactions.transactionIndex.length() : 0}
                    </Link>
                </Typography>
                </TableCell>
                { props.pagination ? 
                <TableCell align="left" padding="checkbox" className={classes.tableCell}>
                <div className={classes.truncareText}> 
                <Typography variant="caption" noWrap>{ numbro(row.gasUsed/1000000000).format("0.0000")} gwei</Typography> 
                </div>
                </TableCell> : null }
                {props.pagination  ? 
                <TableCell align="left" padding="checkbox" className={classes.tableCell}>
                <div className={classes.truncareText}> 
                <Typography variant="caption" noWrap>{row.gasLimit ? row.gasLimit : 'Not available'}</Typography>
                </div>
                </TableCell> : null}
                <TableCell align="left" padding="checkbox">
                <Typography variant="caption" noWrap>{moment.duration(row.timestamp/1000000).humanize()}
                </Typography>
                </TableCell>
              </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            </Paper>
          </TableContainer>
          {console.log(props)}
          {props.pagination ?   
          <TablePagination
          className={"pagination"}
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={blocks.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          /> : null}
          </Paper>
        </Grid>
        </Grid>
  );
}
