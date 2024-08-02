import { NavLink } from "react-router-dom";
// import { useRest } from "../context/RestContext";
import "./active.css";

function HomeNav() {
  //   const { query } = useRest();
  return (
    <nav>
      <ul className="flex gap-8 text-3xl font-rubik p-16 pb-0 mx-auto max-w-screen-lg justify-center">
        <li className="text-teal-700 rounded">
          <NavLink to="my-list">My Reviews</NavLink>
        </li>
        <li className="text-teal-700 rounded">
          <NavLink to="general">Others&apos; Reviews</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default HomeNav;
