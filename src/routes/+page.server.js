/** @type {import('./$types').Actions} */
export const actions = {
    default: async ({request}) => {
        let data = await request.formData();
        let name = data.get('pokemonName');

        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
        const pokemonData = await response.json();

        pokemonData.name = pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.substring(1);
        
        return pokemonData;
    }
};
