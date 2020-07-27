import React, { Component } from 'react';


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

    getScreenSize() {
        if (typeof window !== "undefined") {
            if (window.innerWidth < 600) {
                this.setState({
                    screenSize: 'xs'
                })
            }
            else if (window.innerWidth > 600 && window.innerWidth < 960) {
                this.setState({
                    screenSize: 'sm'
                })
            }
            else if (window.innerWidth > 960 && window.innerWidth < 1280) {
                this.setState({
                    screenSize: 'md'
                })
            }
            else {
                this.setState({
                    screenSize: 'lg'
                })
            }
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
                break;
            case 'sm': if (str.length > 12) {
                return str.substr(0, 13) + '...' + str.substr(str.length - 10, str.length)
            }
                break;
            case 'md': if (str.length > 15) {
                return str.substr(0, 15) + '...' + str.substr(str.length - 15, str.length)
            }
                break;
            case 'lg': if (str.length > 25) {
                return str.substr(0, 15) + '...' + str.substr(str.length - 15, str.length)
            }
                break;

            default: return str || ''
        }


    }
}

export default MiddleEllipsis

