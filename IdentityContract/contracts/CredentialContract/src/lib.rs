#![no_std]
use soroban_sdk::{contract, contractimpl, Env, Symbol, Map, Address, BytesN, symbol_short};

#[contract]
pub struct CredentialContract;

#[contractimpl]
impl CredentialContract {
    pub fn request_credential(env: Env, user: Address, evidence: BytesN<32>) {
        let creds_opt = env.storage().instance().get::<Symbol, Map<Address, BytesN<32>>>(&symbol_short!("creds"));
        let mut creds = match creds_opt {
            Some(v) => v,
            None => Map::new(&env),
        };
        creds.set(user, evidence);
        env.storage().instance().set(&symbol_short!("creds"), &creds);
    }

    pub fn validate_credential(env: Env, user: Address, _validator: Address, valid: bool) {
        let validations_opt = env.storage().instance().get::<Symbol, Map<Address, bool>>(&symbol_short!("valids"));
        let mut validations = match validations_opt {
            Some(v) => v,
            None => Map::new(&env),
        };
        validations.set(user, valid);
        env.storage().instance().set(&symbol_short!("valids"), &validations);
    }

    pub fn is_valid(env: Env, user: Address) -> bool {
        let validations_opt = env.storage().instance().get::<Symbol, Map<Address, bool>>(&symbol_short!("valids"));
        let validations = match validations_opt {
            Some(v) => v,
            None => Map::new(&env),
        };
        validations.get(user).unwrap_or(false)
    }
}
