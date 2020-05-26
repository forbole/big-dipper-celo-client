import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '../components/Link';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import Chips from '../components/Chips';
import Divider from '@material-ui/core/Divider';
import { gql } from "apollo-boost";
import { useQuery } from '@apollo/react-hooks';
import MiddleEllipsis from "react-middle-ellipsis";

const GET_TX = gql`
 {
  transactions{
    transactions{
    from{
          _id

          address
          balance
    }
    to{
          _id
          address
          balance
    }
    value
    blockHash
    timestamp
  }
}
}
`;

const txs: any[] = [];

function getTransactions() {
  const { loading, error, data } = useQuery(GET_TX, {
    pollInterval: 5000,
  });
  if (loading) return 'Loading...';
  if (error) return `Error! ${error.message}`;

  return (
    data.transactions.transactions.forEach(function (tx: any, i: number) {
      txs[i] = tx;
     // console.log(txs)
    })
  )
};



// interface Data {
//     tx: string;
//     from: string;
//     to: string;
//     time: string;
//     total: string;
// }

console.log(txs)
const useStyles = makeStyles({
          root: {
            borderRadius: 5,
            padding: '0',
            width: '100%',
          },
          container: {
            borderRadius: 5,
            width: '100%'
          },

          leftInline:{
            display: 'flex',
            overflow: 'hidden',
            padding: '0 0 0 1rem',

            },
          rightInline:{
            display: 'flex',
            overflow: 'auto',
            padding: '0 1rem 0 0', 
            align: 'right' 
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

          alignRight:{
            paddingRight: '1rem',
            float: 'right',
          },

          txPadding:{
            display: 'flex',
            //overflow: 'auto',
            padding: '0 0 0 0.5rem',
          },
          divider:{
            margin: '0.5rem',
        },
        link:{
          float: 'right',
          },

        truncateText:{
          overflow: "hidden", 
          textOverflow: "clip ellipsis clip 0 3ch", 
          minWidth: '1rem', 
          maxWidth: '40rem',
        },

  
});




export default function LatestTransactions(props: any) {
getTransactions()
const classes = useStyles();
const [page, setPage] = React.useState(0);
const [rowsPerPage, setRowsPerPage] = React.useState(5);


const handleChangePage = (event: unknown, newPage: number) => {
  setPage(newPage);
};

const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
  setRowsPerPage(+event.target.value);
  setPage(0);
};

  return (
    <Paper className={classes.root}>
  <Typography variant="body1" className={classes.box} >
            Latest Transactions {!props.pagination ?  <Link href="/transactions" className={classes.link} color="secondary">
    {'view more'}
  </Link> : null }
  </Typography>
  <Divider variant='middle' className={classes.divider} />
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
          </TableHead>
          <TableBody>
            {txs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow key={row.blockHash} >
            <TableCell component="th" scope="row" padding="checkbox"  >
            <Grid container spacing={1} style={{padding: '0.5rem 0'}}>
                   <Grid item xs={8}  >
                   
                    <Typography  variant="caption"  className={classes.leftInline} noWrap>
                    Tx#   <Link href="transaction/[transaction]/" as={`transaction/${row.blockHash}`} color="secondary" className={classes.leftInline}>
                    <div style={{ width: "60%", minWidth:"40%", maxWidth: "100%", whiteSpace: "nowrap" }}>                
                      <MiddleEllipsis>
                        <span>
                        {row.blockHash}
                        </span>
                      </MiddleEllipsis>
                    </div> 
                    </Link>
                     </Typography>
                     </Grid>
                     <Grid item xs={4}>
                    <Typography variant="caption"   className={classes.alignRight} noWrap>
                          {row.timestamp}
                    </Typography>
                    </Grid>
    
                    <Grid item xs={5} md={4} >
                    <Typography variant="caption"   className={classes.leftInline} noWrap>
                       From  <Link href="#" color="secondary" className={classes.txPadding} >
                     <div style={{ width: "60%", minWidth:"20%", maxWidth: "100%", whiteSpace: "nowrap" }}>                
                      <MiddleEllipsis>
                        <span>
                        {row.from && row.from.address ? row.from.address : null}
                        </span>
                      </MiddleEllipsis>
                    </div> 
                   </Link>
                     </Typography>
                     </Grid>
  
                     <Grid item xs={7} md={8}>
                    <Typography variant="caption"   align='left' className={classes.rightInline} noWrap>
                       To  
                        
                        <Link href="#" color="secondary" className={classes.txPadding}>
                        <div style={{ width: "60%", minWidth:"20%", maxWidth: "100%", whiteSpace: "nowrap" }}>     
                        <MiddleEllipsis>           
                          <span>
                            {row.to && row.to.address ? row.to.address : null}
                          </span>
                          </MiddleEllipsis>
                          </div>
                          </Link>
                     </Typography>
                     </Grid>
  
  
  
                     <Grid item xs={6}  >
                     <Typography  variant="caption"  className={classes.chip}>
                      {row.value === 0 ? 
                       <Chips value='Contract Call'/>: 
                       <Chips value='Token Transfer'/>}
                     </Typography>
                   </Grid> 
                     <Grid item xs={6} >
                    <Typography variant="caption"   className={classes.alignRight} >
                      {row.timestamp}
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
      {props.pagination ?   
      <TablePagination
          className={"pagination"}
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={txs.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          /> : null}
    </Paper>
);
}