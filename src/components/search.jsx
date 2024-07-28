import { useRest } from "../context/RestContext";
// import { useEffect, useState } from "react";
// import { db } from "../config/firebase";

import { useAuth } from "../context/AuthContext";
// import { doc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
// import BookList from "./book-items";

function Search() {
  const { query, setQuery, setBookList } = useRest();
  const { userData } = useAuth();
  //   const [userData, setUserData] = useState({});
  //   const { currentUser } = useAuth();
  const navigate = useNavigate();

  const apiKey = "AIzaSyCl8aFWcEOsZsTqt9XX8OSUqcKqtJB6MEk";

  //   useEffect(() => {
  //     const fetchUserData = async () => {
  //       if (currentUser) {
  //         try {
  //           const userDoc = await getDoc(doc(db, "users", currentUser?.uid));

  //           if (userDoc.exists()) {
  //             setUserData(userDoc.data());
  //           }
  //           // console.log("passed first one");
  //           // console.log(userDoc.data().firstName);
  //         } catch (error) {
  //           console.error(error);
  //         }
  //       }
  //     };
  //     fetchUserData();
  //   }, [currentUser]);

  const handleGetBooks = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`
      );
      const data = await response.json();
      console.log(data.items);
      setBookList(data.items);
      console.log("list set");
      console.log("list set");
      navigate("/home/books");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="font-rubik overflow-hidden flex flex-col justify-around p-16 my-0 mx-auto max-w-screen-lg border-2">
      <div className="flex justify-between items-center mb-10">
        <h1 className="text-5xl font-rubik">
          Welcome,{" "}
          <span className="font-semibold">
            {userData && userData.firstName}
          </span>
        </h1>
      </div>

      <p className="text-4xl font-rubik mb-4">
        Have a book in mind? Begin your search.
      </p>
      <label
        className="block mb-24 max-w-full text-2xl text-slate-800 font-normal "
        htmlFor="search"
      >
        <input
          placeholder="Atomic Habits"
          className="w-full rounded-lg p-6 block font-light text-2xl border border-solid border-gray-400 text-gray-800"
          type="search"
          name="search"
          id="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>
      <button
        to="books"
        onClick={handleGetBooks}
        className="rounded-lg mb-24 py-6 px-12 font-medium text-3xl text-white bg-teal-700"
      >
        Get Books
      </button>
      {/* {bookList && <BookList bookList={bookList} query={query} />} */}
    </div>
  );
}

export default Search;
