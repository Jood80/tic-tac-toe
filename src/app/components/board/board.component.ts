import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.scss'],
})
export class BoardComponent implements OnInit {
  squares: any[];
  winner: string;
  hasWinner: boolean;
  xIsNext: boolean; //to determine the current player

  constructor() {}

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.squares = Array(9).fill(null);
    this.winner = null!;
    this.hasWinner = false;
    this.xIsNext = true;
  }

  get player() {
    return this.xIsNext ? 'X' : 'O';
  }

  calculateWinner() {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];

    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        this.squares[a] &&
        this.squares[a] === this.squares[b] &&
        this.squares[b] === this.squares[c]
      ) {
        return this.squares[a];
      }
    }
    return null;
  }

  makeAmove(index: number) {
    if (!this.squares[index]) {
      this.squares.splice(index, 1, this.player);
      this.xIsNext = !this.xIsNext;
    }
    this.winner = this.calculateWinner();
    if (this.winner.length > 0) {
      this.hasWinner = true;
    }
  }
}
