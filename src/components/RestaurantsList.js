import React from 'react';
import PropTypes from 'prop-types';

const RestaurantsList = ({ restaurants }) => {
  const formatRating = (rating) => (rating === '0' ? '1.0' : rating);

  const formatDeliveryTime = (deliveryTimeMaxMinutes) => {
    const deliveryDate = new Date();
    deliveryDate.setHours(
      deliveryDate.getHours(),
      deliveryDate.getMinutes() + parseInt(deliveryTimeMaxMinutes, 10),
      0,
      0
    );
    return deliveryDate.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  const formatCategories = (categories) => {
    return categories.slice(0, 3).map(({ id, name }) => (
      <span key={id} className="bg-gray-400 text-white text-xs rounded-full py-1 px-2 mr-1">
        {name}
      </span>
    ));
  };

  return (
    <div id="restaurants-list">
      {restaurants.length > 0 ? (
        restaurants.map(
          ({ id, name, logo, deliveryTimeMaxMinutes, link, ratingScore, categories }) => {
            return (
              <div key={id} className="max-w rounded bg-white shadow-md p-5 mb-5">
                <div className="flex">
                  <a
                    href={`https://www.pedidosya.com.uy/restaurantes/montevideo/${link}-menu`}
                    target="blank"
                    className="flex-none mr-5"
                  >
                    <img
                      src={`https://d1v73nxuzaqxgd.cloudfront.net/restaurants/${logo}`}
                      alt={name}
                      className="rounded border hover:border-gray-500 w-20 h-20"
                    />
                  </a>
                  <div>
                    <a
                      href={`https://www.pedidosya.com.uy/restaurantes/montevideo/${link}-menu`}
                      target="blank"
                      className="block leading-none hover:underline font-bold text-gray-700 text-xl mb-2"
                    >
                      {name}
                    </a>
                    <p className="text-sm text-gray-600 mb-1">
                      <i className="fa fa-s fa-clock text-gray-500" />
                      {` Hora de entrega ${formatDeliveryTime(deliveryTimeMaxMinutes)}`}
                    </p>
                    <p className="text-sm text-gray-600">
                      <i className="fa fa-s fa-star text-yellow-500" />
                      {` Puntaje ${formatRating(ratingScore)}`}
                    </p>
                  </div>
                </div>
                <div className="w-full pt-3">{formatCategories(categories)}</div>
              </div>
            );
          }
        )
      ) : (
        <div className="max-w rounded bg-white shadow-md text-center text-gray-700 py-3">
          <i className="far fa-frown text-yellow-600" />
          &nbsp;No se encontraron restaurantes para este punto
        </div>
      )}
    </div>
  );
};

RestaurantsList.propTypes = {
  restaurants: PropTypes.arrayOf(
    PropTypes.shape({
      count: PropTypes.number,
      data: PropTypes.arrayOf(PropTypes.object),
    })
  ),
};

RestaurantsList.defaultProps = {
  restaurants: [],
};

export default RestaurantsList;
