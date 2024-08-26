/* eslint-disable react/prop-types */
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { useRest } from "../context/RestContext";
import { useEffect, useState } from "react";
import HomeNav from "./home-nav";
import "./active.css";

const BookList = ({ bookList }) => {
  const [returnToSearch, setReturnToSearch] = useState(true);
  const { showBooks, setShowBooks } = useRest();
  const location = useLocation();

  const navigate = useNavigate();
  // console.log("book list component");
  // console.log(bookList);

  useEffect(() => {
    if (
      location.pathname === "/home/books/review" ||
      location.pathname === "/home/books/my-list" ||
      location.pathname === "/home/books/general"
    ) {
      setShowBooks(false);
    } else {
      setShowBooks(true);
    }
    if (bookList.length === 0) {
      setReturnToSearch(false);
    }
  }, [location, setShowBooks, bookList.length]);

  const handleGoToBooks = () => {
    navigate("/home/search");
  };

  // console.log("Showbooks:", Boolean(showBooks));
  // console.log("BookList:", Boolean(returnToSearch));

  return (
    <div>
      <HomeNav />
      <ul className="flex gap-4">
        {/* <li className=" rounded-lg p-6 font-medium text-3xl text-white bg-teal-700">
          <NavLink to="review">Review</NavLink>
        </li> */}
      </ul>
      {!showBooks && <Outlet />}
      {showBooks && (
        <div className="flex flex-col gap-8 font-rubik p-16 mx-auto max-w-screen-lg">
          {bookList?.map((individualBook) => (
            <BookItem key={individualBook.id} individualBook={individualBook} />
          ))}
        </div>
      )}
      {showBooks && !returnToSearch && (
        <div className="mx-auto p-40 flex justify-center items-center">
          <button
            onClick={handleGoToBooks}
            className="flex gap-4 items-center justify-center font-medium text-3xl text-teal-700"
          >
            <ion-icon
              style={{ color: "#1f766e", width: "36px", height: "36px" }}
              name="arrow-back-circle-outline"
            ></ion-icon>
            No books for now, Return to Search page.
          </button>
        </div>
      )}
    </div>
  );
};

const BookItem = ({ individualBook }) => {
  const navigate = useNavigate();
  const { setBookReviewed } = useRest();
  const apiKey = "AIzaSyCl8aFWcEOsZsTqt9XX8OSUqcKqtJB6MEk";

  const handleReviewBook = async (volumeId) => {
    // console.log("it is called");
    try {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes/${volumeId}?key=${apiKey}`
      );
      const data = await response.json();
      //   console.log(data);
      setBookReviewed(data);
    } catch (error) {
      // console.error(error);
    }
    navigate("review");
  };
  return (
    <article
      onClick={() => handleReviewBook(individualBook.id)}
      className="grid grid-rows-2 sm:grid-cols-9 sm:grid-rows-none sm:gap-0 gap-y-8 bg-slate-100 border border-teal-700 rounded-2xl overflow-hidden"
    >
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

      <div className="pt-0 sm:pt-8 p-8 sm:col-start-3 sm:col-end-10 flex flex-col justify-center">
        <h3 className="text-5xl pb-4 font-semibold ">
          {individualBook?.volumeInfo?.title}
        </h3>
        <div className="sm:flex sm:justify-between">
          <div>
            <div>
              <span className="text-2xl">Authors: </span>
              <span className="text-2xl font-light">
                {individualBook?.volumeInfo?.authors?.join(" ")}
              </span>{" "}
            </div>
            {/* <div>
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
          </div> */}
            <div>
              <span className="text-2xl">Published Date: </span>
              <span className="text-2xl font-light">
                {individualBook?.volumeInfo?.publishedDate}
              </span>
            </div>
          </div>
          <button
            // to="home/review"
            onClick={() => handleReviewBook(individualBook.id)}
            className="rounded-lg mt-4 sm:mt-0 py-4 px-12 font-medium text-2xl text-white bg-teal-700"
          >
            Review Book
          </button>
        </div>
      </div>
    </article>
  );
};
export default BookList;
