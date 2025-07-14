#![no_std]
use soroban_sdk::{contract, contractimpl, Env, Symbol, Map, Address, symbol_short};

#[contract]
pub struct GovernanceContract;

#[contractimpl]
impl GovernanceContract {
    pub fn vote_validator(env: Env, candidate: Address, _voter: Address, upvote: bool) {
        let votes_opt = env.storage().instance().get::<Symbol, Map<Address, i128>>(&symbol_short!("votes"));
        let mut votes = match votes_opt {
            Some(v) => v,
            None => Map::new(&env),
        };
        let current = votes.get(candidate.clone()).unwrap_or(0);
        let new = if upvote { current + 1 } else { current - 1 };
        votes.set(candidate, new);
        env.storage().instance().set(&symbol_short!("votes"), &votes);
    }

    pub fn get_reputation(env: Env, user: Address) -> i128 {
        let votes_opt = env.storage().instance().get::<Symbol, Map<Address, i128>>(&symbol_short!("votes"));
        let votes = match votes_opt {
            Some(v) => v,
            None => Map::new(&env),
        };
        votes.get(user).unwrap_or(0)
    }
}
