import React from "react";
import Typography from '@material-ui/core/Typography';
import MiddleEllipsis from './MiddleEllipsis'
import { Variant } from '@material-ui/core/styles/createTypography'

type NotAvailableProps = { wrap?: boolean, variant: Variant, className?: string, color?: "textPrimary" | "textSecondary" };

const NotAvailable = ({ wrap, variant, className, color }: NotAvailableProps) => {
    if (wrap) {
        return (
            <Typography variant={variant} className={className} color={color || "textPrimary"} >
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

