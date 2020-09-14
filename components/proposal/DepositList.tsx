import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "../Link";
import {
  makeStyles,
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";

interface Column {
  id: "depositor" | "amount" | "time";
  label: string;
  align: 'left' | 'right';
}

const columns: Column[] = [
  { id: "depositor", label: "Depositor", align: "left" },
  { id: "amount", label: "Amount", align: "right" },
  { id: "time", label: "Time", align: "right" },
];


function createData(depositor: string, amount: string, time: string) {
  return { depositor, amount, time };
}

const rows = [
  createData("Michelle Clark", "59.0096541 CELO", "April 22 2020"),
  createData("Rachel Hugh", "22 CELO", "April 22 2020"),
  createData("Natasha", "565646 CELO", "April 22 2020"),
  createData("Rith Jackson", "24755 CELO", "April 22 2020"),
  createData("Kelly Mendex", "65894856 CELO", "April 22 2020"),
  createData("Marilym Ford", "2478 CELO", "April 22 2020"),
  createData("Fionna Wells", "976.14755 CELO", "April 22 2020"),
  createData("Sandra Jones", "18949.18115615 CELO", "April 22 2020"),
  createData("Beverly", "78.145521 CELO", "April 22 2020"),
  createData("Sonia Fone", "99.147 CELO", "April 22 2020"),
  createData("1087144", "472.31111 CELO", "April 22 2020"),
  createData("1087143", "887 CELO", "April 22 2020"),
];

const useStyles = makeStyles(() => {
  return {
    root: {
      width: "100%",
      padding: "0.5rem",
      borderRadius: 5,
      overflowY: "auto",
    },
    container: {
      borderRadius: 5,
      width: "100%",
      overflow: "auto",

    },
    box: {
      letterSpacing: "1px",
      padding: "1rem",
      display: "inline-flex",
      overflow: "hidden",
      whiteSpace: "nowrap",
    },
    time: {
      padding: "0.01em",
      margin: "0.5em",
    },
    tableCell: {
      overflow: "auto",
      padding: "0.5rem",
    },
    table: {
      background: "#4D5155",
      padding: "0",
    },
    paper: {
      padding: "1rem",
      width: "100%",
    },
    headerLabel: {
      padding: "0 0 1rem 0.5rem"
    },
    divider: {
      backgroundColor: "rgba(62, 67, 71, 1)",
    }
  };
});

const DepositList = () => {
  const classes = useStyles();

  return (
    <Grid container spacing={1} justify="center" className={classes.container}>
      <Paper className={classes.paper}>
        <TableContainer>
          <Typography
            color="textSecondary"
            variant="subtitle1"
            className={classes.headerLabel}
          >
            Deposit (200 CELO)
          </Typography>

          <Divider variant="middle" className={classes.divider} />
          <Table size="medium">
            <TableHead>
              <TableRow>
                {columns.map((column: any, index: number) => (
                  <TableCell
                    key={index}
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
            </TableHead>
            <TableBody>
              {rows.map((row: any, index: number) => {
                return (
                  <TableRow key={index}>
                    <TableCell
                      component="th"
                      scope="row"
                      padding="checkbox"
                      align="left"
                      className={classes.tableCell}
                    >
                      <Link href="#" color="secondary">
                        <Typography variant="body2" noWrap>
                          {" "}
                          {row.depositor}
                        </Typography>
                      </Link>
                    </TableCell>
                    <TableCell
                      align="right"
                      padding="checkbox"
                      className={classes.tableCell}
                    >
                      <Typography variant="body2" noWrap>
                        {row.amount}
                      </Typography>
                    </TableCell>
                    <TableCell
                      align="right"
                      padding="checkbox"
                      className={classes.tableCell}
                    >
                      <Typography variant="body2" noWrap>
                        {row.time}
                      </Typography>
                    </TableCell>
                    {/* <TableCell
                        align="left"
                        padding="checkbox"
                        className={classes.tableCell}
                      >
                        <Typography variant="body2" noWrap>
                          {row.gasUsed}
                        </Typography>
                      </TableCell>
                      <TableCell
                        align="left"
                        padding="checkbox"
                        className={classes.tableCell}
                      >
                        <Typography variant="body2" noWrap>
                          {row.gasLimit}
                        </Typography>
                      </TableCell>
                      <TableCell align="left" padding="checkbox">
                        <Typography variant="body2" noWrap>
                          {row.time}
                        </Typography>
                      </TableCell> */}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>

      </Paper>
    </Grid>
  );
}

export default DepositList