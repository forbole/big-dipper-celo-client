import { useQuery } from '@apollo/client';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import moment from 'moment';
import React from 'react';

import { GET_ACCOUNT_DETAILS } from '../Query/Account';
import { GET_PROPOSED_BLOCKS } from '../Query/Block';
import ComponentLoader from '../Utils/ComponentLoader';
import ErrorMessage from '../Utils/ErrorMessage';
import MiddleEllipsis from '../Utils/MiddleEllipsis';
import NavLink from '../Utils/NavLink';
import NotAvailable from '../Utils/NotAvailable';

interface Column {
    id: 'height' | 'proposer' | 'txs' | 'gasUsed' | 'gasLimit' | 'time';
    label: string;
}

const columns: Column[] = [
    { id: 'height', label: 'Height' },
    { id: 'proposer', label: 'Proposer' },
    {
        id: 'txs',
        label: 'Txs'
    },
    {
        id: 'gasUsed',
        label: 'Gas Used'
    },
    {
        id: 'gasLimit',
        label: 'Gas Limit'
    },
    {
        id: 'time',
        label: 'Time'
    }
];

const useStyles = makeStyles(() => {
    return {
        root: {
            width: '100%',
            padding: '0 0.5rem 0.5rem 0.5rem',
            borderRadius: 5,
            marginTop: '-0.5rem'
        },
        container: {
            borderRadius: 5,
            width: '100%',
            overflow: 'auto'
        },
        box: {
            letterSpacing: '1px',
            padding: '1rem',
            display: 'inline-flex',
            overflow: 'hidden',
            whiteSpace: 'nowrap'
        },
        time: {
            padding: '0.01em',
            margin: '0.5em'
        },
        tableCell: {
            overflow: 'auto',
            padding: '0.5rem',
            border: 'none'
        },
        table: {
            padding: '0.2rem',
            border: 'none'
        },

        icon: {
            fill: 'rgba(144, 144, 144, 1)'
        }
    };
});

type ProposedBlocksProps = { address: string };

