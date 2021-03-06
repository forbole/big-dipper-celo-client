import { useQuery } from '@apollo/client';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import { GET_TX_DETAILS } from '../Query/Transaction';
import ComponentLoader from '../Utils/ComponentLoader';

const useStyles = makeStyles(() => {
    return {
        card: {
            display: 'flex',
            padding: '1rem',
            justifyContent: 'center',
            background: 'rgba(255, 255, 255, 1)',
            borderRadius: 5
        }
    };
});
type InputCardProps = { hash: string };

const InputCard = ({ hash }: InputCardProps): JSX.Element => {
    const classes = useStyles();
    const callData: any = [];

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { loading, error, data } = useQuery(GET_TX_DETAILS, {
        variables: { hash }
    });

    if (loading) return <ComponentLoader />;

    const getCallData = () => {
        if (data?.transaction?.decodedInput?.params) {
            for (const c in data?.transaction?.decodedInput?.params) {
                callData[c] = data?.transaction?.decodedInput?.params[c]?.type;
                callData[c] += ' ' + data?.transaction?.decodedInput?.params[c]?.name;
            }
        } else {
            for (const c in data?.transaction?.decodedInput) {
                for (const e in data?.transaction?.decodedInput[c].events) {
                    callData[e] = data?.transaction?.decodedInput[c]?.events[e].type;
                    callData[e] += ' ' + data?.transaction?.decodedInput[c]?.events[e].name;
                }
            }
        }
        return callData.join(', ');
    };

    if (data?.transaction?.decodedInput) {
        return (
            <Card className={classes.card}>
                <Grid container spacing={1}>
                    <Grid item xs={6}>
                        <Typography align="left" variant="body2">
                            Method Id
                        </Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography align="right" variant="body2" color="textSecondary">
                            {data?.transaction?.input?.substr(
                                0,
                                data?.transaction?.input.indexOf('000000')
                            )}
                        </Typography>
                    </Grid>
                    <Grid item xs={1}>
                        <Typography align="left" variant="body2">
                            Call
                        </Typography>
                    </Grid>
                    <Grid item xs={11}>
                        <Typography align="right" variant="body2" color="textSecondary">
                            {data?.transaction?.decodedInput?.name ??
                                data?.transaction?.decodedInput[0]?.name}
                            ({getCallData()})
                        </Typography>
                    </Grid>
                </Grid>
            </Card>
        );
    } else return null as any;
};

export default InputCard;
