import { gql } from "@apollo/client";

export const GET_BLOCK = gql`
  {
    blocks(pageSize: 500, page: 10) {
      blocks {
        number
        miner {
          name
          affiliation
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