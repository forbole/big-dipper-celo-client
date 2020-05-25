// import React from 'react';
// import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
// import Typography from '@material-ui/core/Typography';
// import Link from '../components/Link';
// import Card from '@material-ui/core/Card';
// import Divider from '@material-ui/core/Divider';
// import Chips from '../components/Chips';
// import Layout from '../components/Layout';
// import Hidden from '@material-ui/core/Hidden';
// import cx from 'clsx';

// const useStyles = makeStyles(({ spacing }) => {
//     return {
//     root: {
//         padding: '0 0 1rem 0',
//         display: 'block'
//         },
//         leftInline:{
//         display: 'flex',
//         overflow: 'auto',
//         padding: '0 1rem 0 1rem',
//         },
//         rightInline:{
//         display: 'flex',
//         overflow: 'auto',
//         padding: '0 1rem 0 0', 
//         align: 'right' 
//         },
//         link:{
//         float: 'right',
//         textAlign: 'right',
//         },
//         box:{
//         letterSpacing: '1px',
//         padding: '1rem',
//         display: 'block',
//         overflow: 'hidden',
//         whiteSpace: 'nowrap',
//         },
//         chip:{
//         display: 'block',
//         marginLeft: '1rem',
//         padding: '0 0 0.5rem 0',
//         },
//         containers: {
//         display:'inline-block'
//         },
//         card: {
//         padding: '0 0.5rem',
//         justifyContent: 'center',
//         margin: '1rem',
//         background: '#43484C',
//         alignItems: 'center',
//         borderRadius: 5,           
//         },
//         divider:{
//           margin: '0.5rem',
//       },
//       time:{
//         paddingRight: '1rem',
//         float: 'right',
//       },
      // displayCard: {
      //   padding: '1rem',
      //   justifyContent: 'center',
      //   margin: '1rem',
      //   background: '#43484C',
      //   alignItems: 'center',
      //   borderRadius: 5,  
      // }
//         }
// });




// function DisplayCard() {
//   const classes = useStyles();
//   return (
//   <Card className={cx(classes.displayCard)} elevation={0}>
//   <Grid container spacing={1} justify="center" >
//   <Grid item xs={6}  >
//     <Typography align='left' variant="body1" >cGLD Price</Typography>
//     </Grid>
//     <Grid item xs={6}  >
//     <Typography align='right' variant="body1" >$2.8</Typography>
//     </Grid>
//     <Grid item xs={6}  >
//     <Typography align='left' variant="body1" >Market Cap</Typography>
//     </Grid>
//     <Grid item xs={6} >
//     <Typography align='right' variant="body1" >$10,413,896</Typography>
//     </Grid>
//   </Grid>
//   </Card>
//   );
// }

// export default function LatestTransactions() {
//   const classes = useStyles();

//   return (
//     <Layout >
//     <Hidden smUp>
//         <DisplayCard />
//     </Hidden>
//     <Grid container className={classes.root} xs={12}  >
//       <Card className={classes.card}>
//         <Grid container spacing={1} >
//           <Grid item xs={12} >
//           <Typography variant="body1" className={classes.box} >
//               Latest Transactions
//               <Link href="/transactions" className={classes.link} color="secondary">
//     {'view more'}
//   </Link>
//         </Typography> 
//                 <Divider variant='middle' className={classes.divider} />
//           </Grid>
//           </Grid>

//           <Grid container spacing={1} >
//                 <Grid item xs={9} md={10} >

//                   <Typography  variant="caption"  className={classes.leftInline}>
//                   Tx#   <Link href="#" color="secondary"  className={classes.leftInline}>
//                   {" 0xd3b4592hfhtre8w8sd"}
//                  </Link>
//                   </Typography>
//                   </Grid>
//                   <Grid item xs={3} md={2}>
//                   <Typography variant="caption"   className={classes.time}>
//                   1 min ago
//                   </Typography>
//                   </Grid>
  
//                   <Grid item xs={5} md={4} >
//                   <Typography variant="caption"   className={classes.leftInline}>
//                      From  <Link href="#" color="secondary" className={classes.leftInline} >
//                    {" 0xd3b4592hrsthrt"}
//                  </Link>
//                    </Typography>
//                    </Grid>

//                    <Grid item xs={7} md={8}>
//                   <Typography variant="caption"   align='left' className={classes.rightInline}>
//                      To  <Link href="#" color="secondary" className={classes.leftInline} >
//                      {" 0xd3b4592hdsw12dftuytuytrutr6"}
//                  </Link>
//                    </Typography>
//                    </Grid>



