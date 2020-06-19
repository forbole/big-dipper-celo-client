
// import React from 'react';
// import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
// import Layout from '../components/Layout';
// import Grid from '@material-ui/core/Grid';
// import BlockDetails from '../components/BlockDetails';
// import {useRouter} from 'next/router'


// const useStyles = makeStyles((theme: Theme) =>
//   createStyles({
//         root: {
//             display: 'inline-block',
//             justifyContent: 'center',
//             },

//         bottomPadding:{
//             overflow: 'auto',
//             padding: '1.5%'
//           },

//           }),
//           );   
          
// export default function Block() {
//   const classes = useStyles();
//   console.log(props)
//   const router = useRouter();
// const {BlockDetails} = router.query;
// console.log(router.query)
//   return (
//     <Layout>
//       <Grid container className={classes.root}  >
//             <Grid item xs={12} className={classes.bottomPadding}> 
//             <BlockDetails {...props}  />
//             </Grid>
//         </Grid>
//     </Layout>
//   );
// }