#![cfg(test)]

use super::*;
use soroban_sdk::{Env, Address, Symbol};

#[test]
fn test_vote_and_reputation() {
    let env = Env::default();
    let contract_id = env.register(GovernanceContract, ());
    let client = GovernanceContractClient::new(&env, &contract_id);

    let candidate = Address::random(&env);
    let voter1 = Address::random(&env);
    let voter2 = Address::random(&env);

    // Votante 1 da un upvote
    client.vote_validator(&candidate, &voter1, &true);
    // Votante 2 da un upvote
    client.vote_validator(&candidate, &voter2, &true);
    // Votante 1 da un downvote
    client.vote_validator(&candidate, &voter1, &false);

    // La reputación debería ser 1 (1 upvote, 1 upvote, 1 downvote)
    let rep = client.get_reputation(&candidate);
    assert_eq!(rep, 1);
}