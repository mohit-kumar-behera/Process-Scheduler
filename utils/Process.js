const Process = function (id, burstTime, arrivalTime = 0, priority = 1) {
  this.id = `Process - ${id}`;
  this.arrivalTime = arrivalTime;
  this.burstTime = burstTime;
  this.priority = priority;
};

Process.processes = [];

Process.add = function (args) {
  if (!(args instanceof Array)) return;

  args.forEach((arg) => {
    Process.processes.push(new Process(...arg));
  });

  return Process.processes;
};

module.exports = Process;
