import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';

import ConfirmRevoke from './validatorGroup/revoke/Confirm';

const useStyles = makeStyles({
    root: {
        justifyContent: 'center'
    }
});

export default function Ledger(): JSX.Element {
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
