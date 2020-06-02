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
      backgroundColor: "rgba(61, 66, 71, 1)",
    },
    transfer: {
      borderRadius: 5,
      backgroundColor: "rgba(217, 131, 28, 1)",
    },
    success: {
      borderRadius: 5,
      backgroundColor: "rgba(31, 217, 110, 1)",
    },
    pending: {
      borderRadius: 5,
      backgroundColor: "rgba(255, 0, 0, 0.2)",
    },
    delegateAll: {
      borderRadius: 5,
      backgroundColor: "rgba(182, 83, 244, 1)",
    },
    staticCall: {
      borderRadius: 5,
      backgroundColor: "rgba(31, 196, 217, 1)",
    },

    create: {
      borderRadius: 5,
      backgroundColor: "rgba(34, 217, 110, 1)",
    },

    hex: {
      borderRadius: 5,
      //backgroundColor: 'rgba(0, 0, 0, 0.3)',
      border: "solid ",
      borderWidth: "0.5px",
      padding: "0.1rem",
      fontSize: "0.7rem",
    },

    uft8: {
      borderRadius: 5,
      backgroundColor: "rgba(61, 66, 71, 1)",
      border: "solid ",
      borderWidth: "0.5px",
      padding: "0.1rem",
      fontSize: "0.7rem",
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
    case "Hex":
      return (
        <div className={classes.root}>
          <Chip size="small" label="Hex" className={classes.hex} />
        </div>
      );
    case "UTF-8":
      return (
        <div className={classes.root}>
          <Chip size="small" label="UTF-8" className={classes.uft8} />
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
