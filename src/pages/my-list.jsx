import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../config/firebase";
import { useAuth } from "../context/AuthContext";

function MyList() {
  const [reviewedList, setReviewedList] = useState([]);
  const { currentUser } = useAuth();
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

  return (
    <div className="flex flex-col gap-8 font-rubik p-16 mx-auto max-w-screen-lg">
      {reviewedList.map((book) => (
        <article
          className="grid grid-rows-2 sm:grid-cols-9 sm:grid-rows-none sm:gap-0 gap-y-8 bg-slate-100 border border-teal-700 rounded-2xl overflow-hidden"
          key={book.id}
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
              <span className="text-3xl pb-4 font-light ">
                {book?.reviewText}
              </span>
            </div>
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
        </article>
      ))}
    </div>
  );
}

export default MyList;
