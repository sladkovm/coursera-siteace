/**
* Created by sladkovm on 02/12/15.
*/


// helper function that returns all available websites
Template.website_list.helpers({
    websites:function(){
        //console.log("Website list template");
        //console.log("Normal output");
        return Websites.find({}, {sort:{rating:-1}});
    }
});


Template.search_results.helpers({
    searched_websites:function(){
        //console.log("Template: search_results");
        var ids = Session.get("ids");
        console.log('Template search results: ', ids);
        console.log('Template search results: ', Websites.find({_id:{$in:ids}}, {sort:{rating:-1}}).fetch());
        return Websites.find({_id:{$in:ids}}, {sort:{rating:-1}});
    },
    search_query:function(){
        return Session.get("isSearch");
    }
});


Template.navbar.events({
    "submit .js-search": function (event) {
        event.preventDefault();
        var searchQuery = event.target.query.value;
        Meteor.call("remoteSearch", searchQuery, function(error, response){
            if(error){
                console.log("Error client remoteSearch:", error)
            } else {
                //Session.set("isSearch", searchQuery);
                Session.set("ids", response);
                //console.log('Client submit reponse: : ', response);
                //console.log('Client submit clicking on a #js-search-route')
                $('#js-search-route').click(); // Trigger the actual routing
                return false; // prevent page from reloading?
            }
        });

        // Clear form
        //console.log("Search form: ", event.target)
        event.target.query.value = "";
    },

    "click .js-logo, .js-home": function(){
        Session.set("isSearch", undefined);
        return false;
    }
});



Template.website_item.events({
    "click .js-upvote":function(){
        if (Meteor.user()){
            upvote(this);
            getRating(this);
            return false;// prevent the button from reloading the page
        }
    },
    "click .js-downvote":function(){
        if(Meteor.user()){
            downvote(this);
            getRating(this);
            return false;// prevent the button from reloading the page
        }
        },
    "click .js-website-details":function(){
        // store the website _id in the Session object so it can be used by template
        // console.log('Event "click .js-website-details', this)
        Session.set("website_id", this._id)
    }
    //"click .js-sort-by-date":function(event){
    //    Session.set(sortMethod, "sortByDate")
    //},
    //"click .js-sort-by-rating":function(event){
    //    Session.set(sortMethod, "sortByRating")
    //}
});

// Functions:

function upvote(selector) {
    var website_id = selector._id;
    //console.log("Up voting website with id " + website_id);

    // Store the countUp of the clicked website
    var countUp = Websites.findOne({_id: website_id}).countUp;
    //console.log('Stored countUp = ', countUp);
    if (countUp) { // countUp already exist
        countUp = countUp + 1;
    } else { // countUp does not exist yet
        countUp = 1;
    }
    //console.log('Updated countUp = ', countUp)
    Websites.update({_id: website_id},
        {$set: {countUp: countUp}});
}

function downvote(selector) {
    var website_id = selector._id;
    //console.log("Down voting website with id " + website_id);

    // Store the countUp of the clicked website
    var countDown = Websites.findOne({_id: website_id}).countDown;
    //console.log('Stored countDown = ', countDown);
    if (countDown) { // countDown already exist
        countDown = countDown - 1;
    } else { // countDown does not exist yet
        countDown = -1;
    }
    //console.log('Updated countDown = ', countDown)
    Websites.update({_id: website_id},
        {$set: {countDown: countDown}});
}

function getRating(selector) {
    var website_id = selector._id;
    var countDown = Websites.findOne({_id: website_id}).countDown;
    var countUp   = Websites.findOne({_id: website_id}).countUp;

    countDown = (countDown) ? countDown:0;
    countUp   = (countUp)   ? countUp:0;

    var rating = countUp + countDown; //countDown is negative
    console.log('Rating is: ', rating);
    Websites.update({_id: website_id},
        {$set: {rating: rating}});
}

