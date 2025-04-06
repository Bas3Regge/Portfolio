export class Board {
    fieldsElements = document.querySelectorAll('.board__item')
    panel = document.querySelector('.panel')
    button = document.querySelector('.reset-button')
    modeSelect = document.querySelector('#mode-select');
    currentPlayer = document.querySelector('#current-player');
    gameTimer = document.querySelector('#time-for-move');

    constructor (onItemClick, onButtonClick, onModeChange) {
    this.onButtonClick = onButtonClick;
    
    this.button.addEventListener('click', this.handleButtonClick)
    this.fieldsElements.forEach(field => {
        field.addEventListener('click', onItemClick);
        })
        this.modeSelect.addEventListener('change', onModeChange);
        
        this.setCurrentPlayer('X');
        this.showGameTime(false,'X');
    }
    
    showGameTime = (click, player) => {

        // po uplynieciu czasu powinna nastepić zmiana gracza
        // czas dla każdego gracza powinien działać osobno
        let timer = 30;
        let minuta;
        let sekunda;
        let endTurn = 'Czas ruchu upłynął, koniec twojej kolejki.';

//potrzebny warunek jesli gracz x kliknie to przypisze nam gracza o

        const licznik = setInterval(() => {
            minuta = parseInt(timer / 60);
            sekunda = parseInt(timer % 60);
            if (sekunda < 10) {
                sekunda = '0' + sekunda;
            }
            if (minuta < 10) {
                minuta = '0' + minuta;
            }
            let display = minuta + ':' + sekunda;
            this.gameTimer.innerText = display;

            if(timer === 0) {
                this.gameTimer.innerText = endTurn;
                clearInterval(licznik);
            }
            if (click) { 
                clearInterval(licznik);
                return player === 'X' ? 'O' : 'X';
            }
            timer--;
            
        }, 1000);
    }

    setCurrentPlayer = player => {
        this.currentPlayer.innerText = player;
    }

    handleButtonClick = () => {
        this.resetBoard();
        this.onButtonClick();
    }

    resetBoard = () => {
        this.resetBoardClasses();
        this.clearMessage();
        this.setCurrentPlayer('X');
        this.showGameTime(false, 'X');
    }


    resetBoardClasses = () => {
        this.fieldsElements.forEach(field => {
            field.classList.remove('board__item--filled-X', 'board__item--filled-O')
        })
    }

    getFieldForPosition = (position) => {
        return this.fieldsElements[position]
    }

    displayWinMessage = (activePlayer) => {
        this.panel.innerText = `Gratulacje ${activePlayer}, Wygrałeś`
    }
    
    displayTieMessage = () => {
        this.panel.innerText = `Remis!`
    }
    
    clearMessage = () => {
        this.panel.innerText = '';
    }
}