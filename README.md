# bamazon
An amazon like CLI app which allows users to place orders.

**************************************************************************************
******************************* Customer Purchase Flow *******************************
**************************************************************************************
To run the customer app, start by running command node bamazonCustomer.js

Once the app is running, the app will display all the products available for purchase. To purchase a product, the user can provide an item id to purchase a specific product.

<img src="https://www.evernote.com/l/AAoWdd4QOqVJHrpm_sEMN4cMOYTo6U7g_NUB/image.png" alt="bamazon%20%E2%80%94%20node%20bamazonCustomer.js%20%E2%80%94%20204%C3%9758" />

After the user submits a item id, the user is then presented with a question asking for the quantity the user would like to purchase. If the user enters a quantity greater than whats available in stock, then the user is presented with an error message. Else the user is able to place the order. The cost of the order is also displayed to the user.

<img src="https://www.evernote.com/l/AAo5laFFIgNCHJFItag_0ex-3wueLWXOKh4B/image.png" alt="bamazon%20%E2%80%94%20node%20bamazonCustomer.js%20%E2%80%94%20204%C3%9758" />

<img src="https://www.evernote.com/l/AAr86kwiKGZAcpJ4hVf04-cfR3S-AMOubrsB/image.png" alt="bamazon%20%E2%80%94%20-bash%20%E2%80%94%20204%C3%9758" />

**************************************************************************************
*********************************** Manager View *************************************
**************************************************************************************

To run the manager app, start by running command node bamazonManager.js

Once the app is running, the app will display 4 options the manager and the manager can select one option. 

1. View Products for Sale option, gives the manager the up to date listing of all products and stock quantity availibility.

<img src="https://www.evernote.com/l/AAqNO0QN69ZKt7savNE2zBvnPnpKJuxIkHAB/image.png" alt="bamazon%20%E2%80%94%20node%20bamazonManager.js%20%E2%80%94%20204%C3%9758" />

2. View Low Inventory option, gives the manager the a list of all products that have a quantity of less than 500.

<img src="https://www.evernote.com/l/AAruCP7g9XVFKpViYtSR84zAhvjpEI_ZGfcB/image.png" alt="bamazon%20%E2%80%94%20-bash%20%E2%80%94%20204%C3%9758" />

3. Add to Inventory option, gives the manager ability to increase quantity of an existing product. If an invalid item id is provided then the user is given an error message to enter a valid item id.

<img src="https://www.evernote.com/l/AAo66QDTuH5NyIA4v1zJHK9O6K41VqVKEd0B/image.png" alt="bamazon%20%E2%80%94%20-bash%20%E2%80%94%20204%C3%9758" />

4. Add item to Inventory option, gives the manager ability to add a new product to the catalog. The manager will be prompted to add the product name, department the product belongs to, price per unit and total quantity available.

<img src="https://www.evernote.com/l/AApvn6xk7gBCzb8lR6dgNUu6XFbvm3O69igB/image.png" alt="bamazon%20%E2%80%94%20-bash%20%E2%80%94%20204%C3%9758" />

This app runs on node.js. The npm packages used are mysql & inquirer. Please run the bamazon_seed.sql file to create the database & tables prior to running the javascript files.