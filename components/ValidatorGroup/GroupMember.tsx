import { useQuery } from '@apollo/client';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import BigNumber from 'bignumber.js';
import numbro from 'numbro';
import React from 'react';

import { GET_VALIDATOR_GROUP } from '../Query/ValidatorGroup';
import Coin from '../Utils/Coin';
import ComponentLoader from '../Utils/ComponentLoader';
import ErrorMessage from '../Utils/ErrorMessage';
import NavLink from '../Utils/NavLink';
import NotAvailable from '../Utils/NotAvailable';

const useStyles = makeStyles(() => {
    return {
        root: {
            width: '100%',
            height: '100%',
            borderRadius: 5,
            wordWrap: 'break-word'
        },
        item: {
            padding: '0.5rem'
        },

        member: {
            display: 'inline-flex',
            verticalAlign: 'middle'
        },
        divider: {
            margin: '0.15rem 0rem',
            backgroundColor: 'rgba(232, 232, 232, 1)'
        },
        arrowIcon: {
            padding: '0.25rem',
            justifyContent: 'center',
            border: 'solid rgba(67, 72, 76, 1) ',
            borderRadius: 5,
            backgroundColor: 'rgba(77, 81, 85, 1)',
            color: 'rgba(255, 255, 255, 0.6)',
            height: '1.5rem',
            width: '1.5rem'
        },
        iconButtonRight: {
            padding: '0',
            float: 'right'
        },
        iconButtonLeft: {
            padding: '0',
            float: 'left'
        },

        centerContent: {
            display: 'flex',
            margin: '1rem 0 -0.5rem 0',
            justifyContent: 'center'
        },

        MuiCardContentRootlastChild: {
            paddingBottom: '0rem'
        },

        cardItem: {
            padding: '1rem'
        },

        dotIcon: {
            height: '0.7rem',
            width: '0.7rem',
            verticalAlign: 'middle',
            color: 'rgba(251, 204, 92, 1)',
            margin: '0 0.25rem 0.25rem 0.75rem'
        },

        memberNumber: {
            paddingRight: '0.5rem',
            marginTop: '0.1rem'
        },

        lowerItem: {
            marginTop: '0.3rem'
        },
        alignRight: {
            float: 'right'
        },
        membersInfo: {
            paddingLeft: '1.5rem'
        }
    };
});

type GroupMemberProps = { validatorGroupAddress: string };

const GroupMember = ({ validatorGroupAddress }: GroupMemberProps): JSX.Element => {
    const classes = useStyles();
    const valGroupAddress = validatorGroupAddress;

    const { loading, error, data } = useQuery(GET_VALIDATOR_GROUP, {
        variables: { valGroupAddress }
    });

    const findElectedValidators = (membersAddress: any, electedValidators: any) => {
        for (const d in Object.keys(electedValidators)) {
            if (electedValidators[d] === membersAddress) {
                return <FiberManualRecordIcon className={classes.dotIcon} />;
            }
        }
    };

    const calculateValidatorRewards = (address: string) => {
        let rewardValue;
        if (data?.validatorGroup?.rewards) {
            if (data?.validatorGroup?.rewards?.validatorAddress === address) {
                rewardValue = data?.validatorGroup?.rewards?.validatorReward;
            }
            if (rewardValue > 0) {
                return Coin(rewardValue, 'cUSD', 2);
            } else {
                return 0;
            }
        }
    };

    if (loading) return <ComponentLoader />;
    if (error) return <ErrorMessage />;
    return (
        <Card className={classes.root}>
            <CardContent>
                <Grid container spacing={1} className={classes.item}>
                    <Grid item xs={12} className={classes.member}>
                        <Typography color="textPrimary" variant="subtitle1" noWrap>
                            Group member
                            {data?.validatorGroup?.members
                                ? ` (${data?.validatorGroup?.members.length})`
                                : null}{' '}
                            <FiberManualRecordIcon className={classes.dotIcon} />
                        </Typography>
                        <Typography
                            color="textPrimary"
                            variant="body2"
                            className={classes.memberNumber}>
                            Elected
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Divider className={classes.divider} />
                    </Grid>
                    {data?.validatorGroup?.members
                        ? data?.validatorGroup?.members.map((row: any, index: number) => {
                              return (
                                  <Grid
                                      container
                                      key={index}
                                      spacing={1}
                                      style={{ paddingBottom: '0.5rem' }}>
                                      <Grid item xs={8} className={classes.member}>
                                          <Typography
                                              variant="body2"
                                              className={classes.memberNumber}>
                                              #{index + 1}
                                          </Typography>
                                          {row?.name || row?.address ? (
                                              <NavLink
                                                  href={`/account/${row.address}`}
                                                  name={
                                                      <Typography variant="body1">
                                                          {row?.name || row?.address}
                                                          {findElectedValidators(
                                                              row?.address,
                                                              data?.validatorGroup
                                                                  ?.electedValidators
                                                          )}
                                                      </Typography>
                                                  }
                                              />
                                          ) : (
                                              <NotAvailable variant="body1" />
                                          )}
                                      </Grid>

                                      <Grid item xs={4}>
                                          {data?.validatorGroup?.membersAccount ? (
                                              <Typography
                                                  variant="body1"
                                                  align="right"
                                                  color="textPrimary">
                                                  {Coin(
                                                      data?.validatorGroup?.membersAccount[index]
                                                          ?.lockedGold?.total,
                                                      'CELO',
                                                      2
                                                  )}
                                              </Typography>
                                          ) : (
                                              <NotAvailable
                                                  variant="body1"
                                                  className={classes.alignRight}
                                              />
                                          )}
                                      </Grid>

                                      <Grid item xs={6}>
                                          <Typography
                                              variant="caption"
                                              className={classes.membersInfo}>
                                              <img src="/images/time.svg" alt="Uptime" />{' '}
                                              {new BigNumber(row.score * 100).toFormat(2)} %
                                          </Typography>
                                          <Typography
                                              variant="caption"
                                              className={classes.membersInfo}>
                                              <img
                                                  src="/images/attestation.svg"
                                                  alt="Attestation"
                                                  style={{ marginRight: '0.2rem' }}
                                              />
                                              {numbro(
                                                  (row.attestationCompleted /
                                                      row.attestationRequested) *
                                                      100
                                              ).format('0.00')}{' '}
                                              %
                                          </Typography>
                                      </Grid>
                                      <Grid item xs={6}>
                                          {data?.validatorGroup?.rewards ? (
                                              <Typography variant="body2" align="right">
                                                  <img
                                                      src="/images/reward.svg"
                                                      alt="Rewards"
                                                      style={{ marginRight: '0.2rem' }}
                                                  />
                                                  {calculateValidatorRewards(row.address)}
                                              </Typography>
                                          ) : (
                                              Coin(0, 'cUSD', 2)
                                          )}
                                      </Grid>
                                  </Grid>
                              );
                          })
                        : null}
                </Grid>
            </CardContent>
        </Card>
    );
};

export default GroupMember;
