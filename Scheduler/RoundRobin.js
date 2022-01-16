const Scheduler = require('./Scheduler');
const sortify = require('../utils/sortify');

class RoundRobin extends Scheduler {
  constructor(processes, timeQuantum = 1) {
    super(processes);
    this._timeQuantum = timeQuantum;
  }

  // _sortByBurstTimeArrivalTime() {
  //   this._readyQueue.elements.sort((a, b) => {
  //     if (a.burstRemainingTime > b.burstRemainingTime) return 1;
  //     else if (a.burstRemainingTime < b.burstRemainingTime) return -1;
  //     else return a.arrivalTime - b.arrivalTime;
  //   });
  // }

  _addToReadyQueue() {
    this._processesArrived.forEach((process) => {
      process.burstRemainingTime = process.burstTime;
      process.addedToQueue = true;
      this._readyQueue.enqueue(process);
    });
  }

  schedule() {
    while (this._processes[0].arrivalTime > this._clock) this._clock += 1;

    do {
      // Processes that have arrived and have not yet added to readyQueue
      this._processesArrived = this._processes.filter(
        (process) => process.arrivalTime <= this._clock && !process.addedToQueue
      );

      // Add the processes to readyQueue and the sort by arrival time
      this._addToReadyQueue();
      sortify(this._readyQueue.elements, 'arrivalTime');

      // Select the first process from readyQueue
      const currProcess = this._readyQueue.dequeue();
      // Execute it for time quantum
      currProcess.gotCPUAt ??= this._clock;
      const diffFactor =
        this._timeQuantum >= currProcess.burstRemainingTime
          ? currProcess.burstRemainingTime
          : this._timeQuantum;

      currProcess.burstRemainingTime -= diffFactor;
      this._clock += diffFactor;

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

module.exports = RoundRobin;
