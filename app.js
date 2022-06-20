require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const app = express();

let items = ["Buy Food", "Cook Food", "Eat Food"];
let workItems = [];

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res) {

  var today = new Date();
  /*var currentDay = today.getDay();
  var day = "";

  switch (currentDay) {
    case 0:
      day = "Sunday";
      break;
    case 1:
      day = "Monday";
      break;
    case 2:
      day = "Tuesday";
      break;
    case 3:
      day = "Wednesday";
      break;
    case 4:
      day = "Thursday";
      break;
    case 5:
      day = "Friday";
      break;
    case 6:
      day = "Saturday";
      break;
    default:
    console.log("Error: current day is equal to: " + currentDay);
  }*/

    var options = {
      weekday: "long",
      day: "numeric",
      month: "long"
    };

    var day = today.toLocaleDateString("en-US", options);

    res.render("list", {listTitle: day, newItemList: items});
});

app.post("/", function(req, res) {

  let item = req.body.newItem;
  console.log(req.body.list);

  if (req.body.list === "Work") {
    workItems.push(item);
    res.redirect("/work");
  }

  else {
    items.push(item);
    res.redirect("/");
  }
});

app.get("/work", function(req, res) {
  res.render("list", {listTitle: "Work list", newItemList: workItems})
});

app.get("/about", function(req, res) {
  res.render("about");
});

/*app.post("/work", function(req, res) {
  workItems.push(req.body.newItem);
  res.redirect("/work");
});*/

app.listen(process.env.PORT || 3000, function() {
  console.log("Server is running on port 3000");
});
