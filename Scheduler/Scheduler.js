const Queue = require('../utils/Queue');
const sortify = require('../utils/sortify');

class Scheduler {
  _readyQueue = new Queue();
  _clock = 0;
  _stats = null;

  constructor(processes) {
    this._processes = [...processes];
    sortify(this._processes, 'arrivalTime');
  }

  _addToReadyQueue() {
    this._processes.forEach((process) => this._readyQueue.enqueue(process));
  }

  _calculateTAT(process) {
    process.turnAroundTime = process.completionTime - process.arrivalTime;
  }

  _calculateWT(process) {
    process.waitingTime = process.turnAroundTime - process.burstTime;
  }

  _calculateRT(process) {
    process.responseTime = process.gotCPUAt - process.arrivalTime;
  }

  _calculateOtherParams() {
    this._processes.forEach((process) => {
      this._calculateTAT(process);
      this._calculateWT(process);
      this._calculateRT(process);
    });
  }

  _calculateStats() {
    const intialState = {
      avgWT: 0,
      avgTAT: 0,
      avgRT: 0,
    };

    const numOfProcesses = this._processes.length;

    return this._processes.reduce((acc, process) => {
      return {
        avgWT: acc.avgWT + process.waitingTime / numOfProcesses,
        avgTAT: acc.avgTAT + process.turnAroundTime / numOfProcesses,
        avgRT: acc.avgRT + process.responseTime / numOfProcesses,
      };
    }, intialState);
  }

  display() {
    // Calculate Stats
    this._calculateOtherParams();
    this._stats = this._calculateStats();

    // Display Stats
    console.table(this._processes);
    console.table(this._stats);
  }
}

module.exports = Scheduler;
