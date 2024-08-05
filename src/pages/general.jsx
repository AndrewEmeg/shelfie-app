/* eslint-disable react/prop-types */
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { useNavigate } from "react-router-dom";

function General() {
  return <List />;
}

function List() {
  const [generalReviewedList, setGeneralReviewedList] = useState([]);
  const [individualBookRev, setIndividualbookRev] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  //   const [isOpen, setIsOpen] = useState(true);
  //   { userFullName: "andrew", reviewText: "lol" },
  //   { userFullName: "ldlfkajd", reviewText: "lddddol" },
  console.log("component rendered");
  useEffect(() => {
    let genrevList = [];
    const getAllReviewedBooks = async () => {
      const querySnapshot = await getDocs(collection(db, "books"));
      querySnapshot.forEach((doc) => genrevList.push(doc.data()));
      console.log(genrevList);
      const newGenRevList = genrevList
        .map((bkreviews) => bkreviews.reviewsForBook)
        .map((bookrevs) => bookrevs[0]);
      console.log(newGenRevList);
      setGeneralReviewedList(newGenRevList);
      const individualBookReview = genrevList.map(
        (bkreviews) => bkreviews.reviewsForBook
      );
      console.log(individualBookReview);
    };
    getAllReviewedBooks();
  }, []);

  const getIndivReviews = async (id) => {
    let genrevList = [];
    const querySnapshot = await getDocs(collection(db, "books"));
    querySnapshot.forEach((doc) => genrevList.push(doc.data()));
    console.log(genrevList);
    const newGenRevList = genrevList
      .map((bkreviews) => bkreviews.reviewsForBook)
      .filter(
        (listOfParticularBookReviews) =>
          listOfParticularBookReviews[0]?.bookID === id
      )
      .flat();
    console.log(newGenRevList);
    setIndividualbookRev(newGenRevList);

    if (id === individualBookRev[0]?.bookID) {
      setIndividualbookRev([]);
    }
  };

  const handleGoToBooks = () => {
    navigate("/home/books");
  };

  const filteredArray = generalReviewedList?.filter((book) =>
    book?.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
  );

  return (
    <div className="flex flex-col gap-8 font-rubik p-16 mx-auto max-w-screen-lg">
      <label
        className="block mb-8 max-w-full text-2xl text-slate-800 font-normal "
        htmlFor="search"
      >
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search for books"
          className=" w-full rounded-lg p-4  font-light text-2xl border border-solid border-gray-400 text-gray-800"
          type="search"
          name="search"
          id="search"
        />
      </label>
      {filteredArray.length ? (
        filteredArray.map((book) => (
          <article
            className={`${
              individualBookRev[0]?.bookID === book.bookID && " bg-teal-50"
            } grid grid-rows-2 sm:grid-cols-9 sm:grid-rows-none sm:gap-0 bg-slate-100 border border-teal-700 rounded-2xl overflow-hidden`}
            key={book.bookID}
          >
            <div
              className="col-span-2"
              style={{
                backgroundImage: `url(${book?.url})`,
                backgroundRepeat: "repeat",
                backgroundSize: "100%",
              }}
            ></div>

            <div
              className={`${
                individualBookRev[0]?.bookID === book.bookID &&
                "border-b-2 border-slate-300"
              } sm:col-start-3 sm:col-end-10 p-8`}
            >
              <h1 className="text-5xl pb-4 font-semibold ">{book?.title}</h1>

              <button
                // to="home/review"
                onClick={() => getIndivReviews(book.bookID)}
                className="rounded-lg mt-4 sm:mt-0 py-4 px-12 font-medium text-2xl text-white bg-teal-700"
              >
                {individualBookRev[0]?.bookID === book.bookID
                  ? "Hide reviews for this book"
                  : "Show reviews for this book"}
              </button>
            </div>

            {/* <div>
              <span className="text-2xl">Authors: </span>
              <span className="text-2xl font-light">{book?.authors}</span>
            </div>

            <div>
              <span className="text-2xl">Average Rating: </span>
              <span className="text-2xl font-light">
                {book?.averageRating}⭐️
              </span>
            </div>
            <div>
              <span className="text-2xl">Published Date: </span>
              <span className="text-2xl font-light">{book?.publishedDate}</span>
            </div> */}
            {/* <div>
              <span className="text-2xl">Your Review: </span>
              <span className="text-2xl font-light">{book?.reviewText}</span>
            </div> */}
            {individualBookRev[0]?.bookID === book.bookID && (
              <Individual
                className="border"
                individualBookRev={individualBookRev}
              />
            )}
          </article>
        ))
      ) : (
        <div className="grid grid-cols-1 grid-rows-2 my-4 mx-auto">
          <h1 className="text-center text-5xl">No one has reviewed a book</h1>{" "}
          <button
            onClick={handleGoToBooks}
            className="flex gap-4 items-center justify-center font-medium text-3xl text-teal-700 mb-8"
          >
            <ion-icon
              style={{ color: "#1f766e", width: "36px", height: "36px" }}
              name="arrow-back-circle-outline"
            ></ion-icon>
            Back to Search List
          </button>
        </div>
      )}
    </div>
  );
}

function Individual({ individualBookRev }) {
  console.log(individualBookRev);
  return (
    <div className="col-span-full p-8">
      <h1 className="text-4xl font-semibold mb-4">Reviews:</h1>
      {individualBookRev.map((eachReview, index) => (
        <article className="mb-4" key={index}>
          <p className="text-3xl font-medium">{eachReview.usersFullName}</p>
          <span className="text-3xl pb-8 font-light mb-4 inline-block mr-8">
            {`"${eachReview?.reviewText}"`}
          </span>
          <span className="text-3xl font-medium">
            {eachReview?.ratingNumber}⭐️
          </span>
        </article>
      ))}
    </div>
  );
}

export default General;
