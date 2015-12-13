/**
 * Created by sladkovm on 05/12/15.
 */

// Add routing

Router.configure({
    layoutTemplate: 'ApplicationLayout'
});

// Main page router
Router.route('/', function() {
    console.log('Routing to /home');
    this.render('navbar', {
        to:"navbar"
    });
    this.render('website_list', {
        to:"main"
    });
    this.render('footer', {
        to:"footer"
    });
});

//
Router.route('/search', function (){
    console.log('Routing to /search');
    this.render('navbar', {
        to:"navbar"
    });
    this.render('search_results', {
        to:"main"
        //data:function(){
        //    return Session.get("isSearch")
        //}
    });
    this.render('footer', {
        to:"footer"
    });
});

// Details router
Router.route('/website', function (){
    console.log('Routing to /website');
    this.render('navbar', {
        to:"navbar"
    });
    this.render('website', {
        to:"main",
        data:function(){
            var websiteId = Session.get("website_id");
            return Websites.findOne({_id:websiteId});
        }
    });
    this.render('footer', {
        to:"footer"
    });
});

//Router.onBeforeAction('loading')



