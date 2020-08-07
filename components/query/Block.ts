import { gql } from "@apollo/client";

export const GET_BLOCK = gql`
  query Block($pageSize: Int, $page: Int) {
    blocks(pageSize: $pageSize, page: $page) {
      totalCounts
      blocks {
        number
        miner{
          name
          signer
        }
        signers{
          exist
          signer
          validator{
            name
            score
            validatorGroup{
              name
              commission
            }
          }
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
      hash
      number
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
      signers{
        signer
        exist
        validator{
          name
          score
           validatorGroup{
            address
          }
        }
      }
     
      parentHash
      totalDifficulty
      gasUsed
      gasLimit
    }
  }
`;