import { gql } from '@apollo/client';

export const GET_TX = gql`
    query Transactions($pageSize: Int, $page: Int) {
        transactions(pageSize: $pageSize, page: $page) {
            totalCounts
            transactions {
                type
                from {
                    address
                    balance
                }
                to {
                    address
                    ... on ToWalletAccount {
                        account {
                            balance
                        }
                    }
                    ... on ToWalletContract {
                        contract {
                            name
                            ABI
                        }
                    }
                }
                type
                decodedInput
                value
                hash
                timestamp
            }
        }
    }
`;

export const GET_TX_DETAILS = gql`
    query Transaction($hash: String!) {
        transaction(hash: $hash) {
            value
            blockNumber
            decodedInput
            nonce
            feeCurrency
            gatewayFeeRecipient
            gatewayFee
            gas
            hash
            input
            timestamp
            gas
            from {
                address
            }
            to {
                address
            }
        }
    }
`;

export const GET_ACCOUNT_TX = gql`
    query TransactionsByAccount($address: String!, $pageSize: Int, $page: Int) {
        transactionsByAccount(address: $address, pageSize: $pageSize, page: $page) {
            totalCounts
            transactions {
                hash
                timestamp
                gas
                type
                from {
                    address
                    balance
                }
                to {
                    address
                    ... on ToWalletAccount {
                        account {
                            balance
                        }
                    }
                    ... on ToWalletContract {
                        contract {
                            name
                            ABI
                        }
                    }
                }
            }
        }
    }
`;
