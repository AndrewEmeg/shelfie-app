/* eslint-disable react/prop-types */
import { auth, db } from "../config/firebase";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import Header from "../components/header";

// import BookItem from "../components/book-item";

function Home() {
  const [userData, setUserData] = useState({});
  const [query, setQuery] = useState("");
  const [bookList, setBookList] = useState([]);
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const apiKey = "AIzaSyCl8aFWcEOsZsTqt9XX8OSUqcKqtJB6MEk";

  // const { currentUser } = useContext(AuthProvider);
  // console.log(currentUser);

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

  const handleGetBooks = async () => {
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${query}&key=${apiKey}`
      );
      const data = await response.json();
      console.log(data.items);
      setBookList(data.items);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (currentUser) {
        try {
          const userDoc = await getDoc(doc(db, "users", currentUser?.uid));

          if (userDoc.exists()) {
            setUserData(userDoc.data());
          }
          // console.log("passed first one");
          // console.log(userDoc.data().firstName);
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchUserData();
  }, [currentUser]);

  return currentUser ? (
    <>
      <Header />
      <div className="font-rubik overflow-hidden flex flex-col justify-around p-16 my-0 mx-auto max-w-screen-sm border-2">
        <div className="flex justify-between items-center mb-10">
          <h1 className="text-5xl font-rubik">
            Welcome,{" "}
            <span className="font-semibold">
              {userData && userData.firstName}
            </span>
          </h1>
          <button
            onClick={handleSignOut}
            className="rounded-lg py-6 px-12 font-medium text-3xl text-white bg-teal-700"
          >
            Sign Out
          </button>
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
          onClick={handleGetBooks}
          className="rounded-lg mb-24 py-6 px-12 font-medium text-3xl text-white bg-teal-700"
        >
          Get Books
        </button>
        {bookList && <BookList bookList={bookList} query={query} />}
      </div>
    </>
  ) : (
    <h1 className="text-5xl font-rubik">No user is logged in.</h1>
  );
}

const BookList = ({ bookList, query }) => {
  return (
    <div className="flex flex-col gap-8">
      {bookList?.map((individualBook) => (
        <BookItem
          key={individualBook.id}
          individualBook={individualBook}
          query={query}
        />
      ))}
    </div>
  );
};

const BookItem = ({ individualBook }) => {
  return (
    <article className="grid grid-rows-2 sm:grid-cols-9 sm:gap-8 gap-y-8 bg-slate-100 rounded-2xl overflow-hidden">
      <div
        className="col-span-2"
        style={{
          backgroundImage: `url(${individualBook?.volumeInfo?.imageLinks?.thumbnail})`,
          backgroundRepeat: "repeat",
          backgroundSize: "100%",
        }}
      ></div>

      {/* <img
        src={individualBook?.volumeInfo?.imageLinks?.thumbnail}
        alt={`${query} book`}
      /> */}

      <div className="pt-0 p-8 sm:col-start-3 sm:col-end-10 flex flex-col justify-center">
        <h3 className="text-5xl pb-4 font-semibold ">
          {individualBook?.volumeInfo?.title}
        </h3>
        <div>
          <span className="text-2xl">Authors: </span>
          <span className="text-2xl font-light">
            {individualBook?.volumeInfo?.authors.join(" ")}
          </span>{" "}
        </div>
        <div>
          <span className="text-2xl">Pages: </span>
          <span className="text-2xl font-light">
            {individualBook?.volumeInfo?.pageCount}
          </span>
        </div>
        <div>
          <span className="text-2xl">Average Rating: </span>
          <span className="text-2xl font-light">
            {individualBook?.volumeInfo?.averageRating}⭐️
          </span>
        </div>
        <div>
          <span className="text-2xl">Published Date: </span>
          <span className="text-2xl font-light">
            {individualBook?.volumeInfo?.publishedDate}
          </span>
        </div>
      </div>
    </article>
  );
};
export default Home;
