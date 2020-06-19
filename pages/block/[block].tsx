import React from "react";
import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import Layout from "../../components/Layout";
import Grid from "@material-ui/core/Grid";
import BlockDetails from "../../components/BlockDetails";
import { useRouter } from "next/router";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      justifyContent: "center",
    },

    bottomPadding: {
      overflow: "auto",
      // paddingTop: '1.5%',
      // paddingBottom: '1.5%',
      padding: "1rem",
    },
  })
);

export default function Block() {
  const classes = useStyles();
  const router = useRouter();
  const { Block } = router.query;
  // const pid = parseInt(router.query.block);
  return (
    <Layout>
      <Grid container className={classes.root}>
        <Grid item xs={12} sm={8} className={classes.bottomPadding}>
          <BlockDetails />
        </Grid>
      </Grid>
    </Layout>
  );
}

// // function Post(props){
// //   return
// // }

// // Block.getInitialProps = ({query } : NextContext) => {
// //   return {number: query.number}
// // };

// // React.useEffect(() => {
// //   const canvasRef = React.useRef(null)
// //   const canvas = canvasRef.current
// //   const ctx = canvas.getContext('2d')
// //   ctx.clearRect(0, 0, window.innerHeight, window.innerWidth)
// // })

// // Block.getInitialProps = async ({ res, query }) => {

// //   let r = await fetch(`http://localhost:3000/block/${ctx.query}`);
// //   let feed = await r.json();

// //   if (feed.error && res) {
// //     res.statusCode = 404;
// //   }

// //   return {
// //     feed
// //   };
// // }

// // export const getStaticProps: GetStaticProps = async (context) => {
// //   // ...

// // };

// //export default Block

// /////////////////////////////////////////////////////////////////////////////////////////////////////////////////

// import React from "react";
// import Typography from "@material-ui/core/Typography";
// import Link from "../../components/Link";
// import {
//   createStyles,
//   makeStyles,
//   useTheme,
//   Theme,
// } from "@material-ui/core/styles";
// import Divider from "@material-ui/core/Divider";
// import Grid from "@material-ui/core/Grid";
// import Card from "@material-ui/core/Card";
// import Layout from "./Layout";
// import CardContent from "@material-ui/core/CardContent";
// import IconButton from "@material-ui/core/IconButton";
// import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
// import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
// import { useRouter } from "next/router";
// import gql from "graphql-tag";
// import { useQuery } from "@apollo/react-hooks";
// import TablePagination from "@material-ui/core/TablePagination";
// import * as numbro from "numbro";
// import { NextContext, GetServerSideProps } from "next";
// import ContentLoader, { Facebook } from "react-content-loader";

// //import MiddleEllipsis from "react-middle-ellipsis";

// const GET_BLOCK_DETAILS = gql`
//   query Block($number: Int) {
//     block(number: $number) {
//       timestamp
//       transactions {
//         transactionIndex
//         nonce
//       }
//       size
//       miner {
//         name
//         signer
//       }
//       hash
//       parentHash
//       totalDifficulty
//       gasUsed
//       gasLimit
//     }
//   }
// `;

// // export const getStaticProps: GetStaticProps = async (context) => {
// //   const GET_BLOCK_DETAILS = gql`
// //     query Block($number: Int) {
// //       block(number: $number) {
// //         timestamp
// //         transactions {
// //           transactionIndex
// //           nonce
// //         }
// //         size
// //         miner {
// //           name
// //           signer
// //         }
// //         hash
// //         parentHash
// //         totalDifficulty
// //         gasUsed
// //         gasLimit
// //       }
// //     }
// //   `;

// //   return {
// //     props: {
// //       GET_BLOCK_DETAILS,
// //     },
// //   };
// // };

// // export async function getStaticPaths() {
// //   return {
// //     paths: [
// //       // String variant:
// //       "/block/[block]",
// //       // Object variant:
// //       { params: { block: "878950" } },
// //     ],
// //     fallback: true,
// //   };
// // }

