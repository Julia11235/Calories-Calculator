// Importing modules
const express = require('express');           // Handling HTTP requests
const bodyParser = require('body-parser');    // Parsing request bodies
const mysql = require('mysql');               // Connecting to MySQL database
const processCSVFile = require('./database'); // Processing CSV files 
const config = require('./config.json');    
const path = require('path');

// Creating an Express application object using express()
const app = express();
const PORT = 5000;

// Setting the path to views directory
app.use(express.static(path.join(__dirname, 'views')));
// Defining middleware to parse data sent in JSON format
// This enables easy reading and manipulation of data sent in JSON format.
app.use(bodyParser.json());
// Defining middleware to parse data sent in URL-encoded forms
app.use(bodyParser.urlencoded({ extended: true }));
// Setting the view engine to EJS
app.set('view engine', 'ejs');

// Creating a connection to the MySQL database using configuration data (host, user, password, database name)
// retrieved from the config.json file.
const connection = mysql.createConnection({
  host: config.mysql.host,
  user: config.mysql.user,
  password: config.mysql.password,
  database: config.mysql.database
});

// After establishing a connection to the database, the processCSVFile(connection) function is called,
// which processes the CSV file and inserts data into the database.
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database');

  processCSVFile(connection);
});


// Defining the GET route '/styles.css', which serves a static CSS file.
app.get('/styles.css', (req, res) => {
  res.sendFile(path.join(__dirname, 'views', 'styles.css'), {
      headers: {
          'Content-Type': 'text/css'
      }
  });
});

// GET route '/': 
// Handles HTTP GET request at the root address. 
// Retrieves products from the database and renders the index.ejs view, passing product data to the view.
app.get('/', (req, res) => {
  const sqlQuery = 'SELECT product_name FROM Products ORDER BY product_name';
  connection.query(sqlQuery, (error, results) => {
    if (error) {
      console.error('Error retrieving products from database:', error);
      res.status(500).send('Server error');
      return;
    }
    res.render('index', { products: results });
  });
});

// POST route '/process': 
// Handles HTTP POST request at the '/process' path. 
// Retrieves product and weight data from the request, then calculates the calorie count based on database data. 
// Returns the calculated calories in JSON format.
app.post('/process', (req, res) => {
  console.log(req.body);
  const { product, weight } = req.body;

  if (!product || !weight || isNaN(parseFloat(weight))) {
      res.status(400).json({ error: 'Invalid input' });
      return;
  }

  const sqlQuery = 'SELECT calories FROM Products WHERE product_name = ?';
  connection.query(sqlQuery, [product], (error, results) => {
      if (error) {
          console.error('Error retrieving product from database:', error);
          res.status(500).json({ error: 'Server error' });
          return;
      }

      if (results.length === 0) {
          res.status(404).json({ error: 'Product not found' });
          return;
      }

      const calorieCountPer100g = results[0].calories;

      // Calculate calories
      const calories = (Math.floor((calorieCountPer100g / 100) * weight));

      // Send calculated calories in JSON format
      res.json({ calories });
  });
});


// Starting the server: 
// The application listens on a specified port (in this case, port 5000)
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
