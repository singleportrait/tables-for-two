import { useRef, useState } from 'react';
import { useJsApiLoader } from '@react-google-maps/api';

const libraries = ['places'];

const UpdateRestaurants = ({ restaurants }) => {
  const ref = useRef(null);
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [fetchedData, setFetchedData] = useState({});
  const fetchRestaurantData = async (placeId) => {
    if (!window.google) return;
    console.log('Fetching data for', placeId);
    const service = new window.google.maps.places.PlacesService(ref.current);
    if (!service) return;
    service.getDetails({
      placeId,
      fields: [
        'name',
        'place_id',
        'url',
        'website',
        'rating',
        'business_status',
      ],
    }, (place, status) => {
      console.log('Place', place);
      if (status === 'OK') {
        setFetchedData(place);
      }
    });
  };

  return (
    <div>
      {loadError && (
        <div>
          Unable to load Google Maps API
        </div>
      )}
      <div ref={ref} />
      {restaurants.length > 0 && restaurants.map((restaurant) => (
        <div className="my-4 pb-4 border-b border-b-slate-400" key={restaurant.name}>
          <h3>
            {restaurant.name}
          </h3>
          <strong>
            <a href={restaurant.article.url} className="text-black underline" target="_blank" rel="noreferrer">
              {restaurant.article.title}
            </a>
          </strong>
          <br />
          <small>
            Contributor: {restaurant.article.contributor}
          </small>
          <br />
          <small>Publication date: {restaurant.article.publicationDate}</small>
          <br />
          <small>Issue date: {restaurant.article.issueDate}</small>
          <p>{restaurant.article.description}</p>
          <p className="text-sm py-3 mt-3 border-t border-t-slate-200">
            Google Place Id: {restaurant.googleData.id}
            <br />
            Business status: {restaurant.googleData.status}
            <br />
            Website: {restaurant.googleData.website}
            <br />
            Rating: {restaurant.googleData.rating}
          </p>
          {isLoaded && (
            <button
              type="button"
              onClick={() => fetchRestaurantData(restaurant.googleData.id)}
              className="bg-gray-200 py-1 px-2 rounded-full"
            >
              Fetch updated info
            </button>
          )}
          {fetchedData?.place_id === restaurant.googleData.id && (
            <div className="text-sm pt-3">
              Google Place Id: {fetchedData.place_id}
              <br />
              Name: {fetchedData.name}
              <br />
              Business status: {fetchedData.business_status}
              <br />
              Website: {fetchedData.website}
              <br />
              Rating: {fetchedData.rating}
            </div>
          )}
        </div>
      ))}

    </div>
  );
};

export default UpdateRestaurants;
