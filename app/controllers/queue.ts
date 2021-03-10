class QueueController {
  queue: QueueEntry[];
  constructor() {
    this.queue = new Array<QueueEntry>();
  }
  add(username: string, timestamp: Date): boolean {
    if (this.queue.find((entry) => entry.username === username)) {
      console.error(`Cannot add ${username}. It is already in the queue`);
      return false;
    }
    this.queue.push({
      username,
      timestamp,
    });
    this.sort();
    return true;
  }
  remove(username: string): boolean {
    const foundElementIndex = this.queue.findIndex(
      (entry) => entry.username === username,
    );
    if (foundElementIndex === -1) {
      console.error(`Cannot remove ${username} at it does not exist`);
      return false;
    }
    this.queue.splice(foundElementIndex, 1);
    this.sort();
    return true;
  }
  createMatch(): string[] {
    const playerCount = 2;
    const matchedPlayers: string[] = [];
    if (this.queue.length < playerCount) {
      throw new Error(
        `Cannot create a match with less than ${playerCount} players. Got ${this.queue.length}`,
      );
    }
    // Pop the first (playerCount) players
    let i = 0;
    while (i < playerCount) {
      const player = this.queue.shift();
      if (player) {
        console.log(`Pushing ${player.username}`);
        matchedPlayers.push(player.username);
      }
      i = i + 1;
    }

    return matchedPlayers;
  }
  sort(): void {
    // Sort on each add
    this.queue.sort((entry1: QueueEntry, entry2: QueueEntry) => {
      // If timestamp1 more recent than timestamp2, return 1
      // If timestamp1 older than timestamp2, return -1
      // If timestamps are equal, return 0
      const timeDifference =
        entry1.timestamp.getTime() - entry2.timestamp.getTime();
      let result = 0;
      if (timeDifference !== 0) {
        result = timeDifference > 0 ? 1 : -1;
      }
      return result;
    });
  }
  clear(): void {
    console.log(`About to clear queue ${JSON.stringify(this.queue)}`);
    const numItemsToDelete = this.queue.length;
    for (let i = 0; i < numItemsToDelete; i++) {
      const removed = this.queue.shift();
      console.log(`Removed ${JSON.stringify(removed)}`);
    }
    console.log(`Cleared queue ${JSON.stringify(this.queue)}`);
  }
}

let queueControllerInstance: QueueController;

// Exports
export const getQueueController = (): QueueController => {
  if (!queueControllerInstance) {
    queueControllerInstance = new QueueController();
  }
  return queueControllerInstance;
};

export type Queue = InstanceType<typeof QueueController>;
