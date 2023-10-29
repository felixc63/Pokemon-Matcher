const cards = document.getElementsByClassName("cards");
const front = document.getElementsByClassName("front");
const back = document.getElementsByClassName("back");
const frontCards = document.getElementsByClassName("frontCards");
const backCards = document.getElementsByClassName("backCards");
const hundredsPlace = document.getElementById("hundredsPlace");
const tensPlace = document.getElementById("tensPlace");
const onesPlace = document.getElementById("onesPlace");
const resetBtn = document.querySelector("button");

let pokemons = [];
let pokemonPairsSet = 0;
let firstCardIdx;
let secondCardIdx;
let cardIdxsRevealed = [];
let score;

resetBtn.onclick = function(){
    reset();
}

load();

function load(){
    for(let i = 0; i < cards.length; i++){
        cards[i].onclick = function(){
            updateCard(i);
        }
    }
    firstCardIdx = -1;
    secondCardIdx = -1;
    cardIdxsRevealed = [];
    score = 0;
    updateScore();
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
    //Answers; Delete when done
    console.log(pokemons);
    console.log(pokemonPairsSet);
}

function reset(){
    resetBtn.onclick = null;
    for(let i = 0; i < cards.length; i++){
        if(cards[i].className == "cards flip"){
            cards[i].classList.toggle("flip");
        }
    }
    for(let i = 0; i < backCards.length; i++){
        backCards[i].src = "";
    }
    setTimeout(() => {
        load();
        resetBtn.onclick = function(){
            reset();
        }
    }, 300)
}

function updateCard(idx){
    console.log(idx);
    cards[idx].classList.toggle("flip");
    cards[idx].onclick = null;
    if(firstCardIdx == -1){
        firstCardIdx = idx;
    }else{
        secondCardIdx = idx;
        for(let i = 0; i < cards.length; i++){
            cards[i].onclick = null;
        }
        if(backCards[firstCardIdx].src != backCards[secondCardIdx].src){
            setTimeout(() => {
                cards[firstCardIdx].classList.toggle("flip");
                cards[secondCardIdx].classList.toggle("flip");
            }, 500);
        }else{
            cardIdxsRevealed.push(firstCardIdx);
            cardIdxsRevealed.push(secondCardIdx);
        }
        setTimeout(() => {
            for(let i = 0; i < cards.length; i++){
                if(cardIdxsRevealed.indexOf(i) == -1){
                    cards[i].onclick = function(){
                        updateCard(i);
                    }
                }
            }
            firstCardIdx = -1;
            secondCardIdx = -1;
        }, 500)        
    }
    score++;
    updateScore();
}

function updateScore(){
    hundredsPlace.innerText = Math.floor((score/100)%10);
    tensPlace.innerText = Math.floor((score/10)%10);
    onesPlace.innerText = score%10;
}
