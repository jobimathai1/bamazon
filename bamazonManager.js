//Adding the needed packages
var mysql = require('mysql');
var inquirer = require('inquirer');

//MySQL DB connection
var connection = mysql.createConnection({
	host: 'localhost',
	port: 3306,

	// Your username
	user: 'root',

	// Your password
	password: '',
	database: 'Bamazon'
});


function manager() {

	// Prompt the manager to select an option
	inquirer.prompt([
		{
			type: 'list',
			name: 'option',
			message: 'Please select an option:',
            choices: ['View Products for Sale', 
                     'View Low Inventory', 
                     'Add to Inventory', 
                     'Add New Product'],

			filter: function (answer) {
				if (answer === 'View Products for Sale') {
					return 'sale';
				}
				if (answer === 'View Low Inventory') {
					return 'lowInventory';
				}
				if (answer === 'Add to Inventory') {
					return 'addInventory';
				}
				if (answer === 'Add New Product') {
					return 'newProduct';
				}
			}
		}
	]).then(function(input) {

		// Trigger the appropriate action based on the user input
		if (input.option ==='sale') {
			displayInventory();
		} 
		if (input.option === 'lowInventory') {
			displayLowInventory();
		} 
		if (input.option === 'addInventory') {
			addInventory();
		} 
		if (input.option === 'newProduct') {
			createNewProduct();
		}
	})
}

function displayInventory() {
	// Construct the db query string
	queryStr = 'SELECT * FROM products';

	// Make the db query
	connection.query(queryStr, function(err, res) {
		if (err) throw err;

	console.log("----------------------------------------------------");
	console.log("Item Id | Product | Dept | Price | In Stock Quantity");
	console.log("----------------------------------------------------");

		var strOut = '';
		for (var i = 0; i < res.length; i++) {
			strOut = '';
			strOut += res[i].item_id + ' | ';
			strOut += res[i].product_name + ' | ';
			strOut += res[i].department_name + ' | ';
			strOut += res[i].price + ' | ';
			strOut += + res[i].stock_quantity + '\n';

			console.log(strOut);
		}

	  	console.log("---------------------------------------------------------------------\n");

		// End the database connection
		connection.end();
	})
}

// this function will display a list of products with the available quantity below 500
function displayLowInventory() {
	// Construct the db query string
	queryStr = 'SELECT * FROM products WHERE stock_quantity < 500';

	// Make the db query
	connection.query(queryStr, function(err, data) {
		if (err) throw err;

		console.log('Low Inventory Items (below 500): ');
		console.log("----------------------------------------------------");
		console.log("Item Id | Product | Dept | Price | In Stock Quantity");
		console.log("----------------------------------------------------");

		var inventoryCount = '';
		for (var i = 0; i < data.length; i++) {
			inventoryCount = '';
			inventoryCount += data[i].item_id + ' | ';
			inventoryCount += data[i].product_name + ' | ';
			inventoryCount += data[i].department_name + ' | ';
			inventoryCount += data[i].price + ' | ';
			inventoryCount += + data[i].stock_quantity + '\n';

			console.log(inventoryCount);
		}

	  	console.log("---------------------------------------------------------------------\n");

		// End the database connection
		connection.end();
	})
}

// this function makes sure that the user is providing only positive integers for their input
function validateInteger(value) {
	var integer = Number.isInteger(parseFloat(value));
	var sign = Math.sign(value);

	if (integer && (sign === 1)) {
		return true;
	} else {
		return 'Please enter a positive numeric value';
	}
}

// this function makes sure that the user is providing only positive amount for their input
function validateNumeric(value) {
	// Value must be a positive number
	var number = (typeof parseFloat(value)) === 'number';
	var positive = parseFloat(value) > 0;

	if (number && positive) {
		return true;
	} else {
		return 'Price can only be a positive amount'
	}
}

// this function will allow a manager to add inventory count for a given product
function addInventory() {

	// Prompt the user to select an item
	inquirer.prompt([
		{
			type: 'input',
			name: 'item_id',
			message: 'Please enter the Item ID to update stock quantity',
			validate: validateInteger,
			filter: Number
		},
		{
			type: 'input',
			name: 'quantity',
			message: 'How many would you like to add?',
			validate: validateInteger,
			filter: Number
		}
	]).then(function(input) {
		var item = input.item_id;
		var addQuantity = input.quantity;

		// Query db to confirm that the given item ID exists and to determine the current stock_count
		var queryStr = 'SELECT * FROM products WHERE ?';

		connection.query(queryStr, {item_id: item}, function(err, data) {
			if (err) throw err;
			if (data.length === 0) {
				console.log('Please select a valid Item ID.');
				addInventory();

			} else {
				var productData = data[0];
				console.log('Updating Inventory...');

				//Update query statement stored in a variable
				var updateQueryStr = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity + addQuantity) + ' WHERE item_id = ' + item;

				// Update the inventory
				connection.query(updateQueryStr, function(err, data) {
					if (err) throw err;

					console.log('Stock count for Item ID ' + item + ' has been updated to ' + (productData.stock_quantity + addQuantity) + '.');
					console.log("\n---------------------------------------------------------------------\n");

					// End the database connection
					connection.end();
				})
			}
		})
	})
}

//this will guide the manager to a new product to the inventory
function createNewProduct() {

	// Ask the manager to enter information about the new product
	inquirer.prompt([
		{
			type: 'input',
			name: 'product_name',
			message: 'Please enter the new product name.',
		},
		{
			type: 'input',
			name: 'department_name',
			message: 'Which department does the new product belong to?',
		},
		{
			type: 'input',
			name: 'price',
			message: 'What is the price per unit?',
			validate: validateNumeric
		},
		{
			type: 'input',
			name: 'stock_quantity',
			message: 'How many items are in stock?',
			validate: validateInteger
		}
	]).then(function(input) {
		console.log('Adding new item to inventory: \n    product_name = ' + input.product_name + '\n' +  
									   '    department_name = ' + input.department_name + '\n' +  
									   '    price = ' + input.price + '\n' +  
									   '    stock_quantity = ' + input.stock_quantity);

		// Create the insert statement
		var queryStr = 'INSERT INTO products SET ?';

		// Add the new product to the table
		connection.query(queryStr, input, function (error, results, fields) {
			if (error) throw error;

			console.log('New product has been added to the inventory under Item ID ' + results.insertId + '.');
			console.log("\n---------------------------------------------------------------------\n");

			// End the database connection
			connection.end();
		});
	})
}

function runBamazon() {
// start the program by asking the manager with a list of choices
	manager();
}
//execute the program.
runBamazon();