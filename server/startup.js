/**
 * Created by sladkovm on 02/12/15.
 */

// start up function that creates entries in the Websites databases.
Meteor.startup(function () {
    // code to run on server at startup
    if (!Websites.findOne()){
        console.log("No websites yet. Creating starter data.");
        var dateNow = new Date();
        Websites.insert({
            title:"Goldsmiths Computing Department",
            url:"http://www.gold.ac.uk/computing/",
            description:"This is where this course was developed.",
            createdOn:dateNow,
            createdOnNice: moment(dateNow).format('MMMM Do YYYY, h:mm:ss a')
        });
        dateNow = new Date();
        Websites.insert({
            title:"University of London",
            url:"http://www.londoninternational.ac.uk/courses/undergraduate/goldsmiths/bsc-creative-computing-bsc-diploma-work-entry-route",
            description:"University of London International Programme.",
            createdOn:dateNow,
            createdOnNice: moment(dateNow).format('MMMM Do YYYY, h:mm:ss a')
        });
        dateNow = new Date();
        Websites.insert({
            title:"Coursera",
            url:"http://www.coursera.org",
            description:"Universal access to the world’s best education.",
            createdOn:dateNow,
            createdOnNice: moment(dateNow).format('MMMM Do YYYY, h:mm:ss a')
        });
        dateNow = new Date();
        Websites.insert({
            title:"Google",
            url:"http://www.google.com",
            description:"Popular search engine.",
            createdOn:dateNow,
            createdOnNice: moment(dateNow).format('MMMM Do YYYY, h:mm:ss a')
        });
    }

    //webshot('http://google.com', '~/tmp/google.png', function(err){
    //    if (err){
    //        console.log('webshot server: Did not save')
    //    } else {
    //        console.log('webshot server: Saved to google.png')
    //    }
    //})

    //Session.setDefault(sortMethod, "sortByDate")
});
