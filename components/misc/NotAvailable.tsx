import React from "react";
import Typography from '@material-ui/core/Typography';
import MiddleEllipsis from './MiddleEllipsis'


const NotAvailable = (props: any) => {

    return (
        <Typography variant={props.variant} className={props.className}  >
            <MiddleEllipsis text="Data not available" />
        </Typography>
    )
}

export default NotAvailable