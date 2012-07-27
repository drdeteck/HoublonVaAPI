var quantity = 0;

$(document).ready(initialization);

function initialization() {

    $.mobile.loading('show', {
        text: 'Recherche de la position...',
        textVisible: true,
        html: ""
    });

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            getPlaces,
            errorNoLocation,
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    }
    else {
        errorNoLocation();
    }
}

function getPlaces(position) {
    $.mobile.loading('show', {
        text: 'Chargement des lieux ...',
        textVisible: true,
        html: ""
    });

    $.ajax(
    { type: 'GET',
        url: '/API/Place.svc/GetNearestPlace?lng=' + position.coords.longitude +'&lat=' + position.coords.latitude + '&qt=' + quantity,
        dataType: 'text',
        success: function (data) {
            var places = JSON.parse(data);
            places = JSON.parse(places["GetNearestPlaceResult"]);

            $.each(places, appendPlace);

            $("#places-list").listview("refresh");
            $.mobile.loading('hide');
        },
        error: function (jqXHR, textStatus, errorThrown) {
            $.mobile.loading('hide');
            console.log("error " + textStatus);
            console.log("incoming Text " + jqXHR.responseText);
        }
    });
}

function appendPlace(index, value) {
    var distance = '<span class="ui-li-count">' + value["distance"].toFixed(2) + ' km</span>';
    var image = "<img style='height:16px; width:16px;' class='ui-li-icon' src='" + value["icon"] + "'/>";
    var title = "<h3 class='ui-li-heading'>" + formatName(value["name"]) + "</h3>";
    var description = "<p class='ui-li-desc'>" + value["formatted_address"] + "</p>";

    $("#places-list").append(
        $('<li>').append(
            $("<a>").attr("href", value["url"]).append(title + description + distance + image)
    ));
}

// Remove the parenthesis and put the article in front
function formatName(name) {
    var start = name.indexOf("(");
    var end = name.indexOf(")");

    if (start >= 0 && end > 0 && start < end) {
        var subWord = name.substr(start, end - start + 1);
        var prefix = subWord.substr(1, subWord.length - 2);
        name = prefix + " " + name.replace(subWord, "");
    }

    return name;
}

function errorNoLocation() {

}