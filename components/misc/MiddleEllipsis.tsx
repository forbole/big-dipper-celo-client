import React, { Component } from 'react';
import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

interface TextProps {
    text: String;
}


class MiddleEllipsis extends React.Component<TextProps, { screenSize: String }>{
    constructor(props: any) {
        super(props);
        this.state = {
            screenSize: '',
        }
    }


    getScreenSize = () => {
        const theme = useTheme();
        const xs = useMediaQuery(theme.breakpoints.up('xs'));
        const sm = useMediaQuery(theme.breakpoints.up('sm'));
        const md = useMediaQuery(theme.breakpoints.up('md'));
        const lg = useMediaQuery(theme.breakpoints.up('lg'));

        if (xs) {
            return this.setState({
                screenSize: 'xs'
            })
        }
        else if (sm) {
            return this.setState({
                screenSize: 'sm'
            })
        }
        else if (md) {
            return this.setState({
                screenSize: 'md'
            })
        }
        else {
            return this.setState({
                screenSize: 'lg'
            })
        }


    }


    componentDidMount() {
        this.getScreenSize();
    }

    render() {

        let str = this.props.text

        switch (this.state.screenSize) {
            case 'xs': if (str.length > 10) {
                return str.substr(0, 5) + '...' + str.substr(str.length - 6, str.length)
            }
            else {
                return str;
            }
            case 'sm': if (str.length > 12) {
                return str.substr(0, 6) + '...' + str.substr(str.length - 10, str.length)
            }
            else {
                return str;
            }
            case 'md': if (str.length > 15) {
                return str.substr(0, 7) + '...' + str.substr(str.length - 15, str.length)
            } else {
                return str;
            }
            case 'lg': if (str.length > 20) {
                return str.substr(0, 9) + '...' + str.substr(str.length - 15, str.length)
            }
            else {
                return str;
            }

            default: return str
        }


    }
}

export default MiddleEllipsis

