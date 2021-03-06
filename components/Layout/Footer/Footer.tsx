import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React from 'react';

import theme from '../../../themes/celo-theme';
import NavLink from '../../Utils/NavLink';

const useStyles = makeStyles({
    root: {
        backgroundColor: '#131619',
        opacity: 1,
        justifyContent: 'center',
        padding: '2rem 0',
        position: 'absolute'
    },
    text: {
        letterSpacing: '1px',
        padding: '0 0 1rem 0',
        display: 'block',
        overflow: 'hidden'
    },
    socialMedia: {
        marginRight: '0.8em',
        display: 'inline-block',
        height: '2rem',
        width: '2rem',
        verticalAlign: 'middle'
    },
    bdLogo: {
        marginLeft: '-9px',
        marginBottom: '-2rem'
    },

    bdIcon: {
        height: '3rem',
        width: '3rem',
        marginRight: '0.3em',
        marginLeft: '-0.55rem',
        display: 'inline-block',
        verticalAlign: 'middle'
    },

    footerLink: {
        color: theme.palette.common.white,
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline'
        }
    },

    logo: {
        paddingLeft: '2rem'
    }
});

const Footer = (): JSX.Element => {
    const classes = useStyles();
    return (
        <footer>
            <Grid container className={classes.root}>
                <Grid item xs={12} md={9} className={classes.logo}>
                    <img
                        src="/images/bigdipper-logo.svg"
                        className={classes.bdLogo}
                        alt="Big Dipper"
                    />
                    <Typography
                        variant="body2"
                        className={classes.text}
                        align="left"
                        color="textSecondary">
                        Big Dipper for Celo, presented by{' '}
                        <Link
                            href="https://forbole.com"
                            className={classes.footerLink}
                            target="_blank">
                            Forbole
                        </Link>
                        .
                    </Typography>

                    <NavLink
                        href="https://github.com/forbole/big-dipper-celo-client"
                        name={<img src="/images/social-media-github.svg" alt="Big Dipper Github" />}
                        className={classes.socialMedia}
                    />

                    <NavLink
                        href="https://medium.com/bigdipperlive"
                        className={classes.socialMedia}
                        name={<img src="/images/social-media-medium.svg" alt="Big Dipper Medium" />}
                    />

                    <NavLink
                        href="https://twitter.com/bigdipperlive"
                        className={classes.socialMedia}
                        name={
                            <img src="/images/social-media-twitter.svg" alt="Big Dipper Twitter" />
                        }
                    />

                    <NavLink
                        href="https://t.me/forbole"
                        className={classes.socialMedia}
                        name={
                            <img
                                src="/images/social-media-telegram.svg"
                                alt="Big Dipper Telegram"
                            />
                        }
                    />
                </Grid>
            </Grid>
        </footer>
    );
};

export default Footer;