//                    <Grid item xs={6} md={10} >
//                    <Typography  variant="caption"  className={classes.chip}>
//                    <Chips value={'Token Transfer'}/>
//                   </Typography>
  
//                 </Grid>
//                    <Grid item xs={6} md={2}>
//                   <Typography variant="caption"   className={classes.time} >
//                     302.140759 cGLD
//                   </Typography>
//                 </Grid>
//           </Grid>
  
//           <Divider variant='middle' className={classes.divider}/>

//           <Grid container spacing={1} >
//                 <Grid item xs={9} md={6} >

//                   <Typography  variant="caption"  className={classes.leftInline}>
//                   Tx#   <Link href="#" color="secondary"  className={classes.leftInline}>
//                   {" 0xd3b4592hfhtre8w8sd"}
//                  </Link>
//                   </Typography>
//                   </Grid>
//                   <Grid item xs={3} md={6}>
//                   <Typography variant="caption"  className={classes.time} >
//                   1 min ago
//                   </Typography>
//                   </Grid>
  
//                   <Grid item xs={5} md={4}>
//                   <Typography variant="caption"   className={classes.leftInline}>
//                      From  <Link href="#" color="secondary" className={classes.leftInline} >
//                    {" 0xd3b4592hrsthrt"}
//                  </Link>
//                    </Typography>
//                    </Grid>

//                    <Grid item xs={7} md={8}>
//                   <Typography variant="caption"   align='left' className={classes.rightInline}>
//                      To  <Link href="#" color="secondary" className={classes.leftInline} >
//                      {" 0xd3b4592hdsw12dftuytuytrutr6"}
//                  </Link>
//                    </Typography>
//                    </Grid>



//                    <Grid item xs={6} md={6} >
//                    <Typography  variant="caption"  className={classes.chip}>
//                    <Chips value={'Token Transfer'}/>
//                   </Typography>
//                 </Grid>
                
//                    <Grid item xs={6} md={6}>
//                   <Typography variant="caption"   className={classes.time}>
//                     302.140759 cGLD
//                   </Typography>
//                 </Grid>
//           </Grid>
  
//           <Divider variant='middle' className={classes.divider} />

//           <Grid container spacing={1} >
//                 <Grid item xs={9} md={6} >

//                   <Typography  variant="caption"  className={classes.leftInline}>
//                   Tx#   <Link href="#" color="secondary"  className={classes.leftInline}>
//                   {" 0xd3b4592hfhtre8w8sd"}
//                  </Link>
//                   </Typography>
//                   </Grid>
//                   <Grid item xs={3} md={6}>
//                   <Typography variant="caption"  className={classes.time} >
//                   1 min ago
//                   </Typography>
//                   </Grid>
  
//                   <Grid item xs={5} md={4}>
//                   <Typography variant="caption"   className={classes.leftInline}>
//                      From  <Link href="#" color="secondary" className={classes.leftInline} >
//                    {" 0xd3b4592hrsthrt"}
//                  </Link>
//                    </Typography>
//                    </Grid>

//                    <Grid item xs={7} md={8}>
//                   <Typography variant="caption"   align='left' className={classes.rightInline}>
//                      To  <Link href="#" color="secondary" className={classes.leftInline} >
//                      {" 0xd3b4592hdsw12dftuytuytrutr6"}
//                  </Link>
//                    </Typography>
//                    </Grid>



//                    <Grid item xs={6} md={6} >
//                    <Typography  variant="caption"  className={classes.chip}>
//                    <Chips value={'Token Transfer'}/>
//                   </Typography>
  
//                 </Grid>
//                    <Grid item xs={6} md={6}>
//                   <Typography variant="caption"  className={classes.time} >
//                     302.140759 cGLD
//                   </Typography>
//                 </Grid>
//           </Grid>


//       </Card>
//     </Grid>
//     </Layout>
//   );
// }



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
import Layout from '../components/Layout';
import cx from 'clsx';
import Card from '@material-ui/core/Card';

import { gql } from "apollo-boost";
import { useQuery } from '@apollo/react-hooks';


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
    data.transactions.transactions.forEach(function (txs: any, i: number) {
      txs[i] = txs;
      console.log(txs)
    })
  )
};




interface Data {
    tx: string;
    from: string;
    to: string;
    time: string;
    chip: string;
    total: string;
}

