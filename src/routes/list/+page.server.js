/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=999999&offset=0");
    const data = await response.json();
    const pokemon = data.results.map(pokemon => pokemon.name);

    return {
        pokemon: pokemon,
    }
}