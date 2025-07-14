#![no_std]
use soroban_sdk::{contract, contractimpl, Env, Symbol, Address, Map, BytesN, symbol_short};

#[contract]
pub struct SBTContract;

#[contractimpl]
impl SBTContract {
    // Mapea token_id a dueño
    pub fn mint(env: Env, to: Address, token_id: BytesN<32>, metadata: BytesN<32>) {
        let owners_opt = env.storage().instance().get::<Symbol, Map<BytesN<32>, Address>>(&symbol_short!("owners"));
        let mut owners = match owners_opt {
            Some(v) => v,
            None => Map::new(&env),
        };
        // Solo se puede mintear si el token_id no existe
        if owners.get(token_id.clone()).is_some() {
            panic!("SBT ya minteado");
        }
        owners.set(token_id.clone(), to.clone());
        env.storage().instance().set(&symbol_short!("owners"), &owners);

        // Guarda metadatos
        let meta_opt = env.storage().instance().get::<Symbol, Map<BytesN<32>, BytesN<32>>>(&symbol_short!("meta"));
        let mut meta = match meta_opt {
            Some(v) => v,
            None => Map::new(&env),
        };
        meta.set(token_id, metadata);
        env.storage().instance().set(&symbol_short!("meta"), &meta);
    }

    // Consulta el dueño de un SBT
    pub fn owner_of(env: Env, token_id: BytesN<32>) -> Option<Address> {
        let owners_opt = env.storage().instance().get::<Symbol, Map<BytesN<32>, Address>>(&symbol_short!("owners"));
        let owners = match owners_opt {
            Some(v) => v,
            None => Map::new(&env),
        };
        owners.get(token_id)
    }

    // Consulta los metadatos de un SBT
    pub fn metadata_of(env: Env, token_id: BytesN<32>) -> Option<BytesN<32>> {
        let meta_opt = env.storage().instance().get::<Symbol, Map<BytesN<32>, BytesN<32>>>(&symbol_short!("meta"));
        let meta = match meta_opt {
            Some(v) => v,
            None => Map::new(&env),
        };
        meta.get(token_id)
    }

    // No hay función de transferencia: SBT no transferible
}

mod test;
