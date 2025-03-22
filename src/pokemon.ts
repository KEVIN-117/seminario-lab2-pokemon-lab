
import { fetchFromApi } from './api';

export interface PokemonSprites {
    [key: string]: string | null;
}

export interface PokemonAbilities {
    [key: string]: string | null;
}

export interface PokemonResponse {
    id: number;
    name: string;
    sprites: PokemonSprites;
    abilities: Array<{
        ability: {
            name: string;
        };
    }>;
    types: Array<{
        type: {
            name: string;
        }
    }>,
    weight: number;
}

export async function fetchPokemon(nameOrId: string) {
    return await fetchFromApi<PokemonResponse>('pokemon', nameOrId);
}

export async function fetchNextPokemon(pokemon: PokemonResponse): Promise<PokemonResponse> {
    return await fetchFromApi<PokemonResponse>('pokemon', `${pokemon.id + 1}`);
}

export async function fetchPreviousPokemon(pokemon: PokemonResponse): Promise<PokemonResponse> {
    return await fetchFromApi<PokemonResponse>('pokemon', `${pokemon.id - 1}`);
}
