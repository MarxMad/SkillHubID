import { Buffer } from "buffer";
import { Client as ContractClient, Spec as ContractSpec, } from '@stellar/stellar-sdk/contract';
export * from '@stellar/stellar-sdk';
export * as contract from '@stellar/stellar-sdk/contract';
export * as rpc from '@stellar/stellar-sdk/rpc';
if (typeof window !== 'undefined') {
    //@ts-ignore Buffer exists
    window.Buffer = window.Buffer || Buffer;
}
export const networks = {
    testnet: {
        networkPassphrase: "Test SDF Network ; September 2015",
        contractId: "CBD5QYDRAFFB2SP2TTPANVX44EHLNHXZOKUIOFMTITQKRVC3N54WP2NK",
    }
};
export class Client extends ContractClient {
    options;
    static async deploy(
    /** Options for initializing a Client as well as for calling a method, with extras specific to deploying. */
    options) {
        return ContractClient.deploy(null, options);
    }
    constructor(options) {
        super(new ContractSpec(["AAAAAAAAAAAAAAANcmVnaXN0ZXJfdXNlcgAAAAAAAAIAAAAAAAAABHVzZXIAAAATAAAAAAAAAARyb2xlAAAAEQAAAAA=",
            "AAAAAAAAAAAAAAAIZ2V0X3JvbGUAAAABAAAAAAAAAAR1c2VyAAAAEwAAAAEAAAPoAAAAEQ=="]), options);
        this.options = options;
    }
    fromJSON = {
        register_user: (this.txFromJSON),
        get_role: (this.txFromJSON)
    };
}
