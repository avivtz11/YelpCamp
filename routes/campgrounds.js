var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");
var middleware = require("../middleware");

//INDEX - show all campgrounds
router.get("/",function(req,res){

    Campground.find({},function(err,allCampgrounds){
        if(err)
            console.log("error");
        else
            res.render("campgrounds/index",{campgrounds:allCampgrounds, currentUser:req.user});
    });
});
//CREATE - add new campground to DB
router.post("/",middleware.isLoggedIn,function(req,res){
    var author = {
        id:req.user._id,
        username:req.user.username
    };
    var newCampground = {name:req.body.name, price: req.body.price, image:req.body.image, description:req.body.description , author:author};
    Campground.create(newCampground,function(err,newlyCreated){
        if(err)
            console.log(err);
        else
            res.redirect("/campgrounds");
    });
});
//NEW - show form to create new campground
router.get("/new",middleware.isLoggedIn,function(req,res){
    res.render("campgrounds/new");
});
//SHOW - shows more info about one campground
router.get("/:id",function(req,res){
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err || !foundCampground){
            req.flash("error","Campground not found");
            res.redirect("back");
        }
        else{
            console.log(foundCampground);
            res.render("campgrounds/show",{campground:foundCampground});
        }
    });
});

//EDIT route
router.get("/:id/edit",middleware.checkCampgroundOwnership, function(req,res){
    res.render("campgrounds/edit",{campground: req.campground});
});

//UPDATE route
router.put("/:id",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,updatedCampground){
        if(err)
            res.redirect("/campgrounds");
        else{
            res.redirect("/campgrounds/"+req.params.id);
        }
    });
});
//DESTROY route
router.delete("/:id",middleware.checkCampgroundOwnership,function(req,res){
    Campground.findByIdAndRemove(req.params.id,function(err){
        if(err)
            res.redirect("/campgrounds");
        else
            res.redirect("/campgrounds");
    });
});




module.exports = router;
