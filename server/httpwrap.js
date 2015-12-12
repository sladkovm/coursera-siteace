/**
 * Created by sladkovm on 05/12/15.
 */


//On the server
Meteor.methods({
    'remoteGet' : function(url,options){
        return HTTP.get(url,options);
    },
    'remoteSearch' : function(searchQuery){
        var searchResults = Websites.find({$text:{$search:searchQuery}}).fetch();
        console.log('Server call search: ', searchQuery, ' are: ', searchResults[0], 'length: ', searchResults.length)
        var ids = new Array();
        for(i=0; i<searchResults.length;i++){
            ids.push(searchResults[i]._id);
        }
        console.log('Server: ', ids);
        return ids
    }
});

////On the client
//Meteor.call('remoteGet','http://remoteurl.com/',{
//    //...options...
//},function(error,response){
//    //if an error happened, error argument contains the details
//    //if the request succeeded, the response will contain the response of the server request
//})