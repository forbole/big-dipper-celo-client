import React from 'react';
import cx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import Slider from '@material-ui/core/Slider';
import Container from '@material-ui/core/Container';


const useStyles = makeStyles(({ spacing, palette }) => {
  const family =
    '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol"';
  return {
    root: {
        display: 'flex',
      },
    card: {
    display: 'inline-block',
    justifyContent: 'center',
      //padding: 10,
      minWidth: 88,
      height: 60,
      width: 173,
      borderRadius: 5,
      boxShadow: '0 2px 4px 0 rgba(138, 148, 159, 0.2)',
      '& > *:nth-child(1)': {
        marginRight: spacing(2),
      },
      '& > *:nth-child(2)': {
        flex: 'auto',
      },
      background: '#43484C'
    },
    avatar: {},
    heading: {
      fontFamily: family,
      fontSize: 25,
      marginBottom: 2,
      marginTop: 0,
      marginLeft: '15px',
    },
    subheader: {
      fontFamily: family,
      fontSize: 13,
      letterSpacing: '1px',
      marginBottom: 1,
      marginTop: 2,
      marginLeft: '15px',
    },
    value: {
      marginLeft: 8,
      fontSize: 14,
      color: palette.grey[500],
    },
  };
});

const useSliderStyles = makeStyles(() => ({
  root: {
    height: 4,
    justifyContent: 'center',

  },
//   rail: {
//     borderRadius: 10,
//     height: 4,
//     backgroundColor: 'rgb(202,211,216)',
//   },
//   track: {
//     borderRadius: 10,
//     height: 4,
//     backgroundColor: 'rgb(117,156,250)',
//   },
  thumb: {
    display: 'none',
  },
}));

const KanbanCard = () => {
  const styles = useStyles();
  const sliderStyles = useSliderStyles();
  return (
    <Container style={{ marginTop: 10 }} >
      <div className="chart-card mb-r"  >
    <Card className={cx(styles.card)} elevation={0}  style={{ justifyContent: 'center' }}>
      <Box >
      <div className={styles.subheader}>cGLD Price</div>
        <div className={styles.heading}>$2.8</div>
      </Box>
    </Card>
    <Card className={cx(styles.card)} elevation={0}  style={{ justifyContent: 'center' }}>
      <Box>
      <div className={styles.subheader}>cGLD Price</div>
        <div className={styles.heading}>$2.8</div>
      </Box>
    </Card>
    <Card className={cx(styles.card)} elevation={0}  style={{ justifyContent: 'center' }}>
      <Box>
      <div className={styles.subheader}>cGLD Price</div>
        <div className={styles.heading}>$2.8</div>
      </Box>
    </Card>
    <Card className={cx(styles.card)} elevation={0}  style={{ justifyContent: 'center' }}>
      <Box>
      <div className={styles.subheader}>cGLD Price</div>
        <div className={styles.heading}>$2.8</div>
      </Box>
    </Card>
    <Card className={cx(styles.card)} elevation={0}  style={{ justifyContent: 'center' }}>
      <Box>
      <div className={styles.subheader}>cGLD Price</div>
        <div className={styles.heading}>$2.8</div>
      </Box>
    </Card>
    <Card className={cx(styles.card)} elevation={0}  style={{ justifyContent: 'center' }}>
      <Box>
      <div className={styles.subheader}>cGLD Price</div>
        <div className={styles.heading}>$2.8</div>
        {/* <Box display={'flex'} alignItems={'center'}>
        </Box> */}
      </Box>
    </Card>
    </div>
</Container>
  );
};

export default KanbanCard;