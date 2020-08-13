# Changelog

## [Unreleased]

* Updated Grid size on medium screens to 7
* Disabled back button on Page 1 in TablePagination
* Updated the address of a miner in LatestBlocks
* Hidden Coin Balance History
* Moved Table Pagination to right in all components
* Added & updated components to BigNumber.js
* Changed name from ValidatedBlocks to ProposedBlocks
* Updated Chips value and colors 
* Added All Signers in AccountDetails
* Adjusted button size in AccountOverview for xs screens
* Updated Accordion to display expanded as default
* Linked real-time data in Account Section
* [#60] Changed footer logo & social links to Big Dipper


## v0.1.0

* Implemented page Layout 
* Implemented Drawer, Search Bar, Footer, Price Card, Chart Data, Network Dropdown
* Implemented Account  & Account Lists Page
* Implemented Latest Blocks &  Block Details Page
* Implemented Latest Transactions Page & Transaction Details Page
* Implemented Proposal List, Proposal Details, Proposal Deposit List Page
* Implemented Validator Group Page
* Implemented Validator Votes Page
* Implemented Token Page 
* Integrated Homepage with GraphQL 
* Implemented Ledger Buttons 
* Implemented Ledger Dialog Screens 
* [#5] Fixed Functional components by adding JSX Tags to return value
* [#3] Updated attribute element to CamelCase
* [#23] Added NotAvailable, ErrorMessage, ComponentLoader components in /misc
* [#24] Implemented ComponentLoader in /misc
* [#25] Grouped all gql queries into single directory 'query'
* [#28] Fixed the `build-fragement` npm script by runing it as Javscript
* [#35] Fixed error 'block number is not assignable to type 'string' ' by parsing its value to a string 
* [#37] Fixed error occuring in TransactionDetails for production build 
* [#11] Migrated imports of Apollo Client React components from 'apollo-react'  to 'apollo-client' package 
* [#45] Hidden Proposals, Ledger, Sign In, Logout Buttons 
* Updated address card & copy function
* Added QR Code Display on button click
* Removed Token Search Bar from Token Dropdown in Account Overview
* Removed Internal Transactions
* Removed Block Confirmation value in Transaction Details 
* [#43] Updated Pagination for LatestBlocks, LatestTransactions, AccountList, Downtime, Transactions, ValidatedBlocks, DepositList, ProposalVotingList, TokenHolders & ValidatorVotesList
* [#21] Updated ChartData component height and fixed the layout to keep equal spacing between components 
* [#30] Stored the GraphQL & account endpoint in environment variable
* [#41] Updated Middle Ellipsis screen size function to useMediaQuery 
