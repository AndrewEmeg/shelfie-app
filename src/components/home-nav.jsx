import { NavLink } from "react-router-dom";
// import { useRest } from "../context/RestContext";
import "./active.css";

function HomeNav() {
  //   const { query } = useRest();
  return (
    <nav>
      <ul className="flex gap-8 text-3xl font-rubik p-16 mx-auto max-w-screen-lg justify-center">
        <li className=" rounded">
          <NavLink to="search">Search</NavLink>
        </li>
        <li className=" rounded">
          <NavLink to="books">Books</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default HomeNav;
