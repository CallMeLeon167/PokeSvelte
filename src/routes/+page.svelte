<script>
  import { enhance } from '$app/forms';
  import logo from '$lib/img/PokeSvelte.png';
  import Icon from 'svelte-icons-pack/Icon.svelte';
  import AiOutlineSearch from 'svelte-icons-pack/ai/AiOutlineSearch';

  let pokemonData, pokemonSprite;
  let inputText = "";
  let suggestions = [];

  async function autocompletePokemon() {
    const response = await fetch("https://pokeapi.co/api/v2/pokemon?limit=100000&offset=0");
    const data = await response.json();
    const pokemonNames = data.results.map(pokemon => pokemon.name);

    suggestions = pokemonNames.filter(name => name.startsWith(inputText.toLowerCase()));
  }

</script>
  
<main>
  <img src={logo} alt="PokéSvelte Logo" width="500">
  <h1>Which Pokémon do you want to look up?</h1>
  <form action="?/getPokemon" method="post" use:enhance={() => {
    return async ({result}) => {
      pokemonData = result.data;
      pokemonSprite = pokemonData['sprites']['other']['official-artwork']['front_default'];
    }
  }}>
    <input type="text" name="pokemonName" placeholder="eg. Charmander" autocomplete="off" bind:value={inputText} on:input={autocompletePokemon} list="pokemonSuggestions">
    
    <datalist id="pokemonSuggestions">
      {#each suggestions as suggestion}
        <option value="{suggestion}">
      {/each}
    </datalist>

    <button id="searchPokemon"><Icon src={AiOutlineSearch}/></button>
  </form>


  {#if pokemonData}
  <div id="pokemon-content">
    <h2 id="pokemon-name">{pokemonData.name}</h2>
    <img id="pokemon-sprite" src={pokemonSprite} alt="{pokemonData.name} sprite" />
  </div>
  {/if}
</main>
  
<style>

  main {
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
    transition: background-color 0.3s ease;
    transition: transform 0.3s ease;
    transform: translateY(0);
  }

  form:hover {
    background-color: #cccbcb;
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

  #pokemon-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
    text-align: center;
    min-width: 200px;
    max-width: 1000px;
    width: fit-content;
    border: 1px solid gray;
  }

  #pokemon-name {
    font-size: 3rem;
  }

  #searchPokemon{
    display: flex;
  }

  #pokemon-sprite {
    min-width: 200px;
    width: 20vmax;
    aspect-ratio: 1;
  }
</style>
