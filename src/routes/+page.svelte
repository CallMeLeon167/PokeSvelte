<script>
  import { enhance } from '$app/forms';
  import logo from '$lib/img/PokeSvelte.png';

  let pokemonData;

</script>
  
  <main>
    <img src={logo} alt="PokéSvelte Logo">
    <form method="post" use:enhance={() => {
      return async ({result}) => {
        pokemonData = result.data;
      }
    }}>
      <input type="text" name="pokemonName" placeholder="Which Pokémon are you looking for?" />
      <button>Search</button>
    </form>
  
    {#if pokemonData}
      <h2>{pokemonData.name}</h2>
      <img src="{pokemonData.sprites.front_default}" alt="{pokemonData.name}" />
    {/if}
  </main>
  
  <style>

    main {
      text-align: center;
      padding: 1rem;
    }
  </style>
  