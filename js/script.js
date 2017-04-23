
function buildLeafletMap() {

    var map = L.map('map');
    var hash = new L.Hash(map);

    var HERE_satelliteDay = L.tileLayer('http://{s}.{base}.maps.cit.api.here.com/maptile/2.1/maptile/{mapID}/satellite.day/{z}/{x}/{y}/256/png8?app_id={app_id}&app_code={app_code}', {
        attribution: 'Map &copy; 1987-2014 <a href="http://developer.here.com" target="_blank">HERE</a>',
        subdomains: '1234',
        mapID: 'newest',
        app_id: '0pJkGAtXILXbrXNdW6Dm',
        app_code: 'LenN6iBjo2q1FHUo5bxccw',
        base: 'aerial',

        minZoom: 0,
        maxZoom: 20,

    }).addTo(map);

    map.createPane('cambridgeport');
    map.getPane('cambridgeport').style.zIndex = 650;

    var cambridgeport = new  L.tileLayer(
            'http://mapping-vt-tiles.s3.amazonaws.com/cambridgeport-1869/{z}/{x}/{y}.png', {
            maxZoom: 20,
            opacity: 0.7,
            pane: 'cambridgeport'
            }).addTo(map)

    map.createPane('vcgi');
    map.getPane('vcgi').style.zIndex = 450;

    var rasterFuncProperties = {
  "rasterFunction" : "Stretch",
  "rasterFunctionArguments" : {
    "StretchType" : 5,
    "DRA": true},
  "variableName" : "Raster",
  "outputPixelType":"float"
}

    var vcgi_lidar = L.esri.imageMapLayer({
      //url: 'http://maps.vcgi.vermont.gov/arcgis/rest/services/EGC_services/IMG_VCGI_LIDARDEM_SP_NOCACHE_v1/ImageServer',
      url: 'http://maps.vcgi.vermont.gov/arcgis/rest/services/EGC_services/IMG_VCGI_LIDARHILLSHD_WM_CACHE_v1/ImageServer',
      attribution: 'VCGI',
      pane: 'vcgi',
      opacity: 0.7
    }).addTo(map)

    //vcgi_lidar.setRenderingRule(rasterFuncProperties)
 
    map.setView({ lat: 43.151379588550036, lng: -72.55956888198853 }, 16);

    $(function() {
        $("#slider").slider({
            range: "max",
            min: 0,
            max: 10,
            value: 7,

            slide: function(event, ui) {
                cambridgeport.setOpacity(ui.value * 0.1);
            }
        });
    });



    $(function() {
        $("#slider2").slider({
            range: "max",
            min: 0,
            max: 10,
            value: 7,

            slide: function(event, ui) {
                vcgi_lidar.setOpacity(ui.value * 0.1);
            }
        });
    });


};


$(document).ready(function() {
    buildLeafletMap();
});

// Toggle for 'About this map' and X buttons
// Only visible on mobile
isVisibleDescription = false;

// Grab header, then content of sidebar
sidebarHeader = $('.sidebar_header').html();
sidebarContent = $('.sidebar_content').html();

// Then grab credit information
creditsContent = $('.leaflet-control-attribution').html();

$('.toggle_description').click(function() {
    if (isVisibleDescription === false) {
        $('.description_box_cover').show();

        // Add Sidebar header into our description box
        // And 'Scroll to read more...' text on wide mobile screen
        $('.description_box_header').html(sidebarHeader + '<div id="scroll_more"><strong>Scroll to read more...</strong></div>');

        // Add the rest of our sidebar content, credit information
        $('.description_box_text').html(sidebarContent + '<br />');
        $('#caption_box').html('Credits: ' + creditsContent);
        $('.description_box').show();

        isVisibleDescription = true;

    } else {

        $('.description_box').hide();
        $('.description_box_cover').hide();

        isVisibleDescription = false;

    }

});
