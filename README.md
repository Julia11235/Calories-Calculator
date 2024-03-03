# Calories Calculator
The Calories Calculator is an application designed to help users track the number of calories consumed. It includes a database of food products and allows users to input the weight of a product to calculate its calorie count. The application is built using Node.js and Express framework, with data stored in a MySQL database.

<img width="960" alt="start page" src="https://github.com/Julia11235/Calories-Calculator/assets/120017937/76fc47a8-ae45-435f-b9df-3780981c14f0">

### Features
* Dynamic Web Interface: The application provides a user-friendly web interface where users can select a product from a list and input its weight to calculate the calorie count.
* Database Integration: It connects to a MySQL database to retrieve product information and store user inputs.
* Real-time Calculation: Calorie count is calculated dynamically based on the selected product and weight input by the user.
* Visual Feedback: The application provides visual feedback on the total calorie count and displays the meal entries with their respective calorie counts.

### Prerequisites
Before running the application, ensure you have the following installed:
* Node.js
* MySQL database

### Installation
* Clone the repository:
git clone <repository_url>
* npm dependencies:
install npm

###
1. Configure the MySQL database by updating the config.json file with your MySQL credentials and database name.
2. Import the product data into your MySQL database using the provided CSV file (nutrition.csv). You can do this using a MySQL client or command-line tools.

### Start the server:
node server.js
Access the application in your web browser at http://localhost:5000.

### File Structure
* server.js: Main server file containing Express application setup and routes.
* database.js: Module for processing CSV files and inserting data into the MySQL database.
* config.json: Configuration file containing MySQL database credentials.
* views/index.ejs: EJS template file for the web interface.
* public/styles.css: CSS file for styling the web interface.
* public/script.js: JavaScript file containing client-side logic for interacting with the server.

### Usage
1. Launch the application by starting the server (node server.js).  
3. Access the application in your web browser.  
4. Select a product from the list and enter its weight.       
<img width="959" alt="choose product" src="https://github.com/Julia11235/Calories-Calculator/assets/120017937/37cadafe-0612-4902-8466-ead763f666de">      
5. Click the "Calculate Calories" button to view the calorie count for the selected product.     
<img width="948" alt="weight" src="https://github.com/Julia11235/Calories-Calculator/assets/120017937/553bf441-1b58-463b-83a3-6f8400b4fdbd">      
6. The total calorie count for the meal is displayed dynamically.       
7. View the list of meal entries with their respective calorie counts.               
<img width="549" alt="list" src="https://github.com/Julia11235/Calories-Calculator/assets/120017937/943f5aca-f109-4730-b132-6454c72160ea">


