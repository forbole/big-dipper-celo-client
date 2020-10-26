import Typography from '@material-ui/core/Typography';
import React from 'react';

import MiddleEllipsis from './MiddleEllipsis';

type ErrorMsgProps = { message: string };

const ErrorMessage = ({ message }: ErrorMsgProps) => {
    return <Typography variant="caption">{message}</Typography>;
};

export default ErrorMessage;
