import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import Link from "../Link";
import { makeStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@material-ui/core/IconButton";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import { useRouter } from "next/router";
import gql from "@apollo/client";
import { useQuery } from "@apollo/client";
import ContentLoader from "react-content-loader";
import moment from "moment";
import LedgerButtons from "../ledger/LedgerButtons";
import NotAvailable from '../misc/NotAvailable'
import ComponentLoader from '../misc/ComponentLoader'
import ErrorMessage from '../misc/ErrorMessage';
import { GET_PROPOSAL } from '../query/Proposal';
import { GET_PROPOSALS } from '../query/Proposal';
import BigNumber from 'bignumber.js';
import MarkdownView from 'react-showdown';
import getConfig from 'next/config';
import Vote from "../ledger/proposal/vote/Vote"
import Deposit from '../ledger/proposal/deposit/Deposit'

const useStyles = makeStyles(() => {
  return {
    root: {
      width: "100%",
      // padding: "1%",
      borderRadius: 5,
      wordWrap: "break-word",
    },
    item: {
      padding: "0 0 0 0.5rem",
    },
    divider: {
      margin: "0.5rem 0 0 0",
      backgroundColor: "rgba(232, 232, 232, 1)",
    },
    arrowIcon: {
      padding: "0.25rem",
      justifyContent: "center",
      border: "solid 1px rgba(67, 72, 76, 1) ",
      borderRadius: 5,
      backgroundColor: "rgba(255, 255, 255, 0.6) ",
      color: "rgba(77, 81, 85, 1)",
      height: "1.5rem",
      width: "1.5rem",
    },
    iconButtonRight: {
      padding: "0",
      float: "right",
      "&:disabled": {
        display: "none"
      }
    },
    iconButtonLeft: {
      padding: "0",
      float: "left",
      "&:disabled": {
        display: "none"
      }
    },

    centerContent: {
      display: "flex",
      margin: "1rem 0 -0.5rem 0",
      // justifyContent: "center",
      textAlign: "center"
    },

    MuiCardContentRootlastChild: {
      paddingBottom: "0rem",
    },

    alignRight: {
      float: 'right',
      wordWrap: 'break-word',
      overflowWrap: 'anywhere',
      display: "flex",
      textAlign: "right"
    },

    markdownFile: {
      '& a': {
        color: 'rgba(58, 211, 158, 1)'
      }
    }
  };
});

type ProposalDetailsProps = { proposalNum: string, proposalDetails: string };

const ProposalDetails = ({ proposalNum, proposalDetails }: ProposalDetailsProps) => {

  const getProposal = proposalDetails.split("\n")
  const proposalTitle = getProposal[0].replace('#', ' ')
  const proposalNumber = parseInt(proposalNum)
  const prevProposal: number = proposalNumber - 1;
  const nextProposal: number = proposalNumber + 1;
  const [maxProposalNumber, setMaxProposalNumber] = React.useState(false);
  const [minProposalNumber, setMinProposalNumber] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState('');
  const [voted, setVoted] = React.useState(false);


  const { loading, error, data } = useQuery(GET_PROPOSAL, {
    variables: { proposalNumber },
  });

  const { publicRuntimeConfig } = getConfig()
  const page = publicRuntimeConfig.setPage;
  const pageSize = publicRuntimeConfig.rowMedium;
  const field = "proposalNumber"

  const totalProposals = useQuery(GET_PROPOSALS, {
    variables: { page, pageSize, field },
  });

  const classes = useStyles();
  const totalNumOfProposals = totalProposals.data && totalProposals.data.proposals && totalProposals.data.proposals.proposals ? totalProposals.data.proposals.proposals.length : 0;

  useEffect(() => {
    let localUser = localStorage.getItem('currentUserAddress');
    //@ts-ignore
    setCurrentUser(localUser)

    if (proposalNumber === totalNumOfProposals) {
      setMaxProposalNumber(true)
    }

    if (proposalNumber === 1) {
      setMinProposalNumber(true)
    }
    if (data && data.proposal && data.proposal.upvoteList) {
      for (let c in data.proposal.upvoteList) {
        if (data.proposal.upvoteList[c].returnValues.account === currentUser) {
          setVoted(true)
        }
      }
    }

  });

  console.log(voted)
  if (loading) return <ComponentLoader />
  if (error) return <ErrorMessage message={error.message} />

  return (
    <Card className={classes.root}>
      <CardContent>
        <Grid container spacing={1} justify="center" className={classes.item}>
          <Grid item xs={10}>
            <Typography variant="subtitle1" gutterBottom>
              Proposal Details
            </Typography>
          </Grid>

          <Grid item xs={1}>
            <Link
              href={`/proposal/${prevProposal}`}
              color="secondary"
            >
              <IconButton
                aria-label="Previous Proposal"
                className={classes.iconButtonRight}
                disabled={minProposalNumber}
              >
                <ArrowBackIosIcon className={classes.arrowIcon} />
              </IconButton>
            </Link>
          </Grid>
          <Grid item xs={1}>
            <Link
              href={`/proposal/${nextProposal}`}
              color="secondary"
            >
              {" "}
              <IconButton
                aria-label="Next Proposal"
                className={classes.iconButtonLeft}
                disabled={maxProposalNumber}
              >
                <ArrowForwardIosIcon className={classes.arrowIcon} />
              </IconButton>
            </Link>
          </Grid>

          <Grid item xs={12}>
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={6} className={classes.item}>
            <Typography variant="body2" gutterBottom>
              Proposal ID
            </Typography>
          </Grid>
          <Grid item xs={6} >
            <Typography variant="body2" className={classes.alignRight} >
              {data.proposal && data.proposal.returnValues && data.proposal.returnValues.proposalId
                ? data.proposal.returnValues.proposalId
                : <NotAvailable variant="body2" />}

            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={4} lg={6} className={classes.item}>
            <Typography variant="body2" >
              Proposer
            </Typography>
          </Grid>
          <Grid item xs={8} lg={6}  >
            <Typography variant="body2" className={classes.alignRight} >
              {data.proposal && data.proposal.returnValues && data.proposal.returnValues.proposer
                ?
                <Link href={`/account/${data.proposal.returnValues.proposer}`} color="secondary">
                  {data.proposal.returnValues.proposer}
                </Link>
                : <NotAvailable variant="body2" />}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={12} className={classes.item}>
            <Typography variant="body2"  >
              Title
            </Typography>
            <Typography variant="body2"  >
              {proposalTitle ?
                proposalTitle
                : <NotAvailable variant="body2" />}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={12} className={classes.item}>
            <Typography variant="body2"  >
              Description
            </Typography>

            <Typography variant="body2" className={classes.markdownFile}>
              {proposalDetails ?
                <MarkdownView
                  markdown={proposalDetails}
                  options={{ tables: true, emoji: true, simplifiedAutoLink: true, smoothLivePreview: true, openLinksInNewWindow: true, }}
                  flavor="vanilla"
                />
                : <NotAvailable variant="body2" />}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={4} lg={6} className={classes.item}>
            <Typography variant="body2"  >
              Deposit
            </Typography>
          </Grid>
          <Grid item xs={8} lg={6}  >
            {data.proposal && data.proposal.returnValues && data.proposal.returnValues.deposit ?
              < Typography variant="body2" className={classes.alignRight} >
                {new BigNumber((data.proposal.returnValues.deposit) / process.env.CELO).toFormat()}
              </Typography> : <NotAvailable variant="body2" />}
          </Grid>

          <Grid item xs={12}>
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={4} lg={6} className={classes.item}>
            <Typography variant="body2"  >
              Submitted Time
            </Typography>
          </Grid>
          <Grid item xs={8} lg={6}  >
            {data.proposal && data.proposal.returnValues && data.proposal.returnValues.timestamp ?
              <Typography variant="body2" className={classes.alignRight} >
                {new Date(parseInt(data.proposal.returnValues.timestamp) * 1000).toUTCString()}
              </Typography> : <NotAvailable variant="body2" />}
          </Grid>

          <Grid item xs={12}>
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={4} lg={6} className={classes.item}>
            <Typography variant="body2"  >
              Deposit End Time
            </Typography>
          </Grid>
          <Grid item xs={8} lg={6}  >
            {data.proposal && data.proposal.executionEpoch ?
              < Typography variant="body2" className={classes.alignRight} >
                {new Date((data.proposal.executionEpoch) * 1000).toUTCString()}
              </Typography> : <NotAvailable variant="body2" />}
          </Grid>

          <Grid item xs={12}>
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={4} lg={6} className={classes.item}>
            <Typography variant="body2"  >
              Voting Start Time
            </Typography>
          </Grid>
          <Grid item xs={8} lg={6}  >
            {data.proposal && data.proposal.referrendumEpoch ?
              < Typography variant="body2" className={classes.alignRight} >
                {new Date((data.proposal.referrendumEpoch) * 1000).toUTCString()}
              </Typography> : <NotAvailable variant="body2" />}
          </Grid>

          <Grid item xs={12}>
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={4} lg={6} className={classes.item}>
            <Typography variant="body2"  >
              Voting End Time
            </Typography>
          </Grid>
          <Grid item xs={8} lg={6}  >
            {data.proposal && data.proposal.expirationEpoch ?
              < Typography variant="body2" className={classes.alignRight} >
                {new Date((data.proposal.expirationEpoch) * 1000).toUTCString()}
              </Typography> : <NotAvailable variant="body2" />}
          </Grid>

          <Grid item xs={12}>
            <Divider variant="middle" className={classes.divider} />
          </Grid>

          <Grid item xs={12} className={classes.centerContent}>
            {voted ?
              <Vote showButton={true} proposalTit={proposalTitle} proposalNum={proposalNumber} proposalDet={proposalDetails} proposer={data.proposal && data.proposal.returnValues && data.proposal.returnValues.proposer ? data.proposal.returnValues.proposer : ''} />
              : <Deposit showButton={true} proposalTit={proposalTitle} proposalNum={proposalNumber} proposalDet={proposalDetails} proposer={data.proposal && data.proposal.returnValues && data.proposal.returnValues.proposer ? data.proposal.returnValues.proposer : ''} />}
          </Grid>
        </Grid>
      </CardContent>
    </Card >
  );
}

export default ProposalDetails