var Campground = require("../models/campground");
var Comment = require("../models/comment");

var middlewareObj = {};

middlewareObj.checkCampgroundOwnership =
    function(req,res,next){
        if(req.isAuthenticated()){
            Campground.findById(req.params.id,function(err , foundCampground){
                if(err || !foundCampground) {
                    req.flash("error","Campground Not Found");
                    res.redirect("back");
                } else{
                    if(foundCampground.author.id.equals(req.user._id)){
                        req.campground = foundCampground;
                        next();
                    }else {
                        req.flash("error","You don't have permission to do that");
                        res.redirect("back");
                    }
                }
            });
        }else{
            req.flash("error","You Need To Be Logged In To Do That")
            res.redirect("back"); // takes user to previous route
        }
    };

middlewareObj.checkCommentOwnership =
    function(req,res,next){
        if(req.isAuthenticated()){
            Comment.findById(req.params.comment_id,function(err , foundComment){
                if(err || !foundComment) {
                    req.flash("error","Comment not found");
                    res.redirect("back");
                } else{
                    if(foundComment.author.id.equals(req.user._id)){
                        req.comment = foundComment;
                        next();
                    }else {
                        req.flash("error","You don't have permission to do that");
                        res.redirect("back");
                    }
                }
            });
        }else{
            req.flash("error","You need to be logged in to do that");
            res.redirect("back"); // takes user to previous route
        }
    };

middlewareObj.isLoggedIn =
    function(req,res,next){
        if(req.isAuthenticated())
            return next();
        req.flash("error","You Need To Be Logged In To Do That");
        res.redirect("/login");
    };

module.exports = middlewareObj;