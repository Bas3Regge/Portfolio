const startButton = document.querySelector('.start-button');
const timeCounter = document.querySelector('#stop-watch');
const playButton = document.querySelector('.play-button');
const clickerCounter = document.querySelector('#click-counter');
const resetButton = document.querySelector('.reset-button');

playButton.disabled = true;
resetButton.disabled = true;
// blokuje przyciski do klikania i resetowania przed kliknięciem startu

let myWatch = '00' + ':' + '30';
timeCounter.innerText = myWatch;

showTimeCounter = () => {
    
    let timer = 29;
    let minuta;
    let sekunda;
    let endTurn = 'Czas klikania upłynął.';

    const licznik = setInterval(() => {
        minuta = parseInt(timer / 60);
        sekunda = parseInt(timer % 60);
        if (sekunda < 10) {
            sekunda = '0' + sekunda;
        }
        if (minuta < 10) {
            minuta = '0' + minuta;
        }
        let myWatch = minuta + ':' + sekunda;
        timeCounter.innerText = myWatch;

        if(timer === 0) {
            timeCounter.innerText = endTurn;
            startButton.disabled = false;
// odblokowywuje przycisk przed jego dalszym uzywaniem
            playButton.disabled = true;
// blokuje przycisk przed jego dalszym uzywaniem
            clearInterval(licznik);
        }
        timer--;
        
    }, 1000);
}

// zrobić aby timer się nie nakładał na siebie przy wielokrotnym wciśnieciu przycisku start
// w/w poniekąd uniknięte poprzez zablokowanie przycisku startu po jego kliknieciu
startButton.addEventListener('click', () => {
    showTimeCounter();
    playButton.disabled = false;
    resetButton.disabled = false;
    startButton.disabled = true;
// .disabled = true: blokuje przycisk przed jego dalszym uzywaniem
});

let display = 0;
// Żeby 0 wyświetlało się od razu w 'Ilość kliknięć'
clickerCounter.innerText = display;
// należy zadeklarowac aby html wyswietlił display = 0 tak jak w/w zmienna...

playButton.addEventListener('click', () => {
    display++;
    clickerCounter.innerText = display;
});

resetButton.addEventListener('click', () => {
    display = 0;
    clickerCounter.innerText = display;
    location.reload();
});

// 
// chcialbym zeby wyswietlal sie wynik ile klikniec udalo sie zrobic po okreslonym czasie
// przycisk którym powrócimy do strony głównej z przyciskiem start