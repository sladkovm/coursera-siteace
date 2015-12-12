/**
 * Created by sladkovm on 05/12/15.
 */

Template.website_form.events({
    "click .js-toggle-website-form":function(event){
        $("#add-modal").modal('show')
    },
    "click .js-close-modal":function(event){
        console.log('Close modal: click')
        $("add-modal").modal('hide')
    },
    "focus .js-url-input":function(event){
        $('#title').attr("placeholder", "give it a sec, it will update..")
        $('#description').attr("placeholder", "give it a sec, it will update..")
    },
    "blur .js-url-input":function(event){
        console.log('Onblur occured on the url')
        //console.log(event)
        var url = event.currentTarget.value;
        //console.log('Event: RelatedTarget: ', event.relatedTarget, 'RelatedNode', event.relatedNode);
        Meteor.call('remoteGet',url,{/*options*/},function(error,response){
            if (error){
                console.log(error)
            } else {
                var el = document.createElement('html');
                el.innerHTML = response.content;
                //console.log("Title is: ", el.getElementsByTagName('title')[0].textContent);
                var title = el.getElementsByTagName('title')[0].textContent;
                var description = ''

                var meta = el.getElementsByTagName('meta');
                //console.log($("el[name='description']"))
                var i = 0;
                while (meta[i]) {
                    //console.log('Meta:', meta[i])
                    if (meta[i].getAttribute('name') == 'description') {
                        if (meta[i].getAttribute("content")) {
                            //console.log('Name: ', meta[i].getAttribute("name"), 'Content: ', meta[i].getAttribute("content"))
                            description = meta[i].getAttribute("content")
                        }
                    }
                    i = i + 1;
                }

                $('#title').val(title)
                $('#description').val(title)

                Session.set("websiteTitle", title)
                Session.set("websiteDescription", description)

            }
        });
    },
    "focus .js-title-input":function(event){
        console.log('Title got a focus')
        //title = Session.get("websiteTitle")
        //$('#title').attr("placeholder", title)
        //$('#title').val(title)
    },
    "focus .js-description-input":function(event){
        console.log('Description got a focus')
        //description = Session.get("websiteDescription")
        //$('#description').attr("placeholder", description)
        //$('#description').val(description)
    },
    "submit .js-save-website-form":function(event){
        console.log('Clicked submit button')
        var url = event.target.url.value;
        var title = event.target.title.value;
        console.log('Submit: ', title)
        var description = event.target.description.value;

        console.log("The url they entered is: "+url);


        if(Meteor.user()){
            var date = new Date();
            var dateNice = moment(date).format('MMMM Do YYYY, h:mm:ss a');
            Websites.insert({
                title:title,
                url:url,
                description:description,
                createdOn:date,
                createdBy:Meteor.user()._id,
                createdOnNice:dateNice
                //webshot:imgName
            });
        }

        // TODO: Add webshot
        //
        //webshot('http://google.com', '~/tmp/google.png', function(err){
        //    if (err){
        //        console.log('webshot client: Did not save')
        //    } else {
        //        console.log('webshot client: Saved to google.png')
        //    }
        //})

        $("#add-modal").modal('hide')
        return false;// stop the form submit from reloading the page
    }
});