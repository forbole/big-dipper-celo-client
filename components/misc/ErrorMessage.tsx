import React from "react";
import Typography from '@material-ui/core/Typography';
import MiddleEllipsis from './MiddleEllipsis'


const ErrorMessage = (props: any) => {

    return (
        <Typography variant="caption" >
            {props.message}
        </Typography>
    )
}

export default ErrorMessage