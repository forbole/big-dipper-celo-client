import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      justifyContent: "center",
      flexWrap: "wrap",
      padding: "0.1rem",
    },
    contractCall: {
      borderRadius: 5,
      backgroundColor: "rgba(31, 217, 110, 1)",
      padding: "0",
      fontSize: "	0.875rem",
      width: "7rem",
    },
    transfer: {
      borderRadius: 5,
      backgroundColor: "rgba(217, 131, 28, 1)",
      padding: "0",
      fontSize: "	0.875rem",
      width: "7rem",
    },
    success: {
      borderRadius: 5,
      backgroundColor: "rgba(31, 217, 110, 1)",
      padding: "0",
      fontSize: "	0.875rem",
      width: "7rem",
    },
    pending: {
      borderRadius: 5,
      backgroundColor: "rgba(255, 0, 0, 0.2)",
      padding: "0",
      fontSize: "	0.875rem",
      width: "7rem",
    },
    exchange: {
      borderRadius: 5,
      backgroundColor: "rgba(182, 83, 244, 1)",
      padding: "0",
      fontSize: "	0.875rem",
      width: "7rem",
    },
    report: {
      borderRadius: 5,
      backgroundColor: "rgba(240, 65, 85, 1)",
      padding: "0",
      fontSize: "	0.875rem",
      width: "7rem",
    },
    staticCall: {
      borderRadius: 5,
      backgroundColor: "rgba(31, 196, 217, 1)",
      padding: "0",
      fontSize: "	0.875rem",
      width: "7rem",
    },

    create: {
      borderRadius: 5,
      backgroundColor: "rgba(34, 217, 110, 1)",
      padding: "0",
      fontSize: "	0.875rem",
      width: "7rem",
    },

    passed: {
      borderRadius: 4,
      backgroundColor: "rgba(34, 217, 110, 1)",
      padding: "0",
      fontSize: "	0.875rem",
      width: "4.7rem",
    },
    rejected: {
      borderRadius: 4,
      backgroundColor: "rgba(211, 58, 58, 1)",
      padding: "0",
      fontSize: "	0.875rem",
      width: "4.7rem",
    },
    removed: {
      borderRadius: 4,
      backgroundColor: "rgba(217, 131, 31, 1)",
      padding: "0",
      fontSize: "	0.875rem",
      width: "4.7rem",
    },

    deposit: {
      borderRadius: 5,
      backgroundColor: "rgba(67, 72, 76, 1)",
      border: "solid 1px rgba(255, 255, 255, 0.6)",
      padding: "0.1rem",
      fontSize: "	0.875rem",
      width: "4.7rem",
    },
    vote: {
      borderRadius: 4,
      backgroundColor: "rgba(67, 72, 76, 1)",
      border: "solid 1px rgba(255, 255, 255, 0.6)",
      padding: "0",
      fontSize: "	0.875rem",
      width: "4.7rem",
    },

    default: {
      borderRadius: 5,
      backgroundColor: "rgba(30,117,217,1)",
      padding: "0",
      fontSize: "	0.875rem",
      width: "7rem",
      textTransform: 'capitalize'
    },
  })
);

const Chips = (props: any) => {
  const classes = useStyles();

  switch (props.value) {
    case "tokenTransfer":
      return (
        <div className={classes.root}>
          <Chip
            size="small"
            label="Token Transfer"
            className={classes.transfer}
          />
        </div>
      );
    case "contractCall":
      return (
        <div className={classes.root}>
          <Chip
            size="small"
            label="Contract Call"
            className={classes.contractCall}
          />
        </div>
      );
    case "success":
      return (
        <div className={classes.root}>
          <Chip
            size="small"
            icon={<CheckCircleIcon />}
            label="Success"
            className={classes.success}
          />
        </div>
      );
    case "pending":
      return (
        <div className={classes.root}>
          <Chip size="small" label="Pending" className={classes.pending} />
        </div>
      );

    case "exchange":
      return (
        <div className={classes.root}>
          <Chip
            size="small"
            label="Exchange"
            className={classes.exchange}
          />
        </div>
      );

    case "report":
      return (
        <div className={classes.root}>
          <Chip
            size="small"
            label="Report"
            className={classes.report}
          />
        </div>
      );
    case "staticCall":
      return (
        <div className={classes.root}>
          <Chip
            size="small"
            label="Static Call"
            className={classes.staticCall}
          />
        </div>
      );
    case "Create":
      return (
        <div className={classes.root}>
          <Chip size="small" label="Create" className={classes.create} />
        </div>
      );
    case "Passed":
      return (
        <div className={classes.root}>
          <Chip size="small" label="Passed" className={classes.passed} />
        </div>
      );
    case "Rejected":
      return (
        <div className={classes.root}>
          <Chip size="small" label="Rejected" className={classes.rejected} />
        </div>
      );
    case "Removed":
      return (
        <div className={classes.root}>
          <Chip size="small" label="Removed" className={classes.removed} />
        </div>
      );
    case "Deposit":
      return (
        <div className={classes.root}>
          <Chip size="small" label="Deposit" className={classes.deposit} />
        </div>
      );
    case "Vote":
      return (
        <div className={classes.root}>
          <Chip size="small" label="Vote" className={classes.vote} />
        </div>
      );
    default:
      return (
        <div className={classes.root}>
          <Chip size="small" label={(props.value)} className={classes.default} />
        </div>
      );
  }
}

export default Chips