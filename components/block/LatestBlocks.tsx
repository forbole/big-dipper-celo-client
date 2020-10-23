import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Link from "../Link";
import Grid from "@material-ui/core/Grid";
import { Divider } from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import moment from "moment";
import Hidden from "@material-ui/core/Hidden";
import PriceCard from "../PriceCard";
import { useQuery } from "@apollo/client";
import TablePagination from "@material-ui/core/TablePagination";
import numbro from "numbro";
import { useRouter } from "next/router";
import MiddleEllipsis from '../misc/MiddleEllipsis'
import ComponentLoader from '../misc/ComponentLoader';
import ErrorMessage from '../misc/ErrorMessage';
import { GET_BLOCK } from '../query/Block'
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import getConfig from 'next/config'

interface Column {
  id: "height" | "validator" | "txs" | "gasUsed" | "gasLimit" | "time";
  label: string;
  align: 'left' | 'right';
}

const columns: Column[] = [
  { id: "height", label: "Height", align: "left" },
  { id: "validator", label: "Validator", align: "left" },
  { id: "txs", label: "Txs", align: "left" },
  { id: "gasUsed", label: "Gas Used", align: "left" },
  { id: "gasLimit", label: "Gas Limit", align: "left" },
  { id: "time", label: "Time", align: "right" },
];

const columns_homepage: Column[] = [
  { id: "height", label: "Height", align: "left" },
  { id: "validator", label: "Validator", align: "left" },
  { id: "txs", label: "Txs", align: "left" },
  { id: "time", label: "Time", align: "right" },
];

const useStyles = makeStyles({
  root: {
    width: "100%",
    padding: "1.5%",
    borderRadius: 4,
    wordWrap: "break-word",
    margin: "none",
    overflow: "hidden",
  },
  box: {
    letterSpacing: "1px",
    padding: "0.6rem",
    display: "block",
    overflow: "hidden",
    whiteSpace: "nowrap",
  },
  link: {
    float: "right",
    textAlign: "right",
  },


  cell: {
    maxHeight: "1rem",
  },

  tableCell: {
    overflow: "auto",
    padding: "0.4rem",
    border: "none"
  },
  table: {
    padding: "0.2rem",
    border: "none"

  },
  inline: {
    paddingLeft: "0rem",
  },
  card: {
    padding: "1rem",
    justifyContent: "center",
    marginBottom: "1rem",
    background: "rgba(255, 255, 255, 1)",
    alignItems: "center",
    borderRadius: 4,
    boxShadow: "0 2px 4px 0 rgba(138, 148, 159, 0.2)",
    "& > *:nth-child(1)": {
      marginRight: "2rem",
    },
    "& > *:nth-child(2)": {
      flex: "auto",
    },
  },



  textContent: {
    textOverflow: "ellipsis",
    overflow: "hidden",
    minWidth: 0,

  },
  truncareText: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    width: "6rem",
    minWidth: "2rem",
    maxWidth: "15rem",
  },


});

moment.relativeTimeThreshold("s", 59);
moment.relativeTimeThreshold("ss", 3);

type LatestBlocksProps = { pagination?: boolean, displayCard?: boolean };


