import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import { Dialog, Select } from "@material-ui/core";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Divider from "@material-ui/core/Divider";
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import Ledger from '../../Ledger'
import Confirm from './Confirm'
import ControlButtons from '../../ControlButtons'
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles({
	root: {
		justifyContent: "center",
	},
	title: {
		display: "block",
		textAlign: "center",
		paddingTop: "0.5rem",
	},

	dialogTitle: {
		padding: "1rem 1rem 0rem 1rem",
	},

	dialogContent: {
		display: "block",
	},
	divider: {
		margin: "0.15rem 0rem",
		backgroundColor: "rgba(232, 232, 232, 1)",
	},

	dialog: {
		paddingBottom: '1rem'
	},
	controlButton: {
		justifyContent: "center",
		flexWrap: "wrap",
		paddingTop: "2rem",
		textTransform: "none",
		borderRadius: 4,
		width: "100%",
	},

	item: {
		justifyContent: "center",

	},

	icon: {
		fill: "rgba(255, 255, 255, 0.8)",
		paddingRight: "0.5rem",
		fontWeight: 400,
	},

	message: {
		margin: "0.5rem 0.5rem 0 0.5rem",
	},
	voteNoButton: {
		backgroundColor: "rgba(240, 65, 85, 1)",
		textTransform: "none",
		width: '100%',
		color: 'rgba(255,255,255,1)',
		fontWeight: 400,
		'&:disabled': {
			backgroundColor: "rgba(65,65,65, 0.6)"
		},
		"&:hover, &.Mui-focusVisible": { backgroundColor: "rgba(58, 211, 158, 0.5)" },
	},
	voteYesButton: {
		backgroundColor: "rgba(8, 178, 122, 1)",
		textTransform: "none",
		width: '100%',
		color: 'rgba(255,255,255,1)',
		fontWeight: 400,
		'&:disabled': {
			backgroundColor: "rgba(65,65,65, 0.6)"
		},
		"&:hover, &.Mui-focusVisible": { backgroundColor: "rgba(58, 211, 158, 0.5)" },
	},

	voteAbstainButton: {
		backgroundColor: "rgba(55, 148, 240, 1)",
		textTransform: "none",
		width: '100%',
		color: 'rgba(255,255,255,1)',
		fontWeight: 400,
		'&:disabled': {
			backgroundColor: "rgba(65,65,65, 0.6)"
		},
		"&:hover, &.Mui-focusVisible": { backgroundColor: "rgba(58, 211, 158, 0.5)" },
	},

	paddingBottom: {
		paddingBottom: '1rem'
	},

	address: {
		overflow: 'hidden',

	},
	voteButton: {
		textTransform: "none",
		borderRadius: 4,
		minHeight: "2.5rem",
		width: "19.4375rem",
		color: "rgba(255, 255, 255, 1)"
	},

	errorMessage: {
		color: "red",
		textAlign: "center",
		paddingBottom: "1rem"
	},

	circularProgress: {
		textAlign: "center",
		paddingBottom: "1rem",
		paddingTop: "2rem",
	},
	accountAddress: {
		paddingBottom: "1rem"
	},

	disabledAccountAddress: {
		paddingBottom: "1rem",
		color: "rgba(192,192,192, 1)"
	},
});

type VoteProps = { isOpen?: boolean, showButton?: boolean, proposalTit?: string, proposalDet?: string, proposalNum?: number, proposer?: string }