const ProposedBlocks = ({ address }: ProposedBlocksProps): JSX.Element => {
    const SETPAGE = process.env.SETPAGE ? parseInt(process.env.SETPAGE) : 0;
    const ROWXXSMALL = process.env.ROWXXSMALL ? parseInt(process.env.ROWXXSMALL) : 5;
    const ROWXSMALL = process.env.ROWXSMALL ? parseInt(process.env.ROWXSMALL) : 10;
    const ROWSMALL = process.env.ROWSMALL ? parseInt(process.env.ROWSMALL) : 15;
    const ROWMEDIUM = process.env.ROWMEDIUM ? parseInt(process.env.ROWMEDIUM) : 30;
    const ROWLARGE = process.env.ROWLARGE ? parseInt(process.env.ROWLARGE) : 50;
    const ROWXLARGE = process.env.ROWXLARGE ? parseInt(process.env.ROWXLARGE) : 100;

    const classes = useStyles();
    const [pageNumber, setPageNumber] = React.useState(SETPAGE);
    const [pageSize, setPageSize] = React.useState(ROWXSMALL);
    const page = pageNumber + 1;

    const handleChangePage = (event: unknown, newPage: number) => {
        setPageNumber(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPageSize(+event.target.value);
        setPageNumber(SETPAGE);
    };

    const accountQuery = useQuery(GET_ACCOUNT_DETAILS, {
        variables: { address }
    });

    address =
        accountQuery.data &&
        accountQuery.data.account &&
        accountQuery.data.account.accountSummary &&
        accountQuery.data.account.accountSummary.authorizedSigners &&
        accountQuery.data.account.accountSummary.authorizedSigners.validator
            ? accountQuery.data.account.accountSummary.authorizedSigners.validator
            : '';

    const { loading, error, data } = useQuery(GET_PROPOSED_BLOCKS, {
        variables: { address, pageSize, page },
        pollInterval: 5000
    });

    if (loading) return <ComponentLoader />;
    if (error) return <ErrorMessage />;

    return (
        <Accordion defaultExpanded>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon className={classes.icon} />}
                aria-controls="accountValidatedBlocksPanel"
                id="accountValidatedBlocksPanel">
                <Typography variant="body1">Proposed Blocks</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.root}>
                <Grid container className={classes.tableCell}>
                    <Grid item xs={12}>
                        <TableContainer className={classes.container}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        {columns.map((column: any, index: number) => (
                                            <TableCell
                                                key={index}
                                                align="left"
                                                className={classes.table}
                                                padding="checkbox">
                                                <Typography
                                                    variant="body2"
                                                    noWrap
                                                    className={classes.tableCell}>
                                                    {column.label}
                                                </Typography>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.proposedBlocks.blocks.map((row: any, index: number) => {
                                        return (
                                            <TableRow
                                                key={index}
                                                style={
                                                    index % 2
                                                        ? {
                                                              background: 'rgba(248, 248, 248, 1)',
                                                              border: 'none'
                                                          }
                                                        : {
                                                              background: 'rgb(255,255,255)'
                                                          }
                                                }>
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                    padding="checkbox"
                                                    align="left"
                                                    className={classes.tableCell}>
                                                    {row.number ? (
                                                        <NavLink
                                                            href={`/block/${row.number}`}
                                                            name={
                                                                <Typography variant="body2" noWrap>
                                                                    {row.number}
                                                                </Typography>
                                                            }
                                                        />
                                                    ) : (
                                                        ''
                                                    )}
                                                </TableCell>

                                                <TableCell
                                                    align="left"
                                                    padding="checkbox"
                                                    className={classes.tableCell}>
                                                    {(row.miner && row.miner.name) ||
                                                    (row.miner &&
                                                        row.miner.signerAccount &&
                                                        row.miner.signerAccount.address) ? (
                                                        <NavLink
                                                            href={`/account/${row.miner.signerAccount.address}`}
                                                            name={
                                                                <Typography variant="body2" noWrap>
                                                                    {row.miner.name || (
                                                                        <MiddleEllipsis
                                                                            text={
                                                                                row.miner
                                                                                    .signerAccount
                                                                                    .address
                                                                            }
                                                                        />
                                                                    )}
                                                                </Typography>
                                                            }
                                                        />
                                                    ) : (
                                                        <NotAvailable variant="body2" />
                                                    )}
                                                </TableCell>

                                                <TableCell
                                                    align="left"
                                                    padding="checkbox"
                                                    className={classes.tableCell}>
                                                    {row.transactions &&
                                                    row.transactions.transactionIndex ? (
                                                        <Typography variant="body2" noWrap>
                                                            {row.transactions.transactionIndex}
                                                        </Typography>
                                                    ) : (
                                                        '0'
                                                    )}
                                                </TableCell>

                                                <TableCell
                                                    align="left"
                                                    padding="checkbox"
                                                    className={classes.tableCell}>
                                                    {row.gasUsed ? (
                                                        <Typography variant="body2" noWrap>
                                                            {row.gasUsed}
                                                        </Typography>
                                                    ) : (
                                                        <NotAvailable variant="body2" />
                                                    )}
                                                </TableCell>

                                                <TableCell
                                                    align="left"
                                                    padding="checkbox"
                                                    className={classes.tableCell}>
                                                    {row.gasLimit ? (
                                                        <Typography variant="body2" noWrap>
                                                            {row.gasLimit}
                                                        </Typography>
                                                    ) : (
                                                        <NotAvailable variant="body2" />
                                                    )}
                                                </TableCell>
                                                <TableCell
                                                    align="left"
                                                    padding="checkbox"
                                                    className={classes.tableCell}>
                                                    {row.timestamp ? (
                                                        <Typography variant="body2" noWrap>
                                                            {moment
                                                                .unix(row.timestamp)
                                                                .format('Do MMMM YYYY, h:mm:ss a')}
                                                        </Typography>
                                                    ) : (
                                                        <NotAvailable variant="body2" />
                                                    )}
                                                </TableCell>
                                            </TableRow>
                                        );
                                    })}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <TablePagination
                            rowsPerPageOptions={[
                                ROWXXSMALL,
                                ROWXSMALL,
                                ROWSMALL,
                                ROWMEDIUM,
                                ROWLARGE,
                                ROWXLARGE
                            ]}
                            component="div"
                            count={data.proposedBlocks.totalCounts}
                            rowsPerPage={pageSize}
                            page={pageNumber}
                            onChangePage={handleChangePage}
                            onChangeRowsPerPage={handleChangeRowsPerPage}
                            backIconButtonProps={{
                                'aria-label': 'Previous',
                                disabled: pageNumber === 0
                            }}
                            nextIconButtonProps={{
                                'aria-label': 'Next'
                            }}
                        />
                    </Grid>
                </Grid>
            </AccordionDetails>
        </Accordion>
    );
};

export default ProposedBlocks;
