const Process = require('./utils/Process');
const FCFS = require('./Scheduler/FCFS');
const SJF = require('./Scheduler/SJF');
const SRTF = require('./Scheduler/SRTF');
const RoundRobin = require('./Scheduler/RoundRobin');
const Priority = require('./Scheduler/Priority');

/*
  Process.add([
    [processId, burstTime, arrivalTime = 0, priority = 1], 
    [processId, burstTime, arrivalTime = 0, priority = 1], 
    ....
    [processId, burstTime, arrivalTime = 0, priority = 1]
  ])
*/

// Test Entry for FCFS Scheduling
// const processes = Process.add([
//   [1, 24],
//   [2, 3, 1],
//   [3, 3, 2],
// ]);
// const processes = Process.add([
//   [1, 2],
//   [2, 2, 1],
//   [3, 3, 5],
//   [4, 4, 6],
// ]);
// const fcfs = new FCFS(processes);
// fcfs.schedule().display();

//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////

// Test entry for SJF Scheduling
// const processes = Process.add([
//   [1, 3, 1],
//   [2, 4, 2],
//   [3, 2, 1],
//   [4, 4, 4],
// ]);
// const processes = Process.add([
//   [1, 6],
//   [2, 8],
//   [3, 7],
//   [4, 3],
// ]);
// const sjf = new SJF(processes);
// sjf.schedule().display();

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

// Test entry for SRTF
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

// Test entry for SRTFs Scheduling
// const processes = Process.add([
//   [1, 5, 0],
//   [2, 3, 1],
//   [3, 4, 2],
//   [4, 1, 4],
// ]);
// const srtf = new SRTF(processes);
// srtf.schedule().display();

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

// Test entry for Round Robin Scheduling
// const processes = Process.add([
//   [1, 24, 0],
//   [2, 3, 0],
//   [3, 3, 0],
// ]);
// const timeQuantum = 4;
// const roundRobin = new RoundRobin(processes, timeQuantum);
// roundRobin.schedule().display();

////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////

// Test entry for Priority Scheduling
/*
  new Priority(processes, priorityKey)
  if priorityKey < 0 
    then smallest priority number = highest priority
  else if priorityKey >= 0
    then highest priority number = hjighest priority
*/
// const processes = Process.add([
//   [1, 11, 0, 2],
//   [2, 28, 5, 0],
//   [3, 2, 12, 3],
//   [4, 10, 2, 1],
//   [5, 16, 9, 4],
// ]);
// const priorityScheduler = new Priority(processes, -1);
// priorityScheduler.schedule().display();
