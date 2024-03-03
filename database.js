// Modules fs and csv-parser are imported, which are used for file operations and CSV data processing.
const fs = require('fs');
const csv = require('csv-parser');

// The processCSVFile function is used to process a CSV file and insert data into the database,
// which takes a connection parameter representing the database connection.
function processCSVFile(connection) {
  console.log('Processing CSV file...');
  
  // Check if the Products table is empty
  connection.query('SELECT COUNT(*) AS count FROM Products', (error, results) => {
    if (error) {
      console.error('Error checking database:', error);
      return;
    }

    const rowCount = results[0].count;

    // If the table is empty, data is fetched from the CSV file and inserted into the database
    if (rowCount === 0) {
      fs.createReadStream('nutrition.csv')
        .pipe(csv())
        .on('data', (row) => {
          const productName = row['name'];
          const calories = row['calories'];

          const insertQuery = 'INSERT INTO Products (product_name, calories) VALUES (?, ?)';
          connection.query(insertQuery, [productName, calories], (error, results) => {
            if (error) {
              console.error('Error inserting data into database:', error);
              return;
            }
            console.log('Data inserted successfully:', results);
          });
        })
        .on('end', () => {
          console.log('CSV file processing completed');
        });
    } else {
      console.log('Database already contains data. Skipping CSV processing.');
    }
  });
}

// The processCSVFile function is exported to be used in other files.
module.exports = processCSVFile;