const Vote = ({ isOpen, showButton, proposalTit, proposalDet, proposalNum, proposer }: VoteProps) => {

	const classes = useStyles();
	const [open, setOpen] = React.useState(isOpen);
	const [currentUser, setCurrentUser] = React.useState('');
	const [vote, setVote] = React.useState('');
	const [connected, setConnected] = React.useState(false);
	const [isLoading, setIsLoading] = React.useState(false);
	const [nextDialog, setNextDialog] = React.useState(false);
	const [amount, setAmount] = React.useState('');
	const [proposalNumber, setProposalNumber] = React.useState(proposalNum);
	const [proposalTitle, setProposalTitle] = React.useState(proposalTit);
	const [proposalDetails, setProposalDetails] = React.useState(proposalDet);
	const [proposalProposer, setProposalProposer] = React.useState(proposer);
	const [dialogError, setDialogError] = React.useState(false);
	const [dialogErrorMessage, setDialogErrorMessage] = React.useState('');
	const [ledgerError, setLedgerError] = React.useState(false);
	const [ledgerErrorMessage, setLedgerErrorMessage] = React.useState('');
	const [ledgerLoading, setLedgerLoading] = React.useState(false);
	const [showLockButton, setShowLockButton] = React.useState(showButton);


	const handleOpen = async () => {
		setOpen(true);
		setLedgerError(false)
		setLedgerErrorMessage("")

		try {
			if (Ledger.isConnected === false) {
				setConnected(false)
				setIsLoading(true)
				setLedgerLoading(true)
				setLedgerErrorMessage("Connecting...")
				try {
					await Ledger.connect()
				}
				catch (e) {
					setLedgerError(true)
					setLedgerErrorMessage(Ledger.checkLedgerErrors(e.message))
					setIsLoading(false)
				}
			}

			if (Ledger.isConnected === true) {
				setLedgerLoading(true)
				// setIsLoading(true)
				setLedgerErrorMessage("Please accept the connection in your Ledger device. ")
				setIsLoading(true)
				try {
					let userAddress = await Ledger.getAddress()
					localStorage.setItem('currentUserAddress', userAddress)
					setCurrentUser(userAddress)
					setLedgerErrorMessage("")
					setConnected(true)
					setIsLoading(false)
					setLedgerLoading(false)
				}
				catch (e) {
					setLedgerError(true)
					setLedgerErrorMessage(Ledger.checkLedgerErrors(e.message))
					setIsLoading(false)
				}

				try {
					let ver = await Ledger.getCeloAppVersion()
					setDialogError(true)

				}
				catch (e) {
					setLedgerError(true)
					setLedgerErrorMessage(Ledger.checkLedgerErrors(e.message))
				}
			}
		}
		catch (e) {
			setLedgerError(true)
			setLedgerLoading(true)
			setIsLoading(false)
			setLedgerErrorMessage(Ledger.checkLedgerErrors(e.message))
		}
	}

	const handleClose = () => {
		setOpen(false);
	};

	const handleVoting = async (e) => {
		setVote(e.target.textContent)
		setOpen(false);
		setNextDialog(true)
		try {
			const from = currentUser;
			const voteProposal = { proposalNumber, from, vote }
			await Ledger.voteProposal(voteProposal)
		}
		catch (e) {
			setLedgerError(true)
			setLedgerErrorMessage(Ledger.checkLedgerErrors(e.message))
		}
	};

	useEffect(() => {
		let localUser = localStorage.getItem('currentUserAddress');
		//@ts-ignore
		setCurrentUser(localUser)

	});

	return (
		<>
			{showLockButton === true ?
				<Grid container spacing={2}  >
					<Grid item xs={12}  >
						<Button
							variant="contained"
							color="secondary"
							onClick={handleOpen}
							className={classes.voteButton}
						>
							<Typography variant="body1">Vote</Typography>
						</Button>
					</Grid>
				</Grid>
				: null}
			<Dialog
				open={open}
				onClose={handleClose}
				aria-labelledby="ledger-dialog"
				//fullWidth
				maxWidth="sm"
			>
				<DialogTitle
					id="ledger-dialog-vote-title"
					className={classes.dialogTitle}
				>
					<Grid container className={classes.item}>
						<Grid item xs={12}>
							<Typography
								variant="h6"
								noWrap
								className={classes.title}
								color="textPrimary"
							>
								Vote
              </Typography>
						</Grid>
					</Grid>
				</DialogTitle>
				<DialogContent >
					<Grid container spacing={1}>
						<DialogContentText id="ledger-vote" className={classes.dialog}>
							<Grid container className={classes.dialogContent}>



								<Grid item xs={12} className={classes.message}>
									<Typography variant="body2" noWrap color="textPrimary" gutterBottom>
										Account
                                    </Typography>
								</Grid>
								<Grid item xs={12} className={classes.message}>
									<Typography variant="body2" noWrap color="textPrimary" gutterBottom className={connected ? classes.accountAddress : classes.disabledAccountAddress}>
										{currentUser}
									</Typography>
								</Grid>

								<Grid item xs={12} className={classes.message}>
									<Typography variant="body1" color="textPrimary" gutterBottom>
										You’re going to vote for
                                    </Typography>
									<Typography variant="body2" color="textPrimary" className={classes.paddingBottom}>
										{proposalTitle}
									</Typography>
								</Grid>
								<Grid item xs={12} className={classes.paddingBottom} >
									<Button variant="contained" className={classes.voteYesButton} onClick={(e) => handleVoting(e)} disabled={!connected}>
										Yes
                                    </Button>
								</Grid>
								<Grid item xs={12} className={classes.paddingBottom} >
									<Button variant="contained" className={classes.voteNoButton} onClick={(e) => handleVoting(e)} disabled={!connected}>
										No
                                    </Button>
								</Grid>
								<Grid item xs={12} >
									<Button variant="contained" className={classes.voteAbstainButton} onClick={(e) => handleVoting(e)} disabled={!connected}>
										Abstain
                                    </Button>
								</Grid>
								{ledgerLoading ?
									<Grid item xs={12} className={classes.circularProgress}>
										<CircularProgress color="secondary" />
									</Grid>
									: null}

								{ledgerErrorMessage ?
									<>
										<Grid item xs={12} className={classes.errorMessage}>
											<Typography variant="body2">
												{ledgerErrorMessage}
											</Typography>
										</Grid> </> : null}
								{(ledgerErrorMessage || !connected || ledgerLoading) ?
									<ControlButtons showRetry={true} handleClick={handleOpen} handleClose={handleClose} showDisabled={isLoading} /> :
									null}
							</Grid>
						</DialogContentText>

					</Grid>
				</DialogContent>
			</Dialog>
			{ nextDialog ? <Confirm isOpen={nextDialog} voteSel={vote} proposalNum={proposalNumber} proposalTit={proposalTitle} proposer={proposer} proposalDet={proposalDetails} /> : null}

		</>
	);
};

export default Vote