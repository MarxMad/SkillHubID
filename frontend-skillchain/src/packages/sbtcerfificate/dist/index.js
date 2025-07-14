import { Buffer } from "buffer";
import { Client as ContractClient, Spec as ContractSpec, } from '@stellar/stellar-sdk/contract';
export * from '@stellar/stellar-sdk';
export * as contract from '@stellar/stellar-sdk/contract';
export * as rpc from '@stellar/stellar-sdk/rpc';
if (typeof window !== 'undefined') {
    //@ts-ignore Buffer exists
    window.Buffer = window.Buffer || Buffer;
}
export const Errors = {};
export class Client extends ContractClient {
    options;
    static async deploy(
    /** Options for initalizing a Client as well as for calling a method, with extras specific to deploying. */
    options) {
        return ContractClient.deploy(null, options);
    }
    constructor(options) {
        super(new ContractSpec(["AAAAAAAAAAAAAAAEbWludAAAAAMAAAAAAAAAAnRvAAAAAAATAAAAAAAAAAh0b2tlbl9pZAAAA+4AAAAgAAAAAAAAAAhtZXRhZGF0YQAAA+4AAAAgAAAAAA==",
            "AAAAAAAAAAAAAAAIb3duZXJfb2YAAAABAAAAAAAAAAh0b2tlbl9pZAAAA+4AAAAgAAAAAQAAA+gAAAAT",
            "AAAAAAAAAAAAAAALbWV0YWRhdGFfb2YAAAAAAQAAAAAAAAAIdG9rZW5faWQAAAPuAAAAIAAAAAEAAAPoAAAD7gAAACA="]), options);
        this.options = options;
    }
    fromJSON = {
        mint: (this.txFromJSON),
        owner_of: (this.txFromJSON),
        metadata_of: (this.txFromJSON)
    };
}
