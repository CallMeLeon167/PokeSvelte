<script>
    export let data;
	let contributors =  data.contributors;
</script>

<div id="site">
    <h1>Contributors of this Projekt</h1>
    <div id="contributors">
        {#each contributors as c}
            <div id="profile">
                <div id="profilePfp">
                    <a href="{c.html_url}" target="_blank"><img src="{c.avatar_url}" alt="{c.login}"></a>
                </div>
                <span id="profileName"><a href="{c.html_url}" target="_blank">{c.login}</a></span>
            </div>
        {/each}
    </div>
</div>

<style>

    #site {
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        padding: 2%;
    }

    #contributors {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        margin-top: 20px;
    }

    #profile {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: 10px;
    }

    #profilePfp {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100px;
        height: 100px;
    }

    #profilePfp img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 50%;
        box-shadow: 0 0 20px var(--primary);
        border: 1px solid black;
    }

    #profileName {
        margin-top: 10px;
    }

    a{
        text-decoration: none;
        color: var(--text);
        transition: all .3s ease;
    }

    a:hover{
        color: var(--primary);
    }
</style>