function createData(tx: string, from: string, to: string, time: string, chip: string, total: string) {
    return { tx, from, to, time, chip, total};
  }

  const rows = [
    createData(' 0xd3b4592hfh..', '0xd3b92hdsdf..', '0xd3bretretretert4592hdsw12df..', '2 mins ago', 'Contract Call', '3023412.22 cGLD' ),
    createData(' 0xd3b4882hfh..', '0x98b45d12df..', '0xd3b4592hdsw12df..', '5 mins ago', 'Token Transfer', '3023412.22 cGLD' ),
    createData(' 0xdsdb4592hfh..', '0xd6hdsw12df..', '0xd3b4592hdsw12df..', '1 mins ago', 'Contract Call', '603412.22 cGLD' ),
    createData(' 0xd3b4592hfh..', '0xd3dsw12df..', '0xd3b4592hdsw12df..', '3 mins ago', 'Contract Call', '7023412.22 cGLD' ),
    createData(' 0xd3b4592hfh..', '0xd3hdsw12df..', '0xd3b4592hdsw12df..', '8 mins ago', 'Contract Call', '5023412.22 cGLD' ),
    createData(' 0xd3b4592hfh..', '0xd392hdsw12df..', '0xd3b4592hdsw12df..', '6 mins ago', 'Contract Call', '8023412.22 cGLD' ),
    createData(' 0xd3b4592hfh..', '0xd392hdsw12df..', '0xd3b4592hdsw12df..', '2 mins ago', 'Contract Call', '24023412.22 cGLD' ),
  ];
  

const useStyles = makeStyles(({ spacing }) => {
    return {
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
            overflow: 'auto',
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
            overflow: 'auto',
            padding: '0 0 0 0.5rem',
          },
          divider:{
            margin: '0.5rem',
        },
        grid:{
          padding:'1.5%'
        },
        displayCard: {
          padding: '1rem',
          justifyContent: 'center',
          margin: '1rem',
          background: '#43484C',
          alignItems: 'center',
          borderRadius: 5,  
        },


  }
});


function DisplayCard() {
  const classes = useStyles();
  return (
  <Card className={cx(classes.displayCard)} elevation={0}>
  <Grid container spacing={1} justify="center" >
  <Grid item xs={6}  >
    <Typography align='left' variant="body1" >cGLD Price</Typography>
    </Grid>
    <Grid item xs={6}  >
    <Typography align='right' variant="body1" >$2.8</Typography>
    </Grid>
    <Grid item xs={6}  >
    <Typography align='left' variant="body1" >Market Cap</Typography>
    </Grid>
    <Grid item xs={6} >
    <Typography align='right' variant="body1" >$10,413,896</Typography>
    </Grid>
  </Grid>
  </Card>
  );
}

export default function AccountTransactions() {

const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(14);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
      <Layout >
          <Grid container className={classes.grid}  >

    <Paper className={classes.root}>
      <Typography variant="body1" className={classes.box} >
            Transactions 
      </Typography>
      <Divider variant='middle' className={classes.divider}/>
    
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
                   <Grid item xs={8}>
  
                    <Typography  variant="caption"  className={classes.leftInline}>
                    Tx#   <Link href="#" color="secondary"  className={classes.leftInline}>
                     {row.blockHash}
                    </Link>
                     </Typography>
                     </Grid>
                     <Grid item xs={4} >
                    <Typography variant="caption"   className={classes.alignRight}>
                    {row.time}
                    </Typography>
                    </Grid>
    
                    <Grid item xs={5} md={4} >
                    <Typography variant="caption"   className={classes.leftInline}>
                       From  <Link href="#" color="secondary" className={classes.txPadding} >
                     {row.from}
                   </Link>
                     </Typography>
                     </Grid>
  
                     <Grid item xs={7} md={8}>
                    <Typography variant="caption"   align='left' className={classes.rightInline}>
                       To  <Link href="#" color="secondary" className={classes.txPadding}>
                       {row.to}
                   </Link>
                     </Typography>
                     </Grid>
  
  
  
                     <Grid item xs={6} >
                     <Typography  variant="caption"  className={classes.chip}>
                     <Chips value={row.chip}/>
                    </Typography>
    
                  </Grid>
                     <Grid item xs={6}>
                    <Typography variant="caption"   className={classes.alignRight} >
                      {row.total}
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
        rowsPerPageOptions={[14, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
    </Grid>
    </Layout>
);
}