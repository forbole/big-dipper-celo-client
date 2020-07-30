import Skeleton from '@material-ui/lab/Skeleton';
import React from "react";

const ComponentLoader = (props: any) => {
    if (props.size === "small") {
        return (<>
            <Skeleton animation="wave" height={20} />
            <Skeleton animation="wave" height={25} />
            <Skeleton animation="wave" height={30} />
        </>
        )
    }
    else {
        return (<>
            <Skeleton animation="wave" height={20} />
            <Skeleton animation="wave" height={25} />
            <Skeleton animation="wave" height={30} />
            <Skeleton animation="wave" height={35} />
            <Skeleton animation="wave" height={40} />
        </>
        )
    }
}

export default ComponentLoader 