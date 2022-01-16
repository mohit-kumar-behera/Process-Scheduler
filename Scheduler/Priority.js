const Scheduler = require('./Scheduler');
const sortify = require('../utils/sortify');

class Priority extends Scheduler {
  constructor(processes, priorityFlag = 1) {
    super(processes);
    this._priorityFlag = priorityFlag >= 0 ? 1 : -1;
  }

  _addToReadyQueue() {
    this._processesArrived.forEach((process) => {
      process.burstRemainingTime = process.burstTime;
      process.addedToQueue = true;
      this._readyQueue.enqueue(process);
    });
  }

  schedule() {
    while (this._processes[0].arrivalTime > this._clock) this._clock += 1;
    // -priority --> descending order, priority --> ascending order
    const priorityOrderBy = this._priorityFlag >= 0 ? '-priority' : 'priority';

    do {
      // Processes that have arrived and have not yet added to readyQueue
      this._processesArrived = this._processes.filter(
        (process) => process.arrivalTime <= this._clock && !process.addedToQueue
      );

      // Add the processes to readyQueue and the sort by burst remaining time
      this._addToReadyQueue();
      sortify(this._readyQueue.elements, priorityOrderBy);

      // Select the first process from readyQueue
      const currProcess = this._readyQueue.dequeue();
      // Execute it for 1 time quantum
      currProcess.gotCPUAt ??= this._clock;
      currProcess.burstRemainingTime -= 1;
      this._clock += 1;

      if (currProcess.burstRemainingTime !== 0) {
        // re-push the process to readyQueue if it hasn't been completed yet
        this._readyQueue.enqueue(currProcess);
      } else {
        // process is completely executed
        currProcess.complete = true;
        currProcess.completionTime = this._clock;
      }
    } while (!this._readyQueue.isEmpty);

    return this;
  }
}

module.exports = Priority;
