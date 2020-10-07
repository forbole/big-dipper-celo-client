import { ContractKit, newKitFromWeb3 } from "@celo/contractkit";
import {
    LedgerWallet,
    newLedgerWalletWithSetup,
} from "@celo/contractkit/lib/wallets/ledger-wallet";
import Eth from "@ledgerhq/hw-app-eth";
import TransportU2F from "@ledgerhq/hw-transport-u2f";
import TransportUSB from "@ledgerhq/hw-transport-webusb";
import BigNumber from "bignumber.js";
import React, { Component } from 'react';
import Web3 from "web3";


const getCeloLedgerTransport = () => {
    // @ts-ignore
    if (window.USB) {
        return TransportUSB.create();
    }
    // @ts-ignore
    else if (window.u2f) {
        return TransportU2F.create();
    }

    throw new Error("Ledger Transport not supported, please use Chrome, Firefox, Brave, Opera or Edge.");
};

const MAINNET = "https://rc1-forno.celo-testnet.org";

class LedgerCelo extends Component {

    private address: string = '';
    private kit: any = null;
    private eth: any = null;
    private wallet: any = null;
    private web3: any = null;
    private isConnected: boolean = false;

    checkLedgerErrors(errorMessage: string) {
        switch (errorMessage) {
            case "U2F: Timeout":
                return "Connection timed out. Please try again."
            case "Invalid channel":
                return "Please unplug your Ledger device and connect again"
            case "Possible connection lost with the ledger. Check if still on and connected. Ledger device: UNKNOWN_ERROR (0x6804)":
                return "Ledger device is disconnected"
            case "Ledger device: INS_NOT_SUPPORTED (0x6d00)":
                return "Celo App is not open"
            default:
                return errorMessage
        }
    }

    async connect() {
        const web3 = new Web3(MAINNET);
        const transport = await getCeloLedgerTransport();
        const eth = new Eth(transport);
        const wallet = await newLedgerWalletWithSetup(eth.transport);
        // @ts-ignore
        const kit = newKitFromWeb3(web3, wallet);


        this.web3 = web3;
        this.eth = eth;
        this.kit = kit;
        this.wallet = wallet;
        console.log("Connected")
        return this.isConnected = true
    }

    disconnect() {
        this.eth = null;
        this.kit = null;
        this.wallet = null;
        this.address = "";
        console.log("disconnected")
        return this.isConnected = false
    }

    async getCeloAppVersion() {
        const appConfig = await this.eth.getAppConfiguration();
        return appConfig.version;
    }

    async getAddress(derivationPath: "0" | "1" | "2" | "3" | "4" = "0") {
        try {
            if (this.eth) {
                const path = derivationPath;
                const { address } = await this.eth.getAddress(
                    `44'/52752'/0'/0/${path}`,
                    true,
                );
                this.address = address;

                return address;
            } else {
                this.checkLedgerErrors("LedgerCelo not initialized yet.");
            }
        } catch (error) {
            this.checkLedgerErrors(error)
        }
    }

}



export default new LedgerCelo(MAINNET);