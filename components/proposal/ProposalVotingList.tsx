import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "../Link";
import {
    makeStyles, withStyles
} from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import Divider from "@material-ui/core/Divider";
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TablePagination from '@material-ui/core/TablePagination';
import {
    PieChart, Pie, Sector, Cell, Tooltip, Legend, Line
} from 'recharts';
import getConfig from 'next/config'
import NotAvailable from '../misc/NotAvailable'
import ComponentLoader from '../misc/ComponentLoader'
import ErrorMessage from '../misc/ErrorMessage';
import { GET_PROPOSAL } from '../query/Proposal';
import { useQuery } from "@apollo/client";
import BigNumber from 'bignumber.js'

interface Column {
    id: "voter" | "answer" | "voting_power";
    label: string;
    align: any;
}

const columns: Column[] = [
    { id: "voter", label: "Voter", align: "left" },
    { id: "answer", label: "Answer", align: "right" },
    { id: "voting_power", label: "Voting Power", align: "right" },
];



const useStyles = makeStyles(() => {
    return {
        root: {
            width: "100%",
            padding: "0.5rem",
            borderRadius: 5,
            overflowY: "auto",
        },
        container: {
            borderRadius: 5,
            width: "100%",
            overflow: "auto",
            flexWrap: "wrap",


        },

        flexContainer: {
            flexWrap: "wrap",
        },
        voting_power: {
            padding: "0.01em",
            margin: "0.5em",
        },
        tableCell: {
            overflow: "auto",
            padding: "0.5rem",
        },
        table: {
            background: "#4D5155",
            padding: "0",
        },
        paper: {
            padding: "1rem",
            width: "100%",
        },
        headerLabel: {
            padding: "0 0 1rem 0.5rem"
        },

        priceDisplay: {
            paddingLeft: "0.5rem"
        },

        tabs: {
            flexWrap: "wrap",
            fontSize: "1rem",
            textTransform: "none",
            padding: "0 0.5rem 0 0.5rem ",
        },
        pieChart: {
            alignContent: "center",
            marginLeft: "-1.25rem",
            marginTop: "-2.5rem"
        },
    };
});


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
            {...other}
        >
            {value === index && (
                <Grid container>
                    <Grid item xs={12}>
                        <Typography>{children}</Typography>
                    </Grid>
                </Grid>
            )}
        </div>
    );
}

type ProposalVotingListProps = { proposal: string };


