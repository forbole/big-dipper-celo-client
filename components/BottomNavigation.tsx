import React from 'react';
import {
    makeStyles, Theme, createStyles,
    useTheme,
} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import HelpIcon from '@material-ui/icons/Help';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import ThumbDown from '@material-ui/icons/ThumbDown';
import ThumbUp from '@material-ui/icons/ThumbUp';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from "../components/Link";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useScrollTrigger, Slide } from '@material-ui/core';


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
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}


const useStyles = makeStyles((theme: Theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        bottom: 0,
        position: "fixed"
    },

    tabElement: {
        margin: "-0.1rem",
        display: "flex"
    }

}));

export default function BottomNavigation() {
    const classes = useStyles();
    const [value, setValue] = React.useState("");
    const trigger = useScrollTrigger();

    const handleChange = (event: React.ChangeEvent<{}>, newValue: string) => {
        setValue(newValue);
    };

    const theme = useTheme();
    const largeScreen = useMediaQuery(theme.breakpoints.up('md'));

    if (!largeScreen) {
        return (
            <div className={classes.root}>
                <Slide appear={false} direction="up" in={!trigger}>
                    <AppBar position="fixed" color="primary" style={{ top: "auto", bottom: 0 }}>
                        <Tabs
                            value={value}
                            scrollButtons="off"
                            aria-label="Celo Bottom Navigation"
                        >
                            <Link href="/" color="inherit">
                                <Tab icon={<img src="/images/home.svg" />} aria-label="Dashboard" className={classes.tabElement} />
                            </Link>
                            <Link href="/blocks" color="inherit">
                                <Tab icon={<img src="/images/blocks.svg" />} aria-label="Blocks" className={classes.tabElement} />
                            </Link>
                            <Link href="/transactions" color="inherit">
                                <Tab icon={<img src="/images/txs.svg" />} aria-label="Transactions" className={classes.tabElement} />
                            </Link>
                            <Link href="/accounts" color="inherit">
                                <Tab icon={<img src="/images/validators.svg" />} aria-label="Accounts" className={classes.tabElement} />
                            </Link>
                            <Link href="/proposals" color="inherit">
                                <Tab icon={<img src="/images/proposal.svg" />} aria-label="Proposals" className={classes.tabElement} />
                            </Link>
                            <Link href="/validatorVotes" color="inherit">
                                <Tab icon={<img src="/images/vote.svg" />} aria-label="ValidatorVotes" className={classes.tabElement} />
                            </Link>
                        </Tabs>
                    </AppBar>
                </Slide>
            </div>
        );
    }
    else {
        return null
    }
}
