import { Variant } from '@material-ui/core/styles/createTypography';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import MiddleEllipsis from './MiddleEllipsis';

type NotAvailableProps = {
    wrap?: boolean;
    variant: Variant;
    className?: string;
    color?: 'textPrimary' | 'textSecondary';
};

const NotAvailable = ({ wrap, variant, className, color }: NotAvailableProps): JSX.Element => {
    if (wrap) {
        return (
            <Typography variant={variant} className={className} color={color || 'textPrimary'}>
                <MiddleEllipsis text="Data not available" />
            </Typography>
        );
    }
    return (
        <Typography variant={variant} className={className} noWrap>
            Data not available
        </Typography>
    );
};

export default NotAvailable;
