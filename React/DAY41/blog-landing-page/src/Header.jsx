// Header.jsx
import React from 'react';

function Header({ title, links, isLoggedIn, handleLogout }) {
  return (
    <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white text-sm py-4 dark:bg-gray-800">
      <div className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between" aria-label="Global">
        <a className="flex-none text-xl font-semibold dark:text-white" href="#">{title}</a>
        <div className="flex flex-row items-center gap-5 mt-5 sm:justify-end sm:mt-0 sm:ps-5">
          {links.map((link, index) => (
            <a key={index} className={`font-medium ${index === 0 ? 'text-blue-500' : 'text-gray-600'} hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600`} href="#">{link}</a>
          ))}
          {isLoggedIn ? (
            <button onClick={handleLogout} className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600">Logout</button>
          ) : null}
        </div>
      </div>
    </header>
  );
}

export default Header;
