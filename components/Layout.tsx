import React from "react";
import clsx from "clsx";
import {
  createStyles,
  makeStyles,
  useTheme,
  Theme,
} from "@material-ui/core/styles";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Button from "@material-ui/core/Button";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import SearchBar from "../components/SearchBar";
import NetworkDropdown from "../components/NetworkDropdown";
import Link from "../components/Link";
import PriceCard from "../components/PriceCard";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Ledger from "./ledger/Ledger";
import Footer from "../components/Footer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    list: {
      width: 250,
    },
    fullList: {
      width: "auto",
    },
    logo: {
      flexGrow: 1,
      margin: "0.5rem 0 0 0.5rem",
      noWrap: "true",
    },
    content: {
      flexGrow: 1,
      padding: "auto",
      marginTop: "4rem",
      overflow: "auto",
    },
    icon: {
      minWidth: "1.7rem",
      marginTop: "0.2rem"
    },

    drawerLogo: {
      margin: "0.5rem 1rem",
      maxHeight: "1.5rem",
    },
    menuIcon: {
      marginRight: "-1rem",
      marginBottom: "0.4rem",
    },
    priceCard: {
      display: "flex",
      margin: "-3rem 0rem 1rem 9rem",
    },
  })
);

type Anchor = "top" | "left" | "bottom" | "right";

const Layout = (props: { children: React.ReactNode }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const anchor = "right";

  let loggedIn = true;

  const toggleDrawer = (anchor: Anchor, open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event &&
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor: Anchor) => (
    <div
      className={clsx(classes.list, {
        [classes.fullList]: anchor === "top" || anchor === "bottom",
      })}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <Link href="/">
          <img src="/images/celo-logo.svg" className={classes.drawerLogo} />
        </Link>
        {[
          <Link href="/" color="inherit">
            {" "}
            <Typography variant="body1" color="textPrimary">{"Dashboard"}</Typography>{" "}
          </Link>,
          <Link href="/blocks" color="inherit">
            {" "}
            <Typography variant="body1" color="textPrimary">{"Blocks"}</Typography>{" "}
          </Link>,
          <Link href="/transactions" color="inherit">
            {" "}
            <Typography variant="body1" color="textPrimary">{"Transactions"}</Typography>{" "}
          </Link>,
          <Link href="/accounts" color="inherit">
            {" "}
            <Typography variant="body1" color="textPrimary">{"Accounts"}</Typography>{" "}
          </Link>,
          <Link href="/proposals" color="inherit">
            <Typography variant="body1" color="textPrimary">{"Proposals"}</Typography>{" "}
          </Link>,
          <Link href="/validatorVotes" color="inherit">
            <Typography variant="body1" color="textPrimary">{"Validator Votes"}</Typography>{" "}
          </Link>,
        ].map((text, index) => (
          <ListItem button key={index}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {[
          <Link href="/account" color="inherit">
            <Typography variant="body1" color="textPrimary">
              <ListItemIcon className={classes.icon}>
                <img src="/images/user-login.svg" />
              </ListItemIcon>
              {"Michelle Clark"}
            </Typography>
          </Link>,

          <Link href="/blocks" color="inherit">
            <Typography variant="body1" color="textPrimary">
              <ListItemIcon className={classes.icon}>
                <img src="/images/logout.svg" />
              </ListItemIcon>
              {"Logout"}
            </Typography>
          </Link>,
          <Link href="/transactions" color="inherit">
            <Typography variant="body1" color="textPrimary" id="signin-ledger">
              <ListItemIcon className={classes.icon}>
                <img src="/images/connect-ledger.svg" />
              </ListItemIcon>
              {"Sign In With Ledger"}
            </Typography>{" "}
          </Link>,
        ].map((text, index) => (
          <ListItem button key={index}>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </div>
  );

  return (
    <div>
      <React.Fragment key={anchor}>
        <CssBaseline />
        <AppBar position="fixed">
          <Toolbar>
            <Link href="/" className={classes.logo}>
              <img src="/images/celo-logo.svg" />
            </Link>

            <div>
              <NetworkDropdown />
            </div>
            <Button
              onClick={toggleDrawer(anchor, true)}
              className={classes.menuIcon}
            >
              <img src="/images/menu.svg" />
            </Button>
            <SwipeableDrawer
              anchor={anchor}
              open={state[anchor]}
              onClose={toggleDrawer(anchor, false)}
              onOpen={toggleDrawer(anchor, true)}
            >
              {list(anchor)}
            </SwipeableDrawer>
          </Toolbar>
          <SearchBar />
          <Hidden lgDown>
            <span className={classes.priceCard}>
              <PriceCard />
            </span>
          </Hidden>
        </AppBar>
        <main className={classes.content}>{props.children}</main>
      </React.Fragment>
    </div>
  );
};
export default Layout;
