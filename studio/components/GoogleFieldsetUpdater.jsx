/* eslint-disable camelcase */
/* eslint-disable no-console */
import React, {useState, useCallback, useEffect} from 'react';
import {useFormValue} from 'sanity';
import {useDocumentOperation} from 'sanity';
import {Stack, Text, Button} from '@sanity/ui';

import {useJsApiLoader, GoogleMap, Autocomplete, Marker} from '@react-google-maps/api';

const defaultCenter = {
  lat: 40.7101753,
  lng: -73.9925543,
};

const defaultZoom = 11;

const libraries = ['places'];

const options = {
  clickableIcons: false,
  streetViewControl: false,
  fullscreenControl: false,
  minZoom: defaultZoom,
};

const GoogleFieldsetUpdater = () => {
  const documentId = useFormValue(['_id']);
  const documentType = useFormValue(['_type']);
  const googleData = useFormValue(['googleData']);
  const name = useFormValue(['name']);
  const article = useFormValue(['article']);

  // console.log('Document Id', documentId.replace('drafts.', ''));
  // console.log('Document type', documentType);

  if (!documentId) {
    return null;
  }

  const {patch} = useDocumentOperation(documentId.replace('drafts.', ''), documentType);

  const setValues = (values) => {
    patch.execute([
      {
        set: {
          name: values.name,
          'googleData.location': values.position,
          'googleData.website': values.website,
          'googleData.url': values.url,
          'googleData.rating': values.rating,
          'googleData.status': values.status,
          'googleData.id': values.id,
        },
      },
    ]);
  };

  const [marker, setMarker] = useState();
  const clearGoogleData = () => {
    patch.execute([
      {
        unset: [
          // Remove everything but the name
          'googleData.location',
          'googleData.url',
          'googleData.website',
          'googleData.rating',
          'googleData.status',
          'googleData.id',
        ],
      },
    ]);
    setMarker();
  };

  const [map, setMap] = useState(null);
  const {isLoaded, loadError} = useJsApiLoader({
    googleMapsApiKey: process.env.SANITY_STUDIO_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const onLoad = useCallback((m) => setMap(m), []);
  const onUnmount = useCallback(() => setMap(null), []);

  const [autocomplete, setAutocomplete] = useState();
  const onAutocompleteLoad = (autocomp) => {
    setAutocomplete(autocomp);
  };

  useEffect(() => {
    if (!map) {
      return;
    }
    const location = googleData?.location;
    if (!location) {
      return;
    }

    console.log('Setting initial marker', location);
    setMarker({
      name: name || '',
      position: location,
    });
    map.panTo(location);

  }, [map, googleData?.location]);

  const onPlaceChanged = () => {
    if (!autocomplete) {
      return;
    }

    const place = autocomplete.getPlace();

    const formattedPlace = {
      name: place.name,
      id: place.place_id,
      url: place.url,
      position: {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      },
      website: place.website,
      rating: place.rating,
      status: place.business_status,
      // priceLevel: place.price_level, // Price level is not returning in the request :(
    };
    console.log('Formatted place', formattedPlace);
    setValues(formattedPlace);
    setMarker(formattedPlace);
    map.panTo(formattedPlace.position);
  };

  return (
    <div
      style={{
        backgroundColor: '#f9f9f9',
      }}
    >
      <Stack padding={4} space={3}>
        {article?.title && (
          <>
            <Text size="1" weight="semibold">
              Article name:
            </Text>
            <Text size="1">
              {article?.title}
            </Text>
          </>
        )}
        <Text size="1" weight="semibold">
          Location:
        </Text>
        {isLoaded && (
          <>
            <GoogleMap
              center={googleData?.location || defaultCenter}
              zoom={defaultZoom}
              options={options}
              onLoad={onLoad}
              onUnmount={onUnmount}
              mapContainerStyle={{
                width: '100%',
                height: '40vh',
              }}
            >
              <Autocomplete
                onLoad={onAutocompleteLoad}
                onPlaceChanged={onPlaceChanged}
              >
                <input
                  type="text"
                  placeholder="Search"
                  style={{
                    position: 'absolute',
                    right: '0.625rem',
                    top: '0.625rem',
                    width: '50%',
                    padding: '.5rem',
                  }}
                />
              </Autocomplete>
              {marker && (
                <Marker
                  position={marker.position}
                  label={marker.name}
                />
              )}
            </GoogleMap>
            {/* eslint-disable-next-line max-len */}
            {googleData && Object.keys(googleData).length > 0 && (
              <Button
                mode="ghost"
                tone="critical"
                text="Clear Google info"
                space={3}
                onClick={() => clearGoogleData()}
              />
            )}
            {!googleData && (
              <Text muted size={1}>
                Note: The first time a location is added, the place data
                {' '}will not show in the admin until the next time the page is loaded.
                {' '}After adding it, you must leave the page then come back before publishing.
              </Text>
            )}
            {googleData?.location && (
              <>
                <Text size={1} weight="semibold">
                  Location:
                </Text>
                <Text size={1}>
                  {googleData.location.lat},{' '}
                  {googleData.location.lng}
                </Text>
              </>
            )}
          </>
        )}
      </Stack>
      {loadError && (
        <div>
          We have a load error
        </div>
      )}
    </div>
  );
};

GoogleFieldsetUpdater.displayName = 'GoogleFieldsetUpdater';

export default GoogleFieldsetUpdater;
