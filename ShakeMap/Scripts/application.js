var map;
var LatLng;
var markersArray = [];

function initializeApp() {
    //map initialize
    var mapOptions = {
        zoom: 5,
        center: new google.maps.LatLng(35, 35),
        mapTypeId: google.maps.MapTypeId.TERRAIN
    };
    map = new google.maps.Map(document.getElementById('map_canvas'),
          mapOptions);
}

function getQuakePeriodLink(switchParameter) {
    if (typeof switchParameter !== 'number') {
        console.warn("hata");
        return null;
    }

    var linksObject = new Object();
    /*
     * All links comes from here : http://earthquake.usgs.gov/earthquakes/feed/
     *
     *
     * Past Hour - updates every min
     */
    linksObject.HourM1 = 'http://earthquake.usgs.gov/earthquakes/feed/v0.1/summary/1.0_hour.geojsonp?callback=?';
    linksObject.HourAll = 'http://earthquake.usgs.gov/earthquakes/feed/v0.1/summary/all_hour.geojsonp?callback=?';

    /*
     * Past Day - updates every min
     */
    linksObject.DaySignificant = 'http://earthquake.usgs.gov/earthquakes/feed/v0.1/summary/significant_day.geojsonp?callback=?';
    linksObject.DayM2Dot5 = 'http://earthquake.usgs.gov/earthquakes/feed/v0.1/summary/2.5_day.geojsonp?callback=?';
    linksObject.DayM1 = 'http://earthquake.usgs.gov/earthquakes/feed/v0.1/summary/1.0_day.geojsonp?callback=?';
    linksObject.DayAll = 'http://earthquake.usgs.gov/earthquakes/feed/v0.1/summary/all_day.geojsonp?callback=?';

    /*
     * Past 7 days - updates every min
     */
    linksObject.WeekSignificant = 'http://earthquake.usgs.gov/earthquakes/feed/v0.1/summary/significant_week.geojsonp?callback=?';
    linksObject.WeekM4Dot5 = 'http://earthquake.usgs.gov/earthquakes/feed/v0.1/summary/4.5_week.geojsonp?callback=?';
    linksObject.WeekM2Dot5 = 'http://earthquake.usgs.gov/earthquakes/feed/v0.1/summary/2.5_week.geojsonp?callback=?';
    linksObject.WeekM1 = 'http://earthquake.usgs.gov/earthquakes/feed/v0.1/summary/1.0_week.geojsonp?callback=?';

    /*
     * Past 30 days - updates every 15 min
     */
    linksObject.MonthSignificant = 'http://earthquake.usgs.gov/earthquakes/feed/v0.1/summary/significant_month.geojsonp?callback=?';
    linksObject.MonthM4Dot5 = 'http://earthquake.usgs.gov/earthquakes/feed/v0.1/summary/4.5_month.geojsonp?callback=?';
    linksObject.MonthM2Dot5 = 'http://earthquake.usgs.gov/earthquakes/feed/v0.1/summary/2.5_month.geojsonp?callback=?';

    /* END OF LINKS */

    switch (switchParameter) {
        case 0:
            return linksObject.HourM1;
        case 1:
            return linksObject.HourAll;
        case 2:
            return linksObject.DaySignificant;
        case 3:
            return linksObject.DayM2Dot5;
        case 4:
            return linksObject.DayM1;
        case 5:
            return linksObject.DayAll;
        case 6:
            return linksObject.WeekSignificant;
        case 7:
            return linksObject.WeekM4Dot5;
        case 8:
            return linksObject.WeekM2Dot5;
        case 9:
            return linksObject.WeekM1;
        case 10:
            return linksObject.MonthSignificant;
        case 11:
            return linksObject.MonthM4Dot5;
        case 12:
            return linksObject.MonthM2Dot5;
        default:
            return linksObject.HourAll;
    }
}

function initialize() {
    initializeApp();

    // Create a <script> tag and set the USGS URL as the source.
    var script = document.createElement('script');

    // choose one for source
    //script.src = linksObject.WeekSignificant;
    script.src = getQuakePeriodLink(1);

    document.getElementsByTagName('head')[0].appendChild(script);

    /* BINDINGS */
    $("#cmbTimePeriod").change(
        function () {
            //int
            var val = parseInt($("#cmbTimePeriod").val());
            $.getJSON(getQuakePeriodLink(val), function (d) { console.log(d) });
        });
}

// Loop through the results array and place a marker for each
// set of coordinates.
window.eqfeed_callback = function (results) {
    console.log(results);
    var list = $("#shakeList");

    //clean the list
    list.html("");

    // deleteOverlays
    if (markersArray) {
        for (i in markersArray) {
            markersArray[i].setMap(null);
        }
        markersArray.length = 0;
    }

    // cut the 20 result
    /**/
    for (var i = 0; i < results.features.length; i++) {
        var earthquake = results.features[i];
        var coords = results.features[i].geometry.coordinates;
        var prop = results.features[i].properties;
        LatLng = new google.maps.LatLng(coords[1], coords[0]);

        var marker = new google.maps.Marker({
            position: LatLng,
            map: map,
            icon: getCircle(earthquake.properties.mag)
        });
        markersArray.push(marker);

        var infowindow = new google.maps.InfoWindow({
            content: i.toString()
        });

        google.maps.event.addListener(marker, 'click', function () {
            //infowindow.open(marker.get('map'), marker);
            console.log(i);
        });

        var msgMag = "<strong>" + prop.mag + "</strong> " + prop.magnitudeType;
        var msgDeep = coords[2] + " km deep";
        // add earthquake to the list
        var msgListItem = "<li style='color:" + prop.alert + "'>" + "<span style='color:black'>" + msgMag + " | " + prop.place + "</span></li>";
        list.append(msgListItem);
    }


    //changes list's title
    $("#shakeTitle").html(results.metadata.subTitle);

    //centers the last location
    map.setCenter(LatLng);
}

//helper method for gmaps
function getCircle(magnitude) {
    var scale = Math.pow(2, magnitude) / Math.PI;
    if (magnitude < 2) {
        scale = Math.pow(4, magnitude);
    }
    return {
        path: google.maps.SymbolPath.CIRCLE,
        fillColor: 'red',
        fillOpacity: .2,
        scale: scale,
        strokeColor: 'white',
        strokeWeight: .5
    };
}
/*end of gmaps*/


