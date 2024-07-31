/* eslint-disable react/prop-types */
import { collection, getDocs } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";

function General() {
  return <List />;
}

function List() {
  const [generalReviewedList, setGeneralReviewedList] = useState([]);
  const [individualBookRev, setIndividualbookRev] = useState([]);
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
          listOfParticularBookReviews[0].bookID === id
      )
      .flat();
    console.log(newGenRevList);
    setIndividualbookRev(newGenRevList);

    if (id === individualBookRev[0]?.bookID) {
      setIndividualbookRev([]);
    }
  };

  useEffect(() => {
    console.log(individualBookRev);
  }, [individualBookRev]);

  return (
    <div className="flex flex-col gap-8 font-rubik p-16 mx-auto max-w-screen-lg">
      {generalReviewedList.map((book) => (
        <article
          className="grid grid-rows-2 sm:grid-cols-9 sm:grid-rows-none sm:gap-0 gap-y-8 bg-slate-100 border border-teal-700 rounded-2xl overflow-hidden"
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
          <div className="sm:col-start-3 sm:col-end-10 p-8">
            <h1 className="text-5xl pb-4 font-semibold ">{book?.title}</h1>

            <button
              // to="home/review"
              onClick={() => getIndivReviews(book.bookID)}
              className="rounded-lg mt-4 sm:mt-0 py-4 px-12 font-medium text-2xl text-white bg-teal-700"
            >
              Show reviews for this book
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
      ))}
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
          <span className="text-3xl pb-8 font-light mb-4">
            {`"${eachReview?.reviewText}"`}
          </span>
        </article>
      ))}
    </div>
  );
}

export default General;
