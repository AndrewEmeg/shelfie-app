import { auth } from "../config/firebase";
import { signOut } from "firebase/auth";
import { NavLink, useNavigate } from "react-router-dom";
import "./active.css";

const Header = () => {
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

  const handlegoToProfile = () => {
    navigate("/home/profile");
  };
  return (
    <div className="flex justify-between bg-teal-700 p-16 items-center">
      <div className="flex gap-6 items-center">
        <img src="img/shelfie-favicon-02.png" alt="Shelfie Logo" />
        <p className="text-5xl text-white font-rubik">Shelfie</p>
      </div>
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
      {/* <ion-icon
        className="text-white"
        style={{ color: "white", width: "44px", height: "44px" }}
        name="menu-outline"
        size="large"
      ></ion-icon> */}
    </div>
  );
};
export default Header;
