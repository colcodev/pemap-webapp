import React from 'react';
import PropTypes from 'prop-types';

const MapMarker = ({ lat, lng }) => (
  <div lat={lat} lng={lng} className="text-4xl">
    <i className="fas fa-map-marker-alt text-red-600" />
  </div>
);

MapMarker.propTypes = {
  lat: PropTypes.number,
  lng: PropTypes.number,
};

MapMarker.defaultProps = {
  lat: undefined,
  lng: undefined,
};

export default MapMarker;
