import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { AppContext } from '../AppContext';

const Header = () => {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const { user, logout } = useContext(AppContext);

  return (
    <header className="bg-red-600 w-full p-4 fixed z-10">
      <nav className="flex flex-wrap items-center justify-between">
        <div className="flex items-center flex-shrink-0">
          <Link className="text-white no-underline hover:no-underline" to="/">
            <span id="logo" className="text-2xl">
              <i className="fas fa-map-marked-alt" />
              &nbsp;PedidosMap
            </span>
          </Link>
        </div>

        <div className="block lg:hidden">
          <button
            id="nav-toggle"
            className="flex items-center px-3 py-2 border rounded text-gray-200 border-gray-300 hover:text-white hover:border-white"
            type="button"
            onClick={() => setMenuIsOpen(!menuIsOpen)}
          >
            <svg
              className="fill-current h-3 w-3"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <title>Menu</title>
              <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
            </svg>
          </button>
        </div>

        <div
          className={`w-full flex-grow lg:flex lg:items-center lg:w-auto ${
            menuIsOpen ? 'block' : 'hidden'
          } lg:block pt-6 lg:pt-0`}
          id="nav-content"
        >
          <ul className="list-reset lg:flex justify-end flex-1 items-center">
            <li className="text-center lg:mr-6">
              <span className="inline-block text-gray-200 no-underline py-2 px-4">{`¡Hola, ${user.name}!`}</span>
            </li>
            <li className="text-center">
              <button
                className="inline-block text-gray-200 hover:text-gray-100 hover:underline py-2 px-4"
                type="button"
                onClick={logout}
              >
                SALIR
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
};

export default Header;
