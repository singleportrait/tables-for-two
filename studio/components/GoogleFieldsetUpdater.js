/* eslint-disable camelcase */
/* eslint-disable no-console */
import React, {useState, useCallback, useEffect} from 'react';
import PropTypes from 'prop-types';
import {withDocument} from 'part:@sanity/form-builder';
import {useDocumentOperation} from '@sanity/react-hooks';
import {Stack, Text, Button} from '@sanity/ui';

import {useJsApiLoader, GoogleMap, Autocomplete, Marker} from '@react-google-maps/api';

const defaultCenter = {
  lat: 40.7101753,
  lng: -73.9925543,
};

const defaultZoom = 12;

const libraries = ['places'];

const options = {
  clickableIcons: false,
  streetViewControl: false,
  fullscreenControl: false,
};

const GoogleFieldsetUpdater = React.forwardRef((props, ref) => {
  const {document} = props;
  console.log('Document', document);

  const {patch} = useDocumentOperation(
    document._id.replace('drafts.', ''), document._type,
  );

  console.log('Patch', patch);
  console.log('Document ID', document._id.replace('drafts.', ''));
  console.log('Document type', document._type);

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

  const clearGoogleData = () => {
    patch.execute([
      {
        unset: [
          // Keep name to not mess that up
          'googleData.location',
          'googleData.url',
          'googleData.website',
          'googleData.rating',
          'googleData.status',
          'googleData.id',
        ],
      },
    ]);
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

  const [marker, setMarker] = useState();
  useEffect(() => {
    if (!map) {
      return;
    }
    const location = document?.googleData?.location;
    if (!location) {
      return;
    }

    console.log('Setting initial marker');
    setMarker({
      name: document?.name || '',
      position: location,
    });

  }, [map, document?.googleData?.location]);

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
    };
    console.log('Formatted place', formattedPlace);
    setMarker(formattedPlace);
    setValues(formattedPlace);
  };

  return (
    <div
      style={{
        backgroundColor: '#f9f9f9',
      }}
    >
      <Stack padding={4} space={3}>
        <Text size="1" weight="semibold">
          Location:
        </Text>
        {/* {!document?.googleData?.location && (
          <Button
            mode="ghost"
            text="Add Location"
          />
        )} */}
        {isLoaded && (
          <>
            <GoogleMap
              center={defaultCenter}
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
            {document.googleData && (
              <Button
                mode="ghost"
                tone="critical"
                text="Clear Google info"
                space={3}
                onClick={() => clearGoogleData()}
              />
            )}
            {document?.googleData?.location && (
              <>
                <Text size={1} weight="semibold">
                  Location:
                </Text>
                <Text size={1}>
                  {document.googleData.location.lat},{' '}
                  {document.googleData.location.lng}
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
});

GoogleFieldsetUpdater.displayName = 'GoogleFieldsetUpdater';

GoogleFieldsetUpdater.propTypes = {
  document: PropTypes.object,
};

export default withDocument(GoogleFieldsetUpdater);
