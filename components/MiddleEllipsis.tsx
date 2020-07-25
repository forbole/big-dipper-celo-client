import React from 'react';

let xsScreen: boolean;
let smallScreen: boolean;
let mediumScreen: boolean;
let largeScreen: boolean;

const getScreenSize = () => {
    if (typeof window !== "undefined") {
        if (window.innerWidth < 600) return (xsScreen = true)
        else if (window.innerWidth > 600 && window.innerWidth < 960) return (smallScreen = true)
        else if (window.innerWidth > 960 && window.innerWidth < 1280) return (mediumScreen = true)
        else return (largeScreen = true)
    }
};

function MiddleEllipsis(str: String) {
    getScreenSize();

    if (xsScreen) {
        if (str.length > 10) {
            return str.substr(0, 5) + '...' + str.substr(str.length - 6, str.length);
        }
    }
    else if (smallScreen) {
        if (str.length > 12) {
            return str.substr(0, 13) + '...' + str.substr(str.length - 10, str.length);
        }
    }
    else if (mediumScreen) {
        if (str.length > 15) {
            return str.substr(0, 15) + '...' + str.substr(str.length - 15, str.length);
        }
    }
    else if (largeScreen) {
        if (str.length > 25) {
            return str.substr(0, 15) + '...' + str.substr(str.length - 15, str.length);
        }

        return <div>{str}</div>
    }
}

export default MiddleEllipsis

