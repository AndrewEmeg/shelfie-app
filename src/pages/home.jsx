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
      console.log(data.items[0].volumeInfo.title);
      // const bookList = data.items;

      // bookList.map((individualBook) => (
      //   <BookItem key={individualBook.id} individualBook={individualBook} />
      // ));
    } catch (error) {
      console.error(error);
    }
  };

  // const BookItem = ({ individualBook }) => {
  //   return (
  //     <article className="flex gap-8 bg-slate-100 rounded-2xl">
  //       <img
  //         src={individualBook.volumeInfo.imageLinks.smallThumbnail}
  //         alt={`${query} book`}
  //       />
  //       <div>
  //         <h3>{individualBook.volumeInfo.title}</h3>
  //         <span>Authors: </span>
  //         <span>{individualBook.volumeInfo.authors}</span>
  //       </div>
  //     </article>
  //   );
  // };

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
          className="block mb-8 max-w-full text-2xl text-slate-800 font-normal "
          htmlFor="search"
        >
          <input
            placeholder="Atomic Habits"
            className="w-full rounded-lg p-6 mb-12 block font-light text-2xl border border-solid border-gray-400 text-gray-800"
            type="search"
            name="search"
            id="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <button
          onClick={handleGetBooks}
          className="rounded-lg py-6 px-12 font-medium text-3xl text-white bg-teal-700"
        >
          Get Books
        </button>
        {/* <BookItem /> */}
      </div>
    </>
  ) : (
    <h1 className="text-5xl font-rubik">No user is logged in.</h1>
  );
}
export default Home;
