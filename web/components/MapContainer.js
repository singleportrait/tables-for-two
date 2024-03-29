import { DistanceMatrixService, useJsApiLoader } from '@react-google-maps/api';
import { useCallback, useEffect, useState } from 'react';
import MapWithOverlay from './MapWithOverlay';

const defaultCenter = {
  lat: 40.7361753,
  lng: -73.9865543,
};

const libraries = ['places'];

const maxUserDistance = 24000; // In meters; approx 15 miles

const MapContainer = ({ data }) => {
  const { name } = data;
  const [map, setMap] = useState(null);
  const [userPosition, setUserPosition] = useState(null);
  const [geolocationChecked, setGeolocationChecked] = useState(false);

  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const onLoad = useCallback((m) => setMap(m), []);
  const onUnmount = useCallback(() => setMap(null), []);

  const [geolocationError, setGeolocationError] = useState(false);
  useEffect(() => {
    if (!isLoaded || geolocationChecked) return;
    if (navigator.geolocation && navigator.geolocation.getCurrentPosition) {
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        // const fakeBrooklyn = { lat: 40.69695850828103, lng: -73.95061728146858 };
        setUserPosition(pos);
      }, (error) => {
        console.log('Error getting position', error);
        if (error.code === error.PERMISSION_DENIED) {
          setGeolocationError(true);
        }
        setGeolocationChecked(true);
      }, {
        timeout: 5000,
      });
      setTimeout(() => {
        if (!geolocationChecked) {
          setGeolocationChecked(true);
        }
      }, 5000);
    } else {
      console.log('It was not allowed');
      setGeolocationError(true);
      setGeolocationChecked(true);
    }
  }, [isLoaded, geolocationChecked]);

  const [centerOnUser, setCenterOnUser] = useState(false);
  const onDistanceResponse = (response, status) => {
    if (status !== 'OK') {
      console.log('Error fetching distance', status);
      return;
    }
    const firstElement = response?.rows[0]?.elements[0];
    const userDistanceFromCenter = firstElement?.distance?.value || 0;
    const hasZeroResults = firstElement?.status === 'ZERO_RESULTS';
    setGeolocationChecked(true);
    setCenterOnUser(userDistanceFromCenter < maxUserDistance && !hasZeroResults);
    // If we decided to show the map first and then pan to the user, here is where we could do that
    if (userDistanceFromCenter > maxUserDistance) {
      console.log('Not centering map on user position');
    }
  };

  return (
    <div>
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
            <div className="w-full h-screen flex flex-col space-y-4 items-center justify-center bg-secondary">
              <h1 className="text-5xl text-primary antialiased">
                {name || 'Tables for Two'}
              </h1>
              <div className="font-mono text-xl text-primary">
                Loading...
              </div>
            </div>
          )}
          {geolocationChecked && (
            <MapWithOverlay
              map={map}
              data={data}
              onLoad={onLoad}
              onUnmount={onUnmount}
              center={(userPosition && centerOnUser) ? userPosition : defaultCenter}
              userPosition={userPosition}
              geolocationError={geolocationError}
            />
          )}
        </>
      )}
      {loadError && (
        <div className="w-full h-screen flex flex-col space-y-4 items-center justify-center bg-secondary">
          <div className="font-mono text-xl text-primary antialiased">
            Sorry, we&apos;re having trouble loading the map.
          </div>
        </div>
      )}
    </div>
  );
};

export default MapContainer;
