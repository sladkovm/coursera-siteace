/**
 * Created by sladkovm on 02/12/15.
 */

Websites = new Mongo.Collection("websites");

Websites.allow({
    update:function(userId, doc){
        if(Meteor.user()){
            return true
        } else {
            return false;
        }
    },

    insert: function (userId, doc) {
        if(Meteor.user()){
            if (userId != doc.createdBy){
                return false;
            } else {
                return true;
            }
        } else {
            return false;
        }
    },

    remove:function(userId, doc){
        return true;
    }
})

if(Meteor.isServer){
    Websites._ensureIndex({
        "title":"text",
        "descriptio":"text"
    });
}