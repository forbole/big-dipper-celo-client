import React from 'react';
import Typography from '@material-ui/core/Typography';
import Link from './Link';
import { createStyles, makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Layout from './Layout';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import {useRouter} from 'next/router'
import gql from 'graphql-tag';
import { useQuery } from '@apollo/react-hooks';
import TablePagination from '@material-ui/core/TablePagination';
import * as numbro from 'numbro';
import MiddleEllipsis from "react-middle-ellipsis";


const GET_BLOCK_INFO = gql`
  query Block($number: Int) {
    block(number: $number) {
        timestamp
        transactions{
            transactionIndex
            nonce
        }
        size
        miner{ 
            name
        }
        hash
        parentHash      
        totalDifficulty
        gasUsed
        gasLimit
        
    }
  }
`;

let blockInfo: {[k:string] :any};




const useStyles = makeStyles(({ spacing }) => {
    return {
      root: {
          width: '100%',
          padding: '0.5rem',
          borderRadius: 5,
          wordWrap: 'break-word',
          
      },
      item:{
          padding: '0 0 1rem 0.5rem',
      },
      divider:{
          margin: '0.5rem 0 0 0',
      },
      arrowIcon:{
          padding: '0.25rem',
          justifyContent: 'center',
          border: 'solid rgba(67, 72, 76, 1) ',
          borderRadius: 5,
          backgroundColor: 'rgba(77, 81, 85, 1)',
          color: 'rgba(255, 255, 255, 0.6)',
          height: '1.5rem',
          width: '1.5rem'
      },
      iconButton:{
        padding: '0',
      }
  }
});



export default function BlockDetails ( props : any   ) {
  const { loading, error, data } = useQuery(GET_BLOCK_INFO, {
    variables: { props.block},
  });

  console.log(props)
  if (loading) return null;
  if (error) return `Error! ${error}`;

  const classes = useStyles();
  return(
      <p>HI </p>
//        <Card className={classes.root}>
//   <CardContent>
//         <Grid container spacing={1} justify="center" className={classes.item}>
//             <Grid item xs={10} >
//                 <Typography  color="textSecondary" variant="subtitle1"  paragraph>
//                     {/* Block {number} */}
//                 </Typography>
//             </Grid>

//             <Grid item xs={1}  >
//                 <Link href={`/block/${parseInt(number)-1}`}  color="secondary">
//                     <IconButton  aria-label="Previous Block" className={classes.iconButton}>
//                         <ArrowBackIosIcon className={classes.arrowIcon}/>
//                     </IconButton>
//                 </Link>
//             </Grid>
// {/* ${props.block+1} */}
//             <Grid item xs={1} >
//                 <Link href={`/block/${parseInt(number)+1}`}  color="secondary">
//                     <IconButton aria-label="Next Block" className={classes.iconButton} >
//                         <ArrowForwardIosIcon className={classes.arrowIcon}/>
//                     </IconButton>
//                 </Link>
//             </Grid>

//             <Grid item xs={12}>
//             <Divider  />
//             </Grid>
//             <Grid item xs={12} className={classes.item}>
//                 <Typography variant="caption" component="h2">
//                     Time
//                 </Typography>
//                 <Typography variant="caption" >
//                     April-09-2020 11:22:08 UTC (14 seconds ago)
//                 </Typography>
//                <Divider variant='middle' className={classes.divider}/>
//             </Grid>
//             <Grid item xs={12} className={classes.item}>
//                 <Typography variant="caption" component="h2">
//                     Transactions
//                 </Typography>
//                 <Typography variant="caption" component="h2">
//                 7
//                 </Typography>
//                 <Divider variant='middle' className={classes.divider}/>
//             </Grid>
//            {(blockInfo && blockInfo.size) ? 
//             <Grid item xs={12} className={classes.item}>
//                 <Typography variant="caption" component="h2">
//                     Size
//                 </Typography>
//                 <Typography variant="caption" component="h2">
//                 { blockInfo.size}
//                 </Typography>
//                 <Divider variant='middle' className={classes.divider}/>
//             </Grid> : null }

//              {(blockInfo && blockInfo.miner) ? 
//             <Grid item xs={12} className={classes.item}>
//                 <Typography variant="caption" component="h2">
//                     Miner
//                 </Typography>
//                 <Typography variant="caption" component="h2">
//                    <Link href="#"  color="secondary">
//                    { blockInfo.miner.name}
//                     </Link> 
//                 </Typography>
//                 <Divider variant='middle' className={classes.divider}/>
//             </Grid> : null }        

//             <Grid item xs={12} className={classes.item} >
//                 <Typography variant="caption" component="h2">
//                     Hash
//                 </Typography>
//                 <Typography variant="caption" component="h2">
//                 {/* { blockInfo.hash ? blockInfo.hash : null} */}
//                 </Typography>
//                 <Divider variant='middle' className={classes.divider}/>
//             </Grid>

//             <Grid item xs={12} className={classes.item}>
//                 <Typography variant="caption" component="h2">
//                     Parent Hash
//                 </Typography>
//                 <Typography variant="caption" component="h2">
//                   <Link href="#"  color="secondary">
//                   {/* {blockInfo.parentHash } */}
//                       </Link>  
//                 </Typography>
//                 <Divider variant='middle' className={classes.divider}/>
//             </Grid>

//             <Grid item xs={12} className={classes.item}>
//             <Typography variant="caption" component="h2">
//                 Total Difficulty
//             </Typography>
//             <Typography variant="caption" component="h2">
//             {blockInfo && blockInfo.totalDifficulty ? blockInfo.totalDifficulty : null}
//             </Typography>
//             <Divider variant='middle' className={classes.divider}/>
//             </Grid>

//             <Grid item xs={12} className={classes.item}>
//             <Typography variant="caption" component="h2">
//                 Nonce
//             </Typography>
//             <Typography variant="caption" component="h2">
//                 0x00000000000000000
//             </Typography>
//             <Divider variant='middle' className={classes.divider}/>
//             </Grid>

//             <Grid item xs={12} className={classes.item}>
//             <Typography variant="caption" component="h2">
//                 Gas Used
//             </Typography>
//             <Typography variant="caption" component="h2">
//             {blockInfo && blockInfo.gasUsed ? blockInfo.gasUsed : null}
//             </Typography>
//             <Divider variant='middle' className={classes.divider}/>
//             </Grid>

//             <Grid item xs={12} className={classes.item}>
//                 <Typography variant="caption" component="h2">
//                     Gas Limit
//                 </Typography>
//                 <Typography variant="caption" component="h2">
//                 {blockInfo && blockInfo.gasLimit ? blockInfo.gasLimit : null}
//                 </Typography>
//                 <Divider variant='middle' className={classes.divider}/>
//             </Grid>

// </Grid>
//   </CardContent>
// </Card>
  )
}



// export default function BlockDetails(props: any) {
// const classes = useStyles();
// //console.log(props ? props.block.block.block : null)
// console.log(props.block ?  props.block : "NIE MA");
// getBlock(87145);
// // console.log(blockInfo)
//   return (
    
// );
// }