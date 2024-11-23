// 1. Over how many years was the unemployment data collected?

db.getCollection('Unemployment').aggregate(
  [
    { $group: { _id: '$Year' } },
    { $count: 'Years data was collected' }
  ],
  { maxTimeMS: 60000, allowDiskUse: true }
);

// 2. How many states were reported on in this dataset?

db.getCollection('Unemployment').aggregate(
  [
    { $group: { _id: '$State' } },
    { $count: 'State Count' }
  ],
  { maxTimeMS: 60000, allowDiskUse: true }
);

// 3. What does this query compute?

db.unemployment.find({Rate : {$lt: 1.0}}).count()

    // similar to the code above:
db.getCollection('Unemployment').aggregate(
  [
    { $match: { Rate: { $lt: 1 } } },
    { $count: 'Rates less than 1' }
  ],
  { maxTimeMS: 60000, allowDiskUse: true }
);

// 4. Find all counties with unemployment rate higher than 10%

db.getCollection('Unemployment').aggregate(
  [
    {
      $group: {
        _id: '$County',
        avgRate: { $avg: '$Rate' }
      }
    },
    { $match: { avgRate: { $gt: 10 } } },
    { $sort: { avgRate: -1 } }
  ],
  { maxTimeMS: 60000, allowDiskUse: true }
);

// 5. Calculate the average unemployment rate across all states.

db.getCollection('Unemployment').aggregate(
  [
    {
      $group: {
        _id: '$State',
        avgRate: { $avg: '$Rate' }
      }
    },
    {
      $group: {
        _id: 'overall',
        overallAvgRate: { $avg: '$avgRate' }
      }
    }
  ],
  { maxTimeMS: 60000, allowDiskUse: true }
);

// 6. Find all counties with an unemployment rate between 5% and 8%.

db.getCollection('Unemployment').aggregate(
  [
    {
      $group: {
        _id: '$County',
        avgRate: { $avg: '$Rate' }
      }
    },
    { $match: { avgRate: { $gte: 5, $lte: 8 } } }
  ],
  { maxTimeMS: 60000, allowDiskUse: true }
);

// 7. Find the state with the highest unemployment rate. Hint. Use { $limit: 1 }

db.getCollection('Unemployment').aggregate(
  [
    {
      $group: {
        _id: '$State',
        avgRate: { $avg: '$Rate' }
      }
    },
    { $sort: { avgRate: -1 } },
    { $limit: 1 }
  ],
  { maxTimeMS: 60000, allowDiskUse: true }
);

// 8. Count how many counties have an unemployment rate above 5%.

db.getCollection('Unemployment').aggregate(
  [
    {
      $group: {
        _id: '$County',
        avgRate: { $avg: '$Rate' }
      }
    },
    { $match: { avgRate: { $gt: 5 } } },
    { $count: 'Total Counties' }
  ],
  { maxTimeMS: 60000, allowDiskUse: true }
);

// 9. Calculate the average unemployment rate per state by year.

db.getCollection('Unemployment').aggregate(
  [
    {
      $group: {
        _id: { State: '$State', Year: '$Year' },
        avgRate: { $avg: '$Rate' }
      }
    },
    {
      $project: {
        _id: 0,
        State: '$_id.State',
        Year: '$_id.Year',
        avgRate: 1
      }
    },
    { $sort: { State: 1, Year: 1 } }
  ],
  { maxTimeMS: 60000, allowDiskUse: true }
);

// 10. (Extra Credit) For each state, calculate the total unemployment rate across all counties (sum of all county rates).



// 11. (Extra Credit) The same as Query 10 but for states with data from 2015 onward




