import { gql } from "@apollo/client";

export const GET_BLOCK = gql`
  query Block($pageSize: Int, $page: Int) {
    blocks(pageSize: $pageSize, page: $page) {
      totalCounts
      blocks {
        number
        miner {
          name
          affiliation
          signer

        }
        transactions {
          transactionIndex
        }
        gasUsed
        gasLimit
        timestamp
      }
    }
  }
`;


export const GET_BLOCK_DETAILS = gql`
  query Block($number: Int) {
    block(number: $number) {
      timestamp
      transactions {
        transactionIndex
        nonce
      }
      size
      miner {
        name
        signer
      }
      hash
      parentHash
      totalDifficulty
      gasUsed
      gasLimit
    }
  }
`;