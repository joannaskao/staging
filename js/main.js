String.prototype.toTitleCase = function () {
    return this.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
};

$(document).ready(function() {

// trigger hash change when someone clicks on birthday submit
$('#showSubmit').on('click', handleShowSubmit);
$("#showInput").keyup(function(event){
    if(event.keyCode == 13){
        $("#showSubmit").click();
    }
});

// autocomplete 
$( "#showInput" ).autocomplete({
    source: Object.keys(data)
});

// function to change URL hash to show
function handleShowSubmit() {
    var showInput = $('#showInput').val();
    if (showInput != "") {
        if (isValidShow(showInput)) {
            $('#show-format-error').hide();
            window.location.hash = encodeURIComponent(showInput);
        } else {
            $('#show-format-error').show();
        }
    } 
}

// if the show is a key in the dataset, return true
function isValidShow(showName) {
    if (showName in data) {
        return true;
    } 
    return false;
}


// loads data and manipulates timeline after hash change
function handleShowInput(showName) {
    var showEvents = data[showName].events

    $('#timeline-container').show();
    $('#year-container').html('');
    $('#timeline-container').html('');

    $('h3#showName').text(showName.toTitleCase());

    // add years of events above timeline
    var allDates = _.pluck(showEvents, 'date'),
        allYears = _.uniq(_.map(allDates, function(dates) { return dates.split('/')[2]; }));
    
    for (var y in allYears) {
        var eventYear = allYears[y];
        var $eventYearSpan = $("<span class='event-year' id='year-"+eventYear+"'>"+eventYear+"</span>");
        
        $eventYearSpan.on('click', function() {
            var yearClicked = $(this).attr("id").split('-')[1];

            $('html, body').animate({
                scrollTop: $('.timeline-block[data-year="'+yearClicked+'"]:first').offset().top
            }, 500);

        });

        $('#year-container').append($eventYearSpan);
    }

    // add events to timeline
    for (var i=0;i<showEvents.length;i++) {
        var row = showEvents[i];
        var eventYear = row.date.split('/')[2];
        var people_div = "";

        if (row.people_attached) {
            var people_attached = "";
            people_attached = row.people_attached.join(", ");

            if (people_attached != "") {
                people_div += "<div class='people-attached'>"+people_attached+"</div>";
            }
        }

        if (row.people_detached) {
            var people_detached = "";
            people_detached = row.people_detached.join(", ");

            if (people_detached != "") {
                people_div += "<div class='people-detached'>"+people_detached+"</div>";
            }
        }
        
        $('#timeline-container').append('<div class="timeline-block" data-year='+eventYear+'>'+
                                              '<div class="timeline-content">'+
                                                '<p class="date">'+row.date+'</p>'+
                                                '<a href="'+row.article_link+'" target="_blank"><h2>'+row.article_head+'</h2></a>'+
                                                '<p>'+row.article_text+'</p>'+
                                                people_div+
                                              '</div>'+
                                            '</div>');
    }
}



// handle routes/paging
var AppRouter = Backbone.Router.extend({
    routes: {
        ":show": "show"   // matches http://example.com/#name - name returns name
    }
});

var app_router = new AppRouter;
app_router.on("route:show", function(show) {
    show = show.toLowerCase();
    handleShowInput(decodeURIComponent(show));
});

Backbone.history.start()


});