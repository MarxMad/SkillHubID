#![cfg(test)]

use super::*;
use soroban_sdk::{Env, BytesN, Address};

#[test]
fn test_mint_and_query() {
    let env = Env::default();
    let contract_id = env.register(SBTContract, ());
    let client = SBTContractClient::new(&env, &contract_id);

    // Usa una dirección pública de Stellar dummy para pruebas
    let user = Address::from_str(&env, "GAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWHF");
    let token_id = BytesN::from_array(&env, &[1u8; 32]);
    let metadata = BytesN::from_array(&env, &[2u8; 32]);

    // Mintea el SBT
    client.mint(&user, &token_id, &metadata);

    // Verifica dueño
    let owner = client.owner_of(&token_id);
    assert_eq!(owner, Some(user.clone()));

    // Verifica metadatos
    let meta = client.metadata_of(&token_id);
    assert_eq!(meta, Some(metadata));
}