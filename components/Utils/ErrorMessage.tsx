import Typography from '@material-ui/core/Typography';
import React from 'react';

type ErrorMsgProps = { message?: string };

const ErrorMessage = ({ message }: ErrorMsgProps): JSX.Element => {
    return (
        <Typography variant="caption">
            {message ? message : 'Connection error. Please try again later. '}
        </Typography>
    );
};

export default ErrorMessage;