const LatestBlocks = ({ pagination, displayCard }: LatestBlocksProps) => {
  const classes = useStyles();
  const theme = useTheme();
  const largeScreen = useMediaQuery(theme.breakpoints.up('sm'));

  const { publicRuntimeConfig } = getConfig()

  const [page, setPage] = React.useState(publicRuntimeConfig.setPage);
  const [pageSize, setPageSize] = React.useState(publicRuntimeConfig.rowSmall);

  // {
  //   props.pagination === false ?
  //     useEffect(() => {
  //       if (largeScreen) {
  //         setPageSize(publicRuntimeConfig.rowSmall)
  //       }
  //       else {
  //         setPageSize(publicRuntimeConfig.rowXxsmall)
  //       }
  //     }) : null
  // }


  useEffect(() => {
    if (pagination === false) {
      if (largeScreen) {
        setPageSize(publicRuntimeConfig.rowSmall)
      }
      else {
        setPageSize(publicRuntimeConfig.rowXxsmall)
      }
    }
  });


  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPageSize(+event.target.value);
    setPage(publicRuntimeConfig.setPage);
  };

  const { loading, error, data } = useQuery(GET_BLOCK, {
    variables: { pageSize, page },
    pollInterval: 5000,
  });

  if (loading) return <ComponentLoader />
  if (error) return <ErrorMessage message={error.message} />

  return (<>
    <Grid container spacing={2}>
      <Grid item xs={12}>
        {displayCard ? (
          <PriceCard />
        ) : null}
        <Paper className={classes.root}>
          <Typography variant="body1" className={classes.box}>
            Latest Blocks{" "}
            {pagination === false ? (
              <Link href="/blocks" className={classes.link} color="textPrimary">
                view more
              </Link>
            ) : null}
          </Typography>
          <TableContainer >
            <Paper className={classes.tableCell}>
              <Table>
                <TableHead>
                  {pagination ? (
                    <TableRow>
                      {columns.map((column) => (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          className={classes.table}
                          padding="checkbox"
                        >
                          <Typography
                            variant="body2"
                            noWrap
                            className={classes.tableCell}
                          >
                            {column.label}
                          </Typography>
                        </TableCell>
                      ))}
                    </TableRow>
                  ) : (
                      <TableRow>
                        {columns_homepage.map((column) => (
                          <TableCell
                            key={column.id}
                            align={column.align}
                            className={classes.table}
                            padding="checkbox"
                          >
                            <Typography
                              variant="body2"
                              noWrap
                              className={classes.tableCell}
                            >
                              {column.label}
                            </Typography>
                          </TableCell>
                        ))}
                      </TableRow>
                    )}
                </TableHead>
                <TableBody >
                  {data.blocks.blocks.map((row: any, index: number) => {
                    return (
                      <TableRow key={index} style={index % 2 ? { background: "rgba(248, 248, 248, 1)", border: "none" } : { background: "rgb(255,255,255)" }}>
                        <TableCell
                          component="th"
                          scope="row"
                          padding="checkbox"
                          align="left"
                          className={classes.tableCell}
                        >
                          <Typography variant="body2" noWrap>
                            <Link
                              href={`/block/${row.number}`}
                              color="secondary"
                            >
                              {row.number}
                            </Link>
                          </Typography>
                        </TableCell>

                        <TableCell
                          align="left"
                          padding="checkbox"
                          className={classes.tableCell}
                        >
                          {row.miner && row.miner.signer ? (
                            <Link
                              href={`/account/${row.miner.signer}`}
                              color="secondary"
                            >
                              <Typography
                                variant="body2"
                                display="inline"
                                className={classes.textContent}
                                noWrap
                              >
                                <span>
                                  {
                                    ((row.miner && row.miner.name) ||
                                      (row.miner && row.miner.signer)
                                      ? <MiddleEllipsis text={(row.miner.name || row.miner.signer)} />
                                      : null)}
                                </span>
                              </Typography>
                            </Link>
                          ) : null}
                        </TableCell>

                        <TableCell
                          align="left"
                          padding="checkbox"
                          className={classes.tableCell}
                        >
                          <Typography variant="body2" noWrap color="secondary">
                            {row.transactions &&
                              row.transactions
                              ? row.transactions.length
                              : 0}
                          </Typography>
                        </TableCell>
                        {pagination ? (
                          <TableCell
                            align="left"
                            padding="checkbox"
                            className={classes.tableCell}
                          >
                            <div className={classes.truncareText}>
                              <Typography variant="body2" noWrap color="textSecondary">
                                {numbro(row.gasUsed / 1000000000).format(
                                  "0.0000"
                                )}{" "}
                                gwei
                              </Typography>
                            </div>
                          </TableCell>
                        ) : null}
                        {pagination ? (
                          <TableCell
                            align="left"
                            padding="checkbox"
                            className={classes.tableCell}
                          >
                            <div className={classes.truncareText}>
                              <Typography variant="body2" noWrap color="textSecondary">
                                {row.gasLimit ? row.gasLimit : "Not available"}
                              </Typography>
                            </div>
                          </TableCell>
                        ) : null}
                        <TableCell align="right" padding="checkbox" className={classes.tableCell}>
                          <Typography variant="body2" noWrap color="textSecondary">
                            {moment.unix(row.timestamp).fromNow()}
                          </Typography>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </Paper>
          </TableContainer>
          {pagination ? (
            <TablePagination
              className={"pagination"}
              rowsPerPageOptions={[publicRuntimeConfig.rowXxsmall, publicRuntimeConfig.rowXsmall, publicRuntimeConfig.rowSmall, publicRuntimeConfig.rowMedium, publicRuntimeConfig.rowLarge, publicRuntimeConfig.rowXlarge,]}
              component="div"
              count={data.blocks.totalCounts}
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
          ) : null}
        </Paper>
      </Grid>
    </Grid>
  </>
  );
}

export default LatestBlocks;