// // export const getServerSideProps: GetServerSideProps = async (context) => {
// // // Fetch data from external API
// //   const res = await fetch(`https://.../block`)
// //   const data = await res.json()

// //   // Pass data to the page via props
// //   return { props: { data } }
// // };

// const useStyles = makeStyles(({ spacing }) => {
//   return {
//     root: {
//       width: "100%",
//       padding: "1%",
//       borderRadius: 5,
//       wordWrap: "break-word",
//       marginTop: "6rem",
//     },
//     item: {
//       padding: "0 0 1rem 0.5rem",
//     },
//     divider: {
//       margin: "0.5rem 0 0 0",
//     },
//     arrowIcon: {
//       padding: "0.25rem",
//       justifyContent: "center",
//       border: "solid rgba(67, 72, 76, 1) ",
//       borderRadius: 5,
//       backgroundColor: "rgba(77, 81, 85, 1)",
//       color: "rgba(255, 255, 255, 0.6)",
//       height: "1.5rem",
//       width: "1.5rem",
//     },
//     iconButtonRight: {
//       padding: "0",
//       float: "right",
//     },
//     iconButtonLeft: {
//       padding: "0",
//       float: "left",
//     },
//   };
// });

// // const BlockDetails = (number_value : any  ) => {
// export default function Block(number_value: any) {
//   const router = useRouter();
//   const { Blo } = router.query;

//   if (!router.query.block) return <ContentLoader />;
//   //console.log(router.query.block);
//   const number = parseInt(router.query.block);
//   const prevBlock: number = number - 1;
//   const nextBlock: number = number + 1;
//   const { loading, error, data } = useQuery(GET_BLOCK_DETAILS, {
//     variables: { number },
//   });
//   const classes = useStyles();
//   if (loading) return null;
//   if (error) return `Error! ${error}`;
//   return (
//     <Card className={classes.root}>
//       <CardContent>
//         <Grid container spacing={1} justify="center" className={classes.item}>
//           <Grid item xs={10}>
//             <Typography color="textSecondary" variant="subtitle1" paragraph>
//               Block {number}
//             </Typography>
//           </Grid>

// <Grid item xs={1}>
//   <Link
//     href="/block/[block]/"
//     as={`/block/${prevBlock}`}
//     color="secondary"
//   >
//     {/* <Link href={`/block/${prevBlock}`} color="secondary"> */}
//     <IconButton
//       aria-label="Previous Block"
//       className={classes.iconButtonRight}
//       //onClick={() => refetch(prevBlock)}
//     >
//       <ArrowBackIosIcon className={classes.arrowIcon} />
//     </IconButton>
//   </Link>
// </Grid>
//           {/* ${props.block+1} */}
// <Grid item xs={1}>
//   <Link
//     href="/block/[block]/"
//     as={`/block/${nextBlock}`}
//     color="secondary"
//   >
//     {" "}
//     <IconButton
//       aria-label="Next Block"
//       className={classes.iconButtonLeft}
//       // onClick={() => refetch(nextBlock)}
//     >
//       <ArrowForwardIosIcon className={classes.arrowIcon} />
//     </IconButton>
//   </Link>
// </Grid>

//           <Grid item xs={12}>
//             <Divider />
//           </Grid>
//           <Grid item xs={12} className={classes.item}>
//             <Typography variant="caption" component="h2">
//               Time
//             </Typography>
//             <Typography variant="caption">
//               {data.block && data.block.timestamp
//                 ? new Date(parseInt(data.block.timestamp)).toUTCString()
//                 : " "}
//             </Typography>
//             <Divider variant="middle" className={classes.divider} />
//           </Grid>
//           <Grid item xs={12} className={classes.item}>
//             <Typography variant="caption" component="h2">
//               Transactions
//             </Typography>
//             <Typography variant="caption" component="h2">
//               {data.block &&
//               data.block.transactions &&
//               data.block.transactions.transactionIndex
//                 ? data.block.transactions.transactionIndex.length()
//                 : " Currently not available"}
//             </Typography>
//             <Divider variant="middle" className={classes.divider} />
//           </Grid>

