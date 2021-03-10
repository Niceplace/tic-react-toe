import React from 'react';
import './GameGrid.css';

const generateGameCards = (amount = 9) =>
  Array.from(Array(amount).keys()).map((key) => (
    <div className="game-grid-card"></div>
  ));

function GameGrid() {
  return <article className="game-grid">{generateGameCards()}</article>;
}

export default GameGrid;
