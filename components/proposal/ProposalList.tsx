import React from "react";
import cx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import gql from "@apollo/client";
import { useQuery } from "@apollo/client";
import TablePagination from "@material-ui/core/TablePagination";
import * as numbro from "numbro";
import PriceCard from "../PriceCard";
import Chips from "../../components/Chips";
import Link from "../../components/Link";


const useStyles = makeStyles({
  root: {
    display: "flex",
    padding: "1.5%",
  },
  card: {
    display: "block",
    //justifyContent: "center",
    //margin: "2%",
    borderRadius: 4,
    background: "#43484C",
    alignItems: "center",
  },
  value: {
    padding: "0.5rem 1rem",
    textAlign: "left",
  },
  label: {
    display: "flex",
    padding: "0.4rem 0.75rem 0.1rem 0.75rem",
  },
  container: {
    marginTop: "1.5%",
  },
  proposalDescription: {
    padding: "0rem 0 1rem 3rem",
  },
  proposalButton: {
    padding: "0.5rem 1rem 0 0",
    textAlign: "right",
  },
  proposalCard: {
    marginBottom: "0.5rem",
  },
  proposalTitle: {
    padding: "0 0 0.5rem 0.8rem",
    marginTop: "-0.5rem",
  },
});

const ProposalDetails = () => {
  const classes = useStyles();
  const account = "hiu43ruybr3ub3f";
  return (
    <div>
      <Grid container className={classes.container}>
        <Typography variant="body1" className={classes.proposalTitle}>
          Proposals
        </Typography>
        <Grid item xs={12} className={classes.proposalCard}>
          <Card className={classes.card} elevation={0}>
            <Grid container className={classes.container}>
              <Grid item xs={1}>
                <Link
                  href="/proposal/[proposal]/"
                  as={`/proposal/${10}`}
                  color="textPrimary"
                >
                  <Typography variant="body2" className={classes.value}>
                    #10
                </Typography>
                </Link>
              </Grid>
              <Grid item xs={8} sm={9}>
                <Typography variant="body2" className={classes.value}>
                  Proposer{" "}
                  <Link
                    href="/account/[account]/"
                    as={`/account/${account}`}
                    color="secondary"
                  >
                    Michelle Clark
                  </Link>
                </Typography>
              </Grid>
              <Grid item xs={3} sm={2} className={classes.proposalButton}>
                <Chips value="Vote" />
              </Grid>
              <Grid item xs={11} sm={8} className={classes.proposalDescription}>
                Don’t Burn Deposits for Rejected Governance Proposals Unless
                Vetoed
              </Grid>
            </Grid>
          </Card>
        </Grid>

        <Grid item xs={12} className={classes.proposalCard}>
          <Card className={classes.card} elevation={0}>
            <Grid container className={classes.container}>
              <Grid item xs={1}>
                <Typography variant="body2" className={classes.value}>
                  #9
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body2" className={classes.value}>
                  Proposer{" "}
                  <Link
                    href="/account/[account]/"
                    as={`/account/${account}`}
                    color="secondary"
                  >
                    Dan Stanley
                  </Link>
                </Typography>
              </Grid>
              <Grid item xs={3} className={classes.proposalButton}>
                <Chips value="Deposit" />
              </Grid>
              <Grid item xs={12} className={classes.proposalDescription}>
                Adjustment of blocks_per_year to come aligned with actual block
                time
              </Grid>
            </Grid>
          </Card>
        </Grid>

        <Grid item xs={12} className={classes.proposalCard}>
          <Card className={classes.card} elevation={0}>
            <Grid container className={classes.container}>
              <Grid item xs={1}>
                <Typography variant="body2" className={classes.value}>
                  #8
                </Typography>
              </Grid>
              <Grid item xs={8}>
                <Typography variant="body2" className={classes.value}>
                  Proposer{" "}
                  <Link
                    href="/account/[account]/"
                    as={`/account/${account}`}
                    color="secondary"
                  >
                    Walter Water
                  </Link>
                </Typography>
              </Grid>
              <Grid item xs={3} className={classes.proposalButton}>
                <Chips value="Passed" />
              </Grid>
              <Grid item xs={12} className={classes.proposalDescription}>
                Notification for Security Critical Hard Fork at Block 482100
              </Grid>
            </Grid>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default ProposalDetails