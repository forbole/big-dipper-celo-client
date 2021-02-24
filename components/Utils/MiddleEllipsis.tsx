import { useTheme } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';

type AppProps = { text: string };

const MiddleEllipsis = ({ text }: AppProps): JSX.Element => {
    const theme = useTheme();
    const xs = useMediaQuery(theme.breakpoints.up('xs') && theme.breakpoints.down('sm'));
    const sm = useMediaQuery(theme.breakpoints.up('sm') && theme.breakpoints.down('md'));
    const md = useMediaQuery(theme.breakpoints.up('md') && theme.breakpoints.down('lg'));
    const lg = useMediaQuery(theme.breakpoints.up('lg'));

    const str = text;

    if (xs) {
        if (str.length > 10) {
            return (
                <>
                    {str.substr(0, 5)}...{str.substr(str.length - 5, str.length)}
                </>
            );
        } else {
            return <>{str}</>;
        }
    } else if (sm) {
        if (str.length > 12) {
            return (
                <>
                    {str.substr(0, 6)}...{str.substr(str.length - 15, str.length)}
                </>
            );
        } else {
            return <>{str}</>;
        }
    } else if (md) {
        if (str.length > 15) {
            return (
                <>
                    {str.substr(0, 7)}...{str.substr(str.length - 22, str.length)}
                </>
            );
        } else {
            return <>{str}</>;
        }
    } else if (lg) {
        if (str.length > 17) {
            return (
                <>
                    {str.substr(0, 8)}...{str.substr(str.length - 25, str.length)}
                </>
            );
        } else {
            return <>{str}</>;
        }
    } else {
        return <>{str}</>;
    }
};

export default MiddleEllipsis;
