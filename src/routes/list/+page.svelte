<script>
    import logo from "$lib/img/PokeSvelte.png";
    export let data;
</script>

<main>
    <img src={logo} alt="PokéSvelte Logo" width="500">
    <h1>List of Pokémon</h1>
    <ol>
        {#each data.pokemon as pokemon}
        <li>{pokemon.charAt(0).toUpperCase() + pokemon.substring(1)}</li>
        {/each}
    </ol>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 2%;
    }

    h1 {
        margin: 1%;
        font-size: 3rem;
    }

    ol {
        font-size: 1.5rem;
    }


    /* li {
        position: relative;
    }

    li::before {
        content: "";
        position: absolute;
        background-color: rgba(255,255,255,0.1);
        width: 0;
        height: 100%;
        transition: all 0.5s;
    }

    li:hover::before {
        width: 100%;
    } */
</style>