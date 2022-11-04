import { DistanceMatrixService, useJsApiLoader } from '@react-google-maps/api';
import { useCallback, useEffect, useState } from 'react';
import MapWithOverlay from './MapWithOverlay';

const defaultCenter = {
  lat: 40.7101753,
  lng: -73.9925543,
};

const MapContainer = () => {
  const [map, setMap] = useState(null);
  const [userPosition, setUserPosition] = useState(null);
  const [geolocationChecked, setGeolocationChecked] = useState(false);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API,
  });

  const onLoad = useCallback((m) => {
    setMap(m);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const [geolocationError, setGeolocationError] = useState(false);
  useEffect(() => {
    if (navigator.geolocation) {
      console.log('navigator geolocation', navigator.geolocation);
      navigator.geolocation.getCurrentPosition((position) => {
        console.log('Getting position');
        setGeolocationChecked(true);
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        console.log('Position from user', pos);
        if (map) {
          console.log('We have a map, let us center it');
          map.panTo(pos);
          setUserPosition(pos);
          // This would be great for custom markers, but it's still in beta,
          // and not supported by this library yet
          // const markerView = new window.google.maps.marker.AdvancedMarkerView({
          //   map,
          //   position: pos,
          //   content: <h2>Home</h2>,
          // });
        }
      }, (error) => {
        console.log('Error getting position', error);
        setGeolocationError(true);
        setGeolocationChecked(true);
      });
    } else {
      console.log('It was not allowed');
      setGeolocationError(true);
      setGeolocationChecked(true);
    }
  }, [map]);

  const onDistanceResponse = (response, status) => {
    console.log('Response from distance matrix', response);
    console.log('Status', status);
  };

  return (
    <div>
      {geolocationChecked && userPosition && (
        <DistanceMatrixService
          options={{
            origins: [userPosition],
            destinations: [defaultCenter],
            travelMode: window.google.maps.TravelMode.DRIVING,
            unitSystem: window.google.maps.UnitSystem.IMPERIAL,
          }}
          callback={onDistanceResponse}
        />
      )}
      {isLoaded && (
        <MapWithOverlay
          map={map}
          onLoad={onLoad}
          onUnmount={onUnmount}
          defaultCenter={defaultCenter}
          userPosition={userPosition}
        />
      )}
      {loadError && (
        <div>
          We have a load error
        </div>
      )}
      {geolocationError && (
        <div>
          Your browser does not allow geolocation centering, sorry.
        </div>
      )}
    </div>
  );
};

export default MapContainer;
