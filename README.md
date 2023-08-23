<!-- LOG DIGESTION -->
To run the code:-
Follow below steps-
1- cd src
2- node index
 
  <!-- Assignment -->
  What needs to be done

Download the data above and split it into time series data. to get the following insights.

Which endpoint is called how many times
How many API calls were being made on per minute basis
How many API calls are there in total for each HTTP status code
Rules/criteria

The entire app/project needs to be done as CLI. No server or browser should be needed
your code must be for NodeJS. so either write it in JS or in TS
Show all the data in a formatted table like following
Assignment must be submitted to your own github profile as public repo. just send us the link of that repo
┌──────────────┬────────────┬───────┐
│   (index)    │ statusCode │ count │
├──────────────┼────────────┼───────┤
│ Server Error │    500     │  23   │
│  Not found   │    404     │  23   │
│      OK      │    200     │ 1256  │
│ Not changed  │    304     │  50   │
└──────────────┴────────────┴───────┘      