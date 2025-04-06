
// const jest stałą zmienną więc nie możemy jej zmienić na inną zmienną
// document.getElementById('test')

// console.log(fields);

// fields.forEach((field) =>{
//     field.addEventListener('click', e =>{
//         console.log(e);
//         console.log(e.target.dataset);
        
//     })
// })
import { Board } from './board.js';
import { EasyMode } from './easy.js';
import { MediumMode } from './medium.js';
import { HardMode } from './hard.js';
import { winningConditions } from './winningConditions.js';

class Game {
    fields;
    activePlayer;
    gameActive;

    currentMode = null; //null = pvp
    doesAIMoveFirst= false;

    constructor() {
        this.board = new Board(
            this.handleItemClick, 
            this.handleReset,
            this.handleModeChange);
        this.setDefaults();
    }

    validateGame = () => {
        let gameWon = false;
        for (let i = 0; i <= 7; i++) {
            const [posA, posB, posC] = winningConditions[i];
            /*nazywając zmienne starajmy się nie nazywać ich pojedyńczymi literami ponieważ w przyszłości pisany kod może stać się mało czytelny*/
            const value1 = this.fields[posA];
            const value2 = this.fields[posB];
            const value3 = this.fields[posC];
            console.log(value1, value2, value3, this.fields)
    
            if (value1 !== '' && value1 === value2 && value1 === value3) {
                gameWon = true;
                break;
            }
        }
        if (gameWon){
            this.gameActive = false;
            this.board.displayWinMessage(this.activePlayer);
        } else if (this.isBoardFull()) {
            this.gameActive = false;
            this.board.displayTieMessage();
        }
    }

    isBoardFull = () => {
        return this.fields.find(field => field === '') === undefined;
    }
    
    handleModeChange = (e) => {
        this.currentMode = this.getModeClassForName(e.target.value)
        this.setDefaults(false);
        this.board.resetBoard();
    }


    getModeClassForName = name => {
        if (name === 'easy') return new EasyMode();
        if (name === 'medium') return new MediumMode();
        if (name === 'hard') return new HardMode();
        return null;
    } 

    handleReset = () => {
        this.setDefaults(!this.doesAIMoveFirst);
        this.AIsFirstMove();
    }
    
    AIsFirstMove = () => {
        if (this.doesAIMoveFirst && this.currentMode !== null) {
            this.makeMove(this.currentMode.getMove(this.fields, this.activePlayer))
        }
    }

    handleItemClick = e => {
    
        const { pos } = e.target.dataset;
        // destrukturyzacja sposób na wyciagniecie danych z obiektu
        if (this.gameActive && this.fields[pos] === '') {
            this.makeMove(pos);
            if (this.gameActive && this.currentMode !== null) {
                this.makeMove(this.currentMode.getMove(this.fields, this.activePlayer))
            }
        }
    }

    makeMove = position => {
        this.fields[position] = this.activePlayer;
        this.board.getFieldForPosition(position).classList.add(`board__item--filled-${this.activePlayer}`);
        this.validateGame();
        this.activePlayer = this.board.showGameTime(true, this.activePlayer) ? this.board.showGameTime(true, this.activePlayer) : this.activePlayer === 'X' ? 'O' : 'X';
        this.board.setCurrentPlayer(this.activePlayer);
    }
    
    setDefaults = (isAIsMove) => {
        this.fields = ['', '', '', '', '', '', '', '', ''];
        this.activePlayer = 'X';
        this.gameActive = true;
        this.doesAIMoveFirst = isAIsMove !== undefined ? isAIsMove : false; 
    }
}

const game = new Game();