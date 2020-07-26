import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import Container from "@material-ui/core/Container";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import { Divider } from "@material-ui/core";
import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import Grid from "@material-ui/core/Grid";
import Link from "./Link";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "inline-block",
      justifyContent: "center",
    },
    networkContainer: {
      paddingTop: "0.7rem",
      marginLeft: "4rem",
      marginBottom: "-1rem",
    },
    formControl: {
      minWidth: "4.7rem",
      marginBottom: "2rem",
      //marginRight: "-1rem",
    },
    celoIcon: {
      width: "1.25rem",
      height: "1.25rem",
      marginRight: "0.5rem",
    },

    dotIcon: {
      height: "0.375rem",
      width: "0.375rem",
      verticalAlign: "middle",
      //paddingRight: "0.3rem"
    },
    MuiSelectIcon: {
      marginBottom: "1rem",
    },
    icon: {
      fill: "rgba(255, 255, 255, 0.8)",
      marginTop: "0.1rem",
      marginRight: "-0.2rem",
    },
    divider: {
      backgroundColor: "rgba(62, 67, 71, 1)",
    },
    menuItem: {
      marginTop: "-0.3rem",
      marginBottom: "-0.3rem",
    },
  })
);

const NetworkDropdown = () => {
  const classes = useStyles();
  const [show, setShow] = React.useState<string | number>("");
  const [open, setOpen] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setShow(event.target.value as number);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    // <Container className={classes.networkContainer}>
    <Grid container spacing={1} className={classes.networkContainer}>
      <Grid item xs={12}>
        <FormControl className={classes.formControl}>
          <InputLabel id="network-selection-label">
            <FiberManualRecordIcon color="action" className={classes.dotIcon} />
            <Typography align="center" variant="caption">
              {" "}
              Alfajores
            </Typography>
          </InputLabel>
          <Select
            labelId="network-selection-label"
            id="network-selection-select"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={show}
            onChange={handleChange}
            disableUnderline={true}
            className={classes.MuiSelectIcon}
            classes={{
              icon: classes.icon,
            }}
          >
            <Link href="#" color="textPrimary">
              <MenuItem className={classes.menuItem}>
                <Avatar
                  alt="Celo Alfajores"
                  src="/images/celo-avatar.svg"
                  className={classes.celoIcon}
                />
                <Typography variant="body2">Celo Alfajores</Typography>
              </MenuItem>
            </Link>
            <Divider className={classes.divider} />

            <Link
              href="https://baklava-blockscout.celo-testnet.org/"
              color="textPrimary"
            >
              <MenuItem className={classes.menuItem}>
                <Avatar
                  alt="Celo Baklava"
                  src="/images/celo-avatar.svg"
                  className={classes.celoIcon}
                />
                <Typography variant="body2">Celo Baklava</Typography>
              </MenuItem>
            </Link>
            <Divider className={classes.divider} />
            <Link
              href="https://integration-blockscout.celo-testnet.org/"
              color="textPrimary"
            >
              <MenuItem className={classes.menuItem}>
                <Avatar
                  alt="Celo Integration"
                  src="/images/celo-avatar.svg"
                  className={classes.celoIcon}
                />
                <Typography variant="body2">Celo Integration</Typography>
              </MenuItem>
            </Link>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
    // </Container>
  );
}

export default NetworkDropdown