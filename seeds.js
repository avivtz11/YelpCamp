var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name:"Cloud's Rest",
        image:"https://farm4.staticflickr.com/3751/9580653400_e1509d6696.jpg",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        name:"Desert nesa",
        image:"https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    },
    {
        name:"Canyon floor",
        image:"https://farm4.staticflickr.com/3455/3753652218_266bca0b93.jpg",
        description:"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    }
];

function seedDB() {
    //remove all campgrounds
    Campground.deleteMany({},function(err){
        if(err)
            console.log(err);
        else
            console.log("removed campgrounds");
        //add a few campgrounds
        data.forEach(function(seed){
            Campground.create(seed,function(err,campground){
                if(err)
                    console.log(err);
                else{
                    console.log("added a campground");
                    //create a comment
                    Comment.create({text:"this place is great but i wish  there was internet",author:"Homer"},function(err,comment){
                        if(err)
                            console.log(err)
                        else{
                            campground.comments.push(comment);
                            campground.save();
                            console.log("created new comment");
                        }
                    });
                }
            });
        });
    });
}

module.exports = seedDB;
