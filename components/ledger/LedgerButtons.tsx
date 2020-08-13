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
      minHeight: "2.5rem",
      width: "19.4375rem",
    },
  })
);

type LedgerButtonsProps = { option?: string, variant?: string };


const LedgerButtons = ({ option, variant }: LedgerButtonsProps) => {
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  switch (option) {
    case "Cancel":
      return (
        <div className={classes.root}>
          <Button
            variant="outlined"
            color="secondary"
            className={classes.label}
            fullWidth={true}
            onClick={handleClose}
          >
            <Typography variant="body2" noWrap>
              Cancel
            </Typography>
          </Button>
        </div>
      );
      break;
    case "Confirm":
      return (
        <div className={classes.root}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.label}
            fullWidth={true}
          >
            <Typography variant="body2" noWrap>
              Confirm
            </Typography>
          </Button>
        </div>
      );
      break;
    case "Open Ledger":
      return (
        <div className={classes.root}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.label}
            fullWidth={true}
            onClick={handleClickOpen}
          >
            <Typography variant="body2" noWrap>
              Open Ledger
            </Typography>
          </Button>
        </div>
      );
      break;
    case "Deposit":
      return (
        <div className={classes.root}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.label}
            fullWidth={true}
            onClick={handleClickOpen}
          >
            <Typography variant="body2" noWrap>
              Deposit
            </Typography>
          </Button>
        </div>
      );
    case "Vote":
      return (
        <div className={classes.root}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.label}
            fullWidth={true}
            onClick={handleClickOpen}
          >
            <Typography variant="body2" noWrap>
              Vote
            </Typography>
          </Button>
        </div>
      );
    case "ValidatorGroupVote":
      return (
        <div className={classes.root}>
          <Button
            variant="outlined"
            color="secondary"
            className={classes.label}
            fullWidth={true}
            onClick={handleClickOpen}
          >
            <Typography variant="body2" noWrap>
              Vote
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
            <Typography variant="body2" noWrap>
              {variant}
            </Typography>
          </Button>{" "}
        </div>
      );
  }
}

export default LedgerButtons