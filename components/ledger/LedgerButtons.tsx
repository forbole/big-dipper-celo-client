import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      justifyContent: "center",
      flexWrap: "wrap",
      padding: "0.1rem",
      textTransform: "none",
    },

    label: {
      textTransform: "none",
      borderRadius: 4,
    },
  })
);

export default function LedgerButtons(props: any) {
  const classes = useStyles();

  switch (props.variant) {
    case "Cancel":
      return (
        <div className={classes.root}>
          <Button
            variant="outlined"
            color="secondary"
            className={classes.label}
            fullWidth={true}
          >
            <Typography variant="caption" noWrap >
              Cancel
            </Typography>
          </Button>
        </div>
      );
    case "Confirm":
      return (
        <div className={classes.root}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.label}
            fullWidth={true}
          >
            <Typography variant="caption" noWrap >
              Confirm
            </Typography>
          </Button>
        </div>
      );
    default:
      return (
        <div className={classes.root}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.label}
            fullWidth={true}
          >
            <Typography variant="caption" noWrap>
              {props.variant}
            </Typography>
          </Button>{" "}
        </div>
      );
  }
}
