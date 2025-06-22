import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Navbar = () => {
  const { token, setToken, userData } = useContext(AppContext);
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const logout = () => {
    setToken(false);
    localStorage.removeItem("token");
    navigate("/");
  };

  const navLinks = [
    { to: "/", label: "HOME" },
    { to: "/doctors", label: "DOCTORS" },
    { to: "/about", label: "ABOUT" },
    { to: "/contact", label: "CONTACT" },
  ];

  const loadingUser = token && !userData;

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400">
      <img
        onClick={() => navigate("/")}
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt="logo"
      />

      {/* Desktop Menu */}
      <ul className="hidden md:flex items-center gap-6 font-medium">
        {navLinks.map(({ to, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setShowMenu(false)}
            className={({ isActive }) =>
              `py-1 hover:text-[var(--color-primary)] transition-all duration-200 ${
                isActive
                  ? "text-[var(--color-primary)] underline underline-offset-4"
                  : ""
              }`
            }
          >
            {label}
          </NavLink>
        ))}
      </ul>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {loadingUser ? (
          // 🌀 While userData is being fetched
          <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse" />
        ) : token && userData ? (
          // ✅ After userData is loaded
          <div className="flex items-center gap-2 cursor-pointer group relative min-w-12 min-h-12">
            {/* Image Fallback Loader */}
            {!imgLoaded && !imgError && (
              <div className="w-10 h-10 rounded-full bg-gray-300 animate-pulse" />
            )}
            {!imgError && (
              <img
                className={`w-10 h-10 rounded-full object-cover transition-opacity duration-300 ${
                  imgLoaded ? "opacity-100" : "opacity-0"
                }`}
                src={userData.image}
                alt="profile_picture"
                onLoad={() => setImgLoaded(true)}
                onError={() => setImgError(true)}
              />
            )}
            {imgError && (
              <div className="w-10 h-10 rounded-full bg-gray-400 text-white flex items-center justify-center text-xs font-bold">
                {userData?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>
            )}
            {/* Dropdown */}
            <div className="absolute top-12 right-0 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 shadow-lg text-base text-gray-600">
                <p
                  onClick={() => navigate("/my-profile")}
                  className="hover:text-black cursor-pointer"
                >
                  My Profile
                </p>
                <p
                  onClick={() => navigate("/my-appointments")}
                  className="hover:text-black cursor-pointer"
                >
                  My Appointments
                </p>
                <p onClick={logout} className="hover:text-black cursor-pointer">
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          // 🚪 Not logged in
          <button
            onClick={() => navigate("/login")}
            className="bg-[var(--color-primary)] text-white px-8 py-3 rounded-full font-light hidden md:block cursor-pointer"
          >
            Create Account
          </button>
        )}

        {/* Mobile Menu Icon */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden cursor-pointer"
          src={assets.menu_icon}
          alt="menu_icon"
        />

        {/* Mobile Side Menu */}
        <div
          className={`fixed top-0 right-0 bottom-0 bg-white z-30 transition-all duration-300 ease-in-out ${
            showMenu ? "w-64 px-5 py-6 shadow-lg" : "w-0 overflow-hidden"
          }`}
        >
          <div className="flex items-center justify-between">
            <img className="w-36 cursor-pointer" src={assets.logo} alt="logo" />
            <img
              className="w-7 cursor-pointer"
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              alt="cross_icon"
            />
          </div>
          <ul className="flex flex-col items-start gap-3 mt-5 text-lg font-medium">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                onClick={() => setShowMenu(false)}
                className={({ isActive }) =>
                  `block w-full py-2 px-4 rounded-md ${
                    isActive
                      ? "bg-gray-200 text-[var(--color-primary)]"
                      : "text-gray-800"
                  }`
                }
              >
                {label}
              </NavLink>
            ))}
            {!token ? (
              <button
                onClick={() => {
                  navigate("/login");
                  setShowMenu(false);
                }}
                className="bg-[var(--color-primary)] w-full text-white px-4 py-2 mt-2 rounded-md"
              >
                Create Account
              </button>
            ) : (
              <>
                <p
                  onClick={() => {
                    navigate("/my-profile");
                    setShowMenu(false);
                  }}
                  className="cursor-pointer w-full py-2 px-4 rounded-md hover:bg-gray-100"
                >
                  My Profile
                </p>
                <p
                  onClick={() => {
                    navigate("/my-appointments");
                    setShowMenu(false);
                  }}
                  className="cursor-pointer w-full py-2 px-4 rounded-md hover:bg-gray-100"
                >
                  My Appointments
                </p>
                <p
                  onClick={() => {
                    logout();
                    setShowMenu(false);
                  }}
                  className="cursor-pointer w-full py-2 px-4 rounded-md hover:bg-gray-100"
                >
                  Logout
                </p>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
