import { useQuery } from '@apollo/client';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import moment from 'moment';
import React, { useEffect } from 'react';

import PriceCard from '../PriceCard/PriceCard';
import { GET_BLOCK } from '../Query/Block';
import ComponentLoader from '../Utils/ComponentLoader';
import ErrorMessage from '../Utils/ErrorMessage';
import MiddleEllipsis from '../Utils/MiddleEllipsis';
import NavLink from '../Utils/NavLink';

interface Column {
    id: 'height' | 'validator' | 'txs' | 'gasUsed' | 'gasLimit' | 'time';
    label: string;
    align: 'left' | 'right';
}

const columns: Column[] = [
    { id: 'height', label: 'Height', align: 'left' },
    { id: 'validator', label: 'Validator', align: 'left' },
    { id: 'txs', label: 'Txs', align: 'left' },
    { id: 'gasUsed', label: 'Gas Used', align: 'left' },
    { id: 'gasLimit', label: 'Gas Limit', align: 'left' },
    { id: 'time', label: 'Time', align: 'right' }
];

const columns_homepage: Column[] = [
    { id: 'height', label: 'Height', align: 'left' },
    { id: 'validator', label: 'Validator', align: 'left' },
    { id: 'txs', label: 'Txs', align: 'left' },
    { id: 'time', label: 'Time', align: 'right' }
];

const useStyles = makeStyles({
    root: {
        width: '100%',
        height: '100%',
        padding: '1.5%',
        borderRadius: 4,
        wordWrap: 'break-word',
        margin: 'none',
        overflow: 'hidden'
    },
    box: {
        letterSpacing: '1px',
        padding: '0.6rem',
        display: 'block',
        overflow: 'hidden',
        whiteSpace: 'nowrap'
    },
    link: {
        float: 'right',
        textAlign: 'right'
    },

    cell: {
        maxHeight: '1rem'
    },

    tableCell: {
        overflow: 'auto',
        padding: '0.4rem',
        border: 'none'
    },
    table: {
        padding: '0.2rem',
        border: 'none'
    },
    inline: {
        paddingLeft: '0rem'
    },
    card: {
        padding: '1rem',
        justifyContent: 'center',
        marginBottom: '1rem',
        background: 'rgba(255, 255, 255, 1)',
        alignItems: 'center',
        borderRadius: 4,
        boxShadow: '0 2px 4px 0 rgba(138, 148, 159, 0.2)',
        '& > *:nth-child(1)': {
            marginRight: '2rem'
        },
        '& > *:nth-child(2)': {
            flex: 'auto'
        }
    },

    textContent: {
        textOverflow: 'ellipsis',
        overflow: 'hidden',
        minWidth: 0
    },
    truncareText: {
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        width: '6rem',
        minWidth: '2rem',
        maxWidth: '15rem'
    }
});

type LatestBlocksProps = { pagination?: boolean; displayCard?: boolean };

