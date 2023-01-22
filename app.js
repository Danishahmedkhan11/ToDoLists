const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const app = express();
app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

mongoose.set("strictQuery", false);


//checking connection to database or not 
mongoose.connect("mongodb+srv://Danish:root@cluster0.1bmpq.mongodb.net/ToList", (err) => {
  if (err){
    console.log(err);
  }
  else console.log("Successfully connected DB");
});


// creating schema for data
const listSchema = mongoose.Schema({
  list: String,
});
const listModel = mongoose.model("Lists", listSchema);


//Displaying the list of items and the items are coming from collection in database
app.get("/", function (req, res) {
  var date = new Date();
  var options = {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  };
  var dates = date.toLocaleDateString("en-US", options);

  listModel.find((err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.render("list", {
        items: data,
        todayDate: dates,
      });
    }
  });
});



//creating items and saved them to collection in database
app.post("/", function (req, res) {
  var item = req.body.item;

  const list = new listModel({
    list: item,
  });

  list
    .save()
    .then(console.log("Successfully saved"))
    .catch((err) => {
      console.log("Not saved"+err);
    });

  res.redirect("/");
});



app.post('/delete', function(req, res) {
    console.log(req.body.checkbox);
    listModel.findByIdAndDelete({'_id':req.body.checkbox}, function(err){
        if(err) console.log(err);
        else console.log('Delete successfully');
    });
    res.redirect('/');

})

//Executing localhost
app.listen(process.env.PROT || 8080, function () {
  console.log("Listen on the port 8080");
});
