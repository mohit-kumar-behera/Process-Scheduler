const Scheduler = require('./Scheduler');
const sortify = require('../utils/sortify');

class SJF extends Scheduler {
  constructor(processes) {
    super(processes);
  }

  schedule() {
    // Sort by Arrival Time
    sortify(this._processes, 'arrivalTime', 'burstTime');
    // Add to Ready Queue
    this._addToReadyQueue();

    while (!this._readyQueue.isEmpty) {
      /* First entry removed from queue */
      const currProcess = this._readyQueue.dequeue();
      const { arrivalTime, burstTime } = currProcess;

      /* CPU is idle as the arrival time is greater than CPU Clock so increase the clock time*/
      if (arrivalTime > this._clock) this._clock = arrivalTime;

      /* Set properties to currProcess */
      currProcess.gotCPUAt = this._clock;
      this._clock += burstTime; // As the scheduling is preemptive so the process is exceuted completely
      currProcess.completionTime = this._clock;
    }

    return this;
  }
}

module.exports = SJF;
