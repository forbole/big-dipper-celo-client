import { gql } from '@apollo/client';

export const GET_LATEST_BLOCKS = gql`
    query Block($pageSize: Int, $page: Int) {
        blocks(pageSize: $pageSize, page: $page) {
            totalCounts
            blocks {
                number
                miner {
                    name
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

export const GET_LATEST_BLOCK_HEIGHT = gql`
    query Block($pageSize: Int, $page: Int) {
        blocks(pageSize: $pageSize, page: $page) {
            blocks {
                number
            }
        }
    }
`;

export const GET_BLOCK_MINER = gql`
    query BlockMiner($number: Int) {
        block(number: $number) {
            miner {
                name
                signer
            }
        }
    }
`;

export const GET_BLOCK_GAS_LIMIT = gql`
    query BlockMiner($number: Int) {
        block(number: $number) {
            gasUsed
            gasLimit
        }
    }
`;

export const GET_BLOCK = gql`
    query Block($pageSize: Int, $page: Int, $fromBlock: Int) {
        blocks(pageSize: $pageSize, page: $page, fromBlock: $fromBlock) {
            totalCounts
            blocks {
                number
                miner {
                    name
                    signer
                }
                signers {
                    exist
                    signer
                    validator {
                        name
                        score
                        validatorGroup {
                            name
                            commission
                        }
                    }
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
            signers {
                signer
                exist
                validator {
                    name
                    score
                    validatorGroup {
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

export const GET_PROPOSED_BLOCKS = gql`
    query proposedBlocks($address: String!, $pageSize: Int, $page: Int) {
        proposedBlocks(address: $address, pageSize: $pageSize, page: $page) {
            totalCounts
            blocks {
                number
                transactions {
                    transactionIndex
                }
                gasUsed
                gasLimit
                timestamp
                miner {
                    name
                    signerAccount {
                        address
                    }
                }
            }
        }
    }
`;

export const BLOCK_SUBSCRIPTION = gql`
    subscription addBlock {
        blockAdded {
            number
            miner {
                address
                name
            }
        }
    }
`;
