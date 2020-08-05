import React from "react";
import Typography from '@material-ui/core/Typography';
import MiddleEllipsis from './MiddleEllipsis'


const NotAvailable = (props: any) => {
    if (props.wrap) {
        return (
            <Typography variant={props.variant} className={props.className}  >
                <MiddleEllipsis text="Data not available" />
            </Typography>
        )

    }
    return (
        <Typography variant={props.variant} className={props.className} noWrap>
            Data not available
        </Typography>
    )
}

export default NotAvailable