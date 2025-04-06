import { winningConditions } from './winningConditions.js';
export class HardMode {
    getMove = (fields, player) => {

    }
}
// node: aktualna pozycja w grze, pokazującą ułożenie pionków lub elementów
// depth: głębokość poszukiwania (ile ruch)
// isMaximizingPlayer: czy obecnie analizujemy ruch gracza maksymalizującego (true) czy minimalizującego (false)

function minimax(node, depth, isMaximizingPlayer) {
    if (depth === 0 || node.isTerminal()) {
// Jeśli depth === 0 (doszliśmy do końca przeszukiwania) lub node.isTerminal() (znaleźliśmy się w końcowej pozycji gry), to zwracamy wartość tej pozycji (node.value)
        return node.value;
    }


    if (isMaximizingPlayer) {
        let bestVal = -Infinity;
        for (let child of node.children) {
            bestVal = Math.max(bestVal, minimax(child, depth - 1, false));
        }
        return bestVal;
    } else {
        let bestVal = Infinity;
        for (let child of node.children) {
            bestVal = Math.min(bestVal, minimax(child, depth - 1, true));
        }
        return bestVal;
    }
}