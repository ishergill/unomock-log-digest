"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };

//importing file system modules
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const logsDirectory = path_1.default.join(__dirname, "data");

//reading logs from files seperated by each line
function readDataFromFile(filePath) {
  const logs = fs_1.default.readFileSync(filePath, "utf-8");
  const logData = logs.split("\n");
  return logData;
}

//processing log data
function processLogData(logData) {
  let allLogEntries = [];
  logData.forEach((logFile) => {
    const logFilePath = path_1.default.join(logsDirectory, logFile);
    const logEntries = readDataFromFile(logFilePath);
    allLogEntries = [...allLogEntries, ...logEntries];
  });
  return allLogEntries;
}

//function to get API endpoint from a log by using regular expression to match the endpoint
function getApiEndpointFromLog(logEntry) {
  const regex = /"GET\s+([^"\s]+)\s+HTTP\/\d\.\d"/;
  const match = logEntry.match(regex);
  if (match && match[1]) {
    return match[1];
  } else {
    return null; 
    // Return null if the regex does not match or the API endpoint is not found
  }
}

//function to count how many times API endpoints are called by using a map
function countAPIEndpointCalls(logEntries) {
  const endpointCounts = new Map();
  logEntries.forEach((entry) => {
    const endpoint = getApiEndpointFromLog(entry);
    endpointCounts.set(endpoint, (endpointCounts.get(endpoint) || 0) + 1);
  });
  return endpointCounts;
}

//function to count API calls per minute by taking date and time and checking valid API endpoint in a log
function countAPICallsPerMinute(logEntries) {
  const apiCallsPerMinute = new Map();
  logEntries.forEach((entry) => {
    const [date, min] = entry.split(" ");
    const timestamp = date + "-" + min;
    if (!isNaN(new Date(date)) && entry.includes('HTTP/1.1"')) {
      apiCallsPerMinute.set(
        timestamp,
        (apiCallsPerMinute.get(timestamp) || 0) + 1
      );
    }
  });

  return apiCallsPerMinute;
}

//function to count number of API calls according to status by putting all the status codes in a map and counting for every log that contains API endpoint
function countAPICallsByStatusCode(logEntries) {
  const statusCodeCounts = new Map();
  logEntries.forEach((entry) => {
    const statusCodePattern = /" (\d{3}) /;
    const matches = entry.match(statusCodePattern);
    if (matches && matches.length > 1) {
      const statusCode = matches[1];
      statusCodeCounts.set(
        statusCode,
        (statusCodeCounts.get(statusCode) || 0) + 1
      );
    }
  });
  return statusCodeCounts;
}

//importing data files
const logFiles = [
  "../data/api_calls_data1.log",
  "../data/api_calls_data2.log",
  "../data/api_calls_data3.log",
];
const logEntries = processLogData(logFiles);

const endpointCounts = countAPIEndpointCalls(logEntries);
const apiCallsPerMinute = countAPICallsPerMinute(logEntries);
const statusCodeCounts = countAPICallsByStatusCode(logEntries);

// Displaying final data-tables
console.log("end-point-count:");
console.table(Array.from(endpointCounts.entries()));
console.log("\napi-calls/minute:");
console.table(Array.from(apiCallsPerMinute.entries()));
console.log("\nstatus-code-counts:");
console.table(Array.from(statusCodeCounts.entries()));
