import Chip from '@material-ui/core/Chip';
import {
    amber,
    blue,
    blueGrey,
    brown,
    cyan,
    deepOrange,
    deepPurple,
    green,
    grey,
    indigo,
    lightBlue,
    lightGreen,
    lime,
    orange,
    pink,
    purple,
    red,
    teal,
    yellow
} from '@material-ui/core/colors';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles(() =>
    createStyles({
        contractType: {
            borderRadius: 5,
            backgroundColor: grey[500],
            fontSize: '	0.875rem',
            width: 'auto',
            textTransform: 'capitalize',
            marginRight: '0.5rem'
        }
    })
);

type ChipsProps = { contractName?: string; type?: string; actionResult?: string };

interface ContractColorsInterface {
    Random: string;
    EpochRewards: string;
    DowntimeSlasher: string;
    Registry: string;
    BlockchainParameters: string;
    LockedGold: string;
    Freezer: string;
    Exchange: string;
    Election: string;
    GasPriceMinimum: string;
    StableToken: string;
    FeeCurrencyWhitelist: string;
    TransferWhitelist: string;
    Validators: string;
    SortedOracles: string;
    Governance: string;
    GoldToken: string;
    DoubleSigningSlasher: string;
    Escrow: string;
    Attestations: string;
    Accounts: string;
    Reserve: string;
    [key: string]: string;
}

interface LedgerColorsInterface {
    Approved: string;
    Referendum: string;
    Execution: string;
    Rejected: string;
    Removed: string;
    Pending: string;
    Success: string;
    [key: string]: string;
}

interface BorderElementInterface {
    Deposit: string;
    Vote: string;
    [key: string]: string;
}

const Chips = ({ contractName, type, actionResult }: ChipsProps): JSX.Element => {
    const classes = useStyles();

    const contractColors: ContractColorsInterface = {
        Random: lightGreen['A700'],
        EpochRewards: green[700],
        DowntimeSlasher: blue[700],
        Registry: deepPurple['A100'],
        BlockchainParameters: brown[500],
        LockedGold: orange[700],
        Freezer: indigo[700],
        Exchange: lime[700],
        Election: amber[300],
        GasPriceMinimum: purple[900],
        StableToken: deepOrange[600],
        FeeCurrencyWhitelist: cyan[900],
        TransferWhitelist: blueGrey[500],
        Validators: teal[700],
        SortedOracles: red['A100'],
        Governance: cyan[700],
        GoldToken: yellow[700],
        DoubleSigningSlasher: yellow['A400'],
        Escrow: lightGreen[700],
        Attestations: pink[600],
        Accounts: purple[600],
        Reserve: lightBlue[700]
    };

    const ledgerColors: LedgerColorsInterface = {
        //Used for Proposal Status
        Approved: green['A700'],
        Referendum: teal[400],
        Rejected: red[800],
        Removed: blue[700],
        Execution: orange[600],

        //used for Transactions Status
        Pending: teal[400],
        Success: green[500]
    };

    const borderElement: BorderElementInterface = {
        Deposit: 'solid 1px rgba(255, 255, 255, 0.6)',
        Vote: 'solid 1px rgba(255, 255, 255, 0.6)'
    };

    return (
        <React.Fragment>
            {contractName ? (
                <Chip
                    size="small"
                    label={contractName.split(/(?=[A-Z])/).join(' ')}
                    style={{
                        backgroundColor: contractColors[contractName],
                        borderRadius: 5,
                        width: '7.5rem',
                        marginRight: '0.5rem',
                        fontSize: '	0.875rem',
                        textTransform: 'capitalize'
                    }}
                />
            ) : null}
            {type ? (
                <Chip
                    size="small"
                    label={type.split(/(?=[A-Z])/).join(' ')}
                    className={classes.contractType}
                />
            ) : null}
            {actionResult ? (
                <Chip
                    size="small"
                    label={actionResult.split(/(?=[A-Z])/).join(' ')}
                    style={{
                        backgroundColor: ledgerColors[actionResult],
                        border: borderElement[actionResult],
                        borderRadius: 5,
                        width: '6.5rem',
                        marginRight: '0.5rem',
                        fontSize: '	0.875rem',
                        textTransform: 'capitalize'
                    }}
                />
            ) : null}
        </React.Fragment>
    );
};

export default Chips;
