import React from "react";
import Typography from '@material-ui/core/Typography';
import MiddleEllipsis from './MiddleEllipsis'

type NotAvailableProps = { wrap?: boolean, variant: string, className?: string };

const NotAvailable = ({ wrap, variant, className }: NotAvailableProps) => {
    if (wrap) {
        return (
            <Typography variant={variant} className={className}  >
                <MiddleEllipsis text="Data not available" />
            </Typography>
        )

    }
    return (
        <Typography variant={variant} className={className} noWrap>
            Data not available
        </Typography>
    )
}

export default NotAvailable