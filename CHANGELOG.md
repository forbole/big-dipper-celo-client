# Changelog

## [Unreleased]

* Stored CELO base value in env variables
* Fixed copy method to copy each address seperately
* Fixed collapse to open every collapse element individually
* Added query to display Validator Votes List data 
* Added Ordering in Accounts query
* Implemented proposal query and linked data with `Proposal` components 
* Implemented Ledger Integration: Login/Logout, Lock/Unlock CELO
* Removed unused _id from query
* [#57] Updated timestamp display to `Do MMMM YYYY, h:mm:ss` format  
* Updated numbro mantissa value to 2 on small screens
* Updated Chips margin in LatestTransactions
* [#32] Updated Epoch Countdown
* Updated Big Number `toFormat()` value to 2
* Implemented Ledger Integration: Vote/Deposit Tokens for Proposal 
* Changed color of visited links
* Updated `LatestTransactions` Grid size
* Updated font size of currentUser to body1 in `LockGold` and `UnlockGold`
* [#80] Removed `publicRuntimeConfig` and replaced it with global variables stored in `process.env` 
* [#121] Fixed the account list ranking 
* Applied changes to account page (moved copy and QRCode buttons to the left, added black border to QR Code, changed table and border color, fixed NAN value of non-voting CELO, increased font size of balance and set moniker name to green color )
* [#126] Updated Table Cell text color to primary in LatestBlocks 
* [#123] Capitalised and split the Chip label
* [#128] Changed the Raw Input button color and adjusted the Grid size in `TransactionDetails` 
* [#129] Updated the height of TokenPrice Chart on small screens
* [#131] Update the colour of headings to primary (black)
* [#118] Added Ledger Integration: Vote/Revoke Votes for Validator Group
* [#139] Added Attestation Requested & Fulfilled values to Account Details
* Updated Proposals Fetching and Display
* Updated Home Components Margin and Display 
* [#70] Implemented Search Component 
* [#140] Updated Validator Groups Values
* [#141] Updated Footer to stay at the bottom of the page
* [#143] Updated bottom navigation margin to display all Bottom Navigation Tabs 
* [#145] Fixed Runtime Error in Proposal List
* Added value checks in `Block Details`
* Updated Login and Big Dipper icon size and margin
* Added `activateVaidatorGroupVotes` method and Activate Votes Button, removed Tx Fee from Confirmation Window
* [#16] Removed nesting errors
* [#150] Fixed build errors 
* Reused `ComponentLoader` in missing components
* Replaced `NotAvailable` with `ComponentLoader` in ChartData.tsx and PriceCard.tsx
* Updated runner name in node.js.yml
* Updated home components to fix minor issues occurring after deployment
* [#167] Updated epoch chart's container size
* [#161] Fixed ValidatorVotesList page breaking caused by a null value of `electedValidators`
* [#163] Fixed error in `TransactionDetails` caused by`decodedInput` value returning null in some transactions
* [#164] Display Lock/Unlock CELO buttons only in Account Page of logged in user 
* [#166] Added custom tooltip to Token Price Chart 
* [#160] Added Matomo analytics
* Added `@socialgouv/matomo-next` module declaration to `global.d.ts`
* [#165] Added custom tooltip to Epoch Chart 
* [#177] Query proposal description from the URL stored in db
* Updated YAxis value in Token Price Chart 
* Removed `NotAvailable` from validator group list when data for elected validators is not available
* Fixed Token Price Chart Flickering 
* [#186] Added error handling in GraphQL 
* [#190] Updated `valGroupAddress` value in Search Bar
* [#192] Removed deprication warning (RFC2822/ISO format) in Token Price Chart 
* [#194] Created generic error message when GraphQL Client returns error 
* [#162] Fixed epoch dashboard error when websocket is not connected & added Avatar component to generate block proposer icon using `jdenticon` library
* Updated README.md
* Updated GraphQL Queries
* Updated GraphQLClient endpoint
* Added xxsmall and xsmall row size option in `AccountList`
* Handled NAN values showing in some Validator Group elements 
* Updated page value in `DepositList`
* Updated Ledger Login
* [#207] Updated `@celo` npm packages to v1.0.1
* Code cleanup
* Removed `GraphqlErrors` and updated `ApolloClient`
* Updated Uptime Chart
* Updated ApolloClient uri
* Added `cache-and-network` fetch policy to `ApolloClient`
* Updated `pollInterval` value in Epoch query
* Added `react-markdown`
* Removed `fetchPolicy` from `ApolloClient`
* Updated `@apollo/client` package to `v3.3.11`
* Updated README.md file
* [#228] Updated `averageBlockTime` value
* Updated celoTotalSupply value
* Updated account balance value in Ledger Dialog
* Updated components values
* [#263] Updated Ledger Login flow to allow users login with new empty account 
* Removed `ErrorMessage` component   
* Updated Txs Input Params Info
* Updated Uptime Chart
* Updated Epoch Chart overflow value

## v0.1.3

* [#69] Hidden Search Bar and Network Selection
* [#68] Added transaction contract input parameters in TransactionDetails
* Hidden Validator Votes
* [#74] Changed token name from cGLD to CELO 


## v0.1.2

* Added Signers in BlockDetails

## v0.1.1

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
* [#59] Unified layout on the desktop 


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
