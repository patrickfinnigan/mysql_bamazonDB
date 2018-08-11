const mysql = require("mysql");

const inquirer = require("inquirer");

//database credentials
var database = mysql.createConnection({
    host: "127.0.0.1",
    user: "root",
    password: "root",
    database: "programming_db"
});

//Connection to database

function intro() {
    database.connect(function (err) {
        if (err) throw err;
        console.log("Connected to Database!");
        let query = "SELECT * FROM bamazondb.market";
        database.query(query, function (err, res) {
            if (err) throw err;
            for (let i = 0; i < res.length; i++) {
                // console.log(res[i])
                console.log(res[i].id + ": Product: " + res[i].product_name + " || Seller: " + res[i].department_name + " || Price: $" + res[i].price + " || Stock: " + res[i].stock_quantity)
            }
        });
    });

    inquirer.prompt({
        name: "action",
        type: "input",
        message: `Welcome to bamazon! What would you like to buy?
Please enter the ID number of the item you wish to buy.`,
    }).then(answer => {
        let query = "SELECT * FROM bamazondb.market";
        // you dont have to specify the exact row or column of the data for this function, since we define the exact data points we need later on down the code. the code above sets up all the data we need from mysql to the node program for us to draw from later. this means that we dont draw data directly from mysql, but rather take all the data into node and draw on specific parts of the data from there
        database.query(query, {
            id: answer.action
        }, function (err, res) {
            if (err) throw err;
            // console.log(res);
            inquirer.prompt({
                name: "quantity",
                type: "input",
                message: console.log("You have chosen to buy " + res[parseInt(answer.action) - 1].product_name + ", which there are " + res[parseInt(answer.action) - 1].stock_quantity + " left. How many would you like to purchase?")
                // since the given id number will come in as a string, you have to convert it to an integer in order for the console.log action to read it and match that number with the proper product. that is why we use parseInt() around the given answer.action response
            }).then(purchase => {
                database.query(query, {
                    id: purchase.action
                }, function (err, res) {
                    if (err) throw err;
                    let wantedStock = parseInt(purchase.quantity);
                    // so the way this let function works is that the inquirer function of "then(purchase)" is the the function we are working on, and quanitity is how the purchase function references the inquirer's quantity property. whenever you want to use the input element of the inquirer prompt, you have to reference the inquirer's bottom function and have that function reference the input of that inquirer function
                    // console.log(wantedStock);
                    let itemStock = res[parseInt(answer.action) - 1].stock_quantity;
                    // console.log(itemStock);
                    const quantityMath = itemStock - wantedStock;
                    // console.log(quantityMath);

                    // in order to catch the stock for this item before purchasing, we have to place an if/else statement AROUND the operation that updates the server. we want to check if the wanted stock does not make the item stock a negative number. to do this, we have the purcahseUpdate function be INSIDE the if/else statement that will check the math. if the purchaseUpdate operation was above the if/else that checks the math, the program will perform the server update, OUSIDE of the math that does the stock check. this way we can stop the purchaseUpdate from putting a negative stock number in the server by redirecting the program path away from it if the math would make a negative number
                    if (quantityMath < 0) {
                        // stop(purchaseUpdate);
                        console.log("Not enough in stock!");
                        process.exit();
                    } else {
                        let purchaseUpdate = "UPDATE bamazonDB.market SET stock_quantity = " + quantityMath + " WHERE id = " + parseInt(answer.action);
                        // console.log(purchaseUpdate);
                        database.query(purchaseUpdate, function (err) {
                            if (err) throw err;
                            console.log("Stock Updated!");
                            process.exit();
                        });

                    }
                })
            })
        })
    });
}

intro();