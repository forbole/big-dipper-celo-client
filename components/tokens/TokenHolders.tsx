import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '../Link';
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
import Chips from '../Chips';
import Divider from '@material-ui/core/Divider';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

interface Data {
  address: string;
  value: string;
  percentage: string;
}

function createData(address: string, value: string, percentage: string) {
  return { address, value, percentage };
}

const rows = [
  createData(' 0x21a641c9745c7cb75528f3df51', '3023412.22 cUSD', '19.8760%'),
  createData(' 0xe4044267267071bb26b8bbd42afd911927ed6056', '3023412.22 cUSD', '2.4226%'),
  createData(' 0x3e84a81931335467900520c8104250f07b6e14ca20ef1', '603412.22 cUSD', '0.0121%'),
  createData(' 0x21a641c9745c79b2dea2c40ee037c037c69299ca718c3', '7023412.22 cUSD', '0.0157%'),
  createData(' 0xa7b6649b6f86a1f154c79c67fe862473b661552df4231d', '5023412.22 cUSD', '0.0088%'),
  createData(' 0x3e84a81931330520c8104250f07b6e14ca20ef11', '8023412.22 cUSD', '0.514%'),
  createData(' 0x21a641c9745c40ee037c037c69299ca718c3', '24023412.22 cUSD', '0.1478%'),
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

    leftInline: {
      display: 'flex',
      overflow: 'auto',
      padding: '0 0 0 1rem',
    },
    rightInline: {
      display: 'flex',
      overflow: 'auto',
      padding: '0 1rem 0 0',
      align: 'right'
    },

    box: {
      letterSpacing: '1px',
      padding: '1rem',
      display: 'block',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },


    alignRight: {
      paddingRight: '1rem',
      float: 'right',
      overflow: 'visible',
      textOverflow: 'ellipsis',
      display: 'inline-block'

    },

    address: {
      //   width: '25%',
      //   whiteSpace: 'nowrap',
      //   overflow: 'hidden',
      //   textOverflow: 'ellipsis'
      display: 'flex'
    },


    truncateAlignRight: {
      display: 'block',
      whiteSpace: 'nowrap',
      //paddingRight: '1rem',
      float: 'right',
      overflow: 'hidden',
      // textOverflow: 'ellipsis',
      //width: '70%',
      //MaxWidth: '100rem',
      padding: '0 1rem',
    },

    divider: {
      backgroundColor: "rgba(62, 67, 71, 1)",
    }


  }
});




const TokenHolders = () => {
  const rowsOption1 = 5;
  const rowsOption2 = 10;
  const rowsOption3 = 30;



  const classes = useStyles();
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(5)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageSize(+event.target.value);
    setPage(0);
  };

  return (

    <Accordion>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon />}
        aria-controls="tokenHoldersPanel"
        id="tokenHoldersPanel"
      >
        <Typography variant="body1" > Token Holders {"(6148)"}</Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.root}>
        <Grid container >
          <Divider variant='middle' className={classes.divider} />
          <TableContainer className={classes.container}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
              </TableHead>
              <TableBody>
                {rows.map((row: any, index: number) => {
                  return (
                    <TableRow key={index} >
                      <TableCell component="th" scope="row" padding="checkbox"  >
                        <Grid container spacing={1} style={{ padding: '0.5rem 0', }}>
                          <Grid item xs={12}>
                            <Link href="#" color="secondary" >
                              <Typography variant="body2" className={classes.truncateAlignRight} >
                                {row.address}
                              </Typography> </Link>
                          </Grid>
                          <Grid item xs={12} >
                            <Typography variant="body2" className={classes.alignRight}>
                              {row.value}
                            </Typography>
                          </Grid>

                          <Grid item xs={12} >
                            <Typography variant="body2" color="textSecondary" className={classes.alignRight}>
                              {row.percentage}
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
            rowsPerPageOptions={[rowsOption1, rowsOption2, rowsOption3]}
            component="div"
            count={rows.length}
            rowsPerPage={pageSize}
            page={page}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
          />

        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}

export default TokenHolders