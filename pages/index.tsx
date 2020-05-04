// import React from 'react';
// import Typography from '@material-ui/core/Typography';
// import Box from '@material-ui/core/Box';
// import Link from '../components/Link';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// import { updateAnnouncement } from '../redux/actions/actions';
// import CssBaseline from '@material-ui/core/CssBaseline';
// import SearchBar from '../components/SearchBar';
// import ChartData from '../components/ChartData';
// import LatestBlocks from '../components/LatestBlocks';
// import Container from '@material-ui/core/Container';
// import NetworkDropdown from '../components/NetworkDropdown';
// import Grid from '@material-ui/core/Grid';
// import VpnKeyIcon from '@material-ui/icons/VpnKey';
// import LatestTransactions from '../components/LatestTransactions'
// import Footer from '../components/Footer'

// interface IProps {
//   announcementMessage: string
//   updateAnnouncement: any
// }

// interface IState {}

// class IndexPage extends React.Component<IProps, IState> {
//   render() {
//     const { announcementMessage, updateAnnouncement } = this.props
//     return (
//       <Box my={4}>
//         <Typography variant="h4" component="h1" gutterBottom>
//           Celo
//         </Typography>
//         <ChartData />
//       </Box>
      
//     )
//   }
// }

// const mapStateToProps = (state) => ({
//   announcementMessage: state.message,
// })

// const mapDispatchToProps = (dispatch) => ({
//   updateAnnouncement: bindActionCreators(updateAnnouncement, dispatch)
// })







// export default connect(mapStateToProps, mapDispatchToProps)(IndexPage)


import React from 'react';
import Layout from '../components/Layout';
import ChartData from '../components/ChartData';
import LatestBlocks from '../components/LatestBlocks';
import LatestTransactions from '../components/LatestTransactions';
import Grid from '@material-ui/core/Grid';
import Transactions from '../components/Transactions'



export default function Index() {
  return (
    <Layout>
      <ChartData />
<span> <LatestBlocks /></span>
&nbsp;
    <span> <LatestTransactions /></span> 
     

      </Layout>
  );
}