import React from "react";
import Typography from '@material-ui/core/Typography';

const NotAvailable = (props: any) => {
    // const classes = useStyles();
    const variant: string = (props.variant).toString();
    <Typography variant={variant} noWrap >Data currently not available</Typography>
    return <span></span>
}

export default NotAvailable