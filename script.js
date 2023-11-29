const cards = document.querySelectorAll('.card');
var container = document.querySelector('.container');
var intent1 = "pair-0";
var intent1id = "0";
const puntosElemento = document.getElementById("puntos");

var intent2 = "pair-0";
var intent2id = "0";

var foundPairs = []

window.addEventListener('load', function() {

    // Código que se ejecutará cuando la página se haya cargado completamente
    console.log("ordenar aleatoriamente")
    shuffleElements(container);


});
cards.forEach(card => {
    card.addEventListener('click', function(e) {

        if (!foundPairs.includes(card.dataset.key) && card.id != intent1id) {
            console.log(card.dataset.key)
            if (intent1 == "pair-0") {
                intent1 = card.dataset.key;
                intent1id = card.id;
                card.classList.add('flip');
            } else if (intent2 == "pair-0") {
                intent2 = card.dataset.key;
                intent2id = card.id;

                card.classList.add('flip');

                if (intent1 == intent2) {
                    console.log("winnnn")
                    foundPairs.push(card.dataset.key);
                    dispelCards(card.dataset.key);
                } else {
                    console.log("no winnnn")
                    setTimeout(function() {

                        flipCards(intent1id, intent2id);
                    }, 200);





                }

            }
        }

    })
});

function dispelCards(pair) {
    const cards = document.querySelectorAll('.card[data-key="' + pair + '"]');
    cards.forEach(card => {
        card.classList.add('playing');
        card.classList.remove('flip');

    });
    const audio = document.querySelector('#win');
    audio.currentTime = 0; //rewind to the start
    audio.play();
    puntosElemento.textContent = "puntos: " + foundPairs.length;
    intent1 = "pair-0";
    intent2 = "pair-0";
    intent1id = "0";
    intent2id = "0";

}

function flipCards(card1, card2) {

    const cards1 = document.querySelector("#" + card1);
    const cards2 = document.querySelector("#" + card2);
    cards1.classList.remove('flip');
    cards2.classList.remove('flip');
    const audio = document.querySelector('#nowin');
    audio.currentTime = 0; //rewind to the start
    audio.play();
    intent1 = "pair-0";
    intent2 = "pair-0";
    intent1id = "0";
    intent2id = "0";



}

function shuffleElements(container) {
    for (var i = container.children.length; i >= 0; i--) {
        container.appendChild(container.children[Math.random() * i | 0]);
    }
}