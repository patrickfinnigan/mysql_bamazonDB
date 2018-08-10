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
                        const quantityMath = res[parseInt(answer.action) - 1].stock_quantity - parseInt(answer.purchase);
                        console.log(quantityMath);
                    }
                    // let purchaseUpdate = "UPDATE bamazondb.market SET stock_quantity = stock_quantity WHERE address = " + 
                )
                process.exit()
            })
        })
    });
}

intro();