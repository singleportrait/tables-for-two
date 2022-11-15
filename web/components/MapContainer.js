import { DistanceMatrixService, useJsApiLoader } from '@react-google-maps/api';
import { useCallback, useEffect, useState } from 'react';
import MapWithOverlay from './MapWithOverlay';

const defaultCenter = {
  lat: 40.7101753,
  lng: -73.9925543,
};

const libraries = ['places'];

const maxUserDistance = 24000; // In meters; approx 15 miles

const MapContainer = ({ restaurants }) => {
  const [map, setMap] = useState(null);
  const [userPosition, setUserPosition] = useState(null);
  const [geolocationChecked, setGeolocationChecked] = useState(false);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API,
    libraries,
  });

  const onLoad = useCallback((m) => setMap(m), []);
  const onUnmount = useCallback(() => setMap(null), []);

  const [geolocationError, setGeolocationError] = useState(false);
  useEffect(() => {
    if (!isLoaded) return;
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        // const fakeBrooklyn = { lat: 40.69695850828103, lng: -73.95061728146858 };
        setUserPosition(pos);
        // This would be great for custom markers, but it's still in beta,
        // and not supported by this library yet
        // const markerView = new window.google.maps.marker.AdvancedMarkerView({
        //   map,
        //   position: pos,
        //   content: <h2>Home</h2>,
        // });
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
  }, [isLoaded]);

  const [centerOnUser, setCenterOnUser] = useState(false);
  const onDistanceResponse = (response, status) => {
    if (status !== 'OK') {
      console.log('Error fetching distance', status);
      return;
    }
    const userDistanceFromCenter = response?.rows[0]?.elements[0]?.distance?.value || 0;
    setGeolocationChecked(true);
    setCenterOnUser(userDistanceFromCenter < maxUserDistance);
    // If we decided to show the map first and then pan to the user, here is where we could do that
    if (userDistanceFromCenter > maxUserDistance) {
      console.log('Not centering map on user position');
    }
  };

  return (
    <div>
      Center on user? {centerOnUser && 'YES'}
      <br />
      Geolcoation checked? {geolocationChecked && 'YES'}
      <br /><br />
      {isLoaded && userPosition && !geolocationChecked && (
        <DistanceMatrixService
          options={{
            origins: [userPosition],
            destinations: [defaultCenter],
            travelMode: window.google.maps.TravelMode.DRIVING,
          }}
          callback={onDistanceResponse}
        />
      )}
      {isLoaded && (
        <>
          {!geolocationChecked && (
            <div className="w-full h-96 flex items-center justify-center">
              Loading map...
            </div>
          )}
          {geolocationChecked && (
            <MapWithOverlay
              map={map}
              restaurants={restaurants}
              onLoad={onLoad}
              onUnmount={onUnmount}
              center={(userPosition && centerOnUser) ? userPosition : defaultCenter}
              userPosition={userPosition}
            />
          )}
        </>
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
