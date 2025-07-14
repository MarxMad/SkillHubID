#![cfg(test)]

use super::*;
use soroban_sdk::{Env, Address, Symbol};

#[test]
fn test_register_and_get_role() {
    let env = Env::default();
    let contract_id = env.register(IdentityContract, ());
    let client = IdentityContractClient::new(&env, &contract_id);

    // Crea un usuario y un rol
    let user = Address::random(&env);
    let role = Symbol::short("admin");

    // Registra el usuario con el rol
    client.register_user(&user, &role);

    // Obtiene el rol del usuario
    let stored_role = client.get_role(&user);

    // Verifica que el rol almacenado es igual al rol asignado
    assert_eq!(stored_role, Some(role));
}