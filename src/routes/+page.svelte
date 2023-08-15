<script>
    import { enhance } from '$app/forms';
    import { fade } from 'svelte/transition';
    import logo from '$lib/img/PokeSvelte.png';
    import Icon from 'svelte-icons-pack/Icon.svelte';
    import AiOutlineSearch from 'svelte-icons-pack/ai/AiOutlineSearch';

    export let data, form;
    let input;

    const suggestions = data.names.results.map(pokemon => pokemon.name);

    async function getPokemon() {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${input}`);

        if (response.ok) {
            const pokemonData = await response.json();
            pokemonData.name = pokemonData.name.charAt(0).toUpperCase() + pokemonData.name.substring(1);
            form = {pokemonData};
        } else {
            throw new Error();
        }
    }
</script>

<main>
    <img src={logo} alt="PokéSvelte Logo" width="500">
    <h1>Which Pokémon do you want to look up?</h1>
    <form method="POST" use:enhance={({cancel}) => {
        cancel()
        getPokemon()
    }}>
        <input type="text" name="pokemonName" placeholder="eg. Charmander" bind:value={input} autocomplete="off" list="pokemonSuggestions">
        
        <datalist id="pokemonSuggestions">
        {#each suggestions as suggestion}
            <option value="{suggestion}">
        {/each}
        </datalist>

        <button id="searchPokemon"><Icon src={AiOutlineSearch}/></button>
    </form>

    <div class="result">
        {#if form?.pokemonData}
        <div id="pokemon-content" in:fade>
            <h2 id="pokemon-name">{form?.pokemonData.name}</h2>
            <img id="pokemon-sprite" src={form?.pokemonData.sprites.other['official-artwork'].front_default} alt="{form?.pokemonData.name} sprite" />
            <table class="content-table">
            <tbody>
                <tr>
                <td>Types</td>
                <td>
                    {#each form?.pokemonData.types as types}
                    <span>{types.type.name}</span> <br>
                    {/each}
                </td>
                </tr>
            </tbody>
            </table>
        </div>
        {/if}
    </div>
</main>
  
<style>
    main {
        padding: 2%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    form {
        background-color: white;
        border-radius: 15px;
        filter: drop-shadow(0 3px 3px black);
        padding: 0 10px;
        border: 2px solid #FFCB05;
        display: flex;
        align-items: center;
        margin-top: 20px;
        transition: background-color 0.2s ease, transform 0.3s ease;
        transform: translateY(0);
    }

    form:hover {
        background-color: #cccbcb;
    }

    form:focus-within {
        background-color: white;
        transform: translateY(-3px);
    }
    
    form > input {
        display: inline-block;
        padding: 10px;
        border-radius: 5px;
        background-color: transparent;
        color: #333;
        font-weight: bold;
        text-transform: uppercase;
        letter-spacing: 1px;
        font-size: 16px;
        border: none;
        outline: none;
    }

    form > button {
        background-color: transparent;
        outline: none;
        border: none;
        font-size: 1.2rem;
        height: 100%;
        aspect-ratio: 1;
        border-radius: 5px;
        transition: transform 0.3s ease;
    }

    form > button:hover {
        background-color: rgba(0,0,0,0.2);
        transform: scale(1.08);
    }

    .result {
        margin-top: 10px;
    }

    #pokemon-content {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-top: 20px;
        text-align: center;
        min-width: 200px;
        max-width: 1000px;
        width: fit-content;
    }

    #pokemon-name {
        font-size: 3rem;
    }

    #searchPokemon{
        display: flex;
    }

    #pokemon-sprite {
        min-width: 200px;
        width: 10vmax;
        aspect-ratio: 1;
    }

    .content-table{
        border-collapse: collapse;
        margin: 25px 0;
        font-size: 0.9em;
        min-width: 100%;
        border-radius: 5px 5px 0 0;
        overflow: hidden;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.15);
    }

    .content-table thead tr{
        color: white;
        text-align: left;
        font-weight: bold;

    }

    .content-table td{
        padding: 12px 15px;
        transition: all 0.2s;
        text-shadow: 0 0 3px #101010;;
    }

    .content-table tbody tr{
        border-bottom: 1px solid #262626;
    }

    .content-table tbody tr:hover{
        background-color: rgba(0, 0, 0, .2);
    }

    .content-table tbody tr:nth-of-type(even){
    background-color: rgba(0, 0, 0, 0.1);
    }

    tr td:first-child {
    background: var(--primary-hov);
    }

    .content-table tbody{
        border-bottom: 2px solid var(--primary);
    }
</style>
