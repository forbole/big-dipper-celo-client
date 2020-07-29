import Skeleton from '@material-ui/lab/Skeleton';
import React from "react";

const RenderSkeleton = () => {
    return (<>
        <Skeleton animation="wave" height={40} />
        <Skeleton animation="wave" height={40} />
        <Skeleton animation="wave" height={40} />
        <Skeleton animation="wave" height={40} />
        <Skeleton animation="wave" height={40} />
    </>
    )
}

export default RenderSkeleton