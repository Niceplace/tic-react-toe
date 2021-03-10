import { save } from '../db/client';
import { inspect } from 'util';

type TokenMap = {
  [key in PlayerToken]: number;
};

export class Grid {
  #initialGrid: Array<number[]>;
  grid!: Array<number[]>; // Ignoring TS here because it is initialized in the constructor, just not directly
  tokenMap: TokenMap = { X: 0, O: 1 };
  playerX: string | null;
  playerO: string | null;
  constructor(playerNames: string[]) {
    this.#initialGrid = [
      [-1, -1, -1],
      [-1, -1, -1],
      [-1, -1, -1],
    ];
    this.initGrid();
    this.playerX = playerNames[0];
    this.playerO = playerNames[1];
  }
  initGrid(): void {
    this.grid = this.#initialGrid;
  }
  removePlayer(name: string): void {
    if (![this.playerX, this.playerO].includes(name)) {
      throw new Error(`Cannot remove ${name} as it is not part of that grid`);
    }
    if (this.playerX === name) {
      this.playerX = null;
    } else {
      this.playerO = null;
    }
  }
  addPlayer(name: string): void {
    if (this.playerX === null) {
      this.playerX = name;
    } else {
      this.playerO = name;
    }
    // TODO: Reset grid
  }
  check(): CheckResponse {
    // Check for vertical wins
    const v1 = this.grid
      .map((row) => row[0])
      .reduce((prev, current) => prev + current);
    const v2 = this.grid
      .map((row) => row[1])
      .reduce((prev, current) => prev + current);
    const v3 = this.grid
      .map((row) => row[2])
      .reduce((prev, current) => prev + current);
    // Check for horizontal wins
    const h1 = this.grid[0].reduce((prev, current) => prev + current);
    const h2 = this.grid[1].reduce((prev, current) => prev + current);
    const h3 = this.grid[2].reduce((prev, current) => prev + current);

    // Check for diagonal wins
    const d1 = [this.grid[0][0], this.grid[1][1], this.grid[2][2]].reduce(
      (prev, current) => prev + current,
    );
    const d2 = [this.grid[2][0], this.grid[1][1], this.grid[0][2]].reduce(
      (prev, current) => prev + current,
    );

    if (this.playerO === null || this.playerX === null) {
      throw new Error('Both players need to be active to complete a game');
    }
    if ([v1, v2, v3].includes(3)) {
      return { pattern: 'vstraight', token: 'O', winner: this.playerO };
    }
    if ([h1, h2, h3].includes(3)) {
      return { pattern: 'hstraight', token: 'O', winner: this.playerO };
    }
    if ([d1, d2].includes(3)) {
      return { pattern: 'diagonal', token: 'O', winner: this.playerO };
    }
    if ([v1, v2, v3].includes(0)) {
      return { pattern: 'vstraight', token: 'X', winner: this.playerX };
    }
    if ([h1, h2, h3].includes(0)) {
      return { pattern: 'hstraight', token: 'X', winner: this.playerX };
    }
    if ([d1, d2].includes(0)) {
      return { pattern: 'diagonal', token: 'X', winner: this.playerX };
    }
    return { pattern: 'none', winner: `${this.playerO}${this.playerX}` };
  }
}

export const begin = (players: Player[]): Match => {
  // Create a new match object linking multiple players
  const newMatch: Match = {
    players,
    winner: null,
    status: 'pending',
    winningPattern: null,
  };
  return newMatch;
};

export const conclude = (completedMatch: Match): void => {
  // Check if winner username is in the match ?
  // Check match status (completed, forfeited)
  // If forfeited (player quit without finishing), do nothing
  // Register and save to DB
  if (completedMatch.status === 'forfeit') {
    console.warn(`Not saving forfeited match`);
    return;
  }
  if (
    !completedMatch.players.find(
      (player) => player.name === completedMatch.winner,
    )
  ) {
    const errorMessage = `Winner ${
      completedMatch.winner
    } not part of match ${completedMatch.players.map((player) => player.name)}`;
    console.error(errorMessage);
    throw new Error(errorMessage);
  }

  console.log(
    `Saving match: ${inspect(completedMatch)}. \r\n Winner: ${
      completedMatch.winner
    }`,
  );

  const entityPath = '/ticreacttoe/match[]';
  return save(entityPath, completedMatch, true);
};
