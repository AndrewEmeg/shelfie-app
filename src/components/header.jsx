import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import "./active.css";
import { useEffect, useState } from "react";

const Header = () => {
  const [isNavMenuOpen, setIsNavMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });

  const navigate = useNavigate();
  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      await signOut(auth);
      console.log("You have been signed out successfully");
      navigate("/signin");
    } catch (error) {
      console.error(error);
    }
  };

  const handleHeaderNavMenu = () => {
    setIsNavMenuOpen((value) => !value);
  };
  const handlegoToProfile = () => {
    navigate("/home/profile");
  };
  const handleGoToHome = () => {
    navigate("/home");
  };
  return (
    <div className="flex justify-between bg-teal-700 px-16 py-8 items-center relative">
      <div onClick={handleGoToHome} className="flex gap-6 items-center">
        <img className="h-16" src="/img/shelfie-02.png" alt="Shelfie Logo" />
      </div>
      <div>
        {windowWidth < 640 ? (
          isNavMenuOpen ? (
            <nav>
              <ul className="flex flex-col items-end gap-8 absolute top-0 right-0 h-screen w-screen bg-white p-32">
                <ion-icon
                  style={{ color: "#1f766e", width: "44px", height: "44px" }}
                  className=""
                  name="close-circle-outline"
                  onClick={handleHeaderNavMenu}
                ></ion-icon>
                <li className="text-center self-center rounded-lg p-6 font-medium text-3xl text-teal-700">
                  <NavLink onClick={handleHeaderNavMenu} to="search">
                    Search
                  </NavLink>
                </li>
                <li className="text-center self-center rounded-lg p-6 font-medium text-3xl text-teal-700">
                  <NavLink onClick={handleHeaderNavMenu} to="books">
                    Books
                  </NavLink>
                </li>
                <li className="text-center self-center rounded-lg p-6 font-medium text-3xl text-teal-700">
                  <NavLink
                    to="profile"
                    onClick={() => {
                      handleHeaderNavMenu();
                      handlegoToProfile();
                    }}
                  >
                    Profile
                  </NavLink>
                </li>
                <button
                  onClick={handleSignOut}
                  className="rounded-lg p-6 self-center font-medium text-3xl text-teal-700"
                >
                  Sign Out
                </button>
              </ul>
            </nav>
          ) : (
            <ion-icon
              className="text-white"
              style={{ color: "white", width: "44px", height: "44px" }}
              name="menu-outline"
              size="large"
              onClick={handleHeaderNavMenu}
            ></ion-icon>
          )
        ) : (
          <nav>
            <ul className="flex gap-4">
              <li className=" rounded-lg p-6 font-medium text-3xl text-white bg-teal-700">
                <NavLink to="search">Search</NavLink>
              </li>
              <li className=" rounded-lg p-6 font-medium text-3xl text-white bg-teal-700">
                <NavLink to="books">Books</NavLink>
              </li>
              <li className="rounded-lg p-6 font-medium text-3xl text-white bg-teal-700">
                <NavLink to="profile" onClick={handlegoToProfile}>
                  Profile
                </NavLink>
              </li>
              <button
                onClick={handleSignOut}
                className="rounded-lg p-6 font-medium text-3xl text-white bg-teal-700"
              >
                Sign Out
              </button>
            </ul>
          </nav>
        )}
      </div>
    </div>
  );
};
export default Header;
