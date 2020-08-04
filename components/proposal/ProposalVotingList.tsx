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


function createData(voter: string, answer: string, voting_power: string) {
    return { voter, answer, voting_power };
}

const rows = [
    createData("Michelle Clark", "Yes", "56.14575"),
    createData("Rachel Hugh", "Yes", "548748.2545"),
    createData("Natasha", "No", "565.0414561"),
    createData("Rith Jackson", "Yes", "55.1212"),
    createData("Kelly Mendex", "No", "11.02515"),
    createData("Marilym Ford", "Yes", "563.14521141"),
    createData("Fionna Wells", "Yes", "66.11422"),
    createData("Sandra Jones", "No", "898.1471"),
    createData("Beverly", "Yes", "87.152615"),
    createData("Sonia Fone", "Yes", "8.14515165"),
    createData("1087144", "No", "8.0514541"),
    createData("1087143", "Yes", "97.15414"),
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
            padding: "0 2rem 0 0 ",
        },
        pieChart: {
            alignContent: "center",
            marginLeft: "-1.25rem",
            marginTop: "-2.5rem"
        },
    };
});

const ProposalVotingList = () => {
    const rowsOption1 = 10;
    const rowsOption2 = 30;
    const rowsOption3 = 50;

    const classes = useStyles();
    const [page, setPage] = React.useState(1);
    const [pageSize, setPageSize] = React.useState(10)

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPageSize(+event.target.value);
        setPage(0);
    };

    const [value, setValue] = React.useState(0);

    const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
        setValue(newValue);
    };


    const data = [
        { name: 'Yes', value: 500 },
        { name: 'No', value: 300 },
        { name: 'No With Veto', value: 200 },
        { name: 'Abstain', value: 50 },
    ];
    const COLORS = ['rgba(40, 201, 137, 1)', // Yes
        'rgba(240, 40, 119, 1)', // No
        'rgba(39, 113, 202, 1)', //No With Veto
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

    return (
        <Grid container spacing={1} justify="center" className={classes.container}>
            <Paper className={classes.paper}>
                <Typography
                    color="textPrimary"
                    variant="subtitle1"
                    className={classes.headerLabel}
                >
                    Voted (79.6%)
          </Typography>
                <Grid item xs={12}>
                    <Typography
                        color="textPrimary"
                        variant="subtitle1"
                        className={classes.priceDisplay}
                    >
                        81,674,736.604642 cGLD
          </Typography>
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
                            data={data}
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
                                data.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
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
                        <Tab label="All(60)" className={classes.tabs} />
                        <Tab label="Yes(43)" className={classes.tabs} />
                        <Tab label="No With Veto(2)" className={classes.tabs} />
                        <Tab label="No(18)" className={classes.tabs} />
                        <Tab label="Abstain(1)" className={classes.tabs} />
                    </StyledTabs>
                </Grid>
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
                            {rows.map((row: any, index: number) => {
                                return (
                                    <TableRow key={index}>
                                        <TableCell
                                            component="th"
                                            scope="row"
                                            padding="checkbox"
                                            align="left"
                                            className={classes.tableCell}
                                        >
                                            <Link href="#" color="secondary">
                                                <Typography variant="body2" noWrap>
                                                    {" "}
                                                    {row.voter}
                                                </Typography>
                                            </Link>
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                            padding="checkbox"
                                            className={classes.tableCell}
                                        >
                                            <Typography variant="body2" noWrap>
                                                {row.answer}
                                            </Typography>
                                        </TableCell>
                                        <TableCell
                                            align="right"
                                            padding="checkbox"
                                            className={classes.tableCell}
                                        >
                                            <Typography variant="body2" noWrap>
                                                {row.voting_power}
                                            </Typography>
                                        </TableCell>

                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[rowsOption1, rowsOption2, rowsOption3]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={pageSize}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
            </Paper>
        </Grid>
    );
}

export default ProposalVotingList