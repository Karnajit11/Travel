let platform = new H.service.Platform({
    'apikey': 'TKwtOqzrsvK4lamLZbsRTROZD6DLhMEwVuCE1coDr7s'
  });

// Obtain the default map types from the platform object:


function landmarkGeocode() {
    let title = document.querySelector('h1').textContent;

    var geocoder = platform.getGeocodingService(),
      landmarkGeocodingParameters = {
        searchtext: title, 
        jsonattributes : 1
      };
  
    geocoder.search(
      landmarkGeocodingParameters,
      showMap,
      (e) => console.log(e)
      
    );
  }

  function showMap(result){
      let location = result.response.view[0].result[0].location.displayPosition;
    let defaultLayers = platform.createDefaultLayers();
    let map = new H.Map(
        document.querySelector('.map'),
        defaultLayers.vector.normal.map,
        {
          zoom: 12,
          center: { lat: location.latitude, lng: location.longitude }
        });

        let marker = new H.map.Marker({ lat: location.latitude, lng: location.longitude});
        map.addObject(marker);
    
        let ui = H.ui.UI.createDefault(map, defaultLayers);
  }

landmarkGeocode();