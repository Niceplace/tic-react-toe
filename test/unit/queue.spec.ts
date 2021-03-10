/* eslint-disable mocha/no-mocha-arrows */
import { DateTime } from 'luxon';
import { expect } from 'chai';
import { Queue, getQueueController } from '../../app/controllers/queue';

describe('Match queue', () => {
  // How to get type of a class ?
  let queueControllerInstance: Queue;
  before(() => {
    queueControllerInstance = getQueueController();
  });
  beforeEach(() => {
    queueControllerInstance.clear();
    expect(queueControllerInstance.queue).to.have.length(0);
  });

  it('Should always return the same queue', () => {
    const queueInstance1 = getQueueController();
    const queueInstance2 = getQueueController();
    return expect(queueInstance1 === queueInstance2).to.equal(true);
  });

  it('Should successfully add a new player to an empty queue', () => {
    expect(queueControllerInstance.queue).to.have.length(0);
    const result = queueControllerInstance.add('Test user', new Date());
    expect(result).to.equal(true);
    expect(queueControllerInstance.queue).to.have.length(1);
  });

  it('Should sort the queue when adding a new player to an existing queue', () => {
    const earlyTimestamp = DateTime.local();
    const lateTimestamp = earlyTimestamp.plus(100);

    queueControllerInstance.add('Joe', lateTimestamp.toJSDate());
    queueControllerInstance.add('John', earlyTimestamp.toJSDate());

    expect(queueControllerInstance.queue).to.have.length(2);
    expect(queueControllerInstance.queue[0].username).to.equal('John');
  });

  it('Should sort the queue when removing a player from an existing queue', () => {
    const earlyTimestamp = DateTime.local();
    const middleTimestamp = earlyTimestamp.plus(100);
    const lateTimestamp = earlyTimestamp.plus(101);

    queueControllerInstance.add('Joe', lateTimestamp.toJSDate());
    queueControllerInstance.add('John', middleTimestamp.toJSDate());
    queueControllerInstance.add('Jack', earlyTimestamp.toJSDate());
    queueControllerInstance.remove('Jack');

    expect(queueControllerInstance.queue).to.have.length(2);
    expect(queueControllerInstance.queue[0].username).to.equal('John');
  });

  it('Should match the first two players of an existing queue', () => {
    const timestamp = DateTime.local();

    queueControllerInstance.add('Joe', timestamp.toJSDate());
    queueControllerInstance.add('John', timestamp.plus(100).toJSDate());
    queueControllerInstance.add('Jack', timestamp.plus(200).toJSDate());

    const match = queueControllerInstance.createMatch();

    expect(match).to.have.members(['Joe', 'John']);
  });

  it('Should fail to re-add a player with an existing username to an existing queue', () => {
    const timestamp = DateTime.local();

    const firstAddResult = queueControllerInstance.add(
      'Joe',
      timestamp.toJSDate(),
    );
    const secondAddResult = queueControllerInstance.add(
      'Joe',
      timestamp.toJSDate(),
    );
    expect(firstAddResult).to.equal(true);
    expect(secondAddResult).to.equal(false);
  });

  it('Should fail to remove players from an empty queue', () => {
    const deleteResult = queueControllerInstance.remove('Joe');
    expect(deleteResult).to.equal(false);
  });

  it('Should fail to match players if the queue size is less than 1', () => {
    const timestamp = DateTime.local();

    queueControllerInstance.add('Joe', timestamp.toJSDate());
    expect(() => queueControllerInstance.createMatch()).to.throw(
      'Cannot create a match with less than 2 players. Got 1',
    );
  });
});
