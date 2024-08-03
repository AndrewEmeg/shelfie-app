import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function MyList() {
  const [reviewedList, setReviewedList] = useState([]);
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const getUserReviewedBooks = async () => {
      const userRef = await getDoc(doc(db, "users", currentUser.uid));

      if (userRef.exists()) {
        console.log(userRef.data().booksReviewed);
        const books = userRef.data().booksReviewed;
        setReviewedList(books);
      }
    };

    getUserReviewedBooks();
  }, [currentUser.uid]);

  const handleGoToBooks = () => {
    navigate("/home/books");
  };

  return (
    <div className="flex flex-col gap-8 font-rubik p-16 mx-auto max-w-screen-lg">
      {reviewedList ? (
        reviewedList.map((book) => (
          <article
            className="grid grid-rows-2 sm:grid-cols-9 sm:grid-rows-none sm:gap-0 gap-y-8 bg-slate-100 border border-teal-700 rounded-2xl overflow-hidden"
            key={book.reviewText}
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

              <div>
                <span className="text-3xl pb-4 font-medium">Your Review: </span>
                <span className="text-3xl pb-4 font-medium ">
                  {book?.reviewText}
                </span>
              </div>
              <div>
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
                <span className="text-2xl font-light">
                  {book?.publishedDate}
                </span>
              </div>
              {/* <div>
              <span className="text-2xl">Your Review: </span>
              <span className="text-2xl font-light">{book?.reviewText}</span>
            </div> */}
            </div>
          </article>
        ))
      ) : (
        <div className="grid grid-cols-1 grid-rows-2 my-4 mx-auto">
          <h1 className="text-center text-5xl">You are yet to review a book</h1>{" "}
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

export default MyList;
