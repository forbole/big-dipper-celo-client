import { createStyles, makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Jdenticon from 'react-jdenticon';

const useStyles = makeStyles(() =>
    createStyles({
        jdenticon: {
            display: 'flex',
            border: 'solid 1.5px rgba(8, 178, 122, 1)',
            paddingTop: '0.3rem',
            paddingLeft: '0.3rem',
            paddingRight: '0.2rem',
            borderRadius: 50
        }
    })
);

type AvatarProps = { value: string };

const Avatar = ({ value }: AvatarProps): JSX.Element => {
    const classes = useStyles();

    return (
        <div className={classes.jdenticon}>
            <Jdenticon size="35" value={value} />
        </div>
    );
};

export default Avatar;