const ProposalVotingList = ({ proposal }: ProposalVotingListProps) => {
    const classes = useStyles();
    const { publicRuntimeConfig } = getConfig()
    const proposalNumber = parseInt(proposal)

    const [page, setPage] = React.useState(publicRuntimeConfig.setPage);
    const [pageSize, setPageSize] = React.useState(publicRuntimeConfig.rowXsmall)
    const [value, setValue] = React.useState(0);

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPageSize(+event.target.value);
        setPage(publicRuntimeConfig.setPage);
    };

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };


    const { loading, error, data } = useQuery(GET_PROPOSAL, {
        variables: { proposalNumber },
    });


    const RednderTabs = (voteType: any) => {
        return (<>
            <TableContainer>
                <Table size="medium">
                    <TableHead>
                        <TableRow>
                            {columns.map((column: any, index: number) => (
                                <TableCell
                                    key={index}
                                    align={column.align}
                                    className={classes.table}
                                    padding="checkbox"
                                >
                                    <Typography
                                        variant="body2"
                                        noWrap
                                        className={classes.tableCell}
                                    >
                                        {column.label}
                                    </Typography>
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Object.keys(data.proposal.totalVotesList[voteType.voteType]).map((row: any, index: number) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell
                                        component="th"
                                        scope="row"
                                        padding="checkbox"
                                        align="left"
                                        className={classes.tableCell}
                                    >
                                        {data.proposal.totalVotesList[voteType.voteType][row] && data.proposal.totalVotesList[voteType.voteType][row].returnValues && data.proposal.totalVotesList[voteType.voteType][row].returnValues.account ?
                                            <Link
                                                href="/account/[account]/"
                                                as={`/account/${data.proposal.totalVotesList[voteType.voteType][row].returnValues.account}`}
                                                color="secondary"
                                            >
                                                <Typography variant="body2" noWrap>
                                                    {data.proposal.totalVotesList[voteType.voteType][row].returnValues.account}
                                                </Typography>
                                            </Link> : null}
                                    </TableCell>
                                    <TableCell
                                        align="right"
                                        padding="checkbox"
                                        className={classes.tableCell}
                                    >
                                        {data.proposal.totalVotesList[voteType.voteType][row] && data.proposal.totalVotesList[voteType.voteType][row].voteType ?
                                            <Typography variant="body2" noWrap>
                                                {data.proposal.totalVotesList[voteType.voteType][row].voteType}
                                            </Typography> : null}
                                    </TableCell>
                                    <TableCell
                                        align="right"
                                        padding="checkbox"
                                        className={classes.tableCell}
                                    >
                                        {data.proposal.totalVotesList[voteType.voteType][row] && data.proposal.totalVotesList[voteType.voteType][row].returnValues && data.proposal.totalVotesList[voteType.voteType][row].returnValues.weight ?
                                            <Typography variant="body2" noWrap>
                                                {data.proposal.totalVotesList[voteType.voteType][row].returnValues.weight}
                                            </Typography> : null}
                                    </TableCell>

                                </TableRow>
                            );
                        })
                        }
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[publicRuntimeConfig.rowXsmall, publicRuntimeConfig.rowSmall, publicRuntimeConfig.rowMedium, publicRuntimeConfig.rowLarge, publicRuntimeConfig.rowXlarge,]}
                component="div"
                count={rows.length}
                rowsPerPage={pageSize}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                backIconButtonProps={{
                    'aria-label': 'Previous',
                    'disabled': page === 1,
                }}
                nextIconButtonProps={{
                    'aria-label': 'Next',
                }}
            />
        </>)
    };


    const chartData =
        data && data.proposal && data.proposal.votes ? [
            { name: 'Yes', value: data.proposal.votes.Yes },
            { name: 'No', value: data.proposal.votes.No },
            // { name: 'No With Veto', value: 200 },
            { name: 'Abstain', value: data.proposal.votes.Abstain }
        ] : null;

    const COLORS = ['rgba(40, 201, 137, 1)', // Yes
        'rgba(240, 40, 119, 1)', // No
        'rgba(230, 128, 49, 1)']; // Abstain



    const StyledTabs = withStyles({
        root: {
            paddingBottom: "1.25rem",
            "& div.MuiTabs-scroller": {
                "& .MuiTabs-flexContainer": {
                    display: "flex",
                    flexWrap: "wrap",
                },
                " & .Mui-selected": {
                    color: "rgba(255, 255, 255, 0.8)",
                    //marginBottom: "-0.5rem"
                }
            }
        }
    })(Tabs);


    if (loading) return <ComponentLoader />
    if (error) return <ErrorMessage message={error.message} />

    return (
        <Grid container justify="center" className={classes.container}>
            <Paper className={classes.paper}>
                <Typography
                    color="textPrimary"
                    variant="subtitle1"
                    className={classes.headerLabel}
                >
                    Voted (79.6%)
          </Typography>
                <Grid item xs={12}>
                    {data && data.proposal && data.proposal.votes ?
                        <Typography
                            color="textPrimary"
                            variant="subtitle1"
                            className={classes.priceDisplay}
                        >
                            {new BigNumber(data.proposal.votes.Total).toFormat(2)}
                        </Typography> : <NotAvailable variant="body2" />}
                </Grid>
                <Grid item xs={12}>
                    <Typography
                        color="textSecondary"
                        variant="subtitle1"
                        className={classes.headerLabel}
                    >
                        (~81M of ~186M cGLD)
          </Typography>
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
                            paddingAngle={2}
                            dataKey="value"
                        >
                            {
                                chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                            }
                        </Pie>
                        <Tooltip />
                        <Legend layout="vertical" verticalAlign="middle" align="right" height={36} iconType="plainline" iconSize={20} />
                    </PieChart>
                </Grid>

                <Grid item xs={12}>
                    <StyledTabs
                        value={value}
                        textColor="primary"
                        onChange={handleChange}
                        aria-label="Proposal Vote Tabs"
                        TabIndicatorProps={{
                            style: {
                                backgroundColor: "rgba(255, 255, 255, 0.8)"
                            }
                        }}
                    >
                        <Tab label={`All (${Object.keys(data.proposal.totalVotesList["All"]).length})`} className={classes.tabs} />
                        <Tab label={`Yes (${Object.keys(data.proposal.totalVotesList["Yes"]).length})`} className={classes.tabs} />
                        <Tab label={`No (${Object.keys(data.proposal.totalVotesList["No"]).length})`} className={classes.tabs} />
                        <Tab label={`Abstain (${Object.keys(data.proposal.totalVotesList["Abstain"]).length})`} className={classes.tabs} />
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


            </Paper>
        </Grid>
    );
}

export default ProposalVotingList