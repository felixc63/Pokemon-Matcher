const cards = document.getElementsByClassName("cards");
const front = document.getElementsByClassName("front");
const back = document.getElementsByClassName("back");
const frontCards = document.getElementsByClassName("frontCards");
const backCards = document.getElementsByClassName("backCards");

for(let i = 0; i < cards.length; i++){
    cards[i].onclick = function(){
        cards[i].classList.toggle("flip");
    }
}
