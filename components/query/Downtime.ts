import { gql } from "@apollo/client";

export const DOWNTIME = gql`
  query Downtime($address: String!, $pageSize: Int, $page: Int){
      downtime(address: $address , pageSize: $pageSize,  page: $page){
      cursor
      pageSize
      page
      totalCounts
      hasMore
      blocks{
        hash
        number
        gasUsed
        gasLimit
        timestamp
        miner{
          name
          signer
        }
      }
  }
}
`;