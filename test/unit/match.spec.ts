/* eslint-disable mocha/no-mocha-arrows */
import { expect } from 'chai';
import { join } from 'path';
import { promises as fs } from 'fs';
import { begin, conclude } from '../../app/controllers/match';
import { reloadConfig, get } from '../../app/db/client';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig';

const dbFilePath = join(__dirname, '../resources/testDb.json');

describe('Matches', () => {
  beforeEach(async () => {
    try {
      await fs.unlink(dbFilePath);
    } catch (error) {
      console.debug(error);
      console.debug(`No database found at ${dbFilePath}, skipping cleanup`);
    }
  });

  it('Should create a new match object linking multiple players', () => {
    const players = [{ name: 'Joe' }, { name: 'Jack' }];
    const newMatch = begin(players);
    expect(newMatch).to.deep.equal({
      players,
      winner: null,
      status: 'pending',
      winningPattern: null,
    });
  });

  it('Should conclude match with a winner and a status', () => {
    const dbPath = join(__dirname, '../resources/testDb');
    const config = new Config(dbPath, true, true, '/');
    reloadConfig(config);

    const players = [{ name: 'Joe' }, { name: 'Jack' }];
    const newMatch = begin(players);

    newMatch.winner = 'Jack';
    newMatch.status = 'completed';
    newMatch.winningPattern = 'diagonal';

    conclude(newMatch);
    const savedMatch = get('/ticreacttoe/match[0]');
    expect(savedMatch).to.deep.equal({
      players,
      winner: 'Jack',
      status: 'completed',
      winningPattern: 'diagonal',
    });
  });

  it('Should not persist match details when status forfeited', () => {
    const dbPath = join(__dirname, '../resources/testDb');
    const config = new Config(dbPath, true, false, '/');
    reloadConfig(config);

    const players = [{ name: 'Joe' }, { name: 'Jack' }];
    const newMatch = begin(players);

    newMatch.winner = 'Jack';
    newMatch.status = 'forfeit';
    newMatch.winningPattern = null;

    conclude(newMatch);
    // Throws because it can't find a saved match
    expect(() => get('/ticreacttoe/match[0]')).to.throw();
  });

  it('Should forbid saving a match if the winner is not one of the two players', () => {
    const dbPath = join(__dirname, '../resources/testDb');
    const config = new Config(dbPath, true, false, '/');
    reloadConfig(config);

    const players = [{ name: 'Joe' }, { name: 'Jack' }];
    const newMatch = begin(players);

    newMatch.winner = 'Simon';
    newMatch.status = 'completed';
    newMatch.winningPattern = null;

    expect(() => conclude(newMatch)).to.throw(
      `Winner Simon not part of match Joe,Jack`,
    );
  });
});
