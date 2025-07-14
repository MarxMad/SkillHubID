#![no_std]
use soroban_sdk::{contract, contractimpl, Env, Symbol, Map, Address, symbol_short};

#[contract]
pub struct IdentityContract;

#[contractimpl]
impl IdentityContract {
    pub fn register_user(env: Env, user: Address, role: Symbol) {
        let users_opt = env.storage().instance().get::<Symbol, Map<Address, Symbol>>(&symbol_short!("users"));
        let mut users = match users_opt {
            Some(v) => v,
            None => Map::new(&env),
        };
        users.set(user, role);
        env.storage().instance().set(&symbol_short!("users"), &users);
    }

    pub fn get_role(env: Env, user: Address) -> Option<Symbol> {
        let users_opt = env.storage().instance().get::<Symbol, Map<Address, Symbol>>(&symbol_short!("users"));
        let users = match users_opt {
            Some(v) => v,
            None => Map::new(&env),
        };
        users.get(user)
    }
}
