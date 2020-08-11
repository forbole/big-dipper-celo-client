import React from "react";
import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import Chip from "@material-ui/core/Chip";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import { amber, red, pink, purple, deepPurple, indigo, blue, lightBlue, cyan, teal, green, lightGreen, lime, yellow, orange, deepOrange, brown, grey, blueGrey } from '@material-ui/core/colors';
import theme from "../themes/celo-theme";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({

    contractType: {
      borderRadius: 5,
      backgroundColor: grey[500],
      fontSize: "	0.875rem",
      width: "5rem",
      textTransform: 'capitalize',
      marginRight: "0.5rem"
    },
  })
);

type ChipsProps = { contractName: string, type: string, actionResult: string };

const Chips = ({ contractName, type, actionResult }: ChipsProps) => {
  const classes = useStyles();

  const contractColors: any = {
    'Random': lightGreen['A700'],
    'EpochRewards': green[700],
    'DowntimeSlasher': blue[700],
    'Registry': deepPurple['A100'],
    'BlockchainParameters': brown[500],
    'LockedGold': orange[700],
    'Freezer': indigo[700],
    'Exchange': lime[700],
    'Election': amber[300],
    'GasPriceMinimum': purple[900],
    'StableToken': deepOrange[600],
    'FeeCurrencyWhitelist': cyan[900],
    'TransferWhitelist': blueGrey[500],
    'Validators': teal[700],
    'SortedOracles': red['A100'],
    'Governance': cyan[700],
    'GoldToken': yellow[600],
    'DoubleSigningSlasher': yellow['A400'],
    'Escrow': lightGreen[700],
    'Attestations': pink[600],
    'Accounts': purple[600],
    'Reserve': lightBlue[700],
  }

  const ledgerColors: any = {
    'Success': green[500],
    'Passed': green['A700'],
    'Create': lightGreen[700],
    'Rejected': red[800],
    'Removed': orange[600],
    'Deposit': theme.palette.background.paper,
    'Vote': theme.palette.background.paper,
    'Pending': teal[400]
  }

  const borderElement: any = {
    'Deposit': "solid 1px rgba(255, 255, 255, 0.6)",
    'Vote': "solid 1px rgba(255, 255, 255, 0.6)"
  }

  return (
    <React.Fragment>
      {contractName ? <Chip size="small" label={contractName} style={{ backgroundColor: contractColors[contractName], borderRadius: 5, width: "7rem", marginRight: "0.5rem", fontSize: "	0.875rem", }} /> : null}
      {type ? <Chip size="small" label={type} className={classes.contractType} /> : null}
      {actionResult ? <Chip size="small" label={actionResult} style={{ backgroundColor: ledgerColors[actionResult], border: borderElement[actionResult], borderRadius: 5, width: "7rem", marginRight: "0.5rem", fontSize: "	0.875rem", }} /> : null}
    </React.Fragment>
  )
}

export default Chips