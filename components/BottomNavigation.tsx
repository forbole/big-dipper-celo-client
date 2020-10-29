import { Grid, Slide, useScrollTrigger } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import { makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import React from 'react';

import NavLink from './NavLink';

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`bottom-navigation-${index}`}
            aria-labelledby={`bottom-navigation-${index}`}
            {...other}>
            {value === index && (
                <Grid container>
                    <Grid item xs={12}>
                        <Typography>{children}</Typography>
                    </Grid>
                </Grid>
            )}
        </div>
    );
}

function bottomNav(index: any) {
    return {
        id: `bottom-nav-${index}`,
        'aria-controls': `simple-tabpanel-${index}`
    };
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        bottom: 0,
        position: 'fixed'
    },

    tabElement: {
        margin: '-0.1rem',
        display: 'flex'
    }
}));

export default function BottomNavigation(): JSX.Element {
    const classes = useStyles();
    const [value, setValue] = React.useState<number>(0);
    const trigger = useScrollTrigger();

    const handleChange = (event: unknown, newValue: number) => {
        setValue(newValue);
    };

    const theme = useTheme();
    const largeScreen = useMediaQuery(theme.breakpoints.up('md'));

    if (!largeScreen) {
        return (
            <div className={classes.root}>
                <Slide appear={false} direction="up" in={!trigger}>
                    <AppBar position="fixed" color="primary" style={{ top: 'auto', bottom: 0 }}>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            scrollButtons="off"
                            aria-label="Celo Bottom Navigation">
                            <Tab
                                icon={
                                    <NavLink
                                        href="/"
                                        name={
                                            <Tab
                                                icon={
                                                    <img src="/images/home.svg" alt="Dashboard" />
                                                }
                                                aria-label="Dashboard"
                                                className={classes.tabElement}
                                            />
                                        }
                                    />
                                }
                                {...bottomNav(0)}
                            />

                            <Tab
                                icon={
                                    <NavLink
                                        href="/blocks"
                                        name={
                                            <Tab
                                                icon={<img src="/images/blocks.svg" alt="Blocks" />}
                                                aria-label="Blocks"
                                                className={classes.tabElement}
                                            />
                                        }
                                    />
                                }
                                {...bottomNav(1)}
                            />

                            <Tab
                                icon={
                                    <NavLink
                                        href="/transactions"
                                        name={
                                            <Tab
                                                icon={
                                                    <img src="/images/txs.svg" alt="Transactions" />
                                                }
                                                aria-label="Transactions"
                                                className={classes.tabElement}
                                            />
                                        }
                                    />
                                }
                                {...bottomNav(2)}
                            />

                            <Tab
                                icon={
                                    <NavLink
                                        href="/accounts"
                                        name={
                                            <Tab
                                                icon={
                                                    <img
                                                        src="/images/validators.svg"
                                                        alt="Accounts"
                                                    />
                                                }
                                                aria-label="Accounts"
                                                className={classes.tabElement}
                                            />
                                        }
                                    />
                                }
                                {...bottomNav(3)}
                            />

                            <Tab
                                icon={
                                    <NavLink
                                        href="/proposals"
                                        name={
                                            <Tab
                                                icon={
                                                    <img
                                                        src="/images/proposal.svg"
                                                        alt="Proposals"
                                                    />
                                                }
                                                aria-label="Proposals"
                                                className={classes.tabElement}
                                            />
                                        }
                                    />
                                }
                                {...bottomNav(4)}
                            />

                            <Tab
                                icon={
                                    <NavLink
                                        href="/validatorVotes"
                                        name={
                                            <Tab
                                                icon={
                                                    <img
                                                        src="/images/vote.svg"
                                                        alt="Validator Votes"
                                                    />
                                                }
                                                aria-label="ValidatorVotes"
                                                className={classes.tabElement}
                                            />
                                        }
                                    />
                                }
                                {...bottomNav(5)}
                            />
                        </Tabs>
                    </AppBar>
                </Slide>
                <TabPanel value={value} index={0}></TabPanel>
                <TabPanel value={value} index={1}></TabPanel>
                <TabPanel value={value} index={2}></TabPanel>
                <TabPanel value={value} index={3}></TabPanel>
                <TabPanel value={value} index={4}></TabPanel>
                <TabPanel value={value} index={5}></TabPanel>
            </div>
        );
    } else {
        return null as any;
    }
}
