/* eslint-disable */
import { ContractKit, newKitFromWeb3 } from '@celo/contractkit';
import {
    LedgerWallet,
    newLedgerWalletWithSetup
} from '@celo/contractkit/lib/wallets/ledger-wallet';
import Eth from '@ledgerhq/hw-app-eth';
import TransportU2F from '@ledgerhq/hw-transport-u2f';
import TransportUSB from '@ledgerhq/hw-transport-webusb';
import { Component } from 'react';
import BigNumber from 'bignumber.js';
const Web3 = require('web3');




declare global {
    interface Window {
        USB:any;
        u2f:any;
    }
}


const getCeloLedgerTransport = () => {
    if (window.USB) {
        return TransportUSB.create();
    }
    else if (window.u2f) {
        return TransportU2F.create();
    }

    throw new Error(
        'Ledger Transport not supported, please use Chrome, Firefox, Brave, Opera or Edge.'
    );
};

const MAINNET = 'https://rc1-forno.celo-testnet.org';

type LockCeloProps = { amount: string; from: string };
type UnlockCeloProps = { amount: string; from: string };
type VoteValidatorGroupProps = { amount: string; from: string; group: string }
type RevokeValidatorGroupVoteProps = { amount: string; account: string; group: string}

class Ledger extends Component {
    private address = '';
    private kit: any = null;
    private eth: any = null;
    private wallet: any = null;
    private web3: any = null;
    public isConnected = false;
    // public hasKit: boolean = false;

    checkLedgerErrors(errorMessage: string) {
        switch (errorMessage) {
            case 'U2F: Timeout':
                return 'Connection timed out. Please try again.';
            case 'Invalid channel':
                return 'Something went wrong! Please unplug your Ledger device and connect again. ';
            case 'Ledger device: CLA_NOT_SUPPORTED (0x6e00)':
                return 'Something went wrong! Please unplug your Ledger device and connect again. ';
            case 'Possible connection lost with the ledger. Check if still on and connected. Ledger device: UNKNOWN_ERROR (0x6804)':
                return 'Ledger device is disconnected. Please unlock your Ledger device, open Celo App and try again. ';
            case 'Ledger device: INS_NOT_SUPPORTED (0x6d00)':
                return 'Celo App is not open';
            case 'Ledger device: Condition of use not satisfied (denied by the user?) (0x6985)':
                return 'The connection was rejected by the user. ';
            default:
                return errorMessage;
        }
    }
    async connect() {
        const web3 = new Web3(MAINNET);
        const transport = await getCeloLedgerTransport();
        const eth = new Eth(transport);
        const wallet = await newLedgerWalletWithSetup(eth.transport);
        const kit: ContractKit = newKitFromWeb3(web3, wallet);

        this.web3 = web3;
        this.eth = eth;
        this.kit = kit;
        this.wallet = wallet;
        this.isConnected = true;
        console.log('Connected');
    }

    disconnect() {
        this.eth = null;
        this.kit = null;
        this.wallet = null;
        this.address = '';
        this.isConnected = false;
        console.log('Disconnected');
    }

    async getCeloAppVersion() {
        const appConfig = await this.eth.getAppConfiguration();
        return appConfig.version;
    }

    isLedgerConnected() {
        if (!this.kit) {
            this.isConnected = false;
            return false;
        } else {
            this.isConnected = true;
            return true;
        }
    }

    async getAddress(derivationPath: '0' | '1' | '2' | '3' | '4' = '0') {
        if (this.eth) {
            const path = derivationPath;
            const { address } = await this.eth.getAddress(`44'/52752'/0'/0/${path}`, true);
            this.address = address;

            return address;
        }
    }

    async lockCelo({ amount, from }: LockCeloProps) {
        if (!this.kit) {
            this.checkLedgerErrors('Ledger device is disconnected');
        }

        const lockedCelo = await this.kit.contracts.getLockedGold();

        console.log(`Lock ${amount} CELO for address ${from}`);

        const result = await lockedCelo.lock().sendAndWaitForReceipt({ from, value: amount });
        console.log(result);
        return result;
    }

    async unlockCelo({ amount, from }: UnlockCeloProps) {
        if (!this.kit) {
            this.checkLedgerErrors('Ledger device is disconnected');
        }
        this.kit.defaultAccount = from;
        const lockedCelo = await this.kit.contracts.getLockedGold();

        console.log(`Unlock ${amount} CELO for address ${from}`);

        const result = await lockedCelo.unlock(amount).sendAndWaitForReceipt();
        console.log(result);

        return result;
    }

    async voteValidatorGroup({amount, from, group}:VoteValidatorGroupProps) {
        if (!this.kit) {
            this.checkLedgerErrors('Ledger device is disconnected');
        }
        this.kit.defaultAccount = from;
        const election = await this.kit.contracts.getElection();
        const voteElection = await election.vote(group, new BigNumber(amount));
        const result = await voteElection.sendAndWaitForReceipt({ from });
       
        console.log(result);

        return result;
    }


        async revokeValidatorGroupVote({amount, account, group}:RevokeValidatorGroupVoteProps) {
        if (!this.kit) {
            this.checkLedgerErrors('Ledger device is disconnected');
        }
        const election = await this.kit.contracts.getElection();
        const revokeVotes = await election.revokeActive(account, group, new BigNumber(amount));
        const result = await revokeVotes.sendAndWaitForReceipt({ from: account });

        console.log(result);

        return result;
    }
}

export default new Ledger(MAINNET);
