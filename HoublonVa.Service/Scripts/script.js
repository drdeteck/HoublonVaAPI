// iO namespace root
window.HV = window.HV || {};

// ====================
// GeoPlace module
// ====================
(function (Utilities, $, undefined) {

    // Public Method

} (HV.Utilities = HV.Utilities || {}, $));

// ====================
// GeoPlace module
// ====================
(function (UI, $, undefined) {
    
    UI.initialization = function () {
        
        $('#checkbox-1').click(function () {
            HV.Filter.toggle("hv-filter-micro");
        });
        $('#checkbox-2').click(function () {
            HV.Filter.toggle("hv-filter-seller");
        });
        $('#checkbox-3').click(function () {
            HV.Filter.toggle("hv-filter-pub");
        });
    }

    // Public Method
    UI.Loading = function (doShow, message) {
        if (doShow) {
            $.mobile.loading('show', {
                text: message,
                textVisible: true,
                html: ""
            });
        }
        else {
             $.mobile.loading('hide');
        }
    };

    UI.ShowNavBar = function () {
        $('#hv-navbar').show();
    }
    

} (HV.UI = HV.UI || {}, $));


// ====================
// GeoPlace module
// ====================
(function (GeoPlace, $, undefined) {
    // Private properties

    // Public properties
    GeoPlace.quantity = 0;

    // Public Methods

    GeoPlace.initialization = function () {

        HV.UI.Loading(true, 'Recherche de la position...');

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
        
        HV.UI.initialization();
    };

    // Private Methods

    function getPlaces(position) {

        HV.UI.Loading(true, 'Chargement des lieux ...');

        $.ajax(
        { type: 'GET',
            url: '/API/Place.svc/GetNearestPlace?lng=' + position.coords.longitude +'&lat=' + position.coords.latitude + '&qt=' + HV.GeoPlace.quantity,
            dataType: 'text',
            success: function (data) {
                var places = JSON.parse(data);
                places = JSON.parse(places["GetNearestPlaceResult"]);

                // Append each Place to the Places List
                $.each(places, appendPlace);

                // Refresh the list and hide the loading
                $("#hv-places-list").listview("refresh");
                HV.UI.Loading(false);
                HV.UI.ShowNavBar();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $.mobile.loading('hide');
                console.log("error " + textStatus);
                console.log("incoming Text " + jqXHR.responseText);
            }
        });
    }

    // Method to Append each place to the Places List
    function appendPlace(index, value) {

        // Prepare each section
        var colorClass = "hv-filter-micro";
        if (value["category"] == 3) {
            colorClass = "hv-filter-seller";
        }

        var distance = '<span class="ui-li-count">' + value["distance"].toFixed(2) + ' km</span>';
        var image = "<img style='height:16px; width:16px;' class='ui-li-icon' alt='micro' src='" + value["icon"] + "'/>";
        var title = "<h3 class='ui-li-heading " + colorClass + "'>" + formatName(value["name"]) + "</h3>";
        var description = "<p class='ui-li-desc'>" + value["formatted_address"] + "</p>";

        // Append the List item 
        $("#hv-places-list").append(
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

    // Error callback if there is no navigation geo location
    function errorNoLocation() {

    }

} (HV.GeoPlace = HV.GeoPlace || {}, $));

// ====================
// Filter module
// ====================
(function (Filter, $, undefined) {
    
    HV.Filter.toggle = function (categoryCssClass) {
        $("#hv-places-list").find("li h3." + categoryCssClass).parents("li").toggleClass("ui-screen-hidden");
    }

} (HV.Filter = HV.Filter || {}, $));