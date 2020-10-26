import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import React from 'react';

import LockGold from './celoGold/lock/LockGold';
import LockGoldConfirm from './celoGold/lock/LockGoldConfirm';
import LockGoldSuccess from './celoGold/lock/LockGoldSuccess';
import UnlockGold from './celoGold/unlock/UnlockGold';
import UnlockGoldConfirm from './celoGold/unlock/UnlockGoldConfirm';
import UnlockGoldSuccess from './celoGold/unlock/UnlockGoldSuccess';
import LedgerButtons from './LedgerButtons';
import ProposalDepositConfirm from './proposal/deposit/Confirm';
import ProposalDeposit from './proposal/deposit/Deposit';
import ProposalDepositSuccess from './proposal/deposit/Success';
import ConfirmVoteProposal from './proposal/vote/Confirm';
import ProposalVoteSuccess from './proposal/vote/Success';
import ProposalVote from './proposal/vote/Vote';
import SignInMessage from './SignInMessage';
import ConfirmRevoke from './validatorGroup/revoke/Confirm';
import RevokeVote from './validatorGroup/revoke/Revoke';
import RevokeSuccess from './validatorGroup/revoke/Success';
import ConfirmVote from './validatorGroup/vote/Confirm';
import VoteSuccess from './validatorGroup/vote/Success';
import ValidatorGroupVote from './validatorGroup/vote/Vote';

const useStyles = makeStyles({
    root: {
        justifyContent: 'center'
    }
});

interface State {
    tokenSearch: string;
}

export default function Ledger() {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" color="secondary" onClick={handleClickOpen}>
                Ledger Dialog
            </Button>{' '}
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="ledger-dialog-vote"
                //fullWidth
                maxWidth="sm">
                <ConfirmRevoke />
            </Dialog>
        </div>
    );
}
