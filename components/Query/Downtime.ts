import { gql } from '@apollo/client';

export const DOWNTIME = gql`
    query Downtime($address: String!, $pageSize: Int, $page: Int) {
        downtime(address: $address, pageSize: $pageSize, page: $page) {
            pageSize
            page
            totalCounts
            hasMore
            blocks {
                hash
                number
                gasUsed
                gasLimit
                timestamp
                transactions {
                    transactionIndex
                }
                miner {
                    name
                    signer
                    address
                }
            }
        }
    }
`;
