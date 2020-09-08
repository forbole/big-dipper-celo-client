import React, { useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import { useQuery } from "@apollo/client";
import ComponentLoader from '../misc/ComponentLoader';
import ErrorMessage from '../misc/ErrorMessage';
import { GET_BLOCK } from '../query/Block'
import { GET_EPOCH } from "../query/Epoch"
import { GET_CHAIN } from "../query/Chain"


const EpochCountdown = () => {

    const pageSize = 1;
    const page = 1;
    const blockProposer = useQuery(GET_BLOCK, {
        variables: { pageSize, page },
        pollInterval: 5000,
    });

    const averageBlockTime = useQuery(GET_CHAIN, {
        pollInterval: 5000,
    });

    const { loading, error, data } = useQuery(GET_EPOCH, {
        pollInterval: 5000,
    });

    // const [block, setBlock] = React.useState(blockProposer.data.blocks.blocks[0].number);

    if (blockProposer.loading || averageBlockTime.loading || loading) return <ComponentLoader />
    if (blockProposer.error || averageBlockTime.error || error) return <ErrorMessage message={blockProposer.error.message || averageBlockTime.error.message || error.message} />


    let lastBlockInEpoch = data.epoch && data.epoch.lastBlockNumberForEpoch ? data.epoch.lastBlockNumberForEpoch : null;
    let averageTimeOfBlock = averageBlockTime.data && averageBlockTime.data.chain && averageBlockTime.data.chain.averageBlockTime ? Math.round(averageBlockTime.data.chain.averageBlockTime) : 5;

    let currentBlock = blockProposer.data.blocks && blockProposer.data.blocks.blocks[0] && blockProposer.data.blocks.blocks[0].number ? blockProposer.data.blocks.blocks[0].number : null;
    let blockNow = currentBlock
    let remainingTime = (lastBlockInEpoch - blockNow) * averageTimeOfBlock;
    let remainingTime2 = (data.epoch.lastBlockNumberForEpoch - blockProposer.data.blocks.blocks[0].number)

   
    let x = setInterval(function () {

        let hours = Math.floor((remainingTime % (60 * 60 * 24)) / (60 * 60));
        let minutes = Math.floor((remainingTime % (60 * 60)) / (60));
        let seconds = Math.floor((remainingTime % (60)));

        let hrs = document.getElementById("hours") as HTMLInputElement
        hrs ? hrs.innerHTML = (hours).toString() : '0';
        let mins = document.getElementById("minutes") as HTMLInputElement
        mins ? mins.innerHTML = (minutes).toString() : '0';
        let secs = document.getElementById("seconds") as HTMLInputElement
        secs ? secs.innerHTML = (seconds).toString() : '0';

        // setBlock(block - 1)
        // blockNow--
        //currentBlock = blockProposer.data.blocks.blocks[0].number - 1
        remainingTime = remainingTime - 1;


    }, 1000);

    return (
        <>
            <span id="hours">{"0"}</span> <span> h </span>
            <span id="minutes">{"0"}</span> <span> m </span>
            <span id="seconds">{"0"}</span> <span> s </span>
        </>
    )
}


export default EpochCountdown