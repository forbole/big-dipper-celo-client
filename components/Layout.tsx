import React, { useEffect } from "react";
import clsx from "clsx";
import {
	createStyles,
	makeStyles,
	useTheme,
	Theme,
} from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import CssBaseline from "@material-ui/core/CssBaseline";
import SearchBar from "../components/SearchBar";
import NetworkDropdown from "../components/NetworkDropdown";
import Link from "../components/Link";
import Grid from "@material-ui/core/Grid";
import Hidden from "@material-ui/core/Hidden";
import Container from '@material-ui/core/Container';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Drawer from '@material-ui/core/Drawer';
import IconButton from '@material-ui/core/IconButton';
import SignInMessage from './ledger/Login'
import Dialog from "@material-ui/core/Dialog";


const drawerWidth = 220;

const useStyles = makeStyles((theme: Theme) =>
	createStyles({
		root: {
			display: 'flex',
		},
		appBar: {
			boxShadow: "none",
			position: "absolute",
			textAlign: "right"
		},
		menuButton: {
			marginLeft: "0.3rem"
		},
		drawer: {
			width: drawerWidth,
			flexShrink: 0,
			whiteSpace: 'nowrap',
		},
		drawerOpen: {
			width: drawerWidth,
			transition: theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.enteringScreen,
			}),
		},
		drawerClose: {
			transition: theme.transitions.create('width', {
				easing: theme.transitions.easing.sharp,
				duration: theme.transitions.duration.leavingScreen,
			}),
			overflowX: 'hidden',
			width: theme.spacing(7) + 1,
			[theme.breakpoints.up('sm')]: {
				width: theme.spacing(9) + 1,
			},
		},
		content: {
			[theme.breakpoints.down('sm')]: {
				marginTop: "8.5rem"
			},
			[theme.breakpoints.up('md')]: {
				marginTop: "5.5rem"
			},
			paddingBottom: "1rem"

		},
		icon: {
			paddingRight: "2rem",
			paddingLeft: "0.5rem",
			marginTop: "0.3rem"
		},

		login: {
			marginTop: "0.8rem",
			// marginLeft: "-1rem",
			[theme.breakpoints.up('sm')]: {
				textAlign: "center",
			},


		},
		toolbarItems: {
			verticalAlign: "middle",
			marginTop: "0.95rem",
			marginBottom: "0.5rem",
			textAlign: "right"
		},

		searchBar: {
			textAlign: "right",
			[theme.breakpoints.down('sm')]: {
				margin: "-0.5rem 1rem 0rem 1rem",
			},
			[theme.breakpoints.up('md')]: {
				marginLeft: "-0.5rem",
			},

		},
		celoIcon: {
			textAlign: "left",
			marginTop: "-0.325rem",
			marginLeft: "0.5rem"
		},

		networkDropdown: {
			[theme.breakpoints.up('lg')]: {
				float: "left"
			},
			[theme.breakpoints.down('md')]: {
				float: "right"
			},
		}


	}),
);




const Layout = (props: { children: React.ReactNode }) => {
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
			<CssBaseline />

			<AppBar
				position="fixed"
				className={clsx(classes.appBar)}
			>
				<Grid container spacing={1} className={classes.toolbarItems} >
					<Grid item md={3} lg={4} >
						{""}
					</Grid>

					<Hidden smDown>
						<Grid item md={5} className={classes.searchBar}>
							<SearchBar />
						</Grid>
					</Hidden>

					<Hidden mdUp>
						<Grid item xs={3} className={classes.celoIcon}>
							<IconButton
								color="inherit"
								aria-label="Celo Dashboard"
								edge="start"
							><img src="/images/celo-logo.svg" />
							</IconButton>
						</Grid>
					</Hidden>
					<Grid item xs={3} sm={5} md={2} className={classes.networkDropdown}>
						<NetworkDropdown />
					</Grid>

					<Grid item xs={5} sm={3} md={2} lg={1} className={classes.login}>
						<SignInMessage />
					</Grid>

					<Hidden mdUp>
						<Grid item xs={12} className={classes.searchBar}>
							<SearchBar />
						</Grid>
					</Hidden>
				</Grid>

			</AppBar>
			{largeScreen ?
				<>
					<Drawer
						variant="permanent"
						className={clsx(classes.drawer, {
							[classes.drawerOpen]: open,
							[classes.drawerClose]: !open,
						})}
						classes={{
							paper: clsx({
								[classes.drawerOpen]: open,
								[classes.drawerClose]: !open,
							}),
						}}
					>
						{!open ? <IconButton
							color="inherit"
							aria-label="Open Celo Drawer"
							onClick={handleDrawerOpen}
							edge="start"
							className={clsx(classes.menuButton)}
						>
							{<img src="/images/celo-icon.svg" />}
						</IconButton> :
							<IconButton
								color="inherit"
								aria-label="Open Celo Drawer"
								onClick={handleDrawerClose}
								edge="start"
								className={clsx(classes.menuButton)}
							>
								{<img src="/images/celo-logo.svg" />}
							</IconButton>
						}
						<Divider />

						<List>
							{[
								<Link href="/" color="inherit">
									<Typography variant="body1" color="textSecondary">
										<ListItemIcon className={classes.icon}>
											<img src="/images/home.svg" />
										</ListItemIcon>
										{"Dashboard"}</Typography>{" "}
								</Link>,
								<Link href="/blocks" color="inherit">
									<Typography variant="body1" color="textSecondary">
										<ListItemIcon className={classes.icon}>
											<img src="/images/blocks.svg" />
										</ListItemIcon>
										{"Blocks"}</Typography>{" "}
								</Link>,
								<Link href="/transactions" color="inherit">
									<Typography variant="body1" color="textSecondary">
										<ListItemIcon className={classes.icon}>
											<img src="/images/txs.svg" />
										</ListItemIcon>
										{"Transactions"}</Typography>{" "}
								</Link>,
								<Link href="/accounts" color="inherit">
									<Typography variant="body1" color="textSecondary">
										<ListItemIcon className={classes.icon}>
											<img src="/images/validators.svg" />
										</ListItemIcon>
										{"Accounts"}</Typography>{" "}
								</Link>,
								<Link href="/proposals" color="inherit">
									<Typography variant="body1" color="textSecondary">
										<ListItemIcon className={classes.icon}>
											<img src="/images/proposal.svg" />
										</ListItemIcon>
										{"Proposals"}</Typography>{" "}
								</Link>,
								<Link href="/validatorVotes" color="inherit">
									<Typography variant="body1" color="textSecondary">
										<ListItemIcon className={classes.icon}>
											<img src="/images/vote.svg" />
										</ListItemIcon>
										{"Validator Votes"}</Typography>{" "}
								</Link>,
							].map((text, index) => (
								<ListItem button key={index}>
									<ListItemText primary={text} />
								</ListItem>
							))}
						</List>

					</Drawer>
				</> : null}
			<Container maxWidth="xl" className={classes.content} >
				<div>{props.children}</div>
			</Container>

		</div >
	);
}
export default Layout;