//           <Grid item xs={12} className={classes.item}>
//             <Typography variant="caption" component="h2">
//               Size
//             </Typography>
//             <Typography variant="caption" component="h2">
//               {data.block && data.block.size
//                 ? data.block.size
//                 : "Data currently not available"}
//             </Typography>
//             <Divider variant="middle" className={classes.divider} />
//           </Grid>

//           <Grid item xs={12} className={classes.item}>
//             <Typography variant="caption" component="h2">
//               Miner
//             </Typography>
//             <Typography variant="caption" component="h2">
//               {data &&
//               data.block &&
//               data.block.miner &&
//               data.block.miner.name ? (
//                 <Link href="#" color="secondary">
//                   {data.block.miner.name}
//                 </Link>
//               ) : (
//                 "Data currently not available"
//               )}
//             </Typography>
//             <Divider variant="middle" className={classes.divider} />
//           </Grid>

//           <Grid item xs={12} className={classes.item}>
//             <Typography variant="caption" component="h2">
//               Hash
//             </Typography>
//             <Typography variant="caption" component="h2">
//               {data.block && data.block.hash
//                 ? data.block.hash
//                 : "Data currently not available"}
//             </Typography>
//             <Divider variant="middle" className={classes.divider} />
//           </Grid>

//           <Grid item xs={12} className={classes.item}>
//             <Typography variant="caption" component="h2">
//               Parent Hash
//             </Typography>
//             <Typography variant="caption" component="h2">
//               {data.block && data.block.parentHash ? (
//                 <Link href="#" color="secondary">
//                   {data.block.parentHash}
//                 </Link>
//               ) : (
//                 "Data currently not available"
//               )}
//             </Typography>
//             <Divider variant="middle" className={classes.divider} />
//           </Grid>

//           <Grid item xs={12} className={classes.item}>
//             <Typography variant="caption" component="h2">
//               Total Difficulty
//             </Typography>
//             <Typography variant="caption" component="h2">
//               {data.block && data.block.totalDifficulty
//                 ? data.block.totalDifficulty
//                 : "Data currently not available"}
//             </Typography>
//             <Divider variant="middle" className={classes.divider} />
//           </Grid>

//           <Grid item xs={12} className={classes.item}>
//             <Typography variant="caption" component="h2">
//               Nonce
//             </Typography>
//             <Typography variant="caption" component="h2">
//               {data.block &&
//               data.block.transactions &&
//               data.block.transactions.nonce
//                 ? data.block.transactions.nonce
//                 : " Currently not available"}
//             </Typography>
//             <Divider variant="middle" className={classes.divider} />
//           </Grid>

//           <Grid item xs={12} className={classes.item}>
//             <Typography variant="caption" component="h2">
//               Gas Used
//             </Typography>
//             <Typography variant="caption" component="h2">
//               {data.block && data.block.gasUsed
//                 ? data.block.gasUsed
//                 : "Data currently not available"}
//             </Typography>
//             <Divider variant="middle" className={classes.divider} />
//           </Grid>

//           <Grid item xs={12} className={classes.item}>
//             <Typography variant="caption" component="h2">
//               Gas Limit
//             </Typography>
//             <Typography variant="caption" component="h2">
//               {data.block && data.block.gasLimit
//                 ? data.block.gasLimit
//                 : "Data currently not available"}
//             </Typography>
//             <Divider variant="middle" className={classes.divider} />
//           </Grid>
//         </Grid>
//       </CardContent>
//     </Card>
//   );
// }

// // BlockDetails.getInitialProps = ({query } : NextContext) => {
// //     return {number: query.number}
// // };

// //export default  BlockDetails
