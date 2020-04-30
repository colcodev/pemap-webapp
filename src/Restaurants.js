import React, { useContext, useEffect, useState } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import axios from 'axios';
import queryString from 'query-string';
import GoogleMapReact from 'google-map-react';

import { AppContext } from './AppContext';
import Header from './components/Header';
import RestaurantsList from './components/RestaurantsList';
import MapMarker from './components/MapMarker';

const Restaurants = () => {
  const { userToken, user, logout } = useContext(AppContext);
  const [fetching, setFetching] = useState(true);
  const [restaurants, setRestaurants] = useState([]);
  const history = useHistory();
  const location = useLocation();

  // center by default at Montevideo, Uruguay
  let defaultPoint = {
    lat: -34.9011,
    lng: -56.1645,
  };

  // fetch location point from query params
  if (location.search) {
    const searchParams = queryString.parse(location.search);

    // validate query params exists
    if (searchParams.lat && searchParams.lng) {
      const lat = parseFloat(searchParams.lat);
      const lng = parseFloat(searchParams.lng);

      // validate coordinates
      // learn more: https://github.com/joaquimserafim/is-valid-coordinates/blob/master/index.js
      if (
        !Number.isNaN(lat) &&
        !Number.isNaN(lng) &&
        lat <= 90 &&
        lat >= -90 &&
        lng <= 180 &&
        lng >= -180
      ) {
        defaultPoint = {
          lat,
          lng,
        };
      }
    }
  } else if (navigator.geolocation) {
    // fetch location point from current position
    const displayLocationInfo = (position) => {
      const lng = position.coords.longitude;
      const lat = position.coords.latitude;

      defaultPoint = {
        lat,
        lng,
      };
    };

    navigator.geolocation.getCurrentPosition(displayLocationInfo, { timeout: 0 });
  }

  // set point param for API request
  const pointStr = `${defaultPoint.lat},${defaultPoint.lng}`;

  useEffect(() => {
    async function fetchRestaurants() {
      setFetching(true);

      try {
        const { data: restaurantsResponse } = await axios.get(
          `${process.env.REACT_APP_API_URL}/search/restaurants`,
          {
            params: {
              country: user.country.id,
              point: pointStr,
            },
            headers: {
              Authorization: userToken,
            },
          }
        );

        setRestaurants(restaurantsResponse.data);
      } catch (err) {
        const { response } = err;
        if (response && response.data && response.data.status === 401) {
          logout();
        }
      }

      setFetching(false);
    }

    fetchRestaurants();
  }, [user.country.id, pointStr, userToken, logout]);

  return (
    <div className="h-screen">
      <Header />
      <div className="lg:flex xl:flex h-full p-5 pt-24">
        <div className="w-full lg:w-2/3 xl:w-2/3 h-300 lg:h-full xl:h-full bg-white rounded shadow-md p-5">
          <GoogleMapReact
            className="rounded"
            bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAPS_API_KEY }}
            defaultCenter={defaultPoint}
            defaultZoom={14}
            options={{
              gestureHandling: 'cooperative',
              mapTypeControl: false,
              streetViewControl: false,
              fullscreenControl: false,
            }}
            onClick={({ lat, lng }) => {
              history.push({ search: `?lat=${lat}&lng=${lng}` });
            }}
          >
            {restaurants.map(({ id, coordinates }) => {
              const coordsParts = coordinates.split(',');
              const lat = parseFloat(coordsParts[0]);
              const lng = parseFloat(coordsParts[1]);
              return <MapMarker key={id} lat={lat} lng={lng} />;
            })}
          </GoogleMapReact>
        </div>
        <div className="w-full lg:w-1/3 xl:w-1/3 h-auto lg:h-full xl:h-full lg:pl-5 xl:pl-5 mt-5 lg:mt-0 xl:mt-0 overflow-auto">
          {fetching ? (
            <div className="max-w rounded bg-white shadow-md text-center text-gray-700 py-3">
              Cargando restaurantes...
            </div>
          ) : (
            <RestaurantsList restaurants={restaurants} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Restaurants;
