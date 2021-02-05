import BigNumber from 'bignumber.js';
import React from 'react';

const Coin = (
    value: string | number,
    denom: string,
    fraction?: number,
    multiply?: number
): React.ReactNode => {
    const CELO_FRACTION = process.env.CELO_FRACTION ? parseInt(process.env.CELO_FRACTION) : 1e18;
    const denomValue = typeof value != 'number' ? parseFloat(value) : value;
    const mintDenom = new BigNumber(denomValue);
    const stakingDenom = !multiply
        ? new BigNumber(denomValue).dividedBy(CELO_FRACTION)
        : new BigNumber(denomValue).dividedBy(CELO_FRACTION).times(multiply);

    if (stakingDenom.isGreaterThanOrEqualTo(0)) {
        if (fraction) {
            return `${stakingDenom.toFormat(fraction)} ${denom}`;
        } else {
            return `${stakingDenom.toFormat()} ${denom}`;
        }
    } else if (stakingDenom.isLessThan(0.0001)) {
        return `${mintDenom.toFormat()} CELO Wei`;
    }
};
//sprawdz bo do block gas is used gwei so how many gwei to stakiingdenom

export default Coin;
