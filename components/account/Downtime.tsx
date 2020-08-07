import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from '../Link';
import { makeStyles, } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { DOWNTIME } from '../query/Downtime'
import { GET_ACCOUNT_DETAILS } from '../query/Account'
import { useQuery } from "@apollo/client";
import ComponentLoader from '../misc/ComponentLoader';
import NotAvailable from '../misc/NotAvailable';
import ErrorMessage from '../misc/ErrorMessage';
import moment from "moment";
import MiddleEllipsis from '../misc/MiddleEllipsis'

interface Column {
  id: 'height' | 'proposer' | 'txs' | 'gasUsed' | 'gasLimit' | 'time';
  label: string;
}

const columns: Column[] = [
  { id: 'height', label: 'Height', },
  { id: 'proposer', label: 'Proposer', },
  { id: 'txs', label: 'Txs', },
  { id: 'gasUsed', label: 'Gas Used', },
  { id: 'gasLimit', label: 'Gas Limit', },
  { id: 'time', label: 'Time', },
];

const useStyles = makeStyles(({ spacing }) => {
  return {
    root: {
      width: '100%',
      padding: '0 0.5rem 0.5rem 0.5rem',
      overflowY: 'auto',
      marginTop: "-0.5rem",
    },
    container: {
      borderRadius: 5,
      width: '100%',
      overflowY: 'auto'
    },
    box: {
      letterSpacing: '1px',
      padding: '1rem',
      display: 'inline-flex',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },
    tableCell: {
      overflow: 'auto',
      padding: '0.5rem'
    },
    table: {
      background: '#4D5155',
      padding: '0'
    },
    divider: {
      backgroundColor: "rgba(62, 67, 71, 1)",
    },
    icon: {
      fill: "rgba(255, 255, 255, 0.6)",
    },
  }
});


type DowntimeProps = { address: string };

const Downtime = ({ address }: DowntimeProps) => {
  const rowsOption1 = 10;
  const rowsOption2 = 30;
  const rowsOption3 = 50;

  const classes = useStyles();
  const [page, setPage] = React.useState(1);
  const [pageSize, setPageSize] = React.useState(10)

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPageSize(+event.target.value);
    setPage(1);
  };

  const accountQuery = useQuery(GET_ACCOUNT_DETAILS, {
    variables: { address },
  });

  address = (accountQuery.data && accountQuery.data.account && accountQuery.data.account.accountSummary &&
    accountQuery.data.account.accountSummary.authorizedSigners && accountQuery.data.account.accountSummary.authorizedSigners.validator)
    ? accountQuery.data.account.accountSummary.authorizedSigners.validator : ""


  const { loading, error, data } = useQuery(DOWNTIME, {
    variables: { address, pageSize, page },
    pollInterval: 5000,
  });

  if (loading) return <ComponentLoader />
  if (error) return <ErrorMessage message={error.message} />

  return (
    <Accordion defaultExpanded>
      <AccordionSummary
        expandIcon={<ExpandMoreIcon className={classes.icon} />}
        aria-controls="accountDowntimePanel"
        id="accountDowntimePanel"
      >
        <Typography variant="body1" > Downtime</Typography>
      </AccordionSummary>
      <AccordionDetails className={classes.root}>
        <Grid container className={classes.tableCell}>
          <Divider variant='middle' className={classes.divider} />
          <Grid item xs={12}>
            <TableContainer className={classes.container}>
              <Table >
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align="left"
                        className={classes.table}
                        padding="checkbox"
                      >
                        <Typography variant="body2" noWrap className={classes.tableCell}>{column.label}</Typography>
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data.downtime.blocks.map((row: any, index: number) => {
                    return (
                      <TableRow key={index} >
                        <TableCell component="th" scope="row" align="left" padding="checkbox" className={classes.tableCell} >
                          <Link href="#" color="secondary"  >
                            <Typography variant="body2" noWrap> {row.number}</Typography>
                          </Link>
                        </TableCell>
                        <TableCell align="left" padding="checkbox" className={classes.tableCell}>
                          {row.miner && row.miner.name ?
                            <Link href="#" color="secondary" >
                              <Typography variant="body2" noWrap>{row.miner.name}</Typography>
                            </Link>
                            : <NotAvailable variant="body2" />}
                        </TableCell>
                        <TableCell align="left" padding="checkbox" className={classes.tableCell}>
                          {row.transactions && row.transactions.transactionIndex ?
                            <MiddleEllipsis text={row.transactions.transactionIndex} />
                            : "0"}
                        </TableCell>
                        <TableCell align="left" padding="checkbox" className={classes.tableCell}>
                          {row.gasUsed ?
                            <Typography variant="body2" noWrap>{row.gasUsed}</Typography>
                            : <NotAvailable variant="body2" />}
                        </TableCell>
                        <TableCell align="left" padding="checkbox" className={classes.tableCell}>
                          {row.gasLimit ?
                            <Typography variant="body2" noWrap>{row.gasLimit}</Typography>
                            : <NotAvailable variant="body2" />}
                        </TableCell>
                        <TableCell align="left" padding="checkbox">
                          {row.timestamp ?
                            <Typography variant="body2" noWrap>{moment.unix(row.timestamp).fromNow()}</Typography>
                            : <NotAvailable variant="body2" />}
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
              count={data.downtime.totalCounts}
              rowsPerPage={pageSize}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              backIconButtonProps={{
                'aria-label': 'Previous',
                'disabled': page === 1,
              }}
              nextIconButtonProps={{
                'aria-label': 'Next',
              }}
            />
          </Grid>
        </Grid>
      </AccordionDetails>
    </Accordion>
  );
}

export default Downtime