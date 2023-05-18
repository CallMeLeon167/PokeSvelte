
export async function load({ fetch }) {
    const res = await fetch('https://api.github.com/repos/CallMeLeon167/PokeSvelte/contributors');
    const contributors = await res.json();

    if(res.ok){
        return {
            contributors
        }
    }
}