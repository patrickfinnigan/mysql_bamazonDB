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
    }).then( function (answer) {
        let query = "SELECT * from bamazondb.market WHERE id = " + answer.action ;
        database.query(query, { product: answer.action }, function (err, res) {
            if (err) throw err;
            console.log(res[action].product_name).parseInt();
        })
    });
}

intro();