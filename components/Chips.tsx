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
    contraclCall: {
      borderRadius: 5,
      backgroundColor: "rgba(31, 217, 110, 1)",
      padding: "0",
      fontSize: "	0.875rem",
      width: "6.8rem",
    },
    transfer: {
      borderRadius: 5,
      backgroundColor: "rgba(217, 131, 28, 1)",
      padding: "0",
      fontSize: "	0.875rem",
      width: "6.8rem",
    },
    success: {
      borderRadius: 5,
      backgroundColor: "rgba(31, 217, 110, 1)",
      padding: "0",
      fontSize: "	0.875rem",
      width: "6.8rem",
    },
    pending: {
      borderRadius: 5,
      backgroundColor: "rgba(255, 0, 0, 0.2)",
      padding: "0",
      fontSize: "	0.875rem",
      width: "6.8rem",
    },
    delegateAll: {
      borderRadius: 5,
      backgroundColor: "rgba(182, 83, 244, 1)",
      padding: "0",
      fontSize: "	0.875rem",
      width: "6.8rem",
    },
    staticCall: {
      borderRadius: 5,
      backgroundColor: "rgba(31, 196, 217, 1)",
      padding: "0",
      fontSize: "	0.875rem",
      width: "6.8rem",
    },

    create: {
      borderRadius: 5,
      backgroundColor: "rgba(34, 217, 110, 1)",
      padding: "0",
      fontSize: "	0.875rem",
      width: "6.8rem",
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
  })
);

export default function Chips(props: any) {
  const classes = useStyles();

  switch (props.value) {
    case "Token Transfer":
      return (
        <div className={classes.root}>
          <Chip
            size="small"
            label="Token Transfer"
            className={classes.transfer}
          />
        </div>
      );
    case "Contract Call":
      return (
        <div className={classes.root}>
          <Chip
            size="small"
            label="Contract Call"
            className={classes.contraclCall}
          />
        </div>
      );
    case "Success":
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
    case "Pending":
      return (
        <div className={classes.root}>
          <Chip size="small" label="Pending" className={classes.pending} />
        </div>
      );

    case "Delegate All":
      return (
        <div className={classes.root}>
          <Chip
            size="small"
            label="Delegate All"
            className={classes.delegateAll}
          />
        </div>
      );
    case "Static Call":
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
          <Chip size="small" label={props.value} />
        </div>
      );
  }
}
