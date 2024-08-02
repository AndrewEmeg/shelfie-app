import { doc, setDoc, getDoc } from "firebase/firestore";
import { db } from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { useRest } from "../context/RestContext";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const Review = () => {
  const [reviewText, setReviewText] = useState("");
  const navigate = useNavigate();
  const { bookReviewed } = useRest();
  const { currentUser, userData } = useAuth();

  const handleGoToBooks = () => {
    navigate("/home/books");
  };

  const addToGeneralReviewList = async (book) => {
    let generalBookListFromDB = [];
    const bookRef = await getDoc(doc(db, "books", book.bookID));
    console.log(bookRef);
    if (bookRef.exists()) {
      console.log("User bookList:", bookRef.data().reviewsForBook);
      generalBookListFromDB = bookRef.data().reviewsForBook;
    }
    try {
      const bookReff = doc(db, "books", book.bookID);
      await setDoc(
        bookReff,
        { reviewsForBook: [...generalBookListFromDB, book] },
        { merge: true }
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    console.log(reviewText);
    const newReviewedBook = {
      usersFullName: userData.firstName + " " + userData.lastName || "N/A",
      usersID: currentUser.uid || "N/A",
      reviewText,
      url: bookReviewed?.volumeInfo?.imageLinks?.thumbnail || "N/A",
      title: bookReviewed?.volumeInfo?.title || "N/A",
      subtitle: bookReviewed?.volumeInfo?.subtitle || "N/A",
      authors: bookReviewed?.volumeInfo?.authors.join(" ") || "N/A",
      pageCount: bookReviewed?.volumeInfo?.pageCount || "N/A",
      averageRating: bookReviewed?.volumeInfo?.averageRating || "N/A",
      publishedDate: bookReviewed?.volumeInfo?.publishedDate || "N/A",
      description: bookReviewed?.volumeInfo?.description || "N/A",
      bookID: bookReviewed?.id || "N/A",
    };
    console.log(newReviewedBook);

    let bookListFromDB = [];
    const userRef = await getDoc(doc(db, "users", currentUser.uid));
    console.log(userRef);
    console.log(userRef.data());
    if (userRef.data().booksReviewed) {
      console.log("User bookList:", userRef.data().booksReviewed);
      bookListFromDB = userRef.data().booksReviewed;
    }
    try {
      const userReff = doc(db, "users", currentUser.uid);
      await setDoc(
        userReff,
        { booksReviewed: [...bookListFromDB, newReviewedBook] },
        { merge: true }
      );
    } catch (error) {
      console.error(error);
    }
    setReviewText("");
    alert("You have successfully reviewed a book");
    handleGoToBooks();
    addToGeneralReviewList(newReviewedBook);
    // navigate("success");
  };

  return (
    <div className="p-16 max-w-screen-lg my-0 mx-auto">
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
      <form>
        <label
          className="block mb-8 max-w-full text-2xl text-slate-800 font-normal "
          htmlFor="review"
        >
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Write your review..."
            rows={5}
            className="w-full rounded-lg p-4 block font-light text-2xl border border-solid border-gray-400 text-gray-800"
            type="email"
            name="review"
            id="review"
          >
            Write your review...
          </textarea>
        </label>
        <button
          to="success"
          onClick={handleSubmitReview}
          className="w-full rounded-lg mt-8 mb-24 py-6 block font-medium text-3xl text-white bg-teal-700"
        >
          Submit Review
        </button>
      </form>
      <article className="grid sm:gap-8 grid-rows-2 sm:grid-cols-9 sm:grid-rows-none sm:gap-0 gap-y-8 rounded-2xl overflow-hidden">
        {/* <img
          src={bookReviewed?.volumeInfo?.imageLinks?.thumbnail}
          alt={`${bookReviewed?.volumeInfo?.title} book`}
          className="col-auto"
        /> */}
        <div
          className="col-span-2"
          style={{
            backgroundImage: `url(${bookReviewed?.volumeInfo?.imageLinks?.thumbnail})`,
            backgroundRepeat: "repeat",
            backgroundSize: "100%",
          }}
        ></div>
        <div className="sm:col-start-3 sm:col-end-10">
          <h1 className="text-5xl pb-4 font-semibold ">
            {bookReviewed?.volumeInfo?.title}
          </h1>
          <h3 className="text-3xl pb-4 font-medium ">
            {bookReviewed?.volumeInfo?.subtitle}
          </h3>

          <div>
            <span className="text-2xl">Authors: </span>
            <span className="text-2xl font-light">
              {bookReviewed?.volumeInfo?.authors.join(" ")}
            </span>{" "}
          </div>
          <div>
            <span className="text-2xl">Pages: </span>
            <span className="text-2xl font-light">
              {bookReviewed?.volumeInfo?.pageCount}
            </span>
          </div>
          <div>
            <span className="text-2xl">Average Rating: </span>
            <span className="text-2xl font-light">
              {bookReviewed?.volumeInfo?.averageRating}⭐️
            </span>
          </div>
          <div>
            <span className="text-2xl">Published Date: </span>
            <span className="text-2xl font-light">
              {bookReviewed?.volumeInfo?.publishedDate}
            </span>
          </div>
        </div>
      </article>
      <p className="pt-6 text-2xl">{bookReviewed?.volumeInfo?.description}</p>
    </div>
  );
};
export default Review;
