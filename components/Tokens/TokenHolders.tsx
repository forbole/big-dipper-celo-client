import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React from 'react';

import NavLink from '../Utils/NavLink';

function createData(address: string, value: string, percentage: string) {
    return { address, value, percentage };
}

const rows = [
    createData(' 0x21a641c9745c7cb75528f3df51', '3023412.22 cUSD', '19.8760%'),
    createData(' 0xe4044267267071bb26b8bbd42afd911927ed6056', '3023412.22 cUSD', '2.4226%'),
    createData(' 0x3e84a81931335467900520c8104250f07b6e14ca20ef1', '603412.22 cUSD', '0.0121%'),
    createData(' 0x21a641c9745c79b2dea2c40ee037c037c69299ca718c3', '7023412.22 cUSD', '0.0157%'),
    createData(' 0xa7b6649b6f86a1f154c79c67fe862473b661552df4231d', '5023412.22 cUSD', '0.0088%'),
    createData(' 0x3e84a81931330520c8104250f07b6e14ca20ef11', '8023412.22 cUSD', '0.514%'),
    createData(' 0x21a641c9745c40ee037c037c69299ca718c3', '24023412.22 cUSD', '0.1478%')
];

const useStyles = makeStyles(() => {
    return {
        root: {
            borderRadius: 5,
            padding: '0',
            width: '100%'
        },
        container: {
            borderRadius: 5,
            width: '100%'
        },

        leftInline: {
            display: 'flex',
            overflow: 'auto',
            padding: '0 0 0 1rem'
        },
        rightInline: {
            display: 'flex',
            overflow: 'auto',
            padding: '0 1rem 0 0',
            align: 'right'
        },

        box: {
            letterSpacing: '1px',
            padding: '1rem',
            display: 'block',
            overflow: 'hidden',
            whiteSpace: 'nowrap'
        },

        alignRight: {
            paddingRight: '1rem',
            float: 'right',
            overflow: 'visible',
            textOverflow: 'ellipsis',
            display: 'inline-block'
        },

        address: {
            display: 'flex'
        },

        truncateAlignRight: {
            display: 'block',
            whiteSpace: 'nowrap',
            float: 'right',
            overflow: 'hidden',
            padding: '0 1rem'
        },

        divider: {
            backgroundColor: 'rgba(232, 232, 232, 1)'
        }
    };
});

const TokenHolders = (): JSX.Element => {
    const SETPAGE = parseInt(process.env.SET_PAGE as string);
    const ROWXXSMALL = parseInt(process.env.ROW_XXSMALL as string);
    const ROWXSMALL = parseInt(process.env.ROW_XSMALL as string);
    const ROWSMALL = parseInt(process.env.ROW_SMALL as string);
    const ROWMEDIUM = parseInt(process.env.ROW_MEDIUM as string);
    const ROWLARGE = parseInt(process.env.ROW_LARGE as string);
    const ROWXLARGE = parseInt(process.env.ROW_XLARGE as string);

    const classes = useStyles();

    const [pageNumber, setPageNumber] = React.useState(SETPAGE);
    const [pageSize, setPageSize] = React.useState(ROWXXSMALL);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPageNumber(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPageSize(+event.target.value);
        setPageNumber(SETPAGE);
    };

    return (
        <Accordion>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="tokenHoldersPanel"
                id="tokenHoldersPanel">
                <Typography variant="body1"> Token Holders {'(6148)'}</Typography>
            </AccordionSummary>
            <AccordionDetails className={classes.root}>
                <Grid container>
                    <Divider variant="middle" className={classes.divider} />
                    <Grid item xs={12}>
                        <TableContainer className={classes.container}>
                            <Table stickyHeader aria-label="sticky table">
                                <TableHead></TableHead>
                                <TableBody>
                                    {rows.map((row: any, index: number) => {
                                        return (
                                            <TableRow key={index}>
                                                <TableCell
                                                    component="th"
                                                    scope="row"
                                                    padding="checkbox">
                                                    <Grid
                                                        container
                                                        spacing={1}
                                                        style={{ padding: '0.5rem 0' }}>
                                                        <Grid item xs={12}>
                                                            <NavLink
                                                                href="/"
                                                                name={
                                                                    <Typography
                                                                        variant="body2"
                                                                        className={
                                                                            classes.truncateAlignRight
                                                                        }>
                                                                        {row.address}
                                                                    </Typography>
                                                                }
                                                            />
                                                        </Grid>
                                                        <Grid item xs={12}>
                                                            <Typography
                                                                variant="body2"
                                                                className={classes.alignRight}>
                                                                {row.value}
                                                            </Typography>
                                                        </Grid>

                                                        <Grid item xs={12}>
                                                            <Typography
                                                                variant="body2"
                                                                color="textSecondary"
                                                                className={classes.alignRight}>
                                                                {row.percentage}
                                                            </Typography>
                                                        </Grid>
                                                    </Grid>
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
                            count={rows.length}
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

export default TokenHolders;
