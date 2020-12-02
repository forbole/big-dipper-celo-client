import { useQuery } from '@apollo/client';
import { Typography } from '@material-ui/core';
import FilledInput from '@material-ui/core/FilledInput';
import FormControl from '@material-ui/core/FormControl';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import Snackbar from '@material-ui/core/Snackbar';
import { createStyles, makeStyles, Theme, useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import SearchIcon from '@material-ui/icons/Search';
import Alert from '@material-ui/lab/Alert';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import { GET_VALIDATOR } from './query/Validator';
import { GET_VALIDATOR_GROUP } from './query/ValidatorGroup';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            flexWrap: 'wrap',
            borderRadius: 5,
            [theme.breakpoints.down('sm')]: {
                marginTop: '0.5rem'
            }
        },

        inputLabel: {
            height: '2rem',
            verticalAlign: 'middle',
            padding: '0px 1rem 1rem',
            fontSize: '14px',
            background: 'rgba(255, 255, 255, 1)',
            width: '100%',
            display: 'flex',
            '&:hover': {
                background: 'rgba(255, 255, 255, 1)'
            },
            '&:not(:hover)': {
                background: 'rgba(255, 255, 255, 1)'
            },
            '&:active': {
                background: 'rgba(255, 255, 255, 1)'
            }
        },
        container: {
            padding: '0rem'
        },

        alertMessage: {
            background: 'rgba(255, 255, 255, 1)',
            color: 'red',
            border: 'solid 1px red'
        }
    })
);

const SearchBar = (): JSX.Element => {
    const classes = useStyles();
    const [txSearch, setTxSearch] = React.useState('');
    const [open, setOpen] = React.useState(false);
    const [address, setAddresss] = React.useState('');
    const [name, setName] = React.useState('');

    const theme = useTheme();
    const smallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const router = useRouter();
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTxSearch(event.target.value);
    };

    useEffect(() => {
        setAddresss(txSearch);
        setName(txSearch);
    });

    const isValidatorGroupAddress = useQuery(GET_VALIDATOR_GROUP, {
        variables: { address }
    });

    const isValidatorGroupName = useQuery(GET_VALIDATOR_GROUP, {
        variables: { name }
    });

    const isValidatorName = useQuery(GET_VALIDATOR, {
        variables: { name }
    });

    const searchResults = (searchQuery: string) => {
        const hashRegEx = new RegExp(/[0-9A-F]{64}$/, 'igm');
        const blockRegEx = new RegExp(/^\d+$/, 'igm');

        if (searchQuery != '') {
            if (
                isValidatorGroupName.data &&
                isValidatorGroupName.data.validatorGroup &&
                isValidatorGroupName.data.validatorGroup.validatorGroups &&
                isValidatorGroupName.data.validatorGroup.validatorGroups.address
            ) {
                router.push(
                    '/validatorGroup/' +
                        isValidatorGroupName.data.validatorGroup.validatorGroups.address
                );
            } else if (
                isValidatorGroupAddress.data &&
                isValidatorGroupAddress.data.validatorGroup &&
                isValidatorGroupAddress.data.validatorGroup.validatorGroups &&
                isValidatorGroupAddress.data.validatorGroup.validatorGroups.address
            ) {
                router.push(
                    '/validatorGroup/' +
                        isValidatorGroupAddress.data.validatorGroup.validatorGroups.address
                );
            } else if (
                isValidatorName.data &&
                isValidatorName.data.validator &&
                isValidatorName.data.validator.address
            ) {
                router.push('/account/' + isValidatorName.data.validator.address);
            } else if (searchQuery.match(hashRegEx)) {
                router.push('/transaction/' + searchQuery);
            } else if (searchQuery.length === 42) {
                router.push('/account/' + searchQuery);
            } else if (searchQuery.match(blockRegEx)) {
                router.push('/block/' + searchQuery);
            } else {
                setOpen(true);
            }
        }
    };

    const handleDesktopSearch = (e: { key: string }) => {
        if (e.key === 'Enter') {
            searchResults(txSearch);
            setTxSearch('');
        }
    };

    const handleMobileSearch = () => {
        searchResults(txSearch);
        setTxSearch('');
    };

    const closeAlert = () => {
        setOpen(false);
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={1}>
                <Grid item xs={12}>
                    <FormControl fullWidth variant="filled" margin="dense">
                        <InputLabel htmlFor="search-bar"></InputLabel>

                        <FilledInput
                            className={classes.inputLabel}
                            id="queryString"
                            value={txSearch}
                            placeholder="Search by address / block number / tx"
                            // fullWidth={true}
                            disableUnderline={true}
                            onChange={handleChange}
                            onKeyDown={handleDesktopSearch}
                            startAdornment={
                                !smallScreen ? (
                                    <InputAdornment position="start">
                                        <SearchIcon />
                                    </InputAdornment>
                                ) : null
                            }
                            endAdornment={
                                smallScreen ? (
                                    <InputAdornment position="start">
                                        <IconButton color="inherit" onClick={handleMobileSearch}>
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                ) : null
                            }
                        />
                    </FormControl>
                </Grid>
            </Grid>
            <Snackbar open={open} autoHideDuration={6000} onClose={closeAlert}>
                <Alert onClose={closeAlert} severity="error" className={classes.alertMessage}>
                    <Typography variant="body2">Not Found! Please try again!</Typography>
                </Alert>
            </Snackbar>
        </div>
    );
};

export default SearchBar;
