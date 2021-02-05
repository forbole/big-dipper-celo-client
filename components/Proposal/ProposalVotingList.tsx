import { useQuery } from '@apollo/client';
import { Card, CardContent } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Tab from '@material-ui/core/Tab';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import BigNumber from 'bignumber.js';
import numbro from 'numbro';
import React from 'react';
import { Cell, Legend, Pie, PieChart, Tooltip } from 'recharts';

import { GET_CHAIN } from '../Query/Chain';
import { GET_PROPOSAL } from '../Query/Proposal';
import Coin from '../Utils/Coin';
import ComponentLoader from '../Utils/ComponentLoader';
import ErrorMessage from '../Utils/ErrorMessage';
import NavLink from '../Utils/NavLink';
import NotAvailable from '../Utils/NotAvailable';

interface Column {
    id: 'voter' | 'answer' | 'voting_power';
    label: string;
    align: 'left' | 'right';
}

const columns: Column[] = [
    { id: 'voter', label: 'Voter', align: 'left' },
    { id: 'answer', label: 'Answer', align: 'right' },
    { id: 'voting_power', label: 'Voting Power', align: 'right' }
];

const useStyles = makeStyles(() => {
    return {
        root: {
            width: '100%',
            padding: '0.5rem',
            borderRadius: 5,
            overflowY: 'auto'
        },
        container: {
            borderRadius: 5,
            width: '100%',
            overflow: 'auto',
            flexWrap: 'wrap'
        },

        flexContainer: {
            flexWrap: 'wrap'
        },
        voting_power: {
            padding: '0.01em',
            margin: '0.5em'
        },
        tableCell: {
            overflow: 'auto',
            padding: '0.5rem',
            border: 'none'
        },
        table: {
            background: 'rgba(246, 247, 249, 1)',
            padding: '0',
            border: 'none'
        },
        paper: {
            padding: '1rem',
            width: '100%'
        },
        headerLabel: {
            padding: '0 0 1rem 0.5rem'
        },

        priceDisplay: {
            paddingLeft: '0.5rem'
        },

        tabs: {
            flexWrap: 'wrap',
            fontSize: '1rem',
            textTransform: 'none',
            padding: '0 0.5rem 0 0.5rem '
        },
        pieChart: {
            alignContent: 'center',
            marginLeft: '-1.25rem',
            marginTop: '-2.5rem'
        },
        tooltip: {
            opacity: 5,
            width: '13rem',
            height: '4rem'
        },
        tooltipCard: {
            padding: '1rem'
        },
        tooltipVoteType: {
            fontWeight: 600
        }
    };
});

const CELO_FRACTION = process.env.CELO_FRACTION ? parseInt(process.env.CELO_FRACTION) : 1e18;

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`proposal-voting-tab-${index}`}
            aria-labelledby={`proposal-voting-tab-${index}`}
            {...other}>
            {value === index && (
                <Grid container>
                    <Grid item xs={12}>
                        {children}
                    </Grid>
                </Grid>
            )}
        </div>
    );
}

type VotingTooltipProps = { active?: boolean; payload?: any };

type ProposalVotingListProps = { proposal: string };

