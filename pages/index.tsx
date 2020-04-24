import React from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Link from '../components/Link';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { updateAnnouncement } from '../redux/actions/actions';

interface IProps {
  announcementMessage: string
  updateAnnouncement: any
}

interface IState {}

class IndexPage extends React.Component<IProps, IState> {
  render() {
    const { announcementMessage, updateAnnouncement } = this.props
    return (
      <Box my={4}>
        <Typography variant="h4" component="h1" gutterBottom>
          Celo
        </Typography>
        <Link href="/#" color="primary">
          Go to the about page
        </Link>
      </Box>
    )
  }
}

const mapStateToProps = (state) => ({
  announcementMessage: state.message,
})

const mapDispatchToProps = (dispatch) => ({
  updateAnnouncement: bindActionCreators(updateAnnouncement, dispatch)
})







export default connect(mapStateToProps, mapDispatchToProps)(IndexPage)