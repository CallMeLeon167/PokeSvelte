/** @type {import('./$types').PageServerLoad} */
export async function load() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0");
    const data = await response.json();
    return {names: data}
}

/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({request}) => {
        const data = await request.formData();
        const name = data.get('pokemonName').toLowerCase();

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
        if (response.ok) {
            const pokemonData = await response.json();
            pokemonData.name = pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.substring(1);
            return {pokemonData};
        } else {
            return false;
        }
    }
};
