#![cfg(test)]

use super::*;
use soroban_sdk::{Env, Address, BytesN};

#[test]
fn test_request_and_validate_credential() {
    let env = Env::default();
    let contract_id = env.register(CredentialContract, ());
    let client = CredentialContractClient::new(&env, &contract_id);

    let user = Address::random(&env);
    let validator = Address::random(&env);
    let evidence = BytesN::from_array(&env, &[1u8; 32]);

    // El usuario solicita una credencial
    client.request_credential(&user, &evidence);

    // El validador valida la credencial como válida
    client.validate_credential(&user, &validator, &true);

    // Verifica que la credencial es válida
    let valid = client.is_valid(&user);
    assert!(valid);

    // Ahora el validador la marca como inválida
    client.validate_credential(&user, &validator, &false);

    // Verifica que la credencial ya no es válida
    let valid = client.is_valid(&user);
    assert!(!valid);
}