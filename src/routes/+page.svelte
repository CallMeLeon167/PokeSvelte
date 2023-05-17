<script>
    let pokemonName = '';
    let pokemonData = null;
  
    async function searchPokemon() {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
      const data = await response.json();
      pokemonData = data;
      console.log(pokemonData)
    }
  </script>
  
  <main>
    <h1>Pokémon-Suche</h1>
    <input type="text" bind:value="{pokemonName}" placeholder="Gib den Pokémon-Namen ein" />
    <button on:click="{searchPokemon}">Suchen</button>
  
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
  