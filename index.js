const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.set("view engine", "ejs");

app.use(express.static("public"));
mongoose.set('strictQuery', false);

mongoose.connect("mongodb+srv://akshaysingh1234:mfPBt3vwWJZSnHCy@cluster0.zbqx3fv.mongodb.net/itemsDB", {
    useNewUrlParser: true
});

const itemsSchema = new mongoose.Schema({
    name: String,
});

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
    name: "Welcome to your to do List"
});

const item2 = new Item({
    name: "Hit + button to add the Task"
});

const item3 = new Item({
    name: "-->Click checkbox to delete Task"
});

const arr = [item1, item2, item3];


app.get("/", function (req, res)
 {

    Item.find({}, function (err, foundItems)
    {
        if (foundItems.length === 0) 
        {
            Item.insertMany(arr, function (err) 
            {
                if (err) {
                    console.log(err);
                } else
                {
                    console.log("Data Successfully inserted");
                }
            });

        } else
        {
            res.render("list", 
            {
                tasks: foundItems
            });
        }

    });

});


app.post("/", function (req, res) {
   

    const newItem = new Item({
        name: req.body.task
    });

        newItem.save();
        res.redirect("/");
});

app.post("/delete", function (req, res) {
   

    const id=req.body.element;
    Item.deleteOne({_id: id}, function(err)
    {
        if(err)
        {
            console.log(err);
        }
        else
        {
            console.log("Successfully Deleted")
        }

    });

    res.redirect("/");
           
});


app.listen(3000);