const ProposalVotingList = ({ proposal }: ProposalVotingListProps): JSX.Element => {
    const classes = useStyles();
    const proposalNumber = parseInt(proposal);

    const SETPAGE = process.env.SETPAGE ? parseInt(process.env.SETPAGE) : 0;
    const ROWXXSMALL = process.env.ROWXXSMALL ? parseInt(process.env.ROWXXSMALL) : 5;
    const ROWXSMALL = process.env.ROWXSMALL ? parseInt(process.env.ROWXSMALL) : 10;
    const ROWSMALL = process.env.ROWSMALL ? parseInt(process.env.ROWSMALL) : 15;
    const ROWMEDIUM = process.env.ROWMEDIUM ? parseInt(process.env.ROWMEDIUM) : 30;
    const ROWLARGE = process.env.ROWLARGE ? parseInt(process.env.ROWLARGE) : 50;
    const ROWXLARGE = process.env.ROWXLARGE ? parseInt(process.env.ROWXLARGE) : 100;

    const [page, setPage] = React.useState(SETPAGE);
    const [pageSize, setPageSize] = React.useState(ROWXSMALL);
    const [value, setValue] = React.useState(0);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPageSize(+event.target.value);
        setPage(SETPAGE);
    };

    const handleChange = (event: unknown, newValue: number) => {
        setValue(newValue);
    };

    const { loading, error, data } = useQuery(GET_PROPOSAL, {
        variables: { proposalNumber }
    });

    const chainData = useQuery(GET_CHAIN, {
        pollInterval: 5000
    });

    const RednderTabs = (voteType: any) => {
        return (
            <>
                <TableContainer>
                    <Table size="medium">
                        <TableHead>
                            <TableRow>
                                {columns.map((column: any, index: number) => (
                                    <TableCell
                                        key={index}
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
                        </TableHead>
                        <TableBody>
                            {Object.keys(data?.proposal?.totalVotesList[voteType.voteType])
                                .slice(page * pageSize, page * pageSize + pageSize)
                                .map((row: any, index: number) => {
                                    return (
                                        <TableRow
                                            key={index}
                                            style={
                                                index % 2
                                                    ? {
                                                          background: 'rgba(248, 248, 248, 1)',
                                                          border: 'none'
                                                      }
                                                    : { background: 'rgb(255,255,255)' }
                                            }>
                                            <TableCell
                                                component="th"
                                                scope="row"
                                                padding="checkbox"
                                                align="left"
                                                className={classes.tableCell}>
                                                {data?.proposal?.totalVotesList[voteType.voteType][
                                                    row
                                                ]?.returnValues?.account ? (
                                                    <NavLink
                                                        href={`/account/${
                                                            data?.proposal?.totalVotesList[
                                                                voteType.voteType
                                                            ][row]?.returnValues?.account
                                                        }`}
                                                        name={
                                                            <Typography variant="body2" noWrap>
                                                                {
                                                                    data?.proposal?.totalVotesList[
                                                                        voteType.voteType
                                                                    ][row]?.returnValues?.account
                                                                }
                                                            </Typography>
                                                        }
                                                    />
                                                ) : null}
                                            </TableCell>
                                            <TableCell
                                                align="right"
                                                padding="checkbox"
                                                className={classes.tableCell}>
                                                {data?.proposal?.totalVotesList[voteType.voteType][
                                                    row
                                                ]?.voteType ? (
                                                    <Typography variant="body2" noWrap>
                                                        {
                                                            data?.proposal?.totalVotesList[
                                                                voteType.voteType
                                                            ][row]?.voteType
                                                        }
                                                    </Typography>
                                                ) : null}
                                            </TableCell>
                                            <TableCell
                                                align="right"
                                                padding="checkbox"
                                                className={classes.tableCell}>
                                                {data?.proposal?.totalVotesList[voteType.voteType][
                                                    row
                                                ]?.returnValues?.weight ? (
                                                    <Typography variant="body2" noWrap>
                                                        {new BigNumber(
                                                            data?.proposal?.totalVotesList[
                                                                voteType.voteType
                                                            ][row]?.returnValues?.weight
                                                        )
                                                            .dividedBy(CELO_FRACTION)
                                                            .toFormat(2)}
                                                    </Typography>
                                                ) : null}
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
                    count={Object.keys(data?.proposal?.totalVotesList[voteType.voteType]).length}
                    rowsPerPage={pageSize}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    backIconButtonProps={{
                        'aria-label': 'Previous',
                        disabled: page === 0
                    }}
                    nextIconButtonProps={{
                        'aria-label': 'Next'
                    }}
                />
            </>
        );
    };

    const VotingTooltip = ({ active, payload }: VotingTooltipProps) => {
        const classes = useStyles();

        if (active) {
            return (
                <Card className={classes.tooltip}>
                    <CardContent className={classes.tooltipCard}>
                        <Grid container>
                            <Grid item xs={5}>
                                <Typography
                                    color="textPrimary"
                                    variant="body2"
                                    align="left"
                                    className={classes.tooltipVoteType}>
                                    {payload[0]?.payload?.name}
                                </Typography>
                            </Grid>
                            <Grid item xs={7}>
                                <Typography color="textPrimary" variant="body2">
                                    {new BigNumber(payload[0]?.payload?.value)
                                        .dividedBy(CELO_FRACTION)
                                        .toFormat(2)}{' '}
                                    (
                                    {new BigNumber(payload[0]?.payload?.value)
                                        .dividedBy(data?.proposal?.votes?.Total)
                                        .multipliedBy(100)
                                        .toFormat(2)}
                                    %)
                                </Typography>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            );
        }

        return null;
    };

    const chartData = data?.proposal?.votes
        ? [
              { name: 'Yes', value: data?.proposal?.votes?.Yes },
              { name: 'No', value: data?.proposal?.votes?.No },
              { name: 'Abstain', value: data?.proposal?.votes?.Abstain }
          ]
        : [];

    const COLORS = [
        'rgba(40, 201, 137, 1)', // Yes
        'rgba(240, 40, 119, 1)', // No
        'rgba(230, 128, 49, 1)'
    ]; // Abstain

    const StyledTabs = withStyles({
        root: {
            paddingBottom: '1.25rem',
            '& div.MuiTabs-scroller': {
                '& .MuiTabs-flexContainer': {
                    display: 'flex',
                    flexWrap: 'wrap'
                },
                ' & .Mui-selected': {
                    color: 'rgba(58, 211, 158, 1)'
                }
            }
        }
    })(Tabs);

    const calculateTotalVotesPercentage = () => {
        const votes = new BigNumber(data?.proposal?.votes?.Total)
            .dividedBy(CELO_FRACTION)
            .toFormat();

        const totalSupply = new BigNumber(chainData?.data?.chain?.celoTotalSupply)
            .dividedBy(CELO_FRACTION)
            .toFormat();

        return numbro((parseFloat(votes) / parseFloat(totalSupply)) * 100).format('0.00');
    };

    if (loading) return <ComponentLoader />;
    if (error) return <ErrorMessage />;

    return (
        <Grid container justify="center" className={classes.container}>
            <Paper className={classes.paper}>
                <Typography color="textPrimary" variant="subtitle1" className={classes.headerLabel}>
                    Voted ({calculateTotalVotesPercentage()}%)
                </Typography>
                <Grid item xs={12}>
                    {data?.proposal?.votes ? (
                        <Typography
                            color="textPrimary"
                            variant="subtitle1"
                            className={classes.priceDisplay}>
                            {new BigNumber(data?.proposal?.votes?.Total)
                                .dividedBy(CELO_FRACTION)
                                .toFormat(2)}
                        </Typography>
                    ) : (
                        <NotAvailable variant="body2" />
                    )}
                </Grid>
                <Grid item xs={12}>
                    {data?.proposal?.votes ? (
                        <Typography
                            color="textSecondary"
                            variant="subtitle1"
                            className={classes.headerLabel}>
                            (~
                            {numbro(
                                new BigNumber(data?.proposal?.votes?.Total)
                                    .dividedBy(CELO_FRACTION)
                                    .toFormat()
                            ).format({ average: true, mantissa: 2 })}{' '}
                            of ~
                            {chainData?.data?.chain?.celoTotalSupply
                                ? numbro(
                                      new BigNumber(chainData?.data?.chain?.celoTotalSupply)
                                          .dividedBy(CELO_FRACTION)
                                          .toFormat(2)
                                  ).format({ average: true, mantissa: 2 })
                                : null}{' '}
                            CELO)
                            <br></br>
                            (~
                            {numbro(Coin(data?.proposal?.votes?.Total, '')).format({
                                average: true,
                                mantissa: 2
                            })}{' '}
                            of ~
                            {chainData?.data?.chain?.celoTotalSupply
                                ? numbro(
                                      Coin(chainData?.data?.chain?.celoTotalSupply, 'CELO', 2)
                                  ).format({
                                      average: true,
                                      mantissa: 2
                                  })
                                : null}{' '}
                            CELO)
                        </Typography>
                    ) : (
                        <NotAvailable variant="body2" />
                    )}
                </Grid>
                <Grid item xs={12}>
                    <PieChart width={350} height={220} className={classes.pieChart}>
                        <Pie
                            data={chartData}
                            cx={120}
                            cy={120}
                            innerRadius={70}
                            outerRadius={80}
                            //fill="#8884d8"
                            strokeWidth={0}
                            paddingAngle={0.5}
                            dataKey="value">
                            {chartData.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip content={<VotingTooltip />} />
                        <Legend
                            layout="vertical"
                            verticalAlign="middle"
                            align="right"
                            height={36}
                            iconType="plainline"
                            iconSize={20}
                        />
                    </PieChart>
                </Grid>
                {data?.proposal?.totalVotesList ? (
                    <Grid item xs={12}>
                        <StyledTabs
                            value={value}
                            //textColor="primary"
                            onChange={handleChange}
                            aria-label="Proposal Vote Tabs"
                            TabIndicatorProps={{
                                style: {
                                    backgroundColor: 'rgba(255, 255, 255, 0.8)'
                                }
                            }}>
                            <Tab
                                label={`All (${
                                    Object.keys(data?.proposal?.totalVotesList['All']).length
                                })`}
                                className={classes.tabs}
                            />
                            <Tab
                                label={`Yes (${
                                    Object.keys(data?.proposal?.totalVotesList['Yes']).length
                                })`}
                                className={classes.tabs}
                            />
                            <Tab
                                label={`No (${
                                    Object.keys(data?.proposal?.totalVotesList['No']).length
                                })`}
                                className={classes.tabs}
                            />
                            <Tab
                                label={`Abstain (${
                                    Object.keys(data?.proposal?.totalVotesList['Abstain']).length
                                })`}
                                className={classes.tabs}
                            />
                        </StyledTabs>
                        <TabPanel value={value} index={0}>
                            <RednderTabs voteType="All" />
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <RednderTabs voteType="Yes" />
                        </TabPanel>
                        <TabPanel value={value} index={2}>
                            <RednderTabs voteType="No" />
                        </TabPanel>
                        <TabPanel value={value} index={3}>
                            <RednderTabs voteType="Abstain" />
                        </TabPanel>
                    </Grid>
                ) : null}
            </Paper>
        </Grid>
    );
};

export default ProposalVotingList;
