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
  password: "CARmex0711",
  database: "bamazon"
});


//Connecting to local mySQL DB and running the select query to display all products within bamazon store
connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    queryAllProducts();
  });
  
  // A function to query and display all products and their properties within the bamazon store
  function queryAllProducts() {
    connection.query("SELECT * FROM products", function(err, res) {
      for (var i = 0; i < res.length; i++) {
        console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
      }
      console.log("-----------------------------------");
    });
  }