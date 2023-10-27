const cards = document.getElementsByClassName("cards");
const front = document.getElementsByClassName("front");
const back = document.getElementsByClassName("back");
const frontCards = document.getElementsByClassName("frontCards");
const backCards = document.getElementsByClassName("backCards");
let pokemons = [];
let pokemonPairsSet = 0;

function load(){
    for(let i = 0; i < cards.length; i++){
        cards[i].onclick = function(){
            cards[i].classList.toggle("flip");
        }
    }

    pokemons = ["bulbasaur.png", "cyndaquil.png", "marill.png", "weedle.png", "caterpie.png", "diglett.png", "mew.png", "ponyta.png", "charmander.png", "eevee.png", "pidgey.png", "squirtle.png", "chikorita.png", "magikarp.png", "pikachu.png", "totodile.png"];
    pokemonPairsSet = [];
    while(pokemonPairsSet.length < 16){
        let randomNum1 = Math.floor(Math.random()*16);
        let randomNum2 = Math.floor(Math.random()*16);
        if(randomNum1 != randomNum2 && backCards[randomNum1].getAttribute("src") == "" && backCards[randomNum2].getAttribute("src") == ""){
            let randomPokemon = pokemons[Math.floor(Math.random()*pokemons.length)];
            backCards[randomNum1].src = `images/${randomPokemon}`;
            backCards[randomNum2].src = `images/${randomPokemon}`;
            pokemons.splice(pokemons.indexOf(randomPokemon), 1);
            pokemonPairsSet.push(randomPokemon);
            pokemonPairsSet.push(`${randomNum1+1} and ${randomNum2+1}`);
        }
    }
    console.log(pokemons);
    console.log(pokemonPairsSet);
}

load();