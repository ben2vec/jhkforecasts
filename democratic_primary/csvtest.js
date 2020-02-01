const d3 = require('d3');
const ObjectsToCsv = require('objects-to-csv')

// Sample data - two columns, three rows:
const data = [
    { code: 'CA', name: 'California', population: 15000 },
    { code: 'TX', name: 'Texas', population: 15000 },
    { code: 'NY', name: 'New York', population: 15000 },
    { code: 'NY', name: 'New York', population: 15000 },
];

// If you use "await", code must be inside an asynchronous function:
(async () => {
    const csv = new ObjectsToCsv(data);

    // Save to file:
    await csv.toDisk('./jackstest.csv');

    // Return the CSV file as string:
    console.log(await csv.toString());
})();