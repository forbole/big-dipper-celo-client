import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';


const MiddleEllipsis = (props: any) => {
    const theme = useTheme();
    const xs = useMediaQuery(theme.breakpoints.up('xs'));
    const sm = useMediaQuery(theme.breakpoints.up('sm'));
    const md = useMediaQuery(theme.breakpoints.up('md'));
    const lg = useMediaQuery(theme.breakpoints.up('lg'));

    let str = props.text

    if (xs) {
        if (str.length > 10) {
            return str.substr(0, 5) + '...' + str.substr(str.length - 6, str.length)
        }
        else {
            return str;
        }
    }
    else if (sm) {
        if (str.length > 12) {
            return str.substr(0, 6) + '...' + str.substr(str.length - 10, str.length)
        }
        else {
            return str;
        }
    }
    else if (md) {
        if (str.length > 15) {
            return str.substr(0, 7) + '...' + str.substr(str.length - 15, str.length)
        } else {
            return str;
        }
    }
    else if (lg) {
        if (str.length > 17) {
            return str.substr(0, 9) + '...' + str.substr(str.length - 15, str.length)
        }
        else {
            return str;
        }
    }
    else {
        return str;
    }

}

export default MiddleEllipsis