const LatestBlocks = ({ pagination, displayCard }: LatestBlocksProps): JSX.Element => {
    const classes = useStyles();
    const theme = useTheme();
    const largeScreen = useMediaQuery(theme.breakpoints.up('sm'));

    const SETPAGE = process.env.SETPAGE ? parseInt(process.env.SETPAGE) : 0;
    const ROWXXSMALL = process.env.ROWXXSMALL ? parseInt(process.env.ROWXXSMALL) : 5;
    const ROWXSMALL = process.env.ROWXSMALL ? parseInt(process.env.ROWXSMALL) : 10;
    const ROWSMALL = process.env.ROWSMALL ? parseInt(process.env.ROWSMALL) : 15;
    const ROWMEDIUM = process.env.ROWMEDIUM ? parseInt(process.env.ROWMEDIUM) : 30;
    const ROWLARGE = process.env.ROWLARGE ? parseInt(process.env.ROWLARGE) : 50;
    const ROWXLARGE = process.env.ROWXLARGE ? parseInt(process.env.ROWXLARGE) : 100;

    const [pageNumber, setPageNumber] = React.useState(SETPAGE);
    const [pageSize, setPageSize] = React.useState(ROWMEDIUM);
    const page = pageNumber + 1;

    useEffect(() => {
        if (pagination === false) {
            if (largeScreen) {
                setPageSize(ROWSMALL);
            } else {
                setPageSize(ROWXXSMALL);
            }
        }
    });

    const handleChangePage = (event: unknown, newPage: number) => {
        setPageNumber(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPageSize(+event.target.value);
        setPageNumber(SETPAGE);
    };

    const { loading, error, data } = useQuery(GET_BLOCK, {
        variables: { pageSize, page },
        pollInterval: 5000
    });
    if (loading) return <ComponentLoader />;
    // if (error) return <ErrorMessage />;
    return (
        <>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    {displayCard ? <PriceCard /> : null}
                    <Paper className={classes.root}>
                        <Typography variant="body1" className={classes.box}>
                            Latest Blocks{' '}
                            {pagination === false ? (
                                <NavLink
                                    href="/blocks"
                                    name="view more"
                                    className={classes.link}
                                    textSecondary
                                />
                            ) : null}
                        </Typography>
                        <TableContainer>
                            <Paper className={classes.tableCell}>
                                <Table>
                                    <TableHead>
                                        {pagination ? (
                                            <TableRow>
                                                {columns.map((column) => (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
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
                                        ) : (
                                            <TableRow>
                                                {columns_homepage.map((column) => (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
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
                                        )}
                                    </TableHead>
                                    <TableBody>
                                        {data?.blocks?.blocks
                                            ? data?.blocks?.blocks.map(
                                                  (row: any, index: number) => {
                                                      return (
                                                          <TableRow
                                                              key={index}
                                                              style={
                                                                  index % 2
                                                                      ? {
                                                                            background:
                                                                                'rgba(248, 248, 248, 1)',
                                                                            border: 'none'
                                                                        }
                                                                      : {
                                                                            background:
                                                                                'rgb(255,255,255)'
                                                                        }
                                                              }>
                                                              <TableCell
                                                                  component="th"
                                                                  scope="row"
                                                                  padding="checkbox"
                                                                  align="left"
                                                                  className={classes.tableCell}>
                                                                  <NavLink
                                                                      href={`/block/${row?.number}`}
                                                                      name={
                                                                          <Typography
                                                                              variant="body2"
                                                                              noWrap>
                                                                              {row?.number}
                                                                          </Typography>
                                                                      }
                                                                  />
                                                              </TableCell>

                                                              <TableCell
                                                                  align="left"
                                                                  padding="checkbox"
                                                                  className={classes.tableCell}>
                                                                  {row?.miner?.signer ? (
                                                                      <NavLink
                                                                          href={`/account/${row?.miner?.signer}`}
                                                                          name={
                                                                              <Typography
                                                                                  variant="body2"
                                                                                  display="inline"
                                                                                  className={
                                                                                      classes.textContent
                                                                                  }
                                                                                  noWrap>
                                                                                  <span>
                                                                                      {
                                                                                          <MiddleEllipsis
                                                                                              text={
                                                                                                  row
                                                                                                      ?.miner
                                                                                                      ?.name ||
                                                                                                  row
                                                                                                      ?.miner
                                                                                                      ?.signer
                                                                                              }
                                                                                          />
                                                                                      }
                                                                                  </span>
                                                                              </Typography>
                                                                          }
                                                                      />
                                                                  ) : null}
                                                              </TableCell>

                                                              <TableCell
                                                                  align="left"
                                                                  padding="checkbox"
                                                                  className={classes.tableCell}>
                                                                  <Typography
                                                                      variant="body2"
                                                                      noWrap
                                                                      color="textPrimary">
                                                                      {row?.transactions?.length ??
                                                                          0}
                                                                  </Typography>
                                                              </TableCell>
                                                              {pagination ? (
                                                                  <TableCell
                                                                      align="left"
                                                                      padding="checkbox"
                                                                      className={classes.tableCell}>
                                                                      <div
                                                                          className={
                                                                              classes.truncareText
                                                                          }>
                                                                          <Typography
                                                                              variant="body2"
                                                                              noWrap
                                                                              color="textPrimary">
                                                                              {row?.gasUsed}
                                                                          </Typography>
                                                                      </div>
                                                                  </TableCell>
                                                              ) : null}
                                                              {pagination ? (
                                                                  <TableCell
                                                                      align="left"
                                                                      padding="checkbox"
                                                                      className={classes.tableCell}>
                                                                      <div
                                                                          className={
                                                                              classes.truncareText
                                                                          }>
                                                                          <Typography
                                                                              variant="body2"
                                                                              noWrap
                                                                              color="textPrimary">
                                                                              {row?.gasLimit
                                                                                  ? row?.gasLimit
                                                                                  : 'Not available'}
                                                                          </Typography>
                                                                      </div>
                                                                  </TableCell>
                                                              ) : null}
                                                              <TableCell
                                                                  align="right"
                                                                  padding="checkbox"
                                                                  className={classes.tableCell}>
                                                                  <Typography
                                                                      variant="body2"
                                                                      noWrap
                                                                      color="textPrimary">
                                                                      {moment
                                                                          .unix(row?.timestamp)
                                                                          .format(
                                                                              'Do MMMM YYYY, h:mm:ss a'
                                                                          )}
                                                                  </Typography>
                                                              </TableCell>
                                                          </TableRow>
                                                      );
                                                  }
                                              )
                                            : null}
                                    </TableBody>
                                </Table>
                            </Paper>
                        </TableContainer>
                        {pagination ? (
                            <TablePagination
                                className={'pagination'}
                                rowsPerPageOptions={[
                                    ROWXXSMALL,
                                    ROWXSMALL,
                                    ROWSMALL,
                                    ROWMEDIUM,
                                    ROWLARGE,
                                    ROWXLARGE
                                ]}
                                component="div"
                                count={data?.blocks?.totalCounts ?? 0}
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
                        ) : null}
                    </Paper>
                </Grid>
            </Grid>
        </>
    );
};

export default LatestBlocks;
