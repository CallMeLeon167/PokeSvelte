<script>
  import { enhance } from '$app/forms';
  import logo from '$lib/img/PokeSvelte.png';
  import Icon from 'svelte-icons-pack/Icon.svelte';
  import AiOutlineSearch from 'svelte-icons-pack/ai/AiOutlineSearch';

  let pokemonData, pokemonSprite;

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
    <input type="text" name="pokemonName" placeholder="eg. Charmander" autocomplete="off">
    <button><Icon src={AiOutlineSearch}/></button>
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
  }
  
  form > input {
    background-color: transparent;
    text-align: center;
    outline: none;
    border: none;
    padding: 0 5px;
    font-size: 1.5rem;
    border-radius: 20px;
  }

  form > button {
    background-color: transparent;
    outline: none;
    border: none;
    font-size: 1.2rem;
    height: 100%;
    aspect-ratio: 1;
  }

  form > button:hover {
    background-color: rgba(0,0,0,0.2);
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

  #pokemon-sprite {
    min-width: 200px;
    width: 20vmax;
    aspect-ratio: 1;
  }
</style>
