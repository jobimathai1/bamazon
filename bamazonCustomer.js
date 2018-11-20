//adding required packages for this app

var mysql = require("mysql");
var inquirer = require("inquirer");
var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "",
  database: "bamazon"
});

// This function makes sure that the user is only entering valid integer as their input
function validateInputId(value) {
  var integer = Number.isInteger(parseFloat(value));
  var sign = Math.sign(value);

  if (integer && sign === 1) {
    return true;
  } else {
    return "Please enter a id value the above list";
  }
}

function validateInputQuantity(value) {
  var integer = Number.isInteger(parseFloat(value));
  var sign = Math.sign(value);

  if (integer && sign === 1) {
    return true;
  } else {
    return "Please enter quantity value in numeric value only";
  }
}

// promptUserPurchase will prompt the user for the item/quantity they would like to purchase
function promptUserPurchase() {

	// Prompt the user to select an item
	inquirer.prompt([
		{
			type: 'input',
			name: 'item_id',
			message: 'Please enter the Item ID which you would like to purchase.',
			validate: validateInputId,
			filter: Number
		},
		{
			type: 'input',
			name: 'quantity',
			message: 'How many would you like to purchase?',
			validate: validateInputQuantity,
			filter: Number
		}
	]).then(function(input) {
		var item = input.item_id;
		var quantity = input.quantity;

		// Query db to confirm that the given item ID exists in the desired quantity
		var queryStr = 'SELECT * FROM products WHERE ?';

		connection.query(queryStr, {item_id: item}, function(err, res) {
			if (err) throw err;

			if (res.length === 0) {
				console.log('ERROR: Invalid Item ID. Please enter a valid Item ID.');
				queryAllProducts();

			} else {
				var productData = res[0];


				// If the quantity requested by the user is in stock then send a message to user
				if (quantity <= productData.stock_quantity) {
					console.log('We have plenty of the product you selected');

					// Update the stock quantity
					var updateQuantity = 'UPDATE products SET stock_quantity = ' + (productData.stock_quantity - quantity) + ' WHERE item_id = ' + item;

					// 
					connection.query(updateQuantity, function(err, data) {
						if (err) throw err;
                        
            //rounding the decimals to 2 places by using toFixed and send a message to user
						console.log('Congratulations! Your order has been placed. Your total is $' + (productData.price * quantity).toFixed(2));
						console.log("\n---------------------------------------------------------------------\n");

						// End the database connection
						connection.end();
					})
				} else {
					//send message to user when the quantity the user wants is greater than what's available in stock
					console.log('Insufficient quantity!');
					console.log('Please decrease the quantity amount for your order or select a different product');
					console.log("\n---------------------------------------------------------------------\n");

					queryAllProducts();
				}
			}
		})
	})
}

//Connecting to local mySQL DB and running the select query to display all products within bamazon store
connection.connect(function(err) {
  if (err) throw err;
	console.log("connected as id " + connection.threadId);
	console.log("----------------------------------------------------");
	console.log("Item Id | Product | Dept | Price | In Stock Quantity");
	console.log("----------------------------------------------------");
});

// A function to query and display all products and their properties within the bamazon store
function queryAllProducts() {
  connection.query("SELECT * FROM products", function(err, res) {
    for (var i = 0; i < res.length; i++) {
			console.log(
        	+ res[i].item_id +
          " | " +
          res[i].product_name +
          " | " +
          res[i].department_name +
          " | " +
          res[i].price +
          " | " +
          res[i].stock_quantity
      );
    }
    console.log("----------------------------------------------------");

    promptUserPurchase();
  });
}

function runBamazon() {

	// start the program by displaying the available inventory
	queryAllProducts();
}

//execute the program.
runBamazon();
