/* eslint-disable react/jsx-key */
import AppBar from '@material-ui/core/AppBar';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import clsx from 'clsx';
import React from 'react';

// import NetworkDropdown from '../components/NetworkDropdown';
// import SearchBar from '../components/SearchBar';
import Login from './ledger/Login';
import NavLink from './NavLink';
import SearchBar from './SearchBar';

const drawerWidth = 220;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex'
        },
        appBar: {
            boxShadow: 'none',
            position: 'absolute',
            textAlign: 'right',
            padding: '1rem 1.7rem 0.5rem 1rem'
        },
        menuButton: {
            marginLeft: '0.3rem'
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap'
        },
        drawerOpen: {
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen
            })
        },
        drawerClose: {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
            overflowX: 'hidden',
            width: theme.spacing(7) + 1,
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9) + 1
            }
        },
        content: {
            [theme.breakpoints.down('sm')]: {
                marginTop: '10rem'
            },
            [theme.breakpoints.up('md')]: {
                marginTop: '6.5rem'
            },
            paddingBottom: '1rem'
        },
        icon: {
            paddingRight: '2rem',
            paddingLeft: '0.5rem'
            // marginTop: '0.3rem'
        },
        loginButton: {
            background: 'rgba(153, 153, 153, 1)',
            borderRadius: 5,
            padding: '0.1rem',
            verticalAlign: 'middle'
        },

        login: {
            marginTop: '0.8rem'
        },
        toolbarItems: {
            verticalAlign: 'middle',
            marginTop: '0.95rem',
            marginBottom: '0.5rem',
            textAlign: 'right'
        },

        searchBar: {
            textAlign: 'right',
            [theme.breakpoints.down('sm')]: {
                margin: '-0.5rem 0rem 0rem 0.5rem'
            },
            [theme.breakpoints.up('md')]: {
                marginLeft: '-0.5rem'
            }
        },
        celoIcon: {
            textAlign: 'left',
            marginTop: '-0.325rem'
        },

        listItem: {
            display: 'inline-flex'
        },

        listItemTitle: {
            paddingTop: '0.5rem'
        },

        networkDropdown: {
            [theme.breakpoints.up('lg')]: {
                float: 'left'
            },
            [theme.breakpoints.down('md')]: {
                float: 'right'
            }
        }
    })
);

const Layout = (props: { children: React.ReactNode }): JSX.Element => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const theme = useTheme();
    const largeScreen = useMediaQuery(theme.breakpoints.up('md'));

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <AppBar position="fixed" className={clsx(classes.appBar)}>
                <Grid container spacing={1} className={classes.toolbarItems}>
                    <Hidden smDown>
                        <Grid item md={4}>
                            {''}
                        </Grid>
                    </Hidden>

                    <Hidden smDown>
                        <Grid item md={5} className={classes.searchBar}>
                            <SearchBar />
                        </Grid>
                    </Hidden>

                    <Hidden mdUp>
                        <Grid item xs={3} className={classes.celoIcon}>
                            <IconButton color="inherit" aria-label="Celo Dashboard">
                                <img src="/images/celo-logo.svg" alt="Celo Dashboard" />
                            </IconButton>
                        </Grid>
                    </Hidden>
                    {/* <Grid item xs={3} sm={5} md={2} className={classes.networkDropdown}>
                        <NetworkDropdown />
                    </Grid> */}

                    {/* <Grid item xs={5} sm={3} md={2} lg={1} className={classes.login}>
                        <Login />
                    </Grid> */}
                    <Grid item xs={9} md={3} className={classes.login}>
                        <Login />
                    </Grid>

                    <Hidden mdUp>
                        <Grid item xs={12} className={classes.searchBar}>
                            <SearchBar />
                        </Grid>
                    </Hidden>
                </Grid>
            </AppBar>
            {largeScreen ? (
                <>
                    <Drawer
                        variant="permanent"
                        className={clsx(classes.drawer, {
                            [classes.drawerOpen]: open,
                            [classes.drawerClose]: !open
                        })}
                        classes={{
                            paper: clsx({
                                [classes.drawerOpen]: open,
                                [classes.drawerClose]: !open
                            })
                        }}>
                        {!open ? (
                            <IconButton
                                color="inherit"
                                aria-label="Open Celo Drawer"
                                onClick={handleDrawerOpen}
                                edge="start"
                                className={clsx(classes.menuButton)}>
                                {<img src="/images/celo-icon.svg" alt="Open Celo Drawer" />}
                            </IconButton>
                        ) : (
                            <IconButton
                                color="inherit"
                                aria-label="Close Celo Drawer"
                                onClick={handleDrawerClose}
                                edge="start"
                                className={clsx(classes.menuButton)}>
                                {<img src="/images/celo-logo.svg" alt="Close Celo Drawer" />}
                            </IconButton>
                        )}
                        <Divider />

                        <List>
                            {[
                                <NavLink
                                    href="/"
                                    name={
                                        <>
                                            <ListItemIcon className={classes.icon}>
                                                <img src="/images/home.svg" alt="Dashboard" />
                                            </ListItemIcon>
                                            <Typography
                                                variant="body1"
                                                color="textSecondary"
                                                className={classes.listItemTitle}>
                                                Dashboard
                                            </Typography>
                                        </>
                                    }
                                    className={classes.listItem}
                                />,
                                <NavLink
                                    href="/blocks"
                                    name={
                                        <>
                                            <ListItemIcon className={classes.icon}>
                                                <img src="/images/blocks.svg" alt="Blocks" />
                                            </ListItemIcon>
                                            <Typography
                                                variant="body1"
                                                color="textSecondary"
                                                className={classes.listItemTitle}>
                                                Blocks
                                            </Typography>
                                        </>
                                    }
                                    className={classes.listItem}
                                />,
                                <NavLink
                                    href="/transactions"
                                    name={
                                        <>
                                            <ListItemIcon className={classes.icon}>
                                                <img src="/images/txs.svg" alt="Transactions" />
                                            </ListItemIcon>
                                            <Typography
                                                variant="body1"
                                                color="textSecondary"
                                                className={classes.listItemTitle}>
                                                Transactions
                                            </Typography>
                                        </>
                                    }
                                    className={classes.listItem}
                                />,
                                <NavLink
                                    href="/accounts"
                                    name={
                                        <>
                                            <ListItemIcon className={classes.icon}>
                                                <img src="/images/validators.svg" alt="Accounts" />
                                            </ListItemIcon>
                                            <Typography
                                                variant="body1"
                                                color="textSecondary"
                                                className={classes.listItemTitle}>
                                                Accounts
                                            </Typography>
                                        </>
                                    }
                                    className={classes.listItem}
                                />,
                                <NavLink
                                    href="/proposals"
                                    name={
                                        <>
                                            <ListItemIcon className={classes.icon}>
                                                <img src="/images/proposal.svg" alt="Proposals" />
                                            </ListItemIcon>
                                            <Typography
                                                variant="body1"
                                                color="textSecondary"
                                                className={classes.listItemTitle}>
                                                Proposals
                                            </Typography>
                                        </>
                                    }
                                    className={classes.listItem}
                                />,
                                <NavLink
                                    href="/validatorVotes"
                                    name={
                                        <>
                                            <ListItemIcon className={classes.icon}>
                                                <img src="/images/vote.svg" alt="Validator Votes" />
                                            </ListItemIcon>
                                            <Typography
                                                variant="body1"
                                                color="textSecondary"
                                                className={classes.listItemTitle}>
                                                Validator Votes
                                            </Typography>
                                        </>
                                    }
                                    className={classes.listItem}
                                />
                            ].map((text, index) => (
                                <ListItem button key={index}>
                                    <ListItemText primary={text} />
                                </ListItem>
                            ))}
                        </List>
                    </Drawer>
                </>
            ) : null}
            <Container maxWidth="xl" className={classes.content}>
                <div>{props.children}</div>
            </Container>
        </div>
    );
};
export default Layout;
