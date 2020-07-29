import Skeleton from '@material-ui/lab/Skeleton';
import React from "react";

export const rednerSkeleton = () => {
    return (<>
        <Skeleton animation="wave" height={50} />
        <Skeleton animation="wave" height={50} />
        <Skeleton animation="wave" height={50} />
        <Skeleton animation="wave" height={50} />
        <Skeleton animation="wave" height={50} />
    </>
    )